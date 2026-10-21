"""Build the cipher fonts the transliterator's writ is set in, from the wing's own traced
glyph data: TL Celestial, TL Malachim, TL River, TL Theban, TL Nine Chambers, TL Enochian
and TL Magi, one per drawn alphabet the transliterator writes.

Writes, relative to apps/web:
  src/assets/fonts/traced/TL*.woff2               the fonts (Vite fingerprints them)
  src/styles/magic-traced-fonts.generated.css     their @font-face rules
  src/data/education/magic/fonts.generated.js     { slug: { family, dataHash, woff2Sha256 } }

validate-magic.mjs re-runs the data dump in memory and fails the build when a font no
longer matches the data it was built from. Run this script by hand after the traced
glyphs, a scheme's keys, an alphabet's signScale or pen.js change:

  python -I tools/fonts/build-traced-fonts.py                (from apps/web)
  python -I tools/fonts/build-traced-fonts.py --box <dir>    also writes "TL ... Box" test
                                                             fonts into <dir>, never the repo:
                                                             each glyph where the SVG box draws
                                                             it (advance 1 em x signScale, box
                                                             bottom on the baseline, line = box)
  python -I tools/fonts/build-traced-fonts.py --report <json>  writes every glyph's checks

Needs Python 3.11 with fontTools 4.67.0, skia-pathops 0.9.2, brotli 1.2.0 and shapely
2.2.0 (pip install fonttools==4.67.0 skia-pathops==0.9.2 brotli==1.2.0 shapely==2.2.0),
and node, which runs tools/fonts/dump-traced.mjs for the data. With those versions two
builds give the same bytes.

The data. dump-traced.mjs gives, for each alphabet, its scheme's keys, each with the
traced glyph of its sign as MagicGlyph.jsx draws it at text size: the strokes d drawn
with the house pen (pen.js, 5.5, round caps and joins), each ring with its radius, its
pen and the radius of the hole the strokes are masked by, and each dot with its radius.
A glyph with a pen of its own is refused there.

The outline of a glyph is the ink MagicGlyph draws:

    (U stroke(subpath) - U hole(ring))  U  U annulus(ring)  U  U disc(dot)

Each subpath is stroked on its own with Skia's stroker (butt ends, round joins), in one
fixed frame (the SVG box, y up, 64 times the font's resolution), and the strokes are
united one at a time, so that two strokes meeting at a point cannot lose a counter; the
round caps are added as discs, one for each distinct end point; then the ring holes are
cut, then the annuli and the dots are added. The result is scaled to font units,
converted to TrueType quadratics (cu2qu, 0.25 units) and rounded to integers.

Size and place. The units per em are 1000, and the SVG box (0-100) is one em times the
alphabet's signScale, so at the writ's font size a sign is as large as its SVG. Each font
is moved vertically so that the band between its glyphs' median ink bottom and median
ink top is centred 0.39 em above the baseline, where the Celestial signs' band stands
when the page sets their box 0.12 em below it. Side-bearings are round(82.5 x signScale)
(one and a half house pens), so two signs stand 0.165 em x signScale apart, ink to ink;
the space and U+00A0 advance round(300 x signScale). hhea and OS/2 typo metrics are
900 / -300 / 0 with USE_TYPO_METRICS; the win metrics are the same unless a glyph's ink
reaches past them, when they reach the ink, so nothing is clipped.

The cmap is exactly the scheme's keys, U+0020 and U+00A0: the transliterator folds
everything else (J to I, finals to their base, pointing away) before the writ is set.
No hinting; gasp smooth at every size; head flags bit 3 clear, so fractional sizes
scale exactly; no layout tables; fixed dates.

The build fails when, for any glyph of the font as written (the woff2 read back), an
independent construction of MagicGlyph's drawing (shapely buffers of the flattened centre
lines, from this file's own path parser) is more than 0.25 SVG units away (Hausdorff
distance of the boundaries), or has a different number of polygons or of holes; or when
the cmap is not the scheme's key set.
"""
import argparse
import datetime
import hashlib
import json
import math
import os
import re
import statistics
import subprocess
import sys

# ---------------------------------------------------------------------------------------
# The licence of the generated fonts: the owner's decision (PLAN.md section 9). To publish
# them under another licence (the SIL Open Font License, say), change this one constant:
# the copyright notice (name ID 0), the licence description (13) and the licence URL
# (14), the embedding permissions (OS/2 fsType) and the vendor ID; then rebuild.
LICENCE = {
    'copyright': '© 2026 Three Magi Press. Outlines generated from the Magical '
                 'Scriptorium’s traced glyph data.',
    'licence': 'All rights reserved.',
    'licenceURL': 'All rights reserved.',
    'fsType': 0,
    'vendor': 'NONE',
}
# ---------------------------------------------------------------------------------------

import numpy  # noqa: E402
import pathops  # noqa: E402
from fontTools.fontBuilder import FontBuilder  # noqa: E402
from fontTools.pens.basePen import BasePen  # noqa: E402
from fontTools.pens.cu2quPen import Cu2QuPen  # noqa: E402
from fontTools.pens.recordingPen import RecordingPen  # noqa: E402
from fontTools.pens.transformPen import TransformPen  # noqa: E402
from fontTools.pens.ttGlyphPen import TTGlyphPen  # noqa: E402
from fontTools.svgLib.path import parse_path  # noqa: E402
from fontTools.ttLib import TTFont, newTable  # noqa: E402
import shapely  # noqa: E402
from shapely.geometry import LineString, Point, Polygon  # noqa: E402
from shapely.ops import unary_union  # noqa: E402

WEB = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
FONT_DIR = os.path.join(WEB, 'src', 'assets', 'fonts', 'traced')
CSS_OUT = os.path.join(WEB, 'src', 'styles', 'magic-traced-fonts.generated.css')
JS_OUT = os.path.join(WEB, 'src', 'data', 'education', 'magic', 'fonts.generated.js')

UPM = 1000
K = 64.0                  # the working frame: K units per font unit
BOX_BOTTOM = -120         # the page sets a sign's box 0.12 em below the baseline
BAND_CENTRE = 390         # where the Celestial signs' median ink band is centred, 0.39 em
SIDE_BEARING = 82.5       # x signScale: one and a half house pens (5.5 SVG units = 55 units)
SPACE = 300               # x signScale
ASCENT, DESCENT = 900, -300
CU2QU_ERR = 0.25          # font units
MAX_HAUSDORFF = 0.25      # SVG units
VERSION = '1.000'
# fixed dates, so two builds give the same bytes
STAMP = int((datetime.datetime(2026, 10, 21) - datetime.datetime(1904, 1, 1)).total_seconds())
KAPPA = 0.5522847498307936


# --------------------------------------------------------------------------- the data
def canonical(v):
    """dump-traced.mjs's canonical JSON (keys sorted, numbers as JavaScript prints them)"""
    if isinstance(v, list):
        return '[' + ','.join(canonical(x) for x in v) + ']'
    if isinstance(v, dict):
        return '{' + ','.join(json.dumps(k, ensure_ascii=False) + ':' + canonical(v[k]) for k in sorted(v)) + '}'
    if isinstance(v, bool) or v is None:
        return json.dumps(v)
    if isinstance(v, int):
        return str(v)
    if isinstance(v, float):
        if v.is_integer():
            return str(int(v))
        r = repr(v)
        if 'e' in r:
            raise SystemExit(f'build-traced-fonts: number {r} has no agreed canonical form')
        return r
    return json.dumps(v, ensure_ascii=False)


def load_dump():
    out = subprocess.run(['node', os.path.join(WEB, 'tools', 'fonts', 'dump-traced.mjs')],
                         cwd=WEB, check=True, capture_output=True, text=True, encoding='utf-8')
    data = json.loads(out.stdout)
    for a in data['alphabets']:
        body = {k: v for k, v in a.items() if k != 'dataHash'}
        h = hashlib.sha256(canonical(body).encode('utf-8')).hexdigest()
        if h != a['dataHash']:
            raise SystemExit(f"build-traced-fonts: {a['slug']}: the dump's dataHash does not match its data")
    return data['alphabets']


# --------------------------------------------------------------------------- the outline
def _circle(path, cx, cy, r, clockwise):
    """four cubic arcs (radial error 2.7e-4 r); clockwise in y-up coordinates"""
    k = KAPPA * r
    if not clockwise:
        path.moveTo(cx + r, cy)
        path.cubicTo(cx + r, cy + k, cx + k, cy + r, cx, cy + r)
        path.cubicTo(cx - k, cy + r, cx - r, cy + k, cx - r, cy)
        path.cubicTo(cx - r, cy - k, cx - k, cy - r, cx, cy - r)
        path.cubicTo(cx + k, cy - r, cx + r, cy - k, cx + r, cy)
    else:
        path.moveTo(cx + r, cy)
        path.cubicTo(cx + r, cy - k, cx + k, cy - r, cx, cy - r)
        path.cubicTo(cx - k, cy - r, cx - r, cy - k, cx - r, cy)
        path.cubicTo(cx - r, cy + k, cx - k, cy + r, cx, cy + r)
        path.cubicTo(cx + k, cy + r, cx + r, cy + k, cx + r, cy)
    path.close()


def _union(p, q):
    if not len(list(p.contours)):
        return pathops.simplify(q, clockwise=True)
    return pathops.op(p, q, pathops.PathOp.UNION, clockwise=True)


def outline(g, pen_w):
    """The ink of one glyph as a pathops.Path in the working frame: x = K*10*x_svg,
    y = K*10*(100 - y_svg) (y up, the box's bottom-left at the origin)."""
    a = K * 10

    def w(x, y):
        return a * x, a * (100 - y)

    result = pathops.Path()
    d = (g['d'] or '').strip()
    if d:
        rec = RecordingPen()
        parse_path(d, TransformPen(rec, (a, 0, 0, -a, 0, a * 100)))
        subs, cur = [], []
        for op, args in rec.value:
            if op == 'moveTo' and cur:
                subs.append(cur)
                cur = []
            cur.append((op, args))
            if op in ('closePath', 'endPath'):
                subs.append(cur)
                cur = []
        if cur:
            subs.append(cur)
        # Each subpath is stroked on its own with butt ends, and its round caps are added as
        # discs, one for each distinct end point: two caps ending on one point (Theban y's
        # strokes meet so) are then one disc, never two coincident arcs for the union to
        # cut a chord across.
        stroke, ends = pathops.Path(), []
        for sub in subs:
            if not any(op not in ('moveTo', 'closePath', 'endPath') for op, _ in sub):
                continue  # a lone moveto draws nothing
            sp = pathops.Path()
            pp = sp.getPen()
            for op, args in sub:
                getattr(pp, op)(*args)
            sp.stroke(pen_w * a, pathops.LineCap.BUTT_CAP, pathops.LineJoin.ROUND_JOIN, 4)
            sp.convertConicsToQuads(0.25)
            if len(list(sp.contours)):
                stroke = _union(stroke, pathops.simplify(sp, clockwise=True))
            if sub[-1][0] != 'closePath':  # an open subpath has two round caps
                last = [args for op, args in sub if op not in ('closePath', 'endPath')][-1]
                for p in (sub[0][1][0], last[-1]):
                    if p not in ends:
                        ends.append(p)
        for x, y in ends:
            disc = pathops.Path()
            _circle(disc, x, y, pen_w * a / 2, True)
            stroke = _union(stroke, disc)
        holes = pathops.Path()
        for x, y, r, rp, hole in g['rings']:
            if hole > 0:
                hp = pathops.Path()
                _circle(hp, *w(x, y), hole * a, True)
                holes = _union(holes, hp)
        if len(list(holes.contours)):
            stroke = pathops.op(stroke, holes, pathops.PathOp.DIFFERENCE, clockwise=True)
        result = stroke
    for x, y, r, rp, hole in g['rings']:
        ann = pathops.Path()
        _circle(ann, *w(x, y), (r + rp / 2) * a, True)
        if r - rp / 2 > 0:
            _circle(ann, *w(x, y), (r - rp / 2) * a, False)
        result = _union(result, pathops.simplify(ann, clockwise=True))
    for x, y, r in g['dots']:
        disc = pathops.Path()
        _circle(disc, *w(x, y), r * a, True)
        result = _union(result, disc)
    # drop the zero-area slivers path ops can leave (under a quarter of a square font unit)
    clean = pathops.Path()
    cp = clean.getPen()
    for c in result.contours:
        if abs(c.area) >= (K * K) / 4:
            c.draw(cp)
    return clean


def font_units(path, s, dx, dy):
    """working frame -> font units: X = s*x_w/K + dx, Y = s*y_w/K + dy"""
    return path.transform(s / K, 0, 0, s / K, dx, dy)


def tt_glyph(path):
    pen = TTGlyphPen(None)
    path.draw(Cu2QuPen(pen, CU2QU_ERR, reverse_direction=False))
    return pen.glyph()


# --------------------------------------------------------------------------- the font
def layout(a, box):
    """vertical offset, side-bearing, space, and each glyph's horizontal shift and advance"""
    s = a['signScale']
    paths = [outline(g, a['pen']) for g in a['glyphs']]
    if box:
        dy = 0
    else:
        lo, hi = [], []
        for p in paths:
            b = font_units(p, s, 0, BOX_BOTTOM).bounds
            lo.append(b[1])
            hi.append(b[3])
        centre = (statistics.median(lo) + statistics.median(hi)) / 2
        dy = round(BOX_BOTTOM + BAND_CENTRE - centre)
    sb = round(SIDE_BEARING * s)
    glyphs = []
    for g, p in zip(a['glyphs'], paths):
        if box:
            dx, adv = 0, round(UPM * s)
        else:
            x0, _, x1, _ = font_units(p, s, 0, dy).bounds
            dx = round(sb - x0)
            adv = round(x1 - x0) + 2 * sb
        glyphs.append(dict(g=g, path=p, dx=dx, adv=adv, name=f"uni{g['cp']:04X}"))
    return dict(dy=dy, sb=sb, space=round(SPACE * s), glyphs=glyphs)


def build_font(a, box):
    s = a['signScale']
    lay = layout(a, box)
    family = a['family'] + (' Box' if box else '')
    ps = family.replace(' ', '') + '-Regular'
    order = ['.notdef', 'space'] + [x['name'] for x in lay['glyphs']]
    cmap = {0x20: 'space', 0xA0: 'space'}
    glyf, adv = {}, {}
    nd = TTGlyphPen(None)
    for (x0, y0, x1, y1, cw) in ((50, -200, 450, 700, True), (100, -150, 400, 650, False)):
        pts = [(x0, y0), (x0, y1), (x1, y1), (x1, y0)] if cw else [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]
        nd.moveTo(pts[0])
        for q in pts[1:]:
            nd.lineTo(q)
        nd.closePath()
    glyf['.notdef'], adv['.notdef'] = nd.glyph(), 500
    glyf['space'], adv['space'] = TTGlyphPen(None).glyph(), lay['space']
    for x in lay['glyphs']:
        glyf[x['name']] = tt_glyph(font_units(x['path'], s, x['dx'], lay['dy']))
        adv[x['name']] = x['adv']
        cmap[x['g']['cp']] = x['name']
    fb = FontBuilder(UPM, isTTF=True)
    fb.setupGlyphOrder(order)
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(glyf)
    gt = fb.font['glyf']
    metrics = {}
    # a Box test font's line is the SVG box itself, so a test page can put its baseline,
    # and the box, on a whole pixel
    asc, desc = (round(UPM * s), 0) if box else (ASCENT, DESCENT)
    ymax, ymin = asc, desc
    for n in order:
        gg = gt[n]
        gg.recalcBounds(gt)
        has = gg.numberOfContours != 0
        metrics[n] = (adv[n], gg.xMin if has else 0)
        if has:
            ymax, ymin = max(ymax, gg.yMax), min(ymin, gg.yMin)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(ascent=asc, descent=desc, lineGap=0)
    sha12 = a['dataHash'][:12]
    fb.setupNameTable({
        'copyright': LICENCE['copyright'],
        'familyName': family,
        'styleName': 'Regular',
        'uniqueFontIdentifier': f"{VERSION};{LICENCE['vendor']};{ps};data {sha12}",
        'fullName': f'{family} Regular',
        'version': f'Version {VERSION}; data {sha12}',
        'psName': ps,
        'description': a['drawingFollows'],
        'licenseDescription': LICENCE['licence'],
        'licenseInfoURL': LICENCE['licenceURL'],
    }, mac=False)
    hebrew = a['keyedTo'] == 'hebrew'
    fb.setupOS2(version=4, achVendID=LICENCE['vendor'], fsType=LICENCE['fsType'], usWeightClass=400,
                fsSelection=0x40 | 0x80,  # REGULAR | USE_TYPO_METRICS
                sTypoAscender=asc, sTypoDescender=desc, sTypoLineGap=0,
                usWinAscent=ymax, usWinDescent=-ymin, sxHeight=0, sCapHeight=0,
                ulUnicodeRange1=(1 << 11) if hebrew else 1, ulUnicodeRange2=0, ulUnicodeRange3=0,
                ulUnicodeRange4=0, ulCodePageRange1=(1 << 5) if hebrew else 1, ulCodePageRange2=0)
    fb.font['OS/2'].recalcAvgCharWidth(fb.font)
    fb.setupPost(keepGlyphNames=False)
    fb.setupHead(unitsPerEm=UPM, fontRevision=float(VERSION), created=STAMP, modified=STAMP)
    fb.font['head'].flags = 0x0003  # baseline at y=0, lsb at x=0; bit 3 (integer ppem) clear
    gasp = newTable('gasp')
    gasp.version = 1
    gasp.gaspRange = {0xFFFF: 0x000A}  # smooth (grey and symmetric smoothing), no grid-fitting
    fb.font['gasp'] = gasp
    fb.font.recalcTimestamp = False
    fb.font.flavor = 'woff2'
    return fb.font, lay, dict(winAscent=ymax, winDescent=-ymin)


# --------------------------------------------------------------------------- the check
# An independent construction of what MagicGlyph.jsx draws, in SVG units, with shapely:
# its own parser for the kit's path commands, curves and arcs flattened finely, strokes as
# buffers with round caps and joins, the holes, annuli and dots as buffered points.
SEG = 64            # samples per curve
QUAD_SEGS = 64      # buffer resolution (a quarter circle in 64 segments)
QSEG = 16           # samples per TrueType quadratic (cu2qu's are short)
SLIVER = 1e-3       # square SVG units: the noise a union of coincident circles can leave
STEP = 0.02         # the spacing of the points the Hausdorff distance is taken from


def _tokens(d):
    return re.findall(r'[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?', d)


def _arc(p0, rx, ry, phi, large, sweep, p1):
    """SVG 1.1 F.6.5: endpoint to centre parameterisation, sampled every 1 degree or less"""
    if p0 == p1:
        return []
    rx, ry = abs(rx), abs(ry)
    if rx == 0 or ry == 0:
        return [p1]
    c, s_ = math.cos(math.radians(phi)), math.sin(math.radians(phi))
    dx2, dy2 = (p0[0] - p1[0]) / 2, (p0[1] - p1[1]) / 2
    x1p, y1p = c * dx2 + s_ * dy2, -s_ * dx2 + c * dy2
    lam = (x1p / rx) ** 2 + (y1p / ry) ** 2
    if lam > 1:
        rx, ry = rx * math.sqrt(lam), ry * math.sqrt(lam)
    num = rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p
    den = rx * rx * y1p * y1p + ry * ry * x1p * x1p
    co = math.sqrt(max(0.0, num / den)) * (-1 if large == sweep else 1)
    cxp, cyp = co * rx * y1p / ry, -co * ry * x1p / rx
    cx = c * cxp - s_ * cyp + (p0[0] + p1[0]) / 2
    cy = s_ * cxp + c * cyp + (p0[1] + p1[1]) / 2

    def ang(ux, uy, vx, vy):
        return math.atan2(ux * vy - uy * vx, ux * vx + uy * vy)

    t1 = ang(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
    dt = ang((x1p - cxp) / rx, (y1p - cyp) / ry, (-x1p - cxp) / rx, (-y1p - cyp) / ry)
    if not sweep and dt > 0:
        dt -= 2 * math.pi
    elif sweep and dt < 0:
        dt += 2 * math.pi
    n = max(2, int(math.ceil(abs(math.degrees(dt)))))
    out = []
    for i in range(1, n + 1):
        t = t1 + dt * i / n
        out.append((cx + rx * math.cos(t) * c - ry * math.sin(t) * s_,
                    cy + rx * math.cos(t) * s_ + ry * math.sin(t) * c))
    out[-1] = p1
    return out


def centre_lines(d):
    """[(points, draws)] for each subpath, in SVG units (the kit's absolute commands only);
    draws is False for a subpath that only moves the pen"""
    toks = _tokens(d)
    i, cmd = 0, None
    subs, cur, start, prev_ctrl = [], None, None, None

    def num():
        nonlocal i
        v = float(toks[i])
        i += 1
        return v

    def cubic(p0, a, b, p3):
        return [((1 - t) ** 3 * p0[0] + 3 * (1 - t) ** 2 * t * a[0] + 3 * (1 - t) * t * t * b[0] + t ** 3 * p3[0],
                 (1 - t) ** 3 * p0[1] + 3 * (1 - t) ** 2 * t * a[1] + 3 * (1 - t) * t * t * b[1] + t ** 3 * p3[1])
                for t in (k / SEG for k in range(1, SEG + 1))]

    def quad(p0, a, p2):
        return [((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * a[0] + t * t * p2[0],
                 (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * a[1] + t * t * p2[1])
                for t in (k / SEG for k in range(1, SEG + 1))]

    def reflect(kind):
        if prev_ctrl and prev_ctrl[0] == kind:
            return (2 * cur[0] - prev_ctrl[1][0], 2 * cur[1] - prev_ctrl[1][1])
        return cur

    while i < len(toks):
        if toks[i].isalpha():
            cmd = toks[i]
            i += 1
            if cmd not in 'MLHVCSQTAZ':
                raise SystemExit(f"build-traced-fonts: path command {cmd!r} is not one of the kit's absolute commands")
            if cmd == 'Z':
                if subs:
                    subs[-1]['pts'].append(start)
                    subs[-1]['draws'] = True
                    cur = start
                prev_ctrl = None
                continue
        if cmd is None:
            raise SystemExit('build-traced-fonts: a path must begin with M')
        if cmd == 'M':
            cur = start = (num(), num())
            subs.append(dict(pts=[cur], draws=False))
            prev_ctrl = None
            cmd = 'L'  # further pairs after M are lines
            continue
        pts, ctrl = subs[-1]['pts'], None
        if cmd == 'L':
            p = (num(), num())
            pts.append(p)
        elif cmd == 'H':
            p = (num(), cur[1])
            pts.append(p)
        elif cmd == 'V':
            p = (cur[0], num())
            pts.append(p)
        elif cmd in 'CS':
            a = (num(), num()) if cmd == 'C' else reflect('C')
            b, p = (num(), num()), (num(), num())
            pts += cubic(cur, a, b, p)
            ctrl = ('C', b)
        elif cmd in 'QT':
            a = (num(), num()) if cmd == 'Q' else reflect('Q')
            p = (num(), num())
            pts += quad(cur, a, p)
            ctrl = ('Q', a)
        else:  # A
            rx, ry, phi, large, sweep = num(), num(), num(), num(), num()
            p = (num(), num())
            pts += _arc(cur, rx, ry, phi, int(large), int(sweep), p)
        subs[-1]['draws'] = True
        prev_ctrl, cur = ctrl, p
    return [(sp['pts'], sp['draws']) for sp in subs]


def ideal(g, pen):
    parts = []
    if (g['d'] or '').strip():
        strokes = []
        for pts, draws in centre_lines(g['d']):
            if not draws:
                continue  # a lone moveto draws nothing
            if len(set(pts)) == 1:
                strokes.append(Point(pts[0]).buffer(pen / 2, quad_segs=QUAD_SEGS))
            else:
                strokes.append(LineString(pts).buffer(pen / 2, quad_segs=QUAD_SEGS, cap_style='round', join_style='round'))
        st = unary_union(strokes)
        holes = [Point(x, y).buffer(hole, quad_segs=2 * QUAD_SEGS) for x, y, r, rp, hole in g['rings'] if hole > 0]
        if holes:
            st = st.difference(unary_union(holes))
        parts.append(st)
    for x, y, r, rp, hole in g['rings']:
        c = Point(x, y)
        ann = c.buffer(r + rp / 2, quad_segs=2 * QUAD_SEGS)
        if r - rp / 2 > 0:
            ann = ann.difference(c.buffer(r - rp / 2, quad_segs=2 * QUAD_SEGS))
        parts.append(ann)
    for x, y, r in g['dots']:
        parts.append(Point(x, y).buffer(r, quad_segs=QUAD_SEGS))
    return _clean(unary_union(parts))


def _clean(geom):
    polys = []
    for p in getattr(geom, 'geoms', [geom]):
        if p.is_empty or p.geom_type != 'Polygon' or p.area < SLIVER:
            continue
        polys.append(Polygon(p.exterior, [h for h in p.interiors if Polygon(h).area >= SLIVER]))
    return shapely.MultiPolygon(polys) if len(polys) != 1 else polys[0]


class _Flatten(BasePen):
    def __init__(self, glyphset, tf):
        super().__init__(glyphset)
        self.tf, self.contours, self.cur = tf, [], []

    def _moveTo(self, p):
        self.cur = [self.tf(p)]

    def _lineTo(self, p):
        self.cur.append(self.tf(p))

    def _qCurveToOne(self, a, b):
        p0 = self._getCurrentPoint()
        for k in range(1, QSEG + 1):
            t = k / QSEG
            self.cur.append(self.tf(((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * a[0] + t * t * b[0],
                                     (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * a[1] + t * t * b[1])))

    def _curveToOne(self, a, b, c):
        raise SystemExit('build-traced-fonts: a TrueType glyph holds a cubic')

    def _closePath(self):
        self.contours.append(self.cur)
        self.cur = []

    _endPath = _closePath


def font_shape(font, name, s, dx, dy):
    """the glyph as written, back in SVG units (even-odd: the contours do not overlap)"""
    a = 10 * s
    pen = _Flatten(font.getGlyphSet(), lambda p: ((p[0] - dx) / a, 100 - (p[1] - dy) / a))
    font.getGlyphSet()[name].draw(pen)
    shape = Polygon()
    for c in pen.contours:
        if len(c) > 2:
            shape = shape.symmetric_difference(Polygon(c).buffer(0))
    return _clean(shape)


def _segments(geom):
    out = []
    for p in getattr(geom, 'geoms', [geom]):
        for ring in [p.exterior, *p.interiors]:
            c = shapely.get_coordinates(ring)
            out.append(shapely.linestrings(numpy.stack([c[:-1], c[1:]], axis=1)))
    return numpy.concatenate(out)


def hausdorff(A, B):
    """The Hausdorff distance of two boundaries: from every point of each, taken every
    STEP along it, the exact distance to the other's nearest segment. Sampling can only
    under-read the distance, by at most STEP / 2 (0.01), which the result adds."""
    worst = 0.0
    for X, Y in ((A, B), (B, A)):
        pts = shapely.points(shapely.get_coordinates(shapely.segmentize(X.boundary, STEP)))
        tree = shapely.STRtree(_segments(Y))
        _, dist = tree.query_nearest(pts, return_distance=True, all_matches=False)
        worst = max(worst, float(dist.max()))
    return worst + STEP / 2


def counts(geom):
    polys = list(getattr(geom, 'geoms', [geom]))
    return len(polys), sum(len(p.interiors) for p in polys)


_IDEAL = {}


def check_font(path, a, lay, box):
    """read the woff2 back and hold every glyph to the independent construction"""
    font = TTFont(path)
    errors, rows = [], []
    want = {g['cp'] for g in a['glyphs']} | {0x20, 0xA0}
    have = set(font.getBestCmap())
    if have != want:
        errors.append(f"cmap is not the scheme's keys: extra {sorted(have - want)}, missing {sorted(want - have)}")
    cm = font.getBestCmap()
    order = font.getGlyphOrder()  # a woff2 without glyph names: fontTools names them anew
    for gi, x in enumerate(lay['glyphs'], start=2):  # after .notdef and space
        g = x['g']
        name = cm.get(g['cp'])
        if name is None or order.index(name) != gi:
            errors.append(f"{g['key']}: U+{g['cp']:04X} does not map to its glyph")
            continue
        key = (a['slug'], g['key'])
        if key not in _IDEAL:
            _IDEAL[key] = ideal(g, a['pen'])
        A = _IDEAL[key]
        B = font_shape(font, name, a['signScale'], x['dx'], lay['dy'])
        hd = hausdorff(A, B)
        area = A.symmetric_difference(B).area / A.area
        (pa, ha), (pb, hb) = counts(A), counts(B)
        rows.append(dict(key=g['key'], cp=f"U+{g['cp']:04X}", hausdorff=round(hd, 4), areaDiff=round(area, 5),
                         polygons=[pa, pb], holes=[ha, hb], advance=x['adv'], dx=x['dx']))
        if hd > MAX_HAUSDORFF:
            errors.append(f"{g['key']}: Hausdorff distance {hd:.3f} SVG units, over {MAX_HAUSDORFF}")
        if pa != pb or ha != hb:
            errors.append(f"{g['key']}: {pb} polygons and {hb} holes in the font, {pa} and {ha} drawn")
    if errors:
        raise SystemExit(f"build-traced-fonts: {os.path.basename(path)}{' (Box)' if box else ''} fails its check:\n  "
                         + '\n  '.join(errors))
    return rows


# --------------------------------------------------------------------------- outputs
CSS_HEAD = """/* GENERATED by tools/fonts/build-traced-fonts.py from the wing's traced glyph data —
   do not edit; run `python -I tools/fonts/build-traced-fonts.py` in apps/web.
   The cipher faces of the transliterator's writ, one per drawn alphabet it writes. Each
   maps exactly its alphabet's transliteration keys, so only the writ (.mg-writ.is-text,
   which names the face through --mg-face) sets text in it; no stack names these
   families. font-display: block, because the page shows the drawn writ until the face
   has loaded (document.fonts.load) and never the bare key letters. The files are
   imported relatively, so Vite fingerprints them and serves them from /assets/;
   ?no-inline keeps the smaller ones out of the stylesheet as data: URLs, so a page
   downloads only the face it writes in.
   Licence: """ + LICENCE['licence'] + """ */
"""


def write_outputs(alphabets, records):
    css = [CSS_HEAD]
    for a in alphabets:
        css.append('@font-face {\n'
                   f'  font-family: "{a["family"]}";\n'
                   f'  src: url("../assets/fonts/traced/{a["file"]}?no-inline") format("woff2");\n'
                   '  font-weight: 100 900;\n'
                   '  font-style: normal;\n'
                   '  font-display: block;\n'
                   '}\n')
    with open(CSS_OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write('\n'.join(css))
    js = ('// GENERATED by tools/fonts/build-traced-fonts.py — do not edit. The cipher fonts the\n'
          '// transliterator\'s writ is set in (src/assets/fonts/traced): for each alphabet, the\n'
          '// family, the sha256 of the traced data it was built from (tools/fonts/dump-traced.mjs)\n'
          '// and the sha256 of the woff2. validate-magic.mjs fails the build if either is stale.\n'
          'export default ' + json.dumps(records, indent=1, ensure_ascii=False) + ';\n')
    with open(JS_OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(js)


def main():
    ap = argparse.ArgumentParser(description='Build the traced cipher fonts.')
    ap.add_argument('--box', metavar='DIR', help='also write the "Box" test fonts into DIR (never the repository)')
    ap.add_argument('--report', metavar='JSON', help='write every glyph\'s checks and each font\'s metrics')
    args = ap.parse_args()
    if args.box and os.path.abspath(args.box).startswith(WEB + os.sep):
        raise SystemExit('build-traced-fonts: --box writes test fonts, which never go into the repository')
    alphabets = load_dump()
    os.makedirs(FONT_DIR, exist_ok=True)
    stale = set(os.listdir(FONT_DIR)) - {a['file'] for a in alphabets}
    for f in sorted(stale):
        os.remove(os.path.join(FONT_DIR, f))
    records, report = {}, {}
    for a in alphabets:
        font, lay, win = build_font(a, box=False)
        out = os.path.join(FONT_DIR, a['file'])
        font.save(out)
        rows = check_font(out, a, lay, box=False)
        data = open(out, 'rb').read()
        records[a['slug']] = dict(family=a['family'], dataHash=a['dataHash'], woff2Sha256=hashlib.sha256(data).hexdigest())
        worst = max(rows, key=lambda r: r['hausdorff'])
        report[a['slug']] = dict(family=a['family'], file=a['file'], bytes=len(data), glyphs=len(rows),
                                 signScale=a['signScale'], yOffset=lay['dy'], sideBearing=lay['sb'], space=lay['space'],
                                 win=win, worstHausdorff=worst['hausdorff'], worstKey=worst['key'],
                                 meanAreaDiff=round(sum(r['areaDiff'] for r in rows) / len(rows), 6),
                                 maxAreaDiff=max(r['areaDiff'] for r in rows), glyphRows=rows)
        line = (f"{a['family']:17s} {len(rows):2d} glyphs  {len(data):6d} B  scale {a['signScale']:<4} "
                f"y {lay['dy']:+4d}  sb {lay['sb']:3d}  win {win['winAscent']}/{-win['winDescent']}  "
                f"worst Hausdorff {worst['hausdorff']:.3f} ({worst['key']})  "
                f"mean area diff {report[a['slug']]['meanAreaDiff'] * 100:.3f}%")
        if args.box:
            os.makedirs(args.box, exist_ok=True)
            bfont, blay, _ = build_font(a, box=True)
            bout = os.path.join(args.box, a['file'].replace('.woff2', 'Box.woff2'))
            bfont.save(bout)
            brows = check_font(bout, a, blay, box=True)
            bw = max(brows, key=lambda r: r['hausdorff'])
            report[a['slug']]['box'] = dict(file=bout, worstHausdorff=bw['hausdorff'], worstKey=bw['key'],
                                            advance=round(UPM * a['signScale']))
            line += f"  | Box worst {bw['hausdorff']:.3f}"
        print(line)
    write_outputs(alphabets, records)
    if args.report:
        with open(args.report, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=1, ensure_ascii=False)


if __name__ == '__main__':
    main()

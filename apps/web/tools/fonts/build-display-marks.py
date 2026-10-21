"""Cut public/fonts/TLDisplayMarks-{400,500,600,700,800}.woff2: the letters and signs the
site sets in Cinzel that Cinzel does not have, made from Cinzel's own outlines.
Provenance and licence: public/fonts/SOURCES.txt and public/fonts/OFL.txt.

The files are declared in src/index.css as more faces of the "Cinzel" family, one per
weight, so every Cinzel stack on the site draws these characters with Cinzel's shapes
instead of falling back to another face in the middle of a word. Internally the font is
named "TL Display Marks" (a modified version takes its own name).

Not part of `npm run build`; run it by hand when the set changes. Needs Python 3.11 with
fontTools 4.67.0, skia-pathops 0.9.2 and brotli 1.2.0 (pip install fonttools==4.67.0
skia-pathops==0.9.2 brotli==1.2.0); with those versions a rebuild gives the same bytes.
The inputs are the two subsets of the variable Cinzel 2.000 in
@fontsource-variable/cinzel@5.3.0, byte for byte the files Google Fonts serves the site
(fonts.gstatic.com/s/cinzel/v26/), fetched without installing the package:

  npm pack @fontsource-variable/cinzel@5.3.0   (unpack it; the files are under package/files/)

usage: python -I tools/fonts/build-display-marks.py <package/files dir> public/fonts

Why the variable font. Google serves one variable file for every weight, and the browser
draws a letter at 500 by applying the font's own variations (gvar) to it. Static instances
cut at 500 are rounded to whole units, so a base letter drawn from them differs from the
same letter in Google's file by up to a unit, which shows at large sizes as a few hundred
pixels of antialiasing beside H. So each file written here for 500 .. 800 is itself a
variable font: the glyphs it takes from Cinzel keep their outlines and their variations
unchanged, and the browser varies them exactly as it varies Cinzel's. At 400, the axis's
default, no variation applies, and the file is static (the one most pages load stays small). Each file is declared at one weight,
which the browser applies to the font's weight axis, and everything the script places
(where a dot or an ogonek goes, the cut of the ring, the parts of № and the arrows) is
measured on Cinzel as it is drawn at that weight.

For each weight it reads cinzel-latin-wght-normal.woff2 and cinzel-latin-ext-wght-normal.woff2
and writes TLDisplayMarks-{w}.woff2. Nothing is drawn by hand. The glyphs:

  Ḍḍ Ḥḥ Ḳḳ Ḷḷ Ṛṛ Ṣṣ Ṭṭ Ẓẓ   composites [base, uni0307]; uni0307 is the dot of Ż ż. The dot
                           is centred under the base's ink centre (under the stem centre
                           for T t L l), and its top sits as far below the baseline as the
                           dot of ż sits above the top of z. Advance = the base's.
  ʾ ʿ (U+02BE, U+02BF)     Cinzel's ring (U+02DA) cut in half with a pathops intersection
                           on its vertical axis: ʾ is the right half, ʿ the left. Each is
                           moved so its vertical ink centre equals quoteright's, with
                           quoteright's side-bearings.
  ʼ (U+02BC)               composite [quoteright].
  Ǫ ǫ                      composites [O or o, uni0328]: the ogonek of Ę ę (Ę − E is
                           exactly that uni0328 component, which the script checks), placed
                           as Ę places it relative to its base's right foot.
  №                        [N, o scaled 0.62 with its top on the cap height 700, endash
                           scaled (uniformly) to the o's ink width, 40 units below the o].
  ← →                      [endash scaled 1.3 horizontally, guilsinglleft or guilsinglright
                           scaled 0.8], both centred on y = 291 (the dash mirrored, so its
                           winding agrees with the chevron's). The chevron's apex is the
                           arrow's tip and the dash ends inside the chevron's stroke, so
                           the dash's square end never stands out past the apex. The
                           arrow takes the side-bearings of Cinzel's hyphen.

The font keeps Cinzel's hhea, OS/2 typo and win metrics (976 / -372) exactly, so a line
holding one of these is never taller, and Cinzel's own gasp and prep (Cinzel has no
glyph hinting); no layout tables. The script asserts that every outline it reuses equals
the source glyph's point for point, with the same variations and advance, and the same
outline at the file's weight; that each half ring is made of the ring's own outline and
that the two halves are exactly the ring; that overlapping components wind the same way
(so the non-zero fill never cancels them to a hole); and that no ink leaves the line's
metrics.
"""
import os
import sys

import pathops
from fontTools import subset
from fontTools.pens.recordingPen import DecomposingRecordingPen, RecordingPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont, newTable
from fontTools.ttLib.tables._g_l_y_f import (
    Glyph, GlyphComponent, ROUND_XY_TO_GRID, UNSCALED_COMPONENT_OFFSET)

SRC_DIR, OUT_DIR = sys.argv[1:3]
WEIGHTS = (400, 500, 600, 700, 800)
WEIGHT_STYLE = {400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold', 800: 'ExtraBold'}

DOT_BELOW = {  # code point: base glyph
    0x1E0C: 'D', 0x1E0D: 'd', 0x1E24: 'H', 0x1E25: 'h', 0x1E32: 'K', 0x1E33: 'k',
    0x1E36: 'L', 0x1E37: 'l', 0x1E5A: 'R', 0x1E5B: 'r', 0x1E62: 'S', 0x1E63: 's',
    0x1E6C: 'T', 0x1E6D: 't', 0x1E92: 'Z', 0x1E93: 'z'}
UNDER_STEM = {'T', 't', 'L', 'l'}
OGONEK = {0x01EA: ('O', 'E', 'Eogonek'), 0x01EB: ('o', 'e', 'eogonek')}
CPS = sorted(list(DOT_BELOW) + list(OGONEK) + [0x02BC, 0x02BE, 0x02BF, 0x2116, 0x2190, 0x2192])
# the unicode-range of the five @font-face rules in src/index.css is exactly this set
UNICODE_RANGE = ('U+01EA-01EB, U+02BC, U+02BE-02BF, U+1E0C-1E0D, U+1E24-1E25, U+1E32-1E33, '
                 'U+1E36-1E37, U+1E5A-1E5B, U+1E62-1E63, U+1E6C-1E6D, U+1E92-1E93, U+2116, '
                 'U+2190, U+2192')
NUMERO_O_SCALE = 0.62
NUMERO_CAP = 700
NUMERO_GAP = 40
ARROW_DASH_X = 1.3
ARROW_HEAD = 0.8
ARROW_AXIS = 291

COPYRIGHT_ADD = 'Modified 2026, Three Magi Press.'
LICENCE = 'This Font Software is licensed under the SIL Open Font License, Version 1.1.'
LICENCE_URL = 'https://scripts.sil.org/OFL'   # the source font's own name ID 14


def parse_range(s):
    out = []
    for part in s.split(','):
        a, _, b = part.strip()[2:].partition('-')
        out += range(int(a, 16), int(b or a, 16) + 1)
    return out


assert parse_range(UNICODE_RANGE) == CPS, 'UNICODE_RANGE and CPS disagree'


def path_of(glyphset, name, transform=None):
    p = pathops.Path()
    pen = p.getPen(glyphSet=glyphset)
    glyphset[name].draw(TransformPen(pen, transform) if transform else pen)
    return p


def bounds(p):
    return p.bounds  # (xMin, yMin, xMax, yMax)


def band(glyphset, name, y0, y1):
    """The ink of a glyph inside the horizontal band y0..y1, as a path."""
    rect = pathops.Path()
    rect.moveTo(-5000, y0); rect.lineTo(5000, y0); rect.lineTo(5000, y1); rect.lineTo(-5000, y1)
    rect.close()
    return pathops.op(path_of(glyphset, name), rect, pathops.PathOp.INTERSECTION)


def simple_points(glyf, name):
    g = glyf[name]
    assert not g.isComposite(), name
    c, ends, flags = g.getCoordinates(glyf)
    return [tuple(p) for p in c], list(ends), [f & 1 for f in flags]


def inst_points(glyphset, name):
    """A simple glyph's points as the font draws it at the glyph set's location (unrounded)."""
    g = glyphset[name]._getGlyphInstance()
    assert not g.isComposite(), name
    c, ends, flags = g.getCoordinates(glyphset.glyfTable)
    return [tuple(p) for p in c], list(ends), [f & 1 for f in flags]


def inst_components(glyphset, name):
    """A composite's components and their offsets at the glyph set's location: the offsets
    vary too (Ę's ogonek moves out as the E grows heavier)."""
    g = glyphset[name]._getGlyphInstance()
    return {c.glyphName: c for c in g.components}


def variations(font, name):
    """A glyph's gvar deltas, comparable across two fonts."""
    return [(sorted(v.axes.items()), list(v.coordinates)) for v in font['gvar'].variations.get(name, [])]


def near(pt, pts, tol=1e-3):
    return any(abs(pt[0] - q[0]) < tol and abs(pt[1] - q[1]) < tol for q in pts)


def on_polygon(pt, pts, ends, tol=1e-3):
    """True if pt lies on the control polygon of the contours (each closed)."""
    start = 0
    for e in ends:
        c = pts[start:e + 1]
        start = e + 1
        for a, b in zip(c, c[1:] + c[:1]):
            ax, ay, bx, by = a[0], a[1], b[0], b[1]
            dx, dy = bx - ax, by - ay
            L = dx * dx + dy * dy
            t = 0 if L == 0 else max(0, min(1, ((pt[0] - ax) * dx + (pt[1] - ay) * dy) / L))
            if ((ax + t * dx - pt[0]) ** 2 + (ay + t * dy - pt[1]) ** 2) ** 0.5 < tol:
                return True
    return False


def comp(name, x, y, flags=ROUND_XY_TO_GRID, scale=None):
    c = GlyphComponent()
    c.glyphName = name
    c.x, c.y = int(round(x)), int(round(y))
    c.flags = flags
    if scale is not None:
        c.transform = [[scale[0], 0], [0, scale[1]]]
        c.flags |= UNSCALED_COMPONENT_OFFSET
    return c


def composite(components):
    g = Glyph()
    g.numberOfContours = -1
    g.components = components
    return g


LAT, EXT = 'cinzel-latin-wght-normal.woff2', 'cinzel-latin-ext-wght-normal.woff2'


def build(w):
    lat = TTFont(os.path.join(SRC_DIR, LAT))
    ext = TTFont(os.path.join(SRC_DIR, EXT))
    font = TTFont(os.path.join(SRC_DIR, LAT))
    loc = {'wght': w}
    assert [a.axisTag for a in font['fvar'].axes] == ['wght']
    # HVAR goes: the new glyphs have no row in it, and without it every renderer takes a
    # glyph's varied advance from its gvar phantom points, which carry the same deltas
    # (the check below compares them with HVAR's at this weight)
    del font['HVAR']
    # A composite's advance is its own (hmtx), set for this weight, and not its base's
    # (no USE_MY_METRICS): Cinzel's varied advances are in HVAR, which this file lacks,
    # and its gvar phantom points do not carry them.
    glyf, hmtx, gvar = font['glyf'], font['hmtx'], font['gvar']
    eglyf, ehmtx = ext['glyf'], ext['hmtx']
    # the two subset files are cut from one font: the glyphs they share must be identical
    for n in ['O', 'o', 'E', 'e', 'Z', 'z', 'T', 't', 'L', 'l', 'K', 'k', 'R', 'r', 'S', 's',
              'D', 'd', 'N', 'ring', 'dotaccent']:
        assert simple_points(glyf, n) == simple_points(eglyf, n) and hmtx[n] == ehmtx[n], (w, n)
        assert variations(lat, n) == variations(ext, n), (w, n)
    # the ogonek lives only in latin-ext: bring it (and its combining form) across
    for n in ('ogonek', 'uni0328'):
        assert n not in glyf
        glyf[n] = eglyf[n]
        hmtx[n] = ehmtx[n]
        gvar.variations[n] = ext['gvar'].variations[n]
    font.setGlyphOrder(list(glyf.glyphOrder))
    gs = font.getGlyphSet(location=loc)
    egs = ext.getGlyphSet(location=loc)
    new = {}  # code point -> (glyph name, Glyph, advance, lsb or None)

    # --- the dot below: uni0307 (= [dotaccent]) as zdotaccent places it, mirrored ---
    zc = inst_components(egs, 'zdotaccent')
    assert set(zc) == {'z', 'uni0307'} and (zc['z'].x, zc['z'].y) == (0, 0)
    dot = bounds(path_of(gs, 'uni0307'))
    z_top = bounds(path_of(gs, 'z'))[3]
    gap = dot[1] + zc['uni0307'].y - z_top      # dot bottom above the top of z
    assert gap > 0
    dot_dy = -gap - dot[3]                        # dot top that far below the baseline
    dot_cx = (dot[0] + dot[2]) / 2
    report = {'dotGap': gap}
    for u, base in DOT_BELOW.items():
        b = bounds(path_of(gs, base))
        if base in UNDER_STEM:  # the stem is the only ink at half height
            mid = (b[1] + b[3]) / 2
            s = bounds(band(gs, base, mid - 2, mid + 2))
            cx = (s[0] + s[2]) / 2
        else:
            cx = (b[0] + b[2]) / 2
        g = composite([comp(base, 0, 0),
                       comp('uni0307', cx - dot_cx, dot_dy)])
        new[u] = ('uni%04X' % u, g, int(round(gs[base].width)), None)
        report['dot ' + base] = (round(cx, 2), round(cx - dot_cx, 2), round(dot_dy, 2))

    # --- ʼ: quoteright itself ---
    qr = bounds(path_of(gs, 'quoteright'))            # its ink (tight bounds)
    qr_box = path_of(gs, 'quoteright').controlPointBounds
    qr_adv, qr_lsb = gs['quoteright'].width, qr_box[0]
    qr_rsb = qr_adv - qr_box[2]                       # as hmtx counts it
    new[0x02BC] = ('uni02BC', composite([comp('quoteright', 0, 0)]), int(round(qr_adv)), None)

    # --- ʾ ʿ: the ring cut in half on its vertical axis ---
    # The axis is the x of the on-curve top and bottom points of the ring's two contours
    # (at 700 one of the four sits a unit to the right of the others: the majority wins).
    rpts, rends, rflags = inst_points(gs, 'ring')
    tops = []
    start = 0
    for e in rends:
        on = [p for p, f in zip(rpts[start:e + 1], rflags[start:e + 1]) if f]
        tops += [max(on, key=lambda p: p[1]), min(on, key=lambda p: p[1])]
        start = e + 1
    xs = [round(p[0], 3) for p in tops]
    axis = max(set(xs), key=xs.count)
    assert xs.count(axis) >= 3 and all(abs(x - axis) <= 1 for x in xs), ('the ring has no vertical axis', tops)
    ring = path_of(gs, 'ring')
    rb = bounds(ring)
    halves = {}
    for u, x0, x1 in ((0x02BE, axis, rb[2] + 50), (0x02BF, rb[0] - 50, axis)):
        rect = pathops.Path()
        rect.moveTo(x0, rb[1] - 50); rect.lineTo(x0, rb[3] + 50); rect.lineTo(x1, rb[3] + 50)
        rect.lineTo(x1, rb[1] - 50); rect.close()
        half = pathops.op(ring, rect, pathops.PathOp.INTERSECTION, clockwise=True)
        halves[u] = half
        rec = RecordingPen()
        half.draw(rec)
        ops = {op for op, _ in rec.value}
        assert ops <= {'moveTo', 'lineTo', 'qCurveTo', 'closePath'}, ops
        # made of the ring's own points. Where the cut splits a curve (at 700, whose top
        # point is a unit off the axis) the split adds points that lie on the ring's control
        # polygon (de Casteljau), or on the cut itself
        added = [pt for op, args in rec.value for pt in args if not near(pt, rpts)]
        assert len(added) <= 6, ('too many new points', u, added)
        for pt in added:
            assert abs(pt[0] - axis) < 1e-3 or on_polygon(pt, rpts, rends), ('not a ring point', u, pt)
        ink, box = bounds(half), half.controlPointBounds
        dy = int(round((qr[1] + qr[3]) / 2 - (ink[1] + ink[3]) / 2))   # ink centre = quoteright's
        dx = int(round(qr_lsb - box[0]))                              # its lsb = quoteright's
        pen = TTGlyphPen(None)
        half.draw(TransformPen(pen, (1, 0, 0, 1, dx, dy)))
        g = pen.glyph()
        adv = int(round(qr_lsb + (box[2] - box[0]) + qr_rsb))          # its rsb = quoteright's
        new[u] = ('uni%04X' % u, g, adv, None)
        report['half %04X' % u] = {'axis': axis, 'dx': dx, 'dy': dy, 'adv': adv,
                                   'inkCentreY': (ink[1] + ink[3]) / 2 + dy, 'quoterightCentreY': (qr[1] + qr[3]) / 2}
    both = pathops.op(halves[0x02BE], halves[0x02BF], pathops.PathOp.UNION)
    assert pathops.op(both, ring, pathops.PathOp.XOR).area == 0, 'the two halves are not the ring'
    assert pathops.op(halves[0x02BE], halves[0x02BF], pathops.PathOp.INTERSECTION).area == 0

    # --- Ǫ ǫ: the ogonek of Ę ę, placed relative to the base's right foot ---
    def right_foot(glyphset, name):
        b = bounds(path_of(glyphset, name))
        return bounds(band(glyphset, name, b[1] + 8, b[1] + 12))[2]
    for u, (base, model, modelog) in OGONEK.items():
        mc = inst_components(egs, modelog)
        assert set(mc) == {model, 'uni0328'} and (mc[model].x, mc[model].y) == (0, 0)
        # Ę − E (pathops difference) is the ogonek component as Ę places it
        diff = pathops.op(path_of(egs, modelog), path_of(egs, model), pathops.PathOp.DIFFERENCE)
        ogk = path_of(gs, 'uni0328', (1, 0, 0, 1, mc['uni0328'].x, mc['uni0328'].y))
        ogk_out = pathops.op(ogk, path_of(egs, model), pathops.PathOp.DIFFERENCE)
        assert abs(pathops.op(diff, ogk_out, pathops.PathOp.XOR).area) < 1
        rel = mc['uni0328'].x - right_foot(egs, model)
        dx = right_foot(gs, base) + rel
        g = composite([comp(base, 0, 0),
                       comp('uni0328', dx, mc['uni0328'].y)])
        new[u] = ('uni%04X' % u, g, int(round(gs[base].width)), None)
        report['ogonek ' + base] = (round(dx, 2), mc['uni0328'].y)

    # --- №: N, a raised small o, and a bar under it ---
    s = NUMERO_O_SCALE
    o = bounds(path_of(gs, 'o'))
    n_adv = gs['N'].width
    oy = NUMERO_CAP - s * o[3]
    o_l, o_r, o_bot = n_adv + s * o[0], n_adv + s * o[2], oy + s * o[1]
    dash = bounds(path_of(gs, 'endash'))
    ds = (o_r - o_l) / (dash[2] - dash[0])
    dx = o_l - ds * dash[0]
    dy = (o_bot - NUMERO_GAP) - ds * dash[3]
    g = composite([comp('N', 0, 0), comp('o', n_adv, oy, scale=(s, s)),
                   comp('endash', dx, dy, scale=(ds, ds))])
    new[0x2116] = ('uni2116', g, int(round(n_adv + s * gs['o'].width)), None)
    report['numero'] = (round(oy), round(ds, 4), round(dx), round(dy))

    # --- ← →: a long dash and a smaller chevron ---
    hy = bounds(path_of(gs, 'hyphen'))
    hy_adv, hy_lsb = gs['hyphen'].width, path_of(gs, 'hyphen').controlPointBounds[0]
    hy_rsb = hy_adv - hy[2]
    assert abs((dash[1] + dash[3]) / 2 - ARROW_AXIS) <= 0.5, ('endash is not centred on the axis', dash)
    dash_len = ARROW_DASH_X * (dash[2] - dash[0])
    for u, chev, left in ((0x2190, 'guilsinglleft', True), (0x2192, 'guilsinglright', False)):
        cpts, _, cfl = inst_points(gs, chev)
        cb = bounds(path_of(gs, chev))
        apex = min(cpts, key=lambda p: p[0]) if left else max(cpts, key=lambda p: p[0])
        inner = [p for p, f in zip(cpts, cfl) if f and p != apex and abs(p[1] - apex[1]) <= 2]
        assert len(inner) == 1, (chev, inner)
        inner = inner[0]
        k = ARROW_HEAD
        cy = ARROW_AXIS - k * (cb[1] + cb[3]) / 2
        if left:
            cx = hy_lsb - k * apex[0]                    # the apex on the left side-bearing
            end = cx + k * (apex[0] + inner[0]) / 2      # the dash starts inside the stroke
            ddx = end + ARROW_DASH_X * dash[2]
            adv = int(round(end + dash_len + hy_rsb))
        else:
            ddx = hy_lsb + ARROW_DASH_X * dash[2]
            end = hy_lsb + dash_len                       # the dash's right end
            cx = end - k * (apex[0] + inner[0]) / 2
            adv = int(round(cx + k * apex[0] + hy_rsb))
        # Cinzel's chevrons run counter-clockwise and its dash clockwise: under the non-zero rule
        # their overlap would cancel to a hole. The dash is therefore mirrored (scale -1.3), which
        # leaves a rectangle unchanged and turns its winding to the chevron's.
        g = composite([comp('endash', ddx, ARROW_AXIS - (dash[1] + dash[3]) / 2, scale=(-ARROW_DASH_X, 1)),
                       comp(chev, cx, cy, scale=(k, k))])
        new[u] = ('arrowleft' if left else 'arrowright', g, adv, None)
        report['arrow %04X' % u] = (round(cx), round(cy), round(ddx), adv)
        # no part of the dash may stand outside the chevron beyond the apex
        dpath = path_of(gs, 'endash', (-ARROW_DASH_X, 0, 0, 1, int(round(ddx)), int(round(ARROW_AXIS - (dash[1] + dash[3]) / 2))))
        cpath = path_of(gs, chev, (k, 0, 0, k, int(round(cx)), int(round(cy))))
        whole = pathops.op(dpath, cpath, pathops.PathOp.UNION)
        wb, cbb = bounds(whole), bounds(cpath)
        assert (wb[0] == cbb[0]) if left else (wb[2] == cbb[2]), ('the dash stands out past the apex', u, wb, cbb)

    # --- add the glyphs, map them, and cut the font down to them ---
    for u, (name, g, adv, lsb) in new.items():
        glyf[name] = g
        gvar.variations[name] = []     # placed for this weight: they do not vary
    order = list(glyf.glyphOrder)
    font.setGlyphOrder(order)
    for u, (name, g, adv, lsb) in new.items():
        g.recalcBounds(glyf)
        hmtx[name] = (adv, g.xMin if lsb is None else lsb)
    for t in font['cmap'].tables:
        if t.isUnicode():
            for u, (name, *_r) in new.items():
                t.cmap[u] = name
    tmp = os.path.join(OUT_DIR, '.TLDisplayMarks-%d.tmp.ttf' % w)
    font['maxp'].numGlyphs = len(order)
    font.save(tmp)

    opts = subset.Options()
    opts.layout_features = []
    opts.hinting = True                 # Cinzel's prep is kept as it is (its glyphs have no instructions)
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    opts.glyph_names = True             # kept, so the check below (and a reader) can name them
    opts.recalc_average_width = True
    opts.recalc_max_context = True
    opts.drop_tables += ['GSUB', 'GPOS', 'GDEF', 'STAT', 'HVAR']
    ff = TTFont(tmp)
    os.remove(tmp)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=CPS)
    sub.subset(ff)

    # At the axis's default (400) no variation applies: the outlines are Cinzel's as they
    # stand, so the file drops the variation tables and stays small (it is the one most
    # pages load). Above it, the weight axis stays, without Cinzel's named instances, which
    # this file is not; its name is kept (below).
    static = w == ff['fvar'].axes[0].defaultValue
    if static:
        axis_name = None
        for tag in ('fvar', 'gvar', 'avar'):
            del ff[tag]
    else:
        fvar = ff['fvar']
        fvar.instances = []
        axis_name = fvar.axes[0].axisNameID

    # names: the source's, renamed; Cinzel's copyright kept, the modification recorded
    src_names = {r.nameID: r.toUnicode() for r in lat['name'].names if r.platformID == 3}
    name = ff['name']
    for rec in list(name.names):
        name.removeNames(nameID=rec.nameID)
    style = WEIGHT_STYLE[w]
    name.setName('%s %s' % (src_names[0], COPYRIGHT_ADD), 0, 3, 1, 0x409)
    name.setName('TL Display Marks' if style == 'Regular' else 'TL Display Marks ' + style, 1, 3, 1, 0x409)
    name.setName('Regular', 2, 3, 1, 0x409)
    name.setName('1.000;NONE;TLDisplayMarks-%s' % style, 3, 3, 1, 0x409)
    name.setName('TL Display Marks' + ('' if style == 'Regular' else ' ' + style), 4, 3, 1, 0x409)
    name.setName('Version 1.000; Cinzel %s supplement at weight %d, from @fontsource-variable/cinzel 5.3.0'
                 % (src_names[5].replace('Version ', ''), w), 5, 3, 1, 0x409)
    name.setName('TLDisplayMarks-%s' % style, 6, 3, 1, 0x409)
    name.setName(LICENCE, 13, 3, 1, 0x409)
    name.setName(LICENCE_URL, 14, 3, 1, 0x409)
    if style != 'Regular':
        name.setName('TL Display Marks', 16, 3, 1, 0x409)
        name.setName(style, 17, 3, 1, 0x409)
    if axis_name is not None:
        name.setName(src_names[axis_name], axis_name, 3, 1, 0x409)

    # metrics: Cinzel's own, exactly
    for t in ('hhea',):
        for a in ('ascent', 'descent', 'lineGap'):
            setattr(ff[t], a, getattr(lat[t], a))
    for a in ('sTypoAscender', 'sTypoDescender', 'sTypoLineGap', 'usWinAscent', 'usWinDescent',
              'fsSelection', 'fsType', 'achVendID', 'sxHeight', 'sCapHeight'):
        setattr(ff['OS/2'], a, getattr(lat['OS/2'], a))
    ff['OS/2'].usWeightClass = w
    ff['OS/2'].recalcUnicodeRanges(ff)
    ff['OS/2'].updateFirstAndLastCharIndex(ff)
    ff['head'].fontRevision = 1.0
    ff['head'].created, ff['head'].modified = lat['head'].created, lat['head'].modified
    ff['head'].macStyle = lat['head'].macStyle
    ff.flavor = 'woff2'
    ff.recalcTimestamp = False
    out = os.path.join(OUT_DIR, 'TLDisplayMarks-%d.woff2' % w)
    ff.save(out)
    check(out, lat, ext, w)
    return out, report


def check(out, lat, ext, w):
    f = TTFont(out)
    cm = f.getBestCmap()
    assert sorted(cm) == CPS, sorted(cm)
    glyf = f['glyf']
    loc = {'wght': w}
    src = {'latin': lat['glyf'], 'ext': ext['glyf']}
    used = set()
    for n in f.getGlyphOrder():
        g = glyf[n]
        if g.isComposite():
            used |= {c.glyphName for c in g.components}
    # every reused outline equals the source glyph's, point for point (and its advance)
    for n in sorted(used):
        g = glyf[n]
        sg = src['ext' if n in ('ogonek', 'uni0328') else 'latin']
        if g.isComposite():
            mine = [(c.glyphName, c.x, c.y, getattr(c, 'transform', None)) for c in g.components]
            theirs = [(c.glyphName, c.x, c.y, getattr(c, 'transform', None)) for c in sg[n].components]
            assert mine == theirs, (w, n, mine, theirs)
        else:
            assert simple_points(glyf, n) == simple_points(sg, n), (w, n)
        srcf = ext if n in ('ogonek', 'uni0328') else lat
        hsrc = srcf['hmtx'][n]
        assert f['hmtx'][n] == hsrc, (w, n, f['hmtx'][n], hsrc)
        # the same variations, so the browser varies it as it varies Cinzel's own (at the
        # axis's default the file is static, and the outline is the default's, checked above)
        if 'gvar' in f:
            assert variations(f, n) == variations(srcf, n), (w, n)
        # and so, at this weight, the same outline as Cinzel's
        fg, sgs = f.getGlyphSet(location=loc), srcf.getGlyphSet(location=loc)
        a, b = DecomposingRecordingPen(fg), DecomposingRecordingPen(sgs)
        fg[n].draw(a)
        sgs[n].draw(b)
        assert a.value == b.value, (w, n)
    # the decomposed outline of each new glyph = its components' source outlines, placed
    gs = f.getGlyphSet(location=loc)
    # a dotted letter, ʼ and Ǫ ǫ advance as their base does in Cinzel at this weight, to
    # the nearest unit
    lgs, egs = lat.getGlyphSet(location=loc), ext.getGlyphSet(location=loc)
    for u, n in cm.items():
        base = DOT_BELOW.get(u) or (OGONEK[u][0] if u in OGONEK else 'quoteright' if u == 0x02BC else None)
        if base:
            assert f['hmtx'][n][0] == int(round(lgs[base].width)), (w, n, f['hmtx'][n][0], lgs[base].width)
            assert all(not (c.flags & 0x0200) for c in glyf[n].components), (w, n, 'USE_MY_METRICS')
    for u, n in cm.items():
        g = glyf[n]
        if not g.isComposite():
            continue
        a = DecomposingRecordingPen(gs)
        gs[n].draw(a)
        b = DecomposingRecordingPen(gs)
        for c in g.components:
            t = getattr(c, 'transform', [[1, 0], [0, 1]])
            gs[c.glyphName].draw(TransformPen(b, (t[0][0], t[0][1], t[1][0], t[1][1], c.x, c.y)))
        assert a.value == b.value, (w, n)
    # where components overlap (the ogonek on its base, the dash in the chevron) their windings
    # must agree: the glyph filled by the non-zero rule must cover the union of its components
    for u, n in cm.items():
        g = glyf[n]
        if not g.isComposite():
            continue
        whole = pathops.Path(fillType=pathops.FillType.WINDING)
        gs[n].draw(whole.getPen(glyphSet=gs))
        whole.simplify()
        parts = pathops.Path()
        for c in g.components:
            t = getattr(c, 'transform', [[1, 0], [0, 1]])
            one = pathops.Path()
            gs[c.glyphName].draw(TransformPen(one.getPen(glyphSet=gs), (t[0][0], t[0][1], t[1][0], t[1][1], c.x, c.y)))
            one.simplify()
            parts = pathops.op(parts, one, pathops.PathOp.UNION)
        assert abs(abs(whole.area) - abs(parts.area)) < 1, ('components cancel where they overlap', w, n, whole.area, parts.area)
    for tag in ('GSUB', 'GPOS', 'GDEF', 'fpgm', 'cvt ', 'HVAR', 'STAT'):
        assert tag not in f, (w, tag)
    for tag in ('prep', 'gasp'):
        assert f[tag].compile(f) == lat[tag].compile(lat), (w, tag)
    if w == lat['fvar'].axes[0].defaultValue:
        assert not {'fvar', 'gvar', 'avar'} & set(f.keys()), (w, 'the default weight is static')
    else:
        assert f['avar'].compile(f) == lat['avar'].compile(lat), (w, 'avar')
        assert [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in f['fvar'].axes] == \
            [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in lat['fvar'].axes]
    assert f['hhea'].ascent == 976 and f['hhea'].descent == -372 and f['hhea'].lineGap == 0
    o = f['OS/2']
    assert (o.sTypoAscender, o.sTypoDescender, o.sTypoLineGap, o.usWinAscent, o.usWinDescent) == (976, -372, 0, 976, 372)
    assert o.fsType == 0
    # every glyph's ink lies inside the line (win metrics): nothing is clipped
    for u, n in cm.items():
        y0, y1 = bounds(path_of(gs, n))[1::2]
        assert -372 <= y0 and y1 <= 976, (w, n, y0, y1)


os.makedirs(OUT_DIR, exist_ok=True)
for w in WEIGHTS:
    out, rep = build(w)
    print('wrote', out, os.path.getsize(out), 'bytes,', len(CPS), 'code points')
    for k, v in rep.items():
        print('   ', k, v)

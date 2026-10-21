"""Cut public/fonts/TLReading-{latin,latin-ext}-400{,-italic}.woff2, the Magical
Scriptorium's reading face, from Gelasio 1.008, changing nothing but the spacing of five
modifier letters that Gelasio draws with no advance.
Provenance and licence: public/fonts/SOURCES.txt and public/fonts/OFL.txt.

Why. Gelasio sets ʻ (U+02BB), ʾ (U+02BE) and ʿ (U+02BF), and in the italic also ˊ (U+02CA)
and ˋ (U+02CB), with an advance of 0, their ink hanging over the letter before or after
like an accent. They are spacing letters (Unicode Lm), and the wing writes its
transliterations with them, so in 'maʿrifat' the ʿ sat on the a, in 'brʾšyt brʾ ʾlhym' the
ʾ sat on the caron of š and the words ran together, and the card key 'א ʾ' lost its gap.
Georgia has no ʾ ʿ, so on every device these letters come from this face.

What changes, in each file where the letter has no advance (a table, not a guess):
  ʻ           takes the place and advance of quoteleft (‘), whose outline it repeats;
  ʾ ʿ         take the side-bearings of ʼ (U+02BC), Gelasio's own modifier apostrophe, in
              the same file;
  ˊ ˋ         (italic) take the side-bearings the regular gives the same letters.
The outline is moved sideways as a whole (a composite's component offset, for ˊ ˋ), and
the mark-to-base anchors on it move with it, so an accent set over the letter stays
where Gelasio put it. Every other glyph, advance, table and anchor is left as it is.

The check at the end fails the build unless: the cmap is the source's; every glyph not
listed above has the source's outline and metrics; each listed glyph is the source's
outline moved by its dx and nothing else; and every character the face maps that is not
a combining mark, a format character or a control has a positive advance and is not
classed as a mark in GDEF (a shaper zeroes a mark's advance whatever hmtx says).

Not part of `npm run build`; run it by hand. Needs Python 3.11 with fontTools 4.67.0 and
brotli 1.2.0, which reproduce the files byte for byte. The inputs come from the
@fontsource tarball, fetched without installing it:

  npm pack @fontsource/gelasio@5.3.0      (unpack it; the files are under package/files/)

usage: python -I tools/fonts/build-tlreading.py <package/files dir> public/fonts
"""
import os
import sys
import unicodedata

from fontTools.ttLib import TTFont

SRC_DIR, OUT_DIR = sys.argv[1:3]

FILES = {  # output: source subset file
    'TLReading-latin-400.woff2': 'gelasio-latin-400-normal.woff2',
    'TLReading-latin-400-italic.woff2': 'gelasio-latin-400-italic.woff2',
    'TLReading-latin-ext-400.woff2': 'gelasio-latin-ext-400-normal.woff2',
    'TLReading-latin-ext-400-italic.woff2': 'gelasio-latin-ext-400-italic.woff2',
}
# The roman whose side-bearings the italic's ˊ ˋ take
ROMAN_OF = {'gelasio-latin-ext-400-italic.woff2': 'gelasio-latin-ext-400-normal.woff2',
            'gelasio-latin-400-italic.woff2': 'gelasio-latin-400-normal.woff2'}
# The letters that may be respaced, and by which rule
RULES = {0x02BB: 'quoteleft', 0x02BE: 'apostrophe', 0x02BF: 'apostrophe',
         0x02CA: 'roman', 0x02CB: 'roman'}
# Characters that rightly have no advance: combining marks, enclosing marks, format
# characters (ZWSP, ZWJ, bidi controls, BOM) and controls (CR)
ZERO_OK = {'Mn', 'Me', 'Cf', 'Cc'}

COPYRIGHT_ADD = 'Modified 2026, Three Magi Press.'
LICENCE = 'This Font Software is licensed under the SIL Open Font License, Version 1.1.'


def ink(font, name):
    """(xMin, xMax) of a glyph's outline, components resolved."""
    glyf = font['glyf']
    g = glyf[name]
    g.recalcBounds(glyf)
    return g.xMin, g.xMax


def points(font, name):
    glyf = font['glyf']
    g = glyf[name]
    if g.isComposite():
        return ('composite', [(c.glyphName, c.x, c.y, getattr(c, 'transform', None), c.flags) for c in g.components])
    if g.numberOfContours == 0:
        return ('empty', [])
    c, ends, flags = g.getCoordinates(glyf)
    return ('simple', [tuple(p) for p in c], list(ends), list(flags))


def base_anchors(font):
    """{(lookup, subtable, glyph, class): (x, y)} for every mark-to-base base anchor."""
    out = {}
    for li, lk in enumerate(font['GPOS'].table.LookupList.Lookup):
        for si, st in enumerate(lk.SubTable):
            s, t = (st.ExtSubTable, st.ExtSubTable.LookupType) if lk.LookupType == 9 else (st, lk.LookupType)
            if t != 4:
                continue
            for gi, name in enumerate(s.BaseCoverage.glyphs):
                for ci, a in enumerate(s.BaseArray.BaseRecord[gi].BaseAnchor):
                    if a is not None:
                        out[(li, si, name, ci)] = (a.XCoordinate, a.YCoordinate)
    return out


def move_anchors(font, name, dx):
    for lk in font['GPOS'].table.LookupList.Lookup:
        for st in lk.SubTable:
            s, t = (st.ExtSubTable, st.ExtSubTable.LookupType) if lk.LookupType == 9 else (st, lk.LookupType)
            if t != 4 or name not in s.BaseCoverage.glyphs:
                continue
            for a in s.BaseArray.BaseRecord[s.BaseCoverage.glyphs.index(name)].BaseAnchor:
                if a is not None:
                    a.XCoordinate += dx


def plan(font, roman, src_name):
    """{glyph name: (code point, dx, advance)} for the letters this file draws with no advance."""
    cmap, hm = font.getBestCmap(), font['hmtx'].metrics
    out = {}
    for u, rule in RULES.items():
        g = cmap.get(u)
        if g is None or hm[g][0] != 0:
            continue
        x0, x1 = ink(font, g)
        if rule == 'quoteleft':
            q = cmap[0x2018]
            q0, q1 = ink(font, q)
            assert q1 - q0 == x1 - x0, ('ʻ is not quoteleft\'s outline', src_name)
            lsb, adv = q0, hm[q][0]
        elif rule == 'apostrophe':
            a = cmap[0x02BC]
            a0, a1 = ink(font, a)
            lsb, rsb = a0, hm[a][0] - a1
            adv = lsb + (x1 - x0) + rsb
        else:
            assert roman is not None, (src_name, hex(u))
            rg = roman.getBestCmap()[u]
            r0, r1 = ink(roman, rg)
            lsb, rsb = r0, roman['hmtx'].metrics[rg][0] - r1
            adv = lsb + (x1 - x0) + rsb
        assert adv > 0, (src_name, hex(u), adv)
        out[g] = (u, lsb - x0, adv)
    return out


def build(out_name, src_name):
    src_path = os.path.join(SRC_DIR, src_name)
    font = TTFont(src_path)
    roman = TTFont(os.path.join(SRC_DIR, ROMAN_OF[src_name])) if src_name in ROMAN_OF else None
    moves = plan(font, roman, src_name)
    glyf, hmtx = font['glyf'], font['hmtx']
    for g, (u, dx, adv) in moves.items():
        gl = glyf[g]
        if gl.isComposite():
            for c in gl.components:
                c.x += dx
        else:
            coords, _, _ = gl.getCoordinates(glyf)
            coords.translate((dx, 0))
            gl.coordinates = coords
        gl.recalcBounds(glyf)
        hmtx[g] = (adv, gl.xMin)
        move_anchors(font, g, dx)

    # A modified version takes its own name; Gelasio's copyright stays, the change recorded.
    # The STAT table's names (256 and up) are kept as they are.
    name = font['name']
    src_names = {r.nameID: r.toUnicode() for r in name.names if r.platformID == 3}
    style = src_names[2]
    for nid in (0, 1, 3, 4, 5, 6, 13, 16, 17):
        name.removeNames(nameID=nid)
    name.setName('%s %s' % (src_names[0], COPYRIGHT_ADD), 0, 3, 1, 0x409)
    name.setName('TL Reading', 1, 3, 1, 0x409)
    name.setName('1.000;NONE;TLReading-%s' % style, 3, 3, 1, 0x409)
    name.setName('TL Reading %s' % style, 4, 3, 1, 0x409)
    name.setName('Version 1.000; Gelasio %s with spacing modifier letters, from @fontsource/gelasio 5.3.0'
                 % src_names[5].replace('Version ', ''), 5, 3, 1, 0x409)
    name.setName('TLReading-%s' % style, 6, 3, 1, 0x409)
    name.setName(LICENCE, 13, 3, 1, 0x409)
    font.flavor = 'woff2'
    font.recalcTimestamp = False
    out = os.path.join(OUT_DIR, out_name)
    font.save(out)
    check(out, src_path, moves)
    return out, moves


def check(out, src_path, moves):
    f, s = TTFont(out), TTFont(src_path)
    assert f.getBestCmap() == s.getBestCmap(), 'cmap changed'
    assert f.getGlyphOrder() == s.getGlyphOrder(), 'glyph order changed'
    for g in f.getGlyphOrder():
        a, b = points(f, g), points(s, g)
        if g not in moves:
            assert a == b, ('outline changed', g)
            assert f['hmtx'][g] == s['hmtx'][g], ('metrics changed', g)
            continue
        u, dx, adv = moves[g]
        if a[0] == 'composite':
            assert a[1] == [(n, x + dx, y, t, fl) for n, x, y, t, fl in b[1]], ('not the source moved', g)
        else:
            assert a[1] == [(x + dx, y) for x, y in b[1]] and a[2:] == b[2:], ('not the source moved', g)
        assert f['hmtx'][g][0] == adv
    fa, sa = base_anchors(f), base_anchors(s)
    assert fa.keys() == sa.keys()
    for k, (x, y) in fa.items():
        dx = moves[k[2]][1] if k[2] in moves else 0
        assert (x, y) == (sa[k][0] + dx, sa[k][1]), ('anchor', k)
    for tag in s.keys():
        if tag not in ('glyf', 'loca', 'hmtx', 'name', 'GPOS', 'head', 'hhea', 'maxp', 'post', 'GlyphOrder'):
            assert f[tag].compile(f) == s[tag].compile(s), ('table changed', tag)
    # every spacing character has an advance, and none is classed as a mark
    cls = f['GDEF'].table.GlyphClassDef.classDefs
    hm = f['hmtx'].metrics
    for u, g in f.getBestCmap().items():
        if unicodedata.category(chr(u)) in ZERO_OK:
            continue
        assert hm[g][0] > 0, ('no advance', hex(u), g)
        assert cls.get(g) != 3, ('a spacing character classed as a mark', hex(u), g)
    assert f['OS/2'].fsType == 0


os.makedirs(OUT_DIR, exist_ok=True)
for out_name, src_name in FILES.items():
    out, moves = build(out_name, src_name)
    print('wrote', out, os.path.getsize(out), 'bytes')
    for g, (u, dx, adv) in sorted(moves.items(), key=lambda kv: kv[1][0]):
        print('    U+%04X %s %s: moved %+d, advance %d' % (u, chr(u), g, dx, adv))

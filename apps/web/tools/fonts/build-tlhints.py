"""Cut public/fonts/TLShapeHints.woff2: the shape hints the Magical Scriptorium's notes
use to say what a drawn letter looks like (⊔ ⊓ ⊏ ⊐ ∩ ∋ □ ▷ ┌ ┐ └ ┘) and the arrows ← →,
from Noto Sans Math, so that they are one design on every device.
Provenance and licence: public/fonts/SOURCES.txt and public/fonts/OFL.txt.

Declared in src/styles/magic-fonts.css only, which only the wing's pages load, so it
never claims these code points outside the wing.

Not part of `npm run build`; run it by hand when the set of hints changes. The method
is build-tlsigns.py's. Needs Python 3 with fontTools and brotli (pip install fonttools
brotli; this file was made with fontTools 4.67.0 and brotli 1.2.0, which reproduce it
byte for byte). The input comes from the @fontsource tarball, fetched without
installing it:

  npm pack @fontsource/noto-sans-math@5.3.0   (unpack it; the files are under package/files/)

usage: python -I build-tlhints.py \
         <noto-sans-math-latin-400-normal.woff2> \
         public/fonts/TLShapeHints.woff2
"""
import sys, os
from fontTools.ttLib import TTFont
from fontTools import subset

SRC, OUT = sys.argv[1:3]

# The shape hints set in the wing's notes, and the two arrows its prose uses.
CPS = [0x2190, 0x2192,           # ← →
       0x220B,                   # ∋ CONTAINS AS MEMBER
       0x2229,                   # ∩ INTERSECTION
       0x228F, 0x2290,           # ⊏ ⊐ SQUARE IMAGE OF / ORIGINAL OF
       0x2293, 0x2294,           # ⊓ ⊔ SQUARE CAP / SQUARE CUP
       0x250C, 0x2510, 0x2514, 0x2518,   # ┌ ┐ └ ┘ box-drawing light corners
       0x25A1,                   # □ WHITE SQUARE
       0x25B7]                   # ▷ WHITE RIGHT-POINTING TRIANGLE

opts = subset.Options()
opts.layout_features = []          # single code points: no shaping needed
opts.hinting = False               # ttfautohint's instructions are dropped
opts.name_IDs = ['*']              # keep copyright (0) and licence URL (14)
opts.notdef_outline = True
opts.bidi_closure = False          # ∋ would pull in its mirror ∈, which the wing does not use
opts.drop_tables += ['GSUB', 'GPOS', 'GDEF', 'MATH', 'STAT', 'vhea', 'vmtx', 'gasp']
font = TTFont(SRC)
src_head = (font['head'].created, font['head'].modified)
sub = subset.Subsetter(opts)
sub.populate(unicodes=CPS)
sub.subset(font)

# Noto Sans's own line metrics (1069 / -293), as TL Signs and TL Runic: Noto Sans Math's
# 1069 / -423 (and its 3105 / 2550 win metrics) would open up any line of prose that
# quotes a hint. The box-drawing corners reach past them (-414 .. 1078), as box-drawing
# glyphs do; they are not clipped, and they stay inside a line of prose.
ASC, DESC = 1069, -293
font['hhea'].ascent, font['hhea'].descent, font['hhea'].lineGap = ASC, DESC, 0
os2 = font['OS/2']
os2.sTypoAscender, os2.sTypoDescender, os2.sTypoLineGap = ASC, DESC, 0
os2.usWinAscent, os2.usWinDescent = ASC, -DESC

# A modified version takes its own name; the copyright stays as it is.
name = font['name']
for rec in list(name.names):
    if rec.nameID in (1, 3, 4, 5, 6, 16, 17):
        name.removeNames(nameID=rec.nameID)
name.setName('TL Shape Hints', 1, 3, 1, 0x409)
name.setName('Regular', 2, 3, 1, 0x409)
name.setName('1.000;TLShapeHints-Regular', 3, 3, 1, 0x409)
name.setName('TL Shape Hints Regular', 4, 3, 1, 0x409)
name.setName('Version 1.000; subset of Noto Sans Math 3.000', 5, 3, 1, 0x409)
name.setName('TLShapeHints-Regular', 6, 3, 1, 0x409)
name.setName('This Font Software is licensed under the SIL Open Font License, Version 1.1.', 13, 3, 1, 0x409)
font['head'].created, font['head'].modified = src_head   # the source's dates: a rebuild is byte-identical
font.flavor = 'woff2'
font.recalcTimestamp = False
font.save(OUT)

check = TTFont(OUT)
cmap = check.getBestCmap()
assert sorted(cmap) == sorted(CPS), sorted(cmap)
src = TTFont(SRC)
scm, sgl = src.getBestCmap(), src['glyf']
for u in CPS:  # every outline and advance unchanged
    a, b = check['glyf'][cmap[u]], sgl[scm[u]]
    assert a.getCoordinates(check['glyf'])[0] == b.getCoordinates(sgl)[0], hex(u)
    assert check['hmtx'][cmap[u]][0] == src['hmtx'][scm[u]][0], hex(u)
for tag in ('fpgm', 'prep', 'cvt ', 'MATH', 'GSUB', 'GPOS'):
    assert tag not in check, tag
print('wrote', OUT, os.path.getsize(OUT), 'bytes,', len(cmap), 'code points')

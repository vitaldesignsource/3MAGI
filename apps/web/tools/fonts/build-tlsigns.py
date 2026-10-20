"""Cut public/fonts/TLSigns.woff2: the 34 planetary, zodiacal and alchemical code
points of the Signs of the Art, from two Noto faces merged into one file.
Provenance and licence: public/fonts/SOURCES.txt and public/fonts/OFL.txt.

Not part of `npm run build`; run it by hand when the set of signs changes.
Needs Python 3 with fontTools and brotli (pip install fonttools brotli; this file
was made with fontTools 4.67.0 and brotli 1.2.0, which reproduce it byte for byte).
The inputs come from the @fontsource tarballs, fetched without installing them:

  npm pack @fontsource/noto-sans-symbols@5.3.0 @fontsource/noto-sans-symbols-2@5.3.0
  (unpack each; the files are under package/files/)

usage: python -I build-tlsigns.py \
         <noto-sans-symbols-symbols-400-normal.woff2> \
         <noto-sans-symbols-2-symbols-400-normal.woff2> \
         public/fonts/TLSigns.woff2
"""
import sys, os, tempfile
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.merge import Merger

SYMBOLS, SYMBOLS2, OUT = sys.argv[1:4]

# Noto Sans Symbols 2.003 has all of these but U+2609 SUN.
FROM_SYMBOLS = [0x263D, 0x263F, 0x2640, 0x2641, 0x2642, 0x2643, 0x2644] + list(range(0x2648, 0x2654)) + [
    0x1F701, 0x1F702, 0x1F703, 0x1F704, 0x1F705, 0x1F706, 0x1F70D, 0x1F714, 0x1F716, 0x1F739,
    0x1F75E, 0x1F75F, 0x1F760, 0x1F764]
# Only Noto Sans Symbols 2 (2.008) carries the Sun.
FROM_SYMBOLS2 = [0x2609]


def cut(src, cps, dst):
    opts = subset.Options()
    opts.layout_features = []          # single code points: no shaping needed
    opts.hinting = False               # the two sources differ (one ttfautohinted); drop both
    opts.name_IDs = ['*']              # keep copyright (0) and licence URL (14)
    opts.notdef_outline = True
    opts.drop_tables += ['GSUB', 'GPOS', 'GDEF', 'STAT', 'vhea', 'vmtx', 'gasp']
    font = TTFont(src)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=cps)
    sub.subset(font)
    font.flavor = None
    font.save(dst)
    have = set(TTFont(dst).getBestCmap())
    missing = [c for c in cps if c not in have]
    if missing:
        raise SystemExit('missing from %s: %s' % (src, ' '.join('U+%04X' % c for c in missing)))


with tempfile.TemporaryDirectory() as tmp:
    a, b = os.path.join(tmp, 'a.ttf'), os.path.join(tmp, 'b.ttf')
    cut(SYMBOLS, FROM_SYMBOLS, a)
    cut(SYMBOLS2, FROM_SYMBOLS2, b)
    merged = Merger().merge([a, b])

# One set of vertical metrics, Noto Sans's own (1069 / -293, as Noto Sans Runic):
# every sign's ink lies within y -222..765, and the 1480 / -570 of Noto Sans
# Symbols would open up any line of prose a sign is quoted in.
ASC, DESC = 1069, -293
merged['hhea'].ascent, merged['hhea'].descent, merged['hhea'].lineGap = ASC, DESC, 0
os2 = merged['OS/2']
os2.sTypoAscender, os2.sTypoDescender, os2.sTypoLineGap = ASC, DESC, 0
os2.usWinAscent, os2.usWinDescent = ASC, -DESC

# A modified version takes its own name (the Noto OFL reserves none, but a cut
# of two faces should not pass itself off as either). Copyright stays as is.
name = merged['name']
for rec in list(name.names):
    if rec.nameID in (1, 3, 4, 5, 6, 16, 17):
        name.removeNames(nameID=rec.nameID)
name.setName('TL Signs', 1, 3, 1, 0x409)
name.setName('Regular', 2, 3, 1, 0x409)
name.setName('1.000;TLSigns-Regular', 3, 3, 1, 0x409)
name.setName('TL Signs Regular', 4, 3, 1, 0x409)
name.setName('Version 1.000; subset of Noto Sans Symbols 2.003 and Noto Sans Symbols 2 2.008', 5, 3, 1, 0x409)
name.setName('TLSigns-Regular', 6, 3, 1, 0x409)
name.setName('This Font Software is licensed under the SIL Open Font License, Version 1.1.', 13, 3, 1, 0x409)
src_head = TTFont(SYMBOLS)['head']      # the source's dates, so a rebuild is byte-identical
merged['head'].created, merged['head'].modified = src_head.created, src_head.modified
merged.flavor = 'woff2'
merged.recalcTimestamp = False
merged.save(OUT)

check = TTFont(OUT)
cmap = check.getBestCmap()
want = sorted(FROM_SYMBOLS + FROM_SYMBOLS2)
assert sorted(cmap) == want, sorted(cmap)
print('wrote', OUT, os.path.getsize(OUT), 'bytes,', len(cmap), 'code points')

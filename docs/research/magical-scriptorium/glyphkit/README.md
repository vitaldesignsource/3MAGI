# Glyph kit — how a drawn letter is stored, checked and seen

The Magical Scriptorium stores every drawn letter as data, rendered inline as
SVG in the site's own gold (currentColor), so hover, print and size work as
they do for real script. A letter is stored in one of two ways: as centre
lines drawn with the house pen (`{ d, rings, dots }`, below), or as the
filled outline of its ink (`{ fill }`, under "Filled glyphs"). One letter:

```json
{ "order": 1, "name": "Aleph", "value": "א", "translit": "ʾ",
  "glyph": { "d": "M 30 20 L 70 80 M 62 22 L 52 50", "rings": [[30,20],[70,80]], "dots": [] },
  "strokes": "one line in plain words describing what the path draws",
  "formConfidence": "high|medium|low", "note": "" }
```

Grid and pen for centre-line glyphs (the validator enforces all of this):
- viewBox `0 0 100 100`. The letter body sits within x 10–90, y 15–85;
  every coordinate must lie in 0–100.
- The path is drawn with a round pen: `stroke-width 5.5`, round caps and
  joins, no fill. Use ONLY absolute commands `M L H V C S Q T A Z`
  (upper-case), numbers separated by spaces or commas. No transforms.
- `rings`: open circles (the *Brillen* / ring-ends of the angelic scripts),
  `[x, y]` or `[x, y, r]`, default r 6, drawn with a lighter pen
  (stroke-width 3.6) so they stay open at text size. Each ring sits ON a
  stroke end: the stroke stops at the ring's EDGE (its endpoint is r units
  from the ring's centre, along the stroke's direction), so the ring reads
  as a clean O at the end of the line and the line never crosses its hole.
- `dots`: filled discs `[x, y]` or `[x, y, r]`, default r 2.6.
- `glyph: null` is an honest gap: use it when you cannot draw a form you can
  stand behind, and say why in `note` (≥ 8 words).

## Filled glyphs (`{ fill }`)

A letter may instead be stored as the outline of its ink — the shape the pen
left on the page, with its own thick and thin, its swellings and its wedge
terminals — rather than as a centre line for the house pen:

```json
"glyph": { "fill": "M 50 23 C 62.2 23 72 32.8 72 45 … Z M 51 31 C … Z" }
```

The rules (check.mjs enforces all but the last two, and the site's validator
the same):
- `fill` is SVG path data in absolute `M L C Q Z` only (upper-case), numbers
  separated by spaces or commas; number pairs after an `M` are lines, as in
  SVG. No `H V S T A`, no relative commands, no transforms.
- Every subpath begins with `M` and is closed with `Z`, and encloses some
  area, and together they draw some ink under evenodd (one shape given
  twice cancels itself out). No subpath is given twice, and each stands
  apart from the others or wholly inside one of them, so that none is
  cancelled in part by another (see the next rule). Nothing follows a `Z`
  but the next `M` or the end.
- It is drawn as ONE `<path fill="currentColor" fill-rule="evenodd">` and no
  stroke: there is no pen, so the weight, the contrast and the terminals are
  all in the outline. A counter (the hole of an O) is simply another subpath
  lying wholly inside its outline; under evenodd its direction does not
  matter. But two ink subpaths that overlap, or a subpath that crosses
  itself, leave the overlap EMPTY under evenodd: check.mjs refuses subpaths
  that overlap in part or repeat one another, warns of every crossing (` ! `
  lines), and the shapes should be united before the glyph is handed over.
- The same 0–100 viewBox. Every coordinate (end and control points) lies in
  0–100, and the ink itself — its exact box, the extrema of its curves
  included — lies inside the body box x 10–90, y 15–85. (For a centre-line
  glyph only the 0–100 rule is enforced; for a fill it is the ink.)
- A glyph has EITHER `fill` OR `d`/`rings`/`dots`, never both; `pen`,
  `textPen` and `textRings` belong to drawn strokes and are refused with a
  fill. `strokes` is still required: one line saying what the outline shows.
- One scale per alphabet: all of an alphabet's filled letters are taken from
  the source at ONE scale, so their sizes and proportions relative to one
  another are the source's, and they sit on one common baseline band as they
  do on the page. Do not centre or enlarge each letter in its own box.
  `node check.mjs <glyphs.json> --boxes` prints every filled glyph's ink box
  and the band its bottoms and tops make.
- Two decimals are plenty (0.01 unit is a tenth of a pixel at 1000 px).

fill.mjs holds the fill's parser, its exact ink box, its evenodd area and
the crossing test, for a tracer's own scripts to import. `sample-fill.json`
(with `sample-fill-cell.png`, a synthetic cell made from the same outline)
is a format sample to try `check.mjs`, `sheet.mjs` and `compare.mjs` on; it
is not a letter of any alphabet.

Tools (Chromium via Playwright; no other dependency):

```
node sheet.mjs <glyphs.json> <out.png> [--title "…"] [--cols 8]
```
renders a specimen sheet: each letter large (with its name, value and
confidence), plus a line of all letters at text size (28 px) and at 14 px,
gold on the site's dark ground. Read the PNG to judge your work. A filled
glyph is drawn filled (evenodd), with no pen.

```
node check.mjs <glyphs.json> [--boxes]
```
validates the format (commands, bounds, rings on endpoints, confidence,
null-gap notes; for a filled glyph its commands, closed subpaths, 0–100
coordinates, ink inside the body box, no subpath repeated or overlapping
another in part, fill alone) and prints problems; exit
code 1 if any. Crossing outlines in a fill are printed as warnings (` ! `),
which do not fail the check. `--boxes` adds the filled glyphs' ink boxes.

```
node compare.mjs <glyphs.json> <out.png> [--cols 6] [--title "…"]
```
lays each letter beside the source it was traced from: give the letter a
`cell`, the path (relative to the JSON) of a SQUARE crop of that one letter
from the source, framed so that the crop maps onto the 0–100 viewBox. Each
card shows the cell, the glyph, and the glyph in red over the greyed cell; a
filled glyph goes over it as a translucent fill edged with a hairline, so an
edge that strays from the ink's edge shows at once.

`<glyphs.json>` is `{ "slug": "…", "title": "…", "letters": [ … ] }`.

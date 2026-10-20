# Glyph kit — how a drawn letter is stored, checked and seen

The Magical Scriptorium stores every drawn letter as data, rendered inline as
SVG in the site's own gold (currentColor), so hover, print and size work as
they do for real script. One letter:

```json
{ "order": 1, "name": "Aleph", "value": "א", "translit": "ʾ",
  "glyph": { "d": "M 30 20 L 70 80 M 62 22 L 52 50", "rings": [[30,20],[70,80]], "dots": [] },
  "strokes": "one line in plain words describing what the path draws",
  "formConfidence": "high|medium|low", "note": "" }
```

Grid and pen (the validator enforces all of this):
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

Tools (Chromium via Playwright; no other dependency):

```
node sheet.mjs <glyphs.json> <out.png> [--title "…"] [--cols 8]
```
renders a specimen sheet: each letter large (with its name, value and
confidence), plus a line of all letters at text size (28 px) and at 14 px,
gold on the site's dark ground. Read the PNG to judge your work.

```
node check.mjs <glyphs.json>
```
validates the format (commands, bounds, rings on endpoints, confidence,
null-gap notes) and prints problems; exit code 1 if any.

`<glyphs.json>` is `{ "slug": "…", "title": "…", "letters": [ … ] }`.

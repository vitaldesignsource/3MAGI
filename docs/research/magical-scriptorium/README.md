# The Magical Scriptorium: working research

Working material for the planned Magical Scriptorium wing of the Scriptorium.
None of this is published on the site; it is the record the wing will be
built from.

- `BRIEF.md`: the research brief and house rules every researcher followed.
- `research/<item>.json`: one researcher's findings per alphabet or book.
  `research/<item>.verified.json`: the same after an independent fact-check,
  with its corrections and unresolved points under `factcheck`. All eighteen
  items are fact-checked; points listed as unresolved are not to be stated
  as fact on the site.
- `understand.md`: the engineering map of the Scriptorium code and the plan
  for adding the wing.
- `glyphkit/`: the format for drawn letters (path data on a 100-unit grid:
  centre lines for the house pen, or filled outlines), a checker
  (`check.mjs`, with `fill.mjs`), a specimen-sheet renderer (`sheet.mjs`), a
  side-by-side of each letter and its source crop (`compare.mjs`), and two
  format samples.
- `plates/<item>.manifest.json`: the copy each page's plates and tracings
  come from, its rights statement and the pages used. For Ibn Waḥshiyya also
  `plates/ibn-wahshiyya.catalogue.json` (every table of Hammer's 1806 volume,
  with its Arabic heading, Hammer's English and its page) and
  `plates/ibn-wahshiyya.source-and-trace.json` (the sourcing, the tracing
  jobs, the findings that settle the page's text, and the independent
  checkers' corrections).
- `traced/<item>/<table>.glyphs.json`: the traced and independently checked
  letter tables in the glyph kit's format, with each sign's source, notes and
  the comparison with other copies (no images or cells are kept here). For
  Enochian, `traced/enochian/f104.glyphs.json` holds the twenty-one forms of
  Sloane MS 3188, f. 104 as the site draws them, each with the strokes it is
  built from and its measured distance from the ink, and
  `traced/enochian/f104.sources.json` the images that were found and used.

Letterforms: every remembered form of the Agrippan alphabets, Theban,
Enochian and the Alphabet of the Magi was rated low confidence by the
fact-checkers. None is to be drawn or published until traced from a named
source (the 1533 Cologne edition, the 1651 English edition, or Joseph H.
Peterson's CC BY 4.0 fonts at esotericarchives.com).

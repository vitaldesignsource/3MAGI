# The Scriptorium: engineering map for the Magical Scriptorium wing

All paths are relative to `apps/web/` in the worktree
`/tmp/claude-0/-home-user-3MAGI/681e04fd-d4fb-530c-94a3-2eb5e517d73c/scratchpad/wt/magic` (branch `feat/magic`,
HEAD 4a3ce90). Line numbers refer to that HEAD.

Setup notes:
- `apps/web/node_modules` is a symlink to `/home/user/3MAGI/apps/web/node_modules`. That directory holds only `esbuild`.
  Real packages are hoisted into `/home/user/3MAGI/node_modules`, and the worktree root `node_modules` symlinks there
  too. So any `npm install` run from this worktree writes into the main checkout's tree, which the `feat/dash` worktree
  also uses.
- Stack: React 18.3, react-router(-dom) 7.18.0, Vite 7.3.5, react-helmet, plain CSS (Tailwind is configured but the
  Scriptorium does not use it).
- `node tools/validate-education.mjs` passes today. It reports: 20 halls, 631 signs, 308 names, 651 lexicon, 120
  readings, 179 currents, 89 works, 406 timeline events, 20 books.

---------------------------------------------------------------------------------------------------------------------

## 1. Routes: `src/App.jsx`

- Every page except Home is a `lazy()` chunk (lines 12–34). There is one `Suspense` with an empty fallback (38). A
  `RouteErrorBoundary` reloads once on a stale chunk (44–80).
- The Scriptorium routes, all siblings inside `<Routes>`:
  - 105 `/third-lamp/education` → `EducationPortalPage`
  - 106 `/third-lamp/education/:lang` → `EducationLanguagePage`
  - 107 `/third-lamp/education/:lang/course` → `EducationCoursePage`
  - 108 `/third-lamp/education/:lang/course/:lesson` → `EducationCoursePage`
- The other portals for comparison: Christianities at 109–113 (static `map`, `canon` and `rosicrucian` routes come
  before `:section`) and Powers at 114–116 (static `map` before `:section`).
- Ranking, checked in `node_modules/react-router/dist/development/chunk-*.mjs` lines 658–684: static segment = 10,
  dynamic = 3. When scores tie, `compareIndexes` falls back to sibling order. So a static `/third-lamp/education/magic`
  beats `:lang`. But `/third-lamp/education/magic/course` scores the same against `:lang/course` (lang = "magic") and
  `magic/:alphabet` (alphabet = "course"), and whichever route is declared first wins.
- `ThirdLampHeader.jsx` line 96 holds the one nav link "The Scriptorium". `isActive` (line 22) is an exact-path match,
  so sub-pages do not light it, and that is the same for the existing halls.
- `HomePage.jsx` lines 22–27 have a Scriptorium card with hard-coded, stale stats: "16 halls", "497 signs", "245 divine
  names", "4 courses". The live values are 20, 631, 308 and 8.

## 2. The portal: `src/pages/EducationPortalPage.jsx`

- `export const HALLS` (14–40) has 20 entries `{ slug, name, glyph, sample, blurb }`. `glyph` is a text door-sign and
  `sample` is native text. This array is the hall registry for:
  - the portal cards (101–109)
  - the hero glyph row (85–87)
  - `EducationLanguagePage` (import at line 12; `hall.sample` at 212; the foot nav at 495–501)
  - `tools/generate-llms.js` line 56, which reads the source text via `arrayFrom`, so the array must stay plain literals
- `pgm` is **not** in HALLS. Neither is anything else that is not a full language hall.
- Layout, in order, inside `div.third-lamp-scope.edu-page`:
  1. `Helmet` (69–72; the description is a literal string that lists the halls, and llms.txt reads it)
  2. `ThirdLampHeader`
  3. `main.edu-main`
  4. `section.edu-hero`: `p.kicker`, `h1`, `p.edu-hero-sub`, `div.edu-hero-glyphs` of `span.edu-glyph` (76–88)
  5. `<ScriptoriumSearch/>` (90)
  6. `section.edu-halls` with `header.edu-section-head` (kicker, h2, p) and `div.edu-hall-grid` of
     `Link.edu-hall-card` (`span.edu-hall-glyph.edu-glyph`, h3, `p.edu-hall-sample.edu-glyph`, `p.edu-hall-blurb`,
     `span.edu-hall-enter "Enter the hall →"`) (92–111)
  7. `<ScriptoriumCognates/>` (113)
  8. `section.edu-library`, with a tradition filter (`button.edu-filter.is-active`) and `edu-book-card`s (115–157)
  9. `ThirdLampFooter`
- `TRADITION_LABELS` (42–54) groups the library books.
- Stale copy: "sixteen language halls" (71, 81–83) and "Sixteen scripts, sixteen doors" (95). There are 20 halls.

## 3. How a hall renders: `src/pages/EducationLanguagePage.jsx`

Loading (14–56):
- `LOAD` holds five literal `import.meta.glob`s: `../data/education/*.js` (this is **non-recursive**), and `ext/`,
  `themes/`, `corpus/` and `timelines/` `*.js`.
- `pick(kind, name)` resolves a module and returns `null` if it is absent.
- `loadHall(lang)` runs a `Promise.all` over data, ext, themes, corpus and timeline, plus `pgm` only when
  `lang === 'greek'` (line 46).
- Missing modules fall back to `EMPTY` shapes (33–38).
- Every hall, and pgm, is its own chunk. `library.js`, `pgm.js` and `cognates.generated.js` also sit in the
  `*.js` glob as unused lazy chunks.

Per-hall tables hard-coded in the page:
- `CORPUS_COPY` (58–73)
- `HERO` art `{image, alt, caption}` (78–95; halls without art fall back to the plain hero)
- `TITLES` (96). This is the gate: line 145 does `if (!TITLES[lang]) Navigate('/third-lamp/education')`.
- `COURSE_LINES` (101–110)
- `rtl` list (131)
- the `lang=` map for RTL names and lexicon (431, 480)

Section list (169–181). Each section shows only when it has content, except two: **Divine Names and Lexicon always
render and dereference `data.divineNames.map` / `data.lexicon` unconditionally** (178–179, 423–491). A dataset without
those arrays crashes the page, so this page cannot host a magical alphabet.

Render order:
1. Optional `data.hero` banner (`ch-hero-figure edu-hall-banner`) (191–197)
2. Hero `section.edu-hero.edu-lang-hero(.has-image)`: the kicker "The Scriptorium · Language Hall" with a Link, h1,
   `p.edu-lang-hero-sample.edu-glyph[dir]`, intro, caption, and `nav.edu-section-nav` of hash links (200–220)
3. Course banner `Link.edu-course-banner` (222–229)
4. **Alphabet** (231–305): `section.edu-alphabet` holds a `div.edu-letter-grid` with `role=listbox` and
   `aria-activedescendant`. Arrow, Home and End keys move the selection, and for RTL the left/right arrows are swapped
   (244–257). Each letter is a `button.edu-letter-card(.is-selected/.is-archaic)` with `id=edu-letter-{i}`,
   `role=option`, a roving tabindex, and three spans:
   - `span.edu-letter-glyph.edu-glyph[dir]` = `l.glyph` (**text**)
   - `.edu-letter-name`
   - `.edu-letter-translit`

   Below the grid is `aside.edu-letter-plaque[aria-live]`. It holds `div.edu-plaque-glyph.edu-glyph` (glyph plus
   `final`) and `div.edu-plaque-body` (h3 with an `edu-plaque-badge` "archaic numeral", then a `dl` with rows
   Transliteration, Pronunciation, Number, Origin/Sign, Final form, `altLabel || 'Other script'`, and Correspondence).
   After that come `<ScriptoriumSay>` and `p.edu-plaque-note`. Then `p.edu-corr-note`.
   - Correspondence keys are normalised from three spellings at 151–164.
5. Numbers: `edu-digit-grid`, `edu-num-examples`, `edu-num-special` (307–339)
6. `<ScriptoriumReckoner>` (341)
7. Readings `edu-reading-list > article.edu-reading` (343–376). Each reading has:
   - h3 and `p.edu-reading-source`
   - an optional `div.edu-reading-grid.edu-glyph role=img` letter square
   - `div.edu-reading-words`, each word a `span.edu-reading-word` (native, translit dir=ltr, gloss dir=ltr)
   - `p.edu-reading-translation` in curly quotes. **The translation is not attributed to anyone.**
   - `p.edu-reading-note`
8. **PGM** (378–405): the same markup as readings, `section.edu-pgm`, kicker "Greco-Egyptian Ritual". Greek hall only.
9. `<ScriptoriumTimeline>` (407), `<ScriptoriumCurrents>` (409–411), `<ScriptoriumCorpus>` (413–421)
10. Divine Names `ol.edu-name-list > li.edu-name-row` (423–459). Optional `details.edu-proposals` lists competing
    etymologies (`reading`, `basis`, `standing`).
11. Lexicon: a search input and `ul.edu-lex-list` (461–491)
12. `<ScriptoriumDrill>` (493)
13. `nav.edu-hall-nav` to every other hall (495–501)
14. Optional `data.gallery`: `section.ch-gallery` of `figure.ch-gallery-card` + `figcaption.ch-gallery-caption`
    (502–522)

Glyph rendering and per-script styling:
- Every native string wears `.edu-glyph`. Font choice is done entirely in CSS by unicode-range (section 8).
- The page root carries **`data-hall={lang}`** (184), and per-script tweaks hang off it in index.css
  (10592–10598, 10634–10638, 10922–10933).
- **`data-script` is not used in the Scriptorium.** It exists only in Powers: `PowersSectionPage.jsx` line 117 has
  `<bdi className="edu-glyph ch-entry-native" lang data-script>`, styled at `styles/powers-doors.css` 142–149.
- RTL is set per element with `dir`, never on the page.

## 4. Courses: `src/pages/EducationCoursePage.jsx`

- `import.meta.glob('../data/education/courses/*.js')` (7)
- Its own `TITLES` (8 courses, line 17) and `RTL` (19)
- Progress is kept in `localStorage` key `tl-scriptorium-course-{lang}`, wrapped in try/catch (21–32)
- `Exercise` (34–46) has a reveal toggle
- `LessonView` (48–129) renders:
  - `edu-lesson-section`, with examples drawn using the same `edu-reading-word` markup
  - `edu-vocab-list`
  - `edu-exercise-list`
  - done / prev / next navigation
- A missing course redirects to the portal (168). A missing lesson redirects to the syllabus (169).
- Per-lesson Helmet title and description (175–184).

## 5. Shared hall components (`src/components/Scriptorium*.jsx`)

| Component | What it does | Reusable for the wing? |
|---|---|---|
| `ScriptoriumSearch` (210 lines) | Fetches `/scriptorium-index.json` on first focus or keystroke (14, 90–104). Scores native match 100, label exact/prefix/contains 90/70/50, subtitle 30, detail 10 (67–79). Three `SCOPES`; scriptorium = every record whose `h` is not `ch` or `pw` (36–65). `hrefFor` (132–138): uses `r.u` if present, otherwise `/third-lamp/education/${h}#${a}`. Native is rendered as `span.edu-search-native.edu-glyph` (186). `KIND_LABEL` / `KIND_ORDER` (20–32) lack `manuscript` and `note`, which Christianities already emits. | Yes. New records must carry `u`. It needs a glyph-path branch, because drawn letters have no `n`. |
| `ScriptoriumCognates` (102) | "One Ancestor" table, `table.edu-cognates-table` inside `div.edu-cognates-scroll[role=region][tabIndex=0]`. Rows are clickable to open a note (55–82). Data is `cognates.generated.js`. | The model for the comparison page. |
| `ScriptoriumTimeline` (122) | Proportional axis (`edu-axis`, pins, `is-span`), event list, `article.edu-event-detail` with kind, range, native, title, description and "On the dating". `KIND_LABEL` covers text/person/event/practice/manuscript/discovery. **Kicker "In Order", h2 "Timeline" and id `edu-timeline-heading` are hard-coded** (58–63). | Yes, for the lineage of books. It needs optional heading props. |
| `ScriptoriumCurrents` (84) | Tabs over `themes[]`: native, title, translit, summary, paragraphs, `terms[]{native,translit,gloss}`, `texts[]{title,note}`. | Possibly, for essays. |
| `ScriptoriumCorpus` (124) | Works with incipit `{native, english, note}`, a contents TOC, and editions `{label,url,note}`. | Possibly, for the books. |
| `ScriptoriumReckoner` (305) | Letter-sum tool: `edu-reckoner-input`, `edu-reckoner-pair` breakdown, an ignored-characters list, and the strip regex for pointing (14–15). `hasReckoner` (279–283). | The model for the transliterator UI. |
| `ScriptoriumDrill` (160) | Ten-round quiz, glyph→name or name→glyph. Renders `letter.glyph` and `o.show` as **React children**, so a React element works unchanged (106–107, 117–122). It filters out `archaic` letters and keys answers by `name`. | Yes. A drawn glyph can be passed as an element. Accessibility caveat in the Risks section. |
| `ScriptoriumSay` (135) | Synthesised audio from `/audio/index.json`. | No, magical alphabets have no phonology. |

## 6. Data shapes

### 6.1 A hall: `src/data/education/<lang>.js` (default export)

```
{ language, intro, scriptNote,
  hero?, heroAlt?, gallery?: { kicker, title, intro, images:[{file,alt,title,caption}] },   // latin.js 5–37 only
  letters: [{ glyph, name, translit, pronunciation, value?, meaning?, note,
              final?, alt?, altLabel?, archaic?, unicodeName? }],
  divineNames: [{ native, translit, english, meaning, context, value|null, note?,
                  proposals?: [{reading, basis, standing}], proposalsNote? }],
  lexicon: [{ native, translit, english, definition, domain }] }
```

- `hebrew.js` (77 lines) is the compact, one-line-per-entry style. It has 22 letters (9–30). `value` holds the
  gematria number. `meaning` is the pictographic gloss or `null` when contested; the note explains why it is null
  (17, 26, 27). `final` holds sofit forms on Kaf, Mem, Nun, Pe and Tsadi. A `null` divine-name value always carries
  a note saying why (38–44).
- `phoenician.js` (564 lines) is the expanded multi-line style recovered from the deploy build. It adds `unicodeName`
  to every letter and has no `value`; scriptNote explains that Phoenician letters carry no numbers.
  - `divineNames` start at line 209, `lexicon` at 331.
  - It includes an entry for a name that "may not be a name" (molk), argued out in its note.
- Glyphs are always Unicode text. Greek stores both cases in one field ("Α α"). The latin.js letters are
  `'A a' … 'Z z'`: 23 classical letters, with no J, U or W.

### 6.2 Greek Magical Papyri: `src/data/education/pgm.js` (374 lines)

- `{ note, items:[{ title, source, words:[{native,translit,gloss}], translation, note }] }`. That is the reading shape
  without `grid`.
- Seven items:
  1. Headless One, PGM V.96–172 (8)
  2. Headless Daimon, V.145–147 (61)
  3. Star, at 124
  4. Seven Vowels, XIII.824–834 (182)
  5. Ephesia Grammata (225)
  6. Guard for the Body, VII.579–590 (263)
  7. God of the Hebrews, IV.3019–3020 (326)
- It is loaded only by the Greek hall (EducationLanguagePage 46, 168, 174, 378–405). It is **not** validated, **not**
  in the search index, and has no route of its own.
- **Charaktêres: not shown anywhere.** There is no drawn sign and no image.
  - The only mentions are the Greek lexicon entry `χαρακτῆρες` (`greek.js` 689–694, "ring-letters … letters that spell
    nothing, which the handbooks simply direct to be copied exactly as given").
  - The "Guard for the Body" note (`pgm.js` ~263–325) describes the design (names written inside an ouroboros) in
    words only.
  - The translations in pgm items are unattributed (they read as house renderings). The note names Betz 1986/1992 as
    the standard version, but does not say whose words these are.

### 6.3 `ext/<lang>.js`

```
{ numbers: null | { note, digits:[{glyph,value,name?,unicodeName?}], examples:[{native,value,note}], special? },
  readings: [{ title, source, grid: null | [row strings], words:[{native,translit,gloss}], translation, note }],
  correspondences: null | { note, entries:[{ letter, correspondence }] } }
```

Correspondence `letter` can be a name ("Aleph"), glyph plus name ("Α (Alpha)") or a bare glyph. See §3.

### 6.4 The other per-hall modules

- `themes/<lang>.js`: `{ note, themes:[{ slug, title, native, translit, summary, paragraphs[], terms[{native,translit,gloss}], texts[{title,note}] }] }`.
  `terms` and `texts` must be arrays: the validator iterates `t.terms` without a guard (line 211).
- `timelines/<lang>.js`: `{ note, events:[{ slug, title, native, kind, year:int (negative = BCE), end:int|null, circa, circaEnd, description, dating }] }`,
  in ascending `year` order.
- `corpus/<lang>.js` (14 halls): `{ note, works:[{ slug, native, translit, english, author, date, language, volume, description, incipit?:{native,english,note}, contents: null | [...], contentsNote?, editions:[{label,url,note}] }] }`.
  A null `contents` means "not confirmed", and an empty array is forbidden.
- `courses/<lang>.js` (8 courses): `{ language, title, tagline, overview, lessons:[{ number, title, aim, sections:[{heading, paragraphs[], examples[{native,translit,gloss,note?}]}], vocabulary[{native,translit,gloss}], exercises[{prompt,hint?,answer}] }] }`.
- `library.js` (226 lines): `{ books:[{ title, author, year, tradition, description, source, pdfUrl (https), detailUrl, sizeMB }] }`. There are 20 books.
  - Relevant entries: **Agrippa, *Three Books of Occult Philosophy*, trans. "J. F.", London 1651** (Wellcome scan,
    `archive.org/details/b30335231`, 259.6 MB) at lines 72–81. Dee, *Monas hieroglyphica* 1564 (~117–124). Barrett,
    *The Magus* 1801 (138–146).
  - The tradition keys in use are listed in TRADITION_LABELS. `ceremonial-magic` has 6 books.
- `cognates.generated.js`: emitted by `tools/build-cognates.mjs`. Do not edit it. It is
  `{ scripts:[…8], rows:[{ v, proto, sense, ph (Phoenician glyph), note, cells:{ <script>:{g,n,archaic} } }] }`.
  Every cell is looked up from its hall's letters by numeral value. Latin is mapped by position.

## 7. Fonts

- **Where the faces come from:** each `public/fonts/TL<Script>.woff2` is a byte-for-byte copy of a
  `@fontsource/<pkg>` script subset `files/<pkg>-<subset>-400-normal.woff2`. This is verified with `cmp` for
  TLPhoenician, TLGlagolitic and NotoSansCuneiform.
  - The 12 `@fontsource/*` entries in `package.json` dependencies are provenance only. Nothing imports their CSS.
    They are installed in `/home/user/3MAGI/node_modules/@fontsource/`, and that does **not** include runic.
  - Files in `public/fonts`: NotoNaskhArabic, NotoSansCuneiform, NotoSansEgyptianHieroglyphs, NotoSerifDevanagari,
    TLArmenian (9K), TLCoptic (20K), TLCyrillicExt (3K), TLEthiopic (50K), TLGlagolitic (17K), TLMandaic (11K),
    TLPhoenician (5.7K), TLSyriac (17K), TLTibetan (160K), and the TC-Seraphine display family.
- **@font-face rules** (all in `src/index.css`, each `font-display: swap` and scoped to its own block with
  `unicode-range`):
  - TL Hieroglyphs 9477–9484
  - TL Cuneiform, TL Devanagari, TL Arabic 10568–10585
  - TL Tibetan, Syriac, Coptic, Mandaic, Armenian, Ethiopic 10602–10613
  - TL Glagolitic, TL Cyrillic Ext 10938–10942
  - TL Phoenician 11016–11017
- **Stacks:**
  - `.edu-page .edu-glyph` is declared three times, and the last one wins: 9489, 10586, and **10615–10620**.
  - Prose classes use the custom property **`--edu-script-faces`** (10627–10631), consumed at 11290.
  - The Chinese hall uses a system Song stack (10922–10929).
- **Bug: "TL Phoenician" is declared (11016) but named in neither stack**, so the face never loads. Phoenician text,
  in the Phoenician hall and in the cognates ancestor column, falls through to system fonts or tofu.
- **Avestan and Ugaritic have no face at all.**
- **Can the registry be reached:** yes. `npm view @fontsource/<x> version` returns 5.3.0 for `noto-sans-runic`,
  `noto-sans-ogham`, `noto-sans-symbols`, `noto-sans-avestan` and `noto-sans-ugaritic`. I ran
  `npm pack @fontsource/noto-sans-runic@5.3.0 @fontsource/noto-sans-symbols@5.3.0` into
  `/tmp/claude-0/-home-user-3MAGI/681e04fd-d4fb-530c-94a3-2eb5e517d73c/scratchpad/magic/fontprobe/`:
  - runic subset `noto-sans-runic-runic-400-normal.woff2` is 6,588 bytes, `unicode.json` "runic": `U+16A0-16F8`
  - symbols subset is 57,708 bytes and covers the Alchemical block U+1F700-1F7FF plus much else, which is too heavy
    for a handful of signs
  - `fontTools` is not installed (`python3 -c "import fontTools"` fails), so cutting a subset needs `pip install
    fonttools`
- **Recipe for a new face, following house practice:**
  1. `npm pack` the package in the scratchpad, without `npm install` (see setup notes on shared node_modules).
  2. Copy the script subset to `public/fonts/TL<Script>.woff2`.
  3. Add `@font-face { font-family:"TL <Script>"; src:url("/fonts/TL<Script>.woff2") format("woff2"); font-weight:400; font-style:normal; font-display:swap; unicode-range:<from unicode.json>; }`.
  4. Add the family to **both** the 10615 stack **and** `--edu-script-faces`. This is the step the Phoenician face
     missed.
  5. Optionally add the dependency to package.json for provenance, accepting the lockfile churn.
  6. Add the block to `BLOCKS` in validate-education if a hall uses it.
- **Magical alphabets with no Unicode encoding (Theban, Celestial, Malachim, Passing the River, Enochian,
  charaktêres) need no font.** Fonts are only needed if the wing shows Runic (U+16A0), Ogham (U+1680) or Alchemical
  symbols (U+1F700).

## 8. CSS idioms

- **One global sheet:** `src/index.css` (13,152 lines), imported in `main.jsx:4`.
  - The Scriptorium block is **9473–11058** and is prefixed `edu-`.
  - Christianities starts at 11060 and is prefixed `ch-`. The halls already reuse `ch-hero-figure`, `ch-gallery`
    and `ch-kv`.
  - Powers is `pw-`, partly in index.css and partly in per-page sheets: `src/styles/powers-{hero,doors,tables,map,diagrams}.css`,
    imported by the page or component module (`PowersSectionPage.jsx` 14–16, `DoorStrip.jsx` 5,
    `HierarchyDiagrams.jsx` 2 via `@/styles/...`). That is the newer idiom for a wing-specific sheet.
  - `rt-` is the rich-text layer (`christianities/rich.jsx`). `.third-lamp-scope` is the page root (3587, 7293), and
    `.third-lamp-scope .kicker` is at 7299.
- **Scriptorium sub-sections:**

  | Lines | Section |
  |---|---|
  | 9499 | hero |
  | 9525 | section heads (`.edu-section-head`, centred, max 46rem) |
  | 9540 | hall cards (`.edu-hall-grid` auto-fit minmax 230px; `.edu-hall-card` hover lift; `.edu-hall-glyph` 3.2rem gold with glow) |
  | 9597 | reading room |
  | 9686 | alphabet (`.edu-letter-grid` auto-fill minmax 96px; `.edu-letter-card`; `.edu-letter-glyph` 1.9rem #ecd9ae; `.edu-letter-plaque` grid 120–200px / 1fr; `.edu-plaque-glyph` clamp(4rem, 9vw, 6.5rem) #d1ad68 with glow; `.edu-plaque-badge`; `dl/dt/dd`) |
  | 9783 | names |
  | 9826 | lexicon |
  | 9867 | hall nav |
  | 9886 | ≤640px |
  | 9897 | second wave (section-nav 9899, numbers, reckoner 9970, readings, `.edu-reading-grid` 10021, drill 10093) |
  | 10137 | courses |
  | 10334 | corpora |
  | 10510 | proposals |
  | 10640 | currents |
  | 10733 | timeline (`.edu-axis*`) |
  | 10849 | search (`.edu-search-native` 10886) |
  | 10944 | cognates (`.edu-cognates-table` 10953) |
  | 11026 | **print** (`.edu-page *` forced to #111, `.edu-glyph` #000 !important, chrome hidden) |
  | 11241–11292 | "reading voice": prose classes set in sentence-case Georgia plus script faces; transliterations in scholarly italic |

- **Palette** (dark only; there is no light theme, only print):

  | Use | Value |
  |---|---|
  | gold | `#d1ad68` / `rgba(209,173,104,a)` |
  | pale gold headings | `#ecd9ae` |
  | ivory h1/h3 | `#f4f0e7` |
  | body text | `rgba(222,212,196,.68–.78)` |
  | hairlines | `rgba(179,139,70,.22–.4)` |
  | panels | `rgba(16,13,10,.8)`, or `linear-gradient(135deg, rgba(28,22,15,.92), rgba(14,11,9,.95))` |

  Glow is a `text-shadow 0 0 26–34px rgba(209,173,104,.3)`. Display face is Cinzel for headings, letter names and
  chips.

## 9. Tooling

### 9.1 `tools/validate-education.mjs` (296 lines). Every rule:

Setup:
- `HALLS` is a hard-coded list of 20 (19–23).
- `BLOCKS` holds per-hall Unicode ranges (29–52). **Absent for latin, mandaic, avestan, ugaritic and phoenician, so
  those halls get no script check** (`checkScript` returns early at 92).
- `ALSO_ALLOWED` (58–63).
- `alwaysOk`: Latin, IPA, combining marks, Latin Extended Additional, punctuation, super/subscripts, Latin Ext-D
  (70–78).
- `load()` **swallows import errors and returns null** (85–87).

Per hall:
1. `hero` file exists in `public/media`, and hero requires `heroAlt` (137–140).
2. Gallery images exist, each with `alt`, `caption` and `title` (141–146).
3. A missing dataset fails (147).
4. If letters, names and lexicon are all empty, it warns "scaffolded" and **skips every remaining check for that
   hall**, including ext/themes/corpus/timeline/course (153–154).
5. Names or lexicon present without letters fails (155).
6. Letters:
   - glyph required, name required (159–160)
   - missing note is a warning (161)
   - script check on the glyph (162)
   - duplicate letter name fails (163)
   - `value`, when not null, must be a non-negative integer (165–167)
7. Divine names:
   - script check on native (172)
   - a bare "uncertain/unknown/disputed" meaning fails (173–175)
   - `proposals` needs at least 2, each with `basis` and `standing` (176–181)
8. Lexicon: script check on native (185).
9. ext:
   - each reading needs `source`
   - script check on reading words
   - every digit must have a numeric value
   - numbers need examples (187–201)
10. themes: duplicate slug fails; `paragraphs` must be non-empty; script check on each term's native, which
    iterates `t.terms` unguarded (203–213).
11. corpus: duplicate slug fails; script check on native; `contents` must be `null`, not `[]`; edition URL must match
    `^https?://` (215–228).
12. timelines: duplicate slug fails; integer year; `end >= year`; ascending order (230–243).
13. course: lessons numbered 1..n; every exercise has an answer (245–257).

Global:
- ATTESTED sums (105–110, 261–270): יהוה 26, אהיה 21, חי 18, λόγος 373, Ἀβραξάς 365, ΙΑΩ 811, الله 66, Տէր 9007.
- library: `pdfUrl` must be https and unique (273–279).
- Up to 10 warnings are printed. Any error exits 1.

It is first in `npm run build` and in `npm run validate` (package.json).

### 9.2 `tools/build-search-index.mjs` (337 lines)

- `push(h,k,n,l,s,d,a,u)` (41–45) builds `{h,k,n,l,s,d:d.slice(0,180),a}` and adds `u` only when given.
  - h = hall key; k = kind; n = native text (empty if none); l = label; s = subtitle; d = detail; a = anchor id;
    u = explicit path.
- Hall loop (47–90):

  | Kind | Native | Label | Subtitle | Detail | Anchor |
  |---|---|---|---|---|---|
  | `sign` | glyph | name | translit | meaning — note | `edu-letter-{i}` |
  | `name` | | | | | `edu-names-heading` |
  | `term` | | | | | `edu-lexicon-heading` |
  | `current` | | | | | `edu-currents-heading` |
  | `work` | | | | | `edu-corpus-{hall}-{slug}` |
  | `event` | | | "c. N BCE/CE" | | `edu-timeline-heading` |
  | `lesson` | | | | | `lesson-{n}` (hrefFor sends it to `/course`) |

  These records carry no `u`, and route by convention.
- Library books are `h='library'`, `k='book'` (92–96).
- Christianities records use `h='ch'` and Powers records `h='pw'`, both with explicit `u` (98–328).
- Output is `{ halls: TITLES, records }`, written to `public/scriptorium-index.json`. **The file is committed and is
  1,081,150 bytes.** `TITLES` (29–36) also feeds the result tag (`index.halls[r.h]`).
- Not indexed: pgm items, ext readings, ext numbers.

### 9.3 `tools/generate-sitemap.mjs`

- `staticRoutes` is a hand-kept list (24–80): every hall URL (34–53) and every course URL (71–78).
- `lastmod` is today. The site is `https://threemagipress.com`.
- Gated and coming-soon essays are excluded (85–91).
- Output `public/sitemap.xml` is git-ignored.

### 9.4 `tools/generate-llms.js`

- `arrayFrom(file, name)` (28–43) slices an `export const NAME = [ … ]` literal out of source text, skipping comments
  and strings, and evaluates it with `new Function`. The array must therefore hold only literals.
- It lists halls from `EducationPortalPage.jsx` HALLS (56) and courses by importing `data/education/courses/*.js`
  (58–63).
- The Scriptorium section is at 103–106: the portal, then `The <name> hall: <blurb>`, then courses.
- `describe(file)` reads a literal `<meta name="description" content="…">`.
- The build runs it as `(node tools/generate-llms.js || true)`, so a failure does not stop the build.
- Output `public/llms.txt` is git-ignored.

### 9.5 `tools/build-cognates.mjs`

It derives the kinship table from hall data by numeral value (`POSITIONS` 27–50, `BY_VALUE` 54), so it cannot drift
from the halls. This is the pattern for a derived comparison table.

### 9.6 Build order (`package.json` "build")

1. validate-education
2. validate-christianities
3. validate-powers
4. build-mapland
5. build-cognates
6. build-search-index
7. generate-sitemap
8. gated-manifest
9. generate-llms (`|| true`)
10. vite build
11. split-essays

### 9.7 Lint

- `eslint.config.mjs` 55–59 runs `horizons/no-unicode-escapes-in-jsx` (a warning) on `.jsx`. Write literal characters,
  not `\u` escapes, in JSX text and quoted attributes. `.js` data files are exempt.
- Data files use `'\u{132F9}'` only inside JS string literals, as in EducationPortalPage 18–19.

## 10. How the house rules are enforced in code

"Quotations name their translation" is enforced only in `tools/validate-christianities.mjs`:
- `rosicrucian.rulesIntro` must match `/Vaughan|1652|translat/` (524–530)
- `brethrenRule` needs both `quote` and `translation` (671–673)
- `brethren[].quote` requires `quoteTranslation` (681)
- the Chymical Wedding `days[].quote` requires `quote.note` "on where the wording comes from" (~846)
- `figures[].quote.source` must exist and look like a citation (227–229)
- Bibles `versions[].madeFrom` is required (335)
- **The Scriptorium enforces nothing of this kind.** `ext.readings[].translation`, `pgm.items[].translation` and
  `corpus.incipit.english` carry no translator field, and the validator never asks for one.

"Drawings say what they were drawn from":
- `rosicrucian.signs[]` (data at `src/data/christianities/rosicrucian.js` line 73) requires the fields key, title,
  year, image, alt, about, drawn and source (626–634). Further checks:
  - `image` must exist in `public/media`
  - `drawn` must be at least 15 words ("say what the drawing follows and what is its own")
  - `source` must match `/\b1\d{3}\b/` (it must name a dated original)
  - `alt` must be at least 8 words
- `src/data/emblems.js` entries (3 entries: christianities, powers, powers/hierarchies) are checked in
  validate-christianities 796–804. The image must exist, `alt` must be at least 12 words, and the caption must match
  `/made for (this|the) (page|portal)/`.
- The Rosicrucian emblem caption must match `/diagram of a letter|not a copy/` (806–810). The vault figure "must say on
  its face that it diagrams a description".
- **Each SVG also carries its provenance in an XML comment** (`public/media/rosicrucian/monas.svg` gives the full
  construction from Dee's Theorem XXIII, ending "Printed in black; gold here"; `public/media/emblems/powers.svg` lists
  its motifs).

Captions and alt text:
- validate-education: hero needs `heroAlt`; gallery cards need title, caption and alt.
- validate-powers: every `image` needs `imageAlt`.
- validate-christianities: gallery alt at least 5 words, plus title and caption.
- Pages: `Plate.jsx` renders `imageCaption` through `Rich`. The `HERO` captions are prose observations about the
  scene (EducationLanguagePage 79–94).

Contested standing: validate-christianities uses declared keys of standings (`documented|claimed|disputed`, ledger
keys) and `checkContested`. Its descent and lines rules insist that a claimed link "say what the record lacks". This is
the precedent for `standing: documented|attributed|disputed|legend` in the brief.

## 11. Existing "drawn letter" / SVG machinery

- **`src/pages/christianities/symbolMarks.jsx` (229 lines)** is the closest precedent.
  - It is a `MARKS` map of slug to inline JSX `<svg className="ch-symbol-mark" viewBox="0 0 24 24" role="img"
    aria-label fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">`
    (9–13). Each mark is a handful of paths, circles and filled dots, with a comment describing what is drawn.
  - It is used by `ChristianitiesSectionPage.jsx` Symbols (193–215): `span.ch-symbol-glyph.is-drawn` when a mark
    exists, otherwise the text glyph in `.edu-glyph`.
  - CSS: 13061 (`.ch-symbol-mark` 2.7rem, gold, hover #f4e8c8), 11979–11985 (scale on hover), mobile 11140–11142.
  - The house line is therefore 1.3/24 ≈ 5.4% of the em box: a round-capped, currentColor stroke.
  - **There is no provenance field and no validator rule.** These are decorative marks with `aria-hidden` wrappers.
- **`src/pages/christianities/Plate.jsx` (33 lines)** is an `<img>` plate with an optional light layer and a `Rich`
  caption (`pw-entry-figure`, `.is-wide`, `.is-portrait`). It has no glyph logic. It suits a full-page facsimile or
  "table as printed" plate, not individual letters.
- **`PortalEmblem.jsx` (25), `LutherRose.jsx` (21) and `src/data/emblems.js` (29)** show emblems as `<img>` of
  400×400 SVG files in `public/media/emblems/` and `public/media/rosicrucian/`. These use gradient fills (`url(#g)`)
  and hard-coded gold, so they do not follow currentColor.
- **The Rosicrucian "signs"** (ChristianitiesRosicrucianPage 125–175) render a `figure.ch-rc-sign` with
  `img` 400×400, `figcaption` (year, h3, about, a `div.ch-kv` "What is drawn", and source). "How the sign travelled"
  shows the same images at 44px as chips. This is the presentational model for a "drawn from" block.
- **`powers/HierarchyDiagrams.jsx`** is pure inline SVG, currentColor, with a `Frame` that pans on phones
  (`powers-diagrams.css`), `role=img` plus title/desc, and text in Cinzel (`const F` at line 20).
- **`powers/DoorStrip.jsx`** is a seal-row nav that reads `EMBLEMS['powers/<slug>']` and shows an empty seal until an
  emblem lands.
- `LampPostIcons.jsx` uses SVG `<text>` with rune characters in a system serif. It is decorative and not reusable.
- There is no SVG sprite or `<use href>` anywhere in `src/`.

---------------------------------------------------------------------------------------------------------------------

## 12. Recommended integration plan

### 12.1 Routes

Add the routes to `src/App.jsx` as four lazy imports, declared **before** line 106 (`:lang`):

```
/third-lamp/education/magic                → MagicPortalPage
/third-lamp/education/magic/compare        → MagicComparePage
/third-lamp/education/magic/transliterate  → MagicTransliteratorPage
/third-lamp/education/magic/:alphabet      → MagicAlphabetPage
```

- Static segments beat `:lang` and `:alphabet` (RR 7.18 scores static 10, dynamic 3).
- Declaring them before 106–108 also settles the one tie (`/magic/course`) in the wing's favour.
- `validate-magic` must reserve the slugs `compare`, `transliterate`, `course` and `books`.
- An unknown alphabet gets `<Navigate to="/third-lamp/education/magic" replace />`, mirroring EducationLanguagePage
  line 145.

### 12.2 Files

New files:

| Path | Purpose |
|---|---|
| `src/data/education/magic/registry.js` | **Plain literals, no `import.meta`.** `{ wing:{title,kicker,intro,…}, alphabets:[{ slug, name, otherNames, keyedTo:'hebrew'\|'latin'\|'none', direction:'rtl'\|'ltr', door:{d,rings,dots}, blurb }] }`. One registry imported by pages *and* by node tools (validator, search index, sitemap, llms). |
| `src/data/education/magic/<slug>.js` | One module per alphabet (e.g. `theban`, `celestial`, `malachim`, `transitus`, `enochian`, `charakteres`). This is a subfolder, so the non-recursive `../data/education/*.js` glob never offers it as a hall. |
| `src/data/education/magic/books.js` | The lineage of the books, in ScriptoriumTimeline shape (`{note, events:[{slug,title,native?,kind:'text'\|'person'\|'manuscript',year,end,circa,circaEnd,description,dating, alphabets:[slug], editions:[{label,url}]}]}`). Agrippa 1533/1651 links can point at the Reading Room copy (library.js 72–81). |
| `src/data/education/magic/compare.generated.js` | Emitted by `tools/build-magic.mjs`. Do not edit. |
| `src/pages/magic/lib.js` | `LOADERS = import.meta.glob(['../../data/education/magic/*.js','!**/registry.js','!**/*.generated.js'])`, `loadAlphabet(slug)`, and a re-export of the registry. Mirrors `pages/powers/lib.js`. |
| `src/pages/magic/MagicGlyph.jsx` | The single renderer (§12.4). |
| `src/pages/magic/MagicPortalPage.jsx` | Portal page. |
| `src/pages/magic/MagicAlphabetPage.jsx` | One page per alphabet. |
| `src/pages/magic/MagicComparePage.jsx` | Comparison page. |
| `src/pages/magic/MagicTransliteratorPage.jsx` | Transliterator. |
| `src/styles/magic.css` | Prefix `mg-`. Only what `edu-` lacks: the svg glyph box, the drawn-from block, confidence marks, the transliterator output strip. Imported by the four pages. |
| `tools/validate-magic.mjs` | Validator (§12.5). |
| `tools/build-magic.mjs` | Builds the comparison data. |

Edits to existing files:

| File | Change |
|---|---|
| `src/App.jsx` | The routes above. |
| `EducationPortalPage.jsx` | Add a `section.edu-magic` between the halls (ends at 111) and `<ScriptoriumCognates/>` (113): an `edu-section-head` (kicker "Secret Letters", h2 "The Magical Scriptorium") and one `Link.edu-hall-card` per alphabet (door glyph via `MagicGlyph` inside `span.edu-hall-glyph`). Add a link to compare and transliterate. **Do not add the alphabets to `HALLS`.** |
| `EducationLanguagePage.jsx` 378–405 | Optionally add one line in the PGM section linking to the charaktêres page. |
| `ScriptoriumTimeline.jsx` 58–63 | Optional `kicker`, `heading` and `headingId` props. The defaults keep today's output. |
| `ScriptoriumSearch.jsx` | Add `KIND_LABEL`/`KIND_ORDER` entries for `alphabet` (and the existing gap: `manuscript`, `note`). Render `r.p` (a path) through `MagicGlyph` where `r.n` is empty (186). |
| `tools/build-search-index.mjs` | Add a magic block (§12.6) and `magic: 'The Magical Scriptorium'` in `TITLES`. |
| `tools/generate-sitemap.mjs` | Add the 3 fixed URLs plus one per registry alphabet, by importing the registry. |
| `tools/generate-llms.js` | Add a "## The Magical Scriptorium" section built from the registry, by importing it, not via `arrayFrom`. |
| `package.json` | `build` and `validate`: `validate-magic` after `validate-powers`, and `build-magic` before `build-search-index`. |

### 12.3 Page composition (identical idiom to a hall)

**Alphabet page.**
- Root: `div.third-lamp-scope.edu-page.edu-lang-page.mg-page[data-hall="magic-<slug>"]`.
- Helmet title: `${name} — The Magical Scriptorium — The Third Lamp`.
- `ThirdLampHeader` / `main.edu-main` / `ThirdLampFooter`.
- Hero: `section.edu-hero.edu-lang-hero`.
  - Kicker: `<Link>The Scriptorium</Link> · <Link>The Magical Scriptorium</Link>`.
  - h1, then a sample row of MagicGlyphs, then intro.
  - `nav.edu-section-nav`, built from the same conditional `sections` array pattern (169–181).
- Sections, each opening with `header.edu-section-head` (a kicker, an h2 with a stable id, and a `p`):
  1. **The Alphabet**: the exact markup of 231–305.
     - `edu-letter-grid[role=listbox]` with the same keyboard handler. Respect `direction` for the arrow keys.
     - `edu-letter-card` with `MagicGlyph` inside `span.edu-letter-glyph`.
     - `edu-letter-plaque`, whose `dl` rows are:
       - Stands for: the value, with a link to the Hebrew or Latin hall
       - Transliteration
       - Number: looked up from `hebrew.js` by glyph, never stored twice
       - Name
       - Form: `formConfidence`. When it is `low`, show an `edu-plaque-badge` reading "drawn with reservation".
       - Variants: the other editions' forms, side by side
     - `p.edu-plaque-note`.
     - The hall's `id=edu-letter-{i}` becomes `id=mg-letter-{i}`. Read `location.hash` on mount to *select* the letter
       a search result points at; the halls only scroll to it.
  2. **The drawing**: a `div.ch-kv` "What is drawn" plus the source line, as in the Rosicrucian signs (144–145). It
     states the edition, page or plate followed, what is conventional, and what is the site's own.
  3. **First attestation and the books**: `<ScriptoriumTimeline timeline={{note, events: transmission}} kicker="Hand to Hand" heading="How it was carried">`.
  4. **What is claimed**: rows with a standing tag (`documented | attributed | disputed | legend`), each with evidence
     and sources, styled with the existing `ch-rc-tag is-<standing>` / `ch-rc-row`, or a new `mg-` equivalent.
  5. **Uses**.
  6. **In their words**: quotations, each printing its `translation` line.
  7. **Cautions**.
  8. **Sources**: links, using `rel="noopener noreferrer"` and `target=_blank` as the library does.
  9. `<ScriptoriumDrill letters={letters.map(l => ({...l, glyph: <MagicGlyph g={l.glyph}/>}))} langTitle={name} rtl={direction==='rtl'} />`.
  10. `nav.edu-hall-nav` to the other alphabets, then back to the Scriptorium.

**Portal page.**
1. Hero (kicker "The Scriptorium · A Wing", h1 "The Magical Scriptorium", sub, and a door-glyph row in the
   `edu-hero-glyphs` style).
2. `edu-hall-grid` cards, one per alphabet.
3. The books lineage via ScriptoriumTimeline, fed from `books.js`.
4. Two cards to Compare and Transliterate.
5. An optional `<ScriptoriumSearch/>`. It already covers the wing, because every record whose `h` is not `ch`/`pw`
   is in scope.
6. A back link.

**Compare page.**
- `div.edu-cognates-scroll[role=region][tabIndex=0] > table.edu-cognates-table`, two tables:
  - **Hebrew-keyed**: rows are the 22 letters of `hebrew.js`, carrying its `value`. Columns are the Phoenician
    ancestor (`phoenician.js`, by row order) plus every alphabet with `keyedTo:'hebrew'` (Celestial, Malachim, Passing
    the River). Finals go in a sub-row.
  - **Latin-keyed**: rows are the letters of `latin.js` (23, no J/U/W). Columns are Theban, plus Enochian if it is
    keyed to Latin letters.
- Gaps are `span.edu-cog-gap aria-label="no sign"`. Each cell links to `/third-lamp/education/magic/<slug>#mg-letter-<i>`.
- All of this is derived by `tools/build-magic.mjs` into `compare.generated.js`, following the build-cognates rule:
  every cell is looked up from the alphabet's own data and the hall's own letters.

**Transliterator.**
- The Reckoner's idiom: an `edu-reckoner-input` with `dir` per alphabet, alphabet chips (`button.edu-filter.is-active`),
  an output strip of MagicGlyphs, a breakdown of `edu-reckoner-pair`s (source character, then glyph), and an
  `ignored` list.
- **Hebrew-keyed alphabets accept Hebrew input only.**
  - Strip pointing with the same regex as `ScriptoriumReckoner.jsx` 14–15.
  - Map finals to the alphabet's final sign if it has one, otherwise to the base sign, and say which was done.
  - Do not invent a Latin→Hebrew spelling. If a helper is offered, label it as the site's convention and show the
    intermediate Hebrew.
- **Latin-keyed alphabets** apply the folds declared in the alphabet's data (e.g. J→I, U→V, W→VV), printed under the
  tool.
- Its data comes from `compare.generated.js`, so the tool cannot disagree with the tables.

### 12.4 Glyph storage: inline path data in each alphabet's data module, one renderer, no hand-made sprite

**Decision.** Each letter carries its drawing as data (§12.5 shape). `MagicGlyph` renders it inline:

```
<svg class="mg-glyph" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5.5"
     stroke-linecap="round" stroke-linejoin="round" aria-hidden | role="img" aria-label>
  <path d={g.d}/>
  {g.rings.map(([x,y,r=5]) => <circle cx cy r/>)}
  {g.dots.map(([x,y,r=2.6]) => <circle cx cy r fill="currentColor" stroke="none"/>)}
</svg>
```

The svg is styled `.mg-glyph{display:inline-block;width:1em;height:1em;vertical-align:-0.12em;overflow:visible}`.

Reasons:
1. **The house idiom is data-first.** In every hall a letter is a row of data that a validator reads, a build tool
   indexes and a page renders. Inline paths keep the drawing in the same row as its name, value, `formConfidence`,
   variants and note. The validator can then enforce "a drawing says what it was drawn from" per letter and per
   alphabet, as validate-christianities does for the signs.
2. **The look stays indistinguishable for free.** At 1em, with currentColor, the SVG takes its size and colour from
   the existing classes: `.edu-letter-glyph` 1.9rem #ecd9ae, `.edu-plaque-glyph` clamp(4–6.5rem) gold with glow
   (add `filter: drop-shadow` in magic.css to match the text-shadow), `.edu-hall-glyph` 3.2rem, the drill, search,
   hover states and print. Print forces `.edu-page *` to #111, and currentColor follows. Gradient-filled SVG files
   (the emblem idiom) would print gold on white and ignore hover.
3. **It matches the existing drawn marks** (`symbolMarks.jsx`: inline, currentColor, round caps, a stroke of about
   5.4% of the box). A 5.5 stroke on a 100 grid is the same weight.
4. **Cost is small and lazy.** Roughly 150–200 letters at 200–600 bytes of path each is 40–100 KB raw and about
   15–30 KB gzipped, spread over per-alphabet chunks. The halls are already 50–68 KB each.

Rejected:
- **One sprite per alphabet** (`public/media/magic/<slug>.svg` with `<symbol>` and `<use href>`): an external `<use>`
  is a shadow tree, so ring-ends cannot be styled separately. The site has no sprite precedent. A second copy of the
  letter list would have to be kept in step with the data, and the validator would have to parse XML. A sprite is
  worth generating later only if a non-JS consumer (OG images) needs one, and then `build-magic.mjs` should emit it
  from the data.
- **One file per letter** (`<img>`): 150+ requests, no currentColor (colour is baked in), broken hover and print, and
  the name-to-file mapping becomes one more thing to validate.

Drawing grid, which the illustrator and the validator both use:
- viewBox 0 0 100 100; the letter body sits between y 15 and 85, x 10 and 90.
- Absolute commands only: M L H V C S Q T A Z. No transforms, no fills (except `dots`).
- Ring-ends (*Brillen*) are `rings`, open circles of r≈5 centred on the stroke end.
- Each letter carries a one-line `strokes` comment-field in plain words, so a reviewer can check the path against the
  description from the research brief.

### 12.5 Data shape for one alphabet (`src/data/education/magic/<slug>.js`)

```js
export default {
  slug: 'theban', title: 'The Theban Alphabet', otherNames: ['…'], family: 'agrippan',
  keyedTo: 'latin',                 // 'hebrew' | 'latin' | 'none' — which hall the `value`s point into
  direction: 'ltr',                 // how the tables run / how the transliterator writes
  summary: '…', intro: ['para', …],
  firstAttestation: { work, author, date, year /*int*/, place, locator, notes },
  transmission: [{ slug, title, kind: 'text', year, end: null, circa, circaEnd: null, description, dating }], // ascending
  claims: [{ claim, standing: 'documented'|'attributed'|'disputed'|'legend', evidence, sources: ['…'] }],
  drawing: {
    follows: 'Agrippa, De occulta philosophia libri tres (Cologne, 1533), III.29, p. …',   // must name a year
    drawn: '≥15 words: what the drawing keeps from that table, what is conventional, what is the site’s own',
    variants: 'where the 1651 English / Perrone Compagni / Trithemius differ, in words',
  },
  letters: [{
    order: 1, name: 'A', value: 'A' /* or 'א' */, translit: 'a', numeric: null,
    glyph: { d: 'M… ', rings: [[x,y]], dots: [] } | null,   // null = an honest gap, shown as such
    strokes: 'one line, in words',  formConfidence: 'high'|'medium'|'low',
    variants: [{ source: '1651 English', glyph: {…}, note }], note: '…',
  }],
  folds: [{ from: 'J', to: 'I', note }],           // transliterator input folding, declared, Latin-keyed only
  uses: [{ use, evidence }],
  quotations: [{ text, translation: 'J. F., London 1651' | 'paraphrase', original?, source: 'Agrippa, OP III.29' }],
  links: [{ to: 'hebrew'|'greek'|'pgm'|'<alphabet slug>', relation }],
  cautions: ['…'],
  sources: [{ citation, url? }],
};
```

The page, compare table and transliterator compute `numeric` from `hebrew.js` and never trust a stored copy. If a
stored `numeric` is present, the validator checks it against `hebrew.js`.

### 12.6 `tools/validate-magic.mjs`

Model it on validate-powers. It must not swallow import errors.

Registry:
- Each slug is unique, matches `^[a-z][a-z-]*$`, and is not reserved (`compare`, `transliterate`, `course`, `books`).
- Each module exists and its `slug` matches.
- `keyedTo` and `direction` are valid.

Letters:
- Each letter has a name, an `order` running 1..n, and `formConfidence`.
- `glyph` is either `null` (then a note of at least 8 words saying why it is a gap) or a valid path:
  - a tokenizer accepts only absolute M L H V C S Q T A Z
  - every coordinate lies in [0,100]
  - each ring sits within 6 units of a path endpoint
- For `keyedTo:'hebrew'`, `value` must be one of the glyphs or finals of `hebrew.js` letters. For `keyedTo:'latin'`,
  it must be a letter of `latin.js` (case-folded) or a declared extra.
- No duplicate values, unless a declared variant.

Drawing:
- `follows` matches `/\b1\d{3}\b/` and a locator (book/chapter, page, folio or plate).
- `drawn` is at least 15 words.
- Every `variants[].source` is set.

Claims and sources:
- Each claim's `standing` is in the key, and `evidence` is at least 8 words.
- Every quotation has `source`, and a `translation` that names a translator and year, or the word "paraphrase" with
  `original` present.
- `sources` is non-empty, and every URL is `https://`.

Timelines (transmission and books): integer years, ascending, `end >= year`, unique slugs.

Coverage: every Hebrew-keyed alphabet must cover all 22 letters, or declare its gaps.

Finally: `compare.generated.js` is up to date (rebuild it in memory and diff), and every `links[].to` resolves.

### 12.7 Search, sitemap, llms

In `build-search-index.mjs`, after line 96:

```
push('magic','alphabet','',a.title,a.otherNames.join(' · '),a.summary,'', `/third-lamp/education/magic/${a.slug}`)
for each letter i: push('magic','sign','',`${l.name} (${a.title})`, `stands for ${l.value}`, l.note, `mg-letter-${i}`, url)
  + r.p = l.glyph?.d   // path only; skip rings to keep the 1 MB index lean, or encode compactly
for each book event: push('magic','work','',e.title, era, e.description, '', '/third-lamp/education/magic')
```

In `ScriptoriumSearch.jsx` 186, render `r.p` via `MagicGlyph` when it is present.

Sitemap and llms: add entries from the registry. URLs are `/third-lamp/education/magic`, `/compare`,
`/transliterate` and `/<slug>`, priority 0.7, monthly.

### 12.8 Fonts

None are needed for drawn alphabets. If Runic, Ogham or Alchemical signs are added:
- Use the recipe in §7 (`TLRunic.woff2` from `@fontsource/noto-sans-runic@5.3.0`, 6.6 KB, `U+16A0-16F8`), placed in
  **both** stacks.
- Draw the alchemical signs instead of shipping 57 KB of Noto Sans Symbols.
- Fix the unreferenced TL Phoenician while there. The comparison page's Phoenician column depends on it.

---------------------------------------------------------------------------------------------------------------------

## 13. Risks

1. **Route tie.** `/third-lamp/education/magic/course` ties `:lang/course` and resolves by declaration order. Declare
   the magic routes first and reserve the slugs. If the wing's routes were declared after line 107, `/magic/course`
   would hit EducationCoursePage and bounce to the portal.
2. **HALLS is load-bearing.** Adding alphabets to `HALLS` would route them to EducationLanguagePage, which dereferences
   `divineNames` and `lexicon` unconditionally (178–179, 423–491) and would crash. Its `TITLES` gate (145) would bounce
   them anyway. It would also inject them into llms.txt as "halls" and into the hero glyph row as text. Keep a separate
   registry.
3. **Glob reach.** Do not put alphabet modules directly in `src/data/education/`: the hall glob (19) would chunk them
   and `pick('data', slug)` would find them. Keep them in `magic/`, and exclude `registry.js` and `*.generated.js` from
   the wing's own glob.
4. **Registry must be node-importable.** `lib.js` uses `import.meta.glob`, which throws under node, so tools must
   import `registry.js`. `generate-llms` uses `new Function` on source (`arrayFrom`), so any registry it slices must be
   pure literals. Importing it directly is cleaner.
5. **Silent validation gaps already present.**
   - `load()` in validate-education and build-search-index returns null on *any* import error. A broken ext, themes,
     corpus or timeline module is silently skipped (Vite would still fail on a syntax error, but not on a runtime
     error such as a bad import).
   - A fully empty hall skips every check (153–154).
   - latin, mandaic, avestan, ugaritic and phoenician have no `BLOCKS` script check.
   - `themes[].terms` is iterated unguarded (211).
   - pgm is not validated at all.
   
   The new validator must not copy these patterns.
6. **Search index.**
   - Records without `u` route to `/third-lamp/education/${h}#…`. Magic records must set `u`, or they produce
     `/third-lamp/education/magic#mg-letter-3` (the portal) or worse.
   - The result tag shows `index.halls[h]`, so `magic` must be added to the TITLES output.
   - `KIND_LABEL` lacks `manuscript` and `note` today (Christianities emits both), so those results show a blank tag
     and no filter. This is a pre-existing bug.
   - The committed index is 1.08 MB. Adding full rings and dots to every glyph record will grow it, so keep `p` lean.
   - Drawn letters cannot be found by pasting the script, because they have no Unicode.
7. **Fonts.**
   - TL Phoenician is declared (11016) but referenced nowhere, so Phoenician renders in fallback fonts today.
   - Avestan and Ugaritic ship no face.
   - A new face must go into both the 10615 stack and `--edu-script-faces`.
   - `.edu-page .edu-glyph` is declared three times (9489, 10586, 10615). Only the last counts, and editing an earlier
     one does nothing.
8. **Shared node_modules.** `npm install` in this worktree mutates `/home/user/3MAGI/node_modules`, which the main
   checkout and `feat/dash` share, and rewrites the root `package-lock.json`. Use `npm pack` and vendor the woff2, as
   every existing TL face was. `fontTools` is absent, so custom subsetting needs a pip install.
9. **Accessibility of drawn glyphs.**
   - SVG has no inherent text, so every standalone glyph needs `role="img" aria-label`. Inside a card that already
     prints the name, the glyph should be `aria-hidden`.
   - In ScriptoriumDrill's "find the glyph" mode, the four option buttons would have *no* accessible name, and
     labelling them with the letter name gives the answer away. Use neutral labels ("first sign" … "fourth sign") and
     accept that the drill is visual.
   - The transliterator must also output the plain transliteration as text, for copying and for screen readers.
10. **Print and theme.** Use currentColor strokes only. Gradient-filled emblem-style SVGs print gold on white and
    ignore `.edu-page *` print colouring. The site is dark-only, so no light palette exists to match.
11. **Accuracy of drawings.**
    - The brief's own warning applies: a wrong drawing presented as Agrippa's is worse than a gap.
    - The data must allow `glyph: null` and `formConfidence: 'low'`, and the page must show both visibly.
    - Editions differ: the 1533 Cologne woodcuts, the 1651 English plates, Trithemius' *Polygraphia*, and Perrone
      Compagni's critical edition. The `variants` field and the `drawing.follows` locator are mandatory, and the
      validator enforces them.
12. **Quotation provenance has no precedent in the Scriptorium.** ext readings, pgm and corpus incipits print
    translations with no translator field, while validate-christianities enforces one. The wing must adopt the
    stricter rule: J. F. 1651 is public domain and quotable, while modern translations (Tyson/Freake) are in
    copyright, so paraphrase those and say so. The wing will then be stricter than the halls it sits beside, and
    should not be "harmonised" downward.
13. **Transliterator honesty.** Agrippa's Celestial, Malachim and Passing-the-River tables are keyed to Hebrew
    letters. Any Latin→Hebrew step is the site's invention and must be labelled as such, or refused. Finals and
    letters with no attested sign must be reported, not silently substituted.
14. **Stale counts on the site.**
    - EducationPortalPage says "sixteen" in 71, 81–83 and 95; there are 20 halls.
    - The HomePage card stats (22–27) are stale.
    - The ScriptoriumSearch blurb says "fourteen scripts" (41–42).
    - Code comments in validate-education (4) and EducationLanguagePage (15) are stale too.
    
    Adding a wing compounds this. Either update the counts in the same change or derive them.
15. **Cross-validator coupling.** If the wing gets a portal emblem in `src/data/emblems.js`, it is validated by
    `validate-christianities.mjs` (796–804): the caption must contain "made for this page", alt must be at least 12
    words, and the file must exist in `public/media`.
16. **Timeline reuse.** ScriptoriumTimeline hard-codes kicker, h2 and `id="edu-timeline-heading"`. Two timelines on one
    page (transmission plus books) would duplicate the id, and the search's `edu-timeline-heading` anchors assume one.
    Add props before using it twice.
17. **Living organisations.** Enochian and some ring-letter material circulate in living orders (Golden Dawn
    successors, Thelemic bodies). Per the brief, do not reproduce their current emblems or texts. Draw from the
    16th–17th-century sources (Dee's manuscripts, Agrippa's prints) and name them.
18. **SEO is client-rendered.** There is no prerender. Helmet titles appear only after JS runs, the same as the halls,
    and the sitemap and llms entries are the only crawler-facing listing. The OG generator covers articles only.
19. **RTL and keyboard.** For Hebrew-keyed alphabets the letter grid's arrow handling (244–257) keys off `rtl`. Decide
    per alphabet whether its table runs RTL, and pass `direction` through. The transliterator output `dir` must match.
20. **Lint.** Literal `\u` escapes in JSX text or attributes trip `horizons/no-unicode-escapes-in-jsx`. Use literal
    characters in JSX and keep escapes inside JS strings or data.
21. **Bundle and CSS.** Per-wing CSS imported from page modules (the powers idiom) splits correctly under Vite. A
    selector added to `index.css` instead loads on every page. Keep `mg-` rules in `src/styles/magic.css`.

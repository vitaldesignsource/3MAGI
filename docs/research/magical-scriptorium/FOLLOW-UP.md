# The Magical Scriptorium: follow-up before and after publication

What the review of the whole wing left open. Each entry says where, what,
and the proposed fix. Points already fixed are in the commit history, not here.

## Open work

1. **Ibn Waḥshiyya: the rest of Hammer's tables.**
   Where: `apps/web/src/data/education/magic/ibn-wahshiyya.js`; the research
   in `plates/ibn-wahshiyya.catalogue.json` (all 86 tables, by chapter and
   page) and `traced/ibn-wahshiyya/`.
   What: five tables are drawn (the Syriac, Arabic p. 9; Plato's, p. 18;
   Hermes Abū Ṭāṭ's, p. 34; Siyūriyānūs's, p. 36; Jupiter's, p. 48), traced
   from the Wellcome Library copy of Hammer 1806 (Internet Archive b22039910,
   Public Domain Mark), checked against the Getty and UNC copies, and two
   hieroglyph tables are shown in facsimile. Still open, and said so on the
   page: the book's 38 letters against the 37 signs counted in the Harāmisa
   table, and Hammer's "Zayimap"; on p. 121 only the first and last names are
   transcribed, and the second line under p. 120's last row is not.
   Fix: trace further tables from the catalogue (the other six planets first:
   Arabic pp. 47–53), each with an independent check, as the five were.

## Needs the owner's decision

2. **Corrections to existing wording outside the wing.**
   Where: `apps/web/src/pages/HomePage.jsx` (the Scriptorium card: "Sixteen
   language halls…" and the stats "16 halls / 497 signs / 245 divine names /
   4 courses"); `apps/web/src/pages/EducationPortalPage.jsx` (the hero's
   "sixteen language halls", the heading "Sixteen scripts, sixteen doors", the
   meta description's list of halls, and, through `ScriptoriumSearch.jsx`, the
   search blurb "in fourteen scripts"); the matching `/third-lamp/education`
   line of `public/llms.txt` (`tools/generate-llms.js`).
   What: the live wording is out of date (the site has twenty halls, 631 sign
   and 308 name records and eight courses), so the branch derives each count
   from the data. The values are true, but they change wording that is
   already on the site, and the search blurb now also says the box searches the
   Magical Scriptorium.
   Fix: the corrections stand in a commit of their own (a45b457, "Scriptorium
   counts: correct the live wording on Home and the portal"), directly after a
   commit that restores the live wording. They were published with the wing,
   because the old counts were false; if the owner prefers the old wording,
   revert that one commit.

3. **Shared components that change pages outside the wing.**
   Where: `ScriptoriumTimeline.jsx` (lanes and 24px pins), `ScriptoriumDrill.jsx`
   (focus, `aria-disabled`, the find-mode labels), `ScriptoriumSearch.jsx` (the
   script-face font in the box; Note and Manuscript tags on Christianities
   results), and the Scriptorium portal's hero glyphs (`.edu-hero-glyphs.is-halls`).
   What: deliberate fixes that reach the twenty halls, the Christianities and
   Powers portals. The review found nothing defaced and every pin and drill
   behaving the same or better.
   Fix: no code change; list them in the PR description as deliberate fixes
   to shared components.

## Before publishing

4. **A library record that answered 500.**
   Where: `theban.js` and `trithemius.js`, the citation of the Zetzner
   Polygraphia of 1600 (Czech library record cbvk.stjvkcb1020804900 at
   historickefondy.cz).
   What: the record returned 500 to the review and again before publishing
   on 20 October 2026, and the Wayback Machine holds no copy, so the citation
   was kept and its URL dropped.
   Fix: if the record answers again, restore the URL in both citations.

## Later

5. **De Balmes and Panteo: what their pages leave open.**
   Where: `transitus-fluvii.js`, `the-books.js`, `celestial.js`, `malachim.js`,
   `alphabet-of-the-magi.js`, `charakteres.js`, `enochian.js`.
   What: de Balmes (sig. b6v–b7r, Brandeis and Florence copies) and Panteo
   (ff. 11v–15r, Florence copy) were read on 21 October 2026, and the pages
   give them as read. These points are still open:
   - The "very old book" (liber uetustissimus, sefer yashan noshan) in which
     de Balmes says he found the script, his only source, is not identified.
   - That he shows it as a script derived from the square letter is the
     Rylands blog's reading; the page does not say so.
   - Not tested from the page: Macfarlane's "first ring-letter alphabet
     printed in Europe"; Campanini's misreading thesis and its Talmudic
     background (his studies of 1997 and 2014 were not read). Which work
     gives "pp. 24–25" is not known: that they are the Brandeis scan's leaves
     24–25 is likely, not shown.
   - Whether de Balmes's two tables (b6v, b7r) were printed from the same
     block or blocks. They agree sign for sign at scan resolution.
   - The Florence copy's Hebrew page and title page were not seen at full
     resolution, so its record's "XIII. Kl." (against its own "[18 XI]" and
     the Brandeis title page's XIIII) is probably, not certainly, a slip.
   - Panteo's edition of 1550 (Pelling's ff. 15v–16r) was not seen, and
     Pelling does not say which alphabet he calls "second"; the printing of
     1530 bears out neither reading of his claim.
   - Whether Panteo took the alphabet from de Balmes: he shares de Balmes's
     Zain, Caph, Ain, Res, Schin and Tau against Agrippa, but not Vau's tall
     horn or Zade's long legs, and he names no source.
   - Panteo's line "Secundi uero in transitu fluuii subscripti: & Abraæ
     concessi" is terse ("subscripti" may be "written below" or "set down";
     the mark over the æ is unexplained), and whether the "supradicti
     caractéres" granted to Moses (f. 13v) are both Hebrew forms or only the
     third is not stated. Ambrogio (1539, fol. 202r) counts the common
     alphabet and the one given to Moses as two; that is his reading, not
     Panteo's words.
   - Panteo's printer and date rest on library records (Florence: Venice,
     April 1530, Giovanni Tacuino; Wellcome: "[J. Tacuinus]"); the colophon
     was not read, nor the rest of the Voarchadumia page by page, so an
     "alphabet des mages" elsewhere in it is not wholly excluded.
   - Panteo's Enoch alphabet (twenty-six signs, ff. 14v–15r) has not been
     compared with Dee's letters.
   - Tory: Chioli (p. 5 of his PDF) says the "Lettres Caldaiques" of the
     Champ Fleury, on f. LXXVII, are much the same as de Balmes's and
     Agrippa's alphabet. With Wikipedia's f. 76v and the BnF's f. 73r that is
     a third folio. Unchecked.
   - No plate: the three Internet Archive items have no rights field, the
     Florence scans carry "Copyright © 2011 ProQuest LLC" on every image, and
     Wellcome's Panteo is online only through licensed ProQuest. A search
     result points to a de Balmes copy digitised by the Bayerische
     Staatsbibliothek (from Augsburg) and listed in the Deutsche Digitale
     Bibliothek with a non-commercial licence; its record was behind a bot
     check and was not opened.
   - Typography (for the letters-typography work): no face in the wing's
     stacks has Hebrew, so the Hebrew headings now quoted are drawn by the
     reader's system font (Liberation Serif in the test browser). In the
     pages' prose each Hebrew run is isolated in `<bdi dir="rtl" lang="he">`;
     in the timeline (the de Balmes entries of `transitus-fluvii.js` and
     `the-books.js`) the shared `ScriptoriumTimeline.jsx` prints the
     description as plain text, so the run is not isolated, though it reads
     in order at 1280. Panteo's contraction for con- and his marked æ are
     written out because the text face lacks them.
   Fix: read Campanini (1997, 2014) and Macfarlane in full; open the
   Bayerische Staatsbibliothek copy for a licensable plate of sig. b6v–b7r;
   see Panteo's edition of 1550 and the colophon of 1530; compare Panteo's
   Enoch alphabet with Dee's; read Tory's f. LXXVII.

6. **Duret and Fry: what their pages leave open.**
   Where: `celestial.js`, `malachim.js`, `transitus-fluvii.js`,
   `alphabet-of-the-magi.js`, `enochian.js`, `the-books.js`.
   What: Duret (Cologny, 1613; University of Ottawa microfiche, Internet
   Archive fre_b1886963: pp. 115, 117, 119–127, 266–268), Fry (London, 1799;
   Wellcome copy, Internet Archive b28757002: pp. xxiii, xxvi, 28–35) and
   Ambrogio (1539, fols. 202r–203v) were read on 21 October 2026, and the
   pages give them as read. These points are still open:
   - Duret's sources for his tables. The Celestial (p. 119) and the Malachim
     (p. 124) follow Agrippa's order and layout, unlabelled, and Duret names
     no source on those pages. The River table's labels (Olaph, Gomal,
     Doleth, Lomed, Num, Samach, Hoin, Choph, Coph, Tzode) and eight of its
     signs (Aleph, Vau, Lamed, Mem, Samech, Ain, Res, Shin) are not
     Agrippa's. Whether they come from de Balmes, Panteo, Ambrogio or
     elsewhere is not known, and Duret's table has not yet been compared sign
     by sign with de Balmes's and Panteo's, now read. Two labels are unclear
     on the fiche: "Doleth" (e or u) and "Num" (or "Nun").
   - The fiche is poor ("Document original de trés mauvaise qualité"): the
     Celestial's Samech, Zade, Daleth and Kuff without their 1533 bar or
     rings may be filming defects, though Fry's "Chaldean 1." shows the same.
   - Where Duret's statue by the Jordan (p. 125) comes from. He gives it to
     "the Hebrews" and says de Balmes confirms it, "au rapport de Theseus
     Ambrosius", but the Latin he quotes from Ambrogio does not contain it,
     and de Balmes's page says only that he found the script in a very old
     book.
   - The reissue of 1619 (Fry: "4to. Yverdon, 1619") was not seen. Fry's page
     references fit the pagination of 1613.
   - Duret's table on p. 126 (Fry's "Chaldean 8.") was seen but not described
     or compared, and Fry's "asserted to have been used by Abraham" was not
     looked for in Duret. Duret's Enoch table (p. 127), which he gives to
     Panteo on Ambrogio's report, has not been compared with Panteo's (ff.
     14v–15r) or with Dee's letters; his text describes three rows of nine,
     while the table as filmed and Fry's copy show fewer signs in some rows.
   - Ambrogio's two ring-letter alphabets on fol. 203v ("Aliud alphabetum"
     and the unheaded one after it) have not been compared with the Malachim
     or the River script.
   - Fry's source for his River forms: his Mem is Duret's and his Aleph the
     mirror of Duret's, but the rest is close to 1533. He cites De Sivry,
     Recherches, p. 191 (Sigismondo Fanti), and Duret, p. 124; neither De
     Sivry nor Fournier was read. His "Gaffarel, p. 1" for "Chaldean 1." was
     not checked against Gaffarel's English of 1650.
   - Whether Mathers took the Magi forms from Fry or from Duret: both share
     Duret's Yod and Shin.
   - That Fry's specimens are engraved (the-books.js says "engraves"), and
     the counts of 405 specimens, 164 languages or 208 alphabets, are not
     verified; his preface says only that he procured "originals and
     engraved copies" and copied every character himself.
   - The Theban: Fry's OCR has no "Theban", "Honori" or "Agrippa" for an
     alphabet, and his preface says he gives no secret alphabets, but not
     every plate was paged through. Duret has no Theban on the leaves viewed;
     "Honori" occurs in the OCR on leaves 25, 141, 404, 765 and 829, not
     viewed. Ambrogio's letter on p. 267 (the page map's "167" is wrong)
     names "magorum verò characteres ab Honorio Thebano appone … edidit …
     Cornelius Agrippa"; its year (read 1537) and the word "appone" are
     uncertain on the fiche, and that it means Pietro d'Abano is a guess.
   - Postel's commentary on the Sefer Yetzirah, which Duret names on p. 119,
     was not read, and the bookseller's date of 1538 is unchecked.
   - Duret's other Agrippa citations (p. 134 and elsewhere) were seen only in
     the OCR; the page map cannot be trusted unchecked.
   - Plates: the Duret fiche states no rights, so no crop of it is shown;
     Fry's pages (Wellcome, Public Domain Mark) could be; Ambrogio's scan
     has a Public Domain Mark licence URL but an empty rights field, and is a
     Google digitisation outside the wing's plate repositories.
   Fix: compare Duret's River and Enoch tables with de Balmes's and Panteo's;
   view the OCR leaves for Honorius; find a copy of 1619; read De Sivry,
   Gaffarel's English of 1650 (p. 1) and Postel; compare Ambrogio's fol.
   203v; decide whether Fry's "Chaldean" plates should be shown.

7. **The draft of 1510 and the critical edition.**
   Where: every page that says the Würzburg draft (Universitätsbibliothek,
   M. ch. q. 50) is reported to survive, and that Perrone Compagni (1992)
   is reported to take account of it.
   What: neither the manuscript nor the edition was seen.
   Fix: consult Perrone Compagni's apparatus for III.29–30 and II.22; then
   settle whether the draft holds the alphabets, on every page at once.

8. **"Disputed" covers refuted claims too.**
   Where: `apps/web/src/pages/magic/lib.js` (STANDINGS) and
   `tools/validate-magic.mjs`.
   What: the key now reads "contested, unproven or contradicted by the
   record; the evidence says which", which is true of all of them; about 25
   claims are in fact contradicted by the record.
   Fix (optional): add a fifth standing, e.g. "mistaken: the record
   contradicts it", to both lists, and move those claims to it.

9. **Unknown wing addresses are still a soft 404.**
   Where: `MagicAlphabetPage.jsx` and the `magic/*` routes in `App.jsx`.
   What: a miss is now recorded for the owner's 404 list before the redirect
   to the wing, but a crawler still sees a 200 page that duplicates the
   portal. The halls, Powers and Christianities do the same.
   Fix: render a short "no such alphabet" page with the not-found beacon and
   a link to the wing, and do the same for the halls and portals.

10. **The Reckoner strips Hebrew punctuation as pointing.**
    Where: `apps/web/src/components/ScriptoriumReckoner.jsx` (its `strip`
    pattern, whose ranges the wing's transliterator copied).
    What: the wing's transliterator now reads maqaf (U+05BE) as a word break
    and passes over paseq, sof pasuq and nun hafukha as punctuation; the
    Reckoner, an existing hall tool, still strips them with the vowel points,
    so a maqaf silently joins two words there.
    Fix: if the Reckoner shows words separately, apply the same exclusion
    there, in a change of its own.

11. **No page outside the wing has a canonical link.**
    Where: every Helmet block outside `apps/web/src/pages/magic/`.
    What: the wing's routes now give `<link rel="canonical">`; the rest of the
    site still gives none, so the dashboard records it as null there.
    Fix: add the same link, from the sitemap's origin, to each route's Helmet.

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
   Fix: the corrections stand in a commit of their own, "Scriptorium counts:
   correct the live wording on Home and the portal", directly after a commit
   that restores the live wording, so either can be kept. Record the owner's
   explicit approval in the PR description, or revert that one commit to keep
   the live wording.

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
   Polygraphia of 1600 (`https://www.historickefondy.cz/Record/cbvk.stjvkcb1020804900`).
   What: the record returned 500 to the review and again on 20 October 2026;
   the Wayback Machine holds no copy.
   Fix: re-check before publishing; if it is still down, keep the citation
   and drop the URL.

## Later

5. **De Balmes's page and Panteo's plate have not been read.**
   Where: `transitus-fluvii.js`, `the-books.js`, `celestial.js`, `malachim.js`,
   `alphabet-of-the-magi.js`, `charakteres.js`.
   What: the River script in de Balmes (Venice, 1523, sig. B6v by Peterson)
   and in Panteo (Venice, 1530) now stands everywhere as reported, on
   Macfarlane, Peterson and the Rylands blog. Both books are digitised (the
   copies the pages already link).
   Fix: read sig. B6v (or pp. 24–25) and Panteo's plate; if they bear the
   reports out, raise the standing of the de Balmes claims to documented and
   drop the hedges.

6. **Page numbers taken from Peterson and Wikipedia.**
   Where: Duret's Scriptura Celestis at p. 119 (`celestial.js`, `the-books.js`);
   Fry's Alphabet of the Magi at pp. 28–29 (`the-books.js`).
   What: both are given as their sources report them, not as read.
   Fix: read Duret (Internet Archive fre_b1886963) at p. 119 and a copy of
   Fry's Pantographia; give the page as read, or drop it.

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

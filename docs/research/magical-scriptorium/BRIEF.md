# The Magical Scriptorium — research brief

Three Magi Press (threemagipress.com) publishes esoteric history with a
scholar's discipline: claims are kept apart from the documentary record
throughout. Its Scriptorium (`/third-lamp/education`) is a set of halls for
sacred languages — Hebrew, Greek, Coptic, Syriac, Phoenician, cuneiform,
Egyptian, the Greek Magical Papyri (`pgm`) and others, each with a script
table, words, texts and a course.

The owner wants a new wing: **the Magical Scriptorium** — the magical and
secret alphabets, "using things like Agrippa as references, and/or more". It
will hold one page per alphabet (history, sources, a full letter table drawn
as vector glyphs, how it was used), a lineage of the books that carried the
alphabets from hand to hand, a side-by-side comparison of the alphabets
built on the Hebrew letters, and a transliterator.

## House rules (they bind every word you return)
- A quotation must name its translation (translator and edition), or be
  given in the original with your own clearly-labelled paraphrase.
- Legend and attribution are reported as such: "Trithemius ascribes it to
  Honorius of Thebes" — never "Honorius of Thebes invented it".
- Every date, edition, chapter and folio you give must be one you found in a
  source you can name. If two sources disagree, say so and give both.
- Prefer primary sources (the printed book, the manuscript shelfmark) and
  serious scholarship (e.g. Vittoria Perrone Compagni's critical edition of
  Agrippa, 1992; Joseph H. Peterson's editions at esotericarchives.com;
  Deborah Harkness on Dee; Stephen Skinner; Gideon Bohak on Jewish magic;
  Richard Gordon and Joseph Sanzo on charaktêres; Rylands Library posts;
  Owen Davies, *Grimoires*; Frank Klaassen) over hobby sites. Omniglot and
  dCode are acceptable only for the letter list, never for history.
- No tradition is mocked; none is endorsed. Living organisations' emblems
  and texts are not reproduced.

## Tools
You have WebSearch (use mode "extended" for anything hard to find; the
results carry snippets and URLs). Direct page fetching is NOT available in
this environment and images cannot be downloaded — work from search results
and what you know, and mark which claims rest on which. Never invent a URL.

## The letter forms
For an alphabet the site will DRAW (it has no Unicode encoding), describe
each letter's form as printed in the named source, stroke by stroke, precisely
enough that an illustrator who has never seen it could draw it: the strokes
(straight / curved, direction), where the small circles ("ring-ends",
*Brillen*) sit, crossings, closed loops, relative proportions. Say where
editions differ. Where you are unsure of a form, say so — a wrong drawing
presented as Agrippa's is worse than a gap.

## Output
Write your full result as JSON to the path you are given, and return the same
object. Shape:

```
{
  "key": "…", "title": "…", "otherNames": [], "family": "…",
  "summary": "2–4 sentences, plain and exact",
  "firstAttestation": {"work": "", "author": "", "date": "", "place": "", "locator": "book/chapter/folio/page", "notes": ""},
  "transmission": [{"date": "", "work": "", "author": "", "what": "what this book did with the alphabet"}],
  "claims": [{"claim": "", "standing": "documented|attributed|disputed|legend", "evidence": "", "sources": ["…"]}],
  "letters": [{"order": 1, "name": "", "value": "Hebrew letter or Latin letter it stands for", "translit": "", "numeric": null, "form": "stroke-by-stroke description", "formConfidence": "high|medium|low", "note": ""}],
  "lettersSource": "which edition/plate the table follows",
  "uses": [{"use": "", "evidence": ""}],
  "quotations": [{"text": "", "translation": "translator, edition", "source": "author, work, locator"}],
  "links": [{"to": "another item key, or a Scriptorium hall: hebrew|greek|coptic|phoenician|pgm|latin|syriac|arabic", "relation": ""}],
  "cautions": [""],
  "sources": [{"citation": "", "url": ""}],
  "confidence": "what is solid, what is shaky"
}
```
For items that are not a single alphabet (the books, the squares, the signs),
use `letters` for the units the page will show (the squares, the signs, the
books) and say so in `lettersSource`.

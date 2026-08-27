import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, Navigate } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import latin from '../data/education/latin';
import greek from '../data/education/greek';
import hebrew from '../data/education/hebrew';
import egyptian from '../data/education/egyptian';
import cuneiform from '../data/education/cuneiform';
import sanskrit from '../data/education/sanskrit';
import arabic from '../data/education/arabic';
import tibetan from '../data/education/tibetan';
import syriac from '../data/education/syriac';
import coptic from '../data/education/coptic';
import aramaic from '../data/education/aramaic';
import persian from '../data/education/persian';
import armenian from '../data/education/armenian';
import geez from '../data/education/geez';
import extLatin from '../data/education/ext/latin';
import extGreek from '../data/education/ext/greek';
import extHebrew from '../data/education/ext/hebrew';
import extEgyptian from '../data/education/ext/egyptian';
import extCuneiform from '../data/education/ext/cuneiform';
import extSanskrit from '../data/education/ext/sanskrit';
import extArabic from '../data/education/ext/arabic';
import extTibetan from '../data/education/ext/tibetan';
import extSyriac from '../data/education/ext/syriac';
import extCoptic from '../data/education/ext/coptic';
import extAramaic from '../data/education/ext/aramaic';
import extPersian from '../data/education/ext/persian';
import extArmenian from '../data/education/ext/armenian';
import extGeez from '../data/education/ext/geez';
import corpusLatin from '../data/education/corpus/latin';
import corpusHebrew from '../data/education/corpus/hebrew';
import corpusCuneiform from '../data/education/corpus/cuneiform';
import corpusSanskrit from '../data/education/corpus/sanskrit';
import corpusArabic from '../data/education/corpus/arabic';
import corpusTibetan from '../data/education/corpus/tibetan';
import corpusSyriac from '../data/education/corpus/syriac';
import corpusCoptic from '../data/education/corpus/coptic';
import corpusAramaic from '../data/education/corpus/aramaic';
import corpusPersian from '../data/education/corpus/persian';
import corpusArmenian from '../data/education/corpus/armenian';
import corpusGeez from '../data/education/corpus/geez';
import pgm from '../data/education/pgm';
import themesEgyptian from '../data/education/themes/egyptian';
import themesCuneiform from '../data/education/themes/cuneiform';
import themesTibetan from '../data/education/themes/tibetan';
import themesSyriac from '../data/education/themes/syriac';
import themesCoptic from '../data/education/themes/coptic';
import themesAramaic from '../data/education/themes/aramaic';
import themesPersian from '../data/education/themes/persian';
import themesArmenian from '../data/education/themes/armenian';
import themesGeez from '../data/education/themes/geez';
import tlLatin from '../data/education/timelines/latin';
import tlGreek from '../data/education/timelines/greek';
import tlHebrew from '../data/education/timelines/hebrew';
import tlEgyptian from '../data/education/timelines/egyptian';
import tlCuneiform from '../data/education/timelines/cuneiform';
import tlSanskrit from '../data/education/timelines/sanskrit';
import tlArabic from '../data/education/timelines/arabic';
import tlTibetan from '../data/education/timelines/tibetan';
import tlSyriac from '../data/education/timelines/syriac';
import tlCoptic from '../data/education/timelines/coptic';
import tlAramaic from '../data/education/timelines/aramaic';
import tlPersian from '../data/education/timelines/persian';
import tlArmenian from '../data/education/timelines/armenian';
import tlGeez from '../data/education/timelines/geez';
import ScriptoriumCorpus from '../components/ScriptoriumCorpus';
import ScriptoriumTimeline from '../components/ScriptoriumTimeline';
import ScriptoriumCurrents from '../components/ScriptoriumCurrents';
import ScriptoriumReckoner from '../components/ScriptoriumReckoner';
import ScriptoriumDrill from '../components/ScriptoriumDrill';
import { HALLS } from './EducationPortalPage';

const DATA = { latin, greek, hebrew, egyptian, cuneiform, sanskrit, arabic, tibetan, syriac, coptic, aramaic, persian, armenian, geez };
const EXT = { latin: extLatin, greek: extGreek, hebrew: extHebrew, egyptian: extEgyptian, cuneiform: extCuneiform, sanskrit: extSanskrit, arabic: extArabic, tibetan: extTibetan, syriac: extSyriac, coptic: extCoptic, aramaic: extAramaic, persian: extPersian, armenian: extArmenian, geez: extGeez };
const CORPUS = { latin: corpusLatin, hebrew: corpusHebrew, cuneiform: corpusCuneiform, sanskrit: corpusSanskrit, arabic: corpusArabic, tibetan: corpusTibetan, syriac: corpusSyriac, coptic: corpusCoptic, aramaic: corpusAramaic, persian: corpusPersian, armenian: corpusArmenian, geez: corpusGeez };
const TIMELINES = { latin: tlLatin, greek: tlGreek, hebrew: tlHebrew, egyptian: tlEgyptian, cuneiform: tlCuneiform, sanskrit: tlSanskrit, arabic: tlArabic, tibetan: tlTibetan, syriac: tlSyriac, coptic: tlCoptic, aramaic: tlAramaic, persian: tlPersian, armenian: tlArmenian, geez: tlGeez };
const THEMES = { egyptian: themesEgyptian, cuneiform: themesCuneiform, tibetan: themesTibetan, syriac: themesSyriac, coptic: themesCoptic, aramaic: themesAramaic, persian: themesPersian, armenian: themesArmenian, geez: themesGeez };
// Each corpus is titled for what it actually is, not generically shelved.
const CORPUS_COPY = {
    latin: { kicker: 'The Shelf', heading: 'Theatrum Chemicum' },
    hebrew: { kicker: 'The Shelf', heading: 'The Kabbalistic Library' },
    cuneiform: { kicker: 'The Shelf', heading: 'The Tablets' },
    sanskrit: { kicker: 'The Shelf', heading: 'Śruti and Śāstra' },
    arabic: { kicker: 'The Shelf', heading: 'The Islamic Esoteric Library' },
    tibetan: { kicker: 'The Shelf', heading: 'The Kangyur and Beyond' },
    syriac: { kicker: 'The Shelf', heading: 'The Syriac Shelf' },
    coptic: { kicker: 'The Shelf', heading: 'The Coptic Library' },
    aramaic: { kicker: 'The Shelf', heading: 'Bowls and Scriptures' },
    persian: { kicker: 'The Shelf', heading: 'The Persian Shelf' },
    armenian: { kicker: 'The Shelf', heading: 'The Armenian Shelf' },
    geez: { kicker: 'The Shelf', heading: 'The Ethiopic Canon' },
};
const TITLES = { latin: 'Latin', greek: 'Greek', hebrew: 'Hebrew', egyptian: 'Egyptian', cuneiform: 'Cuneiform', sanskrit: 'Sanskrit', arabic: 'Arabic', tibetan: 'Tibetan', syriac: 'Syriac', coptic: 'Coptic', aramaic: 'Aramaic', persian: 'Persian', armenian: 'Armenian', geez: 'Geʼez' };

const DOMAIN_LABEL = (d) => d.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// Course banner copy per hall; the destination page carries the full syllabus.
const COURSE_LINES = {
    latin: { title: "An Alchemist's Latin", capstone: 'read the Emerald Tablet in its own tongue' },
    greek: { title: 'Reading the Mysteries', capstone: 'read the opening of John and the ouroboros motto' },
    hebrew: { title: 'The Letters of Creation', capstone: 'read the Shema and the first mishnah of Sefer Yetzirah' },
    egyptian: { title: "The Scribe's First Year", capstone: 'read a complete offering formula' },
};

function EducationLanguagePage() {
    const { lang } = useParams();
    const data = DATA[lang];
    const [selected, setSelected] = useState(0);
    const [query, setQuery] = useState('');

    const rtl = ['hebrew', 'arabic', 'syriac', 'aramaic', 'persian'].includes(lang);

    const lexicon = useMemo(() => {
        if (!data) return [];
        const q = query.trim().toLowerCase();
        if (!q) return data.lexicon;
        return data.lexicon.filter((e) =>
            [e.native, e.translit, e.english, e.definition, e.domain]
                .filter(Boolean)
                .some((s) => s.toLowerCase().includes(q))
        );
    }, [data, query]);

    if (!data) return <Navigate to="/third-lamp/education" replace />;

    const hall = HALLS.find((h) => h.slug === lang);
    const letter = data.letters[selected] || null;
    const ext = EXT[lang];
    // Correspondence entries key by letter name ('Aleph'), glyph-plus-name
    // ('Α (Alpha)'), or bare glyph ('I') depending on the hall — normalise to
    // the plain name, falling back to a glyph match against the alphabet.
    const corr = ext.correspondences
        ? new Map(ext.correspondences.entries.map((e) => {
            const paren = e.letter.match(/\(([^)]+)\)/);
            let key = paren ? paren[1] : e.letter;
            if (!data.letters.some((l) => l.name === key)) {
                const byGlyph = data.letters.find((l) => l.glyph.split(/\s+/).includes(e.letter));
                if (byGlyph) key = byGlyph.name;
            }
            return [key, e.correspondence];
        }))
        : null;
    const corpus = CORPUS[lang] && CORPUS[lang].works.length > 0 ? CORPUS[lang] : null;
    const currents = THEMES[lang] && THEMES[lang].themes.length > 0 ? THEMES[lang] : null;
    const timeline = TIMELINES[lang] && TIMELINES[lang].events.length > 0 ? TIMELINES[lang] : null;
    const hasPgm = lang === 'greek' && pgm.items.length > 0;
    const sections = [
        { id: 'edu-alphabet-heading', label: 'Alphabet' },
        ext.numbers && { id: 'edu-numbers-heading', label: 'Numbers' },
        { id: 'edu-reckoner-heading', label: 'Reckoner' },
        ext.readings.length > 0 && { id: 'edu-readings-heading', label: 'Readings' },
        hasPgm && { id: 'edu-pgm-heading', label: 'Magical Papyri' },
        currents && { id: 'edu-currents-heading', label: 'The Currents' },
        timeline && { id: 'edu-timeline-heading', label: 'Timeline' },
        corpus && { id: `edu-corpus-${lang}-heading`, label: CORPUS_COPY[lang].heading },
        { id: 'edu-names-heading', label: 'Divine Names' },
        { id: 'edu-lexicon-heading', label: 'Lexicon' },
        { id: 'edu-drill-heading', label: 'Recitation' },
    ].filter(Boolean);

    return (
        <div className="third-lamp-scope edu-page edu-lang-page" data-hall={lang}>
            <Helmet>
                <title>{`${TITLES[lang]} — The Scriptorium — The Third Lamp`}</title>
                <meta name="description" content={`The ${TITLES[lang]} hall of The Third Lamp's Scriptorium: the alphabet displayed in full, the divine names, and a working lexicon.`} />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero edu-lang-hero">
                    <p className="kicker">
                        <Link to="/third-lamp/education">The Scriptorium</Link> · Language Hall
                    </p>
                    <h1>{TITLES[lang]}</h1>
                    {hall && <p className="edu-lang-hero-sample edu-glyph" dir={rtl ? 'rtl' : undefined}>{hall.sample}</p>}
                    {data.intro && <p className="edu-hero-sub">{data.intro}</p>}
                    <nav className="edu-section-nav" aria-label="Sections of this hall">
                        {sections.map((sec) => (
                            <a key={sec.id} href={`#${sec.id}`}>{sec.label}</a>
                        ))}
                    </nav>
                </section>

                {COURSE_LINES[lang] && (
                <Link className="edu-course-banner" to={`/third-lamp/education/${lang}/course`}>
                    <span className="edu-course-banner-kicker">The Course</span>
                    <span className="edu-course-banner-title">{COURSE_LINES[lang].title}</span>
                    <span className="edu-course-banner-line">Eight lessons, from first letters until you {COURSE_LINES[lang].capstone}.</span>
                    <span className="edu-course-banner-enter">Enter →</span>
                </Link>
                )}

                <section className="edu-alphabet" aria-labelledby="edu-alphabet-heading">
                    <header className="edu-section-head">
                        <p className="kicker">First Things</p>
                        <h2 id="edu-alphabet-heading">The Alphabet</h2>
                        {data.scriptNote && <p>{data.scriptNote}</p>}
                    </header>

                    <div className="edu-letter-grid" role="listbox" aria-label={`${TITLES[lang]} letters`} aria-activedescendant={letter ? `edu-letter-${selected}` : undefined}>
                        {data.letters.map((l, i) => (
                            <button
                                type="button"
                                key={`${l.name}-${i}`}
                                id={`edu-letter-${i}`}
                                role="option"
                                aria-selected={selected === i}
                                className={`edu-letter-card${selected === i ? ' is-selected' : ''}${l.archaic ? ' is-archaic' : ''}`}
                                onClick={() => setSelected(i)}
                            >
                                <span className="edu-letter-glyph edu-glyph" dir={rtl ? 'rtl' : undefined}>{l.glyph}</span>
                                <span className="edu-letter-name">{l.name}</span>
                                <span className="edu-letter-translit">{l.translit}</span>
                            </button>
                        ))}
                    </div>

                    {letter && (
                        <aside className="edu-letter-plaque" aria-live="polite">
                            <div className="edu-plaque-glyph edu-glyph" dir={rtl ? 'rtl' : undefined} aria-hidden="true">
                                {letter.glyph}{letter.final ? <span className="edu-plaque-final"> {letter.final}</span> : null}
                            </div>
                            <div className="edu-plaque-body">
                                <h3>
                                    {letter.name}
                                    {letter.archaic ? <span className="edu-plaque-badge">archaic numeral</span> : null}
                                </h3>
                                <dl>
                                    <div><dt>Transliteration</dt><dd>{letter.translit}</dd></div>
                                    <div><dt>Pronunciation</dt><dd>{letter.pronunciation}</dd></div>
                                    {letter.value != null && <div><dt>Number</dt><dd>{letter.value}</dd></div>}
                                    {letter.meaning && <div><dt>{lang === 'egyptian' ? 'Sign' : 'Origin'}</dt><dd>{letter.meaning}</dd></div>}
                                    {letter.final && <div><dt>Final form</dt><dd className="edu-glyph" dir="rtl">{letter.final}</dd></div>}
                                    {corr && corr.has(letter.name) && <div><dt>Correspondence</dt><dd>{corr.get(letter.name)}</dd></div>}
                                </dl>
                                <p className="edu-plaque-note">{letter.note}</p>
                            </div>
                        </aside>
                    )}
                    {ext.correspondences && (
                        <p className="edu-corr-note">{ext.correspondences.note}</p>
                    )}
                </section>

                {ext.numbers && (
                    <section className="edu-numbers" aria-labelledby="edu-numbers-heading">
                        <header className="edu-section-head">
                            <p className="kicker">Counting</p>
                            <h2 id="edu-numbers-heading">Numbers</h2>
                            <p>{ext.numbers.note}</p>
                        </header>
                        <div className="edu-digit-grid">
                            {ext.numbers.digits.map((d, i) => (
                                <div className="edu-digit-card" key={`${d.glyph}-${i}`}>
                                    <span className="edu-digit-glyph edu-glyph">{d.glyph}</span>
                                    <span className="edu-digit-value">{d.value.toLocaleString()}</span>
                                    {d.name && <span className="edu-digit-name">{d.name}</span>}
                                </div>
                            ))}
                        </div>
                        <ul className="edu-num-examples">
                            {ext.numbers.examples.map((ex, i) => (
                                <li key={i}>
                                    <span className="edu-num-native edu-glyph" dir={rtl ? 'rtl' : undefined}>{ex.native}</span>
                                    <span className="edu-num-eq">= {ex.value.toLocaleString()}</span>
                                    <span className="edu-num-note">{ex.note}</span>
                                </li>
                            ))}
                        </ul>
                        {ext.numbers.special && <p className="edu-num-special">{ext.numbers.special}</p>}
                    </section>
                )}

                <ScriptoriumReckoner lang={lang} letters={data.letters} numbers={ext.numbers} />

                {ext.readings.length > 0 && (
                    <section className="edu-readings" aria-labelledby="edu-readings-heading">
                        <header className="edu-section-head">
                            <p className="kicker">First Readings</p>
                            <h2 id="edu-readings-heading">Texts worth memorising</h2>
                            <p>Real inscriptions and verses, glossed word by word — the shortest road from alphabet to reading.</p>
                        </header>
                        <div className="edu-reading-list">
                            {ext.readings.map((r) => (
                                <article className="edu-reading" key={r.title}>
                                    <h3>{r.title}</h3>
                                    <p className="edu-reading-source">{r.source}</p>
                                    {r.grid ? (
                                        <div className="edu-reading-grid edu-glyph" role="img" aria-label={`${r.title} letter square`}>
                                            {r.grid.map((row) => <span key={row}>{row}</span>)}
                                        </div>
                                    ) : null}
                                    <div className="edu-reading-words" dir={rtl ? 'rtl' : undefined}>
                                        {r.words.map((w, i) => (
                                            <span className="edu-reading-word" key={i}>
                                                <span className="edu-reading-native edu-glyph">{w.native}</span>
                                                {/* glosses are English even in an RTL hall */}
                                                <span className="edu-reading-translit" dir="ltr">{w.translit}</span>
                                                <span className="edu-reading-gloss" dir="ltr">{w.gloss}</span>
                                            </span>
                                        ))}
                                    </div>
                                    <p className="edu-reading-translation">“{r.translation}”</p>
                                    <p className="edu-reading-note">{r.note}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {hasPgm && (
                    <section className="edu-pgm" aria-labelledby="edu-pgm-heading">
                        <header className="edu-section-head">
                            <p className="kicker">Greco-Egyptian Ritual</p>
                            <h2 id="edu-pgm-heading">The Magical Papyri</h2>
                            {pgm.note && <p>{pgm.note}</p>}
                        </header>
                        <div className="edu-reading-list">
                            {pgm.items.map((r) => (
                                <article className="edu-reading" key={r.title}>
                                    <h3>{r.title}</h3>
                                    <p className="edu-reading-source">{r.source}</p>
                                    <div className="edu-reading-words">
                                        {r.words.map((w, i) => (
                                            <span className="edu-reading-word" key={i}>
                                                <span className="edu-reading-native edu-glyph">{w.native}</span>
                                                <span className="edu-reading-translit" dir="ltr">{w.translit}</span>
                                                <span className="edu-reading-gloss" dir="ltr">{w.gloss}</span>
                                            </span>
                                        ))}
                                    </div>
                                    <p className="edu-reading-translation">“{r.translation}”</p>
                                    <p className="edu-reading-note">{r.note}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {timeline && <ScriptoriumTimeline timeline={timeline} rtl={rtl} />}

                {currents && (
                    <ScriptoriumCurrents currents={currents} rtl={rtl} hallId={`edu-${lang}`} />
                )}

                {corpus && (
                    <ScriptoriumCorpus
                        corpus={corpus}
                        kicker={CORPUS_COPY[lang].kicker}
                        heading={CORPUS_COPY[lang].heading}
                        corpusId={`edu-corpus-${lang}`}
                        rtl={rtl}
                    />
                )}

                <section className="edu-names" aria-labelledby="edu-names-heading">
                    <header className="edu-section-head">
                        <p className="kicker">What Was Written First</p>
                        <h2 id="edu-names-heading">Divine Names</h2>
                    </header>
                    <ol className="edu-name-list">
                        {data.divineNames.map((n) => (
                            <li className="edu-name-row" key={n.translit}>
                                <div className="edu-name-native edu-glyph" dir={rtl ? 'rtl' : undefined} lang={rtl ? ({ arabic: 'ar', persian: 'fa', syriac: 'syc', aramaic: 'arc' }[lang] || 'he') : undefined}>{n.native}</div>
                                <div className="edu-name-body">
                                    <h3>
                                        {n.translit}
                                        {n.english && n.english !== n.translit ? <span className="edu-name-english"> · {n.english}</span> : null}
                                        {n.value != null && <span className="edu-name-value" title={lang === 'greek' ? 'isopsephy' : 'gematria'}>{n.value}</span>}
                                    </h3>
                                    <p className="edu-name-meaning">{n.meaning}</p>
                                    {n.proposals && n.proposals.length > 0 && (
                                        <details className="edu-proposals">
                                            <summary>{n.proposals.length} proposed readings</summary>
                                            {n.proposalsNote && <p className="edu-proposals-note">{n.proposalsNote}</p>}
                                            <ol className="edu-proposal-list">
                                                {n.proposals.map((pr, pi) => (
                                                    <li key={pi}>
                                                        <span className="edu-proposal-reading">{pr.reading}</span>
                                                        <span className="edu-proposal-basis">{pr.basis}</span>
                                                        <span className="edu-proposal-standing">{pr.standing}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </details>
                                    )}
                                    <p className="edu-name-note">{n.context}{n.note ? ` — ${n.note}` : ''}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="edu-lexicon" aria-labelledby="edu-lexicon-heading">
                    <header className="edu-section-head">
                        <p className="kicker">A Working Vocabulary</p>
                        <h2 id="edu-lexicon-heading">Lexicon</h2>
                    </header>
                    <div className="edu-lexicon-search">
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={`Search the ${TITLES[lang]} lexicon…`}
                            aria-label={`Search the ${TITLES[lang]} lexicon`}
                        />
                        <span className="edu-lexicon-count">{lexicon.length} / {data.lexicon.length}</span>
                    </div>
                    <ul className="edu-lex-list">
                        {lexicon.map((e) => (
                            <li className="edu-lex-row" key={`${e.translit}-${e.english}`}>
                                <div className="edu-lex-term">
                                    <span className="edu-lex-native edu-glyph" dir={rtl ? 'rtl' : undefined} lang={rtl ? ({ arabic: 'ar', persian: 'fa', syriac: 'syc', aramaic: 'arc' }[lang] || 'he') : undefined}>{e.native}</span>
                                    <span className="edu-lex-translit">{e.translit}</span>
                                </div>
                                <div className="edu-lex-def">
                                    <p>{e.definition}</p>
                                    <span className="edu-lex-domain">{DOMAIN_LABEL(e.domain)}</span>
                                </div>
                            </li>
                        ))}
                        {lexicon.length === 0 && <li className="edu-lex-empty">Nothing in this hall answers to “{query}”.</li>}
                    </ul>
                </section>

                <ScriptoriumDrill letters={data.letters} langTitle={TITLES[lang]} rtl={rtl} />

                <nav className="edu-hall-nav" aria-label="Other language halls">
                    {HALLS.filter((h) => h.slug !== lang).map((h) => (
                        <Link key={h.slug} to={`/third-lamp/education/${h.slug}`} onClick={() => { setSelected(0); setQuery(''); }}>
                            <span className="edu-glyph" aria-hidden="true">{h.glyph}</span> {h.name}
                        </Link>
                    ))}
                </nav>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default EducationLanguagePage;

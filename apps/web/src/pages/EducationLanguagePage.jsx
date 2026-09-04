import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, Navigate } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import ScriptoriumCorpus from '../components/ScriptoriumCorpus';
import ScriptoriumTimeline from '../components/ScriptoriumTimeline';
import ScriptoriumCurrents from '../components/ScriptoriumCurrents';
import ScriptoriumReckoner from '../components/ScriptoriumReckoner';
import ScriptoriumDrill from '../components/ScriptoriumDrill';
import { HALLS } from './EducationPortalPage';

// Every hall's data is its own chunk, loaded when the hall is entered.
// Sixteen halls of scholarship had grown to a 2.2MB page chunk when imported
// eagerly; a reader opening one hall now downloads that hall alone. The glob
// keys are literal so Vite can split them at build time.
const LOAD = {
    data: import.meta.glob('../data/education/*.js'),
    ext: import.meta.glob('../data/education/ext/*.js'),
    themes: import.meta.glob('../data/education/themes/*.js'),
    corpus: import.meta.glob('../data/education/corpus/*.js'),
    timelines: import.meta.glob('../data/education/timelines/*.js'),
};
const pick = async (kind, name) => {
    const key = kind === 'data'
        ? `../data/education/${name}.js`
        : `../data/education/${kind === 'timelines' ? 'timelines' : kind}/${name}.js`;
    const mod = LOAD[kind][key];
    return mod ? (await mod()).default : null;
};
// The empty shapes a hall falls back to while a module is absent.
const EMPTY = {
    ext: { numbers: null, readings: [], correspondences: null },
    themes: { note: null, themes: [] },
    corpus: { note: null, works: [] },
    timelines: { note: null, events: [] },
};
async function loadHall(lang) {
    const [data, ext, themes, corpus, timeline, pgmData] = await Promise.all([
        pick('data', lang),
        pick('ext', lang),
        pick('themes', lang),
        pick('corpus', lang),
        pick('timelines', lang),
        lang === 'greek' ? pick('data', 'pgm') : Promise.resolve(null),
    ]);
    return {
        data,
        ext: ext || EMPTY.ext,
        themes: themes || EMPTY.themes,
        corpus: corpus || EMPTY.corpus,
        timeline: timeline || EMPTY.timelines,
        pgm: pgmData || { note: null, items: [] },
    };
}
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
    chinese: { kicker: 'The Shelf', heading: 'The Daoist Canon' },
    slavonic: { kicker: 'The Shelf', heading: 'The Slavic Shelf' },
};
const TITLES = { latin: 'Latin', greek: 'Greek', hebrew: 'Hebrew', egyptian: 'Egyptian', cuneiform: 'Cuneiform', sanskrit: 'Sanskrit', arabic: 'Arabic', tibetan: 'Tibetan', syriac: 'Syriac', coptic: 'Coptic', aramaic: 'Aramaic', persian: 'Persian', armenian: 'Armenian', geez: 'Geʼez', chinese: 'Classical Chinese', slavonic: 'Church Slavonic' };

const DOMAIN_LABEL = (d) => d.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// Course banner copy per hall; the destination page carries the full syllabus.
const COURSE_LINES = {
    latin: { title: "An Alchemist's Latin", capstone: 'read the Emerald Tablet in its own tongue' },
    greek: { title: 'Reading the Mysteries', capstone: 'read the opening of John and the ouroboros motto' },
    hebrew: { title: 'The Letters of Creation', capstone: 'read the Shema and the first mishnah of Sefer Yetzirah' },
    egyptian: { title: "The Scribe's First Year", capstone: 'read a complete offering formula' },
    cuneiform: { title: 'Before the Alphabet', capstone: "read the opening of the Babylonian creation epic, and take the square root of two off a tablet of 1800 BC" },
    sanskrit: { title: 'The Perfected Tongue', capstone: 'read the Gāyatrī in its own script, every word accounted for' },
    syriac: { title: 'Fire in the Letters', capstone: 'read Ephrem on Fire and Spirit, and date a manuscript from its own colophon' },
    arabic: { title: 'The Greatest Name', capstone: 'read the Light Verse and reckon the Basmala at 786' },
};

function EducationLanguagePage() {
    const { lang } = useParams();
    const [bundle, setBundle] = useState(null);
    const [selected, setSelected] = useState(0);
    const [query, setQuery] = useState('');

    useEffect(() => {
        let alive = true;
        setBundle(null);
        // A hall change also resets the letter plaque and the lexicon search,
        // which used to leak from hall to hall.
        setSelected(0);
        setQuery('');
        if (TITLES[lang]) loadHall(lang).then((b) => { if (alive) setBundle(b); });
        return () => { alive = false; };
    }, [lang]);

    const data = bundle?.data;

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

    if (!TITLES[lang]) return <Navigate to="/third-lamp/education" replace />;
    if (!data) return <div className="third-lamp-scope edu-page" aria-busy="true" style={{ minHeight: '100vh' }} />;

    const hall = HALLS.find((h) => h.slug === lang);
    const letter = data.letters[selected] || null;
    const ext = bundle.ext;
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
    const corpus = bundle.corpus.works.length > 0 ? bundle.corpus : null;
    const currents = bundle.themes.themes.length > 0 ? bundle.themes : null;
    const timeline = bundle.timeline.events.length > 0 ? bundle.timeline : null;
    const hasPgm = lang === 'greek' && bundle.pgm.items.length > 0;
    const sections = [
        data.letters.length > 0 && { id: 'edu-alphabet-heading', label: 'Alphabet' },
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

            {data.hero && (
                <div className="ch-hero-figure edu-hall-banner" role="img"
                    aria-label={data.heroAlt || `${TITLES[lang]} hall`}>
                    <img src={`/media/${data.hero}`} alt="" loading="eager" decoding="async" />
                    <span className="ch-hero-scrim" />
                </div>
            )}

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

                {data.letters.length > 0 && (
                <section className="edu-alphabet" aria-labelledby="edu-alphabet-heading">
                    <header className="edu-section-head">
                        <p className="kicker">First Things</p>
                        <h2 id="edu-alphabet-heading">The Alphabet</h2>
                        {data.scriptNote && <p>{data.scriptNote}</p>}
                    </header>

                    <div
                        className="edu-letter-grid"
                        role="listbox"
                        aria-label={`${TITLES[lang]} letters`}
                        aria-activedescendant={letter ? `edu-letter-${selected}` : undefined}
                        onKeyDown={(e) => {
                            // Arrows walk the alphabet; Home and End jump to its ends.
                            // RTL halls read right to left, so the arrows follow the script.
                            const last = data.letters.length - 1;
                            const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowDown: 1, ArrowUp: -1 }[e.key];
                            let next = null;
                            if (step != null) next = Math.min(last, Math.max(0, selected + step));
                            else if (e.key === 'Home') next = 0;
                            else if (e.key === 'End') next = last;
                            if (next == null || next === selected) return;
                            e.preventDefault();
                            setSelected(next);
                            document.getElementById(`edu-letter-${next}`)?.focus();
                        }}
                    >
                        {data.letters.map((l, i) => (
                            <button
                                type="button"
                                key={`${l.name}-${i}`}
                                id={`edu-letter-${i}`}
                                role="option"
                                aria-selected={selected === i}
                                tabIndex={selected === i ? 0 : -1}
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
                                    {letter.alt && <div><dt>{letter.altLabel || 'Other script'}</dt><dd className="edu-glyph">{letter.alt}</dd></div>}
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
                )}

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
                                    {/* Integers get thousands separators; fractional values keep
                                        their precision, since a sexagesimal approximation of a root
                                        is worth nothing rounded to three places. */}
                                    <span className="edu-num-eq">= {Number.isInteger(ex.value)
                                        ? ex.value.toLocaleString()
                                        : ex.value.toLocaleString(undefined, { maximumFractionDigits: 10 })}</span>
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
                            {bundle.pgm.note && <p>{bundle.pgm.note}</p>}
                        </header>
                        <div className="edu-reading-list">
                            {bundle.pgm.items.map((r) => (
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
                {data.gallery && (
                    <section className="ch-gallery" aria-labelledby="edu-hall-gallery-heading">
                        <header className="edu-section-head">
                            <p className="kicker">{data.gallery.kicker}</p>
                            <h2 id="edu-hall-gallery-heading">{data.gallery.title}</h2>
                            <p>{data.gallery.intro}</p>
                        </header>
                        <div className="ch-gallery-grid">
                            {data.gallery.images.map((g) => (
                                <figure className="ch-gallery-card" key={g.file}>
                                    <img src={`/media/${g.file}`} alt={g.alt}
                                        loading="lazy" decoding="async" />
                                    <figcaption className="ch-gallery-caption">
                                        <strong>{g.title}</strong>
                                        <span>{g.caption}</span>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default EducationLanguagePage;

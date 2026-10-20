import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThirdLampHeader from '../../components/ThirdLampHeader';
import ThirdLampFooter from '../../components/ThirdLampFooter';
import ScriptoriumTimeline from '../../components/ScriptoriumTimeline';
import ScriptoriumDrill from '../../components/ScriptoriumDrill';
import MagicGlyph, { Sign, Unstruck } from './MagicGlyph';
import { LetterGrid, PendingLedger } from './Letters';
import { ALPHABETS, ENTRIES, ENTRY_BY_SLUG, MAGIC_PATH, STANDINGS, WING, entryPath, fitStyle, loadEntry, textOf } from './lib';
import '../../styles/magic.css';

// One page per entry of the Magical Scriptorium, in the idiom of a language
// hall: the hero with its section menu, the letters (a grid and plaque when
// the forms can be shown, a ledger when they are being traced), how the signs
// are set or drawn and from what, the first witness, the books that carried
// it, the claims with their standing, its uses, the passages in their own
// words with whose translation they are, the cautions and the sources.
// A stub shows its summary and sources and says that the page is coming.

const HALL_TITLES = {
    latin: 'Latin', greek: 'Greek', hebrew: 'Hebrew', phoenician: 'Phoenician', pgm: 'The Magical Papyri',
    arabic: 'Arabic', syriac: 'Syriac', coptic: 'Coptic', aramaic: 'Aramaic', egyptian: 'Egyptian',
};
const linkTarget = (to) => (to === 'pgm' ? '/third-lamp/education/greek#edu-pgm-heading'
    : ENTRY_BY_SLUG[to] ? entryPath(to) : `/third-lamp/education/${to}`);
const linkTitle = (to) => ENTRY_BY_SLUG[to]?.title || HALL_TITLES[to] || to;

function SectionHead({ kicker, id, title, children }) {
    return (
        <header className="edu-section-head">
            <p className="kicker">{kicker}</p>
            <h2 id={id}>{title}</h2>
            {children}
        </header>
    );
}

function MagicAlphabetPage() {
    const { alphabet } = useParams();
    const entry = ENTRY_BY_SLUG[alphabet];
    const reg = ALPHABETS.find((a) => a.slug === alphabet) || null;
    const [mod, setMod] = useState(null);
    const [keys, setKeys] = useState(null);

    useEffect(() => {
        let alive = true;
        setMod(null);
        if (entry) loadEntry(alphabet).then((m) => { if (alive) setMod(m); });
        return () => { alive = false; };
    }, [alphabet, entry]);

    // The hall keys (letter, number, place) come from the generated data,
    // derived from the Hebrew and Latin halls, so no number is stored twice.
    const keyed = reg && reg.keyedTo !== 'none' && mod && (mod.letters || []).length > 0;
    useEffect(() => {
        let alive = true;
        if (keyed && !keys) import('../../data/education/magic/compare.generated.js').then((m) => { if (alive) setKeys(m.default.keys); });
        return () => { alive = false; };
    }, [keyed, keys]);

    const letters = useMemo(() => mod?.letters || [], [mod]);
    const shown = useMemo(() => letters.filter((l) => l.glyph || l.char), [letters]);
    const drillLetters = useMemo(() => shown.map((l) => ({
        ...l,
        glyph: l.char ? textOf(l.char) : <MagicGlyph g={l.glyph} />,
        translit: l.translit || l.planet || '',
        value: reg && reg.keyedTo !== 'none' ? l.value : (mod?.valueLabel ? l.value : null),
    })), [shown, reg, mod]);

    if (!entry) return <Navigate to={MAGIC_PATH} replace />;
    if (!mod || (keyed && !keys)) return <div className="third-lamp-scope edu-page mg-page" aria-busy="true" style={{ minHeight: '100vh' }} />;

    const keyedTo = reg ? reg.keyedTo : 'none';
    const direction = reg ? reg.direction : 'ltr';
    const pending = entry.status === 'forms-pending';
    const stub = Boolean(mod.stub);
    const anyDrawn = letters.some((l) => l.glyph);
    const anySet = letters.some((l) => l.char);
    const lettersTitle = mod.lettersTitle || 'The Alphabet';
    const drawingTitle = pending ? 'Where the forms will come from'
        : anyDrawn && anySet ? 'How the signs are set and drawn'
            : anyDrawn ? 'How the letters are drawn' : 'How the signs are set';
    const sample = (mod.sample?.orders || []).map((o) => letters[o - 1]).filter(Boolean);
    const others = ENTRIES.filter((e) => e.slug !== entry.slug);

    const sections = stub ? [] : [
        letters.length > 0 && { id: 'mg-letters-heading', label: lettersTitle.replace(/^The /, '') },
        mod.drawing && { id: 'mg-drawing-heading', label: pending ? 'The forms' : 'Set and drawn' },
        mod.firstAttestation && { id: 'mg-attestation-heading', label: 'First witness' },
        (mod.transmission || []).length > 0 && { id: 'mg-transmission-heading', label: 'Hand to hand' },
        (mod.claims || []).length > 0 && { id: 'mg-claims-heading', label: 'Claims' },
        (mod.uses || []).length > 0 && { id: 'mg-uses-heading', label: 'Uses' },
        (mod.quotations || []).length > 0 && { id: 'mg-words-heading', label: 'In their words' },
        (mod.links || []).length > 0 && { id: 'mg-links-heading', label: 'Kin' },
        (mod.cautions || []).length > 0 && { id: 'mg-cautions-heading', label: 'Cautions' },
        { id: 'mg-sources-heading', label: 'Sources' },
        !pending && shown.length >= 5 && { id: 'edu-drill-heading', label: 'Recitation' },
    ].filter(Boolean);

    const fa = mod.firstAttestation;

    return (
        <div className="third-lamp-scope edu-page edu-lang-page mg-page" data-hall={`magic-${entry.slug}`} data-status={entry.status}>
            <Helmet>
                <title>{`${mod.title} — The Magical Scriptorium — The Third Lamp`}</title>
                <meta name="description" content={mod.summary} />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero edu-lang-hero mg-hero">
                    <p className="kicker">
                        <Link to="/third-lamp/education">The Scriptorium</Link> · <Link to={MAGIC_PATH}>{WING.title}</Link>
                    </p>
                    <h1 className="mg-fit" style={fitStyle(mod.title)}>{mod.title}</h1>
                    {sample.length > 0 && (
                        <div className="mg-hero-sample">
                            <p className="mg-hero-signs edu-glyph" dir={direction === 'rtl' ? 'rtl' : undefined} aria-hidden="true">
                                {sample.map((l) => <Sign key={l.order} of={l} />)}
                            </p>
                            {mod.sample.caption && <p className="mg-hero-caption">{mod.sample.caption}</p>}
                        </div>
                    )}
                    {(pending || stub) && (
                        <p className={`mg-status${pending ? ' is-pending' : ''}`}>
                            <Unstruck />
                            <span>{pending ? 'Letterforms being traced' : 'Page in preparation'}</span>
                        </p>
                    )}
                    <p className="edu-hero-sub">{mod.summary}</p>
                    {mod.otherNames && mod.otherNames.length > 0 && (
                        <p className="mg-hero-names"><span>Also called</span> {mod.otherNames.join(' · ')}</p>
                    )}
                    {sections.length > 0 && (
                        <nav className="edu-section-nav" aria-label="Sections of this page">
                            {sections.map((s) => <a key={s.id} href={`#${s.id}`}>{s.label}</a>)}
                        </nav>
                    )}
                </section>

                {stub && (
                    <section className="mg-stub" aria-labelledby="mg-stub-heading">
                        <div className="mg-stub-panel">
                            <Unstruck className="mg-unstruck-lg" />
                            <div>
                                <h2 id="mg-stub-heading">This page is being written</h2>
                                <p>Its history, its claims with their standing{reg && reg.keyedTo !== 'none' ? ', and the table of its letters' : ''} will follow,
                                    in the form of the pages already finished{pending ? '; its forms are to be traced from the named editions, and no form is shown before then' : ''}.
                                    Meanwhile the sources it is being written from are listed below.</p>
                            </div>
                        </div>
                    </section>
                )}

                {!stub && mod.intro && (
                    <section className="mg-intro" aria-label="Introduction">
                        {mod.intro.map((p, i) => <p key={i}>{p}</p>)}
                    </section>
                )}

                {letters.length > 0 && (
                    <section className="edu-alphabet mg-letters" aria-labelledby="mg-letters-heading">
                        <SectionHead kicker="First Things" id="mg-letters-heading" title={lettersTitle}>
                            {mod.scriptNote && <p>{mod.scriptNote}</p>}
                        </SectionHead>
                        {pending
                            ? <PendingLedger mod={mod} letters={letters} keyedTo={keyedTo} hebrewKeys={keys?.hebrew} latinKeys={keys?.latin} />
                            : <LetterGrid mod={mod} letters={letters} keyedTo={keyedTo} direction={direction}
                                label={`${mod.title}: ${letters.length} ${keyedTo === 'none' && !mod.valueLabel ? 'signs' : 'letters'}`} hebrewKeys={keys?.hebrew} />}
                    </section>
                )}

                {!stub && mod.drawing && (
                    <section className="mg-drawing" aria-labelledby="mg-drawing-heading">
                        <SectionHead kicker={pending ? 'Being Traced' : 'Set and Drawn'} id="mg-drawing-heading" title={drawingTitle} />
                        <div className="mg-drawn">
                            {mod.drawing.face && <div className="ch-kv"><span>Set in</span><p>{mod.drawing.face}</p></div>}
                            {mod.drawing.set && <div className="ch-kv"><span>What the font shows</span><p>{mod.drawing.set}</p></div>}
                            {mod.drawing.follows && <div className="ch-kv"><span>{pending ? 'To be traced from' : 'Drawn from'}</span><p>{mod.drawing.follows}</p></div>}
                            {mod.drawing.drawn && <div className="ch-kv"><span>What is drawn</span><p>{mod.drawing.drawn}</p></div>}
                            {mod.drawing.variants && <div className="ch-kv"><span>Where the editions differ</span><p>{mod.drawing.variants}</p></div>}
                        </div>
                    </section>
                )}

                {!stub && fa && (
                    <section className="mg-attestation" aria-labelledby="mg-attestation-heading">
                        <SectionHead kicker="The First Witness" id="mg-attestation-heading" title="First attestation" />
                        <article className="mg-witness">
                            <p className="mg-witness-date">{fa.date}</p>
                            <h3>{fa.work}</h3>
                            <dl>
                                {fa.author && <div><dt>By</dt><dd>{fa.author}</dd></div>}
                                {fa.place && <div><dt>Where</dt><dd>{fa.place}</dd></div>}
                                {fa.locator && <div><dt>Where in it</dt><dd>{fa.locator}</dd></div>}
                            </dl>
                            {fa.notes && <p className="mg-witness-notes">{fa.notes}</p>}
                        </article>
                    </section>
                )}

                {!stub && (mod.transmission || []).length > 0 && (
                    <ScriptoriumTimeline timeline={{ note: null, events: mod.transmission }}
                        kicker="Hand to Hand" heading="How it was carried" headingId="mg-transmission-heading" />
                )}

                {!stub && (mod.claims || []).length > 0 && (
                    <section className="mg-claims" aria-labelledby="mg-claims-heading">
                        <SectionHead kicker="Claim and Record" id="mg-claims-heading" title="What is claimed">
                            <p>Each statement about this alphabet is given with its standing, the evidence for it and where that evidence is found.</p>
                        </SectionHead>
                        <ul className="mg-key">
                            {STANDINGS.filter((s) => mod.claims.some((c) => c.standing === s.key)).map((s) => (
                                <li key={s.key}><span className={`mg-tag is-${s.key}`}>{s.label}</span><span className="mg-key-note">{s.note}</span></li>
                            ))}
                        </ul>
                        <ol className="mg-ledger-claims">
                            {mod.claims.map((c, i) => (
                                <li key={i} className={`mg-claim is-${c.standing}`}>
                                    <p className="mg-claim-text">{c.claim}</p>
                                    <p className="mg-claim-standing"><span className={`mg-tag is-${c.standing}`}>{STANDINGS.find((s) => s.key === c.standing)?.label}</span></p>
                                    <p className="mg-claim-evidence">{c.evidence}</p>
                                    {c.sources?.length > 0 && <p className="mg-claim-sources">{c.sources.join(' · ')}</p>}
                                </li>
                            ))}
                        </ol>
                    </section>
                )}

                {!stub && (mod.uses || []).length > 0 && (
                    <section className="mg-uses" aria-labelledby="mg-uses-heading">
                        <SectionHead kicker="In Use" id="mg-uses-heading" title="What it was used for" />
                        <ul className="mg-use-list">
                            {mod.uses.map((u, i) => (
                                <li key={i}><h3>{u.use}</h3><p>{u.evidence}</p></li>
                            ))}
                        </ul>
                    </section>
                )}

                {!stub && (mod.quotations || []).length > 0 && (
                    <section className="mg-words" aria-labelledby="mg-words-heading">
                        <SectionHead kicker="In Their Words" id="mg-words-heading" title="Passages">
                            <p>Each passage names whose words these are: the translator and the edition, or — where the original is given — the site’s own paraphrase, labelled as such.</p>
                        </SectionHead>
                        <div className="mg-quote-list">
                            {mod.quotations.map((q, i) => {
                                const para = /^paraphrase$/i.test(q.translation || '');
                                return (
                                    <figure className="mg-quote" key={i}>
                                        <blockquote lang={q.language === 'Latin' ? 'la' : q.language === 'English' ? 'en' : undefined}
                                            className={para ? 'mg-quote-original' : undefined}>
                                            <p>{q.text}</p>
                                        </blockquote>
                                        {para && <p className="mg-quote-paraphrase"><span>Paraphrase (the site’s own)</span> {q.paraphrase}</p>}
                                        <figcaption>
                                            <cite>{q.source}</cite>
                                            <span className="mg-quote-translation">
                                                {para ? `${q.language} original, with the site’s paraphrase` : /^english original$/i.test(q.translation) ? 'Written in English' : `Translation: ${q.translation}`}
                                            </span>
                                            {q.note && <span className="mg-quote-note">{q.note}</span>}
                                        </figcaption>
                                    </figure>
                                );
                            })}
                        </div>
                    </section>
                )}

                {!stub && (mod.links || []).length > 0 && (
                    <section className="mg-links" aria-labelledby="mg-links-heading">
                        <SectionHead kicker="Kin" id="mg-links-heading" title="Related halls and alphabets" />
                        <ul className="mg-link-list">
                            {mod.links.map((l) => (
                                <li key={l.to}>
                                    <Link to={linkTarget(l.to)}>{linkTitle(l.to)}</Link>
                                    <p>{l.relation}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {!stub && (mod.cautions || []).length > 0 && (
                    <section className="mg-cautions" aria-labelledby="mg-cautions-heading">
                        <SectionHead kicker="Read With Care" id="mg-cautions-heading" title="Cautions" />
                        <ul className="mg-caution-list">
                            {mod.cautions.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    </section>
                )}

                <section className="mg-sources" aria-labelledby="mg-sources-heading">
                    <SectionHead kicker="Sources" id="mg-sources-heading" title="Where this comes from" />
                    <ol className="mg-source-list">
                        {mod.sources.map((s, i) => (
                            <li key={i}>
                                <span>{s.citation}</span>
                                {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer">{new URL(s.url).hostname.replace(/^www\./, '')}</a>}
                            </li>
                        ))}
                    </ol>
                </section>

                {!stub && !pending && shown.length >= 5 && (
                    <ScriptoriumDrill letters={drillLetters} langTitle={mod.title} rtl={direction === 'rtl'} />
                )}

                <nav className="edu-hall-nav mg-entry-nav" aria-label="The Magical Scriptorium">
                    <Link to={MAGIC_PATH} className="mg-nav-home">← {WING.title}</Link>
                    {others.map((e) => (
                        <Link key={e.slug} to={entryPath(e.slug)}>
                            {e.door ? <Sign of={e.door} className="mg-nav-sign" /> : null}{e.short}
                        </Link>
                    ))}
                </nav>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default MagicAlphabetPage;

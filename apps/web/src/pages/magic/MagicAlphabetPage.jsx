import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, useParams } from 'react-router-dom';
import { NotFoundBeacon } from '../../components/AnalyticsBeacon';
import ThirdLampHeader from '../../components/ThirdLampHeader';
import ThirdLampFooter from '../../components/ThirdLampFooter';
import ScriptoriumTimeline from '../../components/ScriptoriumTimeline';
import ScriptoriumDrill from '../../components/ScriptoriumDrill';
import MagicGlyph, { Sign, Unstruck } from './MagicGlyph';
import FitTitle from './FitTitle';
import { isolate } from './Bidi';
import { LetterGrid, PendingLedger } from './Letters';
import { ALPHABETS, ENTRIES, ENTRY_BY_SLUG, MAGIC_PATH, STANDINGS, WING, canonicalUrl, entryPath, loadEntry, textOf } from './lib';
import '../../styles/magic.css';

// One page per entry of the Magical Scriptorium, in the idiom of a language
// hall: the hero with its section menu, the letters (a grid and plaque when
// the forms can be shown, a ledger when they are being traced), the printed
// page itself where a copy may be shown, the tables a book prints that are
// shown as printed rather than drawn (the Shawq's pictorial hieroglyphs), how
// the signs are set or drawn and from what, the first witness, the books that carried
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

// One printed page: the library's photograph, its caption, the rights where
// they are not given once for the set, its links — and, where its signs are
// shown as printed rather than drawn, the values printed with them, row by
// row, as text (`values`: { label, items | text, lang }).
const RTL = new Set(['ar', 'he', 'syr']);
function Plate({ p, sharedRights }) {
    return (
        // --ar and --pw give the image its box before it loads, so a
        // set of lazy plates does not grow the page under a reader
        <figure className={`mg-plate${p.height > p.width ? ' is-portrait' : ''}`}
            style={{ '--ar': p.width / p.height, '--pw': `${p.width}px` }}>
            <div className="mg-plate-frame">
                <img src={`/media/${p.file}`} alt={p.alt} width={p.width} height={p.height} loading="lazy" decoding="async" />
            </div>
            <figcaption>
                <p className="mg-plate-caption">{isolate(p.caption)}</p>
                {(p.values || []).length > 0 && (
                    <dl className="mg-plate-values">
                        {p.values.map((v) => (
                            <div key={v.label}>
                                <dt>{v.label}</dt>
                                {v.items
                                    ? <dd lang={v.lang} dir={RTL.has(v.lang) ? 'rtl' : undefined}
                                        className={`is-list${RTL.has(v.lang) ? ' edu-glyph is-script' : ''}`}>
                                        {v.items.map((it, i) => <span key={i}>{it}</span>)}
                                    </dd>
                                    : <dd>{isolate(v.text)}</dd>}
                            </div>
                        ))}
                    </dl>
                )}
                {!sharedRights && <p className="mg-plate-rights"><span>Rights</span> {isolate(p.rights)}</p>}
                <p className="mg-plate-links">
                    <a href={`/media/${p.file}`} target="_blank" rel="noopener noreferrer">The image at full size</a>
                    {p.url && (
                        <a href={p.url} target="_blank" rel="noopener noreferrer">
                            The whole page at {new URL(p.url).hostname.replace(/^www\./, '')}
                        </a>
                    )}
                </p>
            </figcaption>
        </figure>
    );
}

// Several plates from one repository share one rights statement: it is
// given once, under the set, and each caption keeps its credit line.
const sharedRightsOf = (plates) => (plates.length > 1 && plates.every((p) => p.rights === plates[0].rights) ? plates[0].rights : null);

function SectionHead({ kicker, id, title, children }) {
    return (
        <header className="edu-section-head">
            <p className="kicker">{kicker}</p>
            <h2 id={id}>{title}</h2>
            {children}
        </header>
    );
}

// The hero's row of signs. Where they do not fit on one line, the row is
// narrowed so the lines come out even (seven signs as four and three, not
// five and two); on one line it is left alone.
function HeroSigns({ children, ...props }) {
    const ref = useRef(null);
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el || typeof ResizeObserver === 'undefined') return undefined;
        let width = null;
        const fit = () => {
            el.style.maxWidth = '';
            const kids = [...el.children];
            // (the signs are svg elements, which have no offsetTop)
            const tops = new Set(kids.map((k) => Math.round(k.getBoundingClientRect().top)));
            if (tops.size < 2) return;
            const per = Math.ceil(kids.length / tops.size);
            const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
            let widest = 0;
            for (let i = 0; i < kids.length; i += per) {
                const row = kids.slice(i, i + per);
                widest = Math.max(widest, row.reduce((w, k) => w + k.getBoundingClientRect().width, 0) + gap * (row.length - 1));
            }
            el.style.maxWidth = `${Math.ceil(widest) + 1}px`;
        };
        fit();
        // refit when the column's width changes, and once the faces of set
        // signs have loaded
        const ro = new ResizeObserver(([e]) => {
            if (e.contentRect.width === width) return;
            width = e.contentRect.width;
            fit();
        });
        ro.observe(el.parentElement);
        let alive = true;
        document.fonts?.ready.then(() => { if (alive) fit(); });
        return () => { alive = false; ro.disconnect(); };
    }, []);
    return <p ref={ref} {...props}>{children}</p>;
}

function MagicAlphabetPage() {
    const { alphabet } = useParams();
    const entry = ENTRY_BY_SLUG[alphabet];
    const reg = ALPHABETS.find((a) => a.slug === alphabet) || null;
    const [mod, setMod] = useState(null);
    const [keys, setKeys] = useState(null);
    // A chunk that fails to load (a stale tab after a deploy, a dropped
    // connection) is thrown during render, so App's RouteErrorBoundary sees
    // it: it reloads once on a stale chunk, or shows its way out. Left in a
    // promise, the failure would leave an empty page that never finishes.
    const [loadError, setLoadError] = useState(null);

    useEffect(() => {
        let alive = true;
        setMod(null);
        setLoadError(null);
        if (entry) {
            loadEntry(alphabet)
                .then((m) => { if (alive) setMod(m); })
                .catch((e) => { if (alive) setLoadError(e); });
        }
        return () => { alive = false; };
    }, [alphabet, entry]);

    // The hall keys (letter, number, place) come from the generated data,
    // derived from the Hebrew and Latin halls, so no number is stored twice.
    const keyed = reg && reg.keyedTo !== 'none' && mod && (mod.letters || []).length > 0;
    useEffect(() => {
        let alive = true;
        if (keyed && !keys) {
            import('../../data/education/magic/wing-index.generated.js')
                .then((m) => { if (alive) setKeys(m.default.keys); })
                .catch((e) => { if (alive) setLoadError(e); });
        }
        return () => { alive = false; };
    }, [keyed, keys]);

    // The site header is sticky and wraps to two lines on a narrow phone: its
    // real height goes to --tl-header-h, from which the wing's anchors take
    // their scroll margin (magic.css), so a table, a plate or a letter reached
    // by its address stops below the header, not under it.
    const ready = Boolean(mod);
    useLayoutEffect(() => {
        const header = document.querySelector('.tl-header');
        if (!header) return undefined;
        const root = document.documentElement;
        const set = () => root.style.setProperty('--tl-header-h', `${Math.ceil(header.getBoundingClientRect().height)}px`);
        set();
        const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(set);
        ro?.observe(header);
        return () => { ro?.disconnect(); root.style.removeProperty('--tl-header-h'); };
    }, [ready]);

    const letters = useMemo(() => mod?.letters || [], [mod]);
    const shown = useMemo(() => letters.filter((l) => l.glyph || l.char), [letters]);
    // Where the same name stands in several groups (alif in each of the
    // Shawq's tables), the drill names each sign with its group, so that
    // four choices are never two of one name.
    const drillLetters = useMemo(() => shown.map((l) => ({
        ...l,
        name: mod?.groups && shown.some((o) => o !== l && o.name === l.name)
            ? `${l.name} (${mod.groups.find((g) => g.key === l.group)?.short || l.group})` : l.name,
        glyph: l.char ? textOf(l.char) : <MagicGlyph g={l.glyph} />,
        translit: l.translit || l.planet || '',
        // a value that only repeats the transliteration in capitals is not shown twice
        value: reg && reg.keyedTo !== 'none' ? l.value
            : (mod?.valueLabel && String(l.value).toLowerCase() !== String(l.translit).toLowerCase() ? l.value : null),
    })), [shown, reg, mod]);

    // an unknown address returns to the wing, recorded first as a miss for the
    // owner's 404 list
    if (!entry) return <><NotFoundBeacon /><Navigate to={MAGIC_PATH} replace /></>;
    if (loadError) throw loadError;
    if (!mod || (keyed && !keys)) return <div className="third-lamp-scope edu-page mg-page" aria-busy="true" style={{ minHeight: '100vh' }} />;

    const keyedTo = reg ? reg.keyedTo : 'none';
    const direction = reg ? reg.direction : 'ltr';
    const pending = entry.status === 'forms-pending';
    const stub = Boolean(mod.stub);
    const anyDrawn = letters.some((l) => l.glyph);
    const anySet = letters.some((l) => l.char);
    const lettersTitle = mod.lettersTitle || 'The Alphabet';
    // what the page calls its units, where they are not letters (the signs,
    // the staves, the glyphs)
    const unit = mod.unitNoun || null;
    const drawingTitle = pending ? 'Where the forms will come from'
        : anyDrawn && anySet ? 'How the signs are set and drawn'
            : anyDrawn ? `How the ${unit ? unit.many : 'letters'} are drawn` : 'How the signs are set';
    const sample = (mod.sample?.orders || []).map((o) => letters[o - 1]).filter(Boolean);
    const plates = stub ? [] : (mod.plates || []);
    const sharedRights = sharedRightsOf(plates);
    // tables shown as printed, not drawn (the Shawq's pictorial hieroglyphs),
    // each a set of plates under its own heading
    const facs = stub ? null : (mod.facsimiles || null);
    const facPlates = facs ? facs.tables.flatMap((t) => t.plates) : [];
    const facRights = sharedRightsOf(facPlates);
    const others = ENTRIES.filter((e) => e.slug !== entry.slug);

    const sections = stub ? [] : [
        letters.length > 0 && { id: 'mg-letters-heading', label: lettersTitle.replace(/^The /, '') },
        plates.length > 0 && { id: 'mg-plates-heading', label: plates.length > 1 ? 'The pages' : 'The page' },
        facPlates.length > 0 && { id: 'mg-facsimiles-heading', label: facs.navLabel || 'As printed' },
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
    // The witness's date as a short kicker; anything the date carries after a
    // dash (how it is known, what it is measured against) is printed as a
    // plain line in the record below, not set in tracked capitals.
    const [faWhen, ...faDated] = fa ? String(fa.date).split(' — ') : [];

    return (
        <div className="third-lamp-scope edu-page edu-lang-page mg-page" data-hall={`magic-${entry.slug}`} data-status={entry.status}
            style={reg?.signScale ? { '--mg-scale': reg.signScale } : undefined}>
            <Helmet>
                <title>{`${mod.title} — The Magical Scriptorium — The Third Lamp`}</title>
                <meta name="description" content={mod.summary} />
                <link rel="canonical" href={canonicalUrl(entryPath(entry.slug))} />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero edu-lang-hero mg-hero">
                    <p className="kicker">
                        <Link to="/third-lamp/education">The Scriptorium</Link> · <Link to={MAGIC_PATH}>{WING.title}</Link>
                    </p>
                    <FitTitle title={mod.title} />
                    {sample.length > 0 && (
                        <div className="mg-hero-sample">
                            <HeroSigns className="mg-hero-signs edu-glyph" dir={direction === 'rtl' ? 'rtl' : undefined} aria-hidden="true">
                                {sample.map((l) => <Sign key={l.order} of={l} />)}
                            </HeroSigns>
                            {mod.sample.caption && <p className="mg-hero-caption">{mod.sample.caption}</p>}
                        </div>
                    )}
                    {(pending || stub) && (
                        <p className={`mg-status${pending ? ' is-pending' : ''}`}>
                            <Unstruck />
                            <span>{pending ? 'Letterforms being traced' : 'Page in preparation'}</span>
                        </p>
                    )}
                    <p className="edu-hero-sub">{isolate(mod.summary)}</p>
                    {mod.otherNames && mod.otherNames.length > 0 && (
                        <p className="mg-hero-names"><span>Also called</span> {isolate(mod.otherNames.join(' · '))}</p>
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
                        {mod.intro.map((p, i) => <p key={i}>{isolate(p)}</p>)}
                    </section>
                )}

                {letters.length > 0 && (
                    <section className="edu-alphabet mg-letters" aria-labelledby="mg-letters-heading">
                        <SectionHead kicker="First Things" id="mg-letters-heading" title={lettersTitle}>
                            {mod.scriptNote && <p>{isolate(mod.scriptNote)}</p>}
                        </SectionHead>
                        {pending
                            ? <PendingLedger mod={mod} letters={letters} keyedTo={keyedTo} hebrewKeys={keys?.hebrew} latinKeys={keys?.latin} />
                            : <LetterGrid mod={mod} letters={letters} keyedTo={keyedTo} direction={direction}
                                label={`${mod.title}: ${letters.length} ${!reg ? 'entries' : unit ? unit.many : keyedTo === 'none' && !mod.valueLabel ? 'signs' : 'letters'}`} hebrewKeys={keys?.hebrew}
                                formless={!reg} />}
                    </section>
                )}

                {plates.length > 0 && (
                    <section className={`mg-plates${plates.length > 1 ? ' is-set' : ''}`} aria-labelledby="mg-plates-heading">
                        <SectionHead kicker="The Page Itself" id="mg-plates-heading" title={plates.length > 1 ? 'The pages as printed' : 'The page as printed'}>
                            <p>{mod.platesNote
                                ? isolate(mod.platesNote)
                                : `The printed page beside the drawings: the library’s own photograph, cropped and reduced for the web and otherwise unaltered. The caption names the copy.`}</p>
                        </SectionHead>
                        <div className="mg-plate-list">
                            {plates.map((p) => <Plate key={p.file} p={p} sharedRights={sharedRights} />)}
                        </div>
                        {mod.platesSource && <p className="mg-plate-rights mg-plates-rights"><span>Source</span> {isolate(mod.platesSource)}</p>}
                        {sharedRights && <p className="mg-plate-rights mg-plates-rights"><span>Rights</span> {isolate(sharedRights)}</p>}
                    </section>
                )}

                {facPlates.length > 0 && (
                    <section className="mg-plates mg-facsimiles is-set" aria-labelledby="mg-facsimiles-heading">
                        <SectionHead kicker={facs.kicker || 'As Printed'} id="mg-facsimiles-heading" title={facs.title}>
                            {facs.note && <p>{isolate(facs.note)}</p>}
                        </SectionHead>
                        {facs.tables.map((t) => (
                            <div className="mg-facsimile" key={t.key}>
                                <header className="mg-facsimile-head" id={`mg-facsimile-${t.key}`}>
                                    <h3>{isolate(t.label)}</h3>
                                    {t.note && <p className="mg-facsimile-note">{isolate(t.note)}</p>}
                                    {t.about && <p className="mg-facsimile-about">{isolate(t.about)}</p>}
                                </header>
                                <div className="mg-plate-list">
                                    {t.plates.map((p) => <Plate key={p.file} p={p} sharedRights={facRights} />)}
                                </div>
                            </div>
                        ))}
                        {facs.source && <p className="mg-plate-rights mg-plates-rights"><span>Source</span> {isolate(facs.source)}</p>}
                        {facRights && <p className="mg-plate-rights mg-plates-rights"><span>Rights</span> {isolate(facRights)}</p>}
                    </section>
                )}

                {!stub && mod.drawing && (
                    <section className="mg-drawing" aria-labelledby="mg-drawing-heading">
                        <SectionHead kicker={pending ? 'Being Traced' : 'Set and Drawn'} id="mg-drawing-heading" title={drawingTitle} />
                        <div className="mg-drawn">
                            {mod.drawing.face && <div className="ch-kv"><span>Set in</span><p>{isolate(mod.drawing.face)}</p></div>}
                            {mod.drawing.set && <div className="ch-kv"><span>What the font shows</span><p>{isolate(mod.drawing.set)}</p></div>}
                            {mod.drawing.follows && <div className="ch-kv"><span>{pending ? 'To be traced from' : 'Drawn from'}</span><p>{isolate(mod.drawing.follows)}</p></div>}
                            {mod.drawing.drawn && <div className="ch-kv"><span>What is drawn</span><p>{isolate(mod.drawing.drawn)}</p></div>}
                            {mod.drawing.variants && <div className="ch-kv"><span>Where the editions differ</span><p>{isolate(mod.drawing.variants)}</p></div>}
                            {/* a book of many tables (the Shawq's): which of them are drawn
                                and why, and how the book sets its values under its signs */}
                            {mod.drawing.chosen && <div className="ch-kv"><span>The tables chosen</span><p>{isolate(mod.drawing.chosen)}</p></div>}
                            {mod.drawing.keys && <div className="ch-kv"><span>How the tables are keyed</span><p>{isolate(mod.drawing.keys)}</p></div>}
                        </div>
                    </section>
                )}

                {!stub && fa && (
                    <section className="mg-attestation" aria-labelledby="mg-attestation-heading">
                        <SectionHead kicker="The First Witness" id="mg-attestation-heading" title="First attestation" />
                        <article className="mg-witness">
                            <p className="mg-witness-date">{faWhen}</p>
                            <h3>{isolate(fa.work)}</h3>
                            <dl>
                                {faDated.length > 0 && <div><dt>Dated</dt><dd>{isolate(faDated.join(' — '))}</dd></div>}
                                {fa.author && <div><dt>By</dt><dd>{isolate(fa.author)}</dd></div>}
                                {fa.place && <div><dt>Where</dt><dd>{isolate(fa.place)}</dd></div>}
                                {fa.locator && <div><dt>Where in it</dt><dd>{isolate(fa.locator)}</dd></div>}
                            </dl>
                            {fa.notes && <p className="mg-witness-notes">{isolate(fa.notes)}</p>}
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
                            <p>{reg?.group === 'signs' ? 'Each statement about these signs' : reg ? 'Each statement about this alphabet' : 'Each statement here'} is given with its standing, the evidence for it and where that evidence is found.</p>
                        </SectionHead>
                        <ul className="mg-key">
                            {STANDINGS.filter((s) => mod.claims.some((c) => c.standing === s.key)).map((s) => (
                                <li key={s.key}><span className={`mg-tag is-${s.key}`}>{s.label}</span><span className="mg-key-note">{s.note}</span></li>
                            ))}
                        </ul>
                        <ol className="mg-ledger-claims">
                            {mod.claims.map((c, i) => (
                                <li key={i} className={`mg-claim is-${c.standing}`}>
                                    <p className="mg-claim-text">{isolate(c.claim)}</p>
                                    <p className="mg-claim-standing"><span className={`mg-tag is-${c.standing}`}>{STANDINGS.find((s) => s.key === c.standing)?.label}</span></p>
                                    <p className="mg-claim-evidence">{isolate(c.evidence)}</p>
                                    {c.sources?.length > 0 && <p className="mg-claim-sources">{isolate(c.sources.join(' · '))}</p>}
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
                                <li key={i}><h3>{isolate(u.use)}</h3><p>{isolate(u.evidence)}</p></li>
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
                                            <p>{isolate(q.text)}</p>
                                        </blockquote>
                                        {para && <p className="mg-quote-paraphrase"><span>Paraphrase (the site’s own)</span> {isolate(q.paraphrase)}</p>}
                                        <figcaption>
                                            <cite>{isolate(q.source)}</cite>
                                            <span className="mg-quote-translation">
                                                {para ? `${q.language} original, with the site’s paraphrase` : /^english original$/i.test(q.translation) ? 'Written in English' : `Translation: ${q.translation}`}
                                            </span>
                                            {q.note && <span className="mg-quote-note">{isolate(q.note)}</span>}
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
                                    <p>{isolate(l.relation)}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {!stub && (mod.cautions || []).length > 0 && (
                    <section className="mg-cautions" aria-labelledby="mg-cautions-heading">
                        <SectionHead kicker="Read With Care" id="mg-cautions-heading" title="Cautions" />
                        <ul className="mg-caution-list">
                            {mod.cautions.map((c, i) => <li key={i}>{isolate(c)}</li>)}
                        </ul>
                    </section>
                )}

                <section className="mg-sources" aria-labelledby="mg-sources-heading">
                    <SectionHead kicker="Sources" id="mg-sources-heading" title="Where this comes from" />
                    <ol className="mg-source-list">
                        {mod.sources.map((s, i) => (
                            <li key={i}>
                                <span>{isolate(s.citation)}</span>
                                {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer">{new URL(s.url).hostname.replace(/^www\./, '')}</a>}
                            </li>
                        ))}
                    </ol>
                </section>

                {!stub && !pending && shown.length >= 5 && (
                    <ScriptoriumDrill letters={drillLetters} langTitle={mod.title} rtl={direction === 'rtl'} unit={unit} />
                )}

                <nav className="edu-hall-nav mg-entry-nav" aria-label="The Magical Scriptorium">
                    <Link to={MAGIC_PATH} className="mg-nav-home">← {WING.title}</Link>
                    {others.map((e) => (
                        <Link key={e.slug} to={entryPath(e.slug)}>
                            {/* the door's sign as an icon, fitted to its ink, as on the doors */}
                            {e.door ? <Sign of={e.door} className="mg-nav-sign" fit="ink" /> : null}{e.short}
                        </Link>
                    ))}
                </nav>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default MagicAlphabetPage;

import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ChristianitiesTree from './ChristianitiesTree';
import SYMBOL_MARKS from './symbolMarks';
import { SECTION_BY_SLUG, loadData } from './lib';

// One page, five doors: christologies, branches, councils, figures, symbols.
// Each section has its own renderer below; the chrome, loading behaviour and
// data discipline are shared. Canon and the Map have their own pages.
//
// Three doors carry structural extras beneath their entry lists: the
// christology matrix, the family tree, and the councils' words and creeds.
// Each is its own data file so a door still opens while an extra is unwritten.
const EXTRAS = {
    christologies: ['matrix'],
    branches: ['tree'],
    councils: ['words', 'creeds'],
};

const STATUS_LABEL = {
    condemned: 'condemned', vindicated: 'vindicated', tolerated: 'tolerated',
    revived: 'revived', divided: 'church-dividing', unresolved: 'unresolved',
};

function Expandable({ id, head, sub, badge, children, open, onToggle }) {
    return (
        <article id={id} className={`ch-entry${open ? ' is-open' : ''}`}>
            <button type="button" className="ch-entry-head" onClick={onToggle} aria-expanded={open}>
                <span className="ch-entry-titles">
                    <span className="ch-entry-name">{head}</span>
                    {sub && <span className="ch-entry-sub">{sub}</span>}
                </span>
                {badge && <span className="ch-entry-badge">{badge}</span>}
            </button>
            {open && <div className="ch-entry-body">{children}</div>}
        </article>
    );
}

function Christologies({ data, open, setOpen }) {
    return (
        <div className="ch-entry-list">
            {data.entries.map((e) => (
                <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                    onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                    head={e.name}
                    sub={e.term ? `${e.term.native} · ${e.term.translit} — ${e.term.meaning}` : e.claim}
                    badge={STATUS_LABEL[e.status]}>
                    <p className="ch-claim">{e.claim}</p>
                    {e.exposition.map((p, i) => <p key={i}>{p}</p>)}
                    {e.scripture.length > 0 && (
                        <div className="ch-kv"><span>Scripture carried into the argument</span>
                            <ul>{e.scripture.map((s, i) => <li key={i}><strong>{s.ref}</strong> — {s.how}</li>)}</ul>
                        </div>
                    )}
                    <div className="ch-kv"><span>Held by</span><p>{e.heldBy}</p></div>
                    <div className="ch-kv"><span>Opposed by</span><p>{e.opposedBy}</p></div>
                    {e.council && <div className="ch-kv"><span>Where it was judged</span><p>{e.council}</p></div>}
                    <div className="ch-kv"><span>What became of it</span><p>{e.aftermath}</p></div>
                    {e.today && <div className="ch-kv"><span>Who holds something like it today</span><p>{e.today}</p></div>}
                </Expandable>
            ))}
        </div>
    );
}

function Branches({ data, open, setOpen }) {
    return data.groups.map((g) => {
        const entries = data.entries.filter((e) => e.group === g.key);
        if (!entries.length) return null;
        return (
            <section key={g.key} className="ch-group">
                <header className="edu-section-head">
                    <h2>{g.label}</h2>
                    <p>{g.blurb}</p>
                </header>
                <div className="ch-entry-list">
                    {entries.map((e) => (
                        <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                            onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                            head={e.name} sub={e.era} badge={e.today ? 'living' : null}>
                            {e.selfName && e.selfName !== e.name && (
                                <p className="ch-selfname">Calls itself: <strong>{e.selfName}</strong></p>
                            )}
                            {e.exonym && (
                                <p className="ch-exonym">“{e.exonym}” is others' name for it, and is flagged here as such.</p>
                            )}
                            {e.parent && <p className="ch-lineage">Out of: {e.parent}</p>}
                            <p>{e.origin}</p>
                            <div className="ch-kv"><span>Distinctives</span>
                                <ul>{e.distinctives.map((d, i) => <li key={i}>{d}</li>)}</ul></div>
                            <div className="ch-kv"><span>Its Christ</span><p>{e.christology}</p></div>
                            {e.today && <div className="ch-kv"><span>Today</span><p>{e.today}</p></div>}
                        </Expandable>
                    ))}
                </div>
            </section>
        );
    });
}

function Councils({ data, open, setOpen }) {
    return (
        <>
            <div className="ch-entry-list">
                {data.councils.map((c) => (
                    <Expandable key={c.slug} id={c.slug} open={open === c.slug}
                        onToggle={() => setOpen(open === c.slug ? null : c.slug)}
                        head={`${c.name} · ${c.year < 0 ? `${-c.year} BCE` : c.year}`}
                        sub={`${c.place} — ${c.question}`} badge={null}>
                        <div className="ch-kv"><span>Convoked by</span><p>{c.convokedBy}</p></div>
                        <div className="ch-kv"><span>The decision</span><p>{c.decision}</p></div>
                        {c.keyTerms.length > 0 && (
                            <div className="ch-kv"><span>The words it turned on</span>
                                <ul>{c.keyTerms.map((t, i) => (
                                    <li key={i}><strong className="edu-glyph">{t.native || t.term}</strong>
                                        {t.native ? ` (${t.term})` : ''} — {t.meaning}</li>
                                ))}</ul></div>
                        )}
                        {c.dissent && <div className="ch-kv"><span>Who refused, and what stands because of it</span><p>{c.dissent}</p></div>}
                        <div className="ch-kv"><span>Aftermath</span><p>{c.aftermath}</p></div>
                        <div className="ch-kv"><span>Received by</span><p>{c.receivedBy}</p></div>
                    </Expandable>
                ))}
            </div>
            <header className="edu-section-head ch-args-head">
                <p className="kicker">Between the Councils</p>
                <h2>The arguments</h2>
                <p>{data.argumentsIntro}</p>
            </header>
            <div className="ch-entry-list">
                {data.disputes.map((a) => (
                    <Expandable key={a.slug} id={a.slug} open={open === a.slug}
                        onToggle={() => setOpen(open === a.slug ? null : a.slug)}
                        head={a.name} sub={`${a.span} — ${a.question}`} badge={null}>
                        <div className="ch-kv"><span>The parties</span><p>{a.parties}</p></div>
                        {a.course.map((p, i) => <p key={i}>{p}</p>)}
                        <div className="ch-kv"><span>Outcome</span><p>{a.outcome}</p></div>
                    </Expandable>
                ))}
            </div>
        </>
    );
}

function Figures({ data, open, setOpen }) {
    const [cat, setCat] = useState('all');
    const entries = cat === 'all' ? data.entries : data.entries.filter((e) => e.categories.includes(cat));
    return (
        <>
            <div className="edu-filter-row" role="group" aria-label="Filter figures">
                <button type="button" className={`edu-filter${cat === 'all' ? ' is-active' : ''}`} onClick={() => setCat('all')}>
                    All ({data.entries.length})
                </button>
                {data.categories.map((c) => (
                    <button type="button" key={c.key}
                        className={`edu-filter${cat === c.key ? ' is-active' : ''}`}
                        onClick={() => setCat(c.key)}>{c.label}</button>
                ))}
            </div>
            <div className="ch-entry-list">
                {entries.map((e) => (
                    <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                        onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                        head={e.name} sub={`${e.dates} · ${e.role}`} badge={null}>
                        <div className="ch-kv"><span>Tradition</span><p>{e.tradition}</p></div>
                        <p>{e.contribution}</p>
                        {e.fate && <div className="ch-kv"><span>Fate</span><p>{e.fate}</p></div>}
                        {e.quote && (
                            <blockquote className="ch-quote">
                                <p>“{e.quote.text}”</p>
                                <cite>{e.quote.source}</cite>
                            </blockquote>
                        )}
                    </Expandable>
                ))}
            </div>
        </>
    );
}

function Symbols({ data, open, setOpen }) {
    return (
        <div className="ch-symbol-grid">
            {data.entries.map((e) => (
                <button type="button" key={e.slug} id={e.slug}
                    className={`ch-symbol-card${open === e.slug ? ' is-open' : ''}`}
                    onClick={() => setOpen(open === e.slug ? null : e.slug)}
                    aria-expanded={open === e.slug}>
                    {SYMBOL_MARKS[e.slug]
                        ? <span className="ch-symbol-glyph is-drawn" aria-hidden="true">{SYMBOL_MARKS[e.slug]}</span>
                        : <span className="ch-symbol-glyph edu-glyph" aria-hidden="true">{e.glyph || '✧'}</span>}
                    <span className="ch-symbol-name">{e.name}</span>
                    {open === e.slug && (
                        <span className="ch-symbol-body">
                            <span><em>Form.</em> {e.form}</span>
                            <span><em>Origin.</em> {e.origin}</span>
                            <span><em>Meaning.</em> {e.meaning}</span>
                            <span><em>Used by.</em> {e.usedBy}</span>
                            {e.note && <span className="ch-symbol-note">{e.note}</span>}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}

// --- structural extras ------------------------------------------------------

const MARK = { yes: '●', no: '·', q: '◐' };

function ChristologyMatrix({ matrix }) {
    const [openRow, setOpenRow] = useState(() => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : '') || null);
    return (
        <section className="ch-matrix" aria-labelledby="ch-matrix-heading">
            <header className="edu-section-head">
                <p className="kicker">Every Answer, Every Question</p>
                <h2 id="ch-matrix-heading">The matrix</h2>
                {matrix.intro.map((p, i) => <p key={i}>{p}</p>)}
            </header>
            <div className="edu-kinship-scroll ch-canon-scroll" role="region"
                aria-label="Christology comparison table" tabIndex={0}>
                <table className="edu-cognates-table ch-canon-table ch-matrix-table">
                    <thead>
                        <tr>
                            <th scope="col" className="ch-canon-bookcol">Position</th>
                            {matrix.questions.map((q) => (
                                <th scope="col" key={q.key} title={q.gloss}>{q.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.positions.map((p) => {
                            const notes = matrix.questions
                                .map((q) => ({ q, a: p.answers[q.key] }))
                                .filter((x) => x.a?.note);
                            const isOpen = openRow === p.key;
                            return (
                                <React.Fragment key={p.key}>
                                    <tr className={`has-note ${isOpen ? 'is-open' : ''}`}
                                        onClick={() => setOpenRow(isOpen ? null : p.key)}>
                                        <th scope="row">{p.label}{p.labelNote ? ' †' : ''}</th>
                                        {matrix.questions.map((q) => {
                                            const a = p.answers[q.key];
                                            return (
                                                <td key={q.key} className={`ch-canon-cell st-${a?.v || 'no'}`}
                                                    title={`${p.label} — ${q.label} ${a?.note ? `(${a.note})` : MARK[a?.v] || ''}`}>
                                                    {MARK[a?.v] || '·'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {isOpen && (
                                        <tr className="edu-cog-noterow">
                                            <td colSpan={matrix.questions.length + 1}>
                                                <p className="ch-matrix-holder"><em>Held by.</em> {p.holder}</p>
                                                {p.labelNote && <p className="ch-matrix-holder"><em>† The name.</em> {p.labelNote}</p>}
                                                {notes.map(({ q, a }) => (
                                                    <p key={q.key}><em>{q.label}</em> — {a.note}</p>
                                                ))}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className="edu-kinship-legend">● yes · ◐ qualified (open the row for how) · a dot means no</p>
        </section>
    );
}

function CouncilWords({ words }) {
    const [open, setOpen] = useState(() => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : '') || null);
    return (
        <section className="ch-words" aria-labelledby="ch-words-heading">
            <header className="edu-section-head">
                <p className="kicker">One Iota of Difference</p>
                <h2 id="ch-words-heading">The words</h2>
                {words.intro.map((p, i) => <p key={i}>{p}</p>)}
            </header>
            <div className="ch-entry-list">
                {words.entries.map((w) => (
                    <Expandable key={w.slug} id={w.slug} open={open === w.slug}
                        onToggle={() => setOpen(open === w.slug ? null : w.slug)}
                        head={<><span className="edu-glyph ch-word-native">{w.native}</span> {w.translit}</>}
                        sub={w.literal} badge={w.lang}>
                        <p>{w.fight}</p>
                        {w.coined && <div className="ch-kv"><span>Enters the argument</span><p>{w.coined}</p></div>}
                        <div className="ch-kv"><span>Wielded by</span><p>{w.wieldedBy}</p></div>
                        <div className="ch-kv"><span>Against</span><p>{w.againstWhom}</p></div>
                        {w.counterpart && <div className="ch-kv"><span>Its rival</span><p>{w.counterpart}</p></div>}
                        {w.aftermath && <div className="ch-kv"><span>Where it stands now</span><p>{w.aftermath}</p></div>}
                    </Expandable>
                ))}
            </div>
            <p className="ch-words-bridge">
                The alphabet these words are spelled in, the numbers its letters
                carry, and the wider lexicon live in the Scriptorium's{' '}
                <Link to="/third-lamp/education/greek">Greek hall</Link>
                {' '}and <Link to="/third-lamp/education/latin">Latin hall</Link>.
            </p>
        </section>
    );
}

function Creeds({ creeds }) {
    const [open, setOpen] = useState(() => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : '') || null);
    return (
        <section className="ch-creeds" aria-labelledby="ch-creeds-heading">
            <header className="edu-section-head">
                <p className="kicker">A Fence and a Song at Once</p>
                <h2 id="ch-creeds-heading">The creeds</h2>
                {creeds.intro.map((p, i) => <p key={i}>{p}</p>)}
            </header>
            <div className="ch-entry-list">
                {creeds.creeds.map((c) => (
                    <Expandable key={c.slug} id={c.slug} open={open === c.slug}
                        onToggle={() => setOpen(open === c.slug ? null : c.slug)}
                        head={c.name}
                        sub={c.native ? `${c.native} — ${c.origin}` : c.origin}
                        badge={null}>
                        <p>{c.story}</p>
                        {c.dating && <div className="ch-kv"><span>On its dating</span><p>{c.dating}</p></div>}
                        <ol className="ch-creed-text">
                            {c.clauses.map((cl, i) => (
                                <li key={i} className={cl.note ? 'has-note' : ''}>
                                    <span className="ch-creed-clause">{cl.text}</span>
                                    {cl.variant && (
                                        <span className="ch-creed-variant">Latin text: “{cl.variant}”</span>
                                    )}
                                    {cl.note && <span className="ch-creed-clausenote">{cl.note}</span>}
                                </li>
                            ))}
                        </ol>
                        {c.usedBy && <div className="ch-kv"><span>Recited today</span><p>{c.usedBy}</p></div>}
                    </Expandable>
                ))}
            </div>
        </section>
    );
}

const RENDERERS = {
    christologies: Christologies, branches: Branches, councils: Councils,
    figures: Figures, symbols: Symbols,
};

function ChristianitiesSectionPage() {
    const { section } = useParams();
    const { hash } = useLocation();
    const meta = SECTION_BY_SLUG[section];
    const Renderer = RENDERERS[section];
    const [data, setData] = useState(null);
    const [extras, setExtras] = useState({});
    const [state, setState] = useState('loading');
    const [open, setOpen] = useState(null);

    useEffect(() => {
        let alive = true;
        setState('loading'); setData(null); setExtras({}); setOpen(null);
        if (Renderer) {
            Promise.all([
                loadData(section),
                Promise.all((EXTRAS[section] ?? []).map(async (name) => [name, await loadData(name)])),
            ]).then(([d, pairs]) => {
                if (!alive) return;
                setData(d);
                setExtras(Object.fromEntries(pairs.filter(([, v]) => v)));
                setState('done');
            });
        }
        return () => { alive = false; };
    }, [section, Renderer]);

    // A search result arrives as /christianities/<section>#<slug>. The global
    // ScrollToTop handles the scroll; opening the entry is this page's job.
    useEffect(() => {
        if (data && hash) setOpen(decodeURIComponent(hash.slice(1)));
    }, [data, hash]);

    if (!meta || !Renderer) return <Navigate to="/christianities" replace />;
    if (state === 'loading') {
        return <div className="third-lamp-scope edu-page ch-page" aria-busy="true" style={{ minHeight: '100vh' }}><SiteHeader /></div>;
    }
    // A door opens if it has its entry list OR any structural extra — while
    // the portal is filling in, the tree can stand before the branch entries do.
    if (!data && Object.keys(extras).length === 0) return <Navigate to="/christianities" replace />;

    return (
        <div className="third-lamp-scope edu-page ch-page">
            <Helmet>
                <title>{`${meta.title} — Christianities — Three Magi Press`}</title>
                <meta name="description" content={meta.blurb} />
            </Helmet>
            <SiteHeader />
            <main className="edu-main">
                <section className="edu-hero">
                    <p className="kicker"><Link to="/christianities">Christianities</Link> · {meta.kicker}</p>
                    <h1>{meta.title}</h1>
                    {(data?.intro || []).map((p, i) => <p className="edu-hero-sub" key={i}>{p}</p>)}
                </section>
                {data && <Renderer data={data} open={open} setOpen={setOpen} />}
                {extras.matrix && <ChristologyMatrix matrix={extras.matrix} />}
                {extras.tree && <ChristianitiesTree tree={extras.tree} />}
                {extras.words && <CouncilWords words={extras.words} />}
                {extras.creeds && <Creeds creeds={extras.creeds} />}
            </main>
            <SiteFooter />
        </div>
    );
}

export default ChristianitiesSectionPage;

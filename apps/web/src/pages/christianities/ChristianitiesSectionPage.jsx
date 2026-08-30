import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, Navigate } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { SECTION_BY_SLUG, loadData } from './lib';

// One page, five doors: christologies, branches, councils, figures, symbols.
// Each section has its own renderer below; the chrome, loading behaviour and
// data discipline are shared. Canon and the Map have their own pages.

const STATUS_LABEL = {
    condemned: 'condemned', vindicated: 'vindicated', tolerated: 'tolerated',
    revived: 'revived', divided: 'church-dividing', unresolved: 'unresolved',
};

function Expandable({ head, sub, badge, children, open, onToggle }) {
    return (
        <article className={`ch-entry${open ? ' is-open' : ''}`}>
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
                <Expandable key={e.slug} open={open === e.slug}
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
                        <Expandable key={e.slug} open={open === e.slug}
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
                    <Expandable key={c.slug} open={open === c.slug}
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
                    <Expandable key={a.slug} open={open === a.slug}
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
                    <Expandable key={e.slug} open={open === e.slug}
                        onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                        head={e.name} sub={`${e.dates} · ${e.role}`} badge={e.tradition}>
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
                <button type="button" key={e.slug}
                    className={`ch-symbol-card${open === e.slug ? ' is-open' : ''}`}
                    onClick={() => setOpen(open === e.slug ? null : e.slug)}
                    aria-expanded={open === e.slug}>
                    <span className="ch-symbol-glyph edu-glyph" aria-hidden="true">{e.glyph || '✧'}</span>
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

const RENDERERS = {
    christologies: Christologies, branches: Branches, councils: Councils,
    figures: Figures, symbols: Symbols,
};

function ChristianitiesSectionPage() {
    const { section } = useParams();
    const meta = SECTION_BY_SLUG[section];
    const Renderer = RENDERERS[section];
    const [data, setData] = useState(null);
    const [state, setState] = useState('loading');
    const [open, setOpen] = useState(null);

    useEffect(() => {
        let alive = true;
        setState('loading'); setData(null); setOpen(null);
        if (Renderer) loadData(section).then((d) => { if (alive) { setData(d); setState('done'); } });
        return () => { alive = false; };
    }, [section, Renderer]);

    if (!meta || !Renderer) return <Navigate to="/christianities" replace />;
    if (state === 'loading') {
        return <div className="third-lamp-scope edu-page ch-page" aria-busy="true" style={{ minHeight: '100vh' }}><SiteHeader /></div>;
    }
    if (!data) return <Navigate to="/christianities" replace />;

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
                    {(data.intro || []).map((p, i) => <p className="edu-hero-sub" key={i}>{p}</p>)}
                </section>
                <Renderer data={data} open={open} setOpen={setOpen} />
            </main>
            <SiteFooter />
        </div>
    );
}

export default ChristianitiesSectionPage;

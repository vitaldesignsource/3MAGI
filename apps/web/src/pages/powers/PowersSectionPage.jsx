import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { SECTION_BY_SLUG, loadData } from './lib';
import Rich from '../christianities/rich';
import PortalHero from '../christianities/PortalHero';

// One page, five doors of The Powers: hierarchies, host, pantheons, daimons,
// texts. The Map has its own page. The chrome, the expandable discipline and
// the deep-link behaviour are the Christianities machinery, and the CSS is
// shared outright — the portals are meant to feel like wings of one house.

const EXTRAS = {
    pantheons: ['correspondences'],
    daimons: ['words'],
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

const kv = (label, value) => (value
    ? <div className="ch-kv"><span>{label}</span><p><Rich t={value} /></p></div>
    : null);

function Hierarchies({ data, open, setOpen }) {
    return (
        <div className="ch-entry-list">
            {data.entries.map((e) => (
                <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                    onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                    head={e.name} sub={e.era} badge={e.tradition}>
                    {e.image && (
                        <figure className="pw-entry-figure">
                            <img src={`/media/${e.image}`} alt={e.imageAlt || ''}
                                loading="lazy" decoding="async" />
                            {e.imageCaption && <figcaption><Rich t={e.imageCaption} /></figcaption>}
                        </figure>
                    )}
                    {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    {e.ranks?.length > 0 && (
                        <div className="ch-kv"><span>The ranks, highest first</span>
                            <ol className="pw-ranks">
                                {e.ranks.map((r, i) => (
                                    <li key={i}>
                                        {r.native && <span className="edu-glyph pw-rank-native">{r.native}</span>}
                                        <strong>{r.name}</strong>
                                        {r.gloss && <> — <Rich t={r.gloss} /></>}
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                    {kv('Source', e.source)}
                    {kv('What turns on it', e.stakes)}
                </Expandable>
            ))}
        </div>
    );
}

function Host({ data, open, setOpen }) {
    return data.groups.map((g) => {
        const entries = data.entries.filter((e) => e.group === g.key);
        if (!entries.length) return null;
        return (
            <section key={g.key} className="ch-group">
                <header className="edu-section-head">
                    <h2>{g.label}</h2>
                    <p><Rich t={g.blurb} /></p>
                </header>
                <div className="ch-entry-list">
                    {entries.map((e) => (
                        <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                            onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                            head={<>{e.native && <span className="edu-glyph pw-head-native">{e.native}</span>}{e.name}</>}
                            sub={e.title} badge={e.tradition}>
                            {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                            {kv('First attested', e.attested)}
                            {kv('Office', e.office)}
                            {kv('Across the traditions', e.elsewhere)}
                        </Expandable>
                    ))}
                </div>
            </section>
        );
    });
}

function Pantheons({ data, open, setOpen }) {
    return data.groups.map((g) => {
        const entries = data.entries.filter((e) => e.group === g.key);
        if (!entries.length) return null;
        return (
            <section key={g.key} className="ch-group" id={g.key}>
                <header className="edu-section-head">
                    <h2>{g.label}</h2>
                    <p><Rich t={g.blurb} /></p>
                </header>
                <div className="ch-entry-list">
                    {entries.map((e) => (
                        <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                            onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                            head={<>{e.native && <span className="edu-glyph pw-head-native">{e.native}</span>}{e.name}</>}
                            sub={e.domain} badge={null}>
                            {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                            {kv('Cult', e.cult)}
                            {kv('Interpretatio', e.interpretatio)}
                        </Expandable>
                    ))}
                </div>
            </section>
        );
    });
}

function Daimons({ data, open, setOpen }) {
    return (
        <div className="ch-entry-list">
            {data.entries.map((e) => (
                <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                    onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                    head={e.name} sub={e.era} badge={e.tradition}>
                    {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    {kv('Source', e.source)}
                    {kv('The shift', e.shift)}
                </Expandable>
            ))}
        </div>
    );
}

function Texts({ data, open, setOpen }) {
    return (
        <div className="ch-entry-list">
            {data.entries.map((e) => (
                <Expandable key={e.slug} id={e.slug} open={open === e.slug}
                    onToggle={() => setOpen(open === e.slug ? null : e.slug)}
                    head={<>{e.native && <span className="edu-glyph pw-head-native">{e.native}</span>}{e.name}</>}
                    sub={e.dating} badge={e.tradition}>
                    {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    {kv('What it carries', e.carries)}
                    {kv('Where to read it', e.access)}
                </Expandable>
            ))}
        </div>
    );
}

// The Table of Correspondences — pantheons against the great offices, in the
// canon-table's clothes. Cells hold names; the open row tells the stories.
function Correspondences({ table }) {
    const [openRow, setOpenRow] = useState(
        () => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : '') || null,
    );
    return (
        <section className="ch-matrix" aria-labelledby="pw-corr-heading">
            <header className="edu-section-head">
                <p className="kicker">Interpretatio</p>
                <h2 id="pw-corr-heading">The Table of Correspondences</h2>
                {table.intro.map((p, i) => <p key={i}><Rich t={p} /></p>)}
            </header>
            <div className="edu-kinship-scroll ch-canon-scroll" role="region"
                aria-label="Correspondence table of the pantheons" tabIndex={0}>
                <table className="edu-cognates-table ch-canon-table pw-corr-table">
                    <thead>
                        <tr>
                            <th scope="col" className="ch-canon-bookcol">Pantheon</th>
                            {table.roles.map((r) => <th scope="col" key={r.key} title={r.gloss}>{r.label}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {table.pantheons.map((p) => {
                            const isOpen = openRow === p.key;
                            const notes = table.roles
                                .map((r) => ({ r, c: p.cells[r.key] }))
                                .filter((x) => x.c?.note);
                            return (
                                <React.Fragment key={p.key}>
                                    <tr id={`corr-${p.key}`} className={`has-note ${isOpen ? 'is-open' : ''}`}
                                        onClick={() => setOpenRow(isOpen ? null : p.key)}>
                                        <th scope="row">{p.label}</th>
                                        {table.roles.map((r) => (
                                            <td key={r.key} className="pw-corr-cell"
                                                title={p.cells[r.key]?.note || undefined}>
                                                {p.cells[r.key]?.name || '—'}
                                            </td>
                                        ))}
                                    </tr>
                                    {isOpen && notes.length > 0 && (
                                        <tr className="edu-cog-noterow">
                                            <td colSpan={table.roles.length + 1}>
                                                {notes.map(({ r, c }) => (
                                                    <p key={r.key}><em>{r.label}</em> — <Rich t={c.note} /></p>
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
            <p className="edu-kinship-legend">{table.legend}</p>
        </section>
    );
}

function PowersWords({ words }) {
    const [open, setOpen] = useState(
        () => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : '') || null,
    );
    return (
        <section className="ch-words" aria-labelledby="pw-words-heading">
            <header className="edu-section-head">
                <p className="kicker">One Word, Two Fates</p>
                <h2 id="pw-words-heading">The words</h2>
                {words.intro.map((p, i) => <p key={i}><Rich t={p} /></p>)}
            </header>
            <div className="ch-entry-list">
                {words.entries.map((w) => (
                    <Expandable key={w.slug} id={w.slug} open={open === w.slug}
                        onToggle={() => setOpen(open === w.slug ? null : w.slug)}
                        head={<><span className="edu-glyph ch-word-native">{w.native}</span> {w.translit}</>}
                        sub={w.literal} badge={w.lang}>
                        <p><Rich t={w.story} /></p>
                        {kv('Where it lives', w.livesIn)}
                        {w.fate && kv('Its fate', w.fate)}
                    </Expandable>
                ))}
            </div>
            <p className="ch-words-bridge">
                The scripts these words are written in each have a hall in the{' '}
                <Link to="/third-lamp/education">Scriptorium</Link> — the
                cuneiform 𒀭 that marks a god's name, the Hebrew of the
                mal’akhim, the Greek of the daimones.
            </p>
        </section>
    );
}

const RENDERERS = {
    hierarchies: Hierarchies, host: Host, pantheons: Pantheons,
    daimons: Daimons, texts: Texts,
};

function PowersSectionPage() {
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

    useEffect(() => {
        if (data && hash) setOpen(decodeURIComponent(hash.slice(1)));
    }, [data, hash]);

    if (!meta || !Renderer) return <Navigate to="/powers" replace />;
    if (state === 'loading') {
        return <div className="third-lamp-scope edu-page ch-page pw-page" aria-busy="true" style={{ minHeight: '100vh' }}><SiteHeader /></div>;
    }
    if (!data && Object.keys(extras).length === 0) return <Navigate to="/powers" replace />;

    return (
        <div className="third-lamp-scope edu-page ch-page pw-page">
            <Helmet>
                <title>{`${meta.title} — The Powers — Three Magi Press`}</title>
                <meta name="description" content={meta.blurb} />
            </Helmet>
            <SiteHeader />
            <PortalHero image={meta.hero} alt={meta.heroAlt}
                kickerLink="/powers" kickerLinkLabel="The Powers"
                kicker={meta.kicker} title={meta.title} intro={data?.intro} />
            <main className="edu-main">
                {data && <Renderer data={data} open={open} setOpen={setOpen} />}
                {extras.correspondences && <Correspondences table={extras.correspondences} />}
                {extras.words && <PowersWords words={extras.words} />}
            </main>
            <SiteFooter />
        </div>
    );
}

export default PowersSectionPage;

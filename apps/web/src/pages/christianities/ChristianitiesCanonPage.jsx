import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ScriptoriumTimeline from '../../components/ScriptoriumTimeline';
import { loadData } from './lib';

// The Making of the Bibles. The centrepiece is the table: every book that
// was ever seriously in the running, against every major canon — in, out,
// disputed, appendix — because "the Bible" is a different list depending on
// who is holding it, and the differences are the sediment of the arguments.

const STATUS = {
    in: { mark: '●', label: 'in the canon' },
    disputed: { mark: '◐', label: 'disputed or variable' },
    appendix: { mark: '□', label: 'in an appendix' },
    out: { mark: '·', label: 'not included' },
};

const SECTION_LABEL = {
    torah: 'Torah / Pentateuch', history: 'Histories', wisdom: 'Wisdom & Psalms',
    prophets: 'Prophets', deutero: 'Deuterocanon & Greek additions',
    gospels: 'Gospels', acts: 'Acts', pauline: 'Pauline letters',
    catholic: 'Catholic epistles', apocalypse: 'Apocalypse',
    other: 'At the edges of the lists',
};
const SECTION_ORDER = ['torah', 'history', 'wisdom', 'prophets', 'deutero',
    'gospels', 'acts', 'pauline', 'catholic', 'apocalypse', 'other'];

function ChristianitiesCanonPage() {
    const [data, setData] = useState(null);
    const [activeTrad, setActiveTrad] = useState(null);
    const [openBook, setOpenBook] = useState(null);

    useEffect(() => {
        let alive = true;
        loadData('canon').then((d) => { if (alive) setData(d); });
        return () => { alive = false; };
    }, []);

    const sections = useMemo(() => {
        if (!data) return [];
        const by = new Map();
        for (const b of data.books) {
            if (!by.has(b.section)) by.set(b.section, []);
            by.get(b.section).push(b);
        }
        return SECTION_ORDER.filter((k) => by.has(k)).map((k) => ({ key: k, label: SECTION_LABEL[k], books: by.get(k) }));
    }, [data]);

    if (!data) {
        return (
            <div className="third-lamp-scope edu-page ch-page" aria-busy="true" style={{ minHeight: '100vh' }}>
                <SiteHeader />
            </div>
        );
    }

    const trads = data.traditions;
    const activeT = trads.find((t) => t.key === activeTrad) || null;

    return (
        <div className="third-lamp-scope edu-page ch-page">
            <Helmet>
                <title>The Making of the Bibles — Christianities — Three Magi Press</title>
                <meta name="description" content="How the different Bibles were assembled: the criteria, the councils, the printers — and a table of every book against every canon, from the Tanakh's 24 to the Ethiopian 81." />
            </Helmet>
            <SiteHeader />

            <main className="edu-main">
                <section className="edu-hero">
                    <p className="kicker"><Link to="/christianities">Christianities</Link> · What Is In, and According to Whom</p>
                    <h1>The Making of the Bibles</h1>
                    {data.intro.map((p, i) => <p className="edu-hero-sub" key={i}>{p}</p>)}
                </section>

                <section className="edu-halls" aria-labelledby="ch-criteria-heading">
                    <header className="edu-section-head">
                        <p className="kicker">The Tests a Book Had to Pass</p>
                        <h2 id="ch-criteria-heading">The criteria</h2>
                    </header>
                    <div className="edu-hall-grid">
                        {data.criteria.map((c) => (
                            <div className="edu-hall-card ch-static-card" key={c.name}>
                                <h3>{c.name}</h3>
                                <p className="edu-hall-blurb">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="ch-canontable-heading" className="ch-canon">
                    <header className="edu-section-head">
                        <p className="kicker">Every Book, Every Canon</p>
                        <h2 id="ch-canontable-heading">The table</h2>
                        <p>Select a column to read that tradition's account of itself;
                            select a row for the story of a single book. The totals are
                            computed from the table, not asserted beside it.</p>
                    </header>

                    <div className="edu-kinship-scroll ch-canon-scroll" role="region" aria-label="Canon comparison table" tabIndex={0}>
                        <table className="edu-cognates-table ch-canon-table">
                            <thead>
                                <tr>
                                    <th scope="col" className="ch-canon-bookcol">Book</th>
                                    {trads.map((t) => (
                                        <th scope="col" key={t.key}
                                            className={activeTrad === t.key ? 'is-active' : ''}
                                            onClick={() => setActiveTrad(activeTrad === t.key ? null : t.key)}>
                                            {t.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            {sections.map((sec) => (
                                <tbody key={sec.key}>
                                    <tr className="ch-canon-sectionrow">
                                        <th colSpan={trads.length + 1} scope="colgroup">{sec.label}</th>
                                    </tr>
                                    {sec.books.map((b) => (
                                        <React.Fragment key={b.name}>
                                            <tr className={`${b.note ? 'has-note ' : ''}${openBook === b.name ? 'is-open' : ''}`}
                                                onClick={b.note ? () => setOpenBook(openBook === b.name ? null : b.name) : undefined}>
                                                <th scope="row">{b.name}{b.note ? ' ↕' : ''}</th>
                                                {trads.map((t) => {
                                                    const st = b.status[t.key] || 'out';
                                                    return (
                                                        <td key={t.key}
                                                            className={`ch-canon-cell st-${st}${activeTrad === t.key ? ' is-active' : ''}`}
                                                            title={`${b.name} — ${t.label}: ${STATUS[st].label}`}>
                                                            {STATUS[st].mark}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                            {openBook === b.name && b.note && (
                                                <tr className="edu-cog-noterow">
                                                    <td colSpan={trads.length + 1}>{b.note}</td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            ))}
                        </table>
                    </div>
                    <p className="edu-kinship-legend">
                        ● in the canon · ◐ disputed or variable · □ appendix · a dot means not included
                    </p>

                    {activeT && (
                        <aside className="ch-canon-tradnote" aria-live="polite">
                            <h3>{activeT.label}</h3>
                            <p>{activeT.note}</p>
                            {(activeT.otCount != null || activeT.ntCount != null) && (
                                <p className="ch-canon-counts">
                                    {activeT.otCount != null && <>Old Testament: <strong>{activeT.otCount}</strong></>}
                                    {activeT.otCount != null && activeT.ntCount != null && ' · '}
                                    {activeT.ntCount != null && <>New Testament: <strong>{activeT.ntCount}</strong></>}
                                </p>
                            )}
                        </aside>
                    )}
                </section>

                {data.milestones?.length > 0 && (
                    <ScriptoriumTimeline timeline={{ note: 'How the lists took shape: from the Seventy to the printers, every date that moved a Bible.', events: data.milestones }} rtl={false} />
                )}
            </main>

            <SiteFooter />
        </div>
    );
}

export default ChristianitiesCanonPage;

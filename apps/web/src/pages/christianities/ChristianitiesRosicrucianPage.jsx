import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { loadData } from './lib';
import Rich from './rich';
import PortalHero from './PortalHero';
import RosicrucianVault from './RosicrucianVault';

// The Rose and the Cross, off the Inner Tradition.
//
// The current itself — thirteen entries — lives in esoteric.js and is shown
// here in the same expandable form the section uses, so there is one copy of
// it and not two. What earns this page its own address is the material the
// entry list cannot hold: the three founding books set beside each other as
// physical objects, and a ledger that states claim by claim what the record
// will bear. The entries narrate; the ledger adjudicates. Those are different
// jobs and they want different shapes.

const GROUP = 'rosicrucian';

function Manifesto({ m }) {
    return (
        <article className="ch-rc-manifesto" id={m.slug}>
            <header>
                <p className="ch-rc-year">{m.year}</p>
                <h3>{m.title}</h3>
                <p className="ch-rc-sub">{m.sub}</p>
            </header>
            <dl className="ch-rc-imprint">
                <div><dt>Printed</dt><dd>{m.place}, {m.year}</dd></div>
                <div><dt>Printer</dt><dd>{m.printer}</dd></div>
                <div><dt>Language</dt><dd>{m.language}</dd></div>
                <div><dt>Before that</dt><dd>{m.circulating}</dd></div>
            </dl>
            <p className="ch-rc-says"><Rich t={m.says} /></p>
            <div className="ch-kv"><span>Who wrote it</span><p><Rich t={m.authorship} /></p></div>
            <div className="ch-kv"><span>The odd thing about it</span><p><Rich t={m.oddity} /></p></div>
        </article>
    );
}

function ChristianitiesRosicrucianPage() {
    const [page, setPage] = useState(null);
    const [current, setCurrent] = useState(null);
    const [open, setOpen] = useState(null);
    const { hash } = useLocation();

    useEffect(() => {
        let alive = true;
        loadData('rosicrucian').then((d) => { if (alive) setPage(d); });
        loadData('esoteric').then((d) => { if (alive) setCurrent(d); });
        return () => { alive = false; };
    }, []);

    // A search result arrives as /christianities/rosicrucian#<slug>; open it.
    useEffect(() => {
        if (current && hash) setOpen(decodeURIComponent(hash.slice(1)));
    }, [current, hash]);

    if (!page) {
        return <div className="third-lamp-scope edu-page ch-page" aria-busy="true" style={{ minHeight: '100vh' }}><SiteHeader /></div>;
    }

    const entries = (current?.entries ?? []).filter((e) => e.group === GROUP);
    const label = Object.fromEntries((page.standings ?? []).map((s) => [s.key, s.label]));

    return (
        <div className="third-lamp-scope edu-page ch-page ch-rc-page">
            <Helmet>
                <title>The Rose and the Cross — Christianities — Three Magi Press</title>
                <meta name="description" content="The Rosicrucian manifestos of 1614–1616, the brotherhood nobody could find, and a ledger of every claim about its origins set against what the record will bear — from the tomb of Christian Rosenkreuz to the Golden Dawn's forged warrant." />
            </Helmet>
            <SiteHeader />

            <PortalHero
                kickerLink="/christianities/esoteric" kickerLinkLabel="The Inner Tradition"
                kicker="The Rose and the Cross" title={page.title} intro={page.intro} />

            <main className="edu-main">
                <section className="ch-rc-books" aria-labelledby="rc-books-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">1614 · 1615 · 1616</p>
                        <h2 id="rc-books-heading">The three books</h2>
                        <p><Rich t={page.manifestoIntro} /></p>
                    </header>
                    <div className="ch-rc-triptych">
                        {page.manifestos.map((m) => <Manifesto key={m.slug} m={m} />)}
                    </div>
                </section>

                <section className="ch-rc-days-wrap" aria-labelledby="rc-days-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">The Chymical Wedding</p>
                        <h2 id="rc-days-heading">The seven days</h2>
                        {(page.weddingIntro ?? []).map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    </header>
                    <ol className="ch-rc-days">
                        {(page.days ?? []).map((d) => (
                            <li key={d.n} className="ch-rc-day">
                                <p className="ch-rc-day-n">Day {d.n}</p>
                                <h3>{d.title}</h3>
                                <p className="ch-rc-day-story"><Rich t={d.story} /></p>
                                {d.quote && (
                                    <blockquote className="ch-rc-day-quote">
                                        <p>{d.quote.text}</p>
                                        <footer><Rich t={d.quote.note} /></footer>
                                    </blockquote>
                                )}
                                <div className="ch-kv"><span>What the day is doing</span><p><Rich t={d.work} /></p></div>
                            </li>
                        ))}
                    </ol>
                    {page.weddingCoda && <p className="ch-rc-coda"><Rich t={page.weddingCoda} /></p>}
                </section>

                <section className="ch-rc-vault-wrap" aria-labelledby="rc-vault-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">The Fama, in plan</p>
                        <h2 id="rc-vault-heading">A diagram of a paragraph</h2>
                        {(page.vaultIntro ?? []).map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    </header>
                    <div className="ch-rc-vault-layout">
                        <RosicrucianVault vault={page.vault} />
                        <div className="ch-rc-vault-parts">
                            {(page.vault?.parts ?? []).map((pt) => (
                                <div className="ch-kv" key={pt.key}>
                                    <span>{pt.label}</span>
                                    <p><Rich t={pt.note} /></p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <ul className="ch-rc-inscriptions">
                        {(page.vault?.inscriptions ?? []).map((ins, i) => (
                            <li key={i}>
                                <p className="ch-rc-latin">{ins.latin}</p>
                                <p className="ch-rc-gloss">{ins.english}</p>
                                <p className="ch-rc-where">{ins.where}</p>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="ch-rc-ledger-wrap" aria-labelledby="rc-ledger-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">Claim and Record</p>
                        <h2 id="rc-ledger-heading">What the evidence will bear</h2>
                        {(page.ledgerIntro ?? []).map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    </header>

                    <ul className="ch-rc-key">
                        {(page.standings ?? []).map((s) => (
                            <li key={s.key}>
                                <span className={`ch-rc-tag is-${s.key}`}>{s.label}</span>
                                <span className="ch-rc-key-note">{s.note}</span>
                            </li>
                        ))}
                    </ul>

                    <ol className="ch-rc-ledger">
                        {page.ledger.map((row, i) => (
                            <li key={i} className={`ch-rc-row is-${row.standing}`}>
                                <p className="ch-rc-claim">“<Rich t={row.claim} />”</p>
                                <p className="ch-rc-standing">
                                    <span className={`ch-rc-tag is-${row.standing}`}>{label[row.standing] ?? row.standing}</span>
                                </p>
                                <p className="ch-rc-verdict"><Rich t={row.verdict} /></p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="ch-rc-chron-wrap" aria-labelledby="rc-chron-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">Chronology</p>
                        <h2 id="rc-chron-heading">In order</h2>
                        <p><Rich t={page.chronologyIntro} /></p>
                    </header>
                    <ol className="ch-rc-chron">
                        {page.chronology.map((c, i) => (
                            <li key={i}>
                                <span className="ch-rc-chron-year">{c.year}</span>
                                <span className="ch-rc-chron-body">
                                    <strong>{c.label}</strong>
                                    <span><Rich t={c.note} /></span>
                                </span>
                            </li>
                        ))}
                    </ol>
                </section>

                {entries.length > 0 && (
                    <section className="ch-group" aria-labelledby="rc-entries-heading">
                        <span className="pw-divider" aria-hidden="true" />
                        <header className="edu-section-head">
                            <p className="kicker">The Current</p>
                            <h2 id="rc-entries-heading">Thirteen entries</h2>
                            <p>Each with its sources, what the church did about it, and where it stands now — the same records that appear in <Link to="/christianities/esoteric">The Inner Tradition</Link>.</p>
                        </header>
                        <div className="ch-entry-list">
                            {entries.map((e) => (
                                <article key={e.slug} id={e.slug} className={`ch-entry${open === e.slug ? ' is-open' : ''}`}>
                                    <button type="button" className="ch-entry-head" aria-expanded={open === e.slug}
                                        onClick={() => setOpen(open === e.slug ? null : e.slug)}>
                                        <span className="ch-entry-titles">
                                            <span className="ch-entry-name">{e.name}</span>
                                            <span className="ch-entry-sub">{e.era}</span>
                                        </span>
                                    </button>
                                    {open === e.slug && (
                                        <div className="ch-entry-body">
                                            <p className="ch-claim">{e.claim}</p>
                                            {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                                            <div className="ch-kv"><span>Sources</span><p><Rich t={e.sources} /></p></div>
                                            <div className="ch-kv"><span>What the church did about it</span><p><Rich t={e.reception} /></p></div>
                                            <div className="ch-kv"><span>Where it stands now</span><p><Rich t={e.today} /></p></div>
                                        </div>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                <section className="ch-rc-afterword" aria-labelledby="rc-after-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">In sum</p>
                        <h2 id="rc-after-heading">A door that was never there</h2>
                    </header>
                    {(page.afterword ?? []).map((p, i) => <p key={i} className="ch-rc-after-p"><Rich t={p} /></p>)}
                    <p className="ch-rc-back">
                        <Link to="/christianities/esoteric">← Back to The Inner Tradition</Link>
                    </p>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}

export default ChristianitiesRosicrucianPage;

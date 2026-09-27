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
// entry list cannot hold, and it falls into three jobs that want three shapes:
//
//   the texts       the three books as physical objects, the Fama's own six
//                   articles, the seven days of the Wedding, the vault in plan
//   the reception    the dozen books the four-hundred-book claim is made of,
//                   with each one's side declared
//   the reckoning    the ledger, claim by claim, and the descent chart, which
//                   sets every body's account of itself against the record and
//                   leaves the seventy-year hole visibly empty
//
// The entries narrate. The ledger adjudicates. The descent chart draws.

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
    const sideLabel = Object.fromEntries((page.sides ?? []).map((s) => [s.key, s.label]));

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


                <section className="ch-rc-rules-wrap" aria-labelledby="rc-rules-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">The Fama, in its own words</p>
                        <h2 id="rc-rules-heading">Six agreements</h2>
                        {(page.rulesIntro ?? []).map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    </header>
                    <ol className="ch-rc-rules">
                        {(page.rules ?? []).map((r) => (
                            <li key={r.n} id={`rule-${r.n}`} className="ch-rc-rule">
                                <p className="ch-rc-rule-n" aria-hidden="true">{r.n}</p>
                                <h3>{r.label}</h3>
                                <blockquote className="ch-rc-rule-text"><p>{r.text}</p></blockquote>
                                <div className="ch-kv"><span>What became of it</span><p><Rich t={r.after} /></p></div>
                            </li>
                        ))}
                    </ol>
                    {page.rulesCoda && <p className="ch-rc-coda"><Rich t={page.rulesCoda} /></p>}
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


                <section className="ch-rc-furore-wrap" aria-labelledby="rc-furore-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">1612 &middot; 1652</p>
                        <h2 id="rc-furore-heading">Four hundred books</h2>
                        {(page.furoreIntro ?? []).map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    </header>
                    <ul className="ch-rc-key">
                        {(page.sides ?? []).map((s) => (
                            <li key={s.key}>
                                <span className={`ch-rc-side is-${s.key}`}>{s.label}</span>
                                <span className="ch-rc-key-note">{s.note}</span>
                            </li>
                        ))}
                    </ul>
                    <ol className="ch-rc-furore">
                        {(page.furore ?? []).map((b, i) => (
                            <li key={b.slug ?? i} id={b.slug} className={`ch-rc-book is-${b.side}`}>
                                <p className="ch-rc-book-year">{b.year}</p>
                                <div className="ch-rc-book-body">
                                    <h3>
                                        <span className="ch-rc-book-author">{b.author}</span>
                                        <cite className="ch-rc-book-title">{b.title}</cite>
                                    </h3>
                                    <p className="ch-rc-book-side">
                                        <span className={`ch-rc-side is-${b.side}`}>{sideLabel[b.side] ?? b.side}</span>
                                    </p>
                                    <p className="ch-rc-book-note"><Rich t={b.note} /></p>
                                </div>
                            </li>
                        ))}
                    </ol>
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


                <section className="ch-rc-descent-wrap" aria-labelledby="rc-descent-heading">
                    <span className="pw-divider" aria-hidden="true" />
                    <header className="edu-section-head">
                        <p className="kicker">The line</p>
                        <h2 id="rc-descent-heading">Claimed and documented</h2>
                        {(page.descentIntro ?? []).map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    </header>
                    <ol className="ch-rc-descent">
                        {(page.descent ?? []).map((r, i) => (
                            <li key={i} className={`ch-rc-desc${r.gap ? ' is-gap' : ''}`}>
                                <p className="ch-rc-desc-era">{r.era}</p>
                                <div className="ch-rc-desc-pair">
                                    <div className="ch-rc-desc-col is-claimed">
                                        <p className="ch-rc-desc-label">Claimed</p>
                                        <p><Rich t={r.claimed} /></p>
                                    </div>
                                    <div className="ch-rc-desc-col is-documented">
                                        <p className="ch-rc-desc-label">Documented</p>
                                        {r.documented
                                            ? <p><Rich t={r.documented} /></p>
                                            : <p className="ch-rc-desc-void">Nothing.</p>}
                                        {r.note && <p className="ch-rc-desc-note"><Rich t={r.note} /></p>}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ol>
                    {page.descentCoda && <p className="ch-rc-coda"><Rich t={page.descentCoda} /></p>}
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

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ScriptoriumTimeline from '../../components/ScriptoriumTimeline';
import ScriptoriumSearch from '../../components/ScriptoriumSearch';
import { SECTIONS, loadData } from './lib';

// Christianities — the portal landing. The plural is the thesis, and it is
// the standard scholarly framing rather than a provocation: what history
// hands us is not one Christianity with deviations but a family of
// Christianities, several of the largest of which exist precisely because
// they refused a council the others accepted.

function ChristianitiesPortalPage() {
    const [timeline, setTimeline] = useState(null);
    const [gallery, setGallery] = useState(null);

    useEffect(() => {
        let alive = true;
        loadData('timeline').then((t) => { if (alive && t?.events?.length) setTimeline(t); });
        loadData('gallery').then((g) => { if (alive && g?.images?.length) setGallery(g); });
        return () => { alive = false; };
    }, []);

    return (
        <div className="third-lamp-scope edu-page ch-page">
            <Helmet>
                <title>Christianities — Three Magi Press</title>
                <meta name="description" content="A portal on the family of Christianities: every understanding of Christ, the branches and sects, the councils and their arguments, the making of the different Bibles, the figures, the symbols, and an interactive map and timeline." />
            </Helmet>
            <SiteHeader />

            <main className="edu-main">
                <section className="edu-hero">
                    <p className="kicker">A Three Magi Press Portal</p>
                    <h1>Christianities</h1>
                    <p className="edu-hero-sub">
                        The plural is the point. What history hands us is not one
                        Christianity with deviations but a family of Christianities —
                        churches that parted over a single Greek word, canons that do
                        not contain the same books, and several of the oldest
                        communions on earth standing exactly where they stood when
                        they refused a council fifteen centuries ago. This portal
                        maps the family: the understandings of Christ, the branches,
                        the councils, the Bibles, the figures, the signs, and the
                        places where all of it happened.
                    </p>
                    <div className="edu-hero-glyphs" aria-hidden="true">
                        <span>☧</span><span>☦</span><span>⳩</span><span>✝</span><span>Α</span><span>Ω</span>
                    </div>
                </section>

                <section className="edu-halls" aria-labelledby="ch-doors-heading">
                    <header className="edu-section-head">
                        <p className="kicker">The Portal</p>
                        <h2 id="ch-doors-heading">Seven doors</h2>
                    </header>
                    <div className="edu-hall-grid ch-door-grid">
                        {SECTIONS.map((s) => (
                            <Link className="edu-hall-card" to={`/christianities/${s.slug}`} key={s.slug}>
                                <span className="ch-door-kicker">{s.kicker}</span>
                                <h3>{s.title}</h3>
                                <p className="edu-hall-blurb">{s.blurb}</p>
                                <span className="edu-hall-enter" aria-hidden="true">Enter →</span>
                            </Link>
                        ))}
                    </div>
                </section>

                {gallery && (
                    <section className="ch-gallery" aria-labelledby="ch-gallery-heading">
                        <header className="edu-section-head">
                            <p className="kicker">{gallery.kicker}</p>
                            <h2 id="ch-gallery-heading">{gallery.title}</h2>
                            <p>{gallery.intro}</p>
                        </header>
                        <div className="ch-gallery-grid">
                            {gallery.images.map((g) => (
                                <Link className="ch-gallery-card" to={g.link} key={g.file}>
                                    <img src={`/media/${g.file}`} alt={g.alt}
                                        loading="lazy" decoding="async" />
                                    <span className="ch-gallery-caption">
                                        <strong>{g.title}</strong>
                                        <span>{g.caption}</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                <ScriptoriumSearch scope="christianities" />

                {timeline && <ScriptoriumTimeline timeline={timeline} rtl={false} />}
            </main>

            <SiteFooter />
        </div>
    );
}

export default ChristianitiesPortalPage;

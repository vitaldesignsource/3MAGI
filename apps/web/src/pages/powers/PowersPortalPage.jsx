import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import ScriptoriumTimeline from '../../components/ScriptoriumTimeline';
import ScriptoriumSearch from '../../components/ScriptoriumSearch';
import { SECTIONS, loadData } from './lib';
import Rich from '../christianities/rich';
import PortalHero from '../christianities/PortalHero';

// The Powers — the third portal. Angels, daimons, and the gods: the whole
// population of the middle and upper air, across the traditions, with the
// philology that shows the same words being promoted, demoted, and inverted
// as the ladders were rebuilt.

function PowersPortalPage() {
    const [timeline, setTimeline] = useState(null);

    useEffect(() => {
        let alive = true;
        loadData('timeline').then((t) => { if (alive && t?.events?.length) setTimeline(t); });
        return () => { alive = false; };
    }, []);

    return (
        <div className="third-lamp-scope edu-page ch-page pw-page">
            <Helmet>
                <title>The Powers — Three Magi Press</title>
                <meta name="description" content="A portal on angels, angelology, daimons, and the gods: the hierarchies and choirs, the named beings, the pantheons and their correspondences, the daimonic middle world, the primary texts, and an interactive map and timeline." />
            </Helmet>
            <SiteHeader />

            <PortalHero grand effect="descend"
                image="9ab3ebc27f80a115b54e72bf04ef1d27.webp"
                alt="A vast marble hall of niches holding a winged bronze figure, a veiled seated statue, a gilded many-winged relief and a panel of golden stars, one reader standing before them"
                kicker="A Three Magi Press Portal"
                title="The Powers"
                intro={[
                    'Between the One and the world, every tradition found the air full. Sumer wrote a star-sign before its gods’ names; Egypt painted them with the heads of birds; Greece set a whole class of beings — the daimones — between gods and mortals, and Diotima told Socrates that everything that crosses that gap crosses by them. Israel thinned the crowd to messengers and made an art of ranking them; Persia cut the old pantheon in half and made one half devils; the philosophers built ladders; the magicians climbed.',
                    'This portal maps that population: the hierarchies, the named beings of the host, the families of the gods and their correspondences, the daimonic middle world, the books where all of it is written, and the places where the powers were named, fed, and finally argued over.',
                ]}
            >
                <div className="edu-hero-glyphs pw-hero-glyphs" aria-hidden="true">
                    <span>𒀭</span><span>𓊹</span><span>Δ</span><span>מ</span><span>神</span><span>ᚦ</span>
                </div>
            </PortalHero>

            <main className="edu-main">

                <section className="edu-halls" aria-labelledby="pw-doors-heading">
                    <header className="edu-section-head">
                        <p className="kicker">The Portal</p>
                        <h2 id="pw-doors-heading">Six doors</h2>
                    </header>
                    <div className="edu-hall-grid ch-door-grid">
                        {SECTIONS.map((s) => (
                            <Link className="edu-hall-card" to={`/powers/${s.slug}`} key={s.slug}>
                                <span className="ch-door-kicker">{s.kicker}</span>
                                <h3>{s.title}</h3>
                                <p className="edu-hall-blurb"><Rich t={s.blurb} /></p>
                                <span className="edu-hall-enter" aria-hidden="true">Enter →</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <ScriptoriumSearch scope="powers" />

                {timeline && <ScriptoriumTimeline timeline={timeline} rtl={false} />}
            </main>

            <SiteFooter />
        </div>
    );
}

export default PowersPortalPage;

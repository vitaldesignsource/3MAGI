import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import { lampPostCategories, didYouKnowBoxes } from '../data/lampPost';
import { GrimoireIcon, AuctionIcon, ExhibitionIcon, CollectionIcon, ArchaeologyIcon, TranslationsIcon, PapersIcon, DocumentariesIcon, EventsIcon, ObituariesIcon, ReleasesIcon, MediaIcon, SocietiesIcon, SightingsIcon, OdditiesIcon } from '../components/LampPostIcons';
import { submitForm } from '@/lib/formSubmit';

const HERO_IMG = '/media/1de8f5d3-251a-4d14-87fd-b1c5e811568e.webp';

function interleave(categories, boxes) {
    const out = [];
    let boxIndex = 0;
    categories.forEach((cat, i) => {
        out.push({ kind: 'category', data: cat });
        if ((i + 1) % 4 === 0 && boxIndex < boxes.length) {
            out.push({ kind: 'box', data: boxes[boxIndex] });
            boxIndex += 1;
        }
    });
    while (boxIndex < boxes.length) {
        out.push({ kind: 'box', data: boxes[boxIndex] });
        boxIndex += 1;
    }
    return out;
}

function TipForm() {
    const [fields, setFields] = useState({ name: '', email: '', tip: '' });
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const set = (k) => (e) => setFields(f => ({ ...f, [k]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fields.tip.trim()) return;
        setStatus('sending');
        setErrorMsg('');
        try {
            await submitForm('tip', {
                name: fields.name.trim(),
                email: fields.email.trim(),
                tip: fields.tip.trim(),
            });
            setStatus('success');
            setFields({ name: '', email: '', tip: '' });
        } catch (err) {
            // Show the handler's reason (e.g. an invalid email address) so the
            // visitor can actually fix it, rather than a dead-end generic line.
            setErrorMsg(err?.message || '');
            setStatus('error');
        }
    };

    return (
        <form className="lamp-post-tip-form" onSubmit={handleSubmit} noValidate>
            <div className="lamp-post-tip-row">
                <label className="lamp-post-tip-label">
                    <span>Name <small>(optional)</small></span>
                    <input
                        type="text"
                        value={fields.name}
                        onChange={set('name')}
                        placeholder="Your name or a handle"
                        disabled={status === 'sending' || status === 'success'}
                    />
                </label>
                <label className="lamp-post-tip-label">
                    <span>Email <small>(optional)</small></span>
                    <input
                        type="email"
                        value={fields.email}
                        onChange={set('email')}
                        placeholder="If you'd like a reply"
                        disabled={status === 'sending' || status === 'success'}
                    />
                </label>
            </div>
            <label className="lamp-post-tip-label lamp-post-tip-wide">
                <span>Your Tip</span>
                <textarea
                    value={fields.tip}
                    onChange={set('tip')}
                    rows={5}
                    placeholder="A surfaced manuscript, an auction sighting, a curious relic, a rumour worth investigating..."
                    required
                    disabled={status === 'sending' || status === 'success'}
                />
            </label>
            {status === 'error' && (
                <p className="lamp-post-tip-msg lamp-post-tip-error">{errorMsg || 'Something went wrong — please try again.'}</p>
            )}
            {status === 'success' && (
                <p className="lamp-post-tip-msg lamp-post-tip-success">Your tip has been received. We'll keep an eye on it.</p>
            )}
            {status !== 'success' && (
                <button type="submit" className="tl-button lamp-post-tip-submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Tip'}
                </button>
            )}
        </form>
    );
}

// Build ticker items from lampPostCategories headlines
function buildTickerItems(categories) {
    const items = [];
    categories.forEach(cat => {
        cat.items.forEach(item => {
            items.push({ label: cat.label, headline: item.headline });
        });
    });
    return items;
}

function NewsTicker({ categories }) {
    const items = useMemo(() => buildTickerItems(categories), [categories]);
    // Duplicate for seamless loop
    const doubled = [...items, ...items];
    return (
        <div className="lamp-post-ticker" aria-label="News ticker">
            <span className="lamp-post-ticker-label" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
                    <circle cx="5" cy="5" r="1.5" fill="currentColor"/>
                </svg>
                Dispatches
            </span>
            <div className="lamp-post-ticker-track">
                <div className="lamp-post-ticker-inner">
                    {doubled.map((item, i) => (
                        <span className="lamp-post-ticker-item" key={i}>
                            <strong>{item.label}</strong>
                            <span className="lamp-post-ticker-sep" aria-hidden="true">✦</span>
                            {item.headline}
                            <span className="lamp-post-ticker-sep" aria-hidden="true">◈</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ThirdLampLampPostPage() {
    const feed = interleave(lampPostCategories, didYouKnowBoxes);
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    return (
        <>
            <Helmet>
                <title>The Lamp Post | The Third Lamp | Three Magi Press</title>
            </Helmet>

            <div className="third-lamp-scope">
                <ThirdLampHeader />

                <main className="lamp-post-page">
                    <section className="lamp-post-hero">
                        <img src={HERO_IMG} alt="A weathered gaslamp post at night, wrapped with stacked tabloid papers" />
                        <div className="lamp-post-hero-shade" aria-hidden="true" />
                        <div className="lamp-post-hero-copy">
                            <p className="kicker">The Third Lamp Tabloids</p>
                            <h1>The Lamp Post</h1>
                            <p className="lamp-post-tagline">Rumors, relics, revelations, and remarkable curiosities.</p>
                        </div>
                    </section>

                    <NewsTicker categories={lampPostCategories} />

                    <section className="lamp-post-intro">
                        <p>
                            Posted beneath the lamp for whoever passes by: a running bulletin of what the wider
                            esoteric world has turned up this season — surfaced manuscripts, auction gossip,
                            excavation reports, quiet obituaries, and the odd bit of history too strange to leave
                            out. Nothing here is gospel. Read it the way you would read a notice pinned to a post:
                            with curiosity, and a raised eyebrow.
                        </p>
                    </section>

                    <div className="lamp-post-feed">
                        {feed.map((entry, idx) =>
                            entry.kind === 'category' ? (
                                <article className={`lamp-post-category ${expandedCategories[entry.data.id] ? 'is-open' : ''}`} id={entry.data.id} key={entry.data.id}>
                                    <button
                                        className="lamp-post-category-trigger"
                                        onClick={() => toggleCategory(entry.data.id)}
                                        aria-expanded={expandedCategories[entry.data.id] || false}
                                    >
                                        <header className="lamp-post-category-head">
                                            <span className="lamp-post-glyph" aria-hidden="true">
                                            {entry.data.id === 'grimoires' && <GrimoireIcon />}
                                            {entry.data.id === 'auction' && <AuctionIcon />}
                                            {entry.data.id === 'museums' && <ExhibitionIcon />}
                                            {entry.data.id === 'permanent-collections' && <CollectionIcon />}
                                            {entry.data.id === 'archaeology' && <ArchaeologyIcon />}
                                            {entry.data.id === 'translations' && <TranslationsIcon />}
                                            {entry.data.id === 'papers' && <PapersIcon />}
                                            {entry.data.id === 'documentaries' && <DocumentariesIcon />}
                                            {entry.data.id === 'events' && <EventsIcon />}
                                            {entry.data.id === 'obituaries' && <ObituariesIcon />}
                                            {entry.data.id === 'releases' && <ReleasesIcon />}
                                            {entry.data.id === 'media' && <MediaIcon />}
                                            {entry.data.id === 'societies' && <SocietiesIcon />}
                                            {entry.data.id === 'sightings' && <SightingsIcon />}
                                            {entry.data.id === 'oddities' && <OdditiesIcon />}
                                            {!['grimoires','auction','museums','permanent-collections','archaeology','translations','papers','documentaries','events','obituaries','releases','media','societies','sightings','oddities'].includes(entry.data.id) && entry.data.glyph}
                                        </span>
                                            <div>
                                                <p className="lamp-post-label">{entry.data.label}</p>
                                                <h2>{entry.data.title}</h2>
                                            </div>
                                        </header>
                                        <span className="lamp-post-category-icon" aria-hidden="true" />
                                    </button>
                                    <div className="lamp-post-items-panel">
                                        <div className="lamp-post-items">
                                            {entry.data.items.map((item) => item.featured ? (
                                                // A featured item is the one thing in its category
                                                // worth stopping for: it spans the grid and states
                                                // when / where / in what form before the prose.
                                                <article className="lamp-post-featured" key={item.headline}>
                                                    <div className="lamp-post-featured-inner">
                                                        <p className="lamp-post-featured-eyebrow">
                                                            <span className="lamp-post-featured-star" aria-hidden="true">✦</span>
                                                            {item.eyebrow || 'Featured'}
                                                        </p>
                                                        <h3 className="lamp-post-featured-headline">
                                                            {item.link ? (
                                                                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.headline}</a>
                                                            ) : item.headline}
                                                        </h3>
                                                        {(item.when || item.where || item.format) && (
                                                            <dl className="lamp-post-featured-facts">
                                                                {item.when && (<div><dt>When</dt><dd>{item.when}</dd></div>)}
                                                                {item.where && (<div><dt>Where</dt><dd>{item.where}</dd></div>)}
                                                                {item.format && (<div><dt>Format</dt><dd>{item.format}</dd></div>)}
                                                            </dl>
                                                        )}
                                                        <p className="lamp-post-featured-copy">{item.copy}</p>
                                                        {item.link && (
                                                            <p className="lamp-post-featured-actions">
                                                                <a className="tl-button tl-button-small" href={item.link} target="_blank" rel="noopener noreferrer">
                                                                    {item.cta || 'Find out more'}
                                                                </a>
                                                            </p>
                                                        )}
                                                    </div>
                                                </article>
                                            ) : (
                                                <div className="lamp-post-item" key={item.headline}>
                                                    <p className="lamp-post-item-meta">{item.meta}</p>
                                                    <h3>
                                                        {item.link ? (
                                                            <a
                                                                href={item.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                {item.headline}
                                                            </a>
                                                        ) : (
                                                            item.headline
                                                        )}
                                                    </h3>
                                                    <p className="lamp-post-item-copy">{item.copy}</p>
                                                    {item.links && item.links.length > 0 && (
                                                        <p className="lamp-post-item-links">
                                                            {item.links.map((lnk, li) => (
                                                                <React.Fragment key={li}>
                                                                    {li > 0 && <span className="lamp-post-item-links-sep" aria-hidden="true"> · </span>}
                                                                    <a href={lnk.url || lnk.href} target="_blank" rel="noopener noreferrer">{lnk.label}</a>
                                                                </React.Fragment>
                                                            ))}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ) : (
                                <aside className="lamp-post-dyk" key={`dyk-${idx}`}>
                                    <span className="lamp-post-dyk-mark" aria-hidden="true">?</span>
                                    <div>
                                        <p className="lamp-post-dyk-title">{entry.data.title}</p>
                                        <p className="lamp-post-dyk-fact">{entry.data.fact}</p>
                                    </div>
                                </aside>
                            )
                        )}
                    </div>

                    <section className="lamp-post-closing">
                        <p className="kicker">Have a Tip for the Post?</p>
                        <h2>Seen a symbol, heard a rumor, found a relic?</h2>
                        <p>
                            The Lamp Post is assembled from tips, sightings, and quiet word passed along by
                            readers of The Third Lamp. If something has crossed your path worth pinning here,
                            send it in below.
                        </p>
                        <TipForm />
                    </section>
                </main>

                <ThirdLampFooter />
            </div>
        </>
    );
}

export default ThirdLampLampPostPage;

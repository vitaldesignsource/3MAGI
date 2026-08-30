import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { loadData } from './lib';
import Rich from '../christianities/rich';
import PortalHero from '../christianities/PortalHero';
import { SECTION_BY_SLUG } from './lib';

// The Map of the Powers. Two frames again, but drawn as pure constellation —
// no coastline this time, because the gods' geography runs from Teotihuacan
// to Ise and no honest hand-laid shoreline covers that. Points, graticule,
// and names: a star chart of the cults.

const ERAS = [
    { key: 'all', label: 'All ages', from: -3500, to: 2100 },
    { key: 'firstnames', label: 'First names · 3200–1200 BCE', from: -3200, to: -1200 },
    { key: 'axial', label: 'The Axial · 1200–200 BCE', from: -1200, to: -200 },
    { key: 'imperial', label: 'Hellenistic & Imperial · 200 BCE–500 CE', from: -200, to: 500 },
    { key: 'ladders', label: 'The Ladders · 500–1500', from: 500, to: 1500 },
    { key: 'magicians', label: 'The Magicians · 1500–today', from: 1500, to: 2100 },
];

const CATEGORY_LABEL = {
    temple: 'Temples', oracle: 'Oracles', mystery: 'Mysteries',
    vision: 'Visions', school: 'Schools', text: 'Texts', magic: 'Magic',
};

const OLDWORLD = { minLon: -12, maxLon: 80, minLat: 6, maxLat: 62 };
const WORLD = { minLon: -125, maxLon: 145, minLat: -38, maxLat: 66 };

function makeProjector(frame, width) {
    const midLat = (frame.minLat + frame.maxLat) / 2;
    const kx = Math.cos((midLat * Math.PI) / 180);
    const spanX = (frame.maxLon - frame.minLon) * kx;
    const scale = width / spanX;
    const height = (frame.maxLat - frame.minLat) * scale;
    const project = ([lon, lat]) => [
        (lon - frame.minLon) * kx * scale,
        (frame.maxLat - lat) * scale,
    ];
    return { project, width, height };
}

const inFrame = (frame, s) =>
    s.lon >= frame.minLon && s.lon <= frame.maxLon && s.lat >= frame.minLat && s.lat <= frame.maxLat;

function PowersMapPage() {
    const [data, setData] = useState(null);
    const [era, setEra] = useState('all');
    const [cat, setCat] = useState('all');
    const [view, setView] = useState('oldworld');
    const [activeSlug, setActiveSlug] = useState(null);

    useEffect(() => {
        let alive = true;
        loadData('mapsites').then((d) => { if (alive) setData(d); });
        return () => { alive = false; };
    }, []);

    const { hash } = useLocation();
    useEffect(() => {
        if (!data || !hash) return;
        const site = data.sites.find((s) => s.slug === decodeURIComponent(hash.slice(1)));
        if (!site) return;
        setActiveSlug(site.slug);
        setEra('all'); setCat('all');
        if (!inFrame(OLDWORLD, site)) setView('world');
    }, [data, hash]);

    const frame = view === 'oldworld' ? OLDWORLD : WORLD;
    const { project, width, height } = useMemo(() => makeProjector(frame, 980), [frame]);

    const eraDef = ERAS.find((e) => e.key === era);
    const sites = data?.sites ?? [];

    const filtered = useMemo(() => sites.filter((s) => {
        const eraOk = s.from <= eraDef.to && (s.to == null || s.to >= eraDef.from);
        const catOk = cat === 'all' || s.categories.includes(cat);
        return eraOk && catOk;
    }), [sites, eraDef, cat]);

    const visible = filtered.filter((s) => inFrame(frame, s));
    const beyond = filtered.length - visible.length;
    const active = sites.find((s) => s.slug === activeSlug) || null;

    const cats = useMemo(() => {
        const present = new Set(sites.flatMap((s) => s.categories));
        return Object.keys(CATEGORY_LABEL).filter((k) => present.has(k));
    }, [sites]);

    const graticule = useMemo(() => {
        const lines = [];
        const step = view === 'oldworld' ? 10 : 20;
        for (let lon = Math.ceil(frame.minLon / step) * step; lon <= frame.maxLon; lon += step) {
            const [x1, y1] = project([lon, frame.minLat]);
            const [x2, y2] = project([lon, frame.maxLat]);
            lines.push(`M${x1.toFixed(1)},${y1.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}`);
        }
        for (let lat = Math.ceil(frame.minLat / step) * step; lat <= frame.maxLat; lat += step) {
            const [x1, y1] = project([frame.minLon, lat]);
            const [x2, y2] = project([frame.maxLon, lat]);
            lines.push(`M${x1.toFixed(1)},${y1.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}`);
        }
        return lines;
    }, [frame, project, view]);

    const yearLabel = (y) => (y < 0 ? `${-y} BCE` : `${y} CE`);

    if (!data) {
        return <div className="third-lamp-scope edu-page ch-page pw-page" aria-busy="true" style={{ minHeight: '100vh' }}><SiteHeader /></div>;
    }

    return (
        <div className="third-lamp-scope edu-page ch-page pw-page">
            <Helmet>
                <title>The Map — The Powers — Three Magi Press</title>
                <meta name="description" content="An interactive map of the cults, oracles, visions and schools of the powers: Uruk to Teotihuacan, Delphi to Ise, Qumran to Mortlake." />
            </Helmet>
            <SiteHeader />
            <PortalHero image={SECTION_BY_SLUG.map?.hero} alt={SECTION_BY_SLUG.map?.heroAlt} effect={SECTION_BY_SLUG.map?.heroEffect}
                kickerLink="/powers" kickerLinkLabel="The Powers"
                kicker="Where They Were Named" title="The Map"
                intro={data.intro ? [data.intro] : []} />
            <main className="edu-main">

                <div className="ch-map-controls">
                    <div className="edu-filter-row" role="group" aria-label="Filter by era">
                        {ERAS.map((e) => (
                            <button type="button" key={e.key}
                                className={`edu-filter${era === e.key ? ' is-active' : ''}`}
                                onClick={() => setEra(e.key)}>{e.label}</button>
                        ))}
                    </div>
                    <div className="edu-filter-row" role="group" aria-label="Filter by kind">
                        <button type="button" className={`edu-filter${cat === 'all' ? ' is-active' : ''}`}
                            onClick={() => setCat('all')}>Everything</button>
                        {cats.map((k) => (
                            <button type="button" key={k}
                                className={`edu-filter${cat === k ? ' is-active' : ''}`}
                                onClick={() => setCat(k)}>{CATEGORY_LABEL[k]}</button>
                        ))}
                    </div>
                    <div className="edu-filter-row" role="group" aria-label="Frame">
                        <button type="button" className={`edu-filter${view === 'oldworld' ? ' is-active' : ''}`}
                            onClick={() => setView('oldworld')}>The Old World</button>
                        <button type="button" className={`edu-filter${view === 'world' ? ' is-active' : ''}`}
                            onClick={() => setView('world')}>The World</button>
                        {beyond > 0 && (
                            <button type="button" className="edu-filter ch-map-beyond"
                                onClick={() => setView('world')}>
                                {beyond} site{beyond === 1 ? '' : 's'} beyond this frame →
                            </button>
                        )}
                    </div>
                </div>

                <div className="ch-map-stage">
                    <svg className="ch-map-svg" viewBox={`0 0 ${width} ${height}`} role="group"
                        aria-label="Map of the powers">
                        <rect className="ch-map-sea" x="0" y="0" width={width} height={height} />
                        {graticule.map((d, i) => <path key={i} className="ch-map-graticule" d={d} />)}
                        {visible.map((s) => {
                            const [x, y] = project([s.lon, s.lat]);
                            const isActive = s.slug === activeSlug;
                            return (
                                <g key={s.slug} id={s.slug}
                                    className={`ch-map-site${isActive ? ' is-active' : ''}`}
                                    role="button" tabIndex={0}
                                    aria-label={`${s.name}, ${yearLabel(s.from)} to ${s.to == null ? 'today' : yearLabel(s.to)}`}
                                    onClick={() => setActiveSlug(isActive ? null : s.slug)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault(); setActiveSlug(isActive ? null : s.slug);
                                        }
                                    }}>
                                    <circle className="ch-map-dot" cx={x} cy={y} r={isActive ? 4 : 2.8} />
                                    <text className="ch-map-label" x={x + 5} y={y + 3}>{s.name}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {active && (
                    <aside className="ch-canon-tradnote ch-tree-note" aria-live="polite">
                        <h3>{active.name}
                            <span className="ch-tree-note-dates"> · {yearLabel(active.from)}–{active.to == null ? 'today' : yearLabel(active.to)}</span>
                        </h3>
                        {active.modern && <p className="ch-selfname">Now: <strong>{active.modern}</strong></p>}
                        <p className="ch-map-blurb"><Rich t={active.blurb} /></p>
                        {active.events?.length > 0 && (
                            <ul className="ch-map-events">
                                {active.events.map((e, i) => (
                                    <li key={i}>
                                        <strong>{yearLabel(e.year)}</strong> — {e.title}.{' '}
                                        <span className="ch-map-edesc"><Rich t={e.desc} /></span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </aside>
                )}

                <p className="edu-kinship-legend">
                    A constellation, not a coastline: every point is plotted from
                    real coordinates, and the same sky holds Uruk and Teotihuacan.
                    Choose an era to watch the population change.
                </p>
            </main>
            <SiteFooter />
        </div>
    );
}

export default PowersMapPage;

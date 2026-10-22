import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { loadData, SECTION_BY_SLUG } from './lib';
import LAND from '../../data/christianities/mapland';
import PortalHero from './PortalHero';
import Rich from './rich';

// The Map of the Christianities.
//
// Two frames. THE CRADLE is the Mediterranean and Near East of the first
// millennium; THE WORLD is the whole family at global extent. Both are drawn
// from Natural Earth land polygons — 1:10m for the Cradle, 1:50m for the
// World — clipped to the frame and baked into a module at build time by
// tools/build-mapland.mjs, so the coastline is real and nothing is fetched at
// runtime. Sites are projected through the same function as the land, so a
// dot sits exactly where its coordinates say it does.
//
// The eras are the filter that matters: the same map shows a different
// religion in 100, 451, 1054 and 1906.

const ERAS = [
    { key: 'all', label: 'All ages', from: -50, to: 2100 },
    { key: 'apostolic', label: 'Apostolic · 30–100', from: 30, to: 100 },
    { key: 'persecuted', label: 'Persecutions · 100–313', from: 100, to: 313 },
    { key: 'imperial', label: 'Imperial · 313–451', from: 313, to: 451 },
    { key: 'divided', label: 'Divided · 451–1054', from: 451, to: 1054 },
    { key: 'medieval', label: 'Medieval · 1054–1517', from: 1054, to: 1517 },
    { key: 'reform', label: 'Reformations · 1517–1800', from: 1517, to: 1800 },
    { key: 'global', label: 'Global · 1800–today', from: 1800, to: 2100 },
];

const CATEGORY_LABEL = {
    council: 'Councils', patriarchate: 'Patriarchates', school: 'Schools',
    mission: 'Missions', martyrdom: 'Martyrdoms', monastic: 'Monasticism',
    schism: 'Schisms', reformation: 'Reformation', revival: 'Revivals',
    translation: 'Translation',
};

// ---------------------------------------------------------------------------
// The Cradle: frame and coastline. Vertices are [lon, lat]; everything is
// projected through the same function as the sites.
const CRADLE = { minLon: -12, maxLon: 52, minLat: 8, maxLat: 60 };
const WORLD = { minLon: -125, maxLon: 145, minLat: -38, maxLat: 66 };


const SEAS = [
    { name: 'Mare Nostrum', lon: 16, lat: 34.6 },
    { name: 'Pontus Euxinus', lon: 34, lat: 43.3 },
    { name: 'Mare Erythraeum', lon: 39.5, lat: 19.5 },
    { name: 'Oceanus', lon: -9.8, lat: 46.5 },
];

function makeProjector(frame, width) {
    const midLat = (frame.minLat + frame.maxLat) / 2;
    const kx = Math.cos((midLat * Math.PI) / 180);
    const spanX = (frame.maxLon - frame.minLon) * kx;
    const spanY = frame.maxLat - frame.minLat;
    const scale = width / spanX;
    const height = spanY * scale;
    const project = ([lon, lat]) => [
        (lon - frame.minLon) * kx * scale,
        (frame.maxLat - lat) * scale,
    ];
    return { project, width, height };
}

const pathFor = (project, pts) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${project(p)[0].toFixed(1)},${project(p)[1].toFixed(1)}`).join(' ');

const inFrame = (frame, s) =>
    s.lon >= frame.minLon && s.lon <= frame.maxLon && s.lat >= frame.minLat && s.lat <= frame.maxLat;

function ChristianitiesMapPage() {
    const [data, setData] = useState(null);
    const [era, setEra] = useState('all');
    const [cat, setCat] = useState('all');
    const [view, setView] = useState('cradle');
    const [activeSlug, setActiveSlug] = useState(null);

    useEffect(() => {
        let alive = true;
        loadData('mapsites').then((d) => { if (alive) setData(d); });
        return () => { alive = false; };
    }, []);

    // A search result arrives as /christianities/map#<site-slug>. Select the
    // site, clear any filter that would hide it, and widen the frame if it
    // lies beyond the Cradle.
    const { hash } = useLocation();
    useEffect(() => {
        if (!data || !hash) return;
        const site = data.sites.find((s) => s.slug === decodeURIComponent(hash.slice(1)));
        if (!site) return;
        setActiveSlug(site.slug);
        setEra('all'); setCat('all');
        if (!inFrame(CRADLE, site)) setView('world');
    }, [data, hash]);

    const frame = view === 'cradle' ? CRADLE : WORLD;
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

    // Real coastlines for this frame, projected once per frame change.
    const landPaths = useMemo(() => {
        const rings = LAND[view === 'cradle' ? 'cradle' : 'world'] || [];
        return rings.map((ring) => `${pathFor(project, ring)}Z`);
    }, [view, project]);

    const graticule = useMemo(() => {
        const lines = [];
        const step = view === 'cradle' ? 10 : 20;
        for (let lon = Math.ceil(frame.minLon / step) * step; lon <= frame.maxLon; lon += step) {
            lines.push(pathFor(project, [[lon, frame.minLat], [lon, frame.maxLat]]));
        }
        for (let lat = Math.ceil(frame.minLat / step) * step; lat <= frame.maxLat; lat += step) {
            lines.push(pathFor(project, [[frame.minLon, lat], [frame.maxLon, lat]]));
        }
        return lines;
    }, [frame, project, view]);

    return (
        <div className="third-lamp-scope edu-page ch-page">
            <Helmet>
                <title>The Map — Christianities — Three Magi Press</title>
                <meta name="description" content="An interactive map of the Christianities: councils, patriarchates, schools, missions, martyrdoms and revivals, filtered by era, from the Mediterranean cradle to the world." />
            </Helmet>
            <SiteHeader />

                <PortalHero image={SECTION_BY_SLUG.map?.hero} alt={SECTION_BY_SLUG.map?.heroAlt} effect={SECTION_BY_SLUG.map?.heroEffect}
                kickerLink="/christianities" kickerLinkLabel="Christianities"
                kicker="Where It Happened" title="The Map"
                intro={data?.intro ? [data.intro] : []} />
            <main className="edu-main">

                <div className="ch-map-controls">
                    <div className="edu-filter-row" role="group" aria-label="Choose an era">
                        {ERAS.map((e) => (
                            <button type="button" key={e.key}
                                className={`edu-filter${era === e.key ? ' is-active' : ''}`}
                                onClick={() => setEra(e.key)}>{e.label}</button>
                        ))}
                    </div>
                    <div className="edu-filter-row" role="group" aria-label="Filter by kind">
                        <button type="button" className={`edu-filter${cat === 'all' ? ' is-active' : ''}`} onClick={() => setCat('all')}>Everything</button>
                        {cats.map((k) => (
                            <button type="button" key={k}
                                className={`edu-filter${cat === k ? ' is-active' : ''}`}
                                onClick={() => setCat(k)}>{CATEGORY_LABEL[k]}</button>
                        ))}
                    </div>
                    <div className="edu-filter-row" role="group" aria-label="Choose the frame">
                        <button type="button" className={`edu-filter${view === 'cradle' ? ' is-active' : ''}`} onClick={() => setView('cradle')}>The Cradle</button>
                        <button type="button" className={`edu-filter${view === 'world' ? ' is-active' : ''}`} onClick={() => setView('world')}>The World</button>
                        {beyond > 0 && view === 'cradle' && (
                            <button type="button" className="edu-filter ch-map-beyond" onClick={() => setView('world')}>
                                {beyond} site{beyond === 1 ? '' : 's'} beyond this frame →
                            </button>
                        )}
                    </div>
                </div>

                <div className="ch-map-stage">
                    <svg
                        className="ch-map-svg"
                        viewBox={`0 0 ${width} ${Math.round(height)}`}
                        role="img"
                        aria-label={`Map of the Christianities, ${eraDef.label}`}
                    >
                        <rect x="0" y="0" width={width} height={height} className="ch-map-sea" />
                        {landPaths.map((d, i) => <path key={`l${i}`} d={d} className="ch-map-land" />)}
                        {graticule.map((d, i) => <path key={i} d={d} className="ch-map-graticule" />)}
                        {landPaths.map((d, i) => <path key={`c${i}`} d={d} className="ch-map-coastline" />)}
                        {view === 'cradle' && SEAS.map((s) => {
                            const [x, y] = project([s.lon, s.lat]);
                            return <text key={s.name} x={x} y={y} className="ch-map-sealabel">{s.name}</text>;
                        })}
                        {visible.map((s) => {
                            const [x, y] = project([s.lon, s.lat]);
                            const isActive = s.slug === activeSlug;
                            return (
                                <g key={s.slug} id={s.slug}
                                    className={`ch-map-site${isActive ? ' is-active' : ''}`}
                                    onClick={() => setActiveSlug(isActive ? null : s.slug)}
                                    role="button" tabIndex={0} aria-label={s.name}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveSlug(isActive ? null : s.slug); } }}
                                >
                                    <circle cx={x} cy={y} r={isActive ? 7 : 4.5} className="ch-map-dot" />
                                    <text x={x + 8} y={y + 3.5} className="ch-map-label">{s.name}</text>
                                </g>
                            );
                        })}
                    </svg>

                    {active && (
                        <aside className="ch-map-panel" aria-live="polite">
                            <button type="button" className="ch-map-close" onClick={() => setActiveSlug(null)} aria-label="Close">×</button>
                            <p className="edu-event-kind">
                                {active.categories.map((k) => CATEGORY_LABEL[k]).join(' · ')}
                                {' · '}{active.from < 0 ? `${-active.from} BCE` : active.from}–{active.to == null ? 'today' : active.to}
                            </p>
                            <h3>{active.name}</h3>
                            {active.modern && <p className="ch-map-modern">now {active.modern}</p>}
                            <p className="ch-map-blurb"><Rich t={active.blurb} /></p>
                            <ul className="ch-map-events">
                                {active.events.map((e, i) => (
                                    <li key={i}>
                                        <span className="ch-map-eyear">{e.year < 0 ? `${-e.year} BCE` : e.year}</span>
                                        <span className="ch-map-etitle">{e.title}</span>
                                        <span className="ch-map-edesc"><Rich t={e.desc} /></span>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    )}
                </div>

                <p className="ch-map-note">
                    The coastline is Natural Earth data — 1:10 million for the Cradle,
                    1:50 million for the World — and every site is plotted from its
                    true coordinates through the same projection as the shore, so a
                    dot sits exactly where it belongs. Choose an era to watch the same
                    map become a different religion.
                </p>
            </main>

            <SiteFooter />
        </div>
    );
}

export default ChristianitiesMapPage;

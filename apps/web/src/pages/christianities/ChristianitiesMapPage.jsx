import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { loadData, SECTION_BY_SLUG } from './lib';
import PortalHero from './PortalHero';
import Rich from './rich';

// The Map of the Christianities.
//
// Two frames. THE CRADLE is the Mediterranean and Near East of the first
// millennium, drawn with a hand-laid coastline in the spirit of a portolan
// chart — gold line on dark sea, deliberately stylized, since a chart that
// admits its stylization ages better than one that fakes precision. THE
// WORLD is the whole family at global extent, a constellation view without
// coastlines. Every site is plotted from real coordinates through the same
// projection as the coastline, so relative geography is honest even where
// the drawing is loose.
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

// A stylized coastline of the Middle Sea and its neighbours — Iberia round
// to Gibraltar, the Italian boot, the Aegean, Anatolia, the Levant, the
// Nile, North Africa; the Black Sea; the Red Sea; islands; and coarse
// Atlantic Europe with the two Isles, for Iona and Canterbury.
const COASTS = [
    // Mediterranean north shore: Gibraltar → Bosporus
    [[-5.4,36.1],[-4.4,36.7],[-2.5,36.8],[-1,37.6],[-0.3,39.5],[2.2,41.4],[3.5,43.2],[5.4,43.3],[7.3,43.7],[8.9,44.4],[10.2,42.9],[12.2,41.8],[14.2,40.8],[15.6,38.9],[16.1,38],[17.1,38.9],[18.4,40.3],[16,41.9],[14.5,42.5],[12.3,45.4],[13.8,45.6],[15.2,44.2],[16.5,43.5],[18.5,42.4],[19.4,41],[20,39.6],[21.5,38.3],[21.7,37.5],[22.4,36.5],[23,36.7],[23.2,37.5],[23.7,37.9],[24,38.5],[23,39],[22.6,40],[22.9,40.6],[24.5,40.7],[25.9,40.8],[26.2,40.2],[27.5,40.4],[29,41.1]],
    // Black Sea loop
    [[29,41.1],[28,43.4],[28.6,44.9],[30.7,46.2],[31.9,46.5],[33.5,45.3],[34.5,45.5],[36.5,45],[38,44.5],[39.8,43.4],[41.5,41.5],[39.5,41],[36.5,41.3],[35,42],[32.3,41.7],[31.3,41.2],[29.2,41.2]],
    // Anatolia west + south → Levant → Nile → North Africa → Gibraltar
    [[28.9,40.9],[27.3,40.4],[26.7,39.3],[27,38],[27.2,36.9],[28.2,36.6],[29,36.3],[30.5,36.2],[32.5,36.1],[34,36.2],[35.5,36.6],[35.9,36.2],[35.6,35.3],[35.5,34.5],[35.2,33.3],[34.9,32.9],[34.6,31.9],[34.3,31.5],[33,31.1],[31.9,31.3],[31.5,31.4],[30.3,31.4],[29.5,31.1],[29,30.9],[27.2,31.2],[25,31.5],[22.5,32.7],[20,32.5],[19,30.4],[15.5,32.4],[13.2,32.9],[11.1,33.6],[10.1,34.3],[10.2,36.8],[8,37],[6.5,37.1],[3,36.8],[0,35.9],[-2,35.4],[-5.3,35.9]],
    // Atlantic Iberia and France, up to the Channel
    [[-5.4,36.1],[-7.4,37.2],[-9,37],[-9.3,38.7],[-8.8,41.8],[-9,43.5],[-7,43.7],[-4,43.5],[-2,43.6],[-1.2,44.6],[-1.2,46],[-2.2,47.2],[-4.7,48.4],[-3.5,48.8],[-1.6,49.7],[0,49.5],[1.6,50.9],[3.2,51.3],[4.8,52.4],[6.8,53.4],[8.5,54],[8,55.5],[9.5,57.2],[10.7,57.7]],
    // Baltic hint
    [[10.7,57.7],[12.2,56.2],[12.8,55.4],[15,55],[18,55.8],[21,56.5],[24,57.5],[26.5,59.2],[30.2,59.9]],
    // Britain
    [[-5.5,50.05],[-1.3,50.6],[1.4,51.2],[1.7,52.8],[0.2,53.6],[-0.5,54.5],[-1.5,55.5],[-2.5,56],[-2.2,57.5],[-3.5,58.4],[-5,58.5],[-5.8,57],[-5.7,56.2],[-4.7,55],[-3.6,54.5],[-3.2,53.4],[-4.5,53.2],[-4.7,51.6],[-3,51.4],[-4.2,51.1],[-5.5,50.05]],
    // Ireland
    [[-10,51.6],[-8.2,51.5],[-6.2,52.2],[-6,53.5],[-5.9,54.6],[-8,55.3],[-10.2,54.2],[-9.8,53],[-10,51.6]],
    // Sicily
    [[12.8,37.1],[12.4,37.8],[13.3,38.2],[15.1,38.25],[15.3,37.1],[14.5,36.7],[12.8,37.1]],
    // Crete
    [[23.5,35.5],[25,35.4],[26.3,35.3],[25.7,35],[24.5,34.9],[23.5,35.2],[23.5,35.5]],
    // Cyprus
    [[32.4,35.2],[33.4,35.5],[34.6,35.6],[33.9,34.9],[33,34.6],[32.4,34.8],[32.4,35.2]],
    // Red Sea (west shore down, east shore up)
    [[32.6,29.9],[33.5,28.3],[34,27.5],[35.5,25.5],[36,24],[37.2,22],[38,20],[39,17.8],[40,16],[41.5,14],[43,12.5]],
    [[43.6,12.8],[43.3,13.7],[42.5,15.5],[41,17],[40,19.5],[39,21],[37.8,23.5],[36.5,25],[35,27.3],[34.6,28.1],[34.9,29.5]],
    // Nile ribbon
    [[31.2,30.1],[31.3,29],[31.1,27.5],[32.6,25.7],[32.9,24],[31.8,22],[33,19.5],[33.5,17.5]],
    // Persian Gulf hint
    [[47.7,30.4],[48.8,29.5],[50,27.5],[51.2,26.6],[52,26]],
    // Caspian hint (west shore)
    [[49.2,45.6],[48.5,44],[48,42],[49,40.5],[49.4,38.8],[50.2,37.2],[51.8,36.6]],
];

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

                <PortalHero image={SECTION_BY_SLUG.map?.hero} alt={SECTION_BY_SLUG.map?.heroAlt}
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
                        {graticule.map((d, i) => <path key={i} d={d} className="ch-map-graticule" />)}
                        {view === 'cradle' && COASTS.map((pts, i) => (
                            <path key={i} d={pathFor(project, pts)} className="ch-map-coast" />
                        ))}
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
                    The Cradle's coastline is deliberately stylized, in the manner of a
                    portolan chart; every site is plotted from its true coordinates, so
                    the geography of the points is honest even where the drawing is
                    loose. Choose an era to watch the same map become a different
                    religion.
                </p>
            </main>

            <SiteFooter />
        </div>
    );
}

export default ChristianitiesMapPage;

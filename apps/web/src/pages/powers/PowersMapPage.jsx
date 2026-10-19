import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { loadData } from './lib';
import Rich from '../christianities/rich';
import PortalHero from '../christianities/PortalHero';
import PortalEmblem from '../christianities/PortalEmblem';
import EMBLEMS from '../../data/emblems';
import '../../styles/powers-hero.css';
import '../../styles/powers-map.css';
import { SECTION_BY_SLUG } from './lib';
import LAND from '../../data/powers/mapland';

// The Map of the Powers. Two frames — the Old World at 1:10m and the whole
// planet at 1:50m — drawn from Natural Earth land polygons clipped to each
// frame at build time by tools/build-mapland.mjs. The gods' geography runs
// from Teotihuacan to Ise, which is precisely why it needed a real coastline
// rather than a hand-laid one.
//
// The names are placed, not printed: the oldest place wins the room beside its
// own dot, and a later neighbour looks for room around it (left, above, below,
// then out on a hairline leader). A name with no room left stays quiet and
// shows on hover, focus or selection. The note on a place docks inside the
// map on a wide screen and sits under it on a phone, and every place is also
// listed, by the age it begins in, in the gazetteer under the map.

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

// where each frame opens on a phone, whose map pans: the eastern
// Mediterranean, with Greece, the Levant and Egypt in view
const OPEN_ON = { oldworld: [35, 33], world: [30, 33] };

const MAP_WIDTH = 980;
const LABEL_FAMILY = '"Cinzel", Georgia, "Times New Roman", serif';

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

const pathFor = (project, pts) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${project(p)[0].toFixed(1)},${project(p)[1].toFixed(1)}`).join(' ');

const inFrame = (frame, s) =>
    s.lon >= frame.minLon && s.lon <= frame.maxLon && s.lat >= frame.minLat && s.lat <= frame.maxLat;

const yearLabel = (y) => (y < 0 ? `${-y} BCE` : `${y} CE`);
const spanLabel = (s) => `${yearLabel(s.from)}–${s.to == null ? 'today' : yearLabel(s.to)}`;

const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function useMedia(query) {
    const [matches, setMatches] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.(query).matches);
    useEffect(() => {
        const mq = window.matchMedia?.(query);
        if (!mq) return undefined;
        const on = () => setMatches(mq.matches);
        on();
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, [query]);
    return matches;
}

// ---------------------------------------------------------------------------
// Label placement. Widths are measured in the label face itself, so the boxes
// are the boxes the browser draws; the vertical extent is the font's own line
// box (ascent + descent), which is what a bounding box reports.

let measureCtx = null;
function labelMetrics(text, fs) {
    if (!measureCtx && typeof document !== 'undefined') {
        measureCtx = document.createElement('canvas').getContext('2d');
    }
    if (measureCtx) {
        measureCtx.font = `${fs}px ${LABEL_FAMILY}`;
        const m = measureCtx.measureText(text);
        return {
            w: m.width,
            asc: Number.isFinite(m.fontBoundingBoxAscent) ? m.fontBoundingBoxAscent : fs,
            desc: Number.isFinite(m.fontBoundingBoxDescent) ? m.fontBoundingBoxDescent : fs * 0.32,
        };
    }
    return { w: text.length * fs * 0.75 + 4, asc: fs, desc: fs * 0.32 };
}

// offsets at the 10.5px desktop size, scaled with the font; dy is where the
// middle of the capitals sits relative to the dot
const CANDIDATES = [
    { dx: 6, dy: 0, anchor: 'start' },
    { dx: -6, dy: 0, anchor: 'end' },
    { side: 'above', anchor: 'middle' },
    { side: 'below', anchor: 'middle' },
    { dx: 22, dy: -12, anchor: 'start', leader: true },
    { dx: 22, dy: 12, anchor: 'start', leader: true },
    { dx: -22, dy: -12, anchor: 'end', leader: true },
    { dx: -22, dy: 12, anchor: 'end', leader: true },
    { dx: 30, dy: 0, anchor: 'start', leader: true },
    { dx: -30, dy: 0, anchor: 'end', leader: true },
    { dx: 0, dy: -26, anchor: 'middle', leader: true },
    { dx: 0, dy: 28, anchor: 'middle', leader: true },
    { dx: 34, dy: -24, anchor: 'start', leader: true },
    { dx: 34, dy: 24, anchor: 'start', leader: true },
    { dx: -34, dy: -24, anchor: 'end', leader: true },
    { dx: -34, dy: 24, anchor: 'end', leader: true },
    // a last, longer reach into open sea or desert
    { dx: -48, dy: -10, anchor: 'end', leader: true },
    { dx: 48, dy: -10, anchor: 'start', leader: true },
    { dx: -48, dy: 12, anchor: 'end', leader: true },
    { dx: 48, dy: 12, anchor: 'start', leader: true },
    { dx: -40, dy: -38, anchor: 'end', leader: true },
    { dx: 40, dy: -38, anchor: 'start', leader: true },
    { dx: -40, dy: 40, anchor: 'end', leader: true },
    { dx: 40, dy: 40, anchor: 'start', leader: true },
    { dx: 0, dy: -44, anchor: 'middle', leader: true },
    { dx: 0, dy: 46, anchor: 'middle', leader: true },
];

const orient = (ax, ay, bx, by, cx, cy) => Math.sign((bx - ax) * (cy - ay) - (by - ay) * (cx - ax));
const crosses = (l, m) =>
    orient(l.x1, l.y1, l.x2, l.y2, m.x1, m.y1) !== orient(l.x1, l.y1, l.x2, l.y2, m.x2, m.y2)
    && orient(m.x1, m.y1, m.x2, m.y2, l.x1, l.y1) !== orient(m.x1, m.y1, m.x2, m.y2, l.x2, l.y2);
const boxGap = (b, x, y) => Math.hypot(Math.max(b.x0 - x, 0, x - b.x1), Math.max(b.y0 - y, 0, y - b.y1));
const overlaps = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
const inside = (pt, b) => pt[0] > b.x0 && pt[0] < b.x1 && pt[1] > b.y0 && pt[1] < b.y1;
const segmentPoints = (l) => [0.2, 0.35, 0.5, 0.65, 0.8, 0.95].map((t) => [l.x1 + (l.x2 - l.x1) * t, l.y1 + (l.y2 - l.y1) * t]);

function placeLabels(sites, project, width, height, { fs, dotR, isQuiet, obstacles: extra = [] }) {
    const k = fs / 10.5;
    const half = 4 * k;
    const pts = new Map(sites.map((s) => [s.slug, project([s.lon, s.lat])]));
    const dots = sites.map((s) => {
        const [x, y] = pts.get(s.slug);
        return { slug: s.slug, cx: x, cy: y, x0: x - half, y0: y - half, x1: x + half, y1: y + half };
    });
    const clear = 3.5 * k;
    const near = (d) => ({ x0: d.x0 - clear, y0: d.y0 - clear, x1: d.x1 + clear, y1: d.y1 + clear });
    const boxes = [...extra];
    const leaders = [];
    const out = new Map();

    const build = (s, c, m) => {
        const [x, y] = pts.get(s.slug);
        let tx = x + (c.dx || 0) * k;
        let ty;
        if (c.side === 'above') ty = y - half - m.desc - 1.5;
        else if (c.side === 'below') ty = y + half + m.asc + 1.5;
        else ty = y + c.dy * k + 0.35 * fs;
        const x0 = c.anchor === 'start' ? tx : c.anchor === 'end' ? tx - m.w : tx - m.w / 2;
        // a unit of room all round: the browser rounds the line box at the
        // drawn size, so the box it reports can run a little past the metrics
        const box = { x0: x0 - 1, x1: x0 + m.w + 1, y0: ty - m.asc - 1, y1: ty + m.desc + 1 };
        let leader = null;
        if (c.leader) {
            // from just off the dot to the nearest point of the capitals
            const ink = { x0, x1: x0 + m.w, y0: ty - 0.72 * fs, y1: ty };
            const ex = Math.min(Math.max(x, ink.x0), ink.x1);
            const ey = Math.min(Math.max(y, ink.y0), ink.y1);
            const len = Math.hypot(ex - x, ey - y) || 1;
            const ux = (ex - x) / len;
            const uy = (ey - y) / len;
            const start = dotR + 1.5 * k;
            const stop = 2.5 * k;
            leader = { x1: x + ux * start, y1: y + uy * start, x2: ex - ux * stop, y2: ey - uy * stop };
        }
        tx = Number(tx.toFixed(1));
        return { tx, ty: Number(ty.toFixed(1)), anchor: c.anchor, box, leader };
    };

    const free = (slug, p) => {
        const b = p.box;
        if (b.x0 < 1 || b.y0 < 1 || b.x1 > width - 1 || b.y1 > height - 1) return false;
        if (boxes.some((o) => overlaps(b, o))) return false;
        // a name is never read as a neighbour's: beside its dot it lies nearer
        // its own dot than any other, and out on a leader it keeps well clear
        const [px, py] = pts.get(slug);
        const own = boxGap(b, px, py);
        for (const d of dots) {
            if (d.slug === slug) { if (overlaps(b, d)) return false; continue; }
            const gap = boxGap(b, d.cx, d.cy);
            // two places all but on one spot (Jerusalem and Qumran) read as a
            // pair whichever side each name takes
            const twin = Math.hypot(d.cx - px, d.cy - py) < 5 * k;
            if (p.leader ? gap < 10 * k : (gap < 7 * k || (!twin && gap < own + 2 * k))) return false;
        }
        if (leaders.some((l) => segmentPoints(l).some((pt) => inside(pt, b)))) return false;
        if (p.leader) {
            const sp = segmentPoints(p.leader);
            if (sp.some((pt) => boxes.some((o) => inside(pt, o)))) return false;
            // leaders never cross one another
            if (leaders.some((l) => crosses(l, p.leader))) return false;
            if (sp.some((pt) => dots.some((d) => d.slug !== slug && inside(pt, near(d))))) return false;
        }
        return true;
    };

    // the oldest place keeps the room beside its own dot
    const order = [...sites].sort((a, b) => a.from - b.from);
    for (const s of order) {
        const m = labelMetrics(s.name, fs);
        let placed = null;
        if (!isQuiet(s)) {
            for (const c of CANDIDATES) {
                const p = build(s, c, m);
                if (free(s.slug, p)) { placed = p; break; }
            }
        }
        if (placed) {
            boxes.push(placed.box);
            if (placed.leader) leaders.push(placed.leader);
            out.set(s.slug, { ...placed, quiet: false });
        } else {
            // quiet: shown only on hover, focus or selection, beside the dot on
            // whichever side keeps it inside the frame
            const right = build(s, CANDIDATES[0], m);
            const p = right.box.x1 <= width - 1 ? right : build(s, CANDIDATES[1], m);
            out.set(s.slug, { ...p, leader: null, quiet: true });
        }
    }
    return out;
}

// Targets. Each place gets a disc of up to 24px, cut back along the line
// half-way to any neighbour (its Voronoi cell), so in a cluster every dot keeps
// the whole of its own side and none covers the next.

function clipHalfPlane(poly, f) {
    const out = [];
    for (let i = 0; i < poly.length; i++) {
        const a = poly[i];
        const b = poly[(i + 1) % poly.length];
        const fa = f(a);
        const fb = f(b);
        if (fa <= 0) out.push(a);
        if ((fa < 0 && fb > 0) || (fa > 0 && fb < 0)) {
            const t = fa / (fa - fb);
            out.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
        }
    }
    return out;
}

function hitCells(points, R) {
    return points.map(([cx, cy], i) => {
        let poly = Array.from({ length: 24 }, (_, k) => {
            const a = (k / 24) * Math.PI * 2;
            return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
        });
        points.forEach(([ox, oy], j) => {
            if (j === i) return;
            let dx = ox - cx;
            let dy = oy - cy;
            if (dx * dx + dy * dy > 4 * R * R) return;
            // two places on one spot share it, split down the middle
            if (Math.abs(dx) < 1e-6 && Math.abs(dy) < 1e-6) { dx = j > i ? 1e-3 : -1e-3; dy = 0; }
            const mx = (cx + ox) / 2;
            const my = (cy + oy) / 2;
            poly = clipHalfPlane(poly, (p) => (p[0] - mx) * dx + (p[1] - my) * dy);
        });
        return poly.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    });
}

// ---------------------------------------------------------------------------
// A row of toggles that keeps to one line on a phone and swipes sideways
// inside itself; the fade shows only on the side where more chips wait.

function ChipStrip({ labelledBy, className = '', children }) {
    const ref = useRef(null);
    const [fade, setFade] = useState('none');
    const update = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        if (max <= 1) { setFade('none'); return; }
        const l = el.scrollLeft > 1;
        const r = el.scrollLeft < max - 1;
        setFade(l && r ? 'both' : l ? 'start' : r ? 'end' : 'none');
    }, []);
    useLayoutEffect(() => {
        update();
        const el = ref.current;
        if (!el || typeof ResizeObserver === 'undefined') return undefined;
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, [update]);
    useLayoutEffect(() => { update(); });
    return (
        <div ref={ref} className={`edu-filter-row pw-chip-strip${className ? ` ${className}` : ''}`}
            role="group" aria-labelledby={labelledBy} data-fade={fade} onScroll={update}>
            {children}
        </div>
    );
}

function PowersMapPage() {
    const [data, setData] = useState(null);
    const [era, setEra] = useState('all');
    const [cat, setCat] = useState('all');
    const [view, setView] = useState('oldworld');
    const [activeSlug, setActiveSlug] = useState(null);
    const [reveal, setReveal] = useState({ n: 0, src: null });
    const [fontsReady, setFontsReady] = useState(false);
    const [more, setMore] = useState({ l: false, r: false });
    const [peek, setPeek] = useState(null);
    const narrow = useMedia('(max-width: 760px)');
    const [mapScale, setMapScale] = useState(() => (narrow ? 0.776 : 1));

    const stageRef = useRef(null);
    const plateRef = useRef(null);
    const noteRef = useRef(null);
    const openerRef = useRef(null);
    const revealDone = useRef(0);

    useEffect(() => {
        let alive = true;
        loadData('mapsites').then((d) => { if (alive) setData(d); });
        return () => { alive = false; };
    }, []);

    // the names are measured in Cinzel; measure again once it has arrived
    useEffect(() => {
        let alive = true;
        const fonts = typeof document !== 'undefined' ? document.fonts : null;
        if (!fonts?.load) return undefined;
        fonts.load(`10.5px ${LABEL_FAMILY}`).then(() => { if (alive) setFontsReady(true); }, () => {});
        return () => { alive = false; };
    }, []);

    // the URL names the place that is open, without a router navigation, so
    // the page neither jumps to the top nor gains a history entry
    const writeHash = (slug) => {
        const { pathname, search } = window.location;
        window.history.replaceState(window.history.state, '', slug ? `${pathname}${search}#${encodeURIComponent(slug)}` : `${pathname}${search}`);
    };

    const choose = (slug, src) => {
        openerRef.current = typeof document !== 'undefined' ? document.activeElement : null;
        setActiveSlug(slug);
        setReveal((r) => ({ n: r.n + 1, src }));
        writeHash(slug);
    };

    const close = useCallback(() => {
        const slug = activeSlug;
        setActiveSlug(null);
        writeHash(null);
        const back = openerRef.current;
        openerRef.current = null;
        const target = back && back !== document.body && back.isConnected ? back : (slug && document.getElementById(slug));
        if (target?.focus) target.focus();
    }, [activeSlug]);

    const location = useLocation();
    useEffect(() => {
        if (!data || !location.hash) return;
        const site = data.sites.find((s) => s.slug === decodeURIComponent(location.hash.slice(1)));
        if (!site) return;
        setActiveSlug(site.slug);
        setReveal((r) => ({ n: r.n + 1, src: 'hash' }));
        setEra('all'); setCat('all');
        if (!inFrame(OLDWORLD, site)) setView('world');
    }, [data, location.hash, location.key]);

    // Escape closes the note and gives focus back to whatever opened it
    useEffect(() => {
        if (!activeSlug) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape' && !e.defaultPrevented) close();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [activeSlug, close]);

    const frame = view === 'oldworld' ? OLDWORLD : WORLD;
    const { project, width, height } = useMemo(() => makeProjector(frame, MAP_WIDTH), [frame]);

    const eraDef = ERAS.find((e) => e.key === era);
    const sites = useMemo(() => data?.sites ?? [], [data]);

    const eraOk = useCallback((s) => s.from <= eraDef.to && (s.to == null || s.to >= eraDef.from), [eraDef]);
    const catOk = useCallback((s) => cat === 'all' || s.categories.includes(cat), [cat]);

    const filtered = useMemo(() => sites.filter((s) => eraOk(s) && catOk(s)), [sites, eraOk, catOk]);
    const visible = useMemo(() => filtered.filter((s) => inFrame(frame, s)), [filtered, frame]);
    // the rest of the era's absent places stay on the chart as faint points
    const ghosts = useMemo(() => (era === 'all' ? [] : sites.filter((s) => inFrame(frame, s) && catOk(s) && !eraOk(s))),
        [sites, frame, era, eraOk, catOk]);
    const beyond = filtered.length - visible.length;
    const active = sites.find((s) => s.slug === activeSlug) || null;
    const activeRef = useRef(active);
    activeRef.current = active;

    const cats = useMemo(() => {
        const present = new Set(sites.flatMap((s) => s.categories));
        return Object.keys(CATEGORY_LABEL).filter((k) => present.has(k));
    }, [sites]);

    const landPaths = useMemo(() => {
        const rings = LAND[view === 'oldworld' ? 'oldworld' : 'world'] || [];
        return rings.map((ring) => `${pathFor(project, ring)}Z`);
    }, [view, project]);

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

    // sizes in map units, set from the scale the map is drawn at (about 1 on a
    // wide screen, 0.78 on a phone, where it pans at 760px), so the names land
    // near 11px and the targets near 24px at every width
    const fs = Math.min(14, Math.max(10.5, Math.round((10.8 / mapScale) * 2) / 2));
    const k = fs / 10.5;
    const dotR = Number((2.8 * k * 0.96).toFixed(1));
    const activeR = Number((4 * k * 0.94).toFixed(1));
    const ringR = Number((8 * k * 0.94).toFixed(1));
    const maxHit = Number((12 * k).toFixed(1));

    // in the World frame the Old World is a box to zoom into, not a knot of names
    const oldBox = useMemo(() => {
        if (view !== 'world') return null;
        const [x0, y0] = project([OLDWORLD.minLon, OLDWORLD.maxLat]);
        const [x1, y1] = project([OLDWORLD.maxLon, OLDWORLD.minLat]);
        const lfs = fs * 0.86;
        const m = labelMetrics('The Old World', lfs);
        const lx = x0 + 6;
        const ly = y0 + 6 + m.asc * 0.8;
        return { x0, y0, x1, y1, lfs, lx, ly, labelBox: { x0: lx - 1, x1: lx + m.w + 1, y0: ly - m.asc, y1: ly + m.desc } };
    }, [view, project, fs]);

    const placed = useMemo(() => placeLabels(visible, project, width, height, {
        fs, dotR,
        isQuiet: (s) => view === 'world' && inFrame(OLDWORLD, s),
        obstacles: oldBox ? [oldBox.labelBox] : [],
    // fontsReady re-runs the placement once the label face has loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [visible, project, width, height, fs, dotR, view, oldBox, fontsReady]);

    const hits = useMemo(() => {
        const cells = hitCells(visible.map((s) => project([s.lon, s.lat])), maxHit);
        return new Map(visible.map((s, i) => [s.slug, cells[i]]));
    }, [visible, project, maxHit]);

    // -- the panning stage on a phone ----------------------------------------
    const updateMore = useCallback(() => {
        const s = stageRef.current;
        if (!s) return;
        const max = s.scrollWidth - s.clientWidth;
        const l = max > 1 && s.scrollLeft > 4;
        const r = max > 1 && s.scrollLeft < max - 4;
        setMore((m) => (m.l === l && m.r === r ? m : { l, r }));
    }, []);

    const panTarget = useCallback((lonlat) => {
        const s = stageRef.current;
        if (!s) return null;
        const [x] = project(lonlat);
        return (x / width) * s.scrollWidth;
    }, [project, width]);

    // open each frame on the place the gods were first named (or on the open
    // place, if there is one)
    useLayoutEffect(() => {
        const s = stageRef.current;
        if (!s) return undefined;
        if (s.scrollWidth > s.clientWidth + 1) {
            const a = activeRef.current;
            const px = panTarget(a && inFrame(frame, a) ? [a.lon, a.lat] : OPEN_ON[view]);
            s.scrollLeft = px - s.clientWidth / 2;
        }
        const measure = () => {
            const svg = s.querySelector('svg');
            if (svg) {
                const w = svg.getBoundingClientRect().width;
                if (w > 0) setMapScale((m) => (Math.abs(m - w / MAP_WIDTH) > 0.01 ? w / MAP_WIDTH : m));
            }
            updateMore();
        };
        measure();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const ro = new ResizeObserver(measure);
        ro.observe(s);
        return () => ro.disconnect();
    }, [view, data, narrow, frame, panTarget, updateMore]);

    // after a choice, bring what was chosen into view
    useLayoutEffect(() => {
        if (!activeSlug || reveal.n === revealDone.current) return;
        revealDone.current = reveal.n;
        const reduced = prefersReducedMotion();
        const behavior = reduced ? 'instant' : 'smooth';
        const s = stageRef.current;
        const a = sites.find((x) => x.slug === activeSlug);
        if (s && a && inFrame(frame, a) && s.scrollWidth > s.clientWidth + 1) {
            const px = panTarget([a.lon, a.lat]);
            if (px < s.scrollLeft + s.clientWidth * 0.15 || px > s.scrollLeft + s.clientWidth * 0.85) {
                s.scrollTo({ left: px - s.clientWidth / 2, behavior: reveal.src === 'hash' ? 'instant' : behavior });
            }
        }
        if (reveal.src === 'list') {
            plateRef.current?.scrollIntoView({ block: 'start', behavior });
        } else if (reveal.src === 'map') {
            // on a phone the note sits under the map: bring it up
            const n = noteRef.current;
            if (n && getComputedStyle(n).position !== 'absolute') n.scrollIntoView({ block: 'nearest', behavior });
        } else if (reveal.src === 'hash') {
            // after the router's own scroll to the hash, which would leave the
            // dot under the header, show the whole plate
            const p = plateRef.current;
            requestAnimationFrame(() => requestAnimationFrame(() => p?.scrollIntoView({ block: 'start', behavior: 'instant' })));
        }
    }, [reveal, activeSlug, sites, frame, panTarget]);

    if (!data) {
        return <div className="third-lamp-scope edu-page ch-page pw-page" aria-busy="true" style={{ minHeight: '100vh' }}><SiteHeader /></div>;
    }

    const activeXY = active && inFrame(frame, active) && placed.has(active.slug) ? project([active.lon, active.lat]) : null;
    const activeP = activeXY ? placed.get(active.slug) : null;

    const toggleSite = (slug) => (slug === activeSlug ? close() : choose(slug, 'map'));
    const unpeek = (slug) => setPeek((p) => (p === slug ? null : p));

    const toOldWorld = () => {
        setView('oldworld');
        document.getElementById('pw-frame-oldworld')?.focus({ preventScroll: true });
    };

    return (
        <div className="third-lamp-scope edu-page ch-page pw-page">
            <Helmet>
                <title>The Map — The Powers — Three Magi Press</title>
                <meta name="description" content="An interactive map of the cults, oracles, visions and schools of the powers: Uruk to Teotihuacan, Delphi to Ise, Qumran to Mortlake." />
            </Helmet>
            <SiteHeader />
            <PortalHero door image={SECTION_BY_SLUG.map?.hero} alt={SECTION_BY_SLUG.map?.heroAlt} effect={SECTION_BY_SLUG.map?.heroEffect}
                focus={SECTION_BY_SLUG.map?.heroFocus}
                emblem={<PortalEmblem name="powers/map" bare />}
                emblemNote={EMBLEMS['powers/map']?.caption}
                kickerLink="/powers" kickerLinkLabel="The Powers"
                kicker="Where They Were Named" title="The Map"
                intro={data.intro ? [data.intro] : []} />
            <main className="edu-main">
                <span className="pw-divider pw-hero-hinge" aria-hidden="true" />

                <div className="ch-map-controls">
                    <div className="pw-map-ctl">
                        <span className="pw-map-ctl-label" id="pw-ctl-era">Filter by era</span>
                        <ChipStrip labelledBy="pw-ctl-era" className="pw-era-row">
                            {ERAS.map((e) => {
                                const [name, dates] = e.label.split(' · ');
                                return (
                                    <button type="button" key={e.key} aria-pressed={era === e.key}
                                        className={`edu-filter${era === e.key ? ' is-active' : ''}`}
                                        onClick={() => setEra(e.key)}>
                                        <span className="pw-era-name">{name}</span>
                                        {dates && <><span className="pw-sep"> · </span><span className="pw-era-dates">{dates}</span></>}
                                    </button>
                                );
                            })}
                        </ChipStrip>
                    </div>
                    <div className="pw-map-ctl">
                        <span className="pw-map-ctl-label" id="pw-ctl-kind">Filter by kind</span>
                        <ChipStrip labelledBy="pw-ctl-kind">
                            <button type="button" aria-pressed={cat === 'all'}
                                className={`edu-filter${cat === 'all' ? ' is-active' : ''}`}
                                onClick={() => setCat('all')}>Everything</button>
                            {cats.map((k) => (
                                <button type="button" key={k} aria-pressed={cat === k}
                                    className={`edu-filter${cat === k ? ' is-active' : ''}`}
                                    onClick={() => setCat(k)}>{CATEGORY_LABEL[k]}</button>
                            ))}
                        </ChipStrip>
                    </div>
                    <div className="pw-map-ctl">
                        <span className="pw-map-ctl-label" id="pw-ctl-frame">Frame</span>
                        <ChipStrip labelledBy="pw-ctl-frame">
                            <button type="button" id="pw-frame-oldworld" aria-pressed={view === 'oldworld'}
                                className={`edu-filter${view === 'oldworld' ? ' is-active' : ''}`}
                                onClick={() => setView('oldworld')}>The Old World</button>
                            <button type="button" aria-pressed={view === 'world'}
                                className={`edu-filter${view === 'world' ? ' is-active' : ''}`}
                                onClick={() => setView('world')}>The World</button>
                            {beyond > 0 && (
                                <button type="button" className="edu-filter ch-map-beyond"
                                    onClick={() => setView('world')}>
                                    {beyond} site{beyond === 1 ? '' : 's'} beyond this frame →
                                </button>
                            )}
                        </ChipStrip>
                    </div>
                </div>

                <div className="pw-map-plate" ref={plateRef}>
                    <div className="pw-map-pan" data-more-left={more.l ? 'true' : 'false'} data-more-right={more.r ? 'true' : 'false'}>
                        <div className="ch-map-stage" ref={stageRef} onScroll={updateMore}>
                            <svg className={`ch-map-svg${era !== 'all' ? ' is-era' : ''}`} viewBox={`0 0 ${width} ${height}`} role="group"
                                aria-label="Map of the powers">
                                <rect className="ch-map-sea" x="0" y="0" width={width} height={height} />
                                {landPaths.map((d, i) => <path key={`l${i}`} className="ch-map-land" d={d} />)}
                                {graticule.map((d, i) => <path key={i} className="ch-map-graticule" d={d} />)}
                                {landPaths.map((d, i) => <path key={`g${i}`} className="ch-map-coastglow" d={d} />)}
                                {landPaths.map((d, i) => <path key={`c${i}`} className="ch-map-coastline" d={d} />)}
                                {oldBox && (
                                    <>
                                        <rect className="ch-map-oldframe" x={oldBox.x0} y={oldBox.y0}
                                            width={oldBox.x1 - oldBox.x0} height={oldBox.y1 - oldBox.y0}
                                            role="button" tabIndex={0} aria-label="The Old World"
                                            onClick={toOldWorld}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toOldWorld(); }
                                            }} />
                                        <text className="ch-map-oldframe-label" x={oldBox.lx} y={oldBox.ly}
                                            style={{ fontSize: oldBox.lfs }} aria-hidden="true">The Old World</text>
                                    </>
                                )}
                                {ghosts.map((s) => {
                                    const [x, y] = project([s.lon, s.lat]);
                                    return <circle key={`gh-${s.slug}`} className="ch-map-ghost" cx={x} cy={y} r={Number((2 * k * 0.97).toFixed(1))} aria-hidden="true" />;
                                })}
                                {visible.map((s) => {
                                    const [x, y] = project([s.lon, s.lat]);
                                    const isActive = s.slug === activeSlug;
                                    return (
                                        <g key={s.slug} id={s.slug}
                                            className={`ch-map-site${isActive ? ' is-active' : ''}${peek === s.slug ? ' is-peek' : ''}`}
                                            role="button" tabIndex={0}
                                            aria-label={`${s.name}, ${yearLabel(s.from)} to ${s.to == null ? 'today' : yearLabel(s.to)}`}
                                            aria-expanded={isActive}
                                            aria-controls={isActive ? 'pw-map-note' : undefined}
                                            onClick={() => toggleSite(s.slug)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSite(s.slug); }
                                            }}
                                            onPointerEnter={() => setPeek(s.slug)}
                                            onPointerLeave={() => unpeek(s.slug)}
                                            onFocus={() => setPeek(s.slug)}
                                            onBlur={() => unpeek(s.slug)}>
                                            <polygon className="ch-map-hit" points={hits.get(s.slug)} />
                                            <circle className="ch-map-ring" cx={x} cy={y} r={ringR} />
                                            <circle className="ch-map-dot" cx={x} cy={y} r={isActive ? activeR : dotR} />
                                        </g>
                                    );
                                })}
                                {/* the names, over every dot; a pointer on a name chooses its
                                    place, and the keyboard reaches each place by its dot */}
                                <g className="ch-map-names" aria-hidden="true">
                                    {visible.map((s) => {
                                        const p = placed.get(s.slug);
                                        const isActive = s.slug === activeSlug;
                                        const isPeek = s.slug === peek;
                                        // a quiet name shows while its place is pointed at or
                                        // focused; the open one is drawn in the seal above
                                        if (p.quiet && (isActive || !isPeek)) return null;
                                        return (
                                            <g key={s.slug}
                                                className={`ch-map-name${p.quiet ? ' is-quiet' : ''}${isActive ? ' is-active' : ''}${isPeek ? ' is-peek' : ''}`}
                                                onClick={p.quiet ? undefined : () => toggleSite(s.slug)}
                                                onPointerEnter={p.quiet ? undefined : () => setPeek(s.slug)}
                                                onPointerLeave={p.quiet ? undefined : () => unpeek(s.slug)}>
                                                {p.leader && <line className="ch-map-leader" x1={p.leader.x1} y1={p.leader.y1} x2={p.leader.x2} y2={p.leader.y2} />}
                                                {!p.quiet && (
                                                    <rect className="ch-map-hit" x={p.box.x0} y={p.box.y0}
                                                        width={p.box.x1 - p.box.x0} height={p.box.y1 - p.box.y0} />
                                                )}
                                                <text className="ch-map-label" textAnchor={p.anchor} x={p.tx} y={p.ty}
                                                    style={{ fontSize: fs }}>{s.name}</text>
                                            </g>
                                        );
                                    })}
                                </g>
                                {activeP && (
                                    // the open place's seal and name, drawn again over its
                                    // neighbours (a copy, so the places keep their order)
                                    <g key={`top-${active.slug}`} className="ch-map-top" aria-hidden="true">
                                        {activeP.leader && <line className="ch-map-leader" x1={activeP.leader.x1} y1={activeP.leader.y1} x2={activeP.leader.x2} y2={activeP.leader.y2} />}
                                        <circle className="ch-map-ring" cx={activeXY[0]} cy={activeXY[1]} r={ringR} />
                                        <circle className="ch-map-dot" cx={activeXY[0]} cy={activeXY[1]} r={activeR} />
                                        <text className="ch-map-label" textAnchor={activeP.anchor} x={activeP.tx} y={activeP.ty}
                                            style={{ fontSize: fs }}>{active.name}</text>
                                    </g>
                                )}
                            </svg>
                        </div>
                        <span className="pw-map-more is-left" aria-hidden="true">‹</span>
                        <span className="pw-map-more is-right" aria-hidden="true">›</span>
                    </div>

                    {active && (
                        <aside ref={noteRef} id="pw-map-note"
                            className={`ch-map-panel pw-map-note${activeXY && activeXY[0] > width * 0.6 ? ' is-left' : ''}`}
                            aria-labelledby="pw-map-note-h" aria-live="polite">
                            <button type="button" className="ch-map-close" onClick={close} aria-label="Close">×</button>
                            <h2 id="pw-map-note-h">{active.name}
                                <span className="pw-map-note-dates"><span className="pw-sep"> · </span>{spanLabel(active)}</span>
                            </h2>
                            {active.modern && <p className="ch-selfname">Now: <strong>{active.modern}</strong></p>}
                            <p className="ch-map-blurb"><Rich t={active.blurb} /></p>
                            {active.events?.length > 0 && (
                                <ul className="ch-map-events">
                                    {active.events.map((e, i) => (
                                        <li key={i}>
                                            <span className="ch-map-eyear">{yearLabel(e.year)}</span>
                                            <span className="ch-map-etext">
                                                <span className="ch-map-etitle"><span className="pw-vh-dash" aria-hidden="true"> — </span>{e.title}.</span>{' '}
                                                <span className="ch-map-edesc"><Rich t={e.desc} /></span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </aside>
                    )}
                </div>

                <p className="edu-kinship-legend">
                    Real coastline and real coordinates: the land is Natural Earth
                    data clipped to each frame, and one map holds Uruk and Teotihuacan
                    alike.
                    Choose an era to watch the population change.
                </p>

                <section className="pw-gazetteer" aria-label="The places">
                    {ERAS.filter((e) => e.key !== 'all').map((e) => {
                        const list = filtered
                            .filter((s) => Math.max(s.from, -3200) >= e.from && s.from < e.to)
                            .sort((a, b) => a.from - b.from);
                        if (!list.length) return null;
                        const [name, dates] = e.label.split(' · ');
                        return (
                            <div className="pw-gaz-group" key={e.key}>
                                <h2 className="pw-gaz-era">
                                    <span className="pw-gaz-era-name">{name}</span>
                                    {dates && <><span className="pw-sep"> · </span><span className="pw-gaz-era-dates">{dates}</span></>}
                                </h2>
                                <ul>
                                    {list.map((s) => (
                                        <li key={s.slug}>
                                            <button type="button"
                                                className={`pw-gaz-row${s.slug === activeSlug ? ' is-active' : ''}`}
                                                aria-pressed={s.slug === activeSlug}
                                                onClick={() => {
                                                    if (!inFrame(frame, s)) setView('world');
                                                    choose(s.slug, 'list');
                                                }}>
                                                <span className="pw-gaz-name">{s.name}</span>
                                                <span className="pw-gaz-dates">{spanLabel(s)}</span>
                                                {s.modern && <span className="pw-gaz-modern">{s.modern}</span>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </section>
            </main>
            <SiteFooter />
        </div>
    );
}

export default PowersMapPage;

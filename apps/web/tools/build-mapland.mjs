#!/usr/bin/env node
// Emits src/data/mapland.js — real coastlines for the portal maps.
//
// The maps were drawn by hand: fifteen coarse paths for the Mediterranean and
// nothing at all for the world frames. This replaces that with Natural Earth
// land polygons, clipped to each map's own frame, simplified, and baked into
// a module at build time — so nothing is fetched at runtime and the CSP stays
// untouched.
//
// Resolution is chosen per frame: a regional frame spanning sixty degrees of
// longitude gets 1:10m detail, a world frame spanning two hundred and seventy
// gets 1:50m, because at that scale the extra vertices are invisible weight.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const web = path.resolve(here, '..');

// The frames the map components declare. Kept in step with them by the
// validator, which fails the build if a frame here has no counterpart there.
const FRAMES = {
    // Christianities
    cradle: { minLon: -12, maxLon: 52, minLat: 8, maxLat: 60, res: '10m', minArea: 0.02 },
    chWorld: { minLon: -125, maxLon: 145, minLat: -38, maxLat: 66, res: '50m', minArea: 0.6 },
    // The Powers
    oldworld: { minLon: -12, maxLon: 80, minLat: 6, maxLat: 62, res: '10m', minArea: 0.03 },
    pwWorld: { minLon: -125, maxLon: 145, minLat: -38, maxLat: 66, res: '50m', minArea: 0.6 },
};

const topo = {
    '10m': require('world-atlas/land-10m.json'),
    '50m': require('world-atlas/land-50m.json'),
};
const land = Object.fromEntries(
    Object.entries(topo).map(([k, t]) => [k, feature(t, t.objects.land)]),
);

// --- Sutherland–Hodgman against each edge of the (convex) frame -------------
const clipEdge = (ring, keep, intersect) => {
    const out = [];
    for (let i = 0; i < ring.length; i++) {
        const cur = ring[i];
        const prev = ring[(i + ring.length - 1) % ring.length];
        const curIn = keep(cur);
        const prevIn = keep(prev);
        if (curIn) {
            if (!prevIn) out.push(intersect(prev, cur));
            out.push(cur);
        } else if (prevIn) {
            out.push(intersect(prev, cur));
        }
    }
    return out;
};

function clipToFrame(ring, f) {
    const lerpX = (a, b, x) => [x, a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0])];
    const lerpY = (a, b, y) => [a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]), y];
    let r = ring;
    r = clipEdge(r, (p) => p[0] >= f.minLon, (a, b) => lerpX(a, b, f.minLon));
    if (!r.length) return r;
    r = clipEdge(r, (p) => p[0] <= f.maxLon, (a, b) => lerpX(a, b, f.maxLon));
    if (!r.length) return r;
    r = clipEdge(r, (p) => p[1] >= f.minLat, (a, b) => lerpY(a, b, f.minLat));
    if (!r.length) return r;
    r = clipEdge(r, (p) => p[1] <= f.maxLat, (a, b) => lerpY(a, b, f.maxLat));
    return r;
}

// Shoelace, in square degrees — good enough to drop specks at this scale.
const area = (ring) => {
    let a = 0;
    for (let i = 0, n = ring.length; i < n; i++) {
        const [x1, y1] = ring[i];
        const [x2, y2] = ring[(i + 1) % n];
        a += x1 * y2 - x2 * y1;
    }
    return Math.abs(a / 2);
};

// Douglas–Peucker, so a coastline keeps its character at a fraction of the
// vertices. Tolerance is in degrees and scales with the frame's span.
function simplify(ring, tol) {
    if (ring.length < 4) return ring;
    const sqTol = tol * tol;
    const sqSegDist = (p, a, b) => {
        let [x, y] = a;
        let dx = b[0] - x;
        let dy = b[1] - y;
        if (dx !== 0 || dy !== 0) {
            const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
            if (t > 1) { [x, y] = b; } else if (t > 0) { x += dx * t; y += dy * t; }
        }
        dx = p[0] - x; dy = p[1] - y;
        return dx * dx + dy * dy;
    };
    const keep = new Uint8Array(ring.length);
    keep[0] = keep[ring.length - 1] = 1;
    const stack = [[0, ring.length - 1]];
    while (stack.length) {
        const [first, last] = stack.pop();
        let maxSq = 0; let index = -1;
        for (let i = first + 1; i < last; i++) {
            const sq = sqSegDist(ring[i], ring[first], ring[last]);
            if (sq > maxSq) { maxSq = sq; index = i; }
        }
        if (maxSq > sqTol && index > 0) {
            keep[index] = 1;
            stack.push([first, index], [index, last]);
        }
    }
    return ring.filter((_, i) => keep[i]);
}

const out = {};
const report = [];
for (const [name, f] of Object.entries(FRAMES)) {
    const span = f.maxLon - f.minLon;
    const tol = span / 1400;          // finer for regional frames, coarser for world
    const rings = [];
    let rawVerts = 0;
    for (const feat of land[f.res].features) {
        const polys = feat.geometry.type === 'Polygon'
            ? [feat.geometry.coordinates]
            : feat.geometry.coordinates;
        for (const poly of polys) {
            for (const ring of poly) {          // outer ring and any holes
                rawVerts += ring.length;
                const clipped = clipToFrame(ring, f);
                if (clipped.length < 4) continue;
                if (area(clipped) < f.minArea) continue;
                const simple = simplify(clipped, tol)
                    .map(([lon, lat]) => [Math.round(lon * 100) / 100, Math.round(lat * 100) / 100]);
                if (simple.length >= 4) rings.push(simple);
            }
        }
    }
    out[name] = rings;
    const verts = rings.reduce((n, r) => n + r.length, 0);
    report.push(`${name}: ${rings.length} rings, ${verts} pts (from ${rawVerts} at ${f.res})`);
}

// Split per portal so a map page never downloads the other portal's frames.
const BUNDLES = {
    'christianities/mapland.js': { cradle: out.cradle, world: out.chWorld },
    'powers/mapland.js': { oldworld: out.oldworld, world: out.pwWorld },
};
const sizes = [];
for (const [rel, data] of Object.entries(BUNDLES)) {
    const body = `// GENERATED by tools/build-mapland.mjs — do not edit.
// Natural Earth land polygons (world-atlas), clipped to this map's frames,
// simplified with Douglas–Peucker and rounded to two decimals. Coordinates
// are [lon, lat]; the map component projects them itself.
export default ${JSON.stringify(data)};
`;
    writeFileSync(path.join(web, 'src/data', rel), body, 'utf8');
    sizes.push(`${rel.split('/')[0]} ${(body.length / 1024).toFixed(0)}KB`);
}
console.log(`map land: ${sizes.join(', ')} — ${report.join(' · ')}`);

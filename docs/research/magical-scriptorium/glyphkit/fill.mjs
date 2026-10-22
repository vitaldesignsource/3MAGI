// The geometry of a filled glyph ({ fill: "<SVG path data>" }, README.md):
// its parser, its exact ink box and the crossings of its outlines. check.mjs
// uses it; a tracer can import it too.
//
// A fill is absolute M L C Q Z only, every subpath closed with Z, drawn with
// fill-rule evenodd in the 0–100 viewBox.

export const FILL_ARGS = { M: 2, L: 2, C: 6, Q: 4, Z: 0 };
export const BODY = { x0: 10, y0: 15, x1: 90, y1: 85 };
const TOKEN = /[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g;
const LEFTOVER = /[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?|[\s,]/g;

// Parse a fill into its subpaths, or throw with the reason. Each subpath is
// { start: [x, y], segs: [{ c: 'L' | 'C' | 'Q', p: [[x, y], …] }] }, where p
// starts with the segment's start point (a line has 2 points, a quadratic 3,
// a cubic 4). Pairs after M are lines, as in SVG.
export function parseFill(d) {
    if (typeof d !== 'string' || !d.trim()) throw new Error('the fill is empty');
    const leftover = d.replace(LEFTOVER, '');
    if (leftover) throw new Error(`unexpected characters "${leftover.slice(0, 20)}"`);
    const toks = d.match(TOKEN) || [];
    const isCmd = (t) => /^[A-Za-z]$/.test(t);
    const subs = [];
    let i = 0, sub = null, cur = null;
    while (i < toks.length) {
        const c = toks[i++];
        if (!isCmd(c)) throw new Error(`number "${c}" where a command was expected`);
        if (!(c in FILL_ARGS)) throw new Error(`command "${c}" is not allowed in a fill (absolute M L C Q Z only)`);
        if (c === 'Z') {
            if (!sub) throw new Error(subs.length ? `a second Z after subpath ${subs.length} was closed` : 'path must start with M');
            if (!sub.segs.length) throw new Error(`subpath ${subs.length} is closed with nothing drawn`);
            sub.closed = true;
            cur = sub.start;
            sub = null;
            continue;
        }
        if (c === 'M') {
            if (sub) throw new Error(`subpath ${subs.length} is not closed with Z before the next M`);
        } else if (!sub) {
            throw new Error(subs.length ? `"${c}" after Z: every subpath begins with M` : 'path must start with M');
        }
        const n = FILL_ARGS[c];
        let first = true;
        while (first || (i < toks.length && !isCmd(toks[i]))) {
            const nums = toks.slice(i, i + n).map(Number);
            if (nums.length < n || nums.some((x) => !Number.isFinite(x)) || toks.slice(i, i + n).some(isCmd)) throw new Error(`"${c}" needs ${n} numbers`);
            i += n;
            const pts = [];
            for (let k = 0; k < n; k += 2) pts.push([nums[k], nums[k + 1]]);
            if (c === 'M' && first) {
                sub = { start: pts[0], segs: [], closed: false };
                subs.push(sub);
                cur = pts[0];
            } else {
                const kind = c === 'M' ? 'L' : c;
                sub.segs.push({ c: kind, p: [cur, ...pts] });
                cur = pts[pts.length - 1];
            }
            first = false;
        }
    }
    if (sub) throw new Error(`subpath ${subs.length} is not closed with Z`);
    return subs;
}

// every number pair the fill gives: end points and control points
export const fillCoords = (subs) => subs.flatMap((s) => [s.start, ...s.segs.flatMap((g) => g.p.slice(1))]);

// the roots in (0, 1) of a t² + b t + c
function roots01(a, b, c) {
    const out = [];
    if (Math.abs(a) < 1e-12) { if (Math.abs(b) > 1e-12) out.push(-c / b); }
    else {
        const disc = b * b - 4 * a * c;
        if (disc >= 0) { const s = Math.sqrt(disc); out.push((-b + s) / (2 * a), (-b - s) / (2 * a)); }
    }
    return out.filter((t) => t > 0 && t < 1);
}
export function pointAt(seg, t) {
    const p = seg.p, u = 1 - t;
    if (seg.c === 'L') return [u * p[0][0] + t * p[1][0], u * p[0][1] + t * p[1][1]];
    if (seg.c === 'Q') return [0, 1].map((k) => u * u * p[0][k] + 2 * u * t * p[1][k] + t * t * p[2][k]);
    return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]);
}

// The exact box of the ink: every end point and every extremum of a curve
// (where its derivative is 0 on an axis), so a curve bulging past its end
// points is measured where it bulges.
export function fillBox(subs) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    const grow = ([x, y]) => { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); };
    for (const s of subs) {
        grow(s.start);
        for (const g of s.segs) {
            grow(g.p[g.p.length - 1]);
            const ts = [];
            for (const k of [0, 1]) {
                const v = g.p.map((q) => q[k]);
                if (g.c === 'Q') ts.push(...roots01(0, 2 * (v[0] - 2 * v[1] + v[2]), 2 * (v[1] - v[0])));
                if (g.c === 'C') {
                    const a = v[1] - v[0], b = v[2] - v[1], c = v[3] - v[2];
                    ts.push(...roots01(a - 2 * b + c, 2 * (b - a), a));
                }
            }
            for (const t of ts) grow(pointAt(g, t));
        }
    }
    return Number.isFinite(x0) ? { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 } : null;
}

// A subpath as a closed polyline (each curve in n pieces).
export function flatten(sub, n = 24) {
    const pts = [sub.start];
    for (const g of sub.segs) {
        if (g.c === 'L') pts.push(g.p[1]);
        else for (let k = 1; k <= n; k++) pts.push(pointAt(g, k / n));
    }
    return pts;
}

// Does a closed polyline enclose any area (some point off the line through
// the two points farthest apart)?
export function enclosesArea(pts) {
    let a = pts[0], b = a, far = 0;
    for (const p of pts) { const d = Math.hypot(p[0] - a[0], p[1] - a[1]); if (d > far) { far = d; b = p; } }
    if (far < 1e-6) return false;
    return pts.some((p) => Math.abs((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])) / far > 1e-3);
}

// The area a fill draws, filled evenodd: on rows 0.1 unit apart across its
// box, the crossings of every subpath's edges (curves in 24 steps) sorted and
// taken in pairs, each pair a run of ink. Subpaths that cancel (one shape
// given twice, or a counter the size of its outline) draw nothing, though
// each encloses some area.
export function evenOddArea(subs) {
    const edges = [];
    for (const s of subs) {
        const pts = flatten(s);
        for (let i = 0; i < pts.length; i++) edges.push([pts[i], pts[(i + 1) % pts.length]]);
    }
    if (!edges.length) return 0;
    const ys = edges.flatMap(([a, b]) => [a[1], b[1]]);
    const y0 = Math.min(...ys), y1 = Math.max(...ys), h = 0.1;
    let area = 0;
    for (let y = y0 + h / 2; y < y1; y += h) {
        const xs = [];
        for (const [a, b] of edges) {
            if ((a[1] <= y && y < b[1]) || (b[1] <= y && y < a[1])) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
        }
        xs.sort((p, q) => p - q);
        for (let k = 0; k + 1 < xs.length; k += 2) area += (xs[k + 1] - xs[k]) * h;
    }
    return area;
}

// Subpaths that cancel ink under evenodd though the fill as a whole draws
// something (README.md, "Filled glyphs"). A subpath given twice (the same
// points in the same order) draws nothing, wherever it stands. And every
// subpath must stand apart from the others or wholly inside one of them: then
// each adds its own area to the ink or, a counter, takes it away, as the number
// of subpaths around it is even or odd, and the ink is the sum of those areas.
// Where two subpaths overlap in part, the overlap is left empty and the ink
// falls short of that sum. Returns the problems found, as strings.
export function cancelledSubpaths(subs) {
    const out = [];
    const key = (s) => JSON.stringify([s.start, ...s.segs.map((g) => [g.c, ...g.p.slice(1)])]);
    const seen = new Map();
    subs.forEach((s, k) => {
        const id = key(s);
        if (seen.has(id)) out.push(`fill subpaths ${seen.get(id) + 1} and ${k + 1} are the same shape: under evenodd the two cancel and draw nothing`);
        else seen.set(id, k);
    });
    if (out.length || subs.length < 2) return out;
    const polys = subs.map((s) => flatten(s));
    const inside = ([x, y], P) => {
        let c = false;
        for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
            const [xi, yi] = P[i], [xj, yj] = P[j];
            if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
        }
        return c;
    };
    const sum = subs.reduce((t, s, k) => {
        const around = polys.filter((P, j) => j !== k && inside(polys[k][0], P)).length;
        return t + (around % 2 ? -1 : 1) * evenOddArea([s]);
    }, 0);
    const ink = evenOddArea(subs);
    if (Math.abs(sum - ink) > Math.max(0.5, 0.01 * Math.abs(sum))) {
        out.push('fill subpaths overlap one another in part: each must stand apart from the others or wholly inside one, or under evenodd the overlap is left empty');
    }
    return out;
}

// The places where outlines cross: under evenodd two ink subpaths that
// overlap leave their overlap EMPTY, and a subpath that crosses itself
// leaves a hole where it does. A counter lies wholly inside its outline and
// crosses nothing. Returns [{ a, b }] (subpath numbers from 1; a === b for a
// subpath crossing itself), each pair once.
export function fillCrossings(subs) {
    const polys = subs.map((s) => flatten(s, 32));
    const segs = polys.map((pts) => pts.map((p, k) => [p, pts[(k + 1) % pts.length]]).filter(([p, q]) => p[0] !== q[0] || p[1] !== q[1]));
    const orient = (p, q, r) => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0]);
    const cross = ([p, q], [r, s]) => {
        const d1 = orient(r, s, p), d2 = orient(r, s, q), d3 = orient(p, q, r), d4 = orient(p, q, s);
        const e = 1e-9;
        return ((d1 > e && d2 < -e) || (d1 < -e && d2 > e)) && ((d3 > e && d4 < -e) || (d3 < -e && d4 > e));
    };
    const box = (sg) => sg.map(([p, q]) => [Math.min(p[0], q[0]), Math.min(p[1], q[1]), Math.max(p[0], q[0]), Math.max(p[1], q[1])]);
    const boxes = segs.map(box);
    const meets = (A, B) => A[0] <= B[2] && B[0] <= A[2] && A[1] <= B[3] && B[1] <= A[3];
    const found = [];
    for (let a = 0; a < segs.length; a++) {
        for (let b = a; b < segs.length; b++) {
            let hit = false;
            for (let i = 0; i < segs[a].length && !hit; i++) {
                for (let j = a === b ? i + 2 : 0; j < segs[b].length && !hit; j++) {
                    if (a === b && i === 0 && j === segs[a].length - 1) continue; // the closing segment meets the first
                    if (meets(boxes[a][i], boxes[b][j]) && cross(segs[a][i], segs[b][j])) hit = true;
                }
            }
            if (hit) found.push({ a: a + 1, b: b + 1 });
        }
    }
    return found;
}

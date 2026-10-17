import React, { useMemo, useState } from 'react';
import LAND from '../../data/christianities/mapland';
import Rich from './rich';

// Where it happened. Two layers on the same real coastline as the
// Christianities map (tools/build-mapland.mjs), through the same projection:
//
//   claimed     the Fama's journey for Frater C.R.C., and the places that
//               exist in the story only as claims — drawn dashed, in gold
//   documented  where things verifiably happened — solid, numbered
//
// A stage the text does not locate is never pinned. It is drawn as a dashed
// ring over the region the text names, and its label says so: Damcar is "in
// Arabia" in the Fama and nowhere on any map. The map keeps the page's rule.

const FRAME = { minLon: -11, maxLon: 50, minLat: 17, maxLat: 57 };
const WIDTH = 980;

function makeProjector(frame, width) {
    const midLat = (frame.minLat + frame.maxLat) / 2;
    const kx = Math.cos((midLat * Math.PI) / 180);
    const scale = width / ((frame.maxLon - frame.minLon) * kx);
    const height = (frame.maxLat - frame.minLat) * scale;
    const project = ([lon, lat]) => [(lon - frame.minLon) * kx * scale, (frame.maxLat - lat) * scale];
    return { project, height };
}

const pathFor = (project, pts) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${project(p)[0].toFixed(1)},${project(p)[1].toFixed(1)}`).join(' ') + ' Z';

const at = (p) => {
    if (!p.located && p.region) return [p.region.lon, p.region.lat];
    return p.lat != null && p.lon != null ? [p.lon, p.lat] : null;
};

// Each leg of the journey is a gentle curve, not a straight line: the route is
// schematic (the Fama gives stations, not roads), and a curve says so. A stage
// may carry \`bend\` for the leg that arrives at it — the sea passage to Fez
// arcs out over the Mediterranean, as the Fama says he sailed it.
function routeFor(points, bends) {
    return points.map(([x, y], i) => {
        if (i === 0) return `M${x.toFixed(1)},${y.toFixed(1)}`;
        const [px, py] = points[i - 1];
        const dx = x - px; const dy = y - py; const len = Math.hypot(dx, dy) || 1;
        const k = (bends[i] ?? 0.1) * len;
        const cx = (px + x) / 2 + (-dy / len) * k; const cy = (py + y) / 2 + (dx / len) * k;
        return `Q${cx.toFixed(1)},${cy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
}

// Where markers would sit on top of one another, the marker is moved a few
// units (\`nudge\`) and a hairline runs back to the true position.
const nudged = (xy, p) => (p.nudge ? [xy[0] + p.nudge[0], xy[1] + p.nudge[1]] : xy);

function RosicrucianMap({ map }) {
    const { project, height } = useMemo(() => makeProjector(FRAME, WIDTH), []);
    const land = useMemo(() => LAND.cradle.map((poly) => pathFor(project, poly)), [project]);
    const [active, setActive] = useState(null);

    const journey = map.journey ?? [];
    const others = map.places ?? [];
    const documented = others.filter((p) => p.layer === 'documented');
    const claimed = others.filter((p) => p.layer === 'claimed');
    const number = Object.fromEntries(documented.map((p, i) => [p.key, i + 1]));

    // The journey's line runs through every stage that has a point, located or
    // regional, in the order the Fama gives.
    const legs = journey.filter((p) => at(p));
    const routeD = routeFor(legs.map((p) => project(at(p))), legs.map((p) => p.bend));

    const label = (p, [x, y], extra = {}) => (
        <text x={x + (extra.dx ?? 9)} y={y + (extra.dy ?? 4)} className={`rcm-label${extra.cls ? ' ' + extra.cls : ''}`}
            textAnchor={extra.anchor ?? 'start'}>{extra.text ?? p.name}</text>
    );

    const pick = (k) => setActive((a) => (a === k ? null : k));
    // Hover previews only for a mouse: a touch fires enter and then click, and
    // the click would toggle the place straight back off.
    const hover = (k) => (e) => { if (e.pointerType === 'mouse') setActive(k); };
    const activePlace = [...journey, ...others].find((p) => p.key === active) || null;

    return (
        <div className="ch-rc-map">
            <figure className="ch-rc-map-figure">
                <div className="ch-rc-map-pan">
                    <svg viewBox={`0 0 ${WIDTH} ${height.toFixed(0)}`} className="ch-rc-map-svg" role="img"
                        aria-label="A map of Europe, North Africa and the Near East. A dashed gold line traces the journey the Fama gives Christian Rosenkreuz; numbered points mark the places where the Rosicrucian story verifiably happened.">
                        <defs>
                            <clipPath id="rcm-clip"><rect width={WIDTH} height={height} /></clipPath>
                        </defs>
                        <rect width={WIDTH} height={height} className="rcm-sea" />
                        <g clipPath="url(#rcm-clip)">
                            {land.map((d, i) => <path key={i} d={d} className="rcm-land" />)}
                            {/* the claimed journey */}
                            <path d={routeD} className="rcm-route" />
                            {journey.map((p) => {
                                const xy = at(p) && project(at(p));
                                if (!xy) return null;
                                const regional = !p.located;
                                return (
                                    <g key={p.key} className={`rcm-pt is-claimed${active === p.key ? ' is-active' : ''}`}
                                        onClick={() => pick(p.key)} onPointerEnter={hover(p.key)} tabIndex={0}
                                        onKeyDown={(e) => { if (e.key === 'Enter') pick(p.key); }} role="button" aria-label={`${p.name}: ${p.note}`}>
                                        {regional
                                            ? <circle cx={xy[0]} cy={xy[1]} r={p.region?.r ?? 26} className="rcm-region" />
                                            : <circle cx={xy[0]} cy={xy[1]} r="5.5" className="rcm-dot" />}
                                        {label(p, xy, p.labelAt ?? {})}
                                    </g>
                                );
                            })}
                            {/* places that exist only as claims */}
                            {claimed.map((p) => {
                                const xy = at(p) && project(at(p));
                                if (!xy) return null;
                                const m = nudged(xy, p);
                                return (
                                    <g key={p.key} className={`rcm-pt is-claimed${active === p.key ? ' is-active' : ''}`}
                                        onClick={() => pick(p.key)} onPointerEnter={hover(p.key)} tabIndex={0}
                                        onKeyDown={(e) => { if (e.key === 'Enter') pick(p.key); }} role="button" aria-label={`${p.name} (claimed): ${p.note}`}>
                                        {p.nudge && <><line x1={xy[0]} y1={xy[1]} x2={m[0]} y2={m[1]} className="rcm-leader" /><circle cx={xy[0]} cy={xy[1]} r="1.8" className="rcm-true" /></>}
                                        <circle cx={m[0]} cy={m[1]} r="6.5" className="rcm-ring" />
                                        {label(p, m, p.labelAt ?? {})}
                                    </g>
                                );
                            })}
                            {/* the documented places, numbered */}
                            {documented.map((p) => {
                                const xy = at(p) && project(at(p));
                                if (!xy) return null;
                                return (
                                    <g key={p.key} className={`rcm-pt is-documented${active === p.key ? ' is-active' : ''}`}
                                        onClick={() => pick(p.key)} onPointerEnter={hover(p.key)} tabIndex={0}
                                        onKeyDown={(e) => { if (e.key === 'Enter') pick(p.key); }} role="button" aria-label={`${number[p.key]}. ${p.name}: ${p.note}`}>
                                        {p.nudge && <><line x1={xy[0]} y1={xy[1]} x2={nudged(xy, p)[0]} y2={nudged(xy, p)[1]} className="rcm-leader is-doc" /><circle cx={xy[0]} cy={xy[1]} r="1.8" className="rcm-true is-doc" /></>}
                                        <circle cx={nudged(xy, p)[0]} cy={nudged(xy, p)[1]} r="8.5" className="rcm-num-bg" />
                                        <text x={nudged(xy, p)[0]} y={nudged(xy, p)[1] + 3.6} textAnchor="middle" className="rcm-num">{number[p.key]}</text>
                                    </g>
                                );
                            })}
                        </g>
                        <g className="rcm-legend" transform={`translate(18 ${(height - 58).toFixed(0)})`}>
                            <rect width="250" height="44" rx="3" className="rcm-legend-bg" />
                            <path d="M14 15 H52" className="rcm-route" />
                            <text x="62" y="19" className="rcm-legend-t">Claimed — the Fama’s journey, and claims</text>
                            <circle cx="33" cy="31" r="7" className="rcm-num-bg" />
                            <text x="62" y="35" className="rcm-legend-t">Documented — numbered below</text>
                        </g>
                    </svg>
                </div>
                <figcaption className="ch-rc-map-active" aria-live="polite">
                    {activePlace
                        ? <><strong>{activePlace.name}</strong>{activePlace.year ? <span className="ch-rc-map-year"> · {activePlace.year}</span> : null}<span> — <Rich t={activePlace.note} /></span></>
                        : <span className="ch-rc-map-hint">Touch or hover a place for its note<span className="ch-rc-map-swipe">, and swipe the map sideways to reach the East</span>. The list below has them all.</span>}
                </figcaption>
            </figure>

            <div className="ch-rc-map-keys">
                <div className="ch-rc-map-key is-claimed">
                    <h3>Claimed</h3>
                    <ol className="ch-rc-map-list is-journey">
                        {journey.map((p) => (
                            <li key={p.key} className={active === p.key ? 'is-active' : undefined}
                                onPointerEnter={hover(p.key)} onClick={() => pick(p.key)}>
                                <span className="ch-rc-map-name">{p.name}{!p.located && <em className="ch-rc-map-unloc"> — not located</em>}</span>
                                <span className="ch-rc-map-note"><Rich t={p.note} /></span>
                            </li>
                        ))}
                        {claimed.map((p) => (
                            <li key={p.key} className={`is-claim${active === p.key ? ' is-active' : ''}`}
                                onPointerEnter={hover(p.key)} onClick={() => pick(p.key)}>
                                <span className="ch-rc-map-name">{p.name}{p.year && <span className="ch-rc-map-year"> · {p.year}</span>}</span>
                                <span className="ch-rc-map-note"><Rich t={p.note} /></span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="ch-rc-map-key is-documented">
                    <h3>Documented</h3>
                    <ol className="ch-rc-map-list">
                        {documented.map((p) => (
                            <li key={p.key} className={active === p.key ? 'is-active' : undefined}
                                onPointerEnter={hover(p.key)} onClick={() => pick(p.key)}>
                                <span className="ch-rc-map-n" aria-hidden="true">{number[p.key]}</span>
                                <span className="ch-rc-map-name">{p.name}{p.year && <span className="ch-rc-map-year"> · {p.year}</span>}</span>
                                <span className="ch-rc-map-note"><Rich t={p.note} /></span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
}

export default RosicrucianMap;

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

const at = (p) => (p.lat != null && p.lon != null ? [p.lon, p.lat] : p.region ? [p.region.lon, p.region.lat] : null);

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
    const route = journey.map(at).filter(Boolean).map(project);
    const routeD = route.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

    const label = (p, [x, y], extra = {}) => (
        <text x={x + (extra.dx ?? 9)} y={y + (extra.dy ?? 4)} className={`rcm-label${extra.cls ? ' ' + extra.cls : ''}`}
            textAnchor={extra.anchor ?? 'start'}>{extra.text ?? p.name}</text>
    );

    const pick = (k) => setActive((a) => (a === k ? null : k));
    const activePlace = [...journey, ...others].find((p) => p.key === active) || null;

    return (
        <div className="ch-rc-map">
            <figure className="ch-rc-map-figure">
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
                                    onClick={() => pick(p.key)} onMouseEnter={() => setActive(p.key)} tabIndex={0}
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
                            return (
                                <g key={p.key} className={`rcm-pt is-claimed${active === p.key ? ' is-active' : ''}`}
                                    onClick={() => pick(p.key)} onMouseEnter={() => setActive(p.key)} tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter') pick(p.key); }} role="button" aria-label={`${p.name} (claimed): ${p.note}`}>
                                    <circle cx={xy[0]} cy={xy[1]} r="6.5" className="rcm-ring" />
                                    {label(p, xy, p.labelAt ?? {})}
                                </g>
                            );
                        })}
                        {/* the documented places, numbered */}
                        {documented.map((p) => {
                            const xy = at(p) && project(at(p));
                            if (!xy) return null;
                            return (
                                <g key={p.key} className={`rcm-pt is-documented${active === p.key ? ' is-active' : ''}`}
                                    onClick={() => pick(p.key)} onMouseEnter={() => setActive(p.key)} tabIndex={0}
                                    onKeyDown={(e) => { if (e.key === 'Enter') pick(p.key); }} role="button" aria-label={`${number[p.key]}. ${p.name}: ${p.note}`}>
                                    <circle cx={xy[0]} cy={xy[1]} r="8.5" className="rcm-num-bg" />
                                    <text x={xy[0]} y={xy[1] + 3.6} textAnchor="middle" className="rcm-num">{number[p.key]}</text>
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
                <figcaption className="ch-rc-map-active" aria-live="polite">
                    {activePlace
                        ? <><strong>{activePlace.name}</strong>{activePlace.year ? <span className="ch-rc-map-year"> · {activePlace.year}</span> : null}<span> — <Rich t={activePlace.note} /></span></>
                        : <span className="ch-rc-map-hint">Touch or hover a place for its note. The list below has them all.</span>}
                </figcaption>
            </figure>

            <div className="ch-rc-map-keys">
                <div className="ch-rc-map-key is-claimed">
                    <h3>Claimed</h3>
                    <ol className="ch-rc-map-list is-journey">
                        {journey.map((p) => (
                            <li key={p.key} className={active === p.key ? 'is-active' : undefined}
                                onMouseEnter={() => setActive(p.key)} onClick={() => pick(p.key)}>
                                <span className="ch-rc-map-name">{p.name}{!p.located && <em className="ch-rc-map-unloc"> — not located</em>}</span>
                                <span className="ch-rc-map-note"><Rich t={p.note} /></span>
                            </li>
                        ))}
                        {claimed.map((p) => (
                            <li key={p.key} className={`is-claim${active === p.key ? ' is-active' : ''}`}
                                onMouseEnter={() => setActive(p.key)} onClick={() => pick(p.key)}>
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
                                onMouseEnter={() => setActive(p.key)} onClick={() => pick(p.key)}>
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

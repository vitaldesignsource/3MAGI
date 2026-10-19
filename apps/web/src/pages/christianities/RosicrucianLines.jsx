import React, { useMemo, useState } from 'react';
import Rich from './rich';

// The lines: every body that has claimed the name, on one time axis, and
// every link between them drawn in the style of its evidence.
//
// Time runs down the page on a piecewise scale: the decades in which nothing
// was founded are folded small, the crowded years after 1855 are given room,
// and the stretch in which no Rosicrucian body can be shown to exist is drawn
// as a band (lines.gap), not closed up. Each body sits in a column chosen in
// the data (col) so the families read as strands; a body's vertical place is
// its founding year, nudged only by dy where two would collide.
//
// A link's kind is the claim the page makes about it, and the drawing says it
// before the caption does: a warrant is a heavy line, shared members a plain
// one, a schism is dashed, a claim is dotted gold with a question mark, and
// a debt to printed books is a faint grey line.

const WIDTH = 1060;
const TOP = 34;
const COL0 = 150;
const COLW = 165;
const NODE_H = 26;

// [year, y] breakpoints; between them the scale is linear.
const SCALE = [[1600, 0], [1640, 110], [1700, 150], [1720, 180], [1750, 200], [1800, 360], [1855, 410], [1945, 1190]];
const yOf = (year) => {
    if (year <= SCALE[0][0]) return TOP + SCALE[0][1];
    for (let i = 1; i < SCALE.length; i++) {
        const [y0, p0] = SCALE[i - 1];
        const [y1, p1] = SCALE[i];
        if (year <= y1) return TOP + p0 + ((year - y0) / (y1 - y0)) * (p1 - p0);
    }
    return TOP + SCALE[SCALE.length - 1][1];
};
const HEIGHT = TOP + SCALE[SCALE.length - 1][1] + 30;
const TICKS = [1614, 1700, 1750, 1800, 1850, 1875, 1900, 1925];

const nodeW = (b) => 16 + (b.short || b.name).length * 6.3;

function RosicrucianLines({ lines }) {
    const [active, setActive] = useState(null);
    const kinds = Object.fromEntries((lines.kinds ?? []).map((k) => [k.key, k]));
    const bodies = lines.bodies ?? [];
    const links = lines.links ?? [];

    const pos = useMemo(() => Object.fromEntries(bodies.map((b) => [
        b.key, [COL0 + (b.col ?? 0) * COLW, yOf(b.foundedYear) + (b.dy ?? 0)],
    ])), [bodies]);

    const byKey = Object.fromEntries(bodies.map((b) => [b.key, b]));
    const touching = useMemo(() => {
        if (!active) return null;
        const s = new Set([active]);
        for (const l of links) if (l.from === active || l.to === active) { s.add(l.from); s.add(l.to); }
        return s;
    }, [active, links]);

    const pick = (k) => setActive((a) => (a === k ? null : k));
    const hover = (k) => (e) => { if (e.pointerType === 'mouse') setActive(k); };
    const activeBody = active ? byKey[active] : null;
    const linksOf = (k) => links.filter((l) => l.from === k || l.to === k);
    const chronological = [...bodies].sort((a, b) => a.foundedYear - b.foundedYear || a.name.localeCompare(b.name));

    const edgePath = (l) => {
        const [x1, y1] = pos[l.from];
        const [x2, y2] = pos[l.to];
        const a = y1 + NODE_H / 2;
        const b = y2 - NODE_H / 2;
        if (b <= a) {   // same row: run side to side
            const sx = x1 + Math.sign(x2 - x1) * nodeW(byKey[l.from]) / 2;
            const ex = x2 - Math.sign(x2 - x1) * nodeW(byKey[l.to]) / 2;
            return `M${sx},${y1} C${(sx + ex) / 2},${y1 - 18} ${(sx + ex) / 2},${y2 - 18} ${ex},${y2}`;
        }
        const m = (a + b) / 2;
        return `M${x1},${a} C${x1},${m} ${x2},${m} ${x2},${b}`;
    };

    return (
        <div className="ch-rc-lines">
            <ul className="ch-rc-lines-legend" aria-label="What a link means">
                {(lines.kinds ?? []).map((k) => (
                    <li key={k.key}>
                        <svg viewBox="0 0 46 12" width="46" height="12" aria-hidden="true"><path d="M2 6 H44" className={`rcl-link is-${k.key}`} /></svg>
                        <span><strong>{k.label}</strong> — {k.note}</span>
                    </li>
                ))}
            </ul>
            <figure className="ch-rc-lines-figure">
                <div className="ch-rc-lines-pan">
                    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="ch-rc-lines-svg" role="img"
                        aria-label="A chart of every body that has claimed the Rosicrucian name, from the manifestos of 1614 to the 1930s, with the links between them drawn by the kind of evidence for each. The full list follows the chart.">
                        <defs>
                            <pattern id="rcl-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="8" className="rcl-hatch" />
                            </pattern>
                            <marker id="rcl-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                                <path d="M0,0 L8,4 L0,8 z" className="rcl-arrowhead" />
                            </marker>
                        </defs>
                        {TICKS.map((t) => (
                            <g key={t} className="rcl-tick">
                                <line x1="58" x2={WIDTH - 8} y1={yOf(t)} y2={yOf(t)} />
                                <text x="50" y={yOf(t) + 4} textAnchor="end">{t}</text>
                            </g>
                        ))}
                        {lines.gap && (
                            <g className="rcl-gap">
                                <rect x="60" y={yOf(lines.gap.from)} width={WIDTH - 68} height={yOf(lines.gap.to) - yOf(lines.gap.from)} fill="url(#rcl-hatch)" />
                                <text x={WIDTH / 2} y={(yOf(lines.gap.from) + yOf(lines.gap.to)) / 2 + 4} textAnchor="middle">{lines.gap.label}</text>
                            </g>
                        )}
                        {links.map((l, i) => {
                            if (!pos[l.from] || !pos[l.to]) return null;
                            const lit = touching && (l.from === active || l.to === active);
                            const dim = touching && !lit;
                            return (
                                <g key={i} className={`rcl-edge${lit ? ' is-lit' : ''}${dim ? ' is-dim' : ''}`}>
                                    <path d={edgePath(l)} className={`rcl-link is-${l.kind}`} markerEnd="url(#rcl-arrow)" />
                                </g>
                            );
                        })}
                        {bodies.map((b) => {
                            const [x, y] = pos[b.key];
                            const w = nodeW(b);
                            const dim = touching && !touching.has(b.key);
                            return (
                                <g key={b.key} className={`rcl-node is-${b.family}${active === b.key ? ' is-active' : ''}${dim ? ' is-dim' : ''}`}
                                    onClick={() => pick(b.key)} onPointerEnter={hover(b.key)} tabIndex={0} role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(b.key); } }}
                                    aria-label={`${b.name}, ${b.founded}, ${b.place}`}>
                                    <rect x={x - w / 2} y={y - NODE_H / 2} width={w} height={NODE_H} rx="13" />
                                    <text x={x} y={y + 4} textAnchor="middle">{b.short || b.name}</text>
                                    <text x={x} y={y + NODE_H / 2 + 11} textAnchor="middle" className="rcl-year">{b.founded}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
                <figcaption className="ch-rc-map-active ch-rc-lines-active" aria-live="polite">
                    {activeBody ? (
                        <>
                            <strong>{activeBody.name}</strong>
                            <span className="ch-rc-map-year"> · {activeBody.founded}{activeBody.ended ? `–${activeBody.ended}` : ''} · {activeBody.place}</span>
                            <span> — <Rich t={activeBody.note} /></span>
                        </>
                    ) : <span className="ch-rc-map-hint">Touch or hover a body to see its links. The full list, with the evidence for every link, follows.</span>}
                </figcaption>
            </figure>

            <ol className="ch-rc-lines-list">
                {chronological.map((b) => (
                    <li key={b.key} id={`line-${b.key}`} className={`ch-rc-line is-${b.family}${active === b.key ? ' is-active' : ''}`}>
                        <p className="ch-rc-line-year">{b.founded}</p>
                        <div className="ch-rc-line-body">
                            <h3>{b.name}</h3>
                            <p className="ch-rc-line-meta">{b.place}{b.founders?.length ? ` · ${b.founders.join(', ')}` : ''}{b.ended ? ` · until ${b.ended}` : ''}</p>
                            <p><Rich t={b.note} /></p>
                            {linksOf(b.key).length > 0 && (
                                <ul className="ch-rc-line-links">
                                    {linksOf(b.key).map((l, i) => {
                                        const out = l.from === b.key;
                                        const other = byKey[out ? l.to : l.from];
                                        return (
                                            <li key={i} className={`is-${l.kind}`}>
                                                <span className="ch-rc-line-kind">{kinds[l.kind]?.label ?? l.kind}</span>
                                                {' '}{out ? 'to' : 'from'}{' '}
                                                <a href={`#line-${other?.key}`} onClick={() => setActive(other?.key)}>{other?.name}</a>
                                                {l.year ? <span className="ch-rc-map-year"> · {l.year}</span> : null}
                                                <span className="ch-rc-line-note"> — <Rich t={l.note} /></span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                            {b.source && <p className="ch-rc-line-source"><Rich t={b.source} /></p>}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default RosicrucianLines;

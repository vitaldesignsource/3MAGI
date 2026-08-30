import React, { useMemo, useState } from 'react';

// The Great Tree — the family drawn as a time-axis phylogeny. Every branch is
// a horizontal line from the year it became distinct to today (or to its
// extinction), forking off its parent with an elbow. The dead lines are kept
// deliberately: Marcion's church ran four centuries and the chart is a lie
// without it. Lanes follow depth-first order so children sit beside their
// parents; the x-axis is honest, linear time.

const YEAR_MIN = 0;
const YEAR_MAX = 2060;
const LANE_H = 26;
const PAD_L = 8;
const PAD_R = 150;   // room for labels that trail the living edge
const PAD_T = 34;    // era ruler
const WIDTH = 1500;

const ERA_TICKS = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100,
    1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
const NAMED_TICKS = { 325: 'Nicaea', 451: 'Chalcedon', 1054: 'the Schism', 1517: 'the Reformation' };

function layout(nodes) {
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const kids = new Map();
    let root = null;
    for (const n of nodes) {
        if (n.parent == null) { root = n; continue; }
        if (!kids.has(n.parent)) kids.set(n.parent, []);
        kids.get(n.parent).push(n);
    }
    for (const list of kids.values()) list.sort((a, b) => a.from - b.from || a.label.localeCompare(b.label));
    const lanes = new Map();
    let lane = 0;
    const walk = (n) => {
        lanes.set(n.id, lane++);
        for (const k of kids.get(n.id) ?? []) walk(k);
    };
    if (root) walk(root);
    // Orphans (bad parent id) still get lanes so the chart shows the fault
    // rather than swallowing it; the validator will have failed the build anyway.
    for (const n of nodes) if (!lanes.has(n.id)) lanes.set(n.id, lane++);
    return { byId, lanes, laneCount: lane };
}

function ChristianitiesTree({ tree }) {
    const [activeId, setActiveId] = useState(() => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : '') || null);
    const { byId, lanes, laneCount } = useMemo(() => layout(tree.nodes), [tree]);

    const spanX = WIDTH - PAD_L - PAD_R;
    const x = (year) => PAD_L + ((Math.max(YEAR_MIN, year) - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * spanX;
    const y = (id) => PAD_T + lanes.get(id) * LANE_H + LANE_H / 2;
    const height = PAD_T + laneCount * LANE_H + 12;

    const active = tree.nodes.find((n) => n.id === activeId) || null;

    return (
        <section className="ch-tree" aria-labelledby="ch-tree-heading">
            <header className="edu-section-head">
                <p className="kicker">Descent, With Separations</p>
                <h2 id="ch-tree-heading">The Great Tree</h2>
                {tree.intro.map((p, i) => <p key={i}>{p}</p>)}
            </header>

            <div className="edu-kinship-scroll ch-tree-scroll" role="region"
                aria-label="Family tree of the Christianities" tabIndex={0}>
                <svg className="ch-tree-svg" viewBox={`0 0 ${WIDTH} ${height}`}
                    width={WIDTH} height={height} role="group">
                    {/* era ruler */}
                    {ERA_TICKS.map((yr) => (
                        <g key={yr}>
                            <line className="ch-tree-grid" x1={x(yr)} y1={PAD_T - 6} x2={x(yr)} y2={height} />
                            <text className={`ch-tree-tick${NAMED_TICKS[yr] ? ' is-named' : ''}`}
                                x={x(yr)} y={12} textAnchor="middle">{yr}</text>
                        </g>
                    ))}
                    {Object.entries(NAMED_TICKS).map(([yr, name]) => (
                        <g key={yr}>
                            <line className="ch-tree-grid is-named" x1={x(+yr)} y1={PAD_T - 6} x2={x(+yr)} y2={height} />
                            <text className="ch-tree-tick is-named" x={x(+yr)} y={26} textAnchor="middle">{name}</text>
                        </g>
                    ))}

                    {/* elbows first, so branch lines draw over them */}
                    {tree.nodes.map((n) => {
                        if (n.parent == null || !byId.has(n.parent)) return null;
                        return (
                            <path key={`e-${n.id}`} className="ch-tree-elbow"
                                d={`M${x(n.from)},${y(n.parent)} L${x(n.from)},${y(n.id)}`} />
                        );
                    })}

                    {tree.nodes.map((n) => {
                        const x1 = x(n.from);
                        const x2 = x(n.to ?? YEAR_MAX);
                        const yy = y(n.id);
                        const isActive = n.id === activeId;
                        return (
                            <g key={n.id} id={n.id} className={`ch-tree-node st-${n.status}${isActive ? ' is-active' : ''}`}
                                role="button" tabIndex={0}
                                aria-label={`${n.label}, ${n.from} to ${n.to ?? 'today'}`}
                                aria-pressed={isActive}
                                onClick={() => setActiveId(isActive ? null : n.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault(); setActiveId(isActive ? null : n.id);
                                    }
                                }}>
                                {/* fat invisible hit area */}
                                <line className="ch-tree-hit" x1={x1} y1={yy} x2={x2 + 8} y2={yy} />
                                <line className="ch-tree-line" x1={x1} y1={yy} x2={x2} y2={yy} />
                                {n.status === 'extinct' && (
                                    <line className="ch-tree-end" x1={x2} y1={yy - 4} x2={x2} y2={yy + 4} />
                                )}
                                <circle className="ch-tree-dot" cx={x1} cy={yy} r={2.6} />
                                {/* every line is named at its fork; living lines
                                    are named again at the right edge, where the
                                    reader who scrolled to today is looking */}
                                <text className="ch-tree-label" x={x1 + 8} y={yy - 5}>
                                    {n.label}
                                </text>
                                {n.to == null && (
                                    <text className="ch-tree-label is-trailing" x={x2 + 6} y={yy + 3.5}>
                                        {n.label}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
            <p className="edu-kinship-legend">{tree.legend}</p>

            {active && (
                <aside className="ch-canon-tradnote ch-tree-note" aria-live="polite">
                    <h3>{active.label}
                        <span className="ch-tree-note-dates"> · {active.from}–{active.to ?? 'today'}</span>
                    </h3>
                    {active.selfName && active.selfName !== active.label && (
                        <p className="ch-selfname">Calls itself: <strong>{active.selfName}</strong></p>
                    )}
                    <p>{active.note}</p>
                    {active.adherents && <p className="ch-canon-counts">Today: <strong>{active.adherents}</strong></p>}
                </aside>
            )}
        </section>
    );
}

export default ChristianitiesTree;

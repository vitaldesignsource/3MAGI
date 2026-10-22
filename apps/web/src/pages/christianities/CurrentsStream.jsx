import React, { useMemo, useState } from 'react';

// The Inner Tradition as a stream: every current drawn as a span across a
// time axis, banded by group. It answers a question the entry list cannot —
// what was running at the same time as what — and the answer is often the
// point. The Rhineland preaching and the Beguine trials overlap exactly;
// Ficino's Hermetic pedigree and the Christian Cabala begin within a
// generation of each other; and the whole right-hand edge shows how much of
// this is not historical at all but still going.
//
// A span with no end is drawn to the present with an open arrow, because
// "still running" is a claim the diagram should make visibly.

const YEAR_MIN = 150;
const YEAR_MAX = 2050;
const WIDTH = 1180;
const LANE = 24;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 40;

const TICKS = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
const NAMED = {
    553: 'Origen condemned',
    1310: 'Porete burned',
    1614: 'Casaubon',
};

function CurrentsStream({ data, open, setOpen }) {
    const [hover, setHover] = useState(null);

    const rows = useMemo(() => {
        const out = [];
        for (const g of data.groups) {
            const items = data.entries
                .filter((e) => e.group === g.key)
                .sort((a, b) => a.from - b.from);
            if (items.length) out.push({ group: g, items });
        }
        return out;
    }, [data]);

    const laneCount = rows.reduce((n, r) => n + r.items.length + 1, 0);
    const height = PAD_T + laneCount * LANE + 16;
    const spanX = WIDTH - PAD_L - PAD_R;
    const x = (year) => PAD_L + ((Math.max(YEAR_MIN, Math.min(YEAR_MAX, year)) - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * spanX;

    let lane = 0;
    const laneY = () => PAD_T + lane * LANE + LANE / 2;

    const active = hover || open;

    return (
        <section className="ch-stream" aria-labelledby="ch-stream-heading">
            <header className="edu-section-head">
                <p className="kicker">What Was Running When</p>
                <h2 id="ch-stream-heading">The Currents in Time</h2>
                <p>Every current above, drawn as a span. An arrow at the right
                    means it is still running. Select a span to open its entry —
                    and note how much of the right-hand edge is not history.</p>
            </header>

            <div className="edu-kinship-scroll ch-stream-scroll" role="region"
                aria-label="The inner tradition's currents plotted across time" tabIndex={0}>
                <svg className="ch-stream-svg" viewBox={`0 0 ${WIDTH} ${height}`}
                    width={WIDTH} height={height} role="group">
                    {TICKS.map((t) => (
                        <g key={t}>
                            <line className="ch-stream-grid" x1={x(t)} y1={PAD_T - 10} x2={x(t)} y2={height - 8} />
                            <text className="ch-stream-tick" x={x(t)} y={16} textAnchor="middle">{t}</text>
                        </g>
                    ))}
                    {Object.entries(NAMED).map(([y, label]) => (
                        <g key={y}>
                            <line className="ch-stream-grid is-named" x1={x(+y)} y1={PAD_T - 10} x2={x(+y)} y2={height - 8} />
                            <text className="ch-stream-tick is-named" x={x(+y)} y={32} textAnchor="middle">{label}</text>
                        </g>
                    ))}

                    {rows.map((row) => {
                        const headY = PAD_T + lane * LANE + LANE / 2;
                        lane += 1;
                        return (
                            <g key={row.group.key}>
                                <text className="ch-stream-band" x={PAD_L} y={headY + 3}>
                                    {row.group.label.toUpperCase()}
                                </text>
                                {row.items.map((e) => {
                                    const y = laneY();
                                    lane += 1;
                                    const x0 = x(e.from);
                                    const living = e.to == null;
                                    const x1 = x(living ? YEAR_MAX - 30 : e.to);
                                    const isOn = active === e.slug;
                                    return (
                                        <g key={e.slug}
                                            className={`ch-stream-item${isOn ? ' is-active' : ''}${living ? ' is-living' : ''}`}
                                            role="button" tabIndex={0}
                                            aria-label={`${e.name}, ${e.from} to ${living ? 'today' : e.to}`}
                                            onMouseEnter={() => setHover(e.slug)}
                                            onMouseLeave={() => setHover(null)}
                                            onFocus={() => setHover(e.slug)}
                                            onBlur={() => setHover(null)}
                                            onClick={() => setOpen(open === e.slug ? null : e.slug)}
                                            onKeyDown={(ev) => {
                                                if (ev.key === 'Enter' || ev.key === ' ') {
                                                    ev.preventDefault();
                                                    setOpen(open === e.slug ? null : e.slug);
                                                }
                                            }}>
                                            <line className="ch-stream-hit" x1={x0} y1={y} x2={x1 + 10} y2={y} />
                                            <line className="ch-stream-span" x1={x0} y1={y} x2={x1} y2={y} />
                                            <circle className="ch-stream-dot" cx={x0} cy={y} r={2.8} />
                                            {living
                                                ? <path className="ch-stream-arrow"
                                                    d={`M${x1},${y - 4} L${x1 + 8},${y} L${x1},${y + 4} Z`} />
                                                : <line className="ch-stream-end" x1={x1} y1={y - 4} x2={x1} y2={y + 4} />}
                                            <text className="ch-stream-label" x={x0 + 8} y={y - 5}>{e.name}</text>
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}
                </svg>
            </div>
            <p className="edu-kinship-legend">
                Spans are the conventional scholarly datings for when a current
                was a live movement, not for when its texts were written; an
                arrow means it has never stopped.
            </p>
        </section>
    );
}

export default CurrentsStream;

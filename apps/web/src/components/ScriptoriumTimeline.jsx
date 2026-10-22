import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';

// An interactive timeline for a hall. Events sit on a proportional axis, so
// the eye sees the real shape of a tradition: the long silence between the
// Pyramid Texts and the Book of the Dead, or how much of Kabbalah happens in
// two Castilian centuries. Selecting an event opens its full entry.
//
// Dates are signed integers, negative for BCE, with a `circa` flag and an
// optional `end` for spans. A tradition's own dating and the scholarly one
// often disagree; where they do, the entry carries both rather than picking.

const fmtYear = (y, circa) => {
    const era = y < 0 ? 'BCE' : 'CE';
    const n = Math.abs(y);
    return `${circa ? 'c. ' : ''}${n} ${era}`;
};

// An event may carry `when`: the date in its sources' own words ("8th
// century", "late 19th century"), shown instead of the integer that only
// places it on the axis.
const fmtRange = (e) => (e.when ? e.when : (e.end != null && e.end !== e.year)
    ? `${fmtYear(e.year, e.circa)} – ${fmtYear(e.end, e.circaEnd)}`
    : fmtYear(e.year, e.circa));

// A log-ish scale would distort antiquity; a plain linear axis over the
// tradition's own span keeps proportions honest.
function positions(events) {
    const lo = Math.min(...events.map((e) => e.year));
    const hi = Math.max(...events.map((e) => e.end ?? e.year));
    const span = hi - lo || 1;
    return events.map((e) => ({
        left: ((e.year - lo) / span) * 100,
        width: e.end != null && e.end > e.year ? ((e.end - e.year) / span) * 100 : 0,
    }));
}

// Targets closer together than a fingertip (24 px, the WCAG target size)
// would sit on top of one another — 1651 and 1657, 2016 and 2025, or a short
// life inside a long period. Each pin and bar keeps its place along the axis,
// but one that would crowd another steps off the line onto a lane above or
// below it (alternately, as near the line as it can). Points are placed
// first, so they keep the line where they can; then the spans, each in the
// nearest lane free along its whole length. A span shorter than a fingertip
// is drawn a target wide. A pin off the line keeps a stem back to its date.
// A hall whose events never crowd keeps every one on the line.
const PIN_GAP = 24;
const LANE_STEP = 24;
function lanesFor(events, pos, width) {
    const lanes = events.map(() => 0);
    if (!width) return lanes;
    const span = (i) => pos[i].width > 0.6;
    const reach = events.map((e, i) => {
        const x = (pos[i].left / 100) * width;
        if (!span(i)) return [x - PIN_GAP / 2, x + PIN_GAP / 2];
        return [x, x + Math.max((pos[i].width / 100) * width, PIN_GAP)];
    });
    const taken = []; // [lane] -> the [from, to] of every target set in it
    const free = (lane, [a, b]) => (taken[lane] || []).every(([c, d]) => b <= c + 0.5 || a >= d - 0.5);
    const byStart = (a, b) => reach[a][0] - reach[b][0];
    const idx = events.map((e, i) => i);
    for (const i of [...idx.filter((i) => !span(i)).sort(byStart), ...idx.filter(span).sort(byStart)]) {
        let lane = 0;
        while (!free(lane, reach[i])) lane++;
        (taken[lane] = taken[lane] || []).push(reach[i]);
        lanes[i] = lane;
    }
    return lanes;
}
// lane 0 is the line; 1 above it, 2 below, 3 further above, and so on
const laneOffset = (lane) => (lane === 0 ? 0 : (lane % 2 ? -1 : 1) * Math.ceil(lane / 2) * LANE_STEP);

const KIND_LABEL = {
    text: 'Text',
    person: 'Person',
    event: 'Event',
    practice: 'Practice',
    manuscript: 'Manuscript',
    discovery: 'Discovery',
};

// The heading props let a page hold more than one timeline (the Magical
// Scriptorium's "How it was carried"); a hall passes none and is unchanged.
function ScriptoriumTimeline({ timeline, rtl, kicker = 'In Order', heading = 'Timeline', headingId = 'edu-timeline-heading' }) {
    const [active, setActive] = useState(0);
    const listRef = useRef(null);

    const events = timeline?.events ?? [];
    const pos = useMemo(() => (events.length ? positions(events) : []), [events]);
    const axisRef = useRef(null);
    const [axisWidth, setAxisWidth] = useState(0);
    useLayoutEffect(() => {
        const el = axisRef.current;
        if (!el) return undefined;
        const measure = () => setAxisWidth(el.clientWidth);
        measure();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, [events.length]);
    const lanes = useMemo(() => lanesFor(events, pos, axisWidth), [events, pos, axisWidth]);
    const reach = Math.max(0, ...lanes.map((l) => Math.abs(laneOffset(l))));

    if (events.length === 0) return null;
    const current = events[active] ?? events[0];

    const select = (i) => {
        setActive(i);
        const row = listRef.current?.querySelector(`[data-event="${i}"]`);
        if (row) row.scrollIntoView({ block: 'nearest' });
    };

    return (
        <section className="edu-timeline" aria-labelledby={headingId}>
            <header className="edu-section-head">
                <p className="kicker">{kicker}</p>
                <h2 id={headingId}>{heading}</h2>
                {timeline.note && <p>{timeline.note}</p>}
            </header>

            <div className="edu-axis-wrap">
                <div className="edu-axis" role="group" aria-label="Timeline events" ref={axisRef}
                    style={reach ? { '--reach': `${reach}px` } : undefined}>
                    <div className="edu-axis-line" aria-hidden="true" />
                    {events.map((e, i) => (
                        <button
                            type="button"
                            key={e.slug}
                            className={`edu-axis-pin${i === active ? ' is-active' : ''}${pos[i].width > 0.6 ? ' is-span' : ''}${lanes[i] ? (laneOffset(lanes[i]) < 0 ? ' is-above' : ' is-below') : ''}`}
                            style={{
                                left: `${pos[i].left}%`,
                                width: pos[i].width > 0.6 ? `${pos[i].width}%` : undefined,
                                ...(lanes[i] ? { '--lane': `${laneOffset(lanes[i])}px` } : null),
                            }}
                            onClick={() => select(i)}
                            aria-current={i === active}
                            title={`${e.title} — ${fmtRange(e)}`}
                        >
                            <span className="edu-axis-pin-label">{e.title}</span>
                        </button>
                    ))}
                </div>
                <div className="edu-axis-scale" aria-hidden="true">
                    <span>{fmtYear(events[0].year, events[0].circa)}</span>
                    <span>{fmtYear(Math.max(...events.map((e) => e.end ?? e.year)), false)}</span>
                </div>
            </div>

            <div className="edu-timeline-body">
                <ol className="edu-event-list" ref={listRef}>
                    {events.map((e, i) => (
                        <li key={e.slug} data-event={i}>
                            <button
                                type="button"
                                className={`edu-event-row${i === active ? ' is-active' : ''}`}
                                onClick={() => select(i)}
                            >
                                <span className="edu-event-year">{fmtRange(e)}</span>
                                <span className="edu-event-title">{e.title}</span>
                            </button>
                        </li>
                    ))}
                </ol>

                <article className="edu-event-detail" aria-live="polite">
                    <p className="edu-event-kind">{KIND_LABEL[current.kind] || current.kind} · {fmtRange(current)}</p>
                    {current.native && (
                        <p className="edu-event-native edu-glyph" dir={rtl ? 'rtl' : undefined}>{current.native}</p>
                    )}
                    <h3>{current.title}</h3>
                    <p className="edu-event-body">{current.description}</p>
                    {current.dating && (
                        <p className="edu-event-dating"><span>On the dating</span> {current.dating}</p>
                    )}
                </article>
            </div>
        </section>
    );
}

export default ScriptoriumTimeline;

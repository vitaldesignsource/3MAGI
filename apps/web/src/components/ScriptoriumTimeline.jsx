import React, { useMemo, useRef, useState } from 'react';

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

const fmtRange = (e) => (e.end != null && e.end !== e.year)
    ? `${fmtYear(e.year, e.circa)} – ${fmtYear(e.end, e.circaEnd)}`
    : fmtYear(e.year, e.circa);

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

const KIND_LABEL = {
    text: 'Text',
    person: 'Person',
    event: 'Event',
    practice: 'Practice',
    manuscript: 'Manuscript',
    discovery: 'Discovery',
};

function ScriptoriumTimeline({ timeline, rtl }) {
    const [active, setActive] = useState(0);
    const listRef = useRef(null);

    const events = timeline?.events ?? [];
    const pos = useMemo(() => (events.length ? positions(events) : []), [events]);

    if (events.length === 0) return null;
    const current = events[active] ?? events[0];

    const select = (i) => {
        setActive(i);
        const row = listRef.current?.querySelector(`[data-event="${i}"]`);
        if (row) row.scrollIntoView({ block: 'nearest' });
    };

    return (
        <section className="edu-timeline" aria-labelledby="edu-timeline-heading">
            <header className="edu-section-head">
                <p className="kicker">In Order</p>
                <h2 id="edu-timeline-heading">Timeline</h2>
                {timeline.note && <p>{timeline.note}</p>}
            </header>

            <div className="edu-axis-wrap">
                <div className="edu-axis" role="group" aria-label="Timeline events">
                    <div className="edu-axis-line" aria-hidden="true" />
                    {events.map((e, i) => (
                        <button
                            type="button"
                            key={e.slug}
                            className={`edu-axis-pin${i === active ? ' is-active' : ''}${pos[i].width > 0.6 ? ' is-span' : ''}`}
                            style={{ left: `${pos[i].left}%`, width: pos[i].width > 0.6 ? `${pos[i].width}%` : undefined }}
                            onClick={() => select(i)}
                            aria-current={i === active}
                            title={`${e.title} — ${fmtRange(e)}`}
                        >
                            <span className="edu-axis-pin-label">{e.title}</span>
                        </button>
                    ))}
                </div>
                <div className="edu-axis-scale" aria-hidden="true">
                    <span>{fmtRange(events[0]).split(' – ')[0]}</span>
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

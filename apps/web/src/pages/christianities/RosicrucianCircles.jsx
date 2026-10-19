import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Rich from './rich';

// Connected figures. The people of the story in the circles they moved in,
// each card carrying its documented links to the others. A link is stored
// once, on the person who acted (Maier defended Fludd), and shown on both
// cards, the second time in the passive (Fludd: defended by Maier), so the
// network can be walked from either end. Claimed and disputed links are kept
// and marked: the page's business is to show which is which, not to drop the
// inconvenient half.

const VERBS = {
    'wrote-with': ['wrote with', 'wrote with'],
    corresponded: ['corresponded with', 'corresponded with'],
    defended: ['defended', 'defended by'],
    answered: ['answered', 'answered by'],
    attacked: ['attacked', 'attacked by'],
    printed: ['printed', 'printed by'],
    translated: ['translated', 'translated by'],
    initiated: ['initiated', 'initiated by'],
    chartered: ['chartered', 'chartered by'],
    'split-from': ['split from', 'left by'],
    taught: ['taught', 'taught by'],
    read: ['read', 'read by'],
    patron: ['patron of', 'under the patronage of'],
    succeeded: ['succeeded', 'succeeded by'],
};

function RosicrucianCircles({ circles, people }) {
    const [active, setActive] = useState(null);
    const [documentedOnly, setDocumentedOnly] = useState(false);
    const byKey = useMemo(() => Object.fromEntries((people ?? []).map((p) => [p.key, p])), [people]);

    // Every link, seen from each end.
    const edges = useMemo(() => {
        const m = Object.fromEntries((people ?? []).map((p) => [p.key, []]));
        for (const p of people ?? []) {
            for (const l of p.links ?? []) {
                if (!byKey[l.to]) continue;
                m[p.key].push({ ...l, other: l.to, verb: VERBS[l.kind]?.[0] ?? l.kind });
                m[l.to].push({ ...l, other: p.key, verb: VERBS[l.kind]?.[1] ?? l.kind });
            }
        }
        return m;
    }, [people, byKey]);

    const linked = useMemo(() => (active ? new Set((edges[active] ?? []).map((e) => e.other)) : null), [active, edges]);
    const show = (e) => !documentedOnly || e.standing === 'documented';

    return (
        <div className={`ch-rc-circles${active ? ' has-active' : ''}`}>
            <div className="ch-rc-circles-bar" role="group" aria-label="Which links to show">
                <button type="button" className={`edu-filter${!documentedOnly ? ' is-active' : ''}`} onClick={() => setDocumentedOnly(false)}>Every link</button>
                <button type="button" className={`edu-filter${documentedOnly ? ' is-active' : ''}`} onClick={() => setDocumentedOnly(true)}>Documented only</button>
                {active && (
                    <p className="ch-rc-circles-focus" aria-live="polite">
                        Showing the connections of <strong>{byKey[active]?.name}</strong>
                        {' '}<button type="button" className="ch-rc-circles-clear" onClick={() => setActive(null)}>clear</button>
                    </p>
                )}
            </div>
            {(circles ?? []).map((c) => {
                const members = (people ?? []).filter((p) => p.circle === c.key);
                if (!members.length) return null;
                return (
                    <section key={c.key} className="ch-rc-circle" aria-labelledby={`circle-${c.key}`}>
                        <header className="ch-rc-circle-head">
                            <p className="ch-rc-year">{c.era} · {c.place}</p>
                            <h3 id={`circle-${c.key}`}>{c.label}</h3>
                            {c.note && <p><Rich t={c.note} /></p>}
                        </header>
                        <ul className="ch-rc-people">
                            {members.map((p) => {
                                const mine = (edges[p.key] ?? []).filter(show);
                                const cls = [
                                    'ch-rc-person',
                                    active === p.key ? 'is-active' : '',
                                    linked?.has(p.key) ? 'is-linked' : '',
                                ].filter(Boolean).join(' ');
                                return (
                                    <li key={p.key} id={`person-${p.key}`} className={cls}>
                                        <button type="button" className="ch-rc-person-head" aria-pressed={active === p.key}
                                            onClick={() => setActive(active === p.key ? null : p.key)}>
                                            <span className="ch-rc-person-name">{p.name}</span>
                                            <span className="ch-rc-person-dates">{p.dates}</span>
                                        </button>
                                        <p className="ch-rc-person-role"><Rich t={p.role} /></p>
                                        {mine.length > 0 && (
                                            <ul className="ch-rc-person-links">
                                                {mine.map((e, i) => (
                                                    <li key={i} className={`is-${e.standing}`}>
                                                        <span className="ch-rc-person-verb">{e.verb}</span>{' '}
                                                        <a href={`#person-${e.other}`} onClick={() => setActive(e.other)}>{byKey[e.other]?.name}</a>
                                                        {e.standing !== 'documented' && <em className="ch-rc-person-standing"> · {e.standing}</em>}
                                                        <span className="ch-rc-person-note"> — <Rich t={e.note} /></span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {p.figureSlug && (
                                            <p className="ch-rc-person-more"><Link to={`/christianities/figures#${p.figureSlug}`}>Among the Figures →</Link></p>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                );
            })}
        </div>
    );
}

export default RosicrucianCircles;

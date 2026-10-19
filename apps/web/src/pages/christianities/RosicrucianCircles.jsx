import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Rich from './rich';

// Connected figures. The people of the story in the circles they moved in,
// shown as an index of names, with one person opened at a time: their part
// in the story and every link, with its evidence. A link is stored once, on
// the person who acted (Maier defended Fludd), and shown from both ends, the
// second time in the passive (Fludd: defended by Maier), so the network can
// be walked from either end; the names of everyone linked to the open person
// light up in the index. Claimed and disputed links are kept and marked: the
// page's business is to show which is which, not to drop the inconvenient
// half. A search result arriving as #person-<key> opens that person.

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
    const list = people ?? [];
    const [active, setActive] = useState(list[0]?.key ?? null);
    const [documentedOnly, setDocumentedOnly] = useState(false);
    const byKey = useMemo(() => Object.fromEntries(list.map((p) => [p.key, p])), [list]);

    // Every link, seen from each end.
    const edges = useMemo(() => {
        const m = Object.fromEntries(list.map((p) => [p.key, []]));
        for (const p of list) {
            for (const l of p.links ?? []) {
                if (!byKey[l.to]) continue;
                m[p.key].push({ ...l, other: l.to, verb: VERBS[l.kind]?.[0] ?? l.kind });
                m[l.to].push({ ...l, other: p.key, verb: VERBS[l.kind]?.[1] ?? l.kind });
            }
        }
        return m;
    }, [list, byKey]);

    const show = (e) => !documentedOnly || e.standing === 'documented';
    const mine = (edges[active] ?? []).filter(show);
    const linked = new Set(mine.map((e) => e.other));
    const person = byKey[active];

    const open = (k, scroll) => {
        setActive(k);
        if (scroll) requestAnimationFrame(() => document.getElementById('rc-person-detail')?.scrollIntoView({ block: 'nearest' }));
    };

    useEffect(() => {
        const fromHash = () => {
            const m = decodeURIComponent(window.location.hash).match(/^#person-(.+)$/);
            if (m && list.some((p) => p.key === m[1])) {
                setActive(m[1]);
                requestAnimationFrame(() => document.getElementById('rc-person-detail')?.scrollIntoView({ block: 'start' }));
            }
        };
        fromHash();
        window.addEventListener('hashchange', fromHash);
        return () => window.removeEventListener('hashchange', fromHash);
    }, [list]);

    return (
        <div className="ch-rc-circles">
            <div className="ch-rc-circles-bar" role="group" aria-label="Which links to show">
                <button type="button" className={`edu-filter${!documentedOnly ? ' is-active' : ''}`} onClick={() => setDocumentedOnly(false)}>Every link</button>
                <button type="button" className={`edu-filter${documentedOnly ? ' is-active' : ''}`} onClick={() => setDocumentedOnly(true)}>Documented only</button>
            </div>
            <div className="ch-rc-circles-grid">
                <ol className="ch-rc-circle-index">
                    {(circles ?? []).map((c) => {
                        const members = list.filter((p) => p.circle === c.key);
                        if (!members.length) return null;
                        return (
                            <li key={c.key} className="ch-rc-circle">
                                <p className="ch-rc-year">{c.era} · {c.place}</p>
                                <h3 id={`circle-${c.key}`}>{c.label}</h3>
                                <ul className="ch-rc-names" aria-labelledby={`circle-${c.key}`}>
                                    {members.map((p) => (
                                        <li key={p.key} id={`person-${p.key}`}>
                                            <button type="button" aria-pressed={active === p.key} aria-controls="rc-person-detail"
                                                className={`ch-rc-name${active === p.key ? ' is-active' : ''}${linked.has(p.key) ? ' is-linked' : ''}`}
                                                onClick={() => open(p.key, true)}>
                                                {p.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {c.note && (
                                    <details className="ch-rc-more">
                                        <summary>About this circle</summary>
                                        <p><Rich t={c.note} /></p>
                                    </details>
                                )}
                            </li>
                        );
                    })}
                </ol>
                {person && (
                    <article id="rc-person-detail" className="ch-rc-person" aria-live="polite">
                        <p className="ch-rc-year">{(circles ?? []).find((c) => c.key === person.circle)?.label}</p>
                        <h3>{person.name} <span className="ch-rc-person-dates">{person.dates}</span></h3>
                        <p className="ch-rc-person-role"><Rich t={person.role} /></p>
                        {mine.length > 0 ? (
                            <ul className="ch-rc-person-links">
                                {mine.map((e, i) => (
                                    <li key={i} className={`is-${e.standing}`}>
                                        <span className="ch-rc-person-verb">{e.verb}</span>{' '}
                                        <button type="button" className="ch-rc-person-to" onClick={() => open(e.other, false)}>{byKey[e.other]?.name}</button>
                                        {e.standing !== 'documented' && <em className="ch-rc-person-standing"> · {e.standing}</em>}
                                        <span className="ch-rc-person-note"> — <Rich t={e.note} /></span>
                                    </li>
                                ))}
                            </ul>
                        ) : <p className="ch-rc-person-hint">{documentedOnly ? 'No documented link on this page.' : 'No link on this page.'}</p>}
                        {person.figureSlug && (
                            <p className="ch-rc-person-more"><Link to={`/christianities/figures#${person.figureSlug}`}>Among the Figures →</Link></p>
                        )}
                    </article>
                )}
            </div>
        </div>
    );
}

export default RosicrucianCircles;

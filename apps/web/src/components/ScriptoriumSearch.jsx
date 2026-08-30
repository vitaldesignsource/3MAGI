import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Search across every hall at once — signs, divine names, lexicon, currents,
// primary works, timeline events, lessons and the Reading Room.
//
// The index is a static JSON file built at compile time and fetched once, on
// the first keystroke, so a reader who never searches never pays for it. Two
// things make it worth having: the portal now holds thirteen hundred entries
// across fourteen scripts, and a reader who half-remembers a word will not
// know which hall it lives in — which is exactly the question a cross-hall
// search answers and a per-hall one cannot.

const INDEX_URL = '/scriptorium-index.json';

// Fold diacritics so a reader typing "sefirah" finds "sefirāh", and "haqq"
// finds "ḥaqq". Native-script queries are matched unfolded.
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

const KIND_LABEL = {
    sign: 'Sign', name: 'Divine name', term: 'Lexicon', current: 'Current',
    work: 'Text', event: 'Timeline', lesson: 'Lesson', book: 'Reading Room',
    // the Christianities portal
    christology: 'Christology', branch: 'Branch', council: 'Council',
    dispute: 'Argument', canon: 'Canon', figure: 'Figure', symbol: 'Symbol',
    site: 'Place', creed: 'Creed',
};
const KIND_ORDER = ['name', 'term', 'sign', 'current', 'work', 'event', 'lesson', 'book',
    'figure', 'branch', 'council', 'dispute', 'christology', 'creed', 'canon', 'symbol', 'site'];

// The same index serves two portals; each search box sees only its own half.
// Christianities records are marked h === 'ch' and carry their path outright.
const SCOPES = {
    scriptorium: {
        pool: (r) => r.h !== 'ch',
        kicker: 'Across Every Hall',
        heading: 'Search the Scriptorium',
        blurb: 'Signs, divine names, lexicon, currents, primary texts, timelines '
            + 'and lessons — in fourteen scripts. Type in English or paste the script itself.',
        placeholder: 'sefirah · ḥaqq · אין סוף · 𓋹 · execration',
        empty: 'Nothing in the Scriptorium answers to',
    },
    christianities: {
        pool: (r) => r.h === 'ch',
        kicker: 'Across the Whole Portal',
        heading: 'Search Christianities',
        blurb: 'Christologies, branches, councils, the canon table, figures, '
            + 'symbols, places and dates — one box over all seven doors.',
        placeholder: 'homoousios · Chalcedon · Perpetua · 1 Enoch · Iona',
        empty: 'Nothing in the portal answers to',
    },
};

function score(rec, q, qFolded) {
    const label = fold(rec.l);
    const sub = fold(rec.s);
    // A native-script hit is the strongest signal there is: the reader has
    // pasted the very thing they are looking for.
    if (rec.n && rec.n.includes(q)) return 100;
    if (label === qFolded) return 90;
    if (label.startsWith(qFolded)) return 70;
    if (label.includes(qFolded)) return 50;
    if (sub.includes(qFolded)) return 30;
    if (fold(rec.d).includes(qFolded)) return 10;
    return 0;
}

function ScriptoriumSearch({ scope = 'scriptorium' }) {
    const sc = SCOPES[scope];
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState(null);
    const [state, setState] = useState('idle'); // idle | loading | ready | error
    const [kind, setKind] = useState('all');
    const requested = useRef(false);

    // Fetch on first use, never on mount.
    const ensureIndex = useCallback(async () => {
        if (requested.current) return;
        requested.current = true;
        setState('loading');
        try {
            const res = await fetch(INDEX_URL);
            if (!res.ok) throw new Error(String(res.status));
            setIndex(await res.json());
            setState('ready');
        } catch {
            setState('error');
        }
    }, []);

    useEffect(() => { if (query.trim().length >= 2) ensureIndex(); }, [query, ensureIndex]);

    const results = useMemo(() => {
        const q = query.trim();
        if (!index || q.length < 2) return [];
        const qf = fold(q);
        const scored = [];
        for (const rec of index.records) {
            if (!sc.pool(rec)) continue;
            const s = score(rec, q, qf);
            if (s > 0) scored.push({ rec, s });
        }
        scored.sort((a, b) => b.s - a.s || a.rec.l.localeCompare(b.rec.l));
        return scored.slice(0, 120).map((x) => x.rec);
    }, [index, query, sc]);

    const kinds = useMemo(() => {
        const present = new Set(results.map((r) => r.k));
        return KIND_ORDER.filter((k) => present.has(k));
    }, [results]);

    const shown = kind === 'all' ? results : results.filter((r) => r.k === kind);

    // Reset the filter whenever it would otherwise hide everything.
    useEffect(() => {
        if (kind !== 'all' && !kinds.includes(kind)) setKind('all');
    }, [kinds, kind]);

    const hrefFor = (r) => (r.u
        ? (r.a ? `${r.u}#${r.a}` : r.u)
        : r.h === 'library'
            ? `/third-lamp/education#${r.a}`
            : r.k === 'lesson'
                ? `/third-lamp/education/${r.h}/course`
                : `/third-lamp/education/${r.h}#${r.a}`);

    const q = query.trim();

    return (
        <section className="edu-search" aria-labelledby="edu-search-heading">
            <header className="edu-section-head">
                <p className="kicker">{sc.kicker}</p>
                <h2 id="edu-search-heading">{sc.heading}</h2>
                <p>{sc.blurb}</p>
            </header>

            <div className="edu-search-box">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={ensureIndex}
                    placeholder={sc.placeholder}
                    aria-label={sc.heading}
                    aria-describedby="edu-search-status"
                />
                <span id="edu-search-status" className="edu-search-status" aria-live="polite">
                    {state === 'loading' && 'opening the index…'}
                    {state === 'error' && 'the index could not be loaded'}
                    {state === 'ready' && q.length >= 2 && `${results.length}${results.length === 120 ? '+' : ''} found`}
                    {state === 'ready' && q.length > 0 && q.length < 2 && 'keep typing…'}
                </span>
            </div>

            {kinds.length > 1 && (
                <div className="edu-search-kinds" role="group" aria-label="Filter results by kind">
                    <button type="button" className={`edu-filter${kind === 'all' ? ' is-active' : ''}`} onClick={() => setKind('all')}>
                        All ({results.length})
                    </button>
                    {kinds.map((k) => (
                        <button type="button" key={k} className={`edu-filter${kind === k ? ' is-active' : ''}`} onClick={() => setKind(k)}>
                            {KIND_LABEL[k]} ({results.filter((r) => r.k === k).length})
                        </button>
                    ))}
                </div>
            )}

            {shown.length > 0 && (
                <ul className="edu-search-results">
                    {shown.map((r, i) => (
                        <li key={`${r.h}-${r.k}-${r.l}-${i}`}>
                            <Link to={hrefFor(r)}>
                                {r.n && <span className="edu-search-native edu-glyph">{r.n}</span>}
                                <span className="edu-search-body">
                                    <span className="edu-search-label">{r.l}</span>
                                    {r.s && <span className="edu-search-sub">{r.s}</span>}
                                    {r.d && <span className="edu-search-detail">{r.d}</span>}
                                </span>
                                <span className="edu-search-tag">
                                    {KIND_LABEL[r.k]}
                                    {/* the Reading Room is its own kind; naming it twice reads as an error */}
                                    {index.halls[r.h] && <em>{index.halls[r.h]}</em>}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            {state === 'ready' && q.length >= 2 && results.length === 0 && (
                <p className="edu-search-empty">{sc.empty} “{q}”.</p>
            )}
        </section>
    );
}

export default ScriptoriumSearch;

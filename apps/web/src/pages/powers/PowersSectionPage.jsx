import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { SECTION_BY_SLUG, loadData } from './lib';
import Rich from '../christianities/rich';
import Plate from '../christianities/Plate';
import DIAGRAMS from './HierarchyDiagrams';
import PortalHero from '../christianities/PortalHero';
import PortalEmblem from '../christianities/PortalEmblem';
import EMBLEMS from '../../data/emblems';
import DoorStrip from './DoorStrip';
import '../../styles/powers-hero.css';
import '../../styles/powers-doors.css';
import '../../styles/powers-tables.css';

// One page, five doors of The Powers: hierarchies, host, pantheons, daimons,
// texts. The Map has its own page. The chrome, the expandable discipline and
// the deep-link behaviour are the Christianities machinery, and the CSS is
// shared outright — the portals are meant to feel like wings of one house.

const EXTRAS = {
    pantheons: ['correspondences'],
    daimons: ['middleworld', 'words'],
};

// The section titles that the page index also names, written once.
const CORR_TITLE = 'The Table of Correspondences';
const MW_TITLE = 'The Middle World, Compared';
const WORDS_TITLE = 'The words';

// The data's `lang` names a script; the page needs a language tag, so that a
// screen reader voices the name in its own language and :lang() font rules
// apply. The Irish gods are written in the Latin alphabet but in Old Irish.
const LANG = {
    hebrew: 'he', arabic: 'ar', greek: 'grc', latin: 'la', cjk: 'ja',
    cuneiform: 'akk', devanagari: 'sa', hieroglyphic: 'egy',
};
const langOf = (e) => (e.lang === 'latin' && e.group === 'celtic' ? 'sga' : LANG[e.lang]);
const nativeOf = (e) => (e.native ? { text: e.native, script: e.lang, lang: langOf(e) } : undefined);

// The site header is fixed, and it wraps to a second line at some widths, so
// its real height is held in --pw-header: the anchors clear it, and an open
// entry's head pins just beneath it.
const headerBottom = () => document.querySelector('.site-header')?.getBoundingClientRect().bottom ?? 94;

function useHeaderClearance(ref, ready) {
    useLayoutEffect(() => {
        const root = ref.current;
        const header = document.querySelector('.site-header');
        if (!root || !header) return undefined;
        const set = () => root.style.setProperty('--pw-header', `${Math.round(header.getBoundingClientRect().height)}px`);
        set();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const ro = new ResizeObserver(set);
        ro.observe(header);
        return () => ro.disconnect();
    }, [ref, ready]);
}

// One entry open at a time keeps the reader's place. Opening B while a tall A
// above it is open collapses A and would fling B's head far above the screen,
// so after every toggle the head just opened (or just closed) is brought back
// under the header when it has left the comfortable band. The open entry is
// mirrored into the address bar without the router: navigate() would wake
// ScrollToTop, and react-router keeps its own index in history.state, so that
// state is handed back unchanged.
function useEntryToggle(open, setOpen) {
    const pending = useRef(null);
    const toggle = useCallback((slug) => {
        const next = open === slug ? null : slug;
        pending.current = slug;
        setOpen(next);
        window.history.replaceState(window.history.state, '',
            next ? `#${encodeURIComponent(next)}` : window.location.pathname + window.location.search);
    }, [open, setOpen]);
    useLayoutEffect(() => {
        const slug = pending.current;
        pending.current = null;
        if (!slug) return;
        const el = document.getElementById(slug);
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top < headerBottom() + 4 || top > window.innerHeight * 0.75) {
            const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            el.scrollIntoView({ block: 'start', behavior: still ? 'instant' : 'smooth' });
        }
    }, [open]);
    return toggle;
}

// An entry is the WAI accordion: a heading that holds the toggle, and a
// region the toggle controls. `level` is 2 where the entries sit straight
// under the page title and 3 under a group's h2; the heading takes the
// button's look, not the global h2/h3 sizes. A native name is its own line
// above the English one, tagged with its language.
// A door whose every entry has a plate may show it small in the head
// (`thumb`), and a line from the entry under the closed head (`teaser`).
// Both stay out of the accessible name: the plate and the line belong to the
// body, and the teaser goes as soon as the entry opens.
function Expandable({ id, head, sub, badge, native, thumb, teaser, level = 2, children, open, onToggle }) {
    const H = `h${level}`;
    const headClass = `ch-entry-head${badge ? ' has-badge' : ''}${thumb ? ' has-thumb' : ''}`;
    return (
        <article id={id} className={`ch-entry${open ? ' is-open' : ''}`}>
            <H className="ch-entry-h">
                <button type="button" id={`${id}-head`} className={headClass}
                    aria-expanded={open} aria-controls={`${id}-body`} onClick={onToggle}>
                    {thumb && (
                        <span className="ch-entry-thumb" aria-hidden="true">
                            <img src={`/media/${thumb}`} alt="" loading="lazy" decoding="async" width="72" height="72" />
                        </span>
                    )}
                    <span className="ch-entry-titles">
                        {native?.text && (
                            <bdi className="edu-glyph ch-entry-native" lang={native.lang} data-script={native.script}>{native.text}</bdi>
                        )}
                        <span className="ch-entry-name">{head}</span>
                        {sub && <span className="ch-entry-sub">{sub}</span>}
                    </span>
                    {teaser && !open && <span className="ch-entry-teaser" aria-hidden="true"><Rich t={teaser} /></span>}
                    {badge && <span className="ch-entry-badge">{badge}</span>}
                    <span className="ch-entry-toggle" aria-hidden="true" />
                </button>
            </H>
            {open && (
                <div className="ch-entry-body" id={`${id}-body`} role="region" aria-labelledby={`${id}-head`}>
                    {children}
                    {/* the button goes with the body it closes, so focus
                        returns to the head the reader is brought back to */}
                    <button type="button" className="ch-entry-close"
                        onClick={() => { onToggle(); document.getElementById(`${id}-head`)?.focus({ preventScroll: true }); }}
                        aria-describedby={`${id}-head`}>Close</button>
                </div>
            )}
        </article>
    );
}

// A label and its text. `mod` marks the back-matter's roles: the citation
// (is-source) and the line the entry exists to deliver (is-crux).
const kv = (label, value, mod) => (value
    ? <div className={`ch-kv${mod ? ` ${mod}` : ''}`}><span>{label}</span><p><Rich t={value} /></p></div>
    : null);

// "On this page": the groups with their counts where a door has groups, the
// entries themselves where it has none, and the sections that follow them.
function PageIndex({ items, variant }) {
    if (!items?.length) return null;
    return (
        <nav className={`pw-index is-${variant}`} aria-label="On this page">
            <ol>
                {items.map((it) => (
                    <li key={it.href} className={it.mark ? `is-${it.mark}` : undefined}>
                        <Link to={it.href}>
                            <span className="pw-index-label">{it.label}</span>
                            {it.count != null && <span className="pw-index-count">{it.count}</span>}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}

function indexFor(data, extras) {
    if (!data) return null;
    if (data.groups?.length) {
        const items = data.groups
            .map((g) => ({ href: `#${g.key}`, label: g.label, count: data.entries.filter((e) => e.group === g.key).length }))
            .filter((it) => it.count > 0);
        if (extras.correspondences) items.push({ href: '#pw-corr', label: CORR_TITLE, mark: 'table' });
        return { variant: 'groups', items };
    }
    const items = data.entries.map((e) => ({ href: `#${e.slug}`, label: e.name }));
    if (extras.middleworld) items.push({ href: '#pw-mw', label: MW_TITLE, mark: 'section' });
    if (extras.words) items.push({ href: '#pw-words', label: WORDS_TITLE, mark: 'section' });
    return { variant: 'flat', items };
}

// Hierarchies, Daimons and Texts run in time order: their lists carry the
// gold spine (pw-spine), drawn in the left gutter on a wide screen.
function Hierarchies({ data, open, toggle }) {
    return (
        <div className="ch-entry-list pw-spine">
            {data.entries.map((e) => (
                <Expandable key={e.slug} id={e.slug} open={open === e.slug} level={2}
                    onToggle={() => toggle(e.slug)}
                    head={e.name} sub={e.era} badge={e.tradition}>
                    <Plate item={e} />
                    {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    {DIAGRAMS[e.slug] && React.createElement(DIAGRAMS[e.slug])}
                    {e.ranks?.length > 0 && (
                        <div className="ch-kv is-ranks"><span>The ranks, highest first</span>
                            <ol className="pw-ranks is-ladder">
                                {e.ranks.map((r, i) => (
                                    <li key={i} style={{ '--rung': i }}>
                                        <span className="pw-rung-mark" aria-hidden="true" />
                                        <span className="pw-rung-body">
                                            {r.native && <span className="edu-glyph pw-rank-native">{r.native}</span>}
                                            <strong>{r.name}</strong>
                                            {r.gloss && <> — <Rich t={r.gloss} /></>}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                    {kv('Source', e.source, 'is-source')}
                    {kv('What turns on it', e.stakes, 'is-crux')}
                </Expandable>
            ))}
        </div>
    );
}

function Host({ data, open, toggle }) {
    return data.groups.map((g) => {
        const entries = data.entries.filter((e) => e.group === g.key);
        if (!entries.length) return null;
        return (
            <section key={g.key} className="ch-group" id={g.key}>
                <span className="pw-divider" aria-hidden="true" />
                <header className="edu-section-head">
                    <h2>{g.label}</h2>
                    <p><Rich t={g.blurb} /></p>
                </header>
                <Plate item={g} wide />
                <div className="ch-entry-list">
                    {entries.map((e) => (
                        <Expandable key={e.slug} id={e.slug} open={open === e.slug} level={3}
                            onToggle={() => toggle(e.slug)}
                            native={nativeOf(e)} head={e.name}
                            sub={e.title} badge={e.tradition}>
                            <Plate item={e} />
                            {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                            {kv('First attested', e.attested)}
                            {kv('Office', e.office)}
                            {kv('Across the traditions', e.elsewhere)}
                        </Expandable>
                    ))}
                </div>
            </section>
        );
    });
}

// Every god's 'Interpretatio' carries a way back to its family's row in the
// Table of Correspondences; the table's keys are the group keys.
function Pantheons({ data, open, toggle, corrRows }) {
    const interpretatio = (group) => (corrRows?.has(group)
        ? <>Interpretatio<Link className="pw-kv-jump" to={`#corr-${group}`}
            aria-label="This family's row in the Table of Correspondences">✦</Link></>
        : 'Interpretatio');
    return data.groups.map((g) => {
        const entries = data.entries.filter((e) => e.group === g.key);
        if (!entries.length) return null;
        return (
            <section key={g.key} className="ch-group" id={g.key}>
                <span className="pw-divider" aria-hidden="true" />
                <header className="edu-section-head">
                    <h2>{g.label}</h2>
                    <p><Rich t={g.blurb} /></p>
                </header>
                <Plate item={g} wide />
                <div className="ch-entry-list">
                    {entries.map((e) => (
                        <Expandable key={e.slug} id={e.slug} open={open === e.slug} level={3}
                            onToggle={() => toggle(e.slug)}
                            native={nativeOf(e)} head={e.name}
                            sub={e.domain} badge={null}>
                            {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                            {kv('Cult', e.cult)}
                            {kv(interpretatio(e.group), e.interpretatio)}
                        </Expandable>
                    ))}
                </div>
            </section>
        );
    });
}

// Every daimons entry has its plate, so the closed list shows them small, and
// each entry's 'The shift' as its teaser: read down, the twelve lines are the
// long demotion. A door where only some entries have plates keeps plain heads.
function Daimons({ data, open, toggle }) {
    const plated = data.entries.every((e) => e.image);
    return (
        <div className="ch-entry-list pw-spine">
            {data.entries.map((e) => (
                <Expandable key={e.slug} id={e.slug} open={open === e.slug} level={2}
                    onToggle={() => toggle(e.slug)}
                    thumb={plated ? e.image : undefined} teaser={plated ? e.shift : undefined}
                    head={e.name} sub={e.era} badge={e.tradition}>
                    <Plate item={e} />
                    {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    {kv('Source', e.source, 'is-source')}
                    {kv('The shift', e.shift, 'is-crux')}
                </Expandable>
            ))}
        </div>
    );
}

function Texts({ data, open, toggle }) {
    return (
        <div className="ch-entry-list pw-spine">
            {data.entries.map((e) => (
                <Expandable key={e.slug} id={e.slug} open={open === e.slug} level={2}
                    onToggle={() => toggle(e.slug)}
                    native={nativeOf(e)} head={e.name}
                    sub={e.dating} badge={e.tradition}>
                    {e.exposition.map((p, i) => <p key={i}><Rich t={p} /></p>)}
                    {kv('What it carries', e.carries)}
                    {kv('Where to read it', e.access)}
                </Expandable>
            ))}
        </div>
    );
}

// The two comparison tables share their row discipline. A row's name is a
// real disclosure button (the whole row still answers the mouse), and its
// notes open beneath as a ledger pinned to the visible width of the scroller,
// so they read in place however far the cells have been scrolled sideways.
function RowHead({ label, isOpen, controls, onToggle }) {
    return (
        <th scope="row">
            <button type="button" className="pw-row-toggle" aria-expanded={isOpen}
                aria-controls={controls}
                onClick={(ev) => { ev.stopPropagation(); onToggle(); }}>
                <span>{label}</span>
                <span className="pw-row-chev" aria-hidden="true" />
            </button>
        </th>
    );
}

function NotesRow({ id, span, lead, notes }) {
    return (
        <tr id={id} className="edu-cog-noterow">
            <td colSpan={span}>
                <div className="pw-notes">
                    {lead}
                    <dl>
                        {notes.map(({ key, label, note }) => (
                            <React.Fragment key={key}>
                                <dt>{label}</dt>
                                <dd><Rich t={note} /></dd>
                            </React.Fragment>
                        ))}
                    </dl>
                </div>
            </td>
        </tr>
    );
}

// #corr-<family> names a row of the Table of Correspondences (the ✦ beside
// every god's Interpretatio leads there).
const corrRowOf = (hash) => {
    const h = decodeURIComponent((hash || '').slice(1));
    return h.startsWith('corr-') ? h.slice(5) : null;
};

// The Table of Correspondences — pantheons against the great offices, in the
// canon-table's clothes. Cells hold names; the open row tells the stories.
function Correspondences({ table, entries }) {
    const [openRow, setOpenRow] = useState(
        () => (typeof window !== 'undefined' ? corrRowOf(window.location.hash) : null),
    );
    // the key as well as the hash: a second ✦ to the same family, after its
    // row was closed, opens it again
    const { hash, key } = useLocation();
    useEffect(() => {
        const row = corrRowOf(hash);
        if (row) setOpenRow(row);
    }, [hash, key]);

    // A cell that names a god this page actually writes up should be a way in.
    // Entry names carry aliases across the slash ("Utu / Shamash"), so index
    // every alias, and split a cell on the semicolon to link each name in it.
    const bySlug = useMemo(() => {
        const m = new Map();
        for (const e of entries ?? []) {
            for (const alias of e.name.split('/')) {
                const k = alias.trim().toLowerCase();
                if (k && !m.has(k)) m.set(k, e.slug);
            }
        }
        return m;
    }, [entries]);

    const cellContent = (name) => {
        if (!name || name === '—') return name || '—';
        const parts = name.split(';');
        return parts.map((raw, i) => {
            const label = raw.trim();
            const bare = label.replace(/^later\s+/i, '').replace(/\s*\(.*\)$/, '').toLowerCase();
            const slug = bySlug.get(bare);
            return (
                <React.Fragment key={i}>
                    {i > 0 && '; '}
                    {slug
                        // the god's entry, not the row: the click stops here
                        ? <Link className="pw-corr-link" to={`#${slug}`} onClick={(ev) => ev.stopPropagation()}>{label}</Link>
                        : label}
                </React.Fragment>
            );
        });
    };

    return (
        <section className="ch-matrix" id="pw-corr" aria-labelledby="pw-corr-heading">
            <header className="edu-section-head">
                <p className="kicker">Interpretatio</p>
                <h2 id="pw-corr-heading">{CORR_TITLE}</h2>
                {table.intro.map((p, i) => <p key={i}><Rich t={p} /></p>)}
            </header>
            <Plate item={table} wide />
            <div className="edu-kinship-scroll ch-canon-scroll" role="region"
                aria-label="Correspondence table of the pantheons" tabIndex={0}>
                <table className="edu-cognates-table ch-canon-table pw-corr-table">
                    <thead>
                        <tr>
                            <th scope="col" className="ch-canon-bookcol">Pantheon</th>
                            {table.roles.map((r) => (
                                <th scope="col" key={r.key}>
                                    <span>{r.label}</span>
                                    <span className="pw-corr-gloss">{r.gloss}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.pantheons.map((p) => {
                            const isOpen = openRow === p.key;
                            const notes = table.roles
                                .map((r) => ({ r, c: p.cells[r.key] }))
                                .filter((x) => x.c?.note);
                            const toggleRow = () => setOpenRow(isOpen ? null : p.key);
                            return (
                                <React.Fragment key={p.key}>
                                    <tr id={`corr-${p.key}`} className={`has-note ${isOpen ? 'is-open' : ''}`}
                                        onClick={toggleRow}>
                                        <RowHead label={p.label} isOpen={isOpen}
                                            controls={`corr-note-${p.key}`} onToggle={toggleRow} />
                                        {table.roles.map((r) => (
                                            <td key={r.key} className="pw-corr-cell"
                                                title={p.cells[r.key]?.note || undefined}>
                                                {cellContent(p.cells[r.key]?.name)}
                                            </td>
                                        ))}
                                    </tr>
                                    {isOpen && notes.length > 0 && (
                                        <NotesRow id={`corr-note-${p.key}`} span={table.roles.length + 1}
                                            notes={notes.map(({ r, c }) => ({ key: r.key, label: r.label, note: c.note }))} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className="edu-kinship-legend">{table.legend}</p>
        </section>
    );
}

// The three answers are drawn, not set in a font, and each is named for a
// screen reader with the legend's own words.
const ANSWER = { yes: 'yes', q: 'qualified', no: 'no' };
const Mark = ({ v }) => <span className={`mw-mark is-${v}`} aria-hidden="true" />;

function MiddleWorld({ table }) {
    const [openRow, setOpenRow] = useState(null);
    return (
        <section className="ch-matrix has-atmosphere" id="pw-mw" aria-labelledby="pw-mw-heading"
            style={{ '--atmo': "url(/media/fbb3fbfe09076061ed01862a58c394e9.webp)" }}>
            <header className="edu-section-head">
                <p className="kicker">The Same Six Questions</p>
                <h2 id="pw-mw-heading">{MW_TITLE}</h2>
                {table.intro.map((p, i) => <p key={i}><Rich t={p} /></p>)}
            </header>
            <div className="edu-kinship-scroll ch-canon-scroll" role="region"
                aria-label="The middle world compared across traditions" tabIndex={0}>
                <table className="edu-cognates-table ch-canon-table ch-matrix-table">
                    <thead>
                        <tr>
                            <th scope="col" className="ch-canon-bookcol">Tradition</th>
                            {table.questions.map((q) => (
                                <th scope="col" key={q.key} title={q.gloss}><span className="mw-q">{q.label}</span></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.traditions.map((t) => {
                            const isOpen = openRow === t.key;
                            const notes = table.questions
                                .map((q) => ({ q, c: t.cells[q.key] }))
                                .filter((x) => x.c?.note);
                            const toggleRow = () => setOpenRow(isOpen ? null : t.key);
                            return (
                                <React.Fragment key={t.key}>
                                    <tr className={`has-note ${isOpen ? 'is-open' : ''}`}
                                        onClick={toggleRow}>
                                        <RowHead label={t.label} isOpen={isOpen}
                                            controls={`mw-note-${t.key}`} onToggle={toggleRow} />
                                        {table.questions.map((q) => {
                                            const v = t.cells[q.key]?.v || 'no';
                                            return (
                                                <td key={q.key} className={`ch-canon-cell st-${v}`}
                                                    title={`${t.label} — ${q.label}`}>
                                                    <Mark v={v} /><span className="sr-only">{ANSWER[v]}</span>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                    {isOpen && (
                                        <NotesRow id={`mw-note-${t.key}`} span={table.questions.length + 1}
                                            lead={<p className="ch-matrix-holder"><em>Era.</em> {t.era}</p>}
                                            notes={notes.map(({ q, c }) => ({
                                                key: q.key,
                                                label: (
                                                    <span className="pw-notes-key">
                                                        <Mark v={c.v || 'no'} />
                                                        <span>{q.label}<span className="sr-only"> ({ANSWER[c.v || 'no']})</span></span>
                                                    </span>
                                                ),
                                                note: c.note,
                                            }))} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <p className="edu-kinship-legend">{table.legend}</p>
        </section>
    );
}

function PowersWords({ words }) {
    const [open, setOpen] = useState(
        () => (typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.slice(1)) : '') || null,
    );
    const toggle = useEntryToggle(open, setOpen);
    // a link to one of the words, followed on this page, opens it too
    const { hash, key } = useLocation();
    useEffect(() => {
        const slug = decodeURIComponent(hash.slice(1));
        if (words.entries.some((w) => w.slug === slug)) setOpen(slug);
    }, [hash, key, words]);
    return (
        <section className="ch-words has-atmosphere" id="pw-words" aria-labelledby="pw-words-heading"
            style={{ '--atmo': "url(/media/9ad6bf37aaf6af0156ee6d451166ad5e.webp)" }}>
            <header className="edu-section-head">
                <p className="kicker">One Word, Two Fates</p>
                <h2 id="pw-words-heading">{WORDS_TITLE}</h2>
                {words.intro.map((p, i) => <p key={i}><Rich t={p} /></p>)}
            </header>
            <div className="ch-entry-list">
                {words.entries.map((w) => (
                    <Expandable key={w.slug} id={w.slug} open={open === w.slug} level={3}
                        onToggle={() => toggle(w.slug)}
                        head={<>{w.native && <><bdi className="edu-glyph ch-word-native" lang={LANG[w.lang]}>{w.native}</bdi> </>}{w.translit}</>}
                        sub={w.literal} badge={w.lang}>
                        <p><Rich t={w.story} /></p>
                        {kv('Where it lives', w.livesIn)}
                        {w.fate && kv('Its fate', w.fate, 'is-crux')}
                    </Expandable>
                ))}
            </div>
            <p className="ch-words-bridge">
                The scripts these words are written in each have a hall in the{' '}
                <Link to="/third-lamp/education">Scriptorium</Link> — the
                cuneiform 𒀭 that marks a god's name, the Hebrew of the
                mal’akhim, the Greek of the daimones.
            </p>
        </section>
    );
}

const RENDERERS = {
    hierarchies: Hierarchies, host: Host, pantheons: Pantheons,
    daimons: Daimons, texts: Texts,
};

function SectionPage() {
    const { section } = useParams();
    const { hash, key } = useLocation();
    const meta = SECTION_BY_SLUG[section];
    const Renderer = RENDERERS[section];
    const [data, setData] = useState(null);
    const [extras, setExtras] = useState({});
    const [state, setState] = useState('loading');
    const [open, setOpen] = useState(null);
    const toggle = useEntryToggle(open, setOpen);
    const root = useRef(null);
    useHeaderClearance(root, state);

    useEffect(() => {
        let alive = true;
        setState('loading'); setData(null); setExtras({}); setOpen(null);
        if (Renderer) {
            Promise.all([
                loadData(section),
                Promise.all((EXTRAS[section] ?? []).map(async (name) => [name, await loadData(name)])),
            ]).then(([d, pairs]) => {
                if (!alive) return;
                setData(d);
                setExtras(Object.fromEntries(pairs.filter(([, v]) => v)));
                setState('done');
            });
        }
        return () => { alive = false; };
    }, [section, Renderer]);

    // A #slug opens its entry. The location key is watched as well as the
    // hash: after a toggle has cleared the address bar the router still
    // holds the old hash, so a second link to the same entry (from the index
    // or the table) changes only the key, and ScrollToTop does not move. The
    // second frame lands the target after any entry above it has collapsed.
    useEffect(() => {
        if (!data || !hash) return undefined;
        const slug = decodeURIComponent(hash.slice(1));
        setOpen(slug);
        let raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(() => document.getElementById(slug)?.scrollIntoView({ block: 'start', behavior: 'instant' }));
        });
        return () => cancelAnimationFrame(raf);
    }, [data, hash, key]);

    const index = useMemo(() => indexFor(data, extras), [data, extras]);
    const corrRows = useMemo(
        () => (extras.correspondences ? new Set(extras.correspondences.pantheons.map((p) => p.key)) : null),
        [extras],
    );

    if (!meta || !Renderer) return <Navigate to="/powers" replace />;
    if (state === 'loading') {
        return <div className="third-lamp-scope edu-page ch-page pw-page" aria-busy="true" style={{ minHeight: '100vh' }}><SiteHeader /></div>;
    }
    if (!data && Object.keys(extras).length === 0) return <Navigate to="/powers" replace />;

    return (
        <div className="third-lamp-scope edu-page ch-page pw-page" ref={root}>
            <Helmet>
                <title>{`${meta.title} — The Powers — Three Magi Press`}</title>
                <meta name="description" content={meta.blurb} />
            </Helmet>
            <SiteHeader />
            <PortalHero door image={meta.hero} alt={meta.heroAlt} effect={meta.heroEffect} focus={meta.heroFocus}
                emblem={<PortalEmblem name={`powers/${meta.slug}`} bare />}
                emblemNote={EMBLEMS[`powers/${meta.slug}`]?.caption}
                kickerLink="/powers" kickerLinkLabel="The Powers"
                kicker={meta.kicker} title={meta.title} intro={data?.intro} />
            <main className="edu-main">
                {index && <PageIndex items={index.items} variant={index.variant} />}
                {data && <Renderer data={data} open={open} toggle={toggle} corrRows={corrRows} />}
                {extras.correspondences && <Correspondences table={extras.correspondences} entries={data?.entries} />}
                {extras.middleworld && <MiddleWorld table={extras.middleworld} />}
                {extras.words && <PowersWords words={extras.words} />}
                <DoorStrip current={section} />
            </main>
            <SiteFooter />
        </div>
    );
}

// Each door mounts afresh. The door strip moves the reader from one door to
// the next on this same route, and the new door's list must never be drawn
// for a moment with the last door's data.
function PowersSectionPage() {
    const { section } = useParams();
    return <SectionPage key={section} />;
}

export default PowersSectionPage;

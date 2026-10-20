import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MagicGlyph, { Sign, Unstruck } from './MagicGlyph';
import { sharedNote } from './sign';
import { isolate } from './Bidi';

// The letters of an alphabet, in the hall's own idiom: a grid that walks by
// keyboard (a listbox with a roving tabindex, the arrows following the
// alphabet's direction) and a plaque for the selected letter. A search result
// that points at #mg-letter-N selects that letter and puts the keyboard on it,
// where the halls only scroll to it. An alphabet whose forms are still being
// traced gets a ledger instead — every letter with its name, value, number and
// note, and one plain sentence saying where the forms will come from.

const letterIndexOf = (hash) => {
    const m = /^#mg-letter-(\d+)$/.exec(hash || '');
    return m ? Number(m[1]) : null;
};

const CONFIDENCE = { high: 'secure', medium: 'varies in the sources', low: 'uncertain' };
// A letter whose reservation is not the sources' disagreement (the Nine
// Chambers' points, which no source prints and the site places) says what it
// is in `formReason`, which the plaque gives in place of the generic word.
const reservation = (l) => l.formReason || CONFIDENCE[l.formConfidence];
// A value that only repeats the transliteration in capitals (the runes' sound
// "F" beside the transliteration "f") is not printed twice.
const repeatsTranslit = (l) => l.translit != null && l.value != null && String(l.value).toLowerCase() === String(l.translit).toLowerCase();
const POEMS = [['oldEnglish', 'Old English'], ['norwegian', 'Norwegian'], ['icelandic', 'Icelandic']];

// An entry that is a table of numbers (the planets' magic squares) is not a
// figure: its card wears a small ruled square of its side, and its plaque
// gives the numbers. A letter of a ready alphabet with no form is an honest
// gap, and wears the glyph kit's own gap mark, as the specimen sheet does —
// not the unstruck seal, which marks a form still being traced.
// (A geomantic figure's `rows` is a flat list of its point counts, not a table.)
const isTable = (l) => Array.isArray(l.rows) && Array.isArray(l.rows[0]);

function TableMark({ side }) {
    const lo = 16, hi = 84, step = (hi - lo) / side;
    const lines = Array.from({ length: side - 1 }, (_, i) => lo + step * (i + 1));
    return (
        <svg className="mg-glyph mg-table-mark" viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
            <rect x={lo} y={lo} width={hi - lo} height={hi - lo} strokeWidth="4.5" />
            {lines.map((v) => <path key={v} d={`M ${v} ${lo} V ${hi} M ${lo} ${v} H ${hi}`} strokeWidth={side > 6 ? 1.6 : 2.4} />)}
        </svg>
    );
}

// The sign a card or plaque wears: the table mark, the drawn or set sign, or
// (on a ready page) the kit's gap mark.
function LetterSign({ letter }) {
    if (isTable(letter)) return <TableMark side={letter.rows.length} />;
    if (!letter.glyph && !letter.char) return <MagicGlyph g={null} />;
    return <Sign of={letter} />;
}

// A table's numbers, rows from the top, as the module gives them: a cell the
// sources read two ways is left open, and a cell restored from the sums is
// marked, each with its key under the table.
function SquareTable({ letter }) {
    const restored = new Set((letter.restoredCells || []).map(([r, c]) => `${r}-${c}`));
    const open = letter.rows.some((row) => row.some((v) => v == null));
    return (
        <figure className="mg-square">
            <table aria-label={`${letter.name}: ${letter.rows.length} rows of ${letter.rows.length}, read from the top`}>
                <tbody>
                    {letter.rows.map((row, r) => (
                        <tr key={r}>
                            {row.map((v, c) => {
                                const fixed = restored.has(`${r + 1}-${c + 1}`);
                                return (
                                    <td key={c} className={v == null ? 'is-open' : fixed ? 'is-restored' : undefined}>
                                        {v == null ? <span aria-label="read two ways">·</span> : v}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            {(open || restored.size > 0) && (
                <figcaption>
                    {open && <span><span className="mg-square-key is-open">·</span> read two ways: see the note</span>}
                    {restored.size > 0 && <span><span className="mg-square-key is-restored">n</span> unreadable in the transcription, restored from the sums</span>}
                </figcaption>
            )}
        </figure>
    );
}

// The hall a keyed value points into, with a link to that letter there.
function ValueLink({ value, keyedTo, hallIndex }) {
    if (keyedTo === 'none' || hallIndex == null) return <>{value}</>;
    return (
        <Link to={`/third-lamp/education/${keyedTo}#edu-letter-${hallIndex}`}
            className={keyedTo === 'hebrew' ? 'edu-glyph mg-value-link' : 'mg-value-link'}
            lang={keyedTo === 'hebrew' ? 'he' : undefined}>
            {value}
        </Link>
    );
}

// `formless` is a page of the wing that is not an alphabet (the author's
// chapters, the lineage's books): its entries have no form to show or trace,
// so neither the card nor the plaque wears a sign or speaks of one.
function Plaque({ letter, mod, keyedTo, hebrewKey, hallIndex, formless }) {
    const drawn = Boolean(letter.glyph);
    const table = isTable(letter);
    const form = drawn ? `drawn — ${reservation(letter)}`
        : letter.char ? `set in the font — ${reservation(letter)}`
            : table ? 'a table of numbers, given below; not a figure'
                : 'not drawn — the note says why';
    return (
        <aside className={`edu-letter-plaque mg-plaque${formless ? ' is-formless' : ''}`} aria-live="polite">
            {!formless && (
                <div className="edu-plaque-glyph edu-glyph" aria-hidden="true">
                    <LetterSign letter={letter} />
                </div>
            )}
            <div className="edu-plaque-body">
                <h3>
                    {letter.name}
                    {letter.gloss && letter.gloss !== letter.value ? <span className="mg-plaque-gloss">{letter.gloss}</span> : null}
                    {drawn && letter.formConfidence === 'low' ? <span className="edu-plaque-badge">drawn with reservation</span> : null}
                </h3>
                <dl>
                    {letter.value != null && !(keyedTo === 'none' && repeatsTranslit(letter)) && (
                        <div><dt>{mod.valueLabel || 'Stands for'}</dt><dd><ValueLink value={letter.value} keyedTo={keyedTo} hallIndex={hallIndex} /></dd></div>
                    )}
                    {letter.value == null && letter.valueNote && <div><dt>Stands for</dt><dd>{letter.valueNote}</dd></div>}
                    {letter.translit && <div><dt>{formless ? 'Where and when' : 'Transliteration'}</dt><dd className="mg-translit">{letter.translit}</dd></div>}
                    {hebrewKey && <div><dt>Number</dt><dd>{hebrewKey.value}</dd></div>}
                    {letter.planet && <div><dt>Planet</dt><dd>{letter.planet}</dd></div>}
                    {letter.codepoint && <div><dt>Unicode</dt><dd className="mg-codepoint">{letter.codepoint} · {letter.unicodeName}</dd></div>}
                    {!formless && <div><dt>Form</dt><dd>{form}</dd></div>}
                </dl>
                {letter.poemNames && (
                    <dl className="mg-plaque-poems">
                        {POEMS.map(([k, name]) => letter.poemNames[k] && (
                            <div key={k}><dt>{name} poem</dt><dd>{letter.poemNames[k]}</dd></div>
                        ))}
                    </dl>
                )}
                {drawn && letter.strokes && <p className="mg-plaque-strokes"><span>Drawn</span> {letter.strokes}</p>}
                {table && <SquareTable letter={letter} />}
                {letter.note && <p className="edu-plaque-note">{isolate(letter.note)}</p>}
                {(letter.variants || []).length > 0 && (
                    <div className="mg-variants">
                        <p className="mg-variants-label">In other editions</p>
                        <ul>
                            {letter.variants.map((v, i) => (
                                <li key={i}>
                                    <span className="mg-variant-sign edu-glyph"><Sign of={v} label={`${letter.name} as in ${v.source}`} /></span>
                                    <span className="mg-variant-source">{v.source}</span>
                                    {v.note && <span className="mg-variant-note">{isolate(v.note)}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </aside>
    );
}

export function LetterGrid({ mod, letters, keyedTo = 'none', direction = 'ltr', label, hebrewKeys, formless = false }) {
    const [selected, setSelected] = useState(() => {
        const i = typeof window !== 'undefined' ? letterIndexOf(window.location.hash) : null;
        return i != null && i < letters.length ? i : 0;
    });
    // Where the plaque moves (below the group that holds the selection), the
    // page above a card can grow or shrink; `hold` keeps the card the reader
    // acted on where it was on the screen, and `arrive` brings a letter named
    // by the address into view and puts the keyboard on it.
    const hold = useRef(null);
    const arrive = useRef(null);
    // A search result arrives as a hash, on a cold load or as a second result
    // to the same page; follow it.
    const { hash, key } = useLocation();
    useEffect(() => {
        const i = letterIndexOf(hash);
        if (i == null || i >= letters.length) return;
        arrive.current = i;
        setSelected(i);
        // the same letter again: no render follows, so arrive now
        const el = document.getElementById(`mg-letter-${i}`);
        if (el && el.getAttribute('aria-selected') === 'true') {
            arrive.current = null;
            el.focus({ preventScroll: true });
            el.scrollIntoView({ block: 'start' });
        }
    }, [hash, key, letters.length]);
    useLayoutEffect(() => {
        const el = document.getElementById(`mg-letter-${selected}`);
        if (!el) return;
        if (arrive.current === selected) {
            arrive.current = null;
            el.focus({ preventScroll: true });
            el.scrollIntoView({ block: 'start' });
            return;
        }
        if (hold.current && hold.current.i === selected) {
            const shift = el.getBoundingClientRect().top - hold.current.top;
            hold.current = null;
            if (Math.abs(shift) > 1) window.scrollBy(0, shift);
            // a card the arrow keys reached off screen is brought into view
            const r = el.getBoundingClientRect();
            if (r.top < 0 || r.bottom > window.innerHeight) el.scrollIntoView({ block: 'nearest' });
        }
    }, [selected]);
    const choose = (i) => {
        const el = document.getElementById(`mg-letter-${i}`);
        hold.current = el ? { i, top: el.getBoundingClientRect().top } : null;
        setSelected(i);
    };

    const rtl = direction === 'rtl';
    const letter = letters[selected] || null;
    const hallIndexOf = (l) => {
        if (!hebrewKeys || l.value == null) return null;
        const k = hebrewKeys.find((h) => h.glyph === l.value);
        return k ? k.i : null;
    };
    const hebrewKeyOf = (l) => (hebrewKeys && l.value != null ? hebrewKeys.find((h) => h.glyph === l.value) || null : null);

    // Letters sit in their groups (the ættir, the kinds of sign) when the
    // module declares them; the keyboard walks the whole alphabet in order.
    const groups = useMemo(() => {
        if (!mod.groups) return [{ key: '_', label: null, items: letters.map((l, i) => [l, i]) }];
        return mod.groups.map((g) => ({ ...g, items: letters.map((l, i) => [l, i]).filter(([l]) => l.group === g.key) }));
    }, [mod.groups, letters]);
    // On a wide screen every group of a grouped alphabet shares one column
    // count — the largest group's, up to eight, or up to nine where every
    // group is the same size — so the ættir stand as rows of eight, the nine
    // chambers' classes as rows of nine, and the cards keep one width from
    // group to group. Where every group divides by four (the futhark's ættir
    // of eight), narrower screens set them four to a row; where every group
    // divides by three (the classes of nine), three to a row, which also lays
    // a class out as the chambers stand in Agrippa's grid. No group ends in a
    // ragged row.
    const sizes = groups.map((g) => g.items.length);
    const uniform = sizes.every((n) => n === sizes[0]);
    const cols = mod.groups ? (uniform && sizes[0] <= 9 ? sizes[0] : Math.min(8, Math.max(...sizes))) : null;
    const quartered = Boolean(mod.groups) && sizes.every((n) => n % 4 === 0);
    const thirded = Boolean(mod.groups) && !quartered && sizes.every((n) => n % 3 === 0);
    // groups of four or five (the planets) stand two to a row on a phone
    const halved = Boolean(mod.groups) && !quartered && !thirded && Math.max(...sizes) <= 5;

    const onKeyDown = (e) => {
        const last = letters.length - 1;
        const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowDown: 1, ArrowUp: -1 }[e.key];
        let next = null;
        if (step != null) next = Math.min(last, Math.max(0, selected + step));
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;
        if (next == null || next === selected) return;
        e.preventDefault();
        choose(next);
        document.getElementById(`mg-letter-${next}`)?.focus({ preventScroll: true });
    };

    // `wide`: the first card of an odd group, set across the row where the
    // group stands two to a row (is-halved), so the group ends evenly
    const card = ([l, i], wide = false) => (
        <button
            type="button"
            key={`${l.name}-${i}`}
            id={`mg-letter-${i}`}
            role="option"
            aria-selected={selected === i}
            tabIndex={selected === i ? 0 : -1}
            className={`edu-letter-card mg-letter-card${selected === i ? ' is-selected' : ''}${l.glyph ? ' is-drawn' : isTable(l) ? ' is-table' : !l.char && !formless ? ' is-gap' : ''}${formless ? ' is-formless' : ''}${wide ? ' is-wide' : ''}`}
            onClick={() => choose(i)}
        >
            {!formless && <span className="edu-letter-glyph edu-glyph" dir={rtl ? 'rtl' : undefined}><LetterSign letter={l} /></span>}
            {/* a long word is set smaller so it breaks at a space, not inside the
                word; a page's titles ("II.48 · Geomantic figures") sit in
                tracked capitals with no sign above them, and break a letter sooner */}
            {(() => {
                // a name with a gloss in brackets ("Samech (the second sign)")
                // sets the gloss as a small line under the name, so one long
                // label does not stretch its whole row of cards
                const [, main, sub] = /^(.+?)\s*\((.+)\)$/.exec(String(l.name)) || [null, String(l.name), null];
                return (
                    <span className={`edu-letter-name${main.split(/\s+/).some((w) => w.length >= (formless ? 9 : 10)) ? ' is-long' : ''}`}>
                        {main}{sub && <>{' '}<span className="mg-letter-sub">{sub}</span></>}
                    </span>
                );
            })()}
            <span className="edu-letter-translit">{l.translit || l.planet || l.codepoint || ''}</span>
        </button>
    );
    const plaque = letter && (
        <Plaque letter={letter} mod={mod} keyedTo={keyedTo} hebrewKey={hebrewKeyOf(letter)} hallIndex={hallIndexOf(letter)} formless={formless} />
    );

    // One alphabet, one listbox. A grouped one is a listbox per group (each
    // named by its group, all under one group named for the alphabet), so the
    // plaque can stand directly under the group that holds the selection
    // without sitting inside a listbox: a reader who clicks a planet sees its
    // plaque below the planets, not a screen or more further down.
    if (!mod.groups) {
        // a name of eleven letters or more in one word needs a wider card
        const longNames = letters.some((l) => String(l.name).split(/\s+/).some((w) => w.length >= 11));
        return (
            <>
                <div
                    className={`edu-letter-grid mg-letter-groups${longNames ? ' has-long-names' : ''}`}
                    role="listbox"
                    aria-label={label}
                    aria-activedescendant={letter ? `mg-letter-${selected}` : undefined}
                    onKeyDown={onKeyDown}
                    dir={rtl ? 'rtl' : undefined}
                >
                    {groups[0].items.map((it) => card(it))}
                </div>
                {plaque}
            </>
        );
    }
    return (
        <div className="mg-letter-groups is-grouped" role="group" aria-label={label}>
            {groups.map((g) => {
                const holds = g.items.some(([, i]) => i === selected);
                return (
                    <React.Fragment key={g.key}>
                        <div className="mg-letter-group">
                            <p className="mg-group-label" id={`mg-group-${g.key}`} dir="ltr">
                                <span>{g.label}</span>{g.note && <em>{isolate(g.note)}</em>}
                            </p>
                            <div
                                className={`edu-letter-grid mg-cols${quartered ? ' is-quartered' : ''}${thirded ? ' is-thirded' : ''}${halved ? ' is-halved' : ''}`}
                                style={{ '--mg-cols': cols }}
                                role="listbox"
                                aria-labelledby={`mg-group-${g.key}`}
                                aria-activedescendant={holds ? `mg-letter-${selected}` : undefined}
                                onKeyDown={onKeyDown}
                                dir={rtl ? 'rtl' : undefined}
                            >
                                {g.items.map((it, k) => card(it, halved && k === 0 && g.items.length % 2 === 1))}
                            </div>
                        </div>
                        {holds && plaque}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

// The state of an alphabet whose forms are being traced: no boxes waiting to
// be filled, but the register of its letters — number, name, what each
// stands for, its number where the Hebrew hall gives one, and its own note —
// under one plain notice saying from which edition the forms are coming.
export function PendingLedger({ mod, letters, keyedTo, hebrewKeys, latinKeys }) {
    const { hash, key } = useLocation();
    const target = letterIndexOf(hash);
    // a letter named by the address takes the keyboard, as in the grid
    useEffect(() => {
        if (target != null) document.getElementById(`mg-letter-${target}`)?.focus({ preventScroll: true });
    }, [target, key]);
    const hebrew = keyedTo === 'hebrew';
    const shared = sharedNote(letters);
    const showValue = letters.some((l) => l.value != null && l.value !== l.name);
    const showTranslit = letters.some((l) => l.translit && l.translit !== String(l.name).toLowerCase());
    const numberOf = (l) => (hebrew && hebrewKeys ? hebrewKeys.find((h) => h.glyph === l.value)?.value ?? null : null);
    const latinIndexOf = (l) => (keyedTo === 'latin' && latinKeys ? latinKeys.find((k) => k.glyph === l.value)?.i ?? null : null);
    const own = letters.filter((l) => l.note && l.note !== shared).length;
    // A register of bare letters (no value, transliteration or number beside
    // the name) packs into a grid on a phone, the noted letters across it.
    const bare = !showValue && !showTranslit && !hebrew;
    return (
        <div className="mg-pending">
            <div className="mg-pending-notice" role="note">
                <Unstruck className="mg-unstruck-lg" />
                <div>
                    <p className="mg-pending-kicker">The letterforms</p>
                    <p className="mg-pending-text">{isolate(mod.drawing.pending)}</p>
                </div>
            </div>
            <div className="mg-register-wrap">
                <p className="mg-register-head" id="mg-register-caption">
                    {/* the order is each module's own (Hebrew order, Latin order,
                        Agrippa's classes, the English of 1651, display only),
                        and its scriptNote, just above, says which; the caption
                        claims none. A register not keyed to a hall's letters
                        (seals, staves, kinds of alphabet) counts entries. */}
                    <span>{keyedTo === 'none'
                        ? `The register: ${letters.length} entries`
                        : `The ${letters.length} letters of ${mod.title.replace(/^The /, 'the ')}`}</span>
                    {own > 0 && own < letters.length && <em>notes stand beside the letters that need them</em>}
                </p>
                <ol className={`mg-register${hebrew ? ' is-hebrew' : ''}${bare ? ' is-bare' : ''}`} aria-labelledby="mg-register-caption">
                    {letters.map((l, i) => {
                        const li = latinIndexOf(l);
                        const num = numberOf(l);
                        const note = l.note && l.note !== shared ? l.note : null;
                        return (
                            <li key={`${l.name}-${i}`} id={`mg-letter-${i}`} tabIndex={target === i ? -1 : undefined}
                                className={`mg-reg${note ? ' has-note' : ''}${target === i ? ' is-target' : ''}`}>
                                <span className="mg-reg-no" aria-hidden="true">{l.order}</span>
                                <span className="mg-reg-line">
                                    <span className="mg-reg-name">
                                        {li != null
                                            ? <Link to={`/third-lamp/education/latin#edu-letter-${li}`} title={`Latin ${l.value}, in the Latin hall`}>{l.name}</Link>
                                            : l.name}
                                    </span>
                                    {showValue && (
                                        <span className="mg-reg-value">
                                            {l.value != null
                                                ? <><span className="mg-reg-label">stands for</span> <span className={hebrew ? 'edu-glyph' : undefined} lang={hebrew ? 'he' : undefined}>{l.value}</span></>
                                                : <em>{isolate(l.valueNote)}</em>}
                                        </span>
                                    )}
                                    {showTranslit && l.translit && <span className="mg-reg-translit">{l.translit}</span>}
                                    {num != null && <span className="mg-reg-num"><span className="mg-reg-label">number</span> {num}</span>}
                                </span>
                                {!showValue && l.value == null && l.valueNote && <span className="mg-reg-valuenote">{isolate(l.valueNote)}</span>}
                                {note && <span className="mg-reg-note">{isolate(note)}</span>}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

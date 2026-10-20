import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sign, Unstruck } from './MagicGlyph';

// The letters of an alphabet, in the hall's own idiom: a grid that walks by
// keyboard (a listbox with a roving tabindex, the arrows following the
// alphabet's direction) and a plaque for the selected letter. A search result
// that points at #mg-letter-N selects that letter, where the halls only
// scroll to it. An alphabet whose forms are still being traced gets a ledger
// instead — every letter with its name, value, number and note, and one plain
// sentence saying where the forms will come from.

const letterIndexOf = (hash) => {
    const m = /^#mg-letter-(\d+)$/.exec(hash || '');
    return m ? Number(m[1]) : null;
};

const CONFIDENCE = { high: 'secure', medium: 'varies in the sources', low: 'uncertain' };
const POEMS = [['oldEnglish', 'Old English'], ['norwegian', 'Norwegian'], ['icelandic', 'Icelandic']];

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

function Plaque({ letter, mod, keyedTo, hebrewKey, hallIndex }) {
    const drawn = Boolean(letter.glyph);
    return (
        <aside className="edu-letter-plaque mg-plaque" aria-live="polite">
            <div className="edu-plaque-glyph edu-glyph" aria-hidden="true">
                <Sign of={letter} />
            </div>
            <div className="edu-plaque-body">
                <h3>
                    {letter.name}
                    {letter.gloss && letter.gloss !== letter.value ? <span className="mg-plaque-gloss">{letter.gloss}</span> : null}
                    {drawn && letter.formConfidence === 'low' ? <span className="edu-plaque-badge">drawn with reservation</span> : null}
                </h3>
                <dl>
                    {letter.value != null && (
                        <div><dt>{mod.valueLabel || 'Stands for'}</dt><dd><ValueLink value={letter.value} keyedTo={keyedTo} hallIndex={hallIndex} /></dd></div>
                    )}
                    {letter.value == null && letter.valueNote && <div><dt>Stands for</dt><dd>{letter.valueNote}</dd></div>}
                    {letter.translit && <div><dt>Transliteration</dt><dd className="mg-translit">{letter.translit}</dd></div>}
                    {hebrewKey && <div><dt>Number</dt><dd>{hebrewKey.value}</dd></div>}
                    {letter.planet && <div><dt>Planet</dt><dd>{letter.planet}</dd></div>}
                    {letter.codepoint && <div><dt>Unicode</dt><dd className="mg-codepoint">{letter.codepoint} · {letter.unicodeName}</dd></div>}
                    <div><dt>Form</dt><dd>{drawn ? `drawn — ${CONFIDENCE[letter.formConfidence]}` : `set in the font — ${CONFIDENCE[letter.formConfidence]}`}</dd></div>
                </dl>
                {letter.poemNames && (
                    <dl className="mg-plaque-poems">
                        {POEMS.map(([k, name]) => letter.poemNames[k] && (
                            <div key={k}><dt>{name} poem</dt><dd>{letter.poemNames[k]}</dd></div>
                        ))}
                    </dl>
                )}
                {drawn && letter.strokes && <p className="mg-plaque-strokes"><span>Drawn</span> {letter.strokes}</p>}
                {letter.note && <p className="edu-plaque-note">{letter.note}</p>}
                {(letter.variants || []).length > 0 && (
                    <div className="mg-variants">
                        <p className="mg-variants-label">In other editions</p>
                        <ul>
                            {letter.variants.map((v, i) => (
                                <li key={i}>
                                    <span className="mg-variant-sign edu-glyph"><Sign of={v} label={`${letter.name} as in ${v.source}`} /></span>
                                    <span className="mg-variant-source">{v.source}</span>
                                    {v.note && <span className="mg-variant-note">{v.note}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </aside>
    );
}

export function LetterGrid({ mod, letters, keyedTo = 'none', direction = 'ltr', label, hebrewKeys }) {
    const [selected, setSelected] = useState(() => {
        const i = typeof window !== 'undefined' ? letterIndexOf(window.location.hash) : null;
        return i != null && i < letters.length ? i : 0;
    });
    // A second search result to the same page arrives as a new hash; follow it.
    const { hash, key } = useLocation();
    useEffect(() => {
        const i = letterIndexOf(hash);
        if (i != null && i < letters.length) setSelected(i);
    }, [hash, key, letters.length]);

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
    // count — the largest group's, up to eight — so the ættir stand as rows of
    // eight and the cards keep one width from group to group.
    const cols = mod.groups ? Math.min(8, Math.max(...groups.map((g) => g.items.length))) : null;

    const onKeyDown = (e) => {
        const last = letters.length - 1;
        const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1, ArrowDown: 1, ArrowUp: -1 }[e.key];
        let next = null;
        if (step != null) next = Math.min(last, Math.max(0, selected + step));
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = last;
        if (next == null || next === selected) return;
        e.preventDefault();
        setSelected(next);
        document.getElementById(`mg-letter-${next}`)?.focus();
    };

    const card = ([l, i]) => (
        <button
            type="button"
            key={`${l.name}-${i}`}
            id={`mg-letter-${i}`}
            role="option"
            aria-selected={selected === i}
            tabIndex={selected === i ? 0 : -1}
            className={`edu-letter-card mg-letter-card${selected === i ? ' is-selected' : ''}${l.glyph ? ' is-drawn' : ''}`}
            onClick={() => setSelected(i)}
        >
            <span className="edu-letter-glyph edu-glyph" dir={rtl ? 'rtl' : undefined}><Sign of={l} /></span>
            <span className={`edu-letter-name${String(l.name).split(/\s+/).some((w) => w.length > 10) ? ' is-long' : ''}`}>{l.name}</span>
            <span className="edu-letter-translit">{l.translit || l.planet || l.codepoint || ''}</span>
        </button>
    );

    return (
        <>
            <div
                className={`mg-letter-groups${mod.groups ? ' is-grouped' : ''}`}
                role="listbox"
                aria-label={label}
                aria-activedescendant={letter ? `mg-letter-${selected}` : undefined}
                onKeyDown={onKeyDown}
                dir={rtl ? 'rtl' : undefined}
            >
                {groups.map((g) => (g.label ? (
                    <div className="mg-letter-group" role="group" aria-labelledby={`mg-group-${g.key}`} key={g.key}>
                        <p className="mg-group-label" id={`mg-group-${g.key}`} dir="ltr">
                            <span>{g.label}</span>{g.note && <em>{g.note}</em>}
                        </p>
                        <div className={`edu-letter-grid${cols ? ' mg-cols' : ''}`} style={cols ? { '--mg-cols': cols } : undefined}>{g.items.map(card)}</div>
                    </div>
                ) : (
                    <div className="edu-letter-grid" key={g.key}>{g.items.map(card)}</div>
                )))}
            </div>
            {letter && (
                <Plaque letter={letter} mod={mod} keyedTo={keyedTo} hebrewKey={hebrewKeyOf(letter)} hallIndex={hallIndexOf(letter)} />
            )}
        </>
    );
}

// The note most letters share. While an alphabet's forms are being traced it
// is the reason for the gap, the same for every letter: the notice above the
// register gives it once, and the register prints only the notes that say
// something of their own letter.
export function sharedNote(letters) {
    const counts = new Map();
    for (const l of letters) if (l.note) counts.set(l.note, (counts.get(l.note) || 0) + 1);
    let best = null;
    let n = 0;
    for (const [note, c] of counts) if (c > n) { best = note; n = c; }
    return n >= 3 && n * 3 >= letters.length ? best : null;
}

// The state of an alphabet whose forms are being traced: no boxes waiting to
// be filled, but the register of its letters — number, name, what each
// stands for, its number where the Hebrew hall gives one, and its own note —
// under one plain notice saying from which edition the forms are coming.
export function PendingLedger({ mod, letters, keyedTo, hebrewKeys, latinKeys }) {
    const { hash } = useLocation();
    const target = letterIndexOf(hash);
    const hebrew = keyedTo === 'hebrew';
    const shared = sharedNote(letters);
    const showValue = letters.some((l) => l.value != null && l.value !== l.name);
    const showTranslit = letters.some((l) => l.translit && l.translit !== String(l.name).toLowerCase());
    const numberOf = (l) => (hebrew && hebrewKeys ? hebrewKeys.find((h) => h.glyph === l.value)?.value ?? null : null);
    const latinIndexOf = (l) => (keyedTo === 'latin' && latinKeys ? latinKeys.find((k) => k.glyph === l.value)?.i ?? null : null);
    const own = letters.filter((l) => l.note && l.note !== shared).length;
    return (
        <div className="mg-pending">
            <div className="mg-pending-notice" role="note">
                <Unstruck className="mg-unstruck-lg" />
                <div>
                    <p className="mg-pending-kicker">The letterforms</p>
                    <p className="mg-pending-text">{mod.drawing.pending}</p>
                </div>
            </div>
            <div className="mg-register-wrap">
                <p className="mg-register-head" id="mg-register-caption">
                    <span>The {letters.length} letters of {mod.title.replace(/^The /, 'the ')}, in the order of the table</span>
                    {own > 0 && own < letters.length && <em>notes stand beside the letters that need them</em>}
                </p>
                <ol className={`mg-register${hebrew ? ' is-hebrew' : ''}`} aria-labelledby="mg-register-caption">
                    {letters.map((l, i) => {
                        const li = latinIndexOf(l);
                        const num = numberOf(l);
                        const note = l.note && l.note !== shared ? l.note : null;
                        return (
                            <li key={`${l.name}-${i}`} id={`mg-letter-${i}`}
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
                                                : <em>{l.valueNote}</em>}
                                        </span>
                                    )}
                                    {showTranslit && l.translit && <span className="mg-reg-translit">{l.translit}</span>}
                                    {num != null && <span className="mg-reg-num"><span className="mg-reg-label">number</span> {num}</span>}
                                </span>
                                {!showValue && l.value == null && l.valueNote && <span className="mg-reg-valuenote">{l.valueNote}</span>}
                                {note && <span className="mg-reg-note">{note}</span>}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
}

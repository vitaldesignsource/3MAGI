import React, { useMemo, useState } from 'react';

// The Reckoner — the Scriptorium's working tool. Four modes, one per hall:
// Hebrew gematria and Greek isopsephy computed live from the same verified
// letter values the alphabet section displays; a two-way Roman numeral
// converter; and a hieroglyphic number composer built from the digit signs.
// Everything derives from the hall's own data — no second value table to
// drift out of agreement with the displayed one.

// Strip pointing and diacritics so pasted polytonic Greek or pointed Hebrew
// reckons on its base letters: combining marks U+0300-036F (Greek accents,
// breathings after NFD) and U+0591-05C7 (Hebrew cantillation and niqqud).
const strip = (s) => s.normalize('NFD').replace(/[̀-֑ͯ-ׇ]/g, '');

function buildValueMap(letters) {
    const map = new Map();
    for (const l of letters) {
        if (l.value == null) continue;
        for (const ch of l.glyph.replace(/\s/g, '')) map.set(ch, l.value);
        if (l.final) for (const ch of l.final) map.set(ch, l.value);
    }
    return map;
}

function LetterSum({ letters, placeholder, kindLabel, dir }) {
    const [text, setText] = useState('');
    const map = useMemo(() => buildValueMap(letters), [letters]);

    const { parts, total, ignored } = useMemo(() => {
        const parts = [];
        const ignored = new Set();
        let total = 0;
        for (const ch of strip(text)) {
            if (/\s/.test(ch)) continue;
            const v = map.get(ch);
            if (v == null) { if (ch.trim()) ignored.add(ch); continue; }
            parts.push({ ch, v });
            total += v;
        }
        return { parts, total, ignored: [...ignored] };
    }, [text, map]);

    return (
        <div className="edu-reckoner-body">
            <input
                type="text"
                dir={dir}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={placeholder}
                aria-label={`Text to reckon by ${kindLabel}`}
                className="edu-reckoner-input edu-glyph"
            />
            {parts.length > 0 && (
                <div className="edu-reckoner-result" aria-live="polite">
                    <div className="edu-reckoner-breakdown" dir={dir}>
                        {parts.map((p, i) => (
                            <span className="edu-reckoner-pair" key={i}>
                                <span className="edu-glyph">{p.ch}</span>
                                <span className="edu-reckoner-v">{p.v}</span>
                            </span>
                        ))}
                    </div>
                    <p className="edu-reckoner-total">
                        {kindLabel} <strong>{total}</strong>
                    </p>
                    {ignored.length > 0 && (
                        <p className="edu-reckoner-ignored">Passed over: {ignored.join(' ')}</p>
                    )}
                </div>
            )}
        </div>
    );
}

function RomanConverter({ digits }) {
    const [text, setText] = useState('');
    const values = useMemo(() => {
        const m = new Map();
        for (const d of digits) m.set(d.glyph.toUpperCase(), d.value);
        return m;
    }, [digits]);

    const result = useMemo(() => {
        const t = text.trim();
        if (!t) return null;
        if (/^[0-9]+$/.test(t)) {
            const n = parseInt(t, 10);
            if (n < 1 || n > 3999) return { error: 'The classical notation reaches MMMCMXCIX — give a number from 1 to 3999.' };
            const table = [
                [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
                [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
                [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
            ];
            let rest = n, out = '';
            for (const [v, s] of table) while (rest >= v) { out += s; rest -= v; }
            return { from: String(n), to: out };
        }
        if (/^[IVXLCDMivxlcdm]+$/.test(t)) {
            const up = t.toUpperCase();
            let total = 0;
            for (let i = 0; i < up.length; i++) {
                const v = values.get(up[i]) || 0;
                const next = i + 1 < up.length ? (values.get(up[i + 1]) || 0) : 0;
                total += v < next ? -v : v;
            }
            return { from: up, to: String(total) };
        }
        return { error: 'Give either a number (2026) or a Roman numeral (MMXXVI).' };
    }, [text, values]);

    return (
        <div className="edu-reckoner-body">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="2026 · or · MMXXVI"
                aria-label="Number or Roman numeral to convert"
                className="edu-reckoner-input"
            />
            {result && (
                <div className="edu-reckoner-result" aria-live="polite">
                    {result.error
                        ? <p className="edu-reckoner-ignored">{result.error}</p>
                        : <p className="edu-reckoner-total">{result.from} = <strong>{result.to}</strong></p>}
                </div>
            )}
        </div>
    );
}

function EgyptianComposer({ digits }) {
    const [text, setText] = useState('');
    // magnitude → glyph, from the hall's verified digit signs
    const byValue = useMemo(() => {
        const m = new Map();
        for (const d of digits) m.set(d.value, d.glyph);
        return m;
    }, [digits]);

    const result = useMemo(() => {
        const t = text.trim();
        if (!t) return null;
        if (!/^[0-9]+$/.test(t)) return { error: 'Give a whole number.' };
        const n = parseInt(t, 10);
        if (n < 1 || n > 9999999) return { error: 'The signs reach 9,999,999 — the scribes wrote nothing larger in one figure.' };
        const groups = [];
        let rest = n;
        for (const mag of [1000000, 100000, 10000, 1000, 100, 10, 1]) {
            const count = Math.floor(rest / mag);
            rest %= mag;
            const glyph = byValue.get(mag);
            if (count > 0 && glyph) groups.push({ glyph, count, mag });
        }
        return { n, groups };
    }, [text, byValue]);

    return (
        <div className="edu-reckoner-body">
            <input
                type="text"
                inputMode="numeric"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="2026"
                aria-label="Number to write in hieroglyphs"
                className="edu-reckoner-input"
            />
            {result && (
                <div className="edu-reckoner-result" aria-live="polite">
                    {result.error
                        ? <p className="edu-reckoner-ignored">{result.error}</p>
                        : (
                            <>
                                <p className="edu-reckoner-hiero edu-glyph">
                                    {result.groups.map((g, i) => (
                                        <span key={i} title={`${g.count} × ${g.mag.toLocaleString()}`}>
                                            {g.glyph.repeat(g.count)}{' '}
                                        </span>
                                    ))}
                                </p>
                                <p className="edu-reckoner-total">
                                    {result.n.toLocaleString()}, written largest sign first
                                </p>
                            </>
                        )}
                </div>
            )}
        </div>
    );
}

const COPY = {
    hebrew: {
        title: 'The Reckoner',
        lead: 'Type or paste Hebrew and it is summed letter by letter — plain gematria, finals at their base values, pointing passed over.',
        placeholder: 'חכמה',
        kindLabel: 'Gematria', dir: 'rtl',
    },
    greek: {
        title: 'The Reckoner',
        lead: 'Type or paste Greek and it is summed by the Milesian values — isopsephy as the amulet-cutters practised it, accents and breathings passed over.',
        placeholder: 'λογος',
        kindLabel: 'Isopsephy', dir: undefined,
    },
    latin: {
        title: 'The Reckoner',
        lead: 'Give a number to see it in Roman notation, or a Roman numeral to read it back.',
    },
    egyptian: {
        title: 'The Reckoner',
        lead: 'Give a number and the scribe writes it: each magnitude has its own sign, repeated as many times as needed, greatest first.',
    },
};

function ScriptoriumReckoner({ lang, letters, numbers }) {
    const copy = COPY[lang];
    if (!copy) return null;
    if ((lang === 'latin' || lang === 'egyptian') && !numbers) return null;

    return (
        <section className="edu-reckoner" aria-labelledby="edu-reckoner-heading">
            <header className="edu-section-head">
                <p className="kicker">A Working Tool</p>
                <h2 id="edu-reckoner-heading">{copy.title}</h2>
                <p>{copy.lead}</p>
            </header>
            {lang === 'hebrew' || lang === 'greek'
                ? <LetterSum letters={letters} placeholder={copy.placeholder} kindLabel={copy.kindLabel} dir={copy.dir} />
                : lang === 'latin'
                    ? <RomanConverter digits={numbers.digits} />
                    : <EgyptianComposer digits={numbers.digits} />}
        </section>
    );
}

export default ScriptoriumReckoner;

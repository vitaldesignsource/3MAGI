import React, { useMemo, useState } from 'react';

// The Reckoner — the Scriptorium's working tool. Three modes: a letter-sum
// for the eight halls whose alphabets carry numeric values (Hebrew gematria,
// Greek isopsephy, Arabic and Persian abjad, Syriac, Aramaic, Coptic and
// Armenian numerals), a two-way Roman numeral converter, and a hieroglyphic
// number composer. Every value is read from the hall's own alphabet data, so
// there is no second table to drift out of agreement with the displayed one.

// Strip pointing and diacritics so pasted text reckons on its base letters:
// Greek accents and breathings (after NFD), Hebrew niqqud and cantillation,
// Arabic and Persian harakat, Syriac vowel points, and the Coptic supralinear
// stroke — none of which carry numeric value in any of these systems.
const strip = (s) => s.normalize('NFD').replace(
    /[̀-֑ͯ-ׇؐ-ًؚ-ٰٟۖ-ۭܰ-݊]/g, '');

function buildValueMap(letters) {
    const map = new Map();
    const put = (ch, v) => {
        if (!ch || map.has(ch)) return;
        map.set(ch, v);
        // Halls differ in which case they store: Greek gives both ("Α α"),
        // Armenian and Coptic only one. Register the counterpart so a reader
        // who pastes Աստուած is not silently given the value of its first
        // letter alone.
        const lower = ch.toLowerCase();
        const upper = ch.toUpperCase();
        if (lower !== ch && !map.has(lower)) map.set(lower, v);
        if (upper !== ch && upper.length === 1 && !map.has(upper)) map.set(upper, v);
    };
    for (const l of letters) {
        if (l.value == null) continue;
        for (const ch of l.glyph.replace(/\s/g, '')) put(ch, l.value);
        if (l.final) for (const ch of l.final) put(ch, l.value);
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

// Halls whose letters carry numeric values all reckon the same way; only the
// name of the practice and the sample word change. Arabic is the notable one:
// its entire science of letters, ʿilm al-ḥurūf, is this arithmetic.
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
    arabic: {
        title: 'The Reckoner',
        lead: 'Type or paste Arabic and it is summed by the abjad values — ḥisāb al-jummal, the arithmetic beneath the whole science of letters.',
        placeholder: 'الحق',
        kindLabel: 'Abjad', dir: 'rtl',
    },
    persian: {
        title: 'The Reckoner',
        lead: 'Abjad reckoning as the Persian chronogrammatists used it. The four letters made for Persian — pe, che, zhe and gaf — carry no value and are passed over.',
        placeholder: 'عشق',
        kindLabel: 'Abjad', dir: 'rtl',
    },
    syriac: {
        title: 'The Reckoner',
        lead: 'The Syriac letters reckon exactly as the Hebrew and Greek do; this is the arithmetic of a manuscript colophon.',
        placeholder: 'ܡܪܝܐ',
        kindLabel: 'Numeral value', dir: 'rtl',
    },
    aramaic: {
        title: 'The Reckoner',
        lead: 'The square script sums as it does in Hebrew — the reckoning behind the names written into the incantation bowls.',
        placeholder: 'אשותא',
        kindLabel: 'Numeral value', dir: 'rtl',
    },
    coptic: {
        title: 'The Reckoner',
        lead: 'Coptic inherits the Greek numerals along with the Greek letters; the Demotic-derived letters carry no value and are passed over.',
        placeholder: 'ⲡⲛⲟⲩⲧⲉ',
        kindLabel: 'Numeral value', dir: undefined,
    },
    armenian: {
        title: 'The Reckoner',
        lead: 'Mesrop\u2019s alphabet counts in a clean four-decade scheme, and Armenian scribes dated their manuscripts with it.',
        placeholder: 'Աստուած',
        kindLabel: 'Numeral value', dir: undefined,
    },
};

// Every hall that reckons by summing its letters.
const LETTER_SUM_HALLS = new Set([
    'hebrew', 'greek', 'arabic', 'persian', 'syriac', 'aramaic', 'coptic', 'armenian',
]);

function ScriptoriumReckoner({ lang, letters, numbers }) {
    const copy = COPY[lang];
    if (!copy) return null;
    // Latin and Egyptian reckon from the Numbers section's digits; the rest
    // reckon from the alphabet, and need no Numbers section to work.
    if (!LETTER_SUM_HALLS.has(lang) && !numbers) return null;
    if (LETTER_SUM_HALLS.has(lang) && !letters.some((l) => l.value != null)) return null;

    return (
        <section className="edu-reckoner" aria-labelledby="edu-reckoner-heading">
            <header className="edu-section-head">
                <p className="kicker">A Working Tool</p>
                <h2 id="edu-reckoner-heading">{copy.title}</h2>
                <p>{copy.lead}</p>
            </header>
            {LETTER_SUM_HALLS.has(lang)
                ? <LetterSum letters={letters} placeholder={copy.placeholder} kindLabel={copy.kindLabel} dir={copy.dir} />
                : lang === 'latin'
                    ? <RomanConverter digits={numbers.digits} />
                    : <EgyptianComposer digits={numbers.digits} />}
        </section>
    );
}

export default ScriptoriumReckoner;

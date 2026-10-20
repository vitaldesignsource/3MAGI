// The transliteration engine: plain JavaScript, no React and no
// import.meta, so the page uses it and node can test it.
//
// A scheme comes from compare.generated.js, so the tool reads the same letter
// data as the comparison tables and cannot disagree with them:
//   { from: 'latin' | 'hebrew', keys: [{ key, i, name, translit, sign }],
//     folds: [{ from, to, note }], finals: { 'ך': 'כ', … } }
//
// Latin-keyed schemes apply the folds the alphabet's own data declares, and
// report every fold they used. Hebrew-keyed schemes accept Hebrew only: no
// Latin-to-Hebrew spelling is invented. Pointing is stripped with the same
// ranges as the Reckoner, and a final letter is written with the alphabet's
// own final sign where it has one, otherwise with the base sign — and the
// result says which was done, and how many marks of pointing it removed.

// The Reckoner's strip ranges (ScriptoriumReckoner.jsx): combining marks,
// Hebrew points and cantillation, Arabic harakat, Syriac vowel points. The
// Hebrew punctuation inside the points' block is not pointing and is kept
// out: maqaf (U+05BE), which joins two words and so is read as a word break,
// paseq (U+05C0), sof pasuq (U+05C3) and nun hafukha (U+05C6), which are
// passed over and listed like any other punctuation.
const STRIP_RANGES = [[0x0300, 0x036F], [0x0591, 0x05C7], [0x0610, 0x061A], [0x064B, 0x065F],
    [0x0670, 0x0670], [0x06D6, 0x06ED], [0x0730, 0x074A]];
const HEBREW_PUNCTUATION = new Set([0x05BE, 0x05C0, 0x05C3, 0x05C6]);
const MAQAF = '\u05BE';
const isStripped = (cp) => !HEBREW_PUNCTUATION.has(cp) && STRIP_RANGES.some(([a, b]) => cp >= a && cp <= b);
const stripPointing = (s) => Array.from(s.normalize('NFD')).filter((c) => !isStripped(c.codePointAt(0))).join('');
// How many marks stripPointing removes, so the result can say so.
const countPointing = (s) => Array.from(s.normalize('NFD')).filter((c) => isStripped(c.codePointAt(0))).length;
const isHebrewLetter = (c) => { const cp = c.codePointAt(0); return cp >= 0x05D0 && cp <= 0x05EA; };
const isSpace = (c) => /\s/u.test(c);
const baseLatin = (c) => c.normalize('NFD').replace(/\p{M}/gu, '');

export function transliterate(text, scheme) {
    const byKey = new Map(scheme.keys.map((k) => [k.key, k]));
    const words = [[]];
    const ignored = new Set();
    const folds = new Map();     // 'th → þ' → count
    const finals = new Map();    // 'ך' → { base, own, count }
    let nonHebrew = false;
    let pointing = 0;
    const put = (src, keys, note) => {
        const letters = keys.map((k) => byKey.get(k));
        words[words.length - 1].push({ src, letters, note });
    };
    const space = () => { if (words[words.length - 1].length) words.push([]); };

    if (scheme.from === 'hebrew') {
        pointing = countPointing(text);
        for (const c of stripPointing(text)) {
            if (isSpace(c)) { space(); continue; }
            if (c === MAQAF) { space(); ignored.add(c); continue; }
            if (scheme.finals && scheme.finals[c]) {
                const base = scheme.finals[c];
                const own = byKey.has(c);
                if (own || byKey.has(base)) {
                    put(c, [own ? c : base], own ? 'final form' : `written with the sign for ${base}`);
                    const f = finals.get(c) || { base, own, count: 0 };
                    f.count += 1;
                    finals.set(c, f);
                    continue;
                }
            }
            if (byKey.has(c)) { put(c, [c]); continue; }
            if (!isHebrewLetter(c)) nonHebrew = nonHebrew || /\p{L}/u.test(c);
            ignored.add(c);
        }
    } else {
        const s = text.normalize('NFC').toLowerCase();
        const multi = [...(scheme.folds || [])].sort((a, b) => b.from.length - a.from.length);
        // a fold is tested against only as many characters as the longest fold
        // has, so a long paste is read in linear time, not quadratic
        const longest = Math.max(1, ...multi.map((f) => Array.from(f.from).length));
        const chars = Array.from(s);
        for (let i = 0; i < chars.length;) {
            const c = chars[i];
            if (isSpace(c)) { space(); i += 1; continue; }
            const rest = chars.slice(i, i + longest).join('');
            const fold = multi.find((f) => rest.startsWith(f.from) && Array.from(f.to).every((k) => byKey.has(k)));
            if (fold) {
                put(fold.from, Array.from(fold.to), fold.note);
                const label = `${fold.from} → ${fold.to}`;
                folds.set(label, (folds.get(label) || 0) + 1);
                i += Array.from(fold.from).length;
                continue;
            }
            if (byKey.has(c)) { put(c, [c]); i += 1; continue; }
            const base = baseLatin(c);
            if (base !== c && base.length === 1) {
                const bf = multi.find((f) => f.from === base && Array.from(f.to).every((k) => byKey.has(k)));
                const keys = byKey.has(base) ? [base] : bf ? Array.from(bf.to) : null;
                if (keys) {
                    put(c, keys, 'mark dropped');
                    const label = `${c} → ${keys.join('')}`;
                    folds.set(label, (folds.get(label) || 0) + 1);
                    i += 1;
                    continue;
                }
            }
            ignored.add(c);
            i += 1;
        }
    }

    const out = words.filter((w) => w.length);
    return {
        words: out,
        plain: out.map((w) => w.map((p) => p.letters.map((l) => l.translit || l.key).join('')).join('')).join(' '),
        text: out.map((w) => w.map((p) => p.letters.map((l) => (l.sign && l.sign.char) || '').join('')).join('')).join(' '),
        drawable: out.every((w) => w.every((p) => p.letters.every((l) => l.sign))),
        ignored: [...ignored],
        folds: [...folds].map(([label, count]) => ({ label, count })),
        finals: [...finals].map(([final, f]) => ({ final, ...f })),
        nonHebrew,
        pointing,
    };
}

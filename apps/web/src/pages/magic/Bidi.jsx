import React from 'react';

// The wing's prose quotes Hebrew and Arabic inside English sentences: a
// letter beside its number (“ך 500, ם 600, ן 700”), a title beside its
// transliteration. Left to the bidi algorithm, a number or a comma that falls
// between two right-to-left letters joins their run, and the run is shown
// reversed — “800 ף ,700 ן” for “ן 700, ף 800”. Each run of Hebrew or Arabic
// (with the spaces inside it, so a phrase stays one run) is therefore set in
// its own <bdi>, which the sentence around it treats as a single neutral
// character: the English reads in order and the quoted run reads right to left.
//
// A run also keeps the full stops and Arabic commas and semicolons that stand
// between its words, as an Arabic list or heading is printed (“هرمس . واقليمون
// . وافلاطون”): split there, each word would be its own isolate, laid out in
// the English line from left to right, and the list would read backwards. A
// digit or a Latin comma still ends a run, as above. Each run names its
// language by its script, so that a screen reader reads it in a voice that
// knows the letters.

const HEBREW = '\\u0590-\\u05FF\\uFB1D-\\uFB4F';
const ARABIC = '\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
const RTL = HEBREW + ARABIC;
const RUN = new RegExp(`[${RTL}](?:[${RTL}\\s.\\u060C\\u061B]*[${RTL}])?`, 'g');
const ANY = new RegExp(`[${RTL}]`);
const IS_HEBREW = new RegExp(`^[${HEBREW}]`);

export function isolate(text) {
    if (typeof text !== 'string' || !ANY.test(text)) return text;
    const out = [];
    let last = 0;
    for (const m of text.matchAll(RUN)) {
        if (m.index > last) out.push(text.slice(last, m.index));
        out.push(<bdi key={m.index} dir="rtl" lang={IS_HEBREW.test(m[0]) ? 'he' : 'ar'}>{m[0]}</bdi>);
        last = m.index + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

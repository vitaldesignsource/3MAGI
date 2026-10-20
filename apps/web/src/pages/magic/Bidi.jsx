import React from 'react';

// The wing's prose quotes Hebrew and Arabic inside English sentences: a
// letter beside its number (“ך 500, ם 600, ן 700”), a title beside its
// transliteration. Left to the bidi algorithm, a number or a comma that falls
// between two right-to-left letters joins their run, and the run is shown
// reversed — “800 ף ,700 ן” for “ן 700, ף 800”. Each run of Hebrew or Arabic
// (with the spaces inside it, so a phrase stays one run) is therefore set in
// its own <bdi>, which the sentence around it treats as a single neutral
// character: the English reads in order and the quoted run reads right to left.

const RTL = '\\u0590-\\u05FF\\uFB1D-\\uFB4F\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF';
const RUN = new RegExp(`[${RTL}](?:[${RTL}\\s]*[${RTL}])?`, 'g');
const ANY = new RegExp(`[${RTL}]`);

export function isolate(text) {
    if (typeof text !== 'string' || !ANY.test(text)) return text;
    const out = [];
    let last = 0;
    for (const m of text.matchAll(RUN)) {
        if (m.index > last) out.push(text.slice(last, m.index));
        out.push(<bdi key={m.index} dir="rtl">{m[0]}</bdi>);
        last = m.index + m[0].length;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

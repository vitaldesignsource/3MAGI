import React from 'react';
import { textOf } from './sign';

// The one renderer of a drawn letter. It draws a glyph EXACTLY as the glyph
// kit's specimen sheet does (glyphkit/sheet.mjs) — the same viewBox, pen,
// caps, joins and the same three element kinds with the same attributes — so
// a sheet the illustrator reads is a faithful preview of the site:
//
//   <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5.5"
//        stroke-linecap="round" stroke-linejoin="round">
//     <path d/>                                          the strokes
//     <circle cx cy r=6 stroke-width="3.6"/>             each ring (Brille)
//     <circle cx cy r=2.6 fill="currentColor" stroke="none"/>   each dot
//   </svg>
//
// It is coloured by currentColor, so hover, the gold of a plaque and print's
// black all reach it as they reach a real script. Without `size` it is one em
// square (magic.css) and takes its size from the text around it. A null glyph
// draws the kit's own gap mark; the pages show a pending letter otherwise.

function MagicGlyph({ g, size, label, className }) {
    const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
    const cls = size ? className : ['mg-glyph', className].filter(Boolean).join(' ') || undefined;
    if (!g) {
        return (
            <svg className={cls} width={size} height={size} viewBox="0 0 100 100" {...a11y}>
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="#6b5a3a" strokeDasharray="4 4" />
                <text x="50" y="56" textAnchor="middle" fontSize="12" fill="#8a7650">gap</text>
            </svg>
        );
    }
    return (
        <svg className={cls} width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor"
            strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" {...a11y}>
            <path d={g.d} />
            {(g.rings ?? []).map(([x, y, r = 6], i) => <circle key={`r${i}`} cx={x} cy={y} r={r} strokeWidth="3.6" />)}
            {(g.dots ?? []).map(([x, y, r = 2.6], i) => <circle key={`d${i}`} cx={x} cy={y} r={r} fill="currentColor" stroke="none" />)}
        </svg>
    );
}

// A letter's sign in whichever of its three modes it has: drawn path data, a
// character set in a vendored face, or — while its form is still being traced
// — an unstruck seal. Takes a letter or a bare sign ({ glyph } | { char } | null).
export function Sign({ of, label, className }) {
    if (of && of.glyph) return <MagicGlyph g={of.glyph} label={label} className={className} />;
    if (of && of.char) {
        return (
            <span className={['mg-char', 'edu-glyph', className].filter(Boolean).join(' ')}
                {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}>
                {textOf(of.char)}
            </span>
        );
    }
    return <Unstruck label={label} className={className} />;
}

// The mark for a form not yet traced: an empty seal-ring, as the Powers doors
// show an empty seal until their emblem lands.
export function Unstruck({ label, className }) {
    return (
        <span className={['mg-unstruck', className].filter(Boolean).join(' ')}
            {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })} />
    );
}

export default MagicGlyph;

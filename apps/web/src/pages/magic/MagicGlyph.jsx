import React, { useId } from 'react';
import { textOf } from './sign';

// The one renderer of a drawn letter. The glyph data are drawn as the glyph
// kit stores them (glyphkit/README.md): the same viewBox, pen, caps and joins
// and the same three element kinds —
//
//   <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5.5"
//        stroke-linecap="round" stroke-linejoin="round">
//     <path d mask/>                                      the strokes
//     <circle cx cy r stroke-width="3.6 | 2.6"/>          each ring (Brille)
//     <circle cx cy r=2.6 fill="currentColor" stroke="none"/>   each dot
//   </svg>
//
// — with two departures from the kit's specimen sheet, both made here so the
// traced data stay as traced. Every stroke stops on its ring's centre line,
// so the round cap of the 5.5 pen pokes about one unit into the ring's hole;
// the path is masked by each ring's hole (radius r less half the ring pen),
// which cuts the stroke back to the ring's inner edge and leaves the hole
// round. And a ring drawn smaller than the house size (r 6) — the crowded
// rings of the Malachim, the River's rings — takes a lighter pen, 2.6 for
// 3.6, so that its hole stays open at the sizes the pages use.
//
// It is coloured by currentColor, so hover, the gold of a plaque and print's
// black all reach it as they reach a real script. Without `size` it is one em
// square (magic.css) and takes its size from the text around it; a figure
// made only of points (a geomantic figure) is marked is-figure, and magic.css
// gives it a larger box at text size, since points do not fill an em as a
// letter's strokes do. A null glyph draws the kit's own gap mark; the pages
// show a pending letter otherwise.

const HOUSE_RING = 6;
const ringPen = (r) => (r < HOUSE_RING ? 2.6 : 3.6);

const isFigure = (g) => Boolean(g && !String(g.d || '').trim() && (g.dots || []).length && !(g.rings || []).length);

function MagicGlyph({ g, size, label, className }) {
    const uid = useId();
    const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
    const cls = size ? className : ['mg-glyph', isFigure(g) && 'is-figure', className].filter(Boolean).join(' ') || undefined;
    if (!g) {
        return (
            <svg className={cls} width={size} height={size} viewBox="0 0 100 100" {...a11y}>
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="#6b5a3a" strokeDasharray="4 4" />
                <text x="50" y="56" textAnchor="middle" fontSize="12" fill="#8a7650">gap</text>
            </svg>
        );
    }
    const rings = (g.rings ?? []).map(([x, y, r = HOUSE_RING]) => [x, y, r]);
    // one mask per drawn glyph: its id must be unique on the page
    const holes = rings.length && g.d ? `mg-holes${uid.replace(/[^A-Za-z0-9_-]/g, '')}` : null;
    return (
        <svg className={cls} width={size} height={size} viewBox="0 0 100 100" fill="none" stroke="currentColor"
            strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" {...a11y}>
            {holes && (
                <defs>
                    <mask id={holes} maskUnits="userSpaceOnUse" x="-5" y="-5" width="110" height="110">
                        <rect x="-5" y="-5" width="110" height="110" fill="#fff" stroke="none" />
                        {rings.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r - ringPen(r) / 2} fill="#000" stroke="none" />)}
                    </mask>
                </defs>
            )}
            <path d={g.d} mask={holes ? `url(#${holes})` : undefined} />
            {rings.map(([x, y, r], i) => <circle key={`r${i}`} cx={x} cy={y} r={r} strokeWidth={ringPen(r)} />)}
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

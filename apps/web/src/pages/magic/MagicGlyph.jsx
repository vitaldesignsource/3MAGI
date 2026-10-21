import React, { useId } from 'react';
import { inkBox, textOf } from './sign';
import { HOUSE_DOT, HOUSE_PEN, HOUSE_RING, ringPen } from './pen';

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
// 3.6, so that its hole stays open at the sizes the pages use. The pen, the
// ring and dot sizes and the ring pens are kept in pen.js, which the build's
// tools read too.
//
// It is coloured by currentColor, so hover, the gold of a plaque and print's
// black all reach it as they reach a real script. Without `size` it is one em
// square (magic.css) and takes its size from the text around it; a figure
// made only of points (a geomantic figure) is marked is-figure, and magic.css
// gives it a larger box at text size, since points do not fill an em as a
// letter's strokes do. A null glyph draws the kit's own gap mark; the pages
// show a pending letter otherwise.
//
// A glyph may name a lighter `pen` for where it is drawn large (the geomantic
// figures' printed asterisks, whose six short arms the 5.5 pen fills in at
// plaque size): it is carried as --mg-pen and has-pen, and magic.css gives it
// to the strokes in the plaque only; at text size the house pen stands.
//
// A figure drawn in fine lines (the Icelandic staves, whose crossbars and
// forks the house pen fills into blots at every size) names `textPen` as well:
// the pen it is drawn with everywhere but the plaque, where `pen` — its own
// measured weight — takes over. Its rings are drawn with the same pen as its
// strokes, as the specimen sheet drawn at the print's pen draws them. Where
// its traced rings are so small that they close into dots at text size (the
// Þjófastafur's, Gapaldur's), it gives `textRings` as well: the same rings
// scaled up by one factor and set out along their strokes, drawn everywhere
// but the plaque, where the traced rings stand (magic.css switches them).
//
// A door or a chip shows a sign as an icon (`fit="ink"`): its viewBox is a
// square about the sign's ink (sign.js inkBox), of side max(width, height)
// / 0.75, so every door's sign fills three quarters of its box and stands at
// its centre by its ink, not by the place it was traced in. Its pens are
// scaled with the viewBox, so they are the same in px on every door; a
// fine-lined figure is drawn there with a pen of at least 3.5. The traced
// data are drawn as they are; only the window onto them changes.
const FIT_FILL = 0.75;
const FIT_MIN_TEXT_PEN = 3.5;
const r3 = (v) => Math.round(v * 1000) / 1000;
function fitOf(g) {
    const textPen = g.textPen != null ? Math.max(g.textPen, FIT_MIN_TEXT_PEN) : null;
    const b = inkBox(g, { textPen });
    if (!b) return null;
    const side = Math.max(b.w, b.h) / FIT_FILL;
    return { textPen, k: side / 100, x: r3((b.x0 + b.x1 - side) / 2), y: r3((b.y0 + b.y1 - side) / 2), side: r3(side) };
}

// (a figure has points, plural: a sign drawn as one heavy point — the ه of
// Aflāṭūn's pen in the Shawq — is a letter, drawn at its table's scale)
const isFigure = (g) => Boolean(g && !String(g.d || '').trim() && (g.dots || []).length > 1 && !(g.rings || []).length);

function MagicGlyph({ g, size, label, className, fit }) {
    const uid = useId();
    const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };
    const f = fit === 'ink' && g ? fitOf(g) : null;
    const cls = size ? className : ['mg-glyph', isFigure(g) && 'is-figure', g?.pen && 'has-pen', f && 'is-fit', className].filter(Boolean).join(' ') || undefined;
    if (!g) {
        return (
            <svg className={cls} width={size} height={size} viewBox="0 0 100 100" {...a11y}>
                <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeDasharray="4 4" />
                {/* the word is legible only at the kit's size; at text size it would be a speck */}
                {size >= 100 && <text x="50" y="56" textAnchor="middle" fontSize="12" fill="currentColor" fillOpacity="0.7">gap</text>}
            </svg>
        );
    }
    const rings = (g.rings ?? []).map(([x, y, r = HOUSE_RING]) => [x, y, r]);
    const textPen = f ? f.textPen : g.textPen ?? null;
    const textRings = textPen != null && Array.isArray(g.textRings) && g.textRings.length === rings.length ? g.textRings : null;
    // the pens' scale: 1, or the fitted viewBox's side over 100
    const k = f ? f.k : 1;
    // a ring's pen: the house ring pen, or a fine-lined figure's own pen
    const penOf = (r) => (textPen != null ? Math.min(ringPen(r), textPen) : ringPen(r)) * k;
    // the hole the strokes are masked by is the lightest the ring is ever drawn
    // with, so the round caps never reach into it at any size
    const lightest = (r) => Math.min(penOf(r), (g.pen ?? Infinity) * k);
    // the mask covers the viewBox and a margin round it
    const mb = f ? { x: r3(f.x - 5 * k), y: r3(f.y - 5 * k), w: r3(f.side + 10 * k) } : { x: -5, y: -5, w: 110 };
    // one mask per drawn glyph: its id must be unique on the page
    const holes = rings.length && g.d ? `mg-holes${uid.replace(/[^A-Za-z0-9_-]/g, '')}` : null;
    // a text ring's hole: it is only ever drawn with the text pen
    const ringClass = textRings ? 'mg-ring is-traced' : textPen != null ? 'mg-ring' : undefined;
    return (
        <svg className={cls} width={size} height={size} viewBox={f ? `${f.x} ${f.y} ${f.side} ${f.side}` : '0 0 100 100'} fill="none" stroke="currentColor"
            strokeWidth={(textPen ?? HOUSE_PEN) * k} strokeLinecap="round" strokeLinejoin="round" {...a11y}
            style={g.pen && !size ? { '--mg-pen': g.pen } : undefined}>
            {holes && (
                <defs>
                    <mask id={holes} maskUnits="userSpaceOnUse" x={mb.x} y={mb.y} width={mb.w} height={mb.w}>
                        <rect x={mb.x} y={mb.y} width={mb.w} height={mb.w} fill="#fff" stroke="none" />
                        {rings.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={Math.max(0, r - lightest(r) / 2)} fill="#000" stroke="none" />)}
                        {textRings && textRings.map(([x, y, r], i) => <circle key={`t${i}`} cx={x} cy={y} r={Math.max(0, r - penOf(r) / 2)} fill="#000" stroke="none" />)}
                    </mask>
                </defs>
            )}
            <path d={g.d} mask={holes ? `url(#${holes})` : undefined} />
            {rings.map(([x, y, r], i) => <circle key={`r${i}`} className={ringClass} cx={x} cy={y} r={r} strokeWidth={penOf(r)} />)}
            {textRings && textRings.map(([x, y, r], i) => <circle key={`t${i}`} className="mg-ring is-text" cx={x} cy={y} r={r} strokeWidth={penOf(r)} />)}
            {(g.dots ?? []).map(([x, y, r = HOUSE_DOT], i) => <circle key={`d${i}`} cx={x} cy={y} r={r} fill="currentColor" stroke="none" />)}
        </svg>
    );
}

// A letter's sign in whichever of its three modes it has: drawn path data, a
// character set in a vendored face, or — while its form is still being traced
// — an unstruck seal. Takes a letter or a bare sign ({ glyph } | { char } | null).
// `fit="ink"` draws a drawn sign as an icon, fitted to its ink (a door, a chip).
export function Sign({ of, label, className, fit }) {
    if (of && of.glyph) return <MagicGlyph g={of.glyph} label={label} className={className} fit={fit} />;
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

// A table of numbers (the planets' magic squares) is not a figure: where a
// sign would stand it wears a small ruled square of its side.
export function TableMark({ side, className }) {
    const lo = 16, hi = 84, step = (hi - lo) / side;
    const lines = Array.from({ length: side - 1 }, (_, i) => lo + step * (i + 1));
    return (
        <svg className={['mg-glyph', 'mg-table-mark', className].filter(Boolean).join(' ')} viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true">
            <rect x={lo} y={lo} width={hi - lo} height={hi - lo} strokeWidth="4.5" />
            {lines.map((v) => <path key={v} d={`M ${v} ${lo} V ${hi} M ${lo} ${v} H ${hi}`} strokeWidth={side > 6 ? 1.6 : 2.4} />)}
        </svg>
    );
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

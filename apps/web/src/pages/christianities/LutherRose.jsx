import React from 'react';

// Luther's seal, drawn from his own account of it and from nothing else.
//
// On 8 July 1530, at the Coburg, Luther answered Lazarus Spengler, who had
// sent him a drawing of the seal cut for him that year, and explained it
// element by element: a black cross in a heart of its natural colour, the
// heart set in a white rose, the rose in a sky-blue field, the field ringed
// with gold. That is the whole specification, and this figure keeps to it —
// which is why it has none of the green sepals later versions add between
// the petals. The letter does not mention them, so they are not drawn.
//
// The portal printed the emblem's story twice before it showed the emblem.
// Like the vault, it is a diagram of a text, and the caption says so.

const CX = 100;
const CY = 100;
const PETALS = 5;
const PETAL_R = 31;     // radius of each petal
const PETAL_D = 45;     // distance of each petal's centre from the middle

function LutherRose({ caption }) {
    const petals = Array.from({ length: PETALS }, (_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / PETALS;
        return { x: CX + PETAL_D * Math.cos(a), y: CY + PETAL_D * Math.sin(a) };
    });
    return (
        <figure className="ch-rc-emblem">
            <svg viewBox="0 0 200 200" className="ch-rc-emblem-svg" role="img"
                aria-label="Luther’s seal as his letter describes it: a black cross in a red heart, the heart set in a white rose of five petals, the rose on a sky-blue field inside a gold ring.">
                {/* the golden ring, and the sky-blue field inside it */}
                <circle cx={CX} cy={CY} r="95" className="lr-ring" />
                <circle cx={CX} cy={CY} r="89" className="lr-field" />
                {/* the white rose */}
                {petals.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={PETAL_R} className="lr-petal" />)}
                <circle cx={CX} cy={CY} r="44" className="lr-petal lr-heart-bed" />
                {/* the heart, in its natural colour */}
                <path className="lr-heart"
                    d="M100 130 C 72 112 64 94 72 82 C 80 70 95 71 100 82 C 105 71 120 70 128 82 C 136 94 128 112 100 130 Z" />
                {/* the black cross in the heart */}
                <rect x="96" y="80" width="8" height="38" className="lr-cross" />
                <rect x="86" y="91" width="28" height="8" className="lr-cross" />
            </svg>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

export default LutherRose;

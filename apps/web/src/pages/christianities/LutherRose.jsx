import React from 'react';

// Luther's seal in the hero. It is the same drawing the page's "The signs"
// carries (public/media/rosicrucian/luther-rose.svg): the five elements of
// Luther's letter to Lazarus Spengler of 8 July 1530, in his tinctures, and
// nothing the letter does not give — which is why there are no green leaves
// between the petals. Like the vault, it is a diagram of a text, and the
// caption says so on its face.

function LutherRose({ caption, alt }) {
    return (
        <figure className="ch-rc-emblem">
            <img className="ch-rc-emblem-svg" src="/media/rosicrucian/luther-rose.svg"
                alt={alt || 'Luther’s seal: a black cross in a red heart, set in a white rose on a sky-blue field inside a gold ring.'}
                width="136" height="136" decoding="async" />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

export default LutherRose;

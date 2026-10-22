import React from 'react';
import EMBLEMS from '../../data/emblems';

// An emblem made for a portal page, shown in its hero above the kicker in the
// same frame as Luther's seal on the Rosicrucian page. Pages ask for theirs by
// key; a key with no emblem yields nothing, so the hero is unchanged.
//
// `bare` leaves the caption off the figure, for a hero that sets the note at
// its own foot as a colophon (PortalHero's `emblemNote`); the image is then
// described by that note, so the words stay with the drawing for a screen
// reader. Without it the emblem renders exactly as before.

function PortalEmblem({ name, bare = false }) {
    const e = EMBLEMS[name];
    if (!e) return null;
    return (
        <figure className="ch-rc-emblem ch-portal-emblem">
            <img className="ch-rc-emblem-svg" src={`/media/${e.image}`} alt={e.alt} width="140" height="140" decoding="async"
                aria-describedby={bare && e.caption ? 'hero-emblem-note' : undefined} />
            {!bare && e.caption && <figcaption>{e.caption}</figcaption>}
        </figure>
    );
}

export default PortalEmblem;

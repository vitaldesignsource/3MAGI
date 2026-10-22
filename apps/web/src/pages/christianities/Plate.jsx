import React from 'react';
import Rich from './rich';

// A plate: an image set beside the thing it depicts — inside an entry body,
// or full-width (`wide`) beneath a group's header. Shared by both portals so
// a figure, a company and a pantheon all illustrate the same way.
//
// `imageEffect: 'light'` opts a plate into the animated light layer.
// `imageShape: 'portrait'` marks a tall picture, which a door page may set
// beside the text at its true proportions instead of cropping it to a band;
// a plate without it renders exactly as before.

function Plate({ item, wide }) {
    if (!item?.image) return null;
    return (
        <figure className={`pw-entry-figure${wide ? ' is-wide' : ''}${item.imageShape === 'portrait' ? ' is-portrait' : ''}`}>
            <span className="pw-plate-stage">
                <img src={`/media/${item.image}`} alt={item.imageAlt || ''}
                    loading="lazy" decoding="async" />
                {item.imageEffect === 'light' && (
                    <span className="pw-plate-light" aria-hidden="true">
                        <span className="pw-plate-beam" />
                        <span className="pw-plate-glow" />
                        <span className="pw-plate-motes" />
                    </span>
                )}
            </span>
            {item.imageCaption && <figcaption><Rich t={item.imageCaption} /></figcaption>}
        </figure>
    );
}

export default Plate;

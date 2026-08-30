import React from 'react';
import { Link } from 'react-router-dom';
import Rich from './rich';

// The hero every portal page opens with: an image behind the title, scrimmed
// so the Cinzel reads at any brightness, with the kicker and intro beneath.
// The scrim is anchored to the figure rather than the section, which is the
// lesson the Living Archive hero taught — a scrim tied to the wrong box
// drifts off the text on a phone.
//
// Without an image it degrades to the plain hero the portals used before, so
// a door whose art has not arrived still opens correctly.

function PortalHero({ image, alt, kicker, kickerLink, kickerLinkLabel, title, intro, grand, children }) {
    return (
        <section className={`edu-hero ch-hero${image ? ' has-image' : ''}${grand ? ' is-grand' : ''}`}>
            {image && (
                <div className="ch-hero-figure" aria-hidden={alt ? undefined : 'true'}>
                    <img src={`/media/${image}`} alt={alt || ''} loading="eager" decoding="async" />
                    <span className="ch-hero-scrim" />
                </div>
            )}
            <div className="ch-hero-copy">
                <p className="kicker">
                    {kickerLink
                        ? <><Link to={kickerLink}>{kickerLinkLabel}</Link> · {kicker}</>
                        : kicker}
                </p>
                <h1>{title}</h1>
                {(intro || []).map((p, i) => (
                    <p className="edu-hero-sub" key={i}><Rich t={p} /></p>
                ))}
                {children}
            </div>
        </section>
    );
}

export default PortalHero;

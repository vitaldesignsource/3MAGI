import React from 'react';

const A = 'https://3magipress.com/assets';

export const featuredContributorsStrip = [
    {
        id: 'frater-iaqv',
        name: 'Frater I.A.Q.V.',
        initials: 'I',
        image: null,
        imageAlt: 'Placeholder portrait for Frater I.A.Q.V.',
    },
    {
        id: 'ike-baker',
        name: 'Ike Baker',
        image: `${A}/author-ike-baker.jpg`,
        imageAlt: 'Portrait of Ike Baker',
    },
    {
        id: 'jaime-paul-lamb',
        name: 'Jaime Paul Lamb',
        image: `${A}/author-jaime-paul-lamb.jpg`,
        imageAlt: 'Portrait of Jaime Paul Lamb',
    },
    {
        id: 'daniel-wiseman',
        name: 'Daniel Wiseman',
        image: `${A}/author-daniel-wiseman.jpg`,
        imageAlt: 'Portrait of Daniel Wiseman',
    },
    {
        id: 'jake-treyer',
        name: 'Jacob Trayer',
        image: 'https://horizons-cdn.hostinger.com/1f3d6402-32eb-49eb-a99b-46cfb57570e7/fac6744621da1f040468be8de464350f.webp',
        imageAlt: 'Portrait of Jacob Trayer',
    },
    {
        id: 'travis-lawrence',
        name: 'Travis Lawrence',
        image: 'https://horizons-cdn.hostinger.com/1f3d6402-32eb-49eb-a99b-46cfb57570e7/53acf5993dfdcc0dcc202bdec0263601.webp',
        imageAlt: 'Portrait of Travis Lawrence',
    },
    {
        id: 'drew-mackinnon',
        name: 'Drew MacKinnon',
        image: 'https://horizons-cdn.hostinger.com/1f3d6402-32eb-49eb-a99b-46cfb57570e7/2c03cdfbff58b77535a6918b14fad3ec.png',
        imageAlt: 'Portrait of Drew MacKinnon',
    },
    {
        id: 'james-oliva',
        name: 'James Oliva',
        image: 'https://horizons-cdn.hostinger.com/1f3d6402-32eb-49eb-a99b-46cfb57570e7/2afc956520653a1dcfad983538e8b58a.png',
        imageAlt: 'Portrait of James Oliva',
    },
    {
        id: 'magick-mike-samu',
        name: 'Magick Mike Samu',
        image: 'https://horizons-cdn.hostinger.com/1f3d6402-32eb-49eb-a99b-46cfb57570e7/2f0b44a81c9995fbb977e405695a7447.png',
        imageAlt: 'Portrait of Magick Mike Samu',
    },
    {
        id: 'nick-occult-rejects',
        name: 'Nick — The Occult Rejects',
        image: 'https://horizons-cdn.hostinger.com/1f3d6402-32eb-49eb-a99b-46cfb57570e7/93445a256182a19431bf9cc09e2ef618.png',
        imageAlt: 'Portrait of Nick from The Occult Rejects',
    },
    {
        id: 'editorial-circle',
        name: 'Editorial Circle',
        image: `${A}/hermes-portrait.png`,
        imageAlt: 'Hermes, editorial emblem of Three Magi Press',
    },
];

function ThirdLampFeaturedContributors({ id = 'featured-contributors-title', title = 'Featured Contributors', description = 'Past and present voices gathered around the lamp, with room for new work to enter the circle.' }) {
    return (
        <section className="fc-strip" aria-labelledby={id}>
            <div className="fc-strip-intro">
                <p className="kicker" id={id}>{title}</p>
                <p className="fc-strip-desc">{description}</p>
            </div>

            <div className="fc-strip-scroll-outer">
            <div className="fc-strip-scroll-wrapper">
                <div className="fc-strip-people">
                    {featuredContributorsStrip.map((person) => (
                        <div className="fc-person" key={person.id}>
                            {person.image ? (
                                <img className="fc-person-photo" src={person.image} alt={person.imageAlt} />
                            ) : (
                                <div className="fc-person-initials" aria-hidden="true">{person.initials}</div>
                            )}
                            <span className="fc-person-name">{person.name}</span>
                        </div>
                    ))}
                    <p className="fc-strip-more">&hellip;and new voices.</p>
                </div>
            </div>
            </div>
        </section>
    );
}

export default ThirdLampFeaturedContributors;

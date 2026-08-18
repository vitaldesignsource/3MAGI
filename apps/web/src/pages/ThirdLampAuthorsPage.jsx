import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';

const A = '/media';

const authors = [
    {
        id: 'ike-baker',
        role: 'Author · Lecturer · Ceremonialist',
        name: 'Ike Baker',
        image: `${A}/author-ike-baker.webp`,
        imageAlt: 'Portrait of author and esoteric scholar Ike Baker',
        caption: 'Ike Baker · Official author portrait',
        reverse: true,
        bio: 'Ike Baker is an independent scholar, esoteric instructor, and practicing ceremonialist whose work brings the Western esoteric traditions into rigorous contemporary study. A senior initiate in the Hermetic Order of the Golden Dawn, the Martinist Order of America, and Freemasonry, he hosts ARCANVM and co-hosts the Aetherica Podcast.',
        topics: ['Western esotericism', 'Ceremonial theurgy', 'Divination', 'Initiatory traditions'],
        work: [
            { href: 'https://ikebaker.com/', label: 'A Formless Fire', meta: 'Book · Western Esotericism', external: true },
            { href: 'https://ikebaker.com/', label: 'Aetheric Magic', meta: 'Book · Ceremonial Practice', external: true },
            { href: 'https://ikebaker.com/about', label: 'ARCANVM', meta: 'Lectures · Conversations', external: true },
        ],
    },
    {
        id: 'jaime-paul-lamb',
        role: 'Author · Astrologer · Esoteric Scholar',
        name: 'Jaime Paul Lamb',
        image: `${A}/author-jaime-paul-lamb.webp`,
        imageAlt: 'Black-and-white portrait of author and astrologer Jaime Paul Lamb',
        caption: 'Jaime Paul Lamb · Official author portrait',
        bio: 'Jaime Paul Lamb is a traditional astrologer and scholar of Western esotericism whose writing joins astrological technique, occult philosophy, and Masonic symbolism. He is the author of The Astrological Goetia and three books on Freemasonry and the Western esoteric tradition, and teaches astrology for the Institute for Hermetic Studies.',
        topics: ['Traditional astrology', 'Astrological magic', 'Masonic esotericism', 'Occult philosophy'],
        work: [
            { href: 'https://www.jaimepaullamb.com/', label: 'The Astrological Goetia', meta: 'Book · Angelic & Demonic Astrology', external: true },
            { href: 'https://www.jaimepaullamb.com/', label: 'The Archetypal Temple', meta: 'Book · Masonic Esotericism', external: true },
            { href: 'https://www.jaimepaullamb.com/', label: 'Myth, Magick & Masonry', meta: 'Book · Symbolic Tradition', external: true },
        ],
    },
    {
        id: 'daniel-wiseman',
        role: 'Herbalist · Spagyrist · Educator',
        name: 'Daniel Wiseman',
        image: `${A}/author-daniel-wiseman.webp`,
        imageAlt: 'Daniel Wiseman working with glass vessels in an alchemical laboratory',
        caption: 'Daniel Wiseman · Secret Fire Apothecary',
        reverse: true,
        bio: 'Daniel Wiseman is a registered clinical herbalist, spagyrist, and founder of Secret Fire Apothecary. His practice brings Spagyria into conversation with Western herbal medicine, Ayurveda, traditional Chinese medicine, clinical practice, and the arts, treating alchemy as both a living discipline and a way of encountering nature.',
        topics: ['Spagyria', 'Alchemical medicine', 'Western herbalism', 'Plant intelligence'],
        work: [
            { href: 'https://secret-fire.com/', label: 'Secret Fire Apothecary', meta: 'Founder · Spagyric Practice', external: true },
            { href: 'https://secret-fire.com/pages/about', label: 'Clinical Herbalism & Alchemy', meta: 'Research · Education', external: true },
            { href: 'https://www.occultlibrary.org/periodicals/viridis-genii', label: 'Viridis Genii', meta: 'Contributor · Plant Alchemy', external: true },
        ],
    },
    {
        id: 'jake-treyer',
        role: 'Freemason · Esoteric Scholar · Podcast Host',
        name: 'Jacob Trayer',
        image: '/media/fac6744621da1f040468be8de464350f.webp',
        imageAlt: 'Portrait of author and esoteric scholar Jacob Trayer',
        caption: 'Jacob Trayer · Official author portrait',
        reverse: true,
        bio: 'Jacob Trayer is a Freemason from Phoenix, Arizona. Raised at Sy Harrison Lodge #70 in 2013, Jake was the charter Senior Deacon of Arizona\'s Ascension Lodge #89. Jake has had his work featured in several Masonic periodicals, and gives frequent presentations in the Masonic lecture circuits. He is involved in the Scottish & York Rites, the Masonic Rosicrucians (SRICF), and the Hermetic Society of the Golden Dawn. Jake also serves as the Grand Orator for the Grand Lodge of Arizona. His interests are in Hellenistic astrology, Neoplatonism, Hermeticism, Rosicrucianism, and the Western Esoteric Tradition in general. He hopes to perpetuate the burgeoning of a new breed of esoterically inclined Masons. He is a co-founder of Tria Prima and a host on the Tria Prima Podcast, as well as co-founder of Element Mist.',
        topics: ['Freemasonry', 'Hellenistic astrology', 'Neoplatonism', 'Hermeticism', 'Rosicrucianism'],
        work: [
            { href: 'https://triaprima.co/', label: 'Tria Prima', meta: 'Co-founder · Esoteric Publishing & Podcast', external: true },
            { href: 'https://podcasts.apple.com/', label: 'Tria Prima Podcast', meta: 'Host · Apple Podcasts', external: true },
            { href: 'https://ascensionlodge89.org/', label: 'Ascension Lodge No. 89', meta: 'Charter Senior Deacon', external: true },
            { href: 'https://www.azmasons.org/', label: 'Grand Lodge of Arizona', meta: 'Grand Orator', external: true },
            { href: 'https://triaprima.co/', label: 'Element Mist', meta: 'Co-founder', external: true },
        ],
    },
    {
        id: 'travis-lawrence',
        role: 'Artist',
        name: 'Travis Lawrence',
        image: '/media/53acf5993dfdcc0dcc202bdec0263601.webp',
        imageAlt: 'Portrait of printmaker and artist Travis Lawrence',
        caption: 'Travis Lawrence · Official artist portrait',
        bio: 'Travis Lawrence is a Midwestern printmaker whose allegorical imagery draws upon Jungian psychology, mythology, medieval alchemical manuscripts, and illuminated texts. His intricately composed relief prints—often individually painted by hand—appear as fragments of a larger symbolic narrative, inviting contemplation of archetypes, mystery, transformation, and metaphor. Raised within a religious environment, Lawrence developed an early awareness of ideas and realities extending beyond the individual self. He approaches artistic creation as a means of opening doorways into these deeper dimensions, giving visible form to them through symbol and image. Much like the alchemical process that informs his work, Lawrence regards printmaking as a meditative act through which ordinary materials are transformed into expressions of a higher state.',
        topics: ['Jungian Psychology', 'Alchemical Symbolism', 'Medieval Manuscripts', 'Relief Printmaking'],
        workLabel: 'Selected Work',
        work: [
            { href: 'https://infinity-prints.com/', label: 'Infinity Prints', meta: 'Art Portfolio', external: true },
            { href: 'https://spireandscribe.com/', label: 'Spire & Scribe', meta: 'Art-Book Publishing Project with Josh Rowan', external: true },
            { href: 'https://infinity-prints.com/', label: 'Official Website', meta: 'infinity-prints.com', external: true },
            { href: 'https://infinity-prints.com/prints', label: 'Infinity Prints — Prints', meta: 'Artwork & Portfolio', external: true },
            { href: 'https://infinity-prints.com/shop', label: 'Infinity Prints — Shop', meta: 'Online Shop', external: true },
            { href: 'https://infinity-prints.com/info', label: 'Infinity Prints — Info', meta: 'Biography', external: true },
            { href: 'https://instagram.com/travislawrence', label: '@travislawrence', meta: 'Instagram', external: true },
            { href: 'https://spireandscribe.com/', label: 'Spire & Scribe', meta: 'spireandscribe.com', external: true },
            { href: 'https://untitledfineart.com/', label: 'Untitled Fine Art', meta: 'Gallery Profile', external: true },
            { href: 'https://triaprima.co/', label: 'Art of the Esoteric', meta: 'Interview · Tria Prima', external: true },
        ],
    },
    {
        id: 'drew-mackinnon',
        role: 'Author · Researcher · Photographer · Explorer',
        name: 'Drew MacKinnon',
        image: '/media/2c03cdfbff58b77535a6918b14fad3ec.webp',
        imageAlt: 'Portrait of author and explorer Drew MacKinnon',
        caption: 'Drew MacKinnon · Official author portrait',
        reverse: true,
        bio: 'Drew MacKinnon is an author, researcher, photographer, and explorer whose work moves between sacred landscape, material culture, and the lived practice of tradition. His writing and field photography trace the places where hidden histories still surface in stone, ritual, and the long memory of the land.',
        topics: ['Sacred landscape', 'Material culture', 'Field photography', 'Living tradition'],
        work: [],
    },
    {
        id: 'james-oliva',
        role: 'Author · Podcast Host',
        name: 'James Oliva',
        image: '/media/2afc956520653a1dcfad983538e8b58a.webp',
        imageAlt: 'Portrait of author and podcast host James Oliva',
        caption: 'James Oliva · The TLB Podcast',
        reverse: true,
        bio: 'James Oliva hosts The TLB Podcast – Deep Dives into Art & Creativity, Conspiracies, and Culture. The TLB Podcast invites listeners on unconventional explorations through obscure history, emergent technology, conspiracy narratives, art & creativity, esoteric traditions, and plenty of ethically charged existential dilemmas. From the inner workings of secretive agencies and speculative science to alternative healing and societal myths, each weekly episode blends thoughtful curiosity with diverse perspectives and a golf ball sized understanding of reality.',
        topics: ['Esoteric traditions', 'Conspiracy narratives', 'Art & creativity', 'Emergent technology'],
        workLabel: 'Listen & Follow',
        work: [
            { href: 'https://open.spotify.com/show/2q1Kw2LrvQ2DxLtutOg8Dq?si=f375c6786a3b4734', label: 'The TLB Podcast', meta: 'Spotify', external: true },
            { href: 'https://podcasts.apple.com/us/podcast/the-totally-legitimate-business-podcast/id1676251295', label: 'The TLB Podcast', meta: 'Apple Podcasts', external: true },
            { href: 'https://youtube.com/@thetlbpod', label: '@thetlbpod', meta: 'YouTube', external: true },
            { href: 'https://patreon.com/thetlbpod', label: 'thetlbpod', meta: 'Patreon', external: true },
            { href: 'https://instagram.com/totallylegitimatebusiness', label: '@totallylegitimatebusiness', meta: 'Instagram', external: true },
            { href: 'https://tiktok.com/@thetlbpod', label: '@thetlbpod', meta: 'TikTok', external: true },
            { href: 'https://x.com/thetlbpod', label: '@thetlbpod', meta: 'X', external: true },
            { href: 'https://linktr.ee/totallylegitimatebusiness', label: 'All Links', meta: 'Linktree', external: true },
        ],
    },
    {
        id: 'magick-mike-samu',
        role: 'Author · Freemason · Esoteric Practitioner',
        name: 'Magick Mike Samu',
        image: '/media/2f0b44a81c9995fbb977e405695a7447.webp',
        imageAlt: 'Portrait of Magick Mike Samu in Masonic regalia',
        caption: 'Brother Michael Samu · Three Great Lights #323',
        bio: 'Raised in the mystical desert of Joshua Tree, CA, Brother Michael Samu, affectionately nicknamed "Magick Mike," has dedicated his Masonic journey to exploring the Craft\'s philosophical and esoteric foundations. His commitment is demonstrated through various officerships, notably his current roles as Organist for Three Great Lights #323 and the Southern California Research Lodge #1002. Brother Samu contributes to a broader understanding of Freemasonry through his lectures and published works in respected journals such as the Fraternal Review and PRS Journal, where scholarly inquiry is paramount. His perspective is uniquely enriched by his dedicated practice of ceremonial magick and Kriya yoga, allowing him to shed light on these paths as potent, transformative spiritual paths. He hopes his work encourages a renewed appreciation for the Craft as a contemporary mystery school.',
        topics: ['Freemasonry', 'Ceremonial Magick', 'Kriya Yoga', 'Esoteric Philosophy', 'Mystery School Tradition'],
        workLabel: 'Connect & Follow',
        work: [
            { href: 'https://www.magickmike.com', label: 'magickmike.com', meta: 'Official Website', external: true },
            { href: 'https://www.youtube.com/@magickmike077', label: '@magickmike077', meta: 'YouTube', external: true },
            { href: 'https://www.instagram.com/magickmike077/', label: '@magickmike077', meta: 'Instagram', external: true },
        ],
    },
    {
        id: 'nick-occult-rejects',
        role: 'Author · Occultist · Podcast Host',
        name: 'Nick — The Occult Rejects',
        image: '/media/93445a256182a19431bf9cc09e2ef618.webp',
        imageAlt: 'Portrait of Nick from The Occult Rejects podcast',
        caption: 'Nick · The Occult Rejects Podcast',
        bio: 'Nick is an occultist, researcher, and the host of The Occult Rejects podcast. Formerly known online as "NY Patriot," he is recognized for sharing his extensive firsthand experiences within esoteric and ceremonial magic circles. He spent six years studying within the system of magic of the O.T.O., participating in its initiations, rituals, and ceremonial practices before eventually leaving the order. His work heavily explores the mechanics of magic, the influence of Aleister Crowley, ritual symbolism, and physiological or nervous system effects tied to magical practice. He frequently discusses his profound meditative experiences — including what he describes as "crossing the abyss" — and his movement away from formal occult orders toward an internal spiritual connection. As host of The Occult Rejects, he breaks down occult fundamentals, esoteric tarot, symbolism, and deep historical and spiritual topics with various guests.',
        topics: ['Mechanics of Magick', 'Ritual Symbolism', 'O.T.O. & Thelema', 'Esoteric Tarot', 'Sigils & Talismans'],
        workLabel: 'Connect & Follow',
        work: [
            { href: 'https://www.youtube.com/@TheOccultRejects/videos', label: 'The Occult Rejects', meta: 'YouTube', external: true },
            { href: 'https://www.patreon.com/TheOccultRejects', label: 'The Occult Rejects', meta: 'Patreon', external: true },
            { href: 'https://www.occultresearchinstitute.org/', label: 'Occult Research Institute', meta: 'Website', external: true },
            { href: 'https://www.instagram.com/THEOCCULTREJECTS', label: '@THEOCCULTREJECTS', meta: 'Instagram', external: true },
            { href: 'https://www.facebook.com/OccultRejects', label: 'OccultRejects', meta: 'Facebook', external: true },
            { href: 'https://x.com/OccultFriends', label: '@OccultFriends', meta: 'X', external: true },
        ],
    },
    {
        id: 'brandon-lee',
        role: 'Author · Esoteric Educator',
        name: 'Brandon Lee',
        image: '/media/0a376c2829385cb2199d8b9ba38fe040.webp',
        imageAlt: 'Portrait of author and esoteric educator Brandon Lee',
        caption: 'Brandon Lee · Magus in the Media',
        bio: 'Exploring Myth, Philosophy, Magick & Meaning in Storytelling Through the Ages.',
        topics: ['Myth & storytelling', 'Esoteric philosophy', 'Magick in media', 'Symbolic meaning'],
        workLabel: 'Connect & Follow',
        work: [
            { href: 'https://magusinthemedia.substack.com/', label: 'Magus in the Media', meta: 'Substack', external: true },
            { href: 'https://youtube.com/@magusinthemedia?si=CGj0oUfDsGr_pvxL', label: '@magusinthemedia', meta: 'YouTube', external: true },
            { href: 'https://www.instagram.com/magus_in_the_media/', label: '@magus_in_the_media', meta: 'Instagram', external: true },
            { href: 'https://x.com/MagusintheMedia', label: '@MagusintheMedia', meta: 'X', external: true },
        ],
    },
    {
        id: 'meg-vollmer',
        role: 'Writer · Initiate · Musician · Podcast Host',
        name: 'Meg Vollmer',
        image: '/media/45a5e985abc7f38f3b6cba93c55bfc6a.jpg',
        imageAlt: 'Portrait of Meg Vollmer on a desert highway',
        caption: 'Meg Vollmer · Official author portrait',
        bio: 'Meg Vollmer is an initiate, writer, and songwriter devoted to a life of deep listening and attentive relationship with the unseen. Her work comes from lived experience and genuine encounters with the enigmatic, through which landscape, ritual, myth, and inner life become intimately intertwined. She is drawn to the threads running through people, places, and events that seem to belong to a story older than the life in which they appear.',
        topics: ['Esoteric practice', 'Music & mysticism', 'Initiatory traditions', 'Podcast hosting'],
        workLabel: 'Connect & Follow',
        work: [
            { href: 'https://www.youtube.com/@OsirionProject', label: 'Osirion Project', meta: 'YouTube', external: true },
            { href: 'https://open.spotify.com/artist/0zRyq3CMK7RzcJhkSamQgb?si=ICXmVMxjR8unEkmMFhqb3Q&utm_source=copy-link', label: 'tumbleweed', meta: 'Spotify', external: true },
        ],
    },
    {
        id: 'frater-iaqv',
        role: 'Author',
        name: 'Frater I.A.Q.V.',
        placeholderImage: true,
        imageAlt: 'Placeholder portrait for Frater I.A.Q.V.',
        caption: 'Portrait withheld by request',
        bio: "Frater I.A.Q.V. is currently developing The Architecture of Hidden Forces, an exploratory work that gathers, compares, and arranges ideas drawn from various spiritual traditions, philosophical systems, and related fields. Intended as an accessible working synthesis rather than a definitive or authoritative system, the project explores how these different bodies of knowledge might contribute to a coherent and practical metaphysics. Its release is anticipated for mid-2027.",
        topics: ['Hermetic philosophy', 'Ritual theory', 'Sacred geometry', 'Subtle anatomy', 'Metaphysics'],
        work: [{ href: '/books', label: 'Books of Ritual, Symbol, and Transmutation', meta: 'Seven volumes · Forthcoming' }],
    },
    {
        id: 'editorial-circle',
        role: 'Founding Editorial Collective',
        name: 'Three Magi Press Editorial Circle',
        image: `${A}/hermes-portrait.webp`,
        imageAlt: 'Weathered statue of Hermes, editorial emblem of Three Magi Press',
        caption: 'Hermes · Editorial emblem of Three Magi Press',
        bio: 'The editorial circle shapes The Third Lamp and the long-form essays of Three Magi Press. Working across sacred history, Hermetic philosophy, material culture, comparative religion, and living traditions, it approaches esoteric subjects with visual rigor, historical curiosity, and interpretive restraint.',
        topics: ['Sacred history', 'Material culture', 'Comparative religion', 'Living traditions'],
        workLabel: 'Selected Essays',
        work: [
            { href: '/articles/black-mirror-of-fire', label: 'Obsidian: The Black Mirror of Dark Luminosity', meta: 'Cover Feature · Volume I' },
            { href: '/articles/prognostikon', label: 'The Bronze Oracle of Pergamon', meta: 'Divination · Sacred History' },
            { href: '/articles/herculaneum', label: 'Herculaneum', meta: 'The Hidden Library' },
        ],
    },
];

function ThirdLampAuthorsPage() {
    return (
        <>
            <Helmet>
                <title>Authors | The Third Lamp</title>
            </Helmet>

            <div className="third-lamp-scope">
                <ThirdLampHeader />

                <main>
                    <section className="authors-hero" aria-labelledby="authors-title">
                        <div className="authors-hero-copy">
                            <p className="kicker">The minds behind the journal</p>
                            <h1 id="authors-title">Authors &amp;<br />Contributors</h1>
                            <p>Writers, editors, translators, and contemplative scholars working where sacred history, philosophy, and living tradition meet.</p>
                        </div>
                        <figure className="authors-hero-art">
                            <img src="/media/ce0ad2ce1c8e2c9fd53f341fa8452eb8.webp" alt="A scholar studying an illuminated manuscript" />
                        </figure>
                    </section>

                    <section className="author-directory" aria-labelledby="current-authors-title">
                        <div className="section-title"><h2 id="current-authors-title">Current Authors</h2></div>

                        {authors.map((author) => (
                            <article className={`author-profile ${author.reverse ? 'author-profile-reverse' : ''}`} id={author.id} key={author.id}>
                                <figure className="author-portrait">
                                    {author.placeholderImage ? (
                                        <div
                                            role="img"
                                            aria-label={author.imageAlt}
                                            style={{
                                                width: '100%',
                                                aspectRatio: '4 / 5',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'linear-gradient(160deg, rgba(179,139,70,0.1), rgba(8,10,10,0.9))',
                                                color: 'var(--muted)',
                                                fontFamily: 'Cinzel, serif',
                                                fontSize: '0.7rem',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                            }}
                                        >
                                            Portrait Unavailable
                                        </div>
                                    ) : (
                                        <img src={author.image} alt={author.imageAlt} />
                                    )}
                                    <figcaption>{author.caption}</figcaption>
                                </figure>
                                <div className="author-copy">
                                    <p className="author-role">{author.role}</p>
                                    <h2>{author.name}</h2>
                                    <p className="author-bio">{author.bio}</p>
                                    <div className="author-details">
                                        <div>
                                            <h3>Areas of Study</h3>
                                            <ul className="author-topics" aria-label="Areas of study">
                                                {author.topics.map((t) => <li key={t}>{t}</li>)}
                                            </ul>
                                        </div>
                                        <div className="author-featured-work">
                                            <h3>{author.workLabel || 'Selected Work'}</h3>
                                            {author.work.map((w, i) => (
                                                w.external ? (
                                                    <a href={w.href} target="_blank" rel="noreferrer" key={`${w.label}-${i}`}>
                                                        <span>{w.label}</span><small>{w.meta}</small>
                                                    </a>
                                                ) : (
                                                    <a href={w.href} key={`${w.label}-${i}`}>
                                                        <span>{w.label}</span><small>{w.meta}</small>
                                                    </a>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>

                    <section className="contributor-invitation" aria-labelledby="contribute-title">
                        <div>
                            <p className="kicker">Write for The Third Lamp</p>
                            <h2 id="contribute-title">Bring a disciplined light to hidden things.</h2>
                        </div>
                        <div>
                            <p>The journal welcomes carefully considered essays, translations, poetry, imaginative prose, esoteric artwork, visual research, practitioner reflections, personal investigations, and experiential accounts shaped by authentic inquiry and lived experience.</p>
                            <Link className="tl-button" to="/third-lamp/contribute">Enter The Open Gate</Link>
                        </div>
                    </section>
                </main>

                <ThirdLampFooter />
            </div>
        </>
    );
}

export default ThirdLampAuthorsPage;

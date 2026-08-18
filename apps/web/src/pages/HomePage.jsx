import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const A = '/media';

const journalEntries = [
    { slug: 'black-mirror-of-fire', img: `${A}/obsidian-altar-mirror.webp`, date: '2026-07-02', dateLabel: 'July 2, 2026', title: 'The Black Mirror of Fire', copy: 'Obsidian, the volcanic stone of vision, shadow, and hidden power.' },
    { slug: 'melchizedek-eternal-priest-king', img: `${A}/melchizedek-throne-altar.webp`, date: '2026-07-02', dateLabel: 'July 2, 2026', title: 'Melchizedek and the Eternal Priest-King', copy: 'The hidden order beyond temple, tribe, and time.' },
    { slug: 'red-seven-lost-nation', img: `${A}/red-seven-circle7-book.webp`, date: '2026-07-02', dateLabel: 'July 2, 2026', title: 'The Red Seven and the Lost Nation', copy: 'Circle 7, Noble Drew Ali, and the mystical rebirth of Moorish Science.' },
    { slug: 'three-lamps-abraham', img: `${A}/abraham-jerusalem.webp`, date: '2026-07-02', dateLabel: 'July 2, 2026', title: 'The Three Lamps of Abraham', copy: 'The hidden unity of Christianity, Islam, and Judaism beneath doctrine, ritual, and law.' },
    { slug: 'alkaline-aquifers', img: `${A}/hidden-waters-spring-sunset.webp`, date: '2026-07-01', dateLabel: 'July 1, 2026', title: 'The Hidden Waters', copy: 'A meditation on hidden waters, imagination, symbolic discipline, and inner sources.' },
    { slug: 'herculaneum', img: '/media/14b14b041b0e37cfaf26890d79c1866d.jpg', date: '2026-06-29', dateLabel: 'June 29, 2026', title: 'Herculaneum', copy: 'The buried library beneath Vesuvius and the reawakening of the ancient mind.' },
    { slug: 'prognostikon', img: `${A}/pergamon-bronze-oracle.webp`, date: '2026-06-20', dateLabel: 'June 20, 2026', title: 'The Bronze Oracle of Pergamon', copy: 'Fate, magic, technical divination, and the ancient machine of hidden signs.' },
    { slug: 'tabula-cebetis', img: `${A}/tabula-painted-map-panel.webp`, date: '2026-05-18', dateLabel: 'May 18, 2026', title: 'The Tabula Cebetis', copy: "A window into ancient philosophy, moral allegory, and the soul's symbolic journey." },
];

function HomePage() {
    return (
        <>
            <Helmet>
                <title>Three Magi Press | Hermetic, Occult &amp; Alchemical Books</title>
            </Helmet>

            <SiteHeader />

            <main id="top">
                <section className="hero" aria-labelledby="hero-title">
                    <img className="hero-image" src={`${A}/hermes-wide.webp`} alt="Weathered statue of Hermes against a dark background" />
                    <div className="hero-scrim" aria-hidden="true"></div>
                    <div className="hero-content">
                        <img className="hero-logo" src={`${A}/three-magi-logo-original.webp`} alt="Magi Press logo" />
                        <p className="eyebrow">Esoteric books for the midnight scholar</p>
                        <h1 id="hero-title">Three Magi Press</h1>
                        <p className="hero-copy">
                            Remarkable publications specializing in the Hermetic, occult, and alchemical traditions:
                            rare voices, rigorous research, and beautifully made books.
                        </p>
                        <div className="hero-actions" aria-label="Featured actions">
                            <Link className="button primary" to="/books">Browse Books</Link>
                            <a className="button ghost" href="#journal">Read the Blog</a>
                        </div>
                    </div>
                </section>

                <section className="third-lamp-invitation" aria-labelledby="third-lamp-title">
                    <img loading="lazy" decoding="async" src={`${A}/obsidian-altar-mirror.webp`} alt="Obsidian mirror on an esoteric scholar's table" />
                    <div>
                        <p className="eyebrow">New from Three Magi Press</p>
                        <h2 id="third-lamp-title">The Third Lamp</h2>
                        <p>A digital esoteric magazine of sacred history, living tradition, and the hidden architecture of ideas. Enter the current issue or follow the currents through its living archive.</p>
                        <Link className="button primary" to="/third-lamp">Enter the Magazine</Link>
                    </div>
                </section>

                <section className="catalog-band" id="books" aria-labelledby="books-title">
                    <div className="section-heading">
                        <p className="eyebrow">Featured from the seven-volume sequence</p>
                        <h2 id="books-title">Books of ritual, symbol, and transmutation</h2>
                        <p>
                            From first principles to fulfilled actualization, this sequence follows hidden force
                            from Source into form, through the living vessel, and home again.
                        </p>
                    </div>

                    <div className="book-grid">
                        <article className="book-card">
                            <figure className="book-cover book-cover-image">
                                <img loading="lazy" decoding="async" src={`${A}/book-architecture-hidden-forces.webp`} alt="Cover of The Architecture of Hidden Forces" />
                            </figure>
                            <div className="book-copy">
                                <p className="book-kicker">Book I / First Principles</p>
                                <h3>The Architecture of Hidden Forces</h3>
                                <p>First principles: Source, Spirit, Essence, Virtue, Force, Form — and the axiom that form is frozen force.</p>
                                <div className="card-row">
                                    <span>Volume I</span>
                                    <small>Coming Soon</small>
                                </div>
                            </div>
                        </article>

                        <article className="book-card">
                            <div className="book-cover book-cover-placeholder" data-volume="II">
                                <span>Book II</span>
                                <strong>Root Ether and the Fourfold Field</strong>
                                <small>Cover forthcoming</small>
                            </div>
                            <div className="book-copy">
                                <p className="book-kicker">Book II / The Living Medium</p>
                                <h3>Root Ether and the Fourfold Field</h3>
                                <p>The living medium of formation: Root Ether, the etheric tides, the gunas, tattvas, elements, and the subtle field beneath manifestation.</p>
                                <div className="card-row">
                                    <span>Volume II</span>
                                    <small>Coming Soon</small>
                                </div>
                            </div>
                        </article>

                        <article className="book-card">
                            <div className="book-cover book-cover-placeholder" data-volume="III">
                                <span>Book III</span>
                                <strong>Logos, Number, and the Birth of Form</strong>
                                <small>Cover forthcoming</small>
                            </div>
                            <div className="book-copy">
                                <p className="book-kicker">Book III / Sacred Measure</p>
                                <h3>Logos, Number, and the Birth of Form</h3>
                                <p>Measure, pattern, number, geometry, element, vessel, and configuration — the principles by which force becomes structured.</p>
                                <div className="card-row">
                                    <span>Volume III</span>
                                    <small>Coming Soon</small>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="catalog-action">
                        <p>Continue through celestial order, the living vessel, signatures, and the art of right relation.</p>
                        <Link className="button ghost" to="/books">View All Seven Books</Link>
                    </div>
                </section>

                <section className="stone-section" id="about" aria-labelledby="about-title">
                    <div className="about-panel">
                        <p className="eyebrow">What we publish</p>
                        <h2 id="about-title">Antique gravity, modern editorial discipline</h2>
                        <p>
                            Three Magi Press is imagined as a serious house for esoteric literature: annotated
                            translations, occult history, alchemical philosophy, ritual studies, and speculative
                            essays made with the care of a fine art object.
                        </p>
                    </div>
                    <figure className="statue-panel">
                        <img loading="lazy" decoding="async" src={`${A}/hermes-portrait.webp`} alt="Close view of a weathered Hermes statue" />
                    </figure>
                    <dl className="principles">
                        <div>
                            <dt>Material</dt>
                            <dd>Cloth, foil, stone-grey endpapers, archival typography.</dd>
                        </div>
                        <div>
                            <dt>Editorial</dt>
                            <dd>Notes, bibliographies, source clarity, and reverence without vagueness.</dd>
                        </div>
                        <div>
                            <dt>Tradition</dt>
                            <dd>Hermetic, alchemical, astrological, ceremonial, and mystical currents.</dd>
                        </div>
                    </dl>
                </section>

                <section className="journal-band" id="journal" aria-labelledby="journal-title">
                    <img loading="lazy" decoding="async" className="journal-backdrop" src={`${A}/asklepios.webp`} alt="" aria-hidden="true" />
                    <div className="section-heading">
                        <p className="eyebrow">From the blog</p>
                        <h2 id="journal-title">Field notes from the hidden library</h2>
                    </div>

                    <div className="journal-list">
                        {journalEntries.map((entry) => (
                            <Link className="journal-entry" to={`/articles/${entry.slug}`} key={entry.title}>
                                <figure className="journal-thumb">
                                    <img loading="lazy" decoding="async" src={entry.img} alt="" aria-hidden="true" />
                                </figure>
                                <div className="journal-copy">
                                    <time dateTime={entry.date}>{entry.dateLabel}</time>
                                    <h3>{entry.title}</h3>
                                    <p>{entry.copy}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
                    <div>
                        <p className="eyebrow">The lunar dispatch</p>
                        <h2 id="newsletter-title">Follow the Guiding Star</h2>
                        <p>Join our mailing list for new essays, exclusive releases, and curated esoteric research.</p>
                    </div>
                    <form className="signup" onSubmit={(e) => e.preventDefault()}>
                        <label className="form-trap" aria-hidden="true">
                            <span>Leave this field empty</span>
                            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" />
                        </label>
                        <label>
                            <span>Email address</span>
                            <input type="email" name="email" placeholder="reader@example.com" required />
                        </label>
                        <label className="human-check">
                            <span>Human check: <strong>What is 4 + 7?</strong></span>
                            <input type="number" inputMode="numeric" placeholder="Answer" autoComplete="off" required />
                        </label>
                        <button className="button primary" type="submit">Join</button>
                        <p className="form-note" aria-live="polite"></p>
                    </form>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}

export default HomePage;

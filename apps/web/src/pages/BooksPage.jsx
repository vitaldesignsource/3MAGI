import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

const A = 'https://3magipress.com/assets';

const books = [
    { vol: 'I', title: 'The Architecture of Hidden Forces', kicker: 'Book I / First Principles', copy: 'First principles: Source, Spirit, Essence, Virtue, Force, Form — and the axiom that form is frozen force.', image: `${A}/book-architecture-hidden-forces.png` },
    { vol: 'II', title: 'Root Ether and the Fourfold Field', kicker: 'Book II / The Living Medium', copy: 'The living medium of formation: Root Ether, the etheric tides, the gunas, tattvas, elements, and the subtle field beneath manifestation.' },
    { vol: 'III', title: 'Logos, Number, and the Birth of Form', kicker: 'Book III / Sacred Measure', copy: 'Measure, pattern, number, geometry, element, vessel, and configuration — the principles by which force becomes structured.' },
    { vol: 'IV', title: 'The Celestial Anatomy of Force', kicker: 'Book IV / Celestial Order', copy: 'Astrology, lunar mansions, planetary virtues, celestial timing, and the cosmic ordering of hidden forces.' },
    { vol: 'V', title: 'The Living Vessel', kicker: 'Book V / The Microcosm', copy: 'The architecture brought into the body: chakras, meridians, nadis, breath, organs, subtle anatomy — the human being as microcosm.' },
    { vol: 'VI', title: 'The Language of Signatures', kicker: 'Book VI / Correspondence', copy: 'Trace, imprint, symbol, correspondence, signatures — plants, metals, stones, colors, sounds, and the doctrine of scale.' },
    { vol: 'VII', title: 'The Art of Right Relation', kicker: 'Book VII / Return to Source', copy: "Distortion, purification, participation, metamorphōsis, theurgy — and fulfilled actualization: force returned to essence, essence returned to Source." },
];

function BooksPage() {
    return (
        <>
            <Helmet>
                <title>Books | Three Magi Press</title>
            </Helmet>

            <SiteHeader />

            <main>
                <section className="books-page-hero" aria-labelledby="catalog-title">
                    <img src={`${A}/hermes-wide.png`} alt="Weathered statue of Hermes in darkness" />
                    <div className="books-page-hero-scrim" aria-hidden="true"></div>
                    <div className="books-page-hero-copy">
                        <p className="eyebrow">The complete sequence</p>
                        <h1 id="catalog-title">Books of Ritual, Symbol, and Transmutation</h1>
                        <p>
                            A seven-volume architecture of the unseen, following hidden force from Source into
                            form, through the living vessel, and home again.
                        </p>
                        <a className="button ghost" href="#complete-catalog">Enter the Catalog</a>
                    </div>
                </section>

                <section className="catalog-band books-catalog" id="complete-catalog" aria-labelledby="sequence-title">
                    <div className="section-heading">
                        <p className="eyebrow">Seven books / one ascending work</p>
                        <h2 id="sequence-title">The Architecture of the Unseen</h2>
                        <p>
                            Each volume stands as its own study while forming part of a continuous progression:
                            first principles, field, form, cosmos, body, correspondence, and return.
                        </p>
                    </div>

                    <div className="book-grid books-grid-seven">
                        {books.map((book) => (
                            <article className="book-card" key={book.vol}>
                                {book.image ? (
                                    <figure className="book-cover book-cover-image">
                                        <img src={book.image} alt={`Cover of ${book.title}`} />
                                    </figure>
                                ) : (
                                    <div className="book-cover book-cover-placeholder" data-volume={book.vol}>
                                        <span>{`Book ${book.vol}`}</span>
                                        <strong>{book.title}</strong>
                                        <small>Cover forthcoming</small>
                                    </div>
                                )}
                                <div className="book-copy">
                                    <p className="book-kicker">{book.kicker}</p>
                                    <h3>{book.title}</h3>
                                    <p>{book.copy}</p>
                                    <div className="card-row">
                                        <span>{`Volume ${book.vol}`}</span>
                                        <small>Coming Soon</small>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="catalog-dispatch" aria-labelledby="catalog-dispatch-title">
                    <p className="eyebrow">Publication notices</p>
                    <h2 id="catalog-dispatch-title">Follow the Work as It Appears</h2>
                    <p>Receive notices of release dates, editions, excerpts, and related essays.</p>
                    <Link className="button primary" to="/#newsletter">Join the Lunar Dispatch</Link>
                </section>
            </main>

            <SiteFooter />
        </>
    );
}

export default BooksPage;

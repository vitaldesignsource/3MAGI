import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import library from '../data/education/library';
import ScriptoriumSearch from '../components/ScriptoriumSearch';
import ScriptoriumCognates from '../components/ScriptoriumCognates';
import { HALLS } from '../data/education/portal/halls';
import { DoorLegend, MagicDoor } from './magic/MagicDoors';
import { ALPHABETS, MAGIC_PATH, WING } from './magic/lib';
import { capitalise, numberWord, scriptoriumDescription } from './magic/words';
import '../styles/magic.css';

const TRADITION_LABELS = {
    'hermetica': 'Hermetica',
    'kabbalah': 'Kabbalah',
    'alchemy': 'Alchemy',
    'egyptian': 'Egyptian',
    'theurgy': 'Theurgy',
    'ceremonial-magic': 'Ceremonial Magic',
    'rosicrucian': 'Rosicrucian',
    'mesopotamian': 'Mesopotamian',
    'vedic': 'Vedic & Tantric',
    'islamic': 'Islamic Esotericism',
    'general': 'General',
};

function EducationPortalPage() {
    const [tradition, setTradition] = useState('all');
    // The counts in the copy are read from HALLS and the wing's registry, not
    // typed: the copy went on saying "sixteen" after the twentieth hall opened.
    const halls = numberWord(HALLS.length);

    const traditions = useMemo(() => {
        const present = new Set(library.books.map((b) => b.tradition));
        return Object.keys(TRADITION_LABELS).filter((t) => present.has(t));
    }, []);
    const shown = tradition === 'all'
        ? library.books
        : library.books.filter((b) => b.tradition === tradition);

    return (
        <div className="third-lamp-scope edu-page">
            <Helmet>
                <title>The Scriptorium — The Third Lamp</title>
                <meta name="description" content={scriptoriumDescription(HALLS.map((h) => h.name))} />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero">
                    <p className="kicker">An Education Portal</p>
                    <h1>The Scriptorium</h1>
                    <p className="edu-hero-sub">
                        A study hall for the serious reader: a library of the tradition's
                        source texts, free to download, and {halls} language halls where the
                        sacred scripts are laid out to be learned — letter by letter,
                        name by name.
                    </p>
                    <div className="edu-hero-glyphs is-halls" aria-hidden="true"
                        style={{ '--edu-hero-cols': Math.ceil(HALLS.length / 2), '--edu-hero-cols-sm': Math.ceil(HALLS.length / 4) }}>
                        {HALLS.map((h) => <span key={h.slug} className="edu-glyph">{h.glyph}</span>)}
                    </div>
                </section>

                <ScriptoriumSearch scripts={HALLS.length} />

                <section className="edu-halls" aria-labelledby="edu-halls-heading">
                    <header className="edu-section-head">
                        <p className="kicker">The Language Halls</p>
                        <h2 id="edu-halls-heading">{capitalise(halls)} scripts, {halls} doors</h2>
                        <p>Each hall holds the alphabet in full, the divine names written
                            as the tradition wrote them, and a working lexicon of the terms
                            a student actually meets.</p>
                    </header>
                    <div className="edu-hall-grid">
                        {HALLS.map((h) => (
                            <Link className="edu-hall-card" to={`/third-lamp/education/${h.slug}`} key={h.slug}>
                                <span className="edu-hall-glyph edu-glyph" aria-hidden="true">{h.glyph}</span>
                                <h3>{h.name}</h3>
                                <p className="edu-hall-sample edu-glyph">{h.sample}</p>
                                <p className="edu-hall-blurb">{h.blurb}</p>
                                <span className="edu-hall-enter" aria-hidden="true">Enter the hall →</span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="edu-halls edu-magic" aria-labelledby="edu-magic-heading">
                    <header className="edu-section-head">
                        <p className="kicker">{WING.kicker}</p>
                        <h2 id="edu-magic-heading">{WING.title}</h2>
                        <p>A wing for the magical and secret alphabets: the angelic scripts Agrippa printed, the
                            Theban, the signs of the planets and the furnace, the runes — {numberWord(ALPHABETS.length)} alphabets
                            and kinds of sign, each set beside the books that carried it.</p>
                    </header>
                    <div className="edu-hall-grid mg-door-grid is-compact">
                        {ALPHABETS.map((a) => <MagicDoor key={a.slug} entry={a} compact />)}
                    </div>
                    <DoorLegend />
                    <div className="edu-magic-ways">
                        <Link to={MAGIC_PATH}>Enter the wing →</Link>
                        <Link to={`${MAGIC_PATH}/compare`}>The alphabets compared</Link>
                        <Link to={`${MAGIC_PATH}/transliterate`}>The transliterator</Link>
                    </div>
                </section>

                <ScriptoriumCognates />

                <section className="edu-library" aria-labelledby="edu-library-heading">
                    <header className="edu-section-head">
                        <p className="kicker">The Reading Room</p>
                        <h2 id="edu-library-heading">Books in the public domain</h2>
                        <p>Source texts of the Western esoteric tradition, each held by the
                            Internet Archive and downloadable as a PDF. Every link is
                            checked; every edition is out of copyright.</p>
                    </header>

                    {traditions.length > 1 && (
                        <div className="edu-filter-row" role="group" aria-label="Filter books by tradition">
                            <button type="button" className={`edu-filter${tradition === 'all' ? ' is-active' : ''}`} onClick={() => setTradition('all')}>
                                All ({library.books.length})
                            </button>
                            {traditions.map((t) => (
                                <button type="button" key={t} className={`edu-filter${tradition === t ? ' is-active' : ''}`} onClick={() => setTradition(t)}>
                                    {TRADITION_LABELS[t]}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="edu-book-grid">
                        {shown.map((b) => (
                            <article className="edu-book-card" key={b.pdfUrl}>
                                <p className="edu-book-tradition">{TRADITION_LABELS[b.tradition] || b.tradition}</p>
                                <h3>{b.title}</h3>
                                <p className="edu-book-byline">{b.author} · {b.year}</p>
                                <p className="edu-book-desc">{b.description}</p>
                                <div className="edu-book-actions">
                                    <a className="edu-book-download" href={b.pdfUrl} target="_blank" rel="noopener noreferrer">
                                        Download PDF{b.sizeMB ? ` · ${b.sizeMB} MB` : ''}
                                    </a>
                                    {b.detailUrl && (
                                        <a className="edu-book-source" href={b.detailUrl} target="_blank" rel="noopener noreferrer">
                                            {b.source}
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default EducationPortalPage;

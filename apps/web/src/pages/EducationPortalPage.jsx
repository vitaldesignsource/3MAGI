import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import library from '../data/education/library';

// The Language Halls. The glyphs are the halls' door-signs: the Roman A,
// Greek omega, Hebrew aleph, the ankh (Gardiner S34), the cuneiform sign AN
// — which is both the sky-god and the determinative marking any name as
// divine — the Devanagari om, and the name of God in Arabic letters.
export const HALLS = [
    { slug: 'latin', name: 'Latin', glyph: 'A', sample: 'Solve et Coagula', blurb: 'The working tongue of alchemy, liturgy, and the printed grimoire — the language the Western tradition thinks in.' },
    { slug: 'greek', name: 'Greek', glyph: 'Ω', sample: 'Γνῶθι σεαυτόν', blurb: 'The alphabet of the mysteries: gnosis, logos, and the number-letters of isopsephy.' },
    { slug: 'hebrew', name: 'Hebrew', glyph: 'א', sample: 'אין סוף', blurb: 'Twenty-two letters held to be the instruments of creation itself — the grammar of Kabbalah.' },
    { slug: 'egyptian', name: 'Egyptian', glyph: '\u{132F9}', sample: 'per-ankh', blurb: 'The hieroglyphs of the House of Life: sacred writing where image, sound, and power are one.' },
    { slug: 'cuneiform', name: 'Cuneiform', glyph: '\u{1202D}', sample: '\u{1202D}\u{12000}\u{12261}', blurb: 'Sumerian and Akkadian pressed into clay — the oldest writing, and the oldest gods to be written down.' },
    { slug: 'sanskrit', name: 'Sanskrit', glyph: '\u0950', sample: 'तत् त्वम् असि', blurb: 'The perfected tongue: mantra, Veda, and a grammar its own tradition treated as revelation.' },
    { slug: 'arabic', name: 'Arabic', glyph: 'الله', sample: 'الحقيقة', blurb: 'The letters of the Qur\u2019an, and after them the lettrism, alchemy, and Sufi metaphysics of the Islamic world.' },
    { slug: 'tibetan', name: 'Tibetan', glyph: 'ༀ', sample: 'རྫོགས་ཆེན', blurb: 'Vajray\u0101na in its own script: tantra, subtle body, the bardo, and the treasures hidden for later ages.' },
    { slug: 'syriac', name: 'Syriac', glyph: 'ܐ', sample: 'ܡܪܝܐ', blurb: 'The Aramaic of the eastern churches — mystical theology, angelology, and the channel by which Greek learning reached Arabic.' },
    { slug: 'coptic', name: 'Coptic', glyph: 'Ⲁ', sample: 'ⲡⲛⲟⲩⲧⲉ', blurb: 'Egypt writing itself in Greek letters: the Gnostic library, the desert fathers, and a Christian magic still full of older gods.' },
    { slug: 'aramaic', name: 'Aramaic', glyph: 'ܐ', sample: 'אשותא', blurb: 'The lingua franca of empires — incantation bowls, Mandaean scripture, and the demonology of late antiquity.' },
    { slug: 'persian', name: 'Persian', glyph: 'ﭘ', sample: 'اشراق', blurb: 'Illuminationist philosophy, Sufi poetry, and the talismanic and alchemical sciences of the Iranian world.' },
    { slug: 'armenian', name: 'Armenian', glyph: 'Ա', sample: 'Աստուած', blurb: 'A script made for scripture: apocrypha, Solomonic magic, amulet scrolls, and visionary literature preserved nowhere else.' },
    { slug: 'geez', name: 'Ge\u02bcez', glyph: 'ሀ', sample: 'መጽሐፈ ሄኖክ', blurb: 'The liturgical tongue of Ethiopia, which alone preserved Enoch entire — with its magic scrolls, its angels and its demons.' },
];

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
                <meta name="description" content="The Third Lamp's education portal: a reading room of public-domain esoteric books in PDF, and language halls for Latin, Greek, Hebrew, Egyptian, Cuneiform, Sanskrit, Arabic, Tibetan, Syriac, Coptic, Aramaic, Persian, Armenian and Geʼez — alphabets, divine names, sacred texts and lexicons." />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero">
                    <p className="kicker">An Education Portal</p>
                    <h1>The Scriptorium</h1>
                    <p className="edu-hero-sub">
                        A study hall for the serious reader: a library of the tradition's
                        source texts, free to download, and fourteen language halls where the
                        sacred scripts are laid out to be learned — letter by letter,
                        name by name.
                    </p>
                    <div className="edu-hero-glyphs" aria-hidden="true">
                        {HALLS.map((h) => <span key={h.slug} className="edu-glyph">{h.glyph}</span>)}
                    </div>
                </section>

                <section className="edu-halls" aria-labelledby="edu-halls-heading">
                    <header className="edu-section-head">
                        <p className="kicker">The Language Halls</p>
                        <h2 id="edu-halls-heading">Fourteen scripts, fourteen doors</h2>
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

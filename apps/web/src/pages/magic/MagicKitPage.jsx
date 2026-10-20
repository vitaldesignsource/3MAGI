import React from 'react';
import { Helmet } from 'react-helmet';
import MagicGlyph from './MagicGlyph';
import { LetterGrid } from './Letters';
import sample from './kitSample';
import '../../styles/magic.css';

// The glyph kit's proof: the kit's own sample set drawn by the site's
// renderer, laid out exactly as glyphkit/sheet.mjs lays out its specimen
// sheet, so the two can be compared pixel for pixel. Below it the same
// letters stand in the wing's letter grid, keyed to Hebrew and running right
// to left, to prove the keyboard. Not linked, not in the sitemap, not indexed.

const CONF = { high: '#9fc28a', medium: '#d9b25f', low: '#d9806a' };
const COLS = 4;

function Line({ px }) {
    return (
        <div className="mg-kit-row">
            {sample.letters.map((l, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <span style={{ display: 'inline-block', width: `${Math.round(px / 6)}px` }} />}
                    <MagicGlyph g={l.glyph} size={px} />
                </React.Fragment>
            ))}
        </div>
    );
}

function MagicKitPage() {
    return (
        <div className="mg-kit-page">
            <Helmet>
                <title>Glyph Kit Proof — The Magical Scriptorium</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="mg-kit-sheet" style={{ width: `${24 * 2 + COLS * 184}px` }}>
                <h1>{sample.title}</h1>
                <div className="mg-kit-grid" style={{ gridTemplateColumns: `repeat(${COLS}, 170px)` }}>
                    {sample.letters.map((l) => (
                        <div className="mg-kit-card" key={l.order}>
                            <div className="mg-kit-box"><MagicGlyph g={l.glyph} size={150} /></div>
                            <div className="mg-kit-nm">{`${l.order}. ${l.name} `}<span className="mg-kit-v">{l.value}</span></div>
                            <div className="mg-kit-cf" style={{ color: CONF[l.formConfidence] || '#ccc' }}>{l.formConfidence}</div>
                        </div>
                    ))}
                </div>
                <div className="mg-kit-lab">At text size (28 px)</div>
                <Line px={28} />
                <div className="mg-kit-lab">Small (14 px)</div>
                <Line px={14} />
            </div>

            <div className="third-lamp-scope edu-page mg-page">
                <main className="edu-main">
                    <section className="edu-alphabet mg-letters" aria-labelledby="mg-kit-heading">
                        <header className="edu-section-head">
                            <p className="kicker">The Kit in the Grid</p>
                            <h2 id="mg-kit-heading">Keyed to Hebrew, right to left</h2>
                        </header>
                        <LetterGrid mod={{ title: sample.title }} letters={sample.letters} keyedTo="hebrew" direction="rtl"
                            label={`${sample.title}: ${sample.letters.length} letters`} />
                    </section>
                </main>
            </div>
        </div>
    );
}

export default MagicKitPage;

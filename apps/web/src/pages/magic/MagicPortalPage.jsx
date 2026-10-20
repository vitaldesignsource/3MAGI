import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../../components/ThirdLampHeader';
import ThirdLampFooter from '../../components/ThirdLampFooter';
import ScriptoriumSearch from '../../components/ScriptoriumSearch';
import PortalEmblem from '../christianities/PortalEmblem';
import { MagicDoor } from './MagicDoors';
import { ALPHABETS, GROUPS, MAGIC_PATH, PAGES, WING, capitalise, entryPath, fitStyle, numberWord, textOf } from './lib';
import compare from '../../data/education/magic/compare.generated';
import '../../styles/magic.css';

// The wing's portal: the alphabets by kind, the tools that work across them,
// the author and the books, and the Scriptorium's search. Counts are read from
// the registry; an emblem appears in the hero the day data/emblems.js gains a
// 'magic' entry, and until then the slot renders nothing.

function MagicPortalPage() {
    // Read from the data: how many alphabets can be shown now, how many are
    // waiting on their forms, and how many pages are still being written.
    const shown = ALPHABETS.filter((a) => compare.entries[a.slug]?.shown > 0).length;
    const tracing = ALPHABETS.filter((a) => a.status === 'forms-pending').length;
    const writing = ALPHABETS.length - shown - tracing;
    return (
        <div className="third-lamp-scope edu-page mg-page mg-portal">
            <Helmet>
                <title>The Magical Scriptorium — The Scriptorium — The Third Lamp</title>
                <meta name="description" content="The Magical Scriptorium, a wing of The Third Lamp's Scriptorium: the magical and secret alphabets — Agrippa's angelic scripts, the Theban, the signs of the planets and the furnace, the runes — with the books that carried them, what is documented and what is claimed, a comparison of the alphabets and a transliterator." />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero mg-hero">
                    <PortalEmblem name="magic" />
                    <p className="kicker"><Link to="/third-lamp/education">The Scriptorium</Link> · A Wing</p>
                    <h1 className="mg-fit" style={fitStyle(WING.title)}>{WING.title}</h1>
                    <p className="edu-hero-sub">{WING.intro}</p>
                    <div className="edu-hero-glyphs mg-hero-glyphs" aria-hidden="true">
                        {WING.heroSigns.map((s) => <span key={s} className="edu-glyph">{textOf(s)}</span>)}
                    </div>
                    <nav className="edu-section-nav" aria-label="Sections of this wing">
                        <a href="#mg-alphabets-heading">The alphabets</a>
                        <a href="#mg-tools-heading">Compare and transliterate</a>
                        <a href="#mg-books-heading">The author and the books</a>
                        <a href="#edu-search-heading">Search</a>
                    </nav>
                </section>

                <section className="mg-alphabets" aria-labelledby="mg-alphabets-heading">
                    <header className="edu-section-head">
                        <p className="kicker">{WING.kicker}</p>
                        <h2 id="mg-alphabets-heading">{capitalise(numberWord(ALPHABETS.length))} alphabets and kinds of sign</h2>
                        <p>{capitalise(numberWord(shown))} can be shown in full now. The forms of {numberWord(tracing)} are being
                            traced from the editions that first printed them, and their doors say so{writing > 0
                                ? `; ${numberWord(writing)} more ${writing === 1 ? 'is' : 'are'} being written` : ''}. Every
                            door opens: a page still in preparation gives its summary and its sources.</p>
                    </header>
                    {GROUPS.map((g) => {
                        const members = ALPHABETS.filter((a) => a.group === g.key);
                        if (!members.length) return null;
                        return (
                            <div className="mg-group" key={g.key}>
                                <div className="mg-group-head">
                                    <h3 id={`mg-group-${g.key}`}>{g.title}</h3>
                                    <p>{g.note}</p>
                                </div>
                                <div className="edu-hall-grid mg-door-grid" role="list" aria-labelledby={`mg-group-${g.key}`}>
                                    {members.map((a) => (
                                        <div role="listitem" key={a.slug} className="mg-door-cell">
                                            <MagicDoor entry={a} stub={compare.entries[a.slug]?.stub} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section className="mg-tools" aria-labelledby="mg-tools-heading">
                    <header className="edu-section-head">
                        <p className="kicker">Across the Alphabets</p>
                        <h2 id="mg-tools-heading">Compare and transliterate</h2>
                        <p>Two tools that read the same letter data the pages show, so neither can disagree with them.</p>
                    </header>
                    <div className="mg-tool-grid">
                        <Link className="mg-tool" to={`${MAGIC_PATH}/compare`}>
                            <span className="mg-tool-kicker">The tables</span>
                            <span className="mg-tool-title">The alphabets compared</span>
                            <span className="mg-tool-line">The alphabets keyed to the Hebrew letters side by side with their ancestor, and those keyed to the Latin letters with theirs.</span>
                            <span className="mg-tool-enter" aria-hidden="true">Open →</span>
                        </Link>
                        <Link className="mg-tool" to={`${MAGIC_PATH}/transliterate`}>
                            <span className="mg-tool-kicker">The pen</span>
                            <span className="mg-tool-title">Write in a secret alphabet</span>
                            <span className="mg-tool-line">Type and see it written, with every convention the tool follows printed beneath it.</span>
                            <span className="mg-tool-enter" aria-hidden="true">Open →</span>
                        </Link>
                    </div>
                </section>

                <section className="mg-books" aria-labelledby="mg-books-heading">
                    <header className="edu-section-head">
                        <p className="kicker">Hand to Hand</p>
                        <h2 id="mg-books-heading">The author and the books</h2>
                    </header>
                    <div className="edu-book-grid mg-page-grid">
                        {PAGES.map((p) => (
                            <article className="edu-book-card mg-page-card" key={p.slug}>
                                <p className="edu-book-tradition">{p.kind === 'author' ? 'The Author' : 'The Lineage'}</p>
                                <h3><Link to={entryPath(p.slug)}>{p.title}</Link></h3>
                                <p className="edu-book-desc">{p.blurb}</p>
                                {compare.entries[p.slug]?.stub && <p className="mg-door-status">In preparation</p>}
                            </article>
                        ))}
                    </div>
                </section>

                <ScriptoriumSearch />

                <nav className="edu-hall-nav" aria-label="Back to the Scriptorium">
                    <Link to="/third-lamp/education">← The Scriptorium</Link>
                    <Link to={`${MAGIC_PATH}/compare`}>The alphabets compared</Link>
                    <Link to={`${MAGIC_PATH}/transliterate`}>The transliterator</Link>
                </nav>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default MagicPortalPage;

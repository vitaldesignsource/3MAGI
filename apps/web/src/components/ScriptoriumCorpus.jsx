import React, { useState } from 'react';

// A hall's shelf of primary books: the Theatrum Chemicum treatises in the
// Latin hall, the Kabbalistic library in the Hebrew hall. Each corpus opens
// with a clickable index of the whole shelf; each work then carries its own
// table of contents where the work genuinely has one. Where a division or an
// opening could not be confirmed, the data says so rather than guessing, and
// this component renders that admission as plainly as it renders the rest.

const META_SEP = ' · ';

function Work({ work, rtl, corpusId }) {
    const [openToc, setOpenToc] = useState(false);
    const hasToc = Array.isArray(work.contents) && work.contents.length > 0;
    const meta = [work.author, work.date, work.language, work.volume].filter(Boolean);

    return (
        <article className="edu-work" id={`${corpusId}-${work.slug}`}>
            <header className="edu-work-head">
                {work.native && (
                    <h3 className="edu-work-native edu-glyph" dir={rtl ? 'rtl' : undefined} lang={rtl ? 'he' : undefined}>
                        {work.native}
                    </h3>
                )}
                <p className="edu-work-titles">
                    {work.translit && <span className="edu-work-translit">{work.translit}</span>}
                    <span className="edu-work-english">{work.english}</span>
                </p>
                {meta.length > 0 && <p className="edu-work-meta">{meta.join(META_SEP)}</p>}
            </header>

            <p className="edu-work-desc">{work.description}</p>

            {work.incipit && (
                <div className="edu-work-incipit">
                    <p className="edu-incipit-native edu-glyph" dir={rtl ? 'rtl' : undefined} lang={rtl ? 'he' : undefined}>
                        {work.incipit.native}
                    </p>
                    <p className="edu-incipit-english">“{work.incipit.english}”</p>
                    {work.incipit.note && <p className="edu-incipit-note">{work.incipit.note}</p>}
                </div>
            )}

            {hasToc && (
                <div className="edu-work-toc">
                    <button
                        type="button"
                        className="edu-work-toc-toggle"
                        onClick={() => setOpenToc((v) => !v)}
                        aria-expanded={openToc}
                    >
                        {openToc ? 'Close the contents' : `Contents — ${work.contents.length} divisions`}
                    </button>
                    {openToc && (
                        <ol className="edu-toc-list">
                            {work.contents.map((c, i) => (
                                <li key={i}>
                                    <span className="edu-toc-heading edu-glyph" dir={rtl ? 'rtl' : undefined}>{c.heading}</span>
                                    <span className="edu-toc-english" dir="ltr">{c.english}</span>
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            )}

            {work.contentsNote && <p className="edu-work-contents-note">{work.contentsNote}</p>}

            {work.editions.length > 0 && (
                <ul className="edu-work-editions">
                    {work.editions.map((e) => (
                        <li key={e.url}>
                            <a href={e.url} target="_blank" rel="noopener noreferrer">{e.label}</a>
                            {e.note && <span className="edu-edition-note">{e.note}</span>}
                        </li>
                    ))}
                </ul>
            )}

            <a className="edu-work-back" href={`#${corpusId}-index`}>↑ Back to the shelf</a>
        </article>
    );
}

function ScriptoriumCorpus({ corpus, heading, kicker, corpusId, rtl }) {
    if (!corpus || corpus.works.length === 0) return null;

    return (
        <section className="edu-corpus" aria-labelledby={`${corpusId}-heading`}>
            <header className="edu-section-head">
                <p className="kicker">{kicker}</p>
                <h2 id={`${corpusId}-heading`}>{heading}</h2>
                {corpus.note && <p>{corpus.note}</p>}
            </header>

            <nav className="edu-corpus-index" id={`${corpusId}-index`} aria-label={`${heading} contents`}>
                <p className="edu-corpus-index-label">The shelf</p>
                <ol>
                    {corpus.works.map((w, i) => (
                        <li key={w.slug}>
                            <a href={`#${corpusId}-${w.slug}`}>
                                <span className="edu-corpus-index-n">{i + 1}</span>
                                <span className="edu-corpus-index-body">
                                    {w.native && (
                                        <span className="edu-corpus-index-native edu-glyph" dir={rtl ? 'rtl' : undefined}>{w.native}</span>
                                    )}
                                    <span className="edu-corpus-index-english">{w.english}</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="edu-work-list">
                {corpus.works.map((w) => (
                    <Work work={w} rtl={rtl} corpusId={corpusId} key={w.slug} />
                ))}
            </div>
        </section>
    );
}

export default ScriptoriumCorpus;

import React, { useState } from 'react';

// The Currents — thematic essays on a tradition's esoteric disciplines.
// Each hall's currents open as an index; selecting one shows its essay, the
// technical vocabulary in its own script, and the primary sources it rests
// on. This is the deep end of a hall: the alphabet teaches the script, the
// currents teach what the script was used for.

function ScriptoriumCurrents({ currents, rtl, hallId }) {
    const [active, setActive] = useState(0);
    if (!currents || currents.themes.length === 0) return null;

    const theme = currents.themes[active] || currents.themes[0];

    return (
        <section className="edu-currents" aria-labelledby="edu-currents-heading">
            <header className="edu-section-head">
                <p className="kicker">The Deep End</p>
                <h2 id="edu-currents-heading">The Currents</h2>
                {currents.note && <p>{currents.note}</p>}
            </header>

            <nav className="edu-current-tabs" aria-label="Currents">
                {currents.themes.map((t, i) => (
                    <button
                        type="button"
                        key={t.slug}
                        className={`edu-current-tab${i === active ? ' is-active' : ''}`}
                        aria-current={i === active}
                        onClick={() => setActive(i)}
                    >
                        {t.title}
                    </button>
                ))}
            </nav>

            <article className="edu-current" id={`${hallId}-current-${theme.slug}`} aria-live="polite">
                <header className="edu-current-head">
                    {theme.native && (
                        <p className="edu-current-native edu-glyph" dir={rtl ? 'rtl' : undefined}>{theme.native}</p>
                    )}
                    <h3>{theme.title}</h3>
                    {theme.translit && <p className="edu-current-translit">{theme.translit}</p>}
                    <p className="edu-current-summary">{theme.summary}</p>
                </header>

                <div className="edu-current-body">
                    {theme.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                {theme.terms.length > 0 && (
                    <div className="edu-current-terms">
                        <h4>Terms</h4>
                        <ul dir={rtl ? 'rtl' : undefined}>
                            {theme.terms.map((t, i) => (
                                <li key={i}>
                                    <span className="edu-current-term-native edu-glyph">{t.native}</span>
                                    <span className="edu-current-term-translit" dir="ltr">{t.translit}</span>
                                    <span className="edu-current-term-gloss" dir="ltr">{t.gloss}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {theme.texts.length > 0 && (
                    <div className="edu-current-texts">
                        <h4>Sources</h4>
                        <ul>
                            {theme.texts.map((t, i) => (
                                <li key={i}>
                                    <span className="edu-current-text-title">{t.title}</span>
                                    <span className="edu-current-text-note">{t.note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </article>
        </section>
    );
}

export default ScriptoriumCurrents;

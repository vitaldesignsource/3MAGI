import React from 'react';
import Rich from './rich';

// The line the Fama gives itself. The text names its brothers only by
// initials, so each is drawn as a seal of those letters and nothing more:
// the initials are all the record holds, and any name put to them is a guess
// that the note attributes to whoever made it. Rows are the generations the
// text narrates; the rule of succession heads them because it is what turns
// a list of initials into a line.

const seal = (initials) => String(initials).replace(/^Fra(ter)?\.?\s*/i, '').replace(/\s+/g, '');

function RosicrucianBrethren({ rule, brethren, generations, succession }) {
    const gens = [...new Set((brethren ?? []).map((b) => b.generation))].sort((a, b) => a - b);
    const genLabel = Object.fromEntries((generations ?? []).map((g) => [g.n, g]));
    return (
        <div className="ch-rc-brethren">
            {rule && (
                <figure className="ch-rc-brethren-rule">
                    <blockquote><p>{rule.quote}</p></blockquote>
                    <figcaption>{rule.translation}</figcaption>
                    {rule.note && <p className="ch-rc-brethren-rule-note"><Rich t={rule.note} /></p>}
                </figure>
            )}
            <div className="ch-rc-gens">
                {gens.map((g) => (
                    <section key={g} className={`ch-rc-gen is-gen-${g}`} aria-label={genLabel[g]?.label ?? `Generation ${g}`}>
                        <header className="ch-rc-gen-head">
                            <p className="ch-rc-gen-label">{genLabel[g]?.label ?? `Generation ${g}`}</p>
                            {genLabel[g]?.note && <p className="ch-rc-gen-note"><Rich t={genLabel[g].note} /></p>}
                        </header>
                        <ol className="ch-rc-gen-row">
                            {brethren.filter((b) => b.generation === g).sort((a, b) => a.order - b.order).map((b) => (
                                <li key={b.key} id={`brother-${b.key}`} className="ch-rc-brother">
                                    <p className="ch-rc-brother-seal" aria-hidden="true"><span>{seal(b.initials)}</span></p>
                                    <h3>{b.initials}</h3>
                                    {b.joined && <p className="ch-rc-brother-joined">{b.joined}</p>}
                                    <p className="ch-rc-brother-says"><Rich t={b.says} /></p>
                                    {b.quote && (
                                        <blockquote className="ch-rc-brother-quote">
                                            <p>{b.quote}</p>
                                            {b.quoteTranslation && <footer>{b.quoteTranslation}</footer>}
                                        </blockquote>
                                    )}
                                    {b.note && <div className="ch-kv"><span>Who was he?</span><p><Rich t={b.note} /></p></div>}
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>
            {succession?.length > 0 && (
                <div className="ch-rc-succession">
                    <h3>The succession, as the text tells it</h3>
                    <ol>{succession.map((s, i) => <li key={i}><Rich t={s} /></li>)}</ol>
                </div>
            )}
        </div>
    );
}

export default RosicrucianBrethren;

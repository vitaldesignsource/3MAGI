import React, { useEffect, useState } from 'react';
import Rich from './rich';

// The line the Fama gives itself. The text names its brothers only by
// initials, so each is drawn as a seal of those letters and nothing more:
// the initials are all the record holds, and any name put to them is a guess
// that the note attributes to whoever made it. Rows are the generations the
// text narrates; the rule of succession heads them because it is what turns
// a list of initials into a line.
//
// The line is the picture, so it is shown whole as a tree of seals, and one
// brother at a time is opened beneath it. A search result arriving as
// #brother-<key> opens that brother.

// The seal shows the letters alone: no title, no quotation marks, and no
// gloss in brackets ('We' for the narrators who give no initials at all).
const seal = (initials) => String(initials)
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/[‘’“”'"]/g, '')
    .replace(/^(Fra(ter)?\.?|Fr\.|Brother)\s*/i, '')
    .replace(/\s+/g, '');

function RosicrucianBrethren({ rule, brethren, generations, succession }) {
    const list = brethren ?? [];
    const founder = list.find((b) => b.founder) ?? list[0];
    const [open, setOpen] = useState(founder?.key);
    const gens = [...new Set(list.map((b) => b.generation))].sort((a, b) => a - b);
    const genLabel = Object.fromEntries((generations ?? []).map((g) => [g.n, g]));
    const b = list.find((x) => x.key === open) ?? founder;

    useEffect(() => {
        const fromHash = () => {
            const m = decodeURIComponent(window.location.hash).match(/^#brother-(.+)$/);
            if (m && list.some((x) => x.key === m[1])) {
                setOpen(m[1]);
                requestAnimationFrame(() => document.getElementById('rc-brother-detail')?.scrollIntoView({ block: 'start' }));
            }
        };
        fromHash();
        window.addEventListener('hashchange', fromHash);
        return () => window.removeEventListener('hashchange', fromHash);
    }, [list]);

    return (
        <div className="ch-rc-brethren">
            {rule && (
                <figure className="ch-rc-brethren-rule">
                    <blockquote><p>{rule.quote}</p></blockquote>
                    <figcaption>{rule.translation}</figcaption>
                    {rule.note && <p className="ch-rc-brethren-rule-note"><Rich t={rule.note} /></p>}
                </figure>
            )}
            <div className="ch-rc-gens" role="group" aria-label="The brothers of the Fama, by generation">
                {gens.map((g) => (
                    <section key={g} className={`ch-rc-gen is-gen-${g}`} aria-label={genLabel[g]?.label ?? `Generation ${g}`}>
                        <header className="ch-rc-gen-head">
                            <p className="ch-rc-gen-label">{genLabel[g]?.label ?? `Generation ${g}`}</p>
                            {genLabel[g]?.note && <p className="ch-rc-gen-note"><Rich t={genLabel[g].note} /></p>}
                        </header>
                        <ol className="ch-rc-gen-row">
                            {list.filter((x) => x.generation === g).sort((x, y) => x.order - y.order).map((x) => (
                                <li key={x.key} id={`brother-${x.key}`}>
                                    <button type="button" className={`ch-rc-brother-seal${x.key === b?.key ? ' is-open' : ''}${x.founder ? ' is-founder' : ''}`}
                                        aria-pressed={x.key === b?.key} aria-controls="rc-brother-detail" onClick={() => setOpen(x.key)}>
                                        <span>{seal(x.initials)}</span>
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </section>
                ))}
            </div>
            {b && (
                <article id="rc-brother-detail" className="ch-rc-brother" aria-live="polite">
                    <p className="ch-rc-brother-big" aria-hidden="true"><span>{seal(b.initials)}</span></p>
                    <div>
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
                    </div>
                </article>
            )}
            {succession?.length > 0 && (
                <details className="ch-rc-succession">
                    <summary>The succession, as the text tells it</summary>
                    <ol>{succession.map((s, i) => <li key={i}><Rich t={s} /></li>)}</ol>
                </details>
            )}
        </div>
    );
}

export default RosicrucianBrethren;

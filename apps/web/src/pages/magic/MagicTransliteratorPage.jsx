import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../../components/ThirdLampHeader';
import ThirdLampFooter from '../../components/ThirdLampFooter';
import { Sign } from './MagicGlyph';
import FitTitle from './FitTitle';
import { ENTRY_BY_SLUG, MAGIC_PATH, WING, canonicalUrl, entryPath } from './lib';
import { transliterate } from './transliterate';
import compare from '../../data/education/magic/compare.generated';
import '../../styles/magic.css';

// The transliterator, in the Reckoner's idiom: choose an alphabet, type, and
// see the text written in it, sign by sign, with what the tool did to get
// there printed underneath — every fold it applied, every character it passed
// over. Its schemes come from compare.generated.js, the same data the tables
// read. An alphabet keyed to the Hebrew letters takes Hebrew only: the site
// does not invent a spelling of English in Hebrew letters. An alphabet whose
// forms are still being traced is listed, and cannot yet write.

const SCHEMES = Object.values(compare.schemes);
const canWrite = (s) => s.keys.some((k) => k.sign);
// The example each kind of scheme opens with, so the page shows a worked
// result (and the folds it needed) before anything is typed.
const EXAMPLE = { latin: 'The Third Lamp', hebrew: 'אור' };
// How long typing must pause before the screen reader's line is updated.
const SETTLE_MS = 400;

function MagicTransliteratorPage() {
    const writable = SCHEMES.filter(canWrite);
    const [slug, setSlug] = useState(writable[0]?.slug || null);
    const [text, setText] = useState(() => EXAMPLE[writable[0]?.from] || '');
    const [copied, setCopied] = useState(false);
    const scheme = SCHEMES.find((s) => s.slug === slug) || null;
    const result = useMemo(() => (scheme && text.trim() ? transliterate(text, scheme) : null), [scheme, text]);
    const dir = scheme?.direction === 'rtl' ? 'rtl' : 'ltr';

    // What a screen reader hears: one plain line — the alphabet, the
    // transliteration, what was passed over — once typing settles. The written
    // signs, the breakdown and the report are for the eye and are not
    // announced on every keystroke. Text that writes nothing (Latin typed into
    // a Hebrew-keyed alphabet, punctuation alone) is announced too, with why.
    const passedOver = result?.ignored.length ? `. Passed over: ${result.ignored.join(' ')}` : '';
    const notHebrew = result?.nonHebrew ? `. ${scheme.short} is keyed to the Hebrew letters, so other letters are passed over` : '';
    const spoken = !result ? ''
        : result.words.length > 0 ? `${scheme.short}: ${result.plain}${passedOver}${notHebrew}`
            : `${scheme.short}: nothing written${passedOver}${notHebrew}`;
    const [status, setStatus] = useState(spoken);
    useEffect(() => {
        const t = setTimeout(() => setStatus(spoken), SETTLE_MS);
        return () => clearTimeout(t);
    }, [spoken]);

    // Choosing an alphabet keeps what was typed. The text is replaced by the
    // new alphabet's example only when the kind of input changes (Latin to
    // Hebrew), or when the box is empty or still holds the old example.
    const choose = (s) => {
        if (s.slug === slug) return;
        const prev = scheme ? EXAMPLE[scheme.from] : null;
        if (!scheme || s.from !== scheme.from || !text.trim() || text === prev) setText(EXAMPLE[s.from] || '');
        setSlug(s.slug);
    };

    const copy = async () => {
        try { await navigator.clipboard.writeText(result.text); setCopied(true); setTimeout(() => setCopied(false), 1600); }
        catch { setCopied(false); }
    };

    return (
        <div className="third-lamp-scope edu-page mg-page mg-translit-page">
            <Helmet>
                <title>The Transliterator — The Magical Scriptorium — The Third Lamp</title>
                <meta name="description" content="Write in a magical or secret alphabet: type, and see the text written sign by sign, with every convention the tool follows printed beneath it." />
                <link rel="canonical" href={canonicalUrl(`${MAGIC_PATH}/transliterate`)} />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero mg-hero">
                    <p className="kicker">
                        <Link to="/third-lamp/education">The Scriptorium</Link> · <Link to={MAGIC_PATH}>{WING.title}</Link>
                    </p>
                    <FitTitle title="The Transliterator" />
                    <p className="edu-hero-sub">Choose an alphabet and type. The text is written sign by sign, and the
                        conventions the tool follows — which letters it folds into which, what it passes over — are printed
                        beside it, because a transliteration is only as honest as the rules it states.</p>
                </section>

                <section className="edu-reckoner mg-translit" aria-labelledby="mg-translit-heading">
                    <header className="edu-section-head">
                        <p className="kicker">A Working Tool</p>
                        <h2 id="mg-translit-heading">Write it</h2>
                    </header>

                    <div className="edu-filter-row" role="group" aria-label="Alphabet to write in">
                        {SCHEMES.map((s) => {
                            const ok = canWrite(s);
                            return (
                                <button type="button" key={s.slug}
                                    className={`edu-filter${s.slug === slug ? ' is-active' : ''}${ok ? '' : ' is-pending'}`}
                                    aria-pressed={s.slug === slug}
                                    disabled={!ok}
                                    title={ok ? undefined : `${s.title}: the forms are still being traced`}
                                    onClick={() => choose(s)}>
                                    {s.short}{ok ? '' : ' · forms pending'}
                                </button>
                            );
                        })}
                    </div>

                    {scheme && (
                        <div className="mg-translit-body"
                            style={ENTRY_BY_SLUG[scheme.slug]?.signScale ? { '--mg-scale': ENTRY_BY_SLUG[scheme.slug].signScale } : undefined}>
                            <div className="edu-reckoner-body">
                                <input
                                    type="text"
                                    dir={scheme.from === 'hebrew' ? 'rtl' : 'ltr'}
                                    lang={scheme.from === 'hebrew' ? 'he' : 'en'}
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder={EXAMPLE[scheme.from]}
                                    aria-label={scheme.from === 'hebrew' ? `Hebrew text to write in ${scheme.short}` : `Text to write in ${scheme.short}`}
                                    aria-describedby="mg-conventions-heading"
                                    className="edu-reckoner-input"
                                    autoComplete="off"
                                    spellCheck={false}
                                />
                                <p className="mg-translit-hint">
                                    {scheme.from === 'hebrew'
                                        ? `${scheme.short} is keyed to the Hebrew letters: type or paste Hebrew. Pointing is passed over.`
                                        : `Type in the Latin alphabet; the folds the conventions list are applied as you type.`}
                                </p>
                            </div>

                            <p className="sr-only" role="status">{status}</p>
                            <div className="mg-translit-out">
                                {result && result.words.length > 0 && (
                                    <>
                                        <div className="mg-writ edu-glyph" dir={dir} role="img"
                                            aria-label={`${scheme.short}: ${result.plain}`}>
                                            {result.words.map((w, wi) => (
                                                <span className="mg-writ-word" key={wi}>
                                                    {w.map((p, pi) => p.letters.map((l, li) => <Sign key={`${pi}-${li}`} of={l.sign} />))}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="mg-writ-plain"><span>Transliteration</span> <em>{result.plain}</em></p>
                                        {/* only an alphabet set in a face can be copied as text; drawn signs have no characters */}
                                        {result.text.trim() && (
                                            <p className="mg-writ-text">
                                                <span>As text</span> <bdi className="edu-glyph" dir={dir}>{result.text}</bdi>
                                                <button type="button" className="mg-copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
                                            </p>
                                        )}
                                        <div className="edu-reckoner-breakdown mg-breakdown" dir={dir}>
                                            {result.words.flat().map((p, i) => (
                                                <span className="edu-reckoner-pair" key={i} title={p.note || undefined}>
                                                    <span className="edu-glyph">{p.letters.map((l, li) => <Sign key={li} of={l.sign} />)}</span>
                                                    <span className="edu-reckoner-v" dir="ltr" lang={scheme.from === 'hebrew' ? 'he' : undefined}>{p.src}{p.note ? ' ·' : ''}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {result && (
                                    <div className="mg-translit-report">
                                        {result.folds.length > 0 && (
                                            <p><span>Folded</span> {result.folds.map((f) => `${f.label}${f.count > 1 ? ` (${f.count}×)` : ''}`).join(' · ')}</p>
                                        )}
                                        {result.pointing > 0 && (
                                            <p><span>Pointing</span> {result.pointing} {result.pointing === 1 ? 'mark' : 'marks'} of vowels and accents removed; the signs write the letters only</p>
                                        )}
                                        {result.finals.length > 0 && (
                                            <p><span>Finals</span> {result.finals.map((f) => (f.own
                                                ? `${f.final} written with its own sign, a letter of its own in ${scheme.short}`
                                                : `${f.final} written with the sign for ${f.base} — ${scheme.short} has no final form`)).join(' · ')}</p>
                                        )}
                                        {result.ignored.length > 0 && <p className="edu-reckoner-ignored">Passed over: {result.ignored.join(' ')}</p>}
                                        {result.nonHebrew && (
                                            <p className="edu-reckoner-ignored">{scheme.short} is keyed to the Hebrew letters, so other letters are passed over. The site does not invent a Hebrew spelling for English.</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <aside className="mg-conventions" aria-labelledby="mg-conventions-heading">
                                <h3 id="mg-conventions-heading">The conventions for {scheme.short}</h3>
                                <p>{scheme.convention}</p>
                                {scheme.folds.length > 0 && (
                                    <table className="mg-fold-table">
                                        <caption>Folds, applied in this order</caption>
                                        <thead><tr><th scope="col">Typed</th><th scope="col">Written as</th><th scope="col">Why</th></tr></thead>
                                        <tbody>
                                            {scheme.folds.map((f) => (
                                                <tr key={f.from}>
                                                    <td className="mg-fold-from">{f.from}</td>
                                                    <td className="mg-fold-to">
                                                        <span className="edu-glyph">{Array.from(f.to).map((k, i) => <Sign key={i} of={scheme.keys.find((x) => x.key === k)?.sign} />)}</span>
                                                        <em>{f.to}</em>
                                                    </td>
                                                    <td>{f.note}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {scheme.unwritten && <p className="mg-conventions-note">{scheme.unwritten}</p>}
                                <p className="mg-key-label">The key</p>
                                <ul className="mg-key-grid" dir={dir}>
                                    {scheme.keys.map((k) => (
                                        <li key={k.key}>
                                            <span className="edu-glyph mg-key-sign"><Sign of={k.sign} /></span>
                                            <span className="mg-key-letter" dir="ltr" lang={scheme.from === 'hebrew' ? 'he' : undefined}>{k.key}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mg-conventions-note">
                                    The signs and their values are read from <Link to={entryPath(scheme.slug)}>{scheme.title}</Link>,
                                    the same data its page and the comparison tables show.
                                </p>
                            </aside>
                        </div>
                    )}
                </section>

                <nav className="edu-hall-nav" aria-label="The Magical Scriptorium">
                    <Link to={MAGIC_PATH}>← {WING.title}</Link>
                    <Link to={`${MAGIC_PATH}/compare`}>The alphabets compared</Link>
                    <Link to="/third-lamp/education">The Scriptorium</Link>
                </nav>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default MagicTransliteratorPage;

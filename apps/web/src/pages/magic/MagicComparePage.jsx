import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../../components/ThirdLampHeader';
import ThirdLampFooter from '../../components/ThirdLampFooter';
import { Sign } from './MagicGlyph';
import { MAGIC_PATH, WING, capitalise, entryPath, fitStyle, listOf, numberWord } from './lib';
import compare from '../../data/education/magic/compare.generated';
import '../../styles/magic.css';

// The alphabets side by side, in the kinship table's idiom. Every row comes
// from a hall's own letters and every cell from an alphabet's own data, by the
// letter it stands for (tools/build-magic.mjs), so the table cannot disagree
// with the pages it links to. An alphabet whose forms are still being traced
// keeps its column, held open by one band that says so, rather than a column
// of empty boxes.

const TABLES = {
    hebrew: {
        kicker: 'Keyed to the Hebrew Letters',
        title: 'The twenty-two and their shadows',
        intro: 'Agrippa’s three ring-letter alphabets, and the others keyed one for one to the Hebrew letters, beside the Hebrew hall’s letters and their Phoenician ancestor. Each row is a Hebrew letter with its number; the final forms follow the letters that have them.',
        keyLabel: 'Hebrew',
        hall: 'hebrew',
    },
    latin: {
        kicker: 'Keyed to the Latin Letters',
        title: 'The Latin alphabet in disguise',
        intro: 'The alphabets keyed to the Latin letters, beside the twenty-three classical letters of the Latin hall, which have no J, U or W.',
        keyLabel: 'Latin',
        hall: 'latin',
    },
};

function CompareTable({ table }) {
    const copy = TABLES[table.key];
    const hebrew = table.key === 'hebrew';
    const waiting = table.columns.filter((c) => c.mode === 'pending');
    const rows = table.rows;
    const all = waiting.length === table.columns.length;
    const subject = all
        ? ({ 1: 'The one column here', 2: 'Both columns here' }[waiting.length] || `All ${numberWord(waiting.length)} columns here`)
        : `${capitalise(numberWord(waiting.length))} of the ${numberWord(table.columns.length)} columns`;
    return (
        <section className="mg-compare" aria-labelledby={`mg-compare-${table.key}`}>
            <header className="edu-section-head">
                <p className="kicker">{copy.kicker}</p>
                <h2 id={`mg-compare-${table.key}`}>{copy.title}</h2>
                <p>{copy.intro}</p>
            </header>
            {waiting.length > 0 && (
                <p className="mg-compare-waiting">
                    {subject} — {listOf(waiting.map((c) => c.short))} — {waiting.length === 1 ? 'is' : 'are'} held open for forms still being traced from
                    the editions that first printed them. The rows are ready for them.
                </p>
            )}
            <div className="edu-cognates-scroll mg-compare-scroll" role="region" aria-label={`${copy.title}: comparison table`} tabIndex={0}>
                <table className="edu-cognates-table mg-compare-table">
                    <thead>
                        <tr>
                            <th scope="col" className="edu-cog-num">{hebrew ? 'Value' : '№'}</th>
                            {hebrew && <th scope="col" className="mg-cmp-anc">Ancestor</th>}
                            <th scope="col" className="mg-cmp-key">
                                <Link to={`/third-lamp/education/${copy.hall}`}>{copy.keyLabel}</Link>
                            </th>
                            {table.columns.map((c) => (
                                <th scope="col" key={c.slug} className={c.mode === 'pending' ? 'is-pending' : undefined}>
                                    <Link to={entryPath(c.slug)}>{c.short}</Link>
                                    {c.mode === 'pending' && <span className="mg-cmp-th-note">forms pending</span>}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, ri) => (
                            <tr key={`${r.key}-${ri}`} className={r.final ? 'mg-cmp-final' : undefined}>
                                <td className="edu-cog-num">{hebrew ? (r.final ? '' : r.value) : ri + 1}</td>
                                {hebrew && (
                                    <td className="mg-cmp-anc">
                                        <span className="mg-cmp-anc-in">
                                            {r.ph && <span className="edu-cog-ph edu-glyph" aria-hidden="true">{r.ph}</span>}
                                            <span className="edu-cog-name">{r.phName || ''}</span>
                                        </span>
                                    </td>
                                )}
                                <th scope="row" className="mg-cmp-key">
                                    <Link to={`/third-lamp/education/${copy.hall}#edu-letter-${r.hall}`}>
                                        <span className="edu-glyph mg-cmp-key-glyph" lang={hebrew ? 'he' : undefined}>{r.key}</span>
                                        <span className="mg-cmp-key-name">{r.name}</span>
                                    </Link>
                                </th>
                                {table.columns.map((c) => {
                                    if (c.mode === 'pending') {
                                        if (ri !== 0) return null;
                                        return (
                                            <td key={c.slug} rowSpan={rows.length} className="mg-cmp-pending">
                                                <span className="mg-cmp-band">{c.note || 'Forms being traced.'}</span>
                                            </td>
                                        );
                                    }
                                    const cell = r.cells[c.slug];
                                    return (
                                        <td key={c.slug} className="edu-cog-cell mg-cmp-cell">
                                            {cell && cell.sign
                                                ? <Link to={`${entryPath(c.slug)}#mg-letter-${cell.i}`} title={cell.name}><Sign of={cell.sign} label={`${c.short} ${cell.name}`} /></Link>
                                                : <span className="edu-cog-gap" aria-label="no sign">—</span>}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function MagicComparePage() {
    return (
        <div className="third-lamp-scope edu-page mg-page mg-compare-page">
            <Helmet>
                <title>The Alphabets Compared — The Magical Scriptorium — The Third Lamp</title>
                <meta name="description" content="The magical alphabets side by side: those keyed to the Hebrew letters beside the Hebrew letters and their Phoenician ancestor, and those keyed to the Latin letters beside the Latin alphabet, every cell drawn from the alphabet's own data." />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero mg-hero">
                    <p className="kicker">
                        <Link to="/third-lamp/education">The Scriptorium</Link> · <Link to={MAGIC_PATH}>{WING.title}</Link>
                    </p>
                    <h1 className="mg-fit" style={fitStyle('The Alphabets Compared')}>The Alphabets Compared</h1>
                    <p className="edu-hero-sub">Many of the secret alphabets are not new writing systems but new shapes for old
                        letters: each sign stands for a Hebrew or a Latin letter. Here they stand in rows with the letters they
                        disguise. Every cell is read from the alphabet’s own page and links to its letter there.</p>
                </section>

                {compare.tables.map((t) => <CompareTable key={t.key} table={t} />)}

                <p className="edu-cognates-footnote">
                    The tables are built from the data, not drawn by hand: a cell shows a sign only where the alphabet’s
                    own page has one for that letter, and a dash where the alphabet has no sign for it. The Phoenician
                    column is the ancestor of the Hebrew letters, taken from the Phoenician hall by position. Alphabets
                    keyed to neither — the runes, the signs of the art — have their own pages and are not forced into
                    these rows.
                </p>

                <nav className="edu-hall-nav" aria-label="The Magical Scriptorium">
                    <Link to={MAGIC_PATH}>← {WING.title}</Link>
                    <Link to={`${MAGIC_PATH}/transliterate`}>The transliterator</Link>
                    <Link to="/third-lamp/education">The Scriptorium</Link>
                </nav>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default MagicComparePage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cognates from '../data/education/cognates.generated';

// One Ancestor — the letter family laid side by side. Aleph, alpha, alaph,
// alif and azъ are a single Phoenician letter worn eight ways, and sixteen
// halls make this portal one of the few places the whole descent can be
// shown from live data: every cell is drawn from its hall's own alphabet by
// numeral value, so the table cannot disagree with the halls it links to.
//
// Two honesty notes carried in the copy below: the Greek-family columns are
// matched by numeral slot (Greek dropped san, shifting its numbers one place
// against the Semitic values from qōp onward — the gap in the ṣādē row IS
// that event); and where Coptic or Cyrillic filled a slot with a new letter,
// the cell shows the numeral's heir rather than a shape's descendant.

const SCRIPT_LABEL = {
    hebrew: 'Hebrew', aramaic: 'Aramaic', syriac: 'Syriac', arabic: 'Arabic',
    greek: 'Greek', coptic: 'Coptic', slavonic: 'Slavonic', latin: 'Latin',
};

function ScriptoriumCognates() {
    const [active, setActive] = useState(null);
    if (!cognates.rows.length) return null;

    return (
        <section className="edu-cognates" aria-labelledby="edu-cognates-heading">
            <header className="edu-section-head">
                <p className="kicker">One Ancestor</p>
                <h2 id="edu-cognates-heading">The Family of the Letters</h2>
                <p>Aleph, alpha, alaph, alif, azъ: one Phoenician letter worn eight
                    ways. Each row is a position in the old Semitic order, with the
                    numeral value that travelled with it; each cell is drawn live from
                    its hall. The gap in the ṣādē row is a real event — Greek dropped
                    that letter, and every Greek, Coptic and Slavonic numeral after it
                    sits one place off the Semitic count to this day.</p>
            </header>

            <div className="edu-cognates-scroll" role="region" aria-label="Comparative alphabet table" tabIndex={0}>
                <table className="edu-cognates-table">
                    <thead>
                        <tr>
                            <th scope="col" className="edu-cog-num">№</th>
                            <th scope="col" className="edu-cog-proto">Ancestor</th>
                            {cognates.scripts.map((s) => (
                                <th scope="col" key={s}>
                                    <Link to={`/third-lamp/education/${s === 'slavonic' ? 'slavonic' : s}`}>{SCRIPT_LABEL[s]}</Link>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cognates.rows.map((r) => (
                            <tr
                                key={r.v}
                                className={active === r.v ? 'is-active' : ''}
                                onClick={() => setActive(active === r.v ? null : r.v)}
                            >
                                <td className="edu-cog-num">{r.v}</td>
                                <td className="edu-cog-proto">
                                    <span className="edu-cog-name">{r.proto}</span>
                                    <span className="edu-cog-sense">{r.sense}</span>
                                </td>
                                {cognates.scripts.map((s) => {
                                    const c = r.cells[s];
                                    return (
                                        <td key={s} className={`edu-cog-cell${c?.archaic ? ' is-archaic' : ''}`}>
                                            {c
                                                ? <span className="edu-glyph" title={c.n}>{c.g.split(' ')[0]}</span>
                                                : <span className="edu-cog-gap" aria-label="no descendant">—</span>}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="edu-cognates-footnote">
                Cells marked in the dimmer gold are letters that survived only as
                numerals — Greek digamma and koppa among them. The Latin column is
                matched by descent rather than number, its values having been lost
                on the way through Etruria; and where Coptic or Slavonic filled a
                numeral slot with a letter of its own devising, the cell shows the
                number's heir rather than the shape's. The pictographic senses are
                the conventional identifications, several of them disputed.
            </p>
        </section>
    );
}

export default ScriptoriumCognates;

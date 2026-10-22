import React from 'react';
import { Link } from 'react-router-dom';
import { SECTIONS } from './lib';
import EMBLEMS from '../../data/emblems';
import '../../styles/powers-doors.css';

// The foot of every door page: a way back to The Powers and on to the other
// five doors, each wearing its emblem as a seal, so the six pages read as
// wings of one house. A door whose emblem is not yet drawn shows an empty
// seal-ring with the house diamond; the day its entry lands in data/emblems.js
// the seal appears here with no change to this file.

function DoorStrip({ current }) {
    return (
        <nav className="pw-doorstrip" aria-label="The doors of The Powers">
            <span className="pw-divider" aria-hidden="true" />
            <Link className="pw-doorstrip-home" to="/powers">The Powers</Link>
            <ul>
                {SECTIONS.map((s) => {
                    const em = EMBLEMS[`powers/${s.slug}`];
                    return (
                        <li key={s.slug}>
                            <Link to={`/powers/${s.slug}`} aria-current={s.slug === current ? 'page' : undefined}>
                                {em
                                    ? <img className="pw-doorstrip-seal" src={`/media/${em.image}`} alt="" width="52" height="52" loading="lazy" decoding="async" />
                                    : <span className="pw-doorstrip-mark" aria-hidden="true" />}
                                <span className="pw-doorstrip-kicker">{s.kicker}</span>
                                <span className="pw-doorstrip-title">{s.title}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default DoorStrip;

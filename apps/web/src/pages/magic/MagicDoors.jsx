import React from 'react';
import { Link } from 'react-router-dom';
import { Sign, Unstruck } from './MagicGlyph';
import { ALPHABETS, entryPath, STATUS_LABEL } from './lib';

// A door into one alphabet of the wing, in the halls' card idiom. A door whose
// forms are still being traced wears an empty seal-ring where a hall wears its
// letter, and says so on its face; it is a door all the same, because the
// history, the sources and the claims can be read now. `compact` is the
// smaller door both portals use for the alphabets still in preparation (its
// blurb kept as the link's title); the wing's own portal gives the full card,
// with its blurb, to the alphabets that can be read in full now. A compact
// door states its status to a screen reader only: the empty seal says it to
// the eye, and DoorLegend keys the seal once, under the row. `level` is the
// rank of the door's name in the page's outline: a door stands one level
// below the heading of the row it is in. A drawn door sign is an icon, fitted
// to its ink (MagicGlyph fit="ink"), so every door's sign fills its box alike
// and stands at its centre, whatever the alphabet's signScale.

export function statusLine(entry, stub) {
    if (entry.status === 'forms-pending') return STATUS_LABEL['forms-pending'];
    if (stub) return 'In preparation';
    return null;
}

export function MagicDoor({ entry, stub = false, compact = false, level = 3 }) {
    const status = statusLine(entry, stub);
    const Title = `h${Math.min(6, Math.max(2, level))}`;
    return (
        <Link className={`edu-hall-card mg-door${compact ? ' is-compact' : ''}${entry.status === 'forms-pending' ? ' is-pending' : ''}`}
            to={entryPath(entry.slug)} title={compact ? entry.blurb : undefined}>
            <span className="edu-hall-glyph mg-door-sign" aria-hidden="true">
                {entry.door ? <Sign of={entry.door} fit="ink" /> : <Unstruck />}
            </span>
            <Title className="mg-door-title">{compact ? entry.short : entry.title}</Title>
            {!compact && entry.otherNames && entry.otherNames[0] && <p className="edu-hall-sample mg-door-names">{entry.otherNames[0]}</p>}
            {!compact && <p className="edu-hall-blurb">{entry.blurb}</p>}
            {/* the Scriptorium portal's compact row keys the empty seal once, in a
                legend under the row; the status is still read out with the name */}
            {status && (compact
                ? <span className="sr-only">{` (${status.toLowerCase()})`}</span>
                : <span className="mg-door-status">{status}</span>)}
            {!compact && <span className="edu-hall-enter" aria-hidden="true">Enter →</span>}
        </Link>
    );
}

// The key to the empty seal, given once under a row of compact doors, and
// only while some alphabet wears one.
export function DoorLegend() {
    if (!ALPHABETS.some((a) => a.status === 'forms-pending')) return null;
    return (
        <p className="mg-door-legend">
            <Unstruck /> An empty seal marks an alphabet whose letterforms are still being traced from
            the editions that printed them. Its door opens all the same: the history and the sources can be read now.
        </p>
    );
}

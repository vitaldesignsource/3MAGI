import React, { useCallback, useEffect, useState } from 'react';

// "Hear it" — the pronunciation strip under a letter.
//
// Recovered from the compiled deploy build of source commit d79f864, which was
// never pushed: the recordings, the index and this component were shipped to
// the live site and none of them existed in source. The structure, the class
// names and the copy are the live build's own; only the JSX around them is
// rewritten.
//
// A hall may offer several systems for the same letter — Latin ecclesiastical
// against classical, Greek ancient against modern — and the point of the strip
// is that you can hear both and are told why they differ. The clips are
// synthesised from per-sign recipes rather than recorded from a speaker, and
// the caveat under the buttons says so rather than letting the reader assume.

let el = null;
const player = () => {
    if (!el && typeof Audio !== 'undefined') el = new Audio();
    return el;
};

export function useSay(hall) {
    const [data, setData] = useState(null);
    const [playing, setPlaying] = useState(null);

    useEffect(() => {
        let alive = true;
        setData(null);
        fetch('/audio/index.json')
            .then((r) => (r.ok ? r.json() : null))
            .then((j) => { if (alive) setData(j?.[hall] ?? null); })
            .catch(() => {});
        return () => { alive = false; };
    }, [hall]);

    const play = useCallback((system, idx) => {
        const letter = data?.systems?.[system]?.letters?.[idx];
        const a = player();
        if (!letter || !a) return;
        a.src = letter.src;
        a.currentTime = 0;
        const key = `${system}-${idx}`;
        a.play().then(() => setPlaying(key)).catch(() => setPlaying(null));
        a.onended = () => setPlaying((k) => (k === key ? null : k));
    }, [data]);

    const has = useCallback(
        (system, idx) => !!data?.systems?.[system]?.letters?.[idx],
        [data],
    );

    return { data, available: !!data, playing, play, has };
}

function ScriptoriumSay({ say, idx, letter, hall }) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState(null);

    useEffect(() => {
        if (!open || detail) return;
        let alive = true;
        fetch(`/audio/${hall}.detail.json`)
            .then((r) => (r.ok ? r.json() : null))
            .then((j) => { if (alive) setDetail(j); })
            .catch(() => {});
        return () => { alive = false; };
    }, [open, detail, hall]);

    const hallNote = detail?.note || say?.data?.note || '';
    if (!say?.available) return null;
    const systems = Object.entries(say.data.systems).filter(([, s]) => s.letters[idx]);
    if (!systems.length) return null;

    return (
        <div className="edu-say">
            <div className="edu-say-row">
                <span className="edu-say-label">Hear it</span>
                {systems.map(([key, s]) => (
                    <button type="button" key={key}
                        className={`edu-say-btn${say.playing === `${key}-${idx}` ? ' is-playing' : ''}`}
                        onClick={() => say.play(key, idx)}
                        aria-label={`Play ${letter} in ${s.label} pronunciation`}>
                        <span className="edu-say-mark" aria-hidden="true">▸</span>
                        {s.label}
                    </button>
                ))}
                <button type="button" className="edu-say-why" aria-expanded={open}
                    onClick={() => setOpen(!open)}>
                    <span className="edu-say-why-text">{open ? 'Less' : 'Why two?'}</span>
                </button>
            </div>

            {open && (
                <div className="edu-say-note">
                    {systems.map(([key, s]) => {
                        const here = s.letters[idx];
                        const d = detail?.systems?.[key];
                        const dl = d?.letters?.[idx] ?? {};
                        return (
                            <div className="edu-say-system" key={key}>
                                <p className="edu-say-sysline">
                                    <strong>{s.label}</strong>
                                    <span className="edu-say-ipa">{here.ipa}</span>
                                    {here.confidence && here.confidence !== 'high' && (
                                        <span className={`edu-say-conf is-${here.confidence}`}>
                                            {here.confidence}
                                        </span>
                                    )}
                                </p>
                                {dl.why && <p className="edu-say-sysnote">{dl.why}</p>}
                                {dl.compromise && (
                                    <p className="edu-say-compromise">
                                        <em>What it misses.</em> {dl.compromise}
                                    </p>
                                )}
                                {!dl.why && s.note && <p className="edu-say-sysnote">{s.note}</p>}
                            </div>
                        );
                    })}
                    {hallNote && <p className="edu-say-hallnote">{hallNote}</p>}
                    {/* The live build printed the generic caveat under the hall note
                        unconditionally, and for every hall the two say the same thing
                        in almost the same words. Kept, but only where the hall has
                        not already said it. */}
                    {!/not recorded/i.test(hallNote || '') && (
                        <p className="edu-say-caveat">Synthesised from a recipe, not recorded.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default ScriptoriumSay;

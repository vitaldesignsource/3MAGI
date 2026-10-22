import React, { useCallback, useMemo, useRef, useState } from 'react';

/**
 * The Warded Gate — human verification for the site's forms.
 *
 * A lock is drawn with a ward: the profile of the keyway, notched in a
 * particular pattern. Four keys are offered and exactly one has a bit that
 * fits. Choosing it turns the key, waves a wand, and scatters sparkles; only
 * then does the form allow submission.
 *
 * This is deliberately a *visual* task rather than an arithmetic one. It is
 * trivial for a reader and awkward for a naive script, and it belongs to the
 * magazine rather than looking bolted on. It is not a substitute for the
 * server-side honeypot and rate limiting, which remain the real defence — see
 * public/api/submit.php.
 *
 * Accessibility: the keys are real radio inputs in a labelled group, so the
 * whole thing is keyboard and screen-reader operable. Each key's pattern is
 * described in words, so the choice does not depend on seeing the drawing.
 */

const TOOTH_UNIT = 7;          // px height of one notch step
const TEETH = 3;               // notches per key
const HEIGHTS = [1, 2, 3];     // the three depths a notch can take

/** Describe a bit pattern for anyone not looking at the picture. */
const describe = (bits) =>
    bits.map((b) => (b === 1 ? 'short' : b === 2 ? 'medium' : 'long')).join(', ');

const patternKey = (bits) => bits.join('-');

/** A random bit pattern, and three others that are visibly different from it. */
function buildRound() {
    const randomBits = () => Array.from({ length: TEETH }, () => HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)]);

    const answer = randomBits();
    const seen = new Set([patternKey(answer)]);
    const decoys = [];
    let guard = 0;
    while (decoys.length < 3 && guard++ < 200) {
        const candidate = randomBits();
        const k = patternKey(candidate);
        if (seen.has(k)) continue;
        // Require at least two notches to differ, so no pair is a near-miss
        // that turns the puzzle into a pixel hunt.
        const differences = candidate.reduce((n, b, i) => n + (b === answer[i] ? 0 : 1), 0);
        if (differences < 2) continue;
        seen.add(k);
        decoys.push(candidate);
    }
    // Extremely unlikely, but never hand back a short round.
    while (decoys.length < 3) {
        const filler = randomBits();
        if (!seen.has(patternKey(filler))) { seen.add(patternKey(filler)); decoys.push(filler); }
    }

    const options = [answer, ...decoys]
        .map((bits) => ({ bits, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ bits }, i) => ({ bits, id: `key-${i}` }));

    return { answer, options };
}

/** The lock: an escutcheon whose keyway is notched to the answer's profile. */
function Lock({ bits, state }) {
    const slotX = 34;
    const slotW = TEETH * 18;
    return (
        <svg className={`gkp-lock gkp-lock--${state}`} viewBox="0 0 140 150" role="img"
             aria-label={`A lock whose keyway has three notches: ${describe(bits)}`}>
            <defs>
                <linearGradient id="gkp-brass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f4e3ba" />
                    <stop offset="45%" stopColor="#d1ad68" />
                    <stop offset="100%" stopColor="#8f6a2c" />
                </linearGradient>
            </defs>

            {/* plate */}
            <circle className="gkp-lock-plate" cx="70" cy="62" r="46" />
            <circle className="gkp-lock-ring" cx="70" cy="62" r="46" />
            <circle className="gkp-lock-ring gkp-lock-ring--inner" cx="70" cy="62" r="38" />

            {/* keyhole */}
            <circle className="gkp-lock-hole" cx="70" cy="50" r="10" />
            <path className="gkp-lock-hole" d="M64 56 L76 56 L73 76 L67 76 Z" />

            {/* the ward: the notch profile that a key must match */}
            <g className="gkp-ward">
                <rect className="gkp-ward-slot" x={slotX} y="104" width={slotW} height="8" rx="2" />
                {bits.map((h, i) => (
                    <rect
                        key={i}
                        className="gkp-ward-notch"
                        x={slotX + 4 + i * 18}
                        y={112}
                        width="10"
                        height={h * TOOTH_UNIT}
                        rx="1.5"
                    />
                ))}
            </g>
        </svg>
    );
}

/** A key. Its bit must match the lock's ward for the gate to open. */
function KeyShape({ bits, state }) {
    return (
        <svg className={`gkp-key gkp-key--${state}`} viewBox="0 0 132 56" aria-hidden="true">
            {/* bow */}
            <circle className="gkp-key-metal" cx="22" cy="28" r="15" />
            <circle className="gkp-key-void" cx="22" cy="28" r="7" />
            {/* shaft */}
            <rect className="gkp-key-metal" x="34" y="24" width="84" height="8" rx="3" />
            {/* bit */}
            {bits.map((h, i) => (
                <rect
                    key={i}
                    className="gkp-key-metal"
                    x={64 + i * 18}
                    y={32}
                    width="10"
                    height={h * TOOTH_UNIT}
                    rx="1.5"
                />
            ))}
        </svg>
    );
}

function Sparkles() {
    // Fixed offsets so the burst is composed rather than random noise.
    const motes = [
        { x: 12, y: 18, d: 0, s: 1 }, { x: 78, y: 8, d: 90, s: 0.7 },
        { x: 46, y: 40, d: 40, s: 1.2 }, { x: 96, y: 44, d: 150, s: 0.8 },
        { x: 28, y: 62, d: 210, s: 0.9 }, { x: 66, y: 66, d: 120, s: 1.1 },
        { x: 108, y: 24, d: 60, s: 0.6 }, { x: 4, y: 44, d: 180, s: 0.75 },
    ];
    return (
        <span className="gkp-sparkles" aria-hidden="true">
            {motes.map((m, i) => (
                <span
                    key={i}
                    className="gkp-mote"
                    style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${m.d}ms`, transform: `scale(${m.s})` }}
                />
            ))}
        </span>
    );
}

function Wand() {
    return (
        <span className="gkp-wand" aria-hidden="true">
            <svg viewBox="0 0 90 90">
                <rect className="gkp-wand-stick" x="16" y="60" width="56" height="6" rx="3" transform="rotate(-38 44 63)" />
                <circle className="gkp-wand-tip" cx="64" cy="26" r="5" />
            </svg>
        </span>
    );
}

export default function GateKeyPuzzle({ verified, onVerified, idPrefix = 'gate' }) {
    const [round, setRound] = useState(buildRound);
    const [chosen, setChosen] = useState(null);
    const [wrong, setWrong] = useState(null);
    const [casting, setCasting] = useState(false);
    const timers = useRef([]);

    const answerKey = useMemo(() => patternKey(round.answer), [round]);

    const reset = useCallback(() => {
        timers.current.forEach(clearTimeout);
        timers.current = [];
        setRound(buildRound());
        setChosen(null);
        setWrong(null);
        setCasting(false);
        onVerified(false);
    }, [onVerified]);

    const choose = useCallback((option) => {
        if (verified || casting) return;
        setChosen(option.id);
        if (patternKey(option.bits) === answerKey) {
            setWrong(null);
            setCasting(true);
            // Let the wand finish its pass before the panel settles.
            const t = setTimeout(() => { setCasting(false); onVerified(true); }, 1150);
            timers.current.push(t);
        } else {
            setWrong(option.id);
            onVerified(false);
            const t = setTimeout(() => setWrong(null), 700);
            timers.current.push(t);
        }
    }, [verified, casting, answerKey, onVerified]);

    if (verified) {
        return (
            <div className="gkp gkp--open" data-testid="gate-puzzle">
                <p className="gkp-solved">
                    <span className="gkp-solved-mark" aria-hidden="true">✦</span>
                    The gate is open. You may send your message.
                </p>
                <button type="button" className="gkp-reset" onClick={reset}>Lock it again</button>
            </div>
        );
    }

    return (
        <div className={`gkp${casting ? ' gkp--casting' : ''}`} data-testid="gate-puzzle">
            <div className="gkp-head">
                <p className="gkp-eyebrow">The Warded Gate</p>
                <p className="gkp-instruction">
                    Choose the key whose teeth match the ward below the lock.
                </p>
            </div>

            <div className="gkp-stage">
                <div className="gkp-lock-wrap">
                    <Lock bits={round.answer} state={casting ? 'turning' : 'closed'} />
                    {casting && <Wand />}
                    {casting && <Sparkles />}
                </div>

                {/* A div rather than a fieldset: the form stylesheets target
                    `fieldset` directly, and the UA's min-inline-size:min-content
                    on fieldsets breaks grid sizing. role=radiogroup keeps it
                    equivalent for assistive tech. */}
                <div
                    className="gkp-keys"
                    role="radiogroup"
                    aria-label={`Choose the key whose three notches are ${describe(round.answer)}`}
                >
                    {round.options.map((option) => {
                        const isChosen = chosen === option.id;
                        const isWrong = wrong === option.id;
                        const state = isWrong ? 'wrong' : (isChosen && casting ? 'turning' : 'idle');
                        return (
                            <label
                                key={option.id}
                                className={`gkp-key-option${isWrong ? ' is-wrong' : ''}${isChosen && casting ? ' is-turning' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name={`${idPrefix}-key`}
                                    className="sr-only"
                                    checked={isChosen}
                                    onChange={() => choose(option)}
                                />
                                <KeyShape bits={option.bits} state={state} />
                                <span className="sr-only">Key with {describe(option.bits)} notches</span>
                            </label>
                        );
                    })}
                </div>
            </div>

            <p className="gkp-status" role="status">
                {wrong
                    ? 'That key does not fit. Look again at the ward.'
                    : casting
                        ? 'The key turns…'
                        : ' '}
            </p>
        </div>
    );
}

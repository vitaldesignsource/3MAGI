import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Recitation — a short self-test at the foot of each language hall. Ten
// letters shown glyph-first; the student names each from four choices. No
// telemetry, no persistence: a slate, not a ledger.

const ROUNDS = 10;
const CHOICES = 4;
// In "find the letters" every option is named by its place. A drawn sign has
// no name of its own, and a sign set as text would be read out by its Unicode
// name ("Pisces", "runic letter ansuz"), which gives the answer away.
const PLACES = ['First sign', 'Second sign', 'Third sign', 'Fourth sign'];

const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

// Two directions: shown the glyph, name it — or shown the name, find the
// glyph among four. The second is the harder skill and the one reading
// actually requires.
function buildQuiz(letters, mode) {
    const pool = letters.filter((l) => !l.archaic);
    const rounds = shuffle(pool).slice(0, Math.min(ROUNDS, pool.length));
    return rounds.map((l) => {
        const wrong = shuffle(pool.filter((o) => o.name !== l.name)).slice(0, CHOICES - 1);
        const opts = shuffle([l, ...wrong]);
        return mode === 'find'
            ? { letter: l, options: opts.map((o) => ({ key: o.name, show: o.glyph, glyph: true })) }
            : { letter: l, options: opts.map((o) => ({ key: o.name, show: o.name, glyph: false })) };
    });
}

// The house's verdicts, sternest first.
const VERDICTS = [
    [1.0, 'Word-perfect. The hall has nothing more to teach you here — go on to the readings.'],
    [0.8, 'A strong recitation. A few letters still hold out against you.'],
    [0.5, 'The shapes are becoming familiar. Return tomorrow; memory is a habit.'],
    [0.0, 'Every scribe began exactly here. Walk the alphabet once more, then try again.'],
];

function ScriptoriumDrill({ letters, langTitle, rtl }) {
    const [quiz, setQuiz] = useState(null);
    const [mode, setMode] = useState('name');
    const [round, setRound] = useState(0);
    const [picked, setPicked] = useState(null);
    const [score, setScore] = useState(0);
    // Keyboard focus follows the drill: onto the first option when a round
    // opens, onto "Next letter" once one is picked, onto the score at the end.
    const firstOption = useRef(null);
    const nextButton = useRef(null);
    const scoreLine = useRef(null);
    const moved = useRef(false);

    const start = useCallback((m) => {
        moved.current = true;
        setMode(m);
        setQuiz(buildQuiz(letters, m));
        setRound(0);
        setPicked(null);
        setScore(0);
    }, [letters]);

    const current = quiz ? quiz[round] : null;
    const done = quiz && round >= quiz.length;

    const verdict = useMemo(() => {
        if (!done) return null;
        const ratio = score / quiz.length;
        return VERDICTS.find(([min]) => ratio >= min)[1];
    }, [done, score, quiz]);

    const pick = (name) => {
        if (picked != null) return;
        moved.current = true;
        setPicked(name);
        if (name === current.letter.name) setScore((s) => s + 1);
    };

    const next = () => {
        moved.current = true;
        setPicked(null);
        setRound((r) => r + 1);
    };

    // The options are aria-disabled once one is picked, not disabled: a
    // disabled button drops the keyboard focus to the page, and this way it
    // stays on the option until "Next letter" takes it.
    useEffect(() => {
        if (!moved.current) return;
        moved.current = false;
        if (done) scoreLine.current?.focus();
        else if (picked != null) nextButton.current?.focus();
        else firstOption.current?.focus();
    }, [quiz, round, picked, done]);

    if (letters.length < CHOICES + 1) return null;

    return (
        <section className="edu-drill" aria-labelledby="edu-drill-heading">
            <header className="edu-section-head">
                <p className="kicker">Recitation</p>
                <h2 id="edu-drill-heading">Say the letters</h2>
                <p>Ten glyphs, four names apiece. Nothing is recorded — this slate wipes itself.</p>
            </header>

            {!quiz && (
                <div className="edu-drill-stage">
                    <div className="edu-drill-modes">
                        <button type="button" className="edu-drill-start" onClick={() => start('name')}>
                            Name the letters
                        </button>
                        <button type="button" className="edu-drill-start" onClick={() => start('find')}>
                            Find the letters
                        </button>
                    </div>
                    <p className="edu-drill-modes-note">Shown the glyph, give its name — or shown the name, pick the glyph. The second is the skill that reading requires.</p>
                </div>
            )}

            {current && !done && (
                <div className="edu-drill-stage">
                    <p className="edu-drill-progress">
                        {round + 1} of {quiz.length}{score > 0 ? ` · ${score} named` : ''}
                    </p>
                    {mode === 'find' ? (
                        <div className="edu-drill-prompt-name">{current.letter.name}</div>
                    ) : (
                        // the glyph to name is shown, not spoken: read aloud, a sign
                        // set as text would announce its own name
                        <div className="edu-drill-glyph edu-glyph" dir={rtl ? 'rtl' : undefined}
                            role="img" aria-label={`Question ${round + 1} of ${quiz.length}`}>
                            {current.letter.glyph}
                        </div>
                    )}
                    <div className="edu-drill-options" role="group" aria-label="Which letter is this?">
                        {current.options.map((o, oi) => {
                            const isRight = picked != null && o.key === current.letter.name;
                            const isWrongPick = picked === o.key && o.key !== current.letter.name;
                            return (
                                <button
                                    type="button"
                                    key={o.key}
                                    ref={oi === 0 ? firstOption : undefined}
                                    className={`edu-drill-option${o.glyph ? ' edu-drill-option-glyph edu-glyph' : ''}${isRight ? ' is-right' : ''}${isWrongPick ? ' is-wrong' : ''}`}
                                    dir={o.glyph && rtl ? 'rtl' : undefined}
                                    aria-label={mode === 'find' ? PLACES[oi] : undefined}
                                    onClick={() => pick(o.key)}
                                    aria-disabled={picked != null}
                                >
                                    {o.show}
                                </button>
                            );
                        })}
                    </div>
                    {picked != null && (
                        <div className="edu-drill-after" aria-live="polite">
                            <p className="edu-drill-answer">
                                {picked === current.letter.name ? 'Named.' : `It is ${current.letter.name}.`}
                                {' '}<em>{current.letter.translit}</em>
                                {current.letter.value != null ? ` · ${current.letter.value}` : ''}
                            </p>
                            <button type="button" className="edu-drill-next" onClick={next} ref={nextButton}>
                                {round + 1 === quiz.length ? 'Finish' : 'Next letter'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {done && (
                <div className="edu-drill-stage" aria-live="polite">
                    <p className="edu-drill-score" tabIndex={-1} ref={scoreLine}>{score} / {quiz.length}</p>
                    <p className="edu-drill-verdict">{verdict}</p>
                    <div className="edu-drill-modes">
                        <button type="button" className="edu-drill-start" onClick={() => start(mode)}>
                            Recite {langTitle} again
                        </button>
                        <button type="button" className="edu-drill-start" onClick={() => start(mode === 'name' ? 'find' : 'name')}>
                            {mode === 'name' ? 'Try finding the letters' : 'Try naming them'}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ScriptoriumDrill;

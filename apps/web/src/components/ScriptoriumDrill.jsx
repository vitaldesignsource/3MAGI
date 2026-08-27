import React, { useCallback, useMemo, useState } from 'react';

// Recitation — a short self-test at the foot of each language hall. Ten
// letters shown glyph-first; the student names each from four choices. No
// telemetry, no persistence: a slate, not a ledger.

const ROUNDS = 10;
const CHOICES = 4;

const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

function buildQuiz(letters) {
    const pool = letters.filter((l) => !l.archaic);
    const rounds = shuffle(pool).slice(0, Math.min(ROUNDS, pool.length));
    return rounds.map((l) => {
        const wrong = shuffle(pool.filter((o) => o.name !== l.name)).slice(0, CHOICES - 1);
        return { letter: l, options: shuffle([l, ...wrong]).map((o) => o.name) };
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
    const [round, setRound] = useState(0);
    const [picked, setPicked] = useState(null);
    const [score, setScore] = useState(0);

    const start = useCallback(() => {
        setQuiz(buildQuiz(letters));
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
        setPicked(name);
        if (name === current.letter.name) setScore((s) => s + 1);
    };

    const next = () => {
        setPicked(null);
        setRound((r) => r + 1);
    };

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
                    <button type="button" className="edu-drill-start" onClick={start}>
                        Begin the recitation
                    </button>
                </div>
            )}

            {current && !done && (
                <div className="edu-drill-stage">
                    <p className="edu-drill-progress">
                        {round + 1} of {quiz.length}{score > 0 ? ` · ${score} named` : ''}
                    </p>
                    <div className="edu-drill-glyph edu-glyph" dir={rtl ? 'rtl' : undefined} aria-label={`Letter ${round + 1}`}>
                        {current.letter.glyph}
                    </div>
                    <div className="edu-drill-options" role="group" aria-label="Which letter is this?">
                        {current.options.map((name) => {
                            const isRight = picked != null && name === current.letter.name;
                            const isWrongPick = picked === name && name !== current.letter.name;
                            return (
                                <button
                                    type="button"
                                    key={name}
                                    className={`edu-drill-option${isRight ? ' is-right' : ''}${isWrongPick ? ' is-wrong' : ''}`}
                                    onClick={() => pick(name)}
                                    disabled={picked != null}
                                >
                                    {name}
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
                            <button type="button" className="edu-drill-next" onClick={next}>
                                {round + 1 === quiz.length ? 'Finish' : 'Next letter'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {done && (
                <div className="edu-drill-stage" aria-live="polite">
                    <p className="edu-drill-score">{score} / {quiz.length}</p>
                    <p className="edu-drill-verdict">{verdict}</p>
                    <button type="button" className="edu-drill-start" onClick={start}>
                        Recite {langTitle} again
                    </button>
                </div>
            )}
        </section>
    );
}

export default ScriptoriumDrill;

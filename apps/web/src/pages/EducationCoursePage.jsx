import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
// Each course is its own chunk, fetched when the course is opened.
const COURSE_LOADERS = import.meta.glob('../data/education/courses/*.js');
const loadCourse = async (lang) => {
    const mod = COURSE_LOADERS[`../data/education/courses/${lang}.js`];
    return mod ? (await mod()).default : null;
};
const TITLES = { latin: 'Latin', greek: 'Greek', hebrew: 'Hebrew', egyptian: 'Egyptian', sanskrit: 'Sanskrit' };

// Progress lives in the reader's browser and nowhere else.
const storageKey = (lang) => `tl-scriptorium-course-${lang}`;
const loadDone = (lang) => {
    try {
        const raw = localStorage.getItem(storageKey(lang));
        const arr = raw ? JSON.parse(raw) : [];
        return Array.isArray(arr) ? new Set(arr) : new Set();
    } catch { return new Set(); }
};
const saveDone = (lang, set) => {
    try { localStorage.setItem(storageKey(lang), JSON.stringify([...set])); } catch { /* private mode */ }
};

function Exercise({ ex, index }) {
    const [open, setOpen] = useState(false);
    return (
        <li className="edu-exercise">
            <p className="edu-exercise-prompt"><span className="edu-exercise-n">{index + 1}.</span> {ex.prompt}</p>
            {ex.hint && <p className="edu-exercise-hint">Hint: {ex.hint}</p>}
            <button type="button" className="edu-exercise-reveal" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                {open ? 'Hide the answer' : 'Show the answer'}
            </button>
            {open && <p className="edu-exercise-answer">{ex.answer}</p>}
        </li>
    );
}

function LessonView({ lang, course, lesson, done, onToggleDone, rtl }) {
    const navigate = useNavigate();
    const isDone = done.has(lesson.number);
    const prev = course.lessons.find((l) => l.number === lesson.number - 1);
    const next = course.lessons.find((l) => l.number === lesson.number + 1);

    return (
        <article className="edu-lesson">
            <header className="edu-lesson-head">
                <p className="kicker">Lesson {lesson.number} of {course.lessons.length}</p>
                <h2>{lesson.title}</h2>
                <p className="edu-lesson-aim">{lesson.aim}</p>
            </header>

            {lesson.sections.map((sec) => (
                <section className="edu-lesson-section" key={sec.heading}>
                    <h3>{sec.heading}</h3>
                    {sec.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    {sec.examples.length > 0 && (
                        <div className="edu-reading-words edu-lesson-examples" dir={rtl ? 'rtl' : undefined}>
                            {sec.examples.map((w, i) => (
                                <span className="edu-reading-word" key={i}>
                                    <span className="edu-reading-native edu-glyph">{w.native}</span>
                                    <span className="edu-reading-translit" dir="ltr">{w.translit}</span>
                                    <span className="edu-reading-gloss" dir="ltr">{w.gloss}</span>
                                    {w.note && <span className="edu-example-note" dir="ltr">{w.note}</span>}
                                </span>
                            ))}
                        </div>
                    )}
                </section>
            ))}

            {lesson.vocabulary.length > 0 && (
                <section className="edu-lesson-section">
                    <h3>Words to keep</h3>
                    <ul className="edu-vocab-list" dir={rtl ? 'rtl' : undefined}>
                        {lesson.vocabulary.map((v, i) => (
                            <li key={i}>
                                <span className="edu-vocab-native edu-glyph">{v.native}</span>
                                <span className="edu-vocab-translit" dir="ltr">{v.translit}</span>
                                <span className="edu-vocab-gloss" dir="ltr">{v.gloss}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <section className="edu-lesson-section">
                <h3>Exercises</h3>
                <ol className="edu-exercise-list">
                    {lesson.exercises.map((ex, i) => <Exercise ex={ex} index={i} key={i} />)}
                </ol>
            </section>

            <div className="edu-lesson-foot">
                <button
                    type="button"
                    className={`edu-lesson-done${isDone ? ' is-done' : ''}`}
                    onClick={() => onToggleDone(lesson.number)}
                >
                    {isDone ? '✓ Lesson complete' : 'Mark lesson complete'}
                </button>
                <div className="edu-lesson-nav">
                    {prev
                        ? <Link to={`/third-lamp/education/${lang}/course/${prev.number}`}>← Lesson {prev.number}</Link>
                        : <Link to={`/third-lamp/education/${lang}/course`}>← Syllabus</Link>}
                    {next
                        ? <Link to={`/third-lamp/education/${lang}/course/${next.number}`}>Lesson {next.number} →</Link>
                        : <Link to={`/third-lamp/education/${lang}/course`}>Back to the syllabus →</Link>}
                </div>
            </div>

            {!next && isDone && (
                <p className="edu-course-finis">
                    The course is read. The hall itself — its readings, names, and lexicon —
                    is now yours to walk without a guide.
                </p>
            )}
        </article>
    );
}

function EducationCoursePage() {
    const { lang, lesson: lessonParam } = useParams();
    const [course, setCourse] = useState(null);
    const [state, setState] = useState('loading');
    const rtl = lang === 'hebrew';

    useEffect(() => {
        let alive = true;
        setState('loading');
        setCourse(null);
        loadCourse(lang).then((c) => {
            if (!alive) return;
            setCourse(c && c.lessons.length ? c : null);
            setState('done');
        });
        return () => { alive = false; };
    }, [lang]);

    const [done, setDone] = useState(() => loadDone(lang));
    useEffect(() => { setDone(loadDone(lang)); }, [lang]);

    const onToggleDone = useCallback((n) => {
        setDone((prevDone) => {
            const nextSet = new Set(prevDone);
            if (nextSet.has(n)) nextSet.delete(n); else nextSet.add(n);
            saveDone(lang, nextSet);
            return nextSet;
        });
    }, [lang]);

    const lessonNumber = lessonParam ? parseInt(lessonParam, 10) : null;
    const lesson = useMemo(
        () => (course && lessonNumber ? course.lessons.find((l) => l.number === lessonNumber) : null),
        [course, lessonNumber],
    );

    if (state === 'loading') return <div className="third-lamp-scope edu-page" aria-busy="true" style={{ minHeight: '100vh' }} />;
    if (!course) return <Navigate to="/third-lamp/education" replace />;
    if (lessonParam && !lesson) return <Navigate to={`/third-lamp/education/${lang}/course`} replace />;

    const firstUnread = course.lessons.find((l) => !done.has(l.number));

    return (
        <div className="third-lamp-scope edu-page edu-course-page">
            <Helmet>
                <title>{`${course.title} — The Scriptorium — The Third Lamp`}</title>
                <meta name="description" content={`${course.title}: ${course.tagline} An eight-lesson ${TITLES[lang]} course in The Third Lamp's Scriptorium.`} />
            </Helmet>
            <ThirdLampHeader />

            <main className="edu-main">
                <section className="edu-hero edu-course-hero">
                    <p className="kicker">
                        <Link to="/third-lamp/education">The Scriptorium</Link> · <Link to={`/third-lamp/education/${lang}`}>{TITLES[lang]} Hall</Link> · Course
                    </p>
                    <h1>{course.title}</h1>
                    <p className="edu-course-tagline">{course.tagline}</p>
                </section>

                {!lesson ? (
                    <section className="edu-syllabus" aria-label="Syllabus">
                        <p className="edu-hero-sub">{course.overview}</p>
                        <div className="edu-syllabus-actions">
                            <Link className="edu-course-begin" to={`/third-lamp/education/${lang}/course/${(firstUnread || course.lessons[0]).number}`}>
                                {done.size === 0 ? 'Begin with Lesson 1' : firstUnread ? `Continue — Lesson ${firstUnread.number}` : 'Read it again'}
                            </Link>
                            <span className="edu-syllabus-progress">{done.size} of {course.lessons.length} lessons complete</span>
                        </div>
                        <ol className="edu-syllabus-list">
                            {course.lessons.map((l) => (
                                <li key={l.number}>
                                    <Link className={`edu-syllabus-row${done.has(l.number) ? ' is-done' : ''}`} to={`/third-lamp/education/${lang}/course/${l.number}`}>
                                        <span className="edu-syllabus-n">{done.has(l.number) ? '✓' : l.number}</span>
                                        <span className="edu-syllabus-body">
                                            <span className="edu-syllabus-title">{l.title}</span>
                                            <span className="edu-syllabus-aim">{l.aim}</span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </section>
                ) : (
                    <LessonView lang={lang} course={course} lesson={lesson} done={done} onToggleDone={onToggleDone} rtl={rtl} />
                )}
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default EducationCoursePage;

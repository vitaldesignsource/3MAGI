import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import ShareButtons from '../components/ShareButtons';
import AlchemicalPendulum from '../components/AlchemicalPendulum';
import { articles, getArticleBySlug, traditionMeta, disciplineMeta, getCurrentIssueArticles, currentIssueSlugs } from '../data/articles';
import { loadArticleContent } from '../data/articleContent';

/** Issue sidebar — next article link + full issue list */
function IssueSidebar({ currentSlug }) {
    const issueArticles = getCurrentIssueArticles();
    const currentIdx = currentIssueSlugs.indexOf(currentSlug);
    const nextSlug = currentIdx >= 0 && currentIdx < currentIssueSlugs.length - 1
        ? currentIssueSlugs[currentIdx + 1] : null;
    const nextArticle = nextSlug ? issueArticles.find((a) => a.slug === nextSlug) : null;
    return (
        <div className="article-toc-issue">
            <p className="article-toc-issue-label">Volume I &middot; Issue I</p>
            {nextArticle && (
                <Link
                    to={`/articles/${nextArticle.slug}`}
                    className="article-toc-next"
                >
                    <span className="article-toc-next-eyebrow">Next in Issue</span>
                    <span className="article-toc-next-title">{nextArticle.title}</span>
                    <span className="article-toc-next-arrow" aria-hidden="true">&#8594;</span>
                </Link>
            )}
            <ul className="article-toc-issue-list">
                {issueArticles.map((a, i) => (
                    <li key={a.slug} className={a.slug === currentSlug ? 'is-current' : ''}>
                        <Link to={`/articles/${a.slug}`}>
                            <span className="article-toc-issue-num">{String(i + 1).padStart(2, '0')}</span>
                            {a.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** Four-quadrant consciousness diagram for "Ways of Being" */
function QuadrantDiagram() {
    return (
        <figure className="wob-diagram" aria-label="Four quadrants of consciousness diagram">
            <p className="wob-diagram-label wob-diagram-label-top">Temporal projection</p>

            <div className="wob-diagram-grid">
                {/* Y axis */}
                <div className="wob-axis-y" aria-hidden="true">
                    <span className="wob-axis-arrow wob-axis-arrow-top">&#8593;</span>
                    <span className="wob-axis-arrow wob-axis-arrow-bottom">&#8595;</span>
                </div>
                {/* X axis */}
                <div className="wob-axis-x" aria-hidden="true">
                    <span className="wob-axis-arrow wob-axis-arrow-left">&#8592;</span>
                    <span className="wob-axis-arrow wob-axis-arrow-right">&#8594;</span>
                </div>

                {/* Q2 — top-left */}
                <div className="wob-quadrant wob-q2">
                    <span className="wob-q-num">Q2</span>
                    <strong>Fragmented reactivity</strong>
                    <ul>
                        <li>Reactive to stimuli</li>
                        <li>Scattered across past and future</li>
                        <li>Rumination, anxiety, distraction</li>
                        <li>No grounded presence</li>
                    </ul>
                </div>

                {/* Q1 — top-right */}
                <div className="wob-quadrant wob-q1">
                    <span className="wob-q-num">Q1</span>
                    <strong>Abstract reasoning</strong>
                    <ul>
                        <li>Deliberative, top-down</li>
                        <li>Engaged with past and future</li>
                        <li>Planning, philosophy, culture</li>
                        <li>Expansion of consciousness</li>
                    </ul>
                </div>

                {/* Q3 — bottom-left */}
                <div className="wob-quadrant wob-q3">
                    <span className="wob-q-num">Q3</span>
                    <strong>Embodied reactivity</strong>
                    <ul>
                        <li>Fully present-focused</li>
                        <li>Driven by immediate environment</li>
                        <li>Habitual, in rhythm with nature</li>
                        <li>Minimal abstraction</li>
                    </ul>
                </div>

                {/* Q4 — bottom-right */}
                <div className="wob-quadrant wob-q4">
                    <span className="wob-q-num">Q4</span>
                    <strong>Integrated presence</strong>
                    <ul>
                        <li>Deliberative, top-down guidance</li>
                        <li>Rooted in present moment</li>
                        <li>Clear, purposeful action</li>
                        <li>Reason and presence integrated</li>
                    </ul>
                </div>
            </div>

            <p className="wob-diagram-label wob-diagram-label-bottom">Present moment</p>
            <div className="wob-diagram-axis-labels">
                <span>Reactive (bottom-up)</span>
                <span>Deliberative (top-down)</span>
            </div>

            {/* Trajectory */}
            <div className="wob-trajectory">
                <p className="wob-trajectory-title">The trajectory of human consciousness</p>
                <div className="wob-trajectory-flow">
                    <div className="wob-tnode wob-tnode-q3">
                        <strong>Q3</strong>
                        <span>Early human</span>
                    </div>
                    <div className="wob-tarrow" aria-hidden="true">&#8594;</div>
                    <div className="wob-tnode wob-tnode-q1">
                        <strong>Q1</strong>
                        <span>Civilizational rise</span>
                    </div>
                    <div className="wob-tarrow" aria-hidden="true">&#8594;</div>
                    <div className="wob-tnode wob-tnode-q2">
                        <strong>Q2</strong>
                        <span>Modern dysfunction</span>
                    </div>
                    <div className="wob-tarrow" aria-hidden="true">&#8594;</div>
                    <div className="wob-tnode wob-tnode-q4">
                        <strong>Q4</strong>
                        <span>Ideal state</span>
                    </div>
                </div>
                <div className="wob-trajectory-labels">
                    <span>1 &middot; Leisure and control</span>
                    <span>2 &middot; Loss of presence,<br />return to reactivity</span>
                    <span>3 &middot; Restore presence,<br />retain reasoning</span>
                </div>
            </div>
        </figure>
    );
}

/** Render a paragraph with **bold** and *italic* markdown-style spans. */
function renderInline(text) {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
    });
}

function normalizeSections(article) {
    if (article.sections && article.sections.length) return article.sections;
    // Legacy fallback for articles still using flat `body` arrays.
    return (article.body || []).map((paragraph, i) => ({
        id: `section-${i}`,
        title: i === 0 ? null : `Section ${i + 1}`,
        lede: i === 0 ? paragraph : null,
        paragraphs: i === 0 ? [] : [paragraph],
    }));
}

function ArticlePage() {
    const { slug } = useParams();
    // Card/metadata fields come from the index synchronously; the essay text
    // (body, sections, marginalia, figures) is a separate per-essay chunk that
    // loads on demand. `article` is the merge, so the rest of the component
    // reads it exactly as it always did.
    const meta = getArticleBySlug(slug);
    // Free essays resolve from the bundle; gated ones are fetched from
    // api/essay.php, which answers with the text or with a reason it won't.
    // The gate is the server's answer — the client no longer decides.
    const [loaded, setLoaded] = useState(null);
    useEffect(() => {
        let alive = true;
        setLoaded(null);
        if (!meta) return undefined;
        loadArticleContent(slug).then((r) => { if (alive) setLoaded(r); });
        return () => { alive = false; };
    }, [slug, meta]);
    const content = loaded ? loaded.content : null;
    const article = useMemo(() => (meta ? { ...meta, ...(content || {}) } : null), [meta, content]);
    const contentReady = loaded !== null;
    const accessStatus = loaded ? loaded.status : null;
    const [progress, setProgress] = useState(0);
    const [activeId, setActiveId] = useState(null);
    const sectionRefs = useRef({});
    const sections = useMemo(() => (article ? normalizeSections(article) : []), [article]);

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrollable = h.scrollHeight - h.clientHeight;
            setProgress(scrollable > 0 ? Math.min(100, (h.scrollTop / scrollable) * 100) : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, [slug]);

    useEffect(() => {
        if (!sections.length) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        );
        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [sections]);

    if (!article) {
        return (
            <>
                <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main className="article-not-found">
                    <p className="eyebrow">Not found</p>
                    <h1>This essay has not yet been catalogued.</h1>
                    <p>The page you followed may have moved. Return to the living archive to keep reading.</p>
                    <Link className="tl-button" to="/third-lamp/archive">Back to the Archive</Link>
                </main>
                <ThirdLampFooter />
                </div>
            </>
        );
    }

    // ── Password gate ──────────────────────────────────────────────────────
    // ── Coming Soon gate ───────────────────────────────────────────────────
    if (accessStatus === 'preview_required') {
        return (
            <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
                    <div style={{ maxWidth: '30rem', width: '100%', border: '1px solid rgba(179,139,70,0.45)', background: 'rgba(14,17,17,0.95)', padding: '3rem 2.5rem', textAlign: 'center' }}>
                        <div style={{ width: '3rem', height: '3rem', margin: '0 auto 1.4rem', border: '1px solid var(--gold)', borderRadius: '999px', display: 'grid', placeItems: 'center', color: 'var(--gold)', fontSize: '1.1rem' }}>✦</div>
                        <p className="kicker" style={{ marginBottom: '0.5rem', letterSpacing: '0.18em' }}>In Review</p>
                        <h1 style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, fontSize: 'clamp(1.15rem, 3vw, 1.6rem)', color: 'var(--bone)', margin: '0 0 0.8rem', lineHeight: 1.15 }}>{article.title}</h1>
                        <p style={{ color: 'var(--muted)', font: '0.92rem/1.7 Georgia, serif', margin: '0 0 0.4rem' }}>This essay is currently under editorial review.</p>
                        <p style={{ color: 'rgba(179,139,70,0.7)', font: 'italic 0.85rem/1.6 Georgia, serif', margin: '0 0 2.2rem' }}>Coming Soon</p>
                        <div style={{ borderTop: '1px solid rgba(179,139,70,0.22)', paddingTop: '1.6rem' }}>
                            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.78rem', lineHeight: 1.7, fontFamily: 'Georgia, serif' }}>
                                Editors: open your preview link once in this browser to read drafts.
                            </p>
                        </div>
                    </div>
                </main>
                <ThirdLampFooter />
            </div>
        );
    }

    // ── Members-only (api/essay.php declined to serve the text) ───────────
    if (accessStatus === 'members_only') {
        return (
            <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 1.5rem' }}>
                    <div style={{ maxWidth: '32rem', width: '100%', border: '1px solid var(--line)', background: 'rgba(14,17,17,0.92)', padding: '3rem 2.5rem', textAlign: 'center' }}>
                        <p className="kicker" style={{ marginBottom: '0.8rem' }}>Members Only</p>
                        <h1 style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: 'var(--bone)', margin: '0 0 1rem', lineHeight: 1.1 }}>{article.title}</h1>
                        <p style={{ color: 'var(--muted)', font: '0.95rem/1.7 Georgia, serif', margin: '0 0 0.6rem' }}>This essay is reserved for Third Lamp members. Subscribe to access the full archive.</p>
                        <p style={{ color: 'rgba(179,139,70,0.75)', font: 'italic 0.88rem/1.6 Georgia, serif', margin: '0 0 2rem' }}>Starting at $3 / month</p>
                        <div style={{ display: 'grid', gap: '0.8rem' }}>
                            <Link to="/plans" className="tl-button" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', display: 'flex' }}>Become a Member</Link>
                            <Link to="/restore" style={{ color: 'var(--gold-bright)', fontSize: '0.88rem', textDecoration: 'none', borderBottom: '1px solid rgba(179,139,70,0.4)' }}>Already a member? Restore access</Link>
                        </div>
                    </div>
                </main>
                <ThirdLampFooter />
            </div>
        );
    }

    // ── Artwork / gallery page ─────────────────────────────────────────────
    if (article.type === 'artwork') {
        const related = articles.filter((a) => a.slug !== article.slug).slice(0, 4);
        return (
            <>
                <Helmet>
                    <title>{`${article.title} | The Third Lamp`}</title>
                    <meta name="description" content={article.dek} />
                </Helmet>
                <div className="third-lamp-scope">
                    <ThirdLampHeader />
                    <main className="article-page">
                        {/* Hero */}
                        <section className="article-hero-fade" style={{ minHeight: '38vh' }}>
                            <img className="article-hero-fade-bg" src={article.heroImage} alt="" aria-hidden="true"
                                style={{ filter: 'saturate(0.55) contrast(1.1) brightness(0.55)' }} />
                            <div className="article-hero-fade-overlay" aria-hidden="true" />
                            <div className="article-hero-fade-copy">
                                <p className="eyebrow">{article.kicker}</p>
                                <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', lineHeight: 1.15 }}>{article.title}</h1>
                                <p className="article-dek">{article.dek}</p>
                                <p className="eyebrow">By <span className="tl-gold-bright">{article.byline}</span></p>
                            </div>
                        </section>

                        {/* Gallery + marginalia in three-column layout */}
                        <div className="article-shell">
                            <aside className="article-toc">
                                <div className="article-toc-issue-desktop">
                                    <IssueSidebar currentSlug={slug} />
                                </div>
                            </aside>

                            {/* Center: Gallery and verse */}
                            <article>
                                <section style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: 'clamp(1.5rem, 4vw, 3rem)',
                                    alignItems: 'start',
                                }}>
                                    {(article.gallery || []).map((img, i) => (
                                        <figure key={i} style={{ margin: 0 }}>
                                            <div style={{
                                                border: '1px solid rgba(179,139,70,0.35)',
                                                padding: '0.5rem',
                                                background: 'rgba(12,14,14,0.7)',
                                            }}>
                                                <img loading="lazy" decoding="async"
                                                    src={img.src}
                                                    alt={img.alt}
                                                    style={{
                                                        width: '100%',
                                                        display: 'block',
                                                        objectFit: 'contain',
                                                        maxHeight: '80vh',
                                                    }}
                                                />
                                            </div>
                                            <figcaption style={{
                                                marginTop: '0.7rem',
                                                color: 'var(--muted)',
                                                fontSize: '0.72rem',
                                                letterSpacing: '0.06em',
                                                textTransform: 'uppercase',
                                            }}>{img.caption}</figcaption>
                                        </figure>
                                    ))}
                                </section>

                                {/* Verse transcription */}
                                {article.verseLines && (
                                    <div style={{
                                        margin: 'clamp(3rem, 6vw, 4.5rem) 0 0',
                                        padding: 'clamp(1.6rem, 3vw, 2.4rem) clamp(1.4rem, 3vw, 2.2rem)',
                                        border: '1px solid rgba(179,139,70,0.32)',
                                        background: 'linear-gradient(135deg, rgba(179,139,70,0.08), transparent)',
                                    }}>
                                        <p className="kicker" style={{ marginBottom: '1.1rem' }}>Verse</p>
                                        {article.verseLines.map((line, i) => (
                                            <p key={i} style={{
                                                margin: '0.2rem 0',
                                                color: 'var(--bone)',
                                                fontFamily: 'Georgia, serif',
                                                fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                                                lineHeight: 1.75,
                                                whiteSpace: 'pre',
                                            }}>{line}</p>
                                        ))}
                                    </div>
                                )}
                            </article>

                            {/* Right sidebar: Marginalia */}
                            <aside className="article-marginalia">
                                {article.marginalia && (
                                    <>
                                        <div>
                                            <p className="eyebrow">{article.marginalia.eyebrow}</p>
                                            <h3>{article.marginalia.eyebrow}</h3>
                                            <p>{article.marginalia.summary}</p>
                                        </div>

                                        <div className="marginalia-rule" aria-hidden="true" />

                                        <dl className="marginalia-correspondences">
                                            {(article.marginalia.correspondences || []).map((c) => (
                                                <div key={c.term}><dt>{c.term}</dt><dd>{c.value}</dd></div>
                                            ))}
                                        </dl>

                                        <div className="marginalia-rule" aria-hidden="true" />

                                        {article.marginalia.figures ? (
                                            <div>
                                                <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>{article.marginalia.conversationLabel || 'The Artist'}</p>
                                                <p className="marginalia-subhead">Key Figures</p>
                                                <div className="marginalia-figures">
                                                    {article.marginalia.figures.map((figure) => (
                                                        <div className="marginalia-figure" key={figure.name}>
                                                            {figure.image && <img loading="lazy" decoding="async" src={figure.image} alt={figure.name} />}
                                                            <div>
                                                                <strong>{figure.name}</strong>
                                                                <p>{figure.role}</p>
                                                                <div className="marginalia-figure-links">
                                                                    {(figure.links || []).map((link) => (
                                                                        link.external
                                                                            ? <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                                                                            : <Link key={link.label} to={link.href}>{link.label}</Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : null}

                                        {article.marginalia.bookPromo && (
                                            <>
                                                <div className="marginalia-rule" aria-hidden="true" />
                                                <a href={article.marginalia.bookPromo.href} target="_blank" rel="noreferrer" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                                                    <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>Now Available</p>
                                                    <p className="marginalia-subhead">{article.marginalia.bookPromo.title}</p>
                                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                                        <img loading="lazy" decoding="async" src={article.marginalia.bookPromo.coverImage} alt={article.marginalia.bookPromo.title}
                                                            style={{ width: '80px', flexShrink: 0, border: '1px solid rgba(179,139,70,0.35)', display: 'block' }} />
                                                        <div>
                                                            <p style={{ margin: '0 0 0.6rem', color: 'var(--muted)', font: '0.78rem/1.55 Georgia, serif' }}>{article.marginalia.bookPromo.description}</p>
                                                            <span style={{ color: 'var(--gold-bright)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', borderBottom: '1px solid rgba(179,139,70,0.5)' }}>Pre-order &rarr;</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </>
                                        )}

                                        <div className="marginalia-rule" aria-hidden="true" />

                                        <Link className="tl-button tl-button-small" to="/third-lamp/archive">Return to Archive</Link>
                                    </>
                                )}
                            </aside>
                        </div>

                        <div className="article-toc-issue-mobile">
                            <IssueSidebar currentSlug={slug} />
                        </div>

                        {/* Related */}
                        <section className="article-related" aria-labelledby="related-title">
                            <h2 id="related-title">Continue Through the Archive</h2>
                            <div className="story-grid">
                                {related.map((r) => (
                                    <Link className="story-card" to={`/articles/${r.slug}`} key={r.slug}>
                                        <img loading="lazy" decoding="async" src={r.image} alt="" aria-hidden="true" />
                                        <div>
                                            <p className="eyebrow">{r.kicker}</p>
                                            <h3>{r.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </main>
                    <ThirdLampFooter />
                </div>
            </>
        );
    }
    // ── end artwork ────────────────────────────────────────────────────────

    const related = articles.filter((a) => a.slug !== article.slug).slice(0, 4);
    const readMinutes = article.readMinutes || Math.max(4, article.body ? article.body.length * 3 : 12);
    const traditionLabels = (article.traditions || []).map((t) => traditionMeta[t]?.label).filter(Boolean);
    const disciplineLabels = (article.disciplines || []).map((d) => disciplineMeta[d]?.label).filter(Boolean);
    const [termA, termB] = article.kicker.split('·').map((s) => s.trim());
    const marginalia = article.marginalia;
    const isSplitHero = article.heroLayout === 'split';

    return (
        <>
            <Helmet>
                <title>{`${article.title}${article.subtitle ? `: ${article.subtitle}` : ''} | The Third Lamp`}</title>
                <meta name="description" content={article.dek} />
            </Helmet>

            <div className="third-lamp-scope">
            <div className="reading-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
            <ThirdLampHeader />

            <main className="article-page">
                {isSplitHero ? (
                    <section className="article-hero-fade">
                        <img className="article-hero-fade-bg" src={article.coverImage} alt="" aria-hidden="true" />
                        <div className="article-hero-fade-overlay" aria-hidden="true"></div>
                        <div className="article-hero-fade-copy">
                            <p className="eyebrow">{article.kicker}</p>
                            <h1>{article.title}</h1>
                            <p className="article-dek">{article.dek}</p>
                            <p className="article-hero-byline">By <Link to="/third-lamp/authors" className="tl-gold-bright">{article.byline}</Link></p>
                            <time dateTime={article.date}>{readMinutes} minute read &middot; The Living Archive</time>
                        </div>
                    </section>
                ) : (
                    <section className="article-hero-fade">
                        <img className="article-hero-fade-bg" src={article.heroImage} alt="" aria-hidden="true" style={article.heroPosition ? { objectPosition: article.heroPosition } : undefined} />
                        <div className="article-hero-fade-overlay" aria-hidden="true"></div>
                        <div className="article-hero-fade-copy">
                            <p className="eyebrow">{article.kicker}</p>
                            <h1>{article.title}</h1>
                            {article.subtitle && <p className="article-subtitle">{article.subtitle}</p>}
                            <p className="article-dek">{article.dek}</p>
                            <p className="eyebrow">By <span className="tl-gold-bright">{article.byline || 'Three Magi Press Editorial Circle'}</span></p>
                            <time dateTime={article.date}>{readMinutes} minute read &middot; The Living Archive</time>
                        </div>
                    </section>
                )}

                <div className="article-shell">
                    <aside className="article-toc">
                        <p>In This Essay</p>
                        <ol>
                            {sections.map((section) => (
                                section.title ? (
                                    <li key={section.id}>
                                        <a href={`#${section.id}`} className={activeId === section.id ? 'is-active' : undefined}>{section.title}</a>
                                    </li>
                                ) : null
                            ))}
                        </ol>
                        <div className="article-toc-issue-desktop">
                            <IssueSidebar currentSlug={slug} />
                        </div>
                        <div className="article-toc-continue">
                            <a href="#related-title">Continue Through the Archive</a>
                        </div>
                    </aside>

                    <article className="article-body" aria-busy={!contentReady}>
                        {!contentReady && (
                            <p className="article-body-loading" role="status">Retrieving the essay…</p>
                        )}
                        {sections.map((section, sIndex) => (
                            <React.Fragment key={section.id}>
                                <div
                                    id={section.id}
                                    ref={(el) => { sectionRefs.current[section.id] = el; }}
                                    className="article-section"
                                >

                                    {section.title && <h2>{section.title}</h2>}
                                    {section.type === 'quadrant-diagram' ? (
                                        <QuadrantDiagram />
                                    ) : section.type === 'pendulum-intro' ? (
                                        <>
                                            <AlchemicalPendulum />
                                            {section.lede && <p className="lede">{renderInline(section.lede)}</p>}
                                            {section.paragraphs.map((paragraph, pIndex) => <p key={pIndex}>{renderInline(paragraph)}</p>)}
                                        </>
                                    ) : (
                                        <>
                                        {section.lede && <p className="lede">{renderInline(section.lede)}</p>}
                                        {section.emphasis && <p className="article-emphasis">{renderInline(section.emphasis)}</p>}
                                        {section.paragraphs.map((paragraph, pIndex) => {
                                            if (paragraph && typeof paragraph === 'object' && paragraph.type === 'pullquote') {
                                                return (
                                                    <blockquote key={pIndex} className="article-pullquote">
                                                        <p>{paragraph.text}</p>
                                                    </blockquote>
                                                );
                                            }
                                            if (paragraph && typeof paragraph === 'object' && paragraph.type === 'blockquote') {
                                                return (
                                                    <blockquote key={pIndex} className="article-journal-blockquote">
                                                        {paragraph.paragraphs.map((p, i) => (
                                                            <p key={i}>{renderInline(p)}</p>
                                                        ))}
                                                    </blockquote>
                                                );
                                            }
                                            if (paragraph && typeof paragraph === 'object' && paragraph.type === 'ornament') {
                                                return (
                                                    <p key={pIndex} className="article-ornament">{paragraph.text}</p>
                                                );
                                            }
                                            if (paragraph && typeof paragraph === 'object' && paragraph.type === 'image') {
                                                return (
                                                    <figure key={pIndex} className="article-inline-image">
                                                        <img loading="lazy" decoding="async" src={paragraph.src} alt={paragraph.alt || ''} />
                                                        {paragraph.caption && <figcaption>{paragraph.caption}</figcaption>}
                                                    </figure>
                                                );
                                            }
                                            return <p key={pIndex}>{renderInline(paragraph)}</p>;
                                        })}
                                        </>
                                    )}
                                    {section.image && (
                                        <figure>
                                            <img loading="lazy" decoding="async" src={section.image} alt={section.imageAlt || ''} />
                                            {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
                                        </figure>
                                    )}
                                </div>
                                {sIndex < sections.length - 1 && <hr aria-hidden="true" />}
                            </React.Fragment>
                        ))}
                        
                        {article.footnotes && article.footnotes.length > 0 && (
                            <div className="article-footnotes">
                                <hr aria-hidden="true" />
                                <ol className="footnotes-list">
                                    {article.footnotes.map((footnote) => (
                                        <li key={footnote.id} id={`footnote-${footnote.id}`}>
                                            <span className="footnote-marker">{footnote.id}</span>
                                            <span className="footnote-text" dangerouslySetInnerHTML={{ __html: footnote.text }} />
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </article>

                    <aside className="article-marginalia">
                        <div>
                            <p className="eyebrow">Marginalia</p>
                            <h3>{marginalia?.eyebrow || 'The Missing Middle'}</h3>
                            <p>{marginalia?.summary || article.dek}</p>
                        </div>

                        <div className="marginalia-rule" aria-hidden="true" />

                        <dl className="marginalia-correspondences">
                            {marginalia?.correspondences
                                ? marginalia.correspondences.map((c) => (
                                    <div key={c.term}><dt>{c.term}</dt><dd>{c.value}</dd></div>
                                ))
                                : (
                                    <>
                                        {termA && <div><dt>{termA}</dt><dd>Primary lens</dd></div>}
                                        {termB && <div><dt>{termB}</dt><dd>Secondary lens</dd></div>}
                                        {traditionLabels[0] && <div><dt>Tradition</dt><dd>{traditionLabels.join(', ')}</dd></div>}
                                        {disciplineLabels[0] && <div><dt>Discipline</dt><dd>{disciplineLabels.slice(0, 2).join(', ')}</dd></div>}
                                    </>
                                )}
                        </dl>

                        <div className="marginalia-rule" aria-hidden="true" />

                        {marginalia?.figures ? (
                            <div>
                                <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>{marginalia.conversationLabel || 'The Conversation'}</p>
                                <p className="marginalia-subhead">Key Figures</p>
                                <div className="marginalia-figures">
                                    {marginalia.figures.map((figure) => (
                                        <div className="marginalia-figure" key={figure.name}>
                                            <img loading="lazy" decoding="async" src={figure.image} alt={figure.name} />
                                            <div>
                                                <strong>{figure.name}</strong>
                                                <p>{figure.role}</p>
                                                <div className="marginalia-figure-links">
                                                    {figure.links.map((link) => (
                                                        <a href={link.href} key={link.label}>{link.label}</a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>Key Figures</p>
                                <div className="marginalia-author">
                                    <span className="marginalia-author-mark" aria-hidden="true">&#10022;</span>
                                    <div>
                                        <strong>Three Magi Press Editorial Circle</strong>
                                        <p>Collaborative research and writing arm of Three Magi Press, tracing hidden currents across traditions.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {marginalia?.relatedViewing && (
                            <>
                                <div className="marginalia-rule" aria-hidden="true" />
                                <div>
                                    <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>{marginalia.relatedViewing.label}</p>
                                    <p className="marginalia-subhead">{marginalia.relatedViewing.title}</p>
                                    <button type="button" className="marginalia-video" aria-label={`Play video: ${marginalia.relatedViewing.title}`}>
                                        <img loading="lazy" decoding="async" src={marginalia.relatedViewing.thumbnail} alt={`Video preview thumbnail: ${marginalia.relatedViewing.title}`} />
                                        <span className="marginalia-video-play" aria-hidden="true">&#9654;</span>
                                    </button>
                                </div>
                            </>
                        )}

                        <div className="marginalia-rule" aria-hidden="true" />

                        <ShareButtons
                            title={article.title}
                            url={typeof window !== 'undefined' ? window.location.href : ''}
                            description={article.dek}
                        />

                        <div className="marginalia-rule" aria-hidden="true" />

                        <Link className="tl-button tl-button-small" to="/third-lamp/archive">Return to Archive</Link>
                    </aside>
                </div>

                <div className="article-toc-issue-mobile">
                    <IssueSidebar currentSlug={slug} />
                </div>

                <section className="article-related" aria-labelledby="related-title">
                    <h2 id="related-title">Continue Through the Archive</h2>
                    <div className="archive-strip">
                        {related.map((a) => (
                            <Link className="archive-tile" to={`/articles/${a.slug}`} key={a.slug}>
                                <img loading="lazy" decoding="async" src={a.image} alt={a.imageAlt || `Cover image for article: ${a.title}`} />
                                <span><small>{a.kicker}</small>{a.title}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="archive-actions"><Link className="tl-button" to="/third-lamp/archive">Explore the Full Archive</Link></div>
                </section>
            </main>

            <ThirdLampFooter />
            </div>
        </>
    );
}

export default ArticlePage;

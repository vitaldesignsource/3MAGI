import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import ThirdLampFeaturedContributors from '../components/ThirdLampFeaturedContributors';
import { articles, traditionMeta, disciplineMeta } from '../data/articles';
function ThirdLampArchivePage() {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [mobileCategory, setMobileCategory] = useState('');
  const [mobileItem, setMobileItem] = useState('');
  const traditionCounts = useMemo(() => {
    const counts = {};
    articles.forEach(a => (a.traditions || []).forEach(t => {
      counts[t] = (counts[t] || 0) + 1;
    }));
    return counts;
  }, []);
  const disciplineCounts = useMemo(() => {
    const counts = {};
    articles.forEach(a => (a.disciplines || []).forEach(d => {
      counts[d] = (counts[d] || 0) + 1;
    }));
    return counts;
  }, []);
  const filtered = useMemo(() => {
    let list = articles;
    if (activeFilter) {
      list = list.filter(a => (a.traditions || []).includes(activeFilter.value) || (a.disciplines || []).includes(activeFilter.value));
    }
    const q = query.trim().toLowerCase();
    if (q) {
      // Not every essay has every field (e.g. one has no dek); a missing one
      // must simply not match, not throw and blank the page.
      const haystack = (a) => [a.title, a.subtitle, a.dek, a.kicker].filter(Boolean).join(' ').toLowerCase();
      list = list.filter(a => haystack(a).includes(q));
    }
    return list;
  }, [query, activeFilter]);
  const focus = useMemo(() => {
    if (activeFilter?.kind === 'tradition') {
      const meta = traditionMeta[activeFilter.value];
      const sample = articles.find(a => (a.traditions || []).includes(activeFilter.value));
      return {
        eyebrow: `${meta.label} Tradition`,
        title: meta.label,
        description: meta.description,
        image: sample?.image,
        related: Array.from(new Set(articles.filter(a => (a.traditions || []).includes(activeFilter.value)).flatMap(a => a.disciplines || []))).slice(0, 3).map(d => disciplineMeta[d]?.label),
        articles: traditionCounts[activeFilter.value] || 0
      };
    }
    if (activeFilter?.kind === 'discipline') {
      const meta = disciplineMeta[activeFilter.value];
      const sample = articles.find(a => (a.disciplines || []).includes(activeFilter.value));
      return {
        eyebrow: `${meta.label} Discipline`,
        title: meta.label,
        description: `Field notes gathered under the discipline of ${meta.label.toLowerCase()}.`,
        image: sample?.image,
        related: Array.from(new Set(articles.filter(a => (a.disciplines || []).includes(activeFilter.value)).flatMap(a => a.traditions || []))).slice(0, 3).map(t => traditionMeta[t]?.label),
        articles: disciplineCounts[activeFilter.value] || 0
      };
    }
    return {
      eyebrow: 'Western Esoteric Tradition',
      title: 'Western Esoteric',
      description: traditionMeta['western-esoteric'].description,
      image: `${articles.find(a => a.slug === 'lodge-and-totem')?.image}`,
      related: ['Alchemy', 'Hermeticism', 'Ritual Art'],
      articles: traditionCounts['western-esoteric'] || 0
    };
  }, [activeFilter, traditionCounts, disciplineCounts]);
  const toggleFilter = (kind, value) => {
    setActiveFilter(prev => prev && prev.kind === kind && prev.value === value ? null : {
      kind,
      value
    });
  };
  return <>
            <Helmet>
                <title>The Living Archive | The Third Lamp</title>
            </Helmet>

            <div className="third-lamp-scope">
            <ThirdLampHeader />

            <main className="archive-page">
                <section className="archive-page-hero">
                    {/* Aetheric SVG field */}
                    <svg className="archive-hero-aether" aria-hidden="true" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                        {/* Outer breathing rings */}
                        <circle className="aether-ring aether-ring-1" cx="300" cy="160" r="140" fill="none" stroke="rgba(179,139,70,0.18)" strokeWidth="0.8" />
                        <circle className="aether-ring aether-ring-2" cx="300" cy="160" r="112" fill="none" stroke="rgba(179,139,70,0.13)" strokeWidth="0.6" />
                        <circle className="aether-ring aether-ring-3" cx="300" cy="160" r="84" fill="none" stroke="rgba(179,139,70,0.1)" strokeWidth="0.5" />
                        {/* Slow rotating hexagram lines */}
                        <g className="aether-hex" transform="translate(300,160)">
                            <line x1="-74" y1="0" x2="74" y2="0" stroke="rgba(159,191,81,0.16)" strokeWidth="0.5" />
                            <line x1="-37" y1="-64" x2="37" y2="64" stroke="rgba(159,191,81,0.16)" strokeWidth="0.5" />
                            <line x1="37" y1="-64" x2="-37" y2="64" stroke="rgba(159,191,81,0.16)" strokeWidth="0.5" />
                        </g>
                        {/* Counter-rotating triangle */}
                        <g className="aether-tri" transform="translate(300,160)">
                            <polygon points="0,-90 78,45 -78,45" fill="none" stroke="rgba(179,139,70,0.09)" strokeWidth="0.6" />
                            <polygon points="0,90 -78,-45 78,-45" fill="none" stroke="rgba(179,139,70,0.09)" strokeWidth="0.6" />
                        </g>
                        {/* Radiant spokes */}
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
              const rad = deg * Math.PI / 180;
              return <line key={i} className="aether-spoke" x1={300 + 88 * Math.cos(rad)} y1={160 + 88 * Math.sin(rad)} x2={300 + 140 * Math.cos(rad)} y2={160 + 140 * Math.sin(rad)} stroke="rgba(179,139,70,0.09)" strokeWidth="0.5" style={{
                animationDelay: `${i * 0.18}s`
              }} />;
            })}
                        {/* Central radial glow ellipse */}
                        <ellipse cx="300" cy="160" rx="56" ry="28" fill="rgba(209,173,104,0.07)" className="aether-core" />
                        {/* Scattered sigil dots */}
                        {[[180, 100], [420, 100], [152, 196], [448, 196], [220, 236], [380, 236], [300, 76], [300, 244]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.4" fill="rgba(179,139,70,0.45)" className="aether-dot" style={{
              animationDelay: `${i * 0.3}s`
            }} />)}
                    </svg>
                    <h1><span>The&nbsp;</span><span>Living</span><span style={{
              display: "block",
              fontSize: "16px",
              lineHeight: "normal",
              marginTop: "0.35em",
              marginBottom: "0.35em"
            }}>follow the currents between ideas</span><span>Archive</span></h1>
                    <p className="archive-hero-subtext"><span style={{
              color: "rgba(222, 212, 196, 0.72)"
            }}>Fourteen field notes · eight connected traditions · one unfolding inquiry.</span></p>

                <div className="archive-hero-search">
                    <div className="archive-search-shell">
                        <span className="archive-search-glyph" aria-hidden="true">⌕</span>
                        <input className="archive-search" type="search" placeholder="Search the hidden archive…" aria-label="Search the archive" value={query} onChange={e => setQuery(e.target.value)} />
                        <span className="archive-search-ledger" aria-hidden="true">XIV</span>
                    </div>
                    <div className="archive-control-meta">
                        <span>Volume I · Living index</span>
                        <button className="clear-archive-filter" type="button" onClick={() => {
                setQuery('');
                setActiveFilter(null);
              }}>Reveal all entries</button>
                        <span>Fourteen field notes catalogued</span>
                    </div>
                </div>
                </section>

                <div className="archive-hero-divider" aria-hidden="true"></div>

                <section className="archive-controls archive-controls-hidden" aria-label="Archive search">
                    <div className="archive-search-shell">
                        <span className="archive-search-glyph" aria-hidden="true">⌕</span>
                        <input className="archive-search" type="search" placeholder="Search the hidden archive…" aria-label="Search the archive" value={query} onChange={e => setQuery(e.target.value)} />
                        <span className="archive-search-ledger" aria-hidden="true">XIV</span>
                    </div>
                    <div className="archive-control-meta">
                        <span>Volume I · Living index</span>
                        <button className="clear-archive-filter" type="button" onClick={() => {
              setQuery('');
              setActiveFilter(null);
            }}>Reveal all entries</button>
                        <span>Fourteen field notes catalogued</span>
                    </div>
                </section>

                {/* Mobile filter dropdowns */}
                <div className="archive-mobile-filters">
                    <div className="archive-mobile-filter-row">
                        <select className="archive-mobile-select" value={mobileCategory} onChange={e => {
              setMobileCategory(e.target.value);
              setMobileItem('');
              setActiveFilter(null);
            }} aria-label="Filter by category type">
                            <option value="">Browse by…</option>
                            <option value="tradition">Traditions</option>
                            <option value="discipline">Disciplines</option>
                        </select>

                        {mobileCategory && <select className="archive-mobile-select" value={mobileItem} onChange={e => {
              const val = e.target.value;
              setMobileItem(val);
              if (val) {
                setActiveFilter({
                  kind: mobileCategory,
                  value: val
                });
              } else {
                setActiveFilter(null);
              }
            }} aria-label={mobileCategory === 'tradition' ? 'Select tradition' : 'Select discipline'}>
                                <option value="">All {mobileCategory === 'tradition' ? 'Traditions' : 'Disciplines'}</option>
                                {mobileCategory === 'tradition' ? Object.keys(traditionMeta).map(key => <option key={key} value={key}>
                                            {traditionMeta[key].label} ({traditionCounts[key] || 0})
                                        </option>) : Object.keys(disciplineMeta).map(key => <option key={key} value={key}>
                                            {disciplineMeta[key].label} ({disciplineCounts[key] || 0})
                                        </option>)}
                            </select>}
                    </div>
                    {activeFilter && <button className="archive-mobile-clear" type="button" onClick={() => {
            setActiveFilter(null);
            setMobileCategory('');
            setMobileItem('');
          }}>
                            Clear filter
                        </button>}
                </div>

                <div className="archive-layout">
                    <aside className="archive-sidebar">
                        <div className="archive-filter-group archive-filter-group-unified">
                            <h3><span style={{
                  fontFamily: "\"Times New Roman\", serif"
                }}><span style={{
                    fontSize: "14px",
                    lineHeight: "normal"
                  }}><span style={{
                      lineHeight: "normal"
                    }}>Browse Currents</span></span></span></h3>
                            <ul className="archive-filter-scroll">
                                {Object.keys(traditionMeta).map(key => <li key={`t-${key}`}>
                                        <button type="button" className={`archive-filter-item${activeFilter?.kind === 'tradition' && activeFilter.value === key ? ' is-active' : ''}`} onClick={() => toggleFilter('tradition', key)}>
                                            <span className="glyph" aria-hidden="true">{traditionMeta[key].glyph}</span>
                                            <span className="label">{traditionMeta[key].label}</span>
                                            <span className="count">{String(traditionCounts[key] || 0).padStart(2, '0')}</span>
                                        </button>
                                    </li>)}
                                <li className="archive-filter-divider" aria-hidden="true"><span>Disciplines</span></li>
                                {Object.keys(disciplineMeta).map(key => <li key={`d-${key}`}>
                                        <button type="button" className={`archive-filter-item${activeFilter?.kind === 'discipline' && activeFilter.value === key ? ' is-active' : ''}`} onClick={() => toggleFilter('discipline', key)}>
                                            <span className="glyph" aria-hidden="true">{disciplineMeta[key].glyph}</span>
                                            <span className="label">{disciplineMeta[key].label}</span>
                                            <span className="count">{String(disciplineCounts[key] || 0).padStart(2, '0')}</span>
                                        </button>
                                    </li>)}
                            </ul>
                        </div>
                    </aside>

                    <div className="archive-main">
                        <section className="archive-focus-panel" aria-live="polite">
                            <figure className="archive-focus-visual">
                                <img src={focus.image} alt="" />
                                <figcaption>
                                    <span aria-hidden="true">&#9737;</span>
                                    <span><b>{focus.title}</b><small>Selected archive current</small></span>
                                </figcaption>
                            </figure>
                            <div className="archive-focus-copy">
                                <p className="topic-eyebrow">{focus.eyebrow}</p>
                                <h2>{focus.title}</h2>
                                <p>{focus.description}</p>

                                <div className="archive-related-currents">
                                    <span className="label">Connected currents</span>
                                    {focus.related.filter(Boolean).map(r => <em key={r}>{r}</em>)}
                                </div>

                                <dl className="topic-dossier-stats">
                                    <div><dt>Articles</dt><dd>{String(focus.articles).padStart(2, '0')}</dd></div>
                                    <div><dt>Related topics</dt><dd>{String(focus.related.length).padStart(2, '0')}</dd></div>
                                </dl>

                                <div className="archive-focus-actions">
                                    <button className="tl-button tl-button-small" type="button" onClick={() => setActiveFilter(activeFilter?.kind === 'tradition' ? activeFilter : {
                    kind: 'tradition',
                    value: 'western-esoteric'
                  })}>Explore this current</button>
                                </div>
                            </div>
                        </section>

                        <section className="archive-results" aria-labelledby="entries-title">
                            <h2 id="entries-title" className="sr-only">Archive entries</h2>
                            {filtered.length === 0 ? <p className="archive-empty">No entries match that search. Try another word or clear the filter.</p> : <div className="archive-grid">
                                    {filtered.map((a, i) => <Link className={`archive-card${a.slug === 'aetheric-foam' ? ' archive-card-image-contain' : ''}`} to={`/articles/${a.slug}`} key={a.slug}>
                                            <figure>
                                                <span className="archive-card-badge">{String(i + 1).padStart(2, '0')}</span>
                                                <img loading="lazy" decoding="async" src={a.image} alt="" />
                                            </figure>
                                            <div className="archive-card-content">
                                                <span className="story-type">{a.kicker}</span>
                                                <h2>{a.title}</h2>
                                                <p>{a.dek}</p>
                                            </div>
                                        </Link>)}
                                </div>}
                        </section>
                    </div>
                </div>

                <ThirdLampFeaturedContributors id="archive-featured-contributors-title" />
            </main>

            <ThirdLampFooter />
            </div>
        </>;
}
export default ThirdLampArchivePage;
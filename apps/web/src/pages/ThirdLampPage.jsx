import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import ThirdLampFeaturedContributors from '../components/ThirdLampFeaturedContributors';
import HeroMotionFX from '../components/HeroMotionFX';
import { useSubscriptionAuth } from '@/contexts/SubscriptionAuthContext.jsx';
const A = '/media';

function EntranceSignup() {
    const { isAuthenticated, currentUser } = useSubscriptionAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    if (isAuthenticated) {
        return (
            <div className="tl-entrance-signup" aria-live="polite">
                <p className="tl-entrance-signup-copy">
                    Welcome back, <strong>{currentUser?.name || currentUser?.email?.split('@')[0]}</strong>. The margins await your notes.
                </p>
                <Link className="tl-button tl-button-outline" to="/plans">View Membership</Link>
            </div>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/signup', { state: { email } });
    };

    return (
        <form className="tl-entrance-signup" onSubmit={handleSubmit}>
            <p className="tl-entrance-signup-copy">
                Join the Circle — become a Supporter and add your voice to the margins of every essay.
            </p>
            <div className="tl-entrance-signup-row">
                <label className="sr-only" htmlFor="entrance-email">Email address</label>
                <input
                    id="entrance-email"
                    type="email"
                    required
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="tl-button">Sign Up — $3/mo</button>
            </div>
            <p className="tl-entrance-signup-note">
                Already a member? <Link to="/login">Sign in</Link>
            </p>
        </form>
    );
}
const leadStories = [{
  slug: 'ways-of-being',
  author: 'Jake Trayer',
  type: 'Philosophy · Practical Wisdom',
  number: '01',
  title: 'Ways of Being',
  copy: 'On presence, reflection, and the integration of cognition into a grounded mode of being.',
  image: '/media/a5b377f07061efefa81d756c64da932f.jpg',
  minutes: '12 min'
}, {
  slug: 'myth-is-more-real-than-facts',
  author: 'Jaime Paul Lamb',
  type: 'Mythology · Philosophy',
  number: '02',
  title: 'The Myth Is More Real Than The Facts',
  copy: 'Modernity did not destroy myth — it simply forgot that it was still making it. On mythopoeia, archetypalization, and the sacred mechanics of meaning-making.',
  image: '/media/43736854-4715-4b1f-9ad2-689cce643c6c.webp',
  minutes: '16 min'
}, {
  slug: 'the-right-to-question',
  author: 'James Oliva',
  type: 'Occult Modernity · Inquiry',
  number: '03',
  title: 'The Right to Question: Esotericism, UFOs, and the Infinite Unknown',
  copy: 'Two stigmatized fields of inquiry — the esoteric and the ufological — share a single ancestor: the refusal to stop asking.',
  image: '/media/3311c2125979a66c91ad798141b1adc2.webp',
  minutes: '11 min'
}, {
  slug: 'the-twice-born',
  author: 'Magick Mike',
  type: 'Christian Hermeticism · Theurgy',
  number: '04',
  title: 'The Twice Born: Theurgy, Orthodoxy, and the Alchemical Christ',
  copy: 'When occultists find Jesus, they miss the point: being born again is the singular purpose of the esoteric mysteries. On theurgy, sorcery, and operative theology.',
  image: '/media/ff29a50a84e735afad04a0ae419885e6.webp',
  minutes: '16 min'
}, {
  slug: 'unfamiliar-territory',
  author: 'Periclinus de Faustis',
  type: 'Occultism · Astral Projection',
  number: '05',
  title: 'Unfamiliar Territory',
  copy: 'A cautionary account of inexperienced astral projection, the dangers of the hidden world, and the necessity of proper initiation and guidance.',
  image: '/media/c5eb7c9a51e723783c5f626b2918d870.webp',
  minutes: '12 min'
}, {
  slug: 'the-world-is-an-offering',
  author: 'Travis Lawrence',
  type: 'Visual Art · Print',
  number: '06',
  title: 'The World Is an Offering. I Am. The Sacrifice.',
  copy: 'A diptych of handwritten verse and woodcut-style relief print on sacrifice, offering, and the altar of becoming. By Travis Lawrence.',
  image: '/media/ae5c524ef5d662c8f231f0dce1d6020b.webp',
  minutes: 'Art'
}, {
  slug: 'occult-symbols-technologies-practitioner',
  author: 'Nick — The Occult Rejects',
  type: 'Sigils · Ritual · Cognition',
  number: '07',
  title: 'Occult Symbols as Technologies of the Practitioner',
  copy: 'What if the symbol does not first change the world — but first changes the person using it? On sigils, talismans, conditioning, color, and the physiology of ritual.',
  image: '/media/448748179fa70bc3c22718919f307a2f.webp',
  minutes: '18 min'
}, {
  slug: 'the-art-of-learning-to-see',
  author: 'Brandon Lee',
  type: 'Perception · Philosophy · Awakening',
  number: '08',
  title: 'The Art of Learning to See',
  copy: 'On the parable of the one-eyed king, the nature of perception, and the work of becoming fully awake.',
  image: '/media/6e185c5e78b2c18bfaf1e1dd9f2b016d.webp',
  minutes: '12 min'
}, {
  slug: 'three-months-upon-the-scales',
  author: 'Meg Vollmer',
  type: 'Egypt · Initiation · Visionary',
  number: '09',
  title: 'Three Months Upon the Scales',
  copy: 'Who knew that a heart could be weighed for three months straight? In the Hall, there is no time; only the hour of the night.',
  image: '/media/3b5badc22e5127db413619fea4e0a58b.webp',
  minutes: '5 min'
}, {
  slug: 'black-mirror-of-fire',
  author: 'Three Magi Press Editorial Circle',
  type: 'Cover Feature · Vision',
  number: '10',
  title: 'Obsidian: The Black Mirror of Dark Luminosity',
  copy: "A volcanic stone becomes blade, oracle, shadow, and one of humanity's oldest disciplines of seeing.",
  image: `${A}/obsidian-smoking-mirror.webp`,
  minutes: '18 min'
}];
const archiveTiles = [{
  slug: 'tabula-cebetis',
  index: 'A.01',
  kicker: 'Philosophical allegory',
  title: 'The Painted Gate of Life',
  image: `${A}/tabula-painted-map-panel.webp`
}, {
  slug: 'alkaline-aquifers',
  index: 'A.02',
  kicker: 'Elemental nature',
  title: 'The Hidden Waters',
  image: `${A}/hidden-waters-cave-aquifer.webp`
}, {
  slug: 'melchizedek-eternal-priest-king',
  index: 'A.03',
  kicker: 'Sacred history',
  title: 'The Eternal Priest-King',
  image: `${A}/melchizedek-throne-altar.webp`
}, {
  slug: 'three-lamps-abraham',
  index: 'A.04',
  kicker: 'Living tradition',
  title: 'The Three Lamps of Abraham',
  image: `${A}/abraham-jerusalem.webp`
}];
function ThirdLampPage() {
  const featuredArticles = [
    leadStories.find(s => s.slug === 'the-twice-born'),
    leadStories.find(s => s.slug === 'myth-is-more-real-than-facts')
  ];
  const featureBoxArticles = [
    leadStories.find(s => s.slug === 'occult-symbols-technologies-practitioner'),
    leadStories.find(s => s.slug === 'the-art-of-learning-to-see')
  ];
  const remainingStories = leadStories.filter(s => 
    s.slug !== 'the-twice-born' && 
    s.slug !== 'myth-is-more-real-than-facts' &&
    s.slug !== 'occult-symbols-technologies-practitioner' &&
    s.slug !== 'the-art-of-learning-to-see'
  );

  return <>
            <Helmet>
                <title>The Third Lamp | Three Magi Press</title>
            </Helmet>

            <div className="third-lamp-scope">
            <ThirdLampHeader />

            <main>
                <section className="tl-entrance" aria-labelledby="tl-entrance-title">
                    <img src="/media/entrance-angel-vigil.webp" alt="Three hooded figures kneeling before a winged stone angel in a ruined cathedral, a shaft of light falling from a high window" />
                    <div className="tl-entrance-shade" aria-hidden="true" />
                    <HeroMotionFX />
                    <div className="tl-entrance-vignette" aria-hidden="true" />
                    <div className="tl-entrance-content">
                        <img className="tl-entrance-emblem" src="/media/3rd_lamp_magazine-TvY2B.webp" alt="The Third Lamp emblem: a crescent moon cradling a lit oil lamp within a numeral three" />
                        <h1 id="tl-entrance-title" className="tl-entrance-title">The Third Lamp</h1>
                        <div className="tl-entrance-rule" aria-hidden="true" />
                        <p className="tl-entrance-tagline">Esoterica <span aria-hidden="true">·</span> Symbol <span aria-hidden="true">·</span> Revelation</p>
                        <p className="tl-entrance-est">
                            <span aria-hidden="true">⟡</span> Est. for the Living Traditions <span aria-hidden="true">⟡</span>
                        </p>
                        <p className="tl-entrance-desc">An independent house for esoteric enquirer &amp; the Alchemical Mind — where the visible and the invisible are read as one text.</p>

                        <EntranceSignup />
                    </div>
                </section>

                <section className="issue-hero" aria-labelledby="issue-title">
                    <div className="issue-hero-bg">
                        <img loading="lazy" decoding="async" src={`${A}/obsidian-altar-mirror.webp`} alt="Obsidian mirror on a scholar's ritual table" />
                        <span className="issue-hero-bg-caption"><span>Plate I</span> Obsidian and the discipline of seeing</span>
                    </div>
                    <div className="issue-hero-fade" aria-hidden="true" />
                    <div className="issue-copy">
                        <span className="issue-solar-glyph" aria-hidden="true">☉</span>
                        <p className="issue-label">Volume I · Issue I</p>
                        <h2 id="issue-title">The<br />Return<br />of the<br />Invisible</h2>
                        <p>An inaugural exploration of the unseen forces, forgotten symbols, and living mysteries returning to the surface of contemporary life.</p>
                        <div className="issue-actions">
                            <Link className="tl-button tl-button-outline" to="/articles/black-mirror-of-fire">Enter the Issue</Link>
                            <a className="issue-contents-link" href="#current-issue">View the contents <span aria-hidden="true">↓</span></a>
                        </div>
                        <dl className="issue-folio" aria-label="Issue details">
                            <div><dt>Featured essays</dt><dd>03</dd></div>
                            <div><dt>Archive currents</dt><dd>04</dd></div>
                            <div><dt>Edition</dt><dd>Inaugural</dd></div>
                        </dl>
                    </div>
                </section>

                {featuredArticles.map((article, idx) => (
                  <section key={article.slug} className="featured-article-hero" aria-labelledby={`featured-article-title-${idx}`}>
                    <div className="featured-article-bg">
                      <img loading="lazy" decoding="async" src={article.image} alt={article.imageAlt || `Illustration for: ${article.title}`} />
                      <span className="featured-article-bg-caption"><span>Featured</span> {article.type}</span>
                    </div>
                    <div className="featured-article-fade" aria-hidden="true" />
                    <div className="featured-article-copy">
                      <span className="featured-article-glyph" aria-hidden="true">✦</span>
                      <p className="featured-article-label">{article.type}</p>
                      <h2 id={`featured-article-title-${idx}`}>{article.title}</h2>
                      {article.author && <p className="featured-article-author">By {article.author}</p>}
                      <p>{article.copy}</p>
                      <div className="featured-article-actions">
                        <Link className="tl-button tl-button-outline" to={`/articles/${article.slug}`}>Read the Essay</Link>
                      </div>
                      <dl className="featured-article-meta" aria-label="Article details">
                        <div><dt>Number</dt><dd>{article.number}</dd></div>
                        <div><dt>Reading time</dt><dd>{article.minutes}</dd></div>
                      </dl>
                    </div>
                  </section>
                ))}

                <section className="feature-boxes-section" aria-labelledby="feature-boxes-title">
                  <div className="feature-boxes-grid">
                    {featureBoxArticles.map((article) => (
                      <Link key={article.slug} to={`/articles/${article.slug}`} className="feature-box">
                        <div className="feature-box-image">
                          <img loading="lazy" decoding="async" src={article.image} alt={article.imageAlt || `Illustration for: ${article.title}`} />
                          <div className="feature-box-overlay" aria-hidden="true" />
                        </div>
                        <div className="feature-box-content">
                          <p className="feature-box-type">{article.type}</p>
                          <h3>{article.title}</h3>
                          {article.author && <p className="feature-box-author">By {article.author}</p>}
                          <p className="feature-box-copy">{article.copy}</p>
                          <div className="feature-box-footer">
                            <span className="feature-box-link">Read essay →</span>
                            <span className="feature-box-time">{article.minutes}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="editorial-band" id="current-issue" aria-labelledby="features-title">
                    <div className="section-title">
                        <span className="section-index" aria-hidden="true">I</span>
                        <h2 id="features-title">From the Current Issue</h2>
                        <span className="section-title-rule" aria-hidden="true" />
                        <p>Encounters with esoteric thought, recovered memory, and the enduring presence of the unseen.</p>
                    </div>
                    <div className="lead-grid">
                        {remainingStories.map(story => <Link className="story-card" to={`/articles/${story.slug}`} key={story.slug}>
                                <figure><img loading="lazy" decoding="async" src={story.image} alt={story.imageAlt || `Illustration for: ${story.title}`} /></figure>
                                <div className="story-copy">
                                    <div className="story-meta"><span className="story-type">{story.type}</span><span className="story-number">{story.number}</span></div>
                                    <h3>{story.title}</h3>
                                    {story.author && <p className="story-author">By {story.author}</p>}
                                    <p>{story.copy}</p>
                                    <div className="story-footer"><span className="story-link">Read essay →</span><span>{story.minutes}</span></div>
                                </div>
                            </Link>)}
                    </div>
                </section>

                <section className="tl-forthcoming-issue" aria-labelledby="green-crucible-title">
                    <div className="tl-forthcoming-issue-copy">
                        <p className="kicker">Forthcoming · Volume I · Issue II</p>
                        <h2 id="green-crucible-title">The Green Crucible</h2>
                        <p className="tl-forthcoming-issue-subtitle">Alchemy, Herbalism, and the Intelligence of Living Matter</p>
                        <p className="tl-forthcoming-issue-meta">
                            <span>Spring 2027</span>
                            <span>Open Call</span>
                        </p>
                        <p className="tl-forthcoming-issue-lede">
                            An issue devoted to alchemy, herbalism, spagyrics, plant virtue, historical herbals, botanical art, sacred ecology, and the responsible study of living matter as medicine, symbol, and transformative intelligence.
                        </p>
                        <div className="tl-forthcoming-issue-actions">
                            <Link className="tl-button" to="/third-lamp/contribute#open-call">Pitch for Issue II</Link>
                            <Link className="tl-button tl-button-outline" to="/third-lamp/contribute">The Open Gate</Link>
                        </div>
                    </div>
                    <div 
                        className="tl-forthcoming-issue-quote"
                        style={{
                            backgroundImage: 'url(/media/47ca1f939139b1a308654f4cbcb513f9.webp)'
                        }}
                    >
                        <p>Every plant is a scripture written in living chemistry.</p>
                        <cite>Paracelsus</cite>
                    </div>
                </section>

                <section className="archive-preview" aria-labelledby="archive-preview-title">
                    <div className="section-title">
                        <span className="section-index" aria-hidden="true">II</span>
                        <h2 id="archive-preview-title">From the Living Archive</h2>
                        <span className="section-title-rule" aria-hidden="true" />
                        <p>Older maps, elemental studies, and sacred histories in conversation with the present issue.</p>
                    </div>
                    <div className="archive-strip">
                        {archiveTiles.map(tile => <Link className="archive-tile" to={`/articles/${tile.slug}`} key={tile.slug}>
                                <span className="archive-tile-index">{tile.index}</span>
                                <img loading="lazy" decoding="async" src={tile.image} alt={tile.imageAlt || `Cover image for: ${tile.title}`} />
                                <span className="archive-tile-caption"><small>{tile.kicker}</small>{tile.title}</span>
                            </Link>)}
                    </div>
                    <div className="archive-actions"><Link className="tl-button" to="/third-lamp/archive">Explore the Archive</Link></div>
                </section>

                <section className="manifesto manifesto-fade" aria-labelledby="manifesto-title">
                    <img loading="lazy" decoding="async" className="manifesto-fade-bg" src={`${A}/hermes-wide.webp`} alt="Weathered statue of Hermes against darkness" />
                    <div className="manifesto-fade-overlay" aria-hidden="true" />
                    <div className="manifesto-copy">
                        <span className="manifesto-number" aria-hidden="true">III</span>
                        <p className="kicker">The Third Lamp</p>
                        <h2 id="manifesto-title">A journal for the long memory</h2>
                        <p>Between the publisher&rsquo;s book and the scholar&rsquo;s notebook lies a more immediate vessel. The Third Lamp gathers serious essays, visual archives, sacred history, and living traditions into a digital magazine built for contemplation rather than haste.</p>
                        <Link className="tl-button" to="/#newsletter">Receive New Issues</Link>
                    </div>
                </section>

                <ThirdLampFeaturedContributors id="home-featured-contributors-title" />

                <section className="submission-strip" aria-label="Contribute to The Third Lamp">
                    <div>
                        <p className="kicker">The Open Gate</p>
                        <h2>Bring your work to the lamp.</h2>
                    </div>
                    <Link className="tl-button tl-button-outline tl-button-small" to="/third-lamp/contribute">Submit Your Work</Link>
                </section>
            </main>

            <ThirdLampFooter />
            </div>
        </>;
}
export default ThirdLampPage;
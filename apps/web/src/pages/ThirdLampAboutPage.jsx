import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
const A = '/media';
function ThirdLampAboutPage() {
  return <>
            <Helmet>
                <title>About | The Third Lamp</title>
            </Helmet>

            <div className="third-lamp-scope">
                <ThirdLampHeader />

                <main>
                    <section className="about-lamp-hero" aria-labelledby="about-title">
                        <img src={`${A}/third-lamp-living-archive-bg.webp`} alt="" />
                        <div className="about-lamp-hero-shade" aria-hidden="true"></div>
                        <div className="about-lamp-hero-copy">
                            <p className="kicker">The Third Lamp</p>
                            <h1 id="about-title">
                                An independent magazine for <em>esoteric inquiry</em>, <em>symbolic thought</em>, and <em>distinctive voices</em>.
                            </h1>
                            <p>The Third Lamp gathers essays, research, art, field notes, interviews, translations, and living traditions into a publication devoted to hidden dimensions of reality without sacrificing discernment, craft, or intellectual seriousness.</p>
                            <div className="about-hero-actions">
                                <Link className="tl-button" to="/third-lamp/contribute">View the Call</Link>
                                <Link className="tl-button tl-button-quiet" to="/third-lamp/archive">Enter the Archive</Link>
                            </div>
                        </div>
                    </section>

                    <section className="about-body" aria-label="About The Third Lamp">
                        <div className="about-threshold">
                            <img loading="lazy" decoding="async" src="/media/8c195612b68c8813eb45e38fb66fae36.webp" alt="" className="about-threshold-bg" />
                            <div className="about-threshold-overlay" aria-hidden="true"></div>
                            <aside className="about-sigil-card" aria-label="Editorial principle">
                                <img loading="lazy" decoding="async" src="/media/58e69c51822babba8b4ccc79aadd79d2.webp" alt="An open stone archway leading to a misty path, evoking the threshold of the gate" className="about-sigil-image" />
                                <span aria-hidden="true">III</span>
                                <strong>The gate is open, but it still possesses a threshold.</strong>
                                <p>Welcoming new voices does not mean surrendering standards. The lamp remains guarded.</p>
                            </aside>
                            <div className="about-threshold-copy">
                                <p className="kicker">Philosophy</p>
                                <h2>Is there even such a thing as a countercultural collective?</h2>
                                <p>At first, the phrase sounds paradoxical. Yet paradox does not necessarily imply impossibility. A paradox is not inherently a contradiction; sometimes it is the first sign that a living question has not yet been flattened into doctrine.</p>
                                <p>A countercultural collective is not inherently contra-dictatorial. A dissident collective can reproduce the same authoritarian habits it claims to oppose. Contra-doctrinal, perhaps; but <em>transdoctrinal</em> is closer to the purpose of The Third Lamp, because the aim is not to oppose doctrine merely for the sake of opposition. Reaction remains governed by whatever it reacts against.</p>
                            </div>
                        </div>

                        <div className="about-columns">
                            <article className="about-section">
                                <p className="kicker">Diction</p>
                                <h2>Distinctive voices, brought into relation.</h2>
                                <p>Each of us possesses a unique mode of <em>Dīcere</em>: a personal way of saying, shaping, and transmitting meaning.</p>
                                <p>A genuine collective need not replace these distinctive voices with a single authorized diction. It can bring them into meaningful relation without erasing their differences.</p>
                            </article>
                            <article className="about-section about-ornament-card">
                                <p className="kicker">Observation</p>
                                <h2>For the esoteric idiolectophile.</h2>
                                <p>There are many kinds of -philes in the world. Bibliophiles and audiophiles are familiar examples. The Third Lamp is intended above all as a gathering place for esoteric idiolectophiles: those who value the unique symbolic vocabulary through which each individual articulates encounters with hidden realities.</p>
                            </article>
                        </div>

                        <section className="about-invitation-panel">
                            <div>
                                <p className="kicker">Invitation</p>
                                <h2>Heretics are welcome.</h2>
                            </div>
                            <div>
                                <p>The Third Lamp is concerned less with doxa and more with <em>Alētheia</em>: disclosure, truth, and the disciplined uncovering of what has been concealed.</p>
                                <p>Heterodoxy is welcome, but it is not a credential. The Third Lamp welcomes writers willing to cross doctrinal boundaries, question inherited assumptions, and investigate subjects excluded from conventional discourse. Contributors are not required to agree with the editors, with prevailing institutions, or with one another. They are expected to demonstrate originality, coherence, responsible scholarship, and sincerity of craft.</p>
                                <Link className="tl-button" to="/third-lamp/contribute">The Call: Enter the Open Gate</Link>
                            </div>
                        </section>

                        <section className="about-vision">
                            <svg className="about-vision-geometry" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                                <g className="avg-rot avg-rot-slow">
                                    <circle cx="200" cy="200" r="150" />
                                    <circle cx="200" cy="200" r="110" />
                                    <polygon points="200,60 321,270 79,270" />
                                    <polygon points="200,340 321,130 79,130" />
                                </g>
                                <g className="avg-rot avg-rot-rev">
                                    <circle cx="200" cy="130" r="70" />
                                    <circle cx="261" cy="165" r="70" />
                                    <circle cx="261" cy="235" r="70" />
                                    <circle cx="200" cy="270" r="70" />
                                    <circle cx="139" cy="235" r="70" />
                                    <circle cx="139" cy="165" r="70" />
                                    <circle cx="200" cy="200" r="70" />
                                </g>
                            </svg>
                            <p className="kicker">Vision</p>
                            <blockquote><p>Disagreement should produce inquiry rather than empty provocation.</p></blockquote>
                            <p>To maintain standards is not necessarily to enforce conformity. It is to distinguish meaningful difference from undisciplined noise.</p>
                        </section>

                        <section className="about-founder" aria-labelledby="founder-note-title">
                            <article className="founder-note-card">
                                <p className="kicker">A Note from the Founder</p>
                                <h2 id="founder-note-title">Looking forward</h2>
                                <p>Alongside the essays and articles that form the body of each issue, The Third Lamp will occasionally turn its attention toward the thinkers, artists, practitioners, mentors, and friends whose work and presence have shaped my perception and, in many cases, inspired the themes of the issues themselves.</p>
                                <p>These commentaries should not be understood as definitive assessments or qualified endorsements of every position they hold. They are acknowledgments of meaningful encounter: records of the conversations, ideas, and examples that have clarified questions, unsettled assumptions, or opened new paths of inquiry.</p>
                                <p>The magazine is, in part, a living archive of these influences and a place to honor the distinctive voices that have contributed to its illumination.</p>
                            </article>
                            <aside className="appreciation-card">
                                <p className="kicker">Appreciation</p>
                                <h2>This vision would not be possible without my co-conspirators.</h2>
                                <p>First and foremost is <em><span style={{
                    color: "rgb(197, 157, 78)"
                  }}>Meg Vollmer</span></em>, to whom I offer my deepest love, gratitude, and respect. Her daily inspiration, motivation, and editorial wizardry are woven throughout this project.</p>
                                <p>I also offer profound gratitude to <span style={{
                  color: "rgb(197, 157, 78)"
                }}><em>Ike Baker</em></span>, whose invaluable friendship and transmissions continue to exert a formative influence on the evolution of my thought. I remain deeply grateful for his wisdom and generosity.</p>
                            </aside>
                        </section>
                    </section>

                    <section className="submission-strip about-open-gate" aria-label="Contribute to The Third Lamp">
                        <div>
                            <p className="kicker">The Open Gate</p>
                            <h2>Bring your distinctive voice to the lamp.</h2>
                        </div>
                        <Link className="tl-button tl-button-small" to="/third-lamp/contribute#submission-portal">Submit Your Work</Link>
                    </section>
                </main>

                <ThirdLampFooter />
            </div>
        </>;
}
export default ThirdLampAboutPage;
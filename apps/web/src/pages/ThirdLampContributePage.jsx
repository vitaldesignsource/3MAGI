import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import { submitForm } from '@/lib/formSubmit';
import HourglassIcon from '../components/HourglassIcon';

/* ── Constellation background SVG animation ───────────────────────── */
const STARS = [
  [12,18],[88,14],[45,9],[67,22],[30,35],[78,30],[55,55],[22,62],[92,58],
  [40,72],[70,68],[15,80],[85,82],[50,90],[35,50],[60,40],[10,45],[95,25],
  [25,25],[75,75],
];
const LINES = [
  [0,2],[2,3],[3,1],[1,17],[17,8],[8,5],[5,3],[3,14],[14,13],[13,11],
  [11,15],[15,6],[6,9],[9,12],[12,16],[16,0],[5,18],[18,4],[4,6],[6,7],
];

function ConstellationBg() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position:'absolute', inset:0, width:'100%', height:'100%',
        pointerEvents:'none', zIndex:0, opacity:0.35,
      }}
    >
      <defs>
        <radialGradient id="csg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(209,173,104,0.18)" />
          <stop offset="100%" stopColor="rgba(209,173,104,0)" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#csg)" />
      {/* constellation lines */}
      {LINES.map(([a,b], i) => (
        <line
          key={i}
          x1={STARS[a][0]} y1={STARS[a][1]}
          x2={STARS[b][0]} y2={STARS[b][1]}
          stroke="rgba(209,173,104,0.28)"
          strokeWidth="0.18"
        >
          <animate
            attributeName="opacity"
            values="0.4;0.9;0.4"
            dur={`${4 + (i % 5)}s`}
            begin={`${(i * 0.37) % 3}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}
      {/* stars */}
      {STARS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 4 === 0 ? 0.55 : 0.32} fill="rgba(232,201,122,0.85)">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur={`${2.4 + (i % 7) * 0.5}s`}
            begin={`${(i * 0.22) % 2.8}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

const A = '/media';

const publishTypes = [
    { n: '01', title: 'Essays and Features', copy: 'Historical, philosophical, esoteric, cultural, scientific, or comparative articles.' },
    { n: '02', title: 'Research Notes', copy: 'Focused studies of a text, symbol, object, ritual, person, event, or obscure tradition.' },
    { n: '03', title: 'Practical Work', copy: 'Contemplative exercises, ritual frameworks, botanical practice, laboratory notes, and responsible methods.' },
    { n: '04', title: 'Translations and Archives', copy: 'Translations, manuscript studies, annotated sources, and forgotten works brought back into discussion.' },
    { n: '05', title: 'Interviews and Conversations', copy: 'Dialogues with scholars, practitioners, artists, craftspeople, and researchers.' },
    { n: '06', title: 'Art and Visual Essays', copy: 'Photography, illustration, diagrams, manuscript art, botanical studies, architecture, and symbolic design.' },
    { n: '07', title: 'Reviews', copy: 'Books, films, exhibitions, decks, tools, podcasts, courses, and historical editions.' },
    { n: '08', title: 'Field Notes', copy: 'Observations from sacred sites, libraries, laboratories, gardens, ceremonies, conferences, and research journeys.' },
];

const processSteps = [
    { n: '01', title: 'Choose a Path', copy: 'Pitch an idea or send work already complete.' },
    { n: '02', title: 'Editorial Reading', copy: 'Editors review fit, rigor, voice, and scope.' },
    { n: '03', title: 'Conversation', copy: 'Promising work receives questions and direction.' },
    { n: '04', title: 'Development', copy: 'Accepted pieces move through collaborative editing.' },
    { n: '05', title: 'Publication', copy: 'The work joins an issue, author page, and living archive.' },
];

const standards = [
    {
        n: '01',
        title: 'Authentic Voice',
        subtitle: 'Sincere in intention\nHonest about perspective',
        copy: 'We value writing that comes from lived engagement, real reflection, and a clear sense of purpose. If a piece is interpretive or opinion-based, it should be transparent about that.',
    },
    {
        n: '02',
        title: 'Intellectual Curiosity',
        subtitle: 'Thoughtful and inquisitive\nOpen to complexity',
        copy: 'We welcome work that asks genuine questions, follows meaningful lines of inquiry, and remains alive to ambiguity without pretending to final certainty.',
    },
    {
        n: '03',
        title: 'Living Traditions',
        subtitle: 'Respectful of living traditions\nSymbolically attentive',
        copy: 'Work may move between archive and experience, symbol and practice, but it should do so with care, depth, and regard for the traditions it engages.',
    },
    {
        n: '04',
        title: 'Textual Experimentation',
        subtitle: 'Open to form\nClearly shaped',
        copy: 'Essays, reflections, hybrid forms, and lyrical or experimental writing are all welcome when the language remains intentional, coherent, and resonant.',
    },
];

const benefits = [
    'Professional author page and biography',
    'Links to personal work and research',
    'Thoughtful editorial development',
    'Magazine and podcast exposure',
    'Promotion across Three Magi Press channels',
    'Opportunities for repeat contributions',
    'Possible interviews and roundtable invitations',
];

const seeking2 = [
    'Alchemy, herbalism, and spagyrics',
    'Plant intelligence and botanical symbolism',
    'Traditional medicine and historical herbals',
    'Alchemical laboratories and material practice',
    'Sulfur, Mercury, Salt, and the vegetal work',
    'Sacred ecology and plant spirits',
    'Medicine, toxicity, safety, and ethics',
    'Interviews with herbalists, growers, and alchemists',
];

const seeking3 = [
    'Watchers, fallen angels, and the Book of Enoch',
    'Culture heroes, civilizing gods, and divine teachers',
    'Prometheus, Thoth, Hermes, Oannes, and related figures',
    'Forbidden arts: metallurgy, writing, magic, astronomy, and medicine',
    'Descent myths across ancient and Indigenous traditions',
    'Revelation, initiation, and the transmission of sacred knowledge',
    'The ethics of dangerous, stolen, or premature knowledge',
    'Modern interpretations of ancient contact and divine instruction',
];

const formats = [
    ['Major feature', '2,500–4,500 words'],
    ['Standard article', '1,200–2,500 words'],
    ['Research note', '600–1,200 words'],
    ['Review', '600–1,000 words'],
    ['Visual essay', '8–20 images'],
    ['Translation', 'Length agreed first'],
];

const questions2 = [
    'How have traditions understood plants as bearers of virtue, intelligence, or spirit?',
    'Where do laboratory practice, medicine, symbolism, and ritual genuinely meet?',
    'How can historical sources be engaged without romanticizing toxicity or unsafe practice?',
    'What does responsible sacred ecology require from esoteric practitioners now?',
];

const questions3 = [
    'What does descent mean: incarnation, revelation, transgression, or all three?',
    'Why do traditions bind gifts of knowledge to danger, exile, sacrifice, or judgment?',
    'How can parallel myths be compared without flattening distinct cultures and living traditions?',
    'What separates symbolic interpretation, historical evidence, and modern speculation?',
];

const faqs = [
    { q: 'How quickly will I receive a response?', a: 'Pitches and completed submissions are normally reviewed within four to six weeks. Complex translations and visual projects may require additional time.' },
    { q: 'Can I submit work published elsewhere?', a: 'Yes, when prior publication is fully disclosed and you hold the necessary republication rights. Original work receives priority.' },
    { q: 'What are the word limits?', a: 'Limits vary by format and issue. The current open call lists preferred ranges; pitch before drafting work that exceeds them.' },
    { q: 'Do you pay contributors?', a: 'Terms, rights, and any honorarium are confirmed with the contributor before an accepted work enters production.' },
    { q: 'Who is responsible for image rights?', a: 'Contributors must identify image sources and confirm permission, license, or public-domain status for every submitted visual.' },
    { q: 'What is the policy on generative AI?', a: 'Any use must be disclosed. Fabricated quotations, references, evidence, translations, or claims are never acceptable; the named author remains responsible for the entire submission.' },
    { q: 'May I publish under a pen name?', a: 'Yes. Editors still require a legal name and private contact information, but the published byline may use an agreed pen name.' },
    { q: 'Will my work be edited?', a: "Yes. Accepted work is edited collaboratively, primarily to strengthen its structure, presentation, and formatting. We may also suggest light revisions for clarity, consistency, sourcing, or house style, while preserving the contributor's voice, argument, and intent." },
];

function Reveal({ children, className = '', as = 'div', delay = 0, ...rest }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setShown(true);
            return;
        }
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    const Tag = as;
    return (
        <Tag
            ref={ref}
            className={`tl-reveal${shown ? ' is-visible' : ''} ${className}`.trim()}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
            {...rest}
        >
            {children}
        </Tag>
    );
}

function PublishCard({ n, title, copy }) {
    const [open, setOpen] = useState(false);
    return (
        <article className={`publish-card${open ? ' is-open' : ''}`}>
            <button type="button" className="publish-card-trigger" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                <span>{n}</span>
                <h3>{title}</h3>
                <span className="publish-card-icon" aria-hidden="true"></span>
            </button>
            <div className="publish-card-panel"><p>{copy}</p></div>
        </article>
    );
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className={`gate-faq-item${open ? ' is-open' : ''}`}>
            <button type="button" className="gate-faq-trigger" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                <span className="gate-faq-q">{q}</span>
                <span className="gate-faq-icon" aria-hidden="true"></span>
            </button>
            <div className="gate-faq-panel"><p>{a}</p></div>
        </div>
    );
}

function GateSvg() {
    return (
        <svg
            className="gate-svg"
            aria-hidden="true"
            viewBox="0 0 120 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="gate-gold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8c97a" />
                    <stop offset="100%" stopColor="#b9924e" />
                </linearGradient>
                <filter id="gate-glow">
                    <feGaussianBlur stdDeviation="1.8" result="blur" />
                    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>

            {/* Archway frame */}
            <path d="M10 130 L10 54 Q10 14 60 14 Q110 14 110 54 L110 130" stroke="url(#gate-gold)" strokeWidth="1.4" opacity="0.55" />
            {/* Inner arch */}
            <path d="M20 130 L20 58 Q20 26 60 26 Q100 26 100 58 L100 130" stroke="url(#gate-gold)" strokeWidth="0.8" opacity="0.3" />

            {/* Left gate panel — rotates open */}
            <g style={{ transformOrigin: '20px 130px', animation: 'gate-open-left 4s ease-in-out 0.6s forwards' }}>
                <rect x="20" y="54" width="38" height="76" fill="rgba(179,139,70,0.06)" stroke="url(#gate-gold)" strokeWidth="0.9" opacity="0.7" />
                {/* Panel detail lines */}
                <line x1="29" y1="66" x2="29" y2="118" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
                <line x1="20" y1="86" x2="58" y2="86" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
                <line x1="20" y1="100" x2="58" y2="100" stroke="rgba(209,173,104,0.22)" strokeWidth="0.4" />
                {/* Knob */}
                <circle cx="55" cy="93" r="2.2" fill="url(#gate-gold)" opacity="0.8" />
            </g>

            {/* Right gate panel — rotates open */}
            <g style={{ transformOrigin: '100px 130px', animation: 'gate-open-right 4s ease-in-out 0.6s forwards' }}>
                <rect x="62" y="54" width="38" height="76" fill="rgba(179,139,70,0.06)" stroke="url(#gate-gold)" strokeWidth="0.9" opacity="0.7" />
                {/* Panel detail lines */}
                <line x1="91" y1="66" x2="91" y2="118" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
                <line x1="62" y1="86" x2="100" y2="86" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
                <line x1="62" y1="100" x2="100" y2="100" stroke="rgba(209,173,104,0.22)" strokeWidth="0.4" />
                {/* Knob */}
                <circle cx="65" cy="93" r="2.2" fill="url(#gate-gold)" opacity="0.8" />
            </g>

            {/* Keystone */}
            <polygon points="60,8 67,22 53,22" fill="none" stroke="url(#gate-gold)" strokeWidth="0.9" opacity="0.6" />
            <circle cx="60" cy="8" r="2" fill="url(#gate-gold)" opacity="0.75" filter="url(#gate-glow)">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Ground line */}
            <line x1="4" y1="130" x2="116" y2="130" stroke="url(#gate-gold)" strokeWidth="1" opacity="0.4" />

            {/* Light beam through open gate */}
            <path d="M60 130 L40 54 Q60 40 80 54 Z" fill="rgba(232,201,122,0)" style={{ animation: 'gate-beam 4s ease-in-out 0.6s forwards' }} />
        </svg>
    );
}

/* ── Atmospheric opening gate — submission portal background ──────── */
function PortalGateBackdrop() {
    return (
        <svg
            className="portal-gate-backdrop"
            aria-hidden="true"
            viewBox="0 0 600 600"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="portal-gate-gold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8c97a" />
                    <stop offset="100%" stopColor="#b9924e" />
                </linearGradient>
                <radialGradient id="portal-gate-beam" cx="50%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="rgba(232,201,122,0.16)" />
                    <stop offset="60%" stopColor="rgba(232,201,122,0.05)" />
                    <stop offset="100%" stopColor="rgba(232,201,122,0)" />
                </radialGradient>
                <filter id="portal-gate-soft">
                    <feGaussianBlur stdDeviation="2.4" />
                </filter>
            </defs>

            {/* Soft light well behind the gate */}
            <ellipse cx="300" cy="300" rx="210" ry="240" fill="url(#portal-gate-beam)" style={{ animation: 'portal-gate-glow 9s ease-in-out infinite' }} />

            {/* Outer archway */}
            <path d="M120 540 L120 250 Q120 90 300 90 Q480 90 480 250 L480 540" stroke="url(#portal-gate-gold)" strokeWidth="2.4" opacity="0.22" />
            {/* Inner arch */}
            <path d="M170 540 L170 268 Q170 150 300 150 Q430 150 430 268 L430 540" stroke="url(#portal-gate-gold)" strokeWidth="1.4" opacity="0.14" />

            {/* Left gate panel — gently breathes open */}
            <g style={{ transformOrigin: '170px 540px', animation: 'portal-gate-left 12s ease-in-out infinite' }}>
                <rect x="170" y="250" width="125" height="290" fill="rgba(179,139,70,0.04)" stroke="url(#portal-gate-gold)" strokeWidth="1.6" opacity="0.18" />
                <line x1="200" y1="290" x2="200" y2="500" stroke="rgba(209,173,104,0.12)" strokeWidth="1" />
                <line x1="170" y1="370" x2="295" y2="370" stroke="rgba(209,173,104,0.12)" strokeWidth="1" />
                <line x1="170" y1="430" x2="295" y2="430" stroke="rgba(209,173,104,0.08)" strokeWidth="0.8" />
                <circle cx="285" cy="395" r="6" fill="url(#portal-gate-gold)" opacity="0.22" />
            </g>

            {/* Right gate panel — gently breathes open */}
            <g style={{ transformOrigin: '430px 540px', animation: 'portal-gate-right 12s ease-in-out infinite' }}>
                <rect x="305" y="250" width="125" height="290" fill="rgba(179,139,70,0.04)" stroke="url(#portal-gate-gold)" strokeWidth="1.6" opacity="0.18" />
                <line x1="400" y1="290" x2="400" y2="500" stroke="rgba(209,173,104,0.12)" strokeWidth="1" />
                <line x1="305" y1="370" x2="430" y2="370" stroke="rgba(209,173,104,0.12)" strokeWidth="1" />
                <line x1="305" y1="430" x2="430" y2="430" stroke="rgba(209,173,104,0.08)" strokeWidth="0.8" />
                <circle cx="315" cy="395" r="6" fill="url(#portal-gate-gold)" opacity="0.22" />
            </g>

            {/* Keystone */}
            <polygon points="300,72 318,104 282,104" fill="none" stroke="url(#portal-gate-gold)" strokeWidth="1.6" opacity="0.2" />
            <circle cx="300" cy="72" r="5" fill="url(#portal-gate-gold)" opacity="0.3" filter="url(#portal-gate-soft)">
                <animate attributeName="opacity" values="0.18;0.4;0.18" dur="7s" repeatCount="indefinite" />
            </circle>

            {/* Ground line */}
            <line x1="80" y1="540" x2="520" y2="540" stroke="url(#portal-gate-gold)" strokeWidth="1.6" opacity="0.16" />

            {/* Descending light beam through the opening */}
            <path d="M300 540 L230 250 Q300 200 370 250 Z" fill="rgba(232,201,122,0.05)" style={{ animation: 'portal-gate-beam 12s ease-in-out infinite' }} />
        </svg>
    );
}

/* ── Pitch an Idea: a constellation seed ──────────────────────────── */
function PitchSeedSvg() {
  return (
    <svg
      className="path-glyph path-glyph-seed"
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="seed-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232,201,122,0.95)" />
          <stop offset="45%" stopColor="rgba(209,173,104,0.55)" />
          <stop offset="100%" stopColor="rgba(179,139,70,0)" />
        </radialGradient>
        <filter id="seed-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* outer orbit ring */}
      <circle cx="60" cy="60" r="46" stroke="rgba(179,139,70,0.22)" strokeWidth="0.6" strokeDasharray="2 4" />
      {/* rotating orbit with satellite stars */}
      <g style={{ transformOrigin: '60px 60px', animation: 'seed-orbit 18s linear infinite' }}>
        <circle cx="106" cy="60" r="1.6" fill="rgba(232,201,122,0.9)" filter="url(#seed-glow)" />
        <circle cx="14" cy="60" r="1.1" fill="rgba(209,173,104,0.7)" />
        <circle cx="60" cy="14" r="1.3" fill="rgba(232,201,122,0.8)" filter="url(#seed-glow)" />
      </g>

      {/* constellation lines forming around the seed */}
      <g stroke="rgba(209,173,104,0.4)" strokeWidth="0.5">
        <line x1="60" y1="60" x2="34" y2="40">
          <animate attributeName="opacity" values="0.15;0.7;0.15" dur="4.2s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="60" x2="86" y2="38">
          <animate attributeName="opacity" values="0.15;0.7;0.15" dur="5.1s" begin="0.6s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="60" x2="40" y2="84">
          <animate attributeName="opacity" values="0.15;0.7;0.15" dur="4.6s" begin="1.1s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="60" x2="84" y2="82">
          <animate attributeName="opacity" values="0.15;0.7;0.15" dur="5.4s" begin="1.7s" repeatCount="indefinite" />
        </line>
        <line x1="34" y1="40" x2="86" y2="38" stroke="rgba(179,139,70,0.18)" />
        <line x1="40" y1="84" x2="84" y2="82" stroke="rgba(179,139,70,0.18)" />
      </g>

      {/* surrounding twinkling stars */}
      <g fill="rgba(232,201,122,0.85)">
        <circle cx="34" cy="40" r="1.4" filter="url(#seed-glow)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="86" cy="38" r="1.2">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3.8s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="84" r="1.1">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4.1s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="84" cy="82" r="1.3" filter="url(#seed-glow)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="3.5s" begin="1.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* the seed core — breathing glow */}
      <circle cx="60" cy="60" r="14" fill="url(#seed-core)" style={{ animation: 'seed-breathe 4s ease-in-out infinite' }} />
      <circle cx="60" cy="60" r="3" fill="rgba(255,247,224,0.95)" filter="url(#seed-glow)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ── Submit Completed Work: the sealed gate ───────────────────────── */
function GateSealedSvg() {
  return (
    <svg
      className="path-glyph path-glyph-gate"
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gate2-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8c97a" />
          <stop offset="100%" stopColor="#b9924e" />
        </linearGradient>
        <linearGradient id="gate2-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(232,201,122,0)" />
          <stop offset="50%" stopColor="rgba(232,201,122,0.5)" />
          <stop offset="100%" stopColor="rgba(232,201,122,0)" />
        </linearGradient>
        <filter id="gate2-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* descending light beam through the arch */}
      <path d="M60 16 L44 104 Q60 96 76 104 Z" fill="url(#gate2-beam)" opacity="0.5" style={{ animation: 'gate2-beam 4.5s ease-in-out infinite' }} />

      {/* archway frame */}
      <path d="M16 104 L16 52 Q16 18 60 18 Q104 18 104 52 L104 104" stroke="url(#gate2-gold)" strokeWidth="1.3" opacity="0.6" />
      {/* inner arch */}
      <path d="M26 104 L26 56 Q26 30 60 30 Q94 30 94 56 L94 104" stroke="url(#gate2-gold)" strokeWidth="0.7" opacity="0.32" />

      {/* left gate panel — breathes open */}
      <g style={{ transformOrigin: '26px 104px', animation: 'gate2-panel-left 5s ease-in-out infinite' }}>
        <rect x="26" y="52" width="32" height="52" fill="rgba(179,139,70,0.07)" stroke="url(#gate2-gold)" strokeWidth="0.9" opacity="0.75" />
        <line x1="34" y1="62" x2="34" y2="96" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
        <line x1="26" y1="78" x2="58" y2="78" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
        <circle cx="54" cy="80" r="1.8" fill="url(#gate2-gold)" opacity="0.85" />
      </g>

      {/* right gate panel — breathes open */}
      <g style={{ transformOrigin: '94px 104px', animation: 'gate2-panel-right 5s ease-in-out infinite' }}>
        <rect x="62" y="52" width="32" height="52" fill="rgba(179,139,70,0.07)" stroke="url(#gate2-gold)" strokeWidth="0.9" opacity="0.75" />
        <line x1="86" y1="62" x2="86" y2="96" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
        <line x1="62" y1="78" x2="94" y2="78" stroke="rgba(209,173,104,0.35)" strokeWidth="0.5" />
        <circle cx="66" cy="80" r="1.8" fill="url(#gate2-gold)" opacity="0.85" />
      </g>

      {/* keystone */}
      <polygon points="60,12 66,24 54,24" fill="none" stroke="url(#gate2-gold)" strokeWidth="0.9" opacity="0.7" />
      <circle cx="60" cy="12" r="1.8" fill="url(#gate2-gold)" filter="url(#gate2-glow)">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* ground line */}
      <line x1="10" y1="104" x2="110" y2="104" stroke="url(#gate2-gold)" strokeWidth="0.9" opacity="0.4" />
    </svg>
  );
}

function ThirdLampContributePage() {
    const [path, setPath] = useState('pitch');
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [rejected, setRejected] = useState([]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setRejected([]);
        setSubmitting(true);
        const formEl = e.target;
        try {
            // Path goes first, as a label, so the editors' email opens with
            // "Path: Completed work" rather than ending on "path: completed".
            const fd = new FormData();
            fd.set('path', path === 'pitch' ? 'Pitch an idea' : 'Completed work');
            for (const [key, value] of new FormData(formEl)) fd.append(key, value);
            ['document_upload', 'image_attachments[]'].forEach((name) => {
                const input = formEl.querySelector(`[name="${name}"]`);
                if (input && input.files && input.files.length === 0) {
                    fd.delete(name);
                }
            });
            const result = await submitForm('submission', fd);
            // The submission is still delivered when a file is too large or of
            // an unaccepted type, so name the ones that didn't make it rather
            // than let the contributor assume everything arrived.
            if (Array.isArray(result.rejected) && result.rejected.length > 0) {
                setRejected(result.rejected);
            }
            setSent(true);
            formEl.reset();
        } catch (err) {
            console.error('Third Lamp submission failed', err);
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="third-lamp-scope">
            <Helmet>
                <title>The Open Gate | Contribute to The Third Lamp</title>
            </Helmet>
            <ThirdLampHeader active="contribute" />

            <main>
                <section className="open-gate-hero" aria-labelledby="open-gate-title">
                    <img src={`${A}/open-gate-angels.webp`} alt="A weathered stone archway in a misty forest, flanked by two winged angel statues, its iron gate standing open onto a path" />
                    <div className="open-gate-hero-shade" aria-hidden="true"></div>
                    <div className="open-gate-hero-copy">
                        <p className="kicker">Contribute to The Third Lamp</p>
                        <h1 id="open-gate-title">The Open Gate</h1>
                        <p className="open-gate-deck">Essays, research, art, interviews, translations, field notes, and practical studies illuminating the hidden dimensions of reality.</p>
                        <p className="open-gate-subtitle">Contributor and Submission Portal</p>
                        <div className="open-gate-actions">
                            <a className="tl-button" href="#open-call">View Open Calls</a>
                            <a className="tl-button tl-button-quiet" href="#submission-portal" onClick={() => setPath('pitch')}>Pitch an Article</a>
                            <a className="tl-button tl-button-quiet" href="#submission-portal" onClick={() => setPath('completed')}>Submit Completed Work</a>
                        </div>
                    </div>
                    <p className="open-gate-maxim">The gate is open, but the lamp remains guarded.</p>
                </section>

                <Reveal as="section" className="contribute-intro" aria-labelledby="why-contribute-title">
                    <figure className="contribute-intro-image" aria-hidden="true">
                        <img
                            src="/media/b0c3ff5ac251a375898678ea35a49e4d.webp"
                            alt="A scholar's desk by candlelight with an open manuscript, compass, and armillary sphere"
                        />
                    </figure>
                    <div className="contribute-intro-text">
                        <div>
                            <p className="kicker">Why Contribute?</p>
                            <h2 id="why-contribute-title">Help recover the intelligence carried by symbol, practice, and living memory.</h2>
                        </div>
                        <div>
                            <p>The Third Lamp is a meeting place for serious inquiry across esotericism, philosophy, sacred science, ritual, history, art, and the material traces of hidden traditions.</p>
                            <p>We seek work that can move between archive and experience without surrendering rigor. Contributors write for an attentive international readership that values depth, clarity, beautiful evidence, and honest uncertainty.</p>
                        </div>
                    </div>
                </Reveal>

                <section className="publish-section" aria-labelledby="publish-title">
                    <Reveal as="header" className="contribute-section-head">
                        <p className="kicker">What We Publish</p>
                        <h2 id="publish-title">Eight forms of contribution</h2>
                        <p>Choose the form that best serves the work. Boundaries may overlap; editorial purpose matters more than category.</p>
                    </Reveal>
                    <div className="publish-grid">
                        {publishTypes.map((t, i) => (
                            <Reveal key={t.n} delay={(i % 4) * 90} className="publish-card-reveal">
                                <PublishCard n={t.n} title={t.title} copy={t.copy} />
                            </Reveal>
                        ))}
                    </div>
                </section>

                <nav className="open-call-index" aria-label="Forthcoming issues">
                    <div className="open-call-index-intro">
                        <p className="kicker">Forthcoming Issues</p>
                        <p>Two open calls, presented in publication order.</p>
                        <span aria-hidden="true">✣</span>
                    </div>
                    <a href="#open-call">
                        <span>Issue II</span>
                        <strong>The Green Crucible</strong>
                        <small>Alchemy, herbalism, and living matter</small>
                    </a>
                    <a href="#issue-iii">
                        <span>Issue III</span>
                        <strong>Those Who Descended</strong>
                        <small>Forbidden knowledge and divine teachers</small>
                    </a>
                </nav>

                <section className="open-call open-call-issue-ii open-call-issue-ii-bg" id="open-call" aria-labelledby="issue-ii-title">
                    <figure className="open-call-art">
                        <img src={`${A}/green-crucible-oasis-vertical.webp`} alt="A clear green oasis winding through an arid landscape" />
                        <blockquote className="open-call-art-quote">
                            <p>Every plant is a scripture written in living chemistry.</p>
                            <cite>Paracelsus</cite>
                        </blockquote>
                        <figcaption>Issue II · The green intelligence within matter</figcaption>
                    </figure>
                    <div className="open-call-copy open-call-copy-with-bg">
                        <img src="/media/36093a05-9ee0-471c-a093-64b5b39b0f6d.webp" alt="" className="open-call-bg-image" aria-hidden="true" />
                        <div className="open-call-bg-overlay"></div>
                        <div className="open-call-copy-content">
                            <p className="kicker">The Open Gate · Submissions for Issue II</p>
                            <h2 id="issue-ii-title">The Green Crucible</h2>
                            <p className="open-call-subtitle">Alchemy, Herbalism, and the Intelligence of Living Matter</p>
                            <p className="open-call-meta"><span>Issue II</span><span>Spring 2027</span><span>Open Call</span></p>
                            <p className="open-call-lede">An issue devoted to alchemy, herbalism, spagyrics, plant virtue, historical herbals, botanical art, sacred ecology, and the responsible study of living matter as medicine, symbol, and transformative intelligence.</p>
                            <blockquote className="open-call-quote">
                                <p>The Earth is a laboratory older than any empire, and every leaf a metaphysical instrument.</p>
                                <cite>Avicenna</cite>
                            </blockquote>
                            <dl className="open-call-calendar" aria-label="Issue II open call calendar">
                                <div><span className="lantern-icon" aria-hidden="true"></span><dt>Call status</dt><dd>Open now</dd></div>
                                <div><HourglassIcon size={32} /><dt>Submission deadline</dt><dd>To be announced</dd></div>
                                <div><span aria-hidden="true">✦</span><dt>Publication order</dt><dd>Before Issue III</dd></div>
                            </dl>
                            <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: '1.8' }}>The study of plants is the study of life itself.</p>
                            <div className="open-call-columns">
                                <div>
                                    <h3>We Are Seeking</h3>
                                    <ul className="ruled-list">{seeking2.map((s) => <li key={s}>{s}</li>)}</ul>
                                </div>
                                <div>
                                    <h3>Suggested Formats</h3>
                                    <ul className="format-list">{formats.map((f) => <li key={f[0]}><span>{f[0]}</span><strong>{f[1]}</strong></li>)}</ul>
                                </div>
                            </div>
                            <div className="editorial-questions">
                                <h3>Editorial Questions</h3>
                                <ol>{questions2.map((q) => <li key={q}>{q}</li>)}</ol>
                            </div>
                            <div className="open-call-cta-row">
                                <a className="tl-button" href="#submission-portal" onClick={() => setPath('pitch')}>Pitch for The Green Crucible</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="open-call open-call-issue-iii" id="issue-iii" aria-labelledby="issue-iii-title">
                    <figure className="open-call-art">
                        <img src={`${A}/melchizedek-throne-altar.webp`} alt="An ancient stone throne and altar illuminated by a descending shaft of light" />
                        <figcaption>Issue III · The descent of forbidden wisdom</figcaption>
                    </figure>
                    <div className="open-call-copy">
                        <p className="kicker">The Open Gate · Submissions for Issue III</p>
                        <h2 id="issue-iii-title">Those Who Descended</h2>
                        <p className="open-call-subtitle">Angels, Gods, Teachers, and the Origins of Forbidden Knowledge</p>
                        <p className="open-call-meta"><span>Issue III</span><span>March 2027</span><span>Open Call</span></p>
                        <p className="open-call-lede">An issue tracing traditions of descent, revelation, sacred instruction, transgression, and the perilous gifts said to have entered human history from beyond its ordinary bounds.</p>
                        <figure style={{ margin: '32px 0 0', padding: 0, border: '1px solid rgba(179,139,70,0.34)', overflow: 'hidden', maxWidth: '830px' }}>
                            <img
                                src="/media/2d506753-16de-43b9-bde7-4fb1130ae386.webp"
                                alt="Ancient Mesopotamian stone relief sculpture of a bearded deity figure wearing a horned crown, carved in limestone, set within an arched niche"
                                style={{ display: 'block', width: '100%', height: 'auto' }}
                            />
                        </figure>
                        <blockquote className="open-call-adapa-quote" style={{ marginTop: 0, borderTop: 0 }}>
                            <p>"Ea made him broad of understanding, revealing to him the design of the land."</p>
                            <cite>Epic of Adapa</cite>
                        </blockquote>
                        <dl className="open-call-calendar" aria-label="Open call calendar">
                            <div><span aria-hidden="true">✶</span><dt>Theme announced</dt><dd><time dateTime="2026-07-17">July 17, 2026</time></dd></div>
                            <div><HourglassIcon size={32} /><dt>Submission deadline</dt><dd><time dateTime="2026-10-31">October 31, 2026</time></dd></div>
                            <div><span aria-hidden="true">✦</span><dt>Publication date</dt><dd><time dateTime="2027-03-20">March 20, 2027</time></dd></div>
                        </dl>
                        <div className="open-call-columns">
                            <div>
                                <h3>We Are Seeking</h3>
                                <ul className="ruled-list">{seeking3.map((s) => <li key={s}>{s}</li>)}</ul>
                            </div>
                            <div>
                                <h3>Suggested Formats</h3>
                                <ul className="format-list">{formats.map((f) => <li key={f[0]}><span>{f[0]}</span><strong>{f[1]}</strong></li>)}</ul>
                            </div>
                        </div>
                        <div className="editorial-questions">
                            <h3>Editorial Questions</h3>
                            <ol>{questions3.map((q) => <li key={q}>{q}</li>)}</ol>
                        </div>
                        <div className="open-call-cta-row">
                            <a className="tl-button" href="#submission-portal" onClick={() => setPath('pitch')}>Pitch for Those Who Descended</a>
                        </div>
                    </div>
                </section>

                <section className="open-call-contributors-wrapper" aria-label="Featured contributors">
                    <div className="open-call-contributors-header">
                        <p className="kicker">Featured Contributors</p>
                        <p>Past and present voices gathered around the lamp, with room for new work to enter the circle.</p>
                    </div>
                    <div className="open-call-contributors-scroll">
                        <div className="open-call-contributors">
                            <figure>
                                <img src={`${A}/author-drew-mackinnon.webp`} alt="Drew MacKinnon" />
                                <figcaption>
                                    <strong>Drew MacKinnon</strong>
                                    <small>Author · Researcher · Photographer</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="/media/fac6744621da1f040468be8de464350f.webp" alt="Jacob Trayer" />
                                <figcaption>
                                    <strong>Jake Treyer</strong>
                                    <small>Freemason · Esoteric Scholar</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src={`${A}/author-ike-baker.webp`} alt="Ike Baker" />
                                <figcaption>
                                    <strong>Ike Baker</strong>
                                    <small>Author · Lecturer · Ceremonialist</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src={`${A}/author-jaime-paul-lamb.webp`} alt="Jaime Paul Lamb" />
                                <figcaption>
                                    <strong>Jaime Paul Lamb</strong>
                                    <small>Author · Astrologer · Scholar</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src={`${A}/author-daniel-wiseman.webp`} alt="Daniel Wiseman" />
                                <figcaption>
                                    <strong>Daniel Wiseman</strong>
                                    <small>Herbalist · Spagyrist · Educator</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="/media/53acf5993dfdcc0dcc202bdec0263601.webp" alt="Travis Lawrence" />
                                <figcaption>
                                    <strong>Travis Lawrence</strong>
                                    <small>Artist · Printmaker</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="/media/2afc956520653a1dcfad983538e8b58a.webp" alt="James Oliva" />
                                <figcaption>
                                    <strong>James Oliva</strong>
                                    <small>Author · Podcast Host</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <img src="/media/2f0b44a81c9995fbb977e405695a7447.webp" alt="Magick Mike Samu" />
                                <figcaption>
                                    <strong>Magick Mike Samu</strong>
                                    <small>Author · Freemason · Practitioner</small>
                                </figcaption>
                            </figure>
                            <figure>
                                <span className="open-call-contributor-placeholder" aria-hidden="true">JPL</span>
                                <figcaption>
                                    <strong>Frater I.A.Q.V.</strong>
                                    <small>Author · Founder</small>
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                    <p className="open-call-new-voices">...and new voices.</p>
                </section>

                <Reveal as="section" className="standards-section" aria-labelledby="standards-title">
                    <header className="contribute-section-head">
                        <p className="kicker">Contributor Standards</p>
                        <h2 id="standards-title">Sincere Voice. Living Depth. Intellectual Curiosity.</h2>
                    </header>
                    <div className="standards-intro">
                        <p>We welcome work shaped by sincerity, authenticity, and real engagement. This is not an academic journal. We value clear intention, intellectual curiosity, respect for living traditions, and writing that is honest about its perspective. Opinion has its place here when it is clearly presented as opinion, and strong textual experimentation is welcome when it remains purposeful.</p>
                    </div>
                    <ul className="standards-grid">
                        {standards.map((s) => (
                            <li key={s.n}>
                                <span className="standards-num">{s.n}</span>
                                <h3>{s.title}</h3>
                                <p className="standards-subtitle">{s.subtitle}</p>
                                <p className="standards-copy">{s.copy}</p>
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <section className="process-section" aria-labelledby="process-title">
                    <p className="pitch-guidance">Planning a long feature? Pitch first. A short proposal lets the editorial team help shape the work before you commit thousands of words.</p>
                </section>

                <Reveal as="section" className="benefits-section benefits-constellation" aria-labelledby="benefits-title">
                    <ConstellationBg />
                    <div style={{position:'relative',zIndex:1}}>
                        <p className="kicker">Contributor Benefits</p>
                        <h2 id="benefits-title">Your work enters a wider constellation.</h2>
                    </div>
                    <ul style={{position:'relative',zIndex:1}}>{benefits.map((b) => <li key={b}>{b}</li>)}</ul>
                </Reveal>

                <section className="gate-faq-section" aria-labelledby="faq-title">
                    <Reveal className="gate-faq-head">
                        <p className="kicker">Frequently Asked Questions</p>
                        <div className="gate-faq-heading-row">
                            <GateSvg />
                            <h2 id="faq-title">Before you approach the gate</h2>
                        </div>
                    </Reveal>
                    <div className="gate-faq-grid">
                        {faqs.map((f, i) => (
                            <Reveal key={f.q} delay={(i % 2) * 90}>
                                <FaqItem q={f.q} a={f.a} />
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section className="submission-portal" id="submission-portal" aria-labelledby="portal-title">
                    <PortalGateBackdrop />
                    <header className="portal-head">
                        <p className="kicker">Contributor and Submission Portal</p>
                        <h2 id="portal-title">Send Your Work to The Third Lamp</h2>
                        <p>Choose the path that matches the state of your work. Long features should begin with a pitch.</p>
                    </header>

                    <div className="submission-paths" role="group" aria-label="Choose submission path">
                        <button className={`submission-path${path === 'pitch' ? ' active' : ''}`} type="button" aria-pressed={path === 'pitch'} onClick={() => setPath('pitch')}>
                            <PitchSeedSvg />
                            <span>Path I</span><strong>Pitch an Idea</strong><small>Begin with a 150–300-word proposal.</small>
                        </button>
                        <button className={`submission-path${path === 'completed' ? ' active' : ''}`} type="button" aria-pressed={path === 'completed'} onClick={() => setPath('completed')}>
                            <GateSealedSvg />
                            <span>Path II</span><strong>Submit Completed Work</strong><small>Send a finished essay, artwork, translation, or review.</small>
                        </button>
                    </div>

                    <form className="contributor-form" onSubmit={onSubmit}>
                        <fieldset>
                            <legend><span>01</span>About You</legend>
                            <div className="form-grid">
                                <label><span>Name</span><input type="text" name="name" autoComplete="name" required /></label>
                                <label><span>Pen name</span><input type="text" name="pen_name" /></label>
                                <label><span>Email</span><input type="email" name="email" autoComplete="email" required /></label>
                                <label><span>Location or region <small>Optional</small></span><input type="text" name="region" /></label>
                                <label><span>Website or portfolio 1 <small>Optional</small></span><input type="url" name="website_1" placeholder="https://" /></label>
                                <label><span>Website or portfolio 2 <small>Optional</small></span><input type="url" name="website_2" placeholder="https://" /></label>
                                <label><span>Website or portfolio 3 <small>Optional</small></span><input type="url" name="website_3" placeholder="https://" /></label>
                                <label><span>Social links</span><input type="text" name="social_links" placeholder="One or more profile links" /></label>
                                <label className="form-wide"><span>Short biography</span><textarea name="biography" rows={5} required></textarea></label>
                                <label className="form-wide"><span>Areas of study or practice</span><textarea name="areas_of_study" rows={4} required></textarea></label>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend><span>02</span>Your Submission</legend>
                            <div className="form-grid">
                                <label className="form-wide"><span>Proposed title</span><input type="text" name="proposed_title" required /></label>
                                <label>
                                    <span>Submission type</span>
                                    <select name="submission_type" required defaultValue="">
                                        <option value="">Choose a category</option>
                                        <option>Essay or Feature</option>
                                        <option>Research Note</option>
                                        <option>Practical Work</option>
                                        <option>Translation or Archival Material</option>
                                        <option>Interview or Conversation</option>
                                        <option>Art or Visual Essay</option>
                                        <option>Review</option>
                                        <option>Field Notes</option>
                                    </select>
                                </label>
                                <label>
                                    <span>Related issue</span>
                                    <select name="related_issue" required defaultValue="Issue II — The Green Crucible">
                                        <option>Issue II — The Green Crucible</option>
                                        <option>Issue III — Those Who Descended</option>
                                        <option>Future themed issue</option>
                                        <option>Living Archive / Open consideration</option>
                                    </select>
                                </label>
                            </div>

                            {path === 'pitch' ? (
                                <div className="path-fields">
                                    <p className="path-fields-intro">A concise proposal gives the editors room to shape a long feature with you before the full draft begins.</p>
                                    <div className="form-grid">
                                        <label className="form-wide"><span>150–300-word summary</span><textarea name="pitch_summary" rows={8} required></textarea></label>
                                        <label className="form-wide"><span>Why it fits this issue</span><textarea name="issue_fit" rows={5} required></textarea></label>
                                        <label><span>Estimated word count</span><input type="number" name="estimated_word_count" min={300} max={10000} step={50} required /></label>
                                        <label><span>Relevant experience</span><input type="text" name="relevant_experience" required /></label>
                                        <label className="form-wide"><span>Sources you expect to use</span><textarea name="expected_sources" rows={5} required></textarea></label>
                                        <label className="form-wide"><span>Links to previous work</span><textarea name="previous_work_links" rows={3} placeholder="One link per line"></textarea></label>
                                    </div>
                                </div>
                            ) : (
                                <div className="path-fields">
                                    <p className="path-fields-intro">Upload a complete draft and enough supporting information for a substantive editorial review.</p>
                                    <div className="form-grid">
                                        <label className="form-wide"><span>Short abstract</span><textarea name="completed_abstract" rows={6}></textarea></label>
                                        <label><span>Final word count</span><input type="number" name="final_word_count" min={100} max={15000} step={50} /></label>
                                        <label><span>Full document</span><input type="file" name="document_upload" accept=".pdf,.doc,.docx,.odt,.rtf,.txt" /></label>
                                        <label className="form-wide"><span>Image attachments</span><input type="file" name="image_attachments[]" accept="image/*" multiple /></label>
                                        <label className="form-wide"><span>Sources or bibliography</span><textarea name="source_list" rows={7}></textarea></label>
                                    </div>
                                </div>
                            )}
                        </fieldset>

                        <fieldset>
                            <legend><span>03</span>Editorial Information</legend>
                            <div className="form-grid">
                                <label>
                                    <span>Has this appeared elsewhere?</span>
                                    <select name="prior_publication" required defaultValue=""><option value="">Choose one</option><option>No</option><option>Yes — in full</option><option>Yes — in part</option></select>
                                </label>
                                <label>
                                    <span>Under consideration elsewhere?</span>
                                    <select name="simultaneous_submission" required defaultValue=""><option value="">Choose one</option><option>No</option><option>Yes</option></select>
                                </label>
                                <label>
                                    <span>Was generative AI used?</span>
                                    <select name="generative_ai_used" required defaultValue=""><option value="">Choose one</option><option>No</option><option>Yes — disclosed below</option></select>
                                </label>
                                <label><span>AI use details <small>If applicable</small></span><input type="text" name="ai_use_details" /></label>
                                <label className="form-wide"><span>Safety, medical, legal, or ethical concerns</span><textarea name="editorial_concerns" rows={5} placeholder="Describe any concern the editors should know about, or write None."></textarea></label>
                                <label className="check-row form-wide"><input type="checkbox" name="attribution_confirmed" required /><span>All quotations, references, and source material are properly attributed.</span></label>
                                <label className="check-row form-wide"><input type="checkbox" name="image_rights_confirmed" required /><span>I own or have permission to use all submitted artwork and images.</span></label>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend><span>04</span>Agreement</legend>
                            <div className="agreement-list">
                                <label className="check-row"><input type="checkbox" name="agreed_original_work" required /><span>This work is original and I have disclosed any prior publication.</span></label>
                                <label className="check-row"><input type="checkbox" name="agreed_accuracy" required /><span>The work is accurate to the best of my knowledge.</span></label>
                                <label className="check-row"><input type="checkbox" name="agreed_editorial_revision" required /><span>I am open to collaborative editorial revision.</span></label>
                                <label className="check-row"><input type="checkbox" name="agreed_no_guaranteed_acceptance" required /><span>I understand that submission does not guarantee acceptance.</span></label>
                                <label className="check-row"><input type="checkbox" name="agreed_no_guaranteed_publication" required /><span>I understand that acceptance does not guarantee immediate publication.</span></label>
                                <label className="check-row"><input type="checkbox" name="agreed_contributor_terms" required /><span>I agree to the contributor terms described on this page.</span></label>
                            </div>
                        </fieldset>

                        <div className="form-submit-row">
                            <p aria-live="polite">{error || (sent ? 'Thank you. Your submission has been forwarded to the editors at 3rdlamp@3magipress.com.' : 'Submissions are forwarded privately to the editors at 3rdlamp@3magipress.com.')}</p>
                            {sent && rejected.length > 0 && (
                                <div className="form-attachment-warning" role="alert">
                                    <p>Your submission was sent, but these files could not be attached — please email them to 3rdlamp@3magipress.com:</p>
                                    <ul>{rejected.map((r) => <li key={r}>{r}</li>)}</ul>
                                </div>
                            )}
                            <button className="tl-button" type="submit" disabled={submitting}>{submitting ? 'Sending…' : path === 'pitch' ? 'Send My Pitch' : 'Send My Work'}</button>
                        </div>
                    </form>
                </section>
            </main>

            <ThirdLampFooter />
        </div>
    );
}

export default ThirdLampContributePage;

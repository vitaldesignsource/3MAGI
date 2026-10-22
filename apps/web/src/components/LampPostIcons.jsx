/* LampPostIcons.jsx — Animated SVG icons for The Lamp Post section headers */

/* Rare Books & Manuscripts (Grimoires) — drifting rune glyphs */
export function GrimoireIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .gi-rune { animation: none !important; }
        }
        .gi-rune1 { animation: gi-drift1 4s ease-in-out infinite; }
        .gi-rune2 { animation: gi-drift2 5s ease-in-out infinite 0.8s; }
        .gi-rune3 { animation: gi-drift3 4.5s ease-in-out infinite 1.6s; }
        @keyframes gi-drift1 {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes gi-drift2 {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50%       { transform: translateY(-4px); opacity: 0.9; }
        }
        @keyframes gi-drift3 {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
      {/* Book body */}
      <rect x="10" y="10" width="38" height="46" rx="2" stroke="#C9A961" strokeWidth="1.5" fill="rgba(201,169,97,0.08)"/>
      <rect x="10" y="10" width="8" height="46" rx="2" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.14)"/>
      {/* Binding lines */}
      <line x1="18" y1="10" x2="18" y2="56" stroke="#C9A961" strokeWidth="0.8" opacity="0.6"/>
      {/* Rune glyphs floating on pages */}
      <text x="24" y="26" fontSize="9" fill="#C9A961" className="gi-rune1" style={{fontFamily:'serif'}}>ᚨ</text>
      <text x="36" y="35" fontSize="7" fill="#C9A961" className="gi-rune2" style={{fontFamily:'serif'}}>ᚱ</text>
      <text x="24" y="44" fontSize="8" fill="#C9A961" className="gi-rune3" style={{fontFamily:'serif'}}>ᚷ</text>
      {/* Decorative corner ornament */}
      <path d="M42 14 L46 14 L46 18" stroke="#C9A961" strokeWidth="0.9" opacity="0.7"/>
      <path d="M42 52 L46 52 L46 48" stroke="#C9A961" strokeWidth="0.9" opacity="0.7"/>
    </svg>
  );
}

/* Auction Highlights — animated gavel strike */
export function AuctionIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ai-hammer { animation: none !important; }
          .ai-ring { animation: none !important; opacity: 0 !important; }
        }
        .ai-hammer { animation: ai-strike 2.4s cubic-bezier(0.36,0.07,0.19,0.97) infinite; transform-origin: 46px 16px; }
        @keyframes ai-strike {
          0%   { transform: rotate(-38deg); }
          35%  { transform: rotate(-38deg); }
          55%  { transform: rotate(0deg); }
          65%  { transform: rotate(0deg); }
          80%  { transform: rotate(-38deg); }
          100% { transform: rotate(-38deg); }
        }
        .ai-ring { animation: ai-expand 2.4s ease-out infinite; transform-origin: 32px 48px; }
        @keyframes ai-expand {
          0%, 53% { r: 2; opacity: 0; }
          56%     { r: 2; opacity: 0.8; }
          100%    { r: 14; opacity: 0; }
        }
      `}</style>
      <rect x="10" y="44" width="42" height="8" rx="2" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.1)"/>
      <g className="ai-hammer">
        <rect x="26" y="12" width="32" height="11" rx="2.5" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.15)"/>
        <line x1="30" y1="23" x2="22" y2="44" stroke="#C9A961" strokeWidth="2"/>
      </g>
      <circle cx="32" cy="48" r="6" stroke="#C9A961" strokeWidth="1" className="ai-ring" fill="none"/>
      <text x="12" y="26" fontSize="8" fill="#C9A961" opacity="0.5" style={{fontFamily:'serif'}}>◈</text>
    </svg>
  );
}

/* Current & Upcoming Exhibitions — animated archway with scanning light */
export function ExhibitionIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ei-beam { animation: none !important; opacity: 0.4 !important; }
          .ei-star { animation: none !important; }
        }
        .ei-beam { animation: ei-sweep 3s ease-in-out infinite; transform-origin: 32px 54px; }
        @keyframes ei-sweep {
          0%, 100% { transform: rotate(-18deg); opacity: 0.6; }
          50%       { transform: rotate(18deg);  opacity: 0.9; }
        }
        .ei-star { animation: ei-twinkle 1.8s ease-in-out infinite; }
        @keyframes ei-twinkle {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
      `}</style>
      <rect x="9" y="30" width="6" height="26" stroke="#C9A961" strokeWidth="1.1" fill="rgba(201,169,97,0.08)"/>
      <rect x="49" y="30" width="6" height="26" stroke="#C9A961" strokeWidth="1.1" fill="rgba(201,169,97,0.08)"/>
      <path d="M9 30 Q9 10 32 10 Q55 10 55 30" stroke="#C9A961" strokeWidth="1.4" fill="none"/>
      <line x1="6" y1="56" x2="58" y2="56" stroke="#C9A961" strokeWidth="0.9" opacity="0.5"/>
      <path d="M32 18 L18 56 L46 56 Z" fill="rgba(201,169,97,0.12)" className="ei-beam"/>
      <text x="27" y="40" fontSize="10" fill="#C9A961" className="ei-star" style={{fontFamily:'serif'}}>☉</text>
    </svg>
  );
}

/* Best Permanent Collections — orbiting dot around library vault */
export function CollectionIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ci-orbit { animation: none !important; }
          .ci-glow  { animation: none !important; }
        }
        .ci-orbit { animation: ci-rotate 5s linear infinite; transform-origin: 32px 32px; }
        @keyframes ci-rotate { to { transform: rotate(360deg); } }
        .ci-glow { animation: ci-pulse 2.5s ease-in-out infinite; }
        @keyframes ci-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.85; }
        }
      `}</style>
      <rect x="8" y="48" width="48" height="3" rx="0.5" stroke="#C9A961" strokeWidth="1" fill="rgba(201,169,97,0.1)"/>
      <rect x="8" y="37" width="48" height="3" rx="0.5" stroke="#C9A961" strokeWidth="1" fill="rgba(201,169,97,0.1)"/>
      <rect x="8" y="26" width="48" height="3" rx="0.5" stroke="#C9A961" strokeWidth="1" fill="rgba(201,169,97,0.1)"/>
      {[14,20,26,32,38,44].map((x, i) => (
        <rect key={i} x={x} y={i%2===0?28:38} width="3" height={9} rx="0.5"
          fill="rgba(201,169,97,0.25)" stroke="#C9A961" strokeWidth="0.7"/>
      ))}
      <circle cx="32" cy="32" r="20" stroke="#C9A961" strokeWidth="0.7" strokeDasharray="3 4" className="ci-glow"/>
      <g className="ci-orbit">
        <circle cx="32" cy="12" r="3" fill="#C9A961"/>
      </g>
    </svg>
  );
}

/* Archaeological Discoveries — trowel excavating with particles */
export function ArchaeologyIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .arci-trowel { animation: none !important; }
          .arci-particle { animation: none !important; opacity: 0 !important; }
          .arci-glyph { animation: none !important; }
        }
        .arci-trowel { animation: arci-dig 2.6s ease-in-out infinite; transform-origin: 44px 20px; }
        @keyframes arci-dig {
          0%   { transform: rotate(0deg); }
          30%  { transform: rotate(18deg); }
          55%  { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .arci-particle { animation: arci-scatter 2.6s ease-out infinite; opacity: 0; }
        .arci-p1 { animation-delay: 0.3s; }
        .arci-p2 { animation-delay: 0.45s; }
        .arci-p3 { animation-delay: 0.38s; }
        @keyframes arci-scatter {
          0%, 27%  { opacity: 0; transform: translate(0,0); }
          30%      { opacity: 1; }
          80%      { opacity: 0.2; }
          100%     { opacity: 0; }
        }
        .arci-glyph { animation: arci-emerge 4s ease-in-out infinite; }
        @keyframes arci-emerge {
          0%, 100% { opacity: 0.18; }
          55%       { opacity: 0.75; }
        }
      `}</style>
      <rect x="6" y="42" width="52" height="5" rx="0.5" fill="rgba(201,169,97,0.18)" stroke="#C9A961" strokeWidth="0.9"/>
      <rect x="6" y="47" width="52" height="8" rx="0.5" fill="rgba(201,169,97,0.10)" stroke="#C9A961" strokeWidth="0.8"/>
      <path d="M16 42 L16 47 L32 47 L32 42" stroke="#C9A961" strokeWidth="0.9" fill="rgba(4,7,7,0.6)"/>
      <text x="19" y="47" fontSize="8" fill="#C9A961" className="arci-glyph" style={{fontFamily:'serif'}}>△</text>
      <g className="arci-trowel">
        <path d="M38 18 L52 8 L56 12 L42 22 Z" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.2)"/>
        <line x1="38" y1="18" x2="22" y2="38" stroke="#C9A961" strokeWidth="2"/>
        <rect x="17" y="35" width="8" height="5" rx="1.5" stroke="#C9A961" strokeWidth="0.9" fill="rgba(201,169,97,0.2)"/>
      </g>
      <circle cx="28" cy="38" r="2" fill="#C9A961" className="arci-particle arci-p1"/>
      <circle cx="28" cy="38" r="1.4" fill="#C9A961" className="arci-particle arci-p2"/>
      <circle cx="28" cy="38" r="1.6" fill="#C9A961" className="arci-particle arci-p3"/>
    </svg>
  );
}

/* New Translations of Ancient Texts — animated scroll unrolling with script lines */
export function TranslationsIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ti-scroll { animation: none !important; }
          .ti-line { animation: none !important; opacity: 1 !important; }
          .ti-glyph { animation: none !important; }
        }
        .ti-scroll { animation: ti-unroll 3.6s ease-in-out infinite; transform-origin: 32px 32px; }
        @keyframes ti-unroll {
          0%, 20%  { transform: scaleX(0.55); }
          60%, 80% { transform: scaleX(1); }
          100%     { transform: scaleX(0.55); }
        }
        .ti-line1 { animation: ti-appear 3.6s ease-in-out infinite; }
        .ti-line2 { animation: ti-appear 3.6s ease-in-out infinite 0.2s; }
        .ti-line3 { animation: ti-appear 3.6s ease-in-out infinite 0.4s; }
        @keyframes ti-appear {
          0%, 25%  { opacity: 0; }
          55%, 75% { opacity: 1; }
          100%     { opacity: 0; }
        }
        .ti-glyph { animation: ti-shimmer 2.2s ease-in-out infinite; }
        @keyframes ti-shimmer {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
      `}</style>
      {/* Scroll rollers */}
      <ellipse cx="32" cy="14" rx="22" ry="5" stroke="#C9A961" strokeWidth="1.3" fill="rgba(201,169,97,0.12)"/>
      <ellipse cx="32" cy="50" rx="22" ry="5" stroke="#C9A961" strokeWidth="1.3" fill="rgba(201,169,97,0.12)"/>
      {/* Scroll body */}
      <g className="ti-scroll">
        <rect x="10" y="14" width="44" height="36" fill="rgba(201,169,97,0.07)" stroke="#C9A961" strokeWidth="1"/>
        {/* Script lines */}
        <line x1="16" y1="24" x2="48" y2="24" stroke="#C9A961" strokeWidth="1.2" className="ti-line1"/>
        <line x1="16" y1="31" x2="44" y2="31" stroke="#C9A961" strokeWidth="1.2" className="ti-line2"/>
        <line x1="16" y1="38" x2="40" y2="38" stroke="#C9A961" strokeWidth="1.2" className="ti-line3"/>
        {/* Ancient glyph */}
        <text x="40" y="42" fontSize="9" fill="#C9A961" className="ti-glyph" style={{fontFamily:'serif'}}>𓂀</text>
      </g>
    </svg>
  );
}

/* Notable Academic Papers — animated paper with magnifying glass scanning */
export function PapersIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .pi-lens { animation: none !important; }
          .pi-highlight { animation: none !important; opacity: 0 !important; }
        }
        .pi-lens { animation: pi-scan 3s ease-in-out infinite; }
        @keyframes pi-scan {
          0%, 100% { transform: translate(0, 0); }
          25%      { transform: translate(12px, 0); }
          50%      { transform: translate(12px, 12px); }
          75%      { transform: translate(0, 12px); }
        }
        .pi-highlight { animation: pi-glow 3s ease-in-out infinite; }
        @keyframes pi-glow {
          0%, 10%  { opacity: 0; }
          30%      { opacity: 0.6; }
          70%      { opacity: 0.6; }
          90%, 100%{ opacity: 0; }
        }
      `}</style>
      {/* Paper stack */}
      <rect x="14" y="10" width="36" height="46" rx="2" stroke="#C9A961" strokeWidth="1.3" fill="rgba(201,169,97,0.07)"/>
      <rect x="10" y="12" width="36" height="46" rx="2" stroke="#C9A961" strokeWidth="1" fill="rgba(201,169,97,0.05)" opacity="0.6"/>
      {/* Text lines */}
      <line x1="20" y1="20" x2="44" y2="20" stroke="#C9A961" strokeWidth="0.9" opacity="0.5"/>
      <line x1="20" y1="26" x2="44" y2="26" stroke="#C9A961" strokeWidth="0.9" opacity="0.5"/>
      <line x1="20" y1="32" x2="44" y2="32" stroke="#C9A961" strokeWidth="0.9" opacity="0.5"/>
      <line x1="20" y1="38" x2="36" y2="38" stroke="#C9A961" strokeWidth="0.9" opacity="0.5"/>
      {/* Highlight band */}
      <rect x="20" y="23" width="24" height="6" fill="rgba(201,169,97,0.25)" className="pi-highlight"/>
      {/* Magnifying lens */}
      <g className="pi-lens">
        <circle cx="20" cy="20" r="9" stroke="#C9A961" strokeWidth="1.5" fill="rgba(201,169,97,0.1)"/>
        <line x1="26" y1="27" x2="34" y2="35" stroke="#C9A961" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

/* Esoteric Documentaries — animated film reel with projector beam */
export function DocumentariesIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .di-reel { animation: none !important; }
          .di-beam { animation: none !important; opacity: 0.3 !important; }
          .di-frame { animation: none !important; }
        }
        .di-reel { animation: di-spin 4s linear infinite; transform-origin: 20px 24px; }
        @keyframes di-spin { to { transform: rotate(360deg); } }
        .di-beam { animation: di-flicker 0.18s steps(1) infinite; }
        @keyframes di-flicker {
          0%, 65% { opacity: 0.8; }
          66%, 100% { opacity: 0.55; }
        }
        .di-frame { animation: di-change 1.2s steps(1) infinite; }
        @keyframes di-change {
          0%   { fill: rgba(201,169,97,0.25); }
          33%  { fill: rgba(201,169,97,0.12); }
          66%  { fill: rgba(201,169,97,0.35); }
          100% { fill: rgba(201,169,97,0.25); }
        }
      `}</style>
      {/* Film reel */}
      <g className="di-reel">
        <circle cx="20" cy="24" r="14" stroke="#C9A961" strokeWidth="1.3" fill="rgba(201,169,97,0.06)"/>
        <circle cx="20" cy="24" r="5" stroke="#C9A961" strokeWidth="1" fill="rgba(201,169,97,0.12)"/>
        {[0,60,120,180,240,300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const x = 20 + 9 * Math.cos(rad);
          const y = 24 + 9 * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r="2.2" fill="rgba(201,169,97,0.3)" stroke="#C9A961" strokeWidth="0.6"/>;
        })}
      </g>
      {/* Projector body */}
      <rect x="38" y="18" width="16" height="12" rx="2" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.1)"/>
      <circle cx="46" cy="24" r="4" stroke="#C9A961" strokeWidth="0.9" fill="rgba(201,169,97,0.15)"/>
      {/* Projection beam */}
      <path d="M34 20 L8 42 L8 48 L34 30 Z" fill="rgba(201,169,97,0.12)" className="di-beam"/>
      {/* Projected frame */}
      <rect x="8" y="42" width="18" height="14" stroke="#C9A961" strokeWidth="1" className="di-frame"/>
      {/* Eye of Horus symbol inside frame */}
      <text x="11" y="52" fontSize="8" fill="#C9A961" opacity="0.7" style={{fontFamily:'serif'}}>𓂀</text>
      {/* Film strip holes */}
      {[42,47,52].map((y, i) => <rect key={i} x="54" y={y} width="3" height="2" rx="0.5" fill="rgba(201,169,97,0.3)" stroke="#C9A961" strokeWidth="0.5"/>)}
    </svg>
  );
}

/* Conferences & Events — animated hourglass with calendar marks */
export function EventsIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .evi-sand { animation: none !important; }
          .evi-star { animation: none !important; }
          .evi-pulse { animation: none !important; }
        }
        .evi-sand { animation: evi-fill 3s ease-in-out infinite; transform-origin: 32px 44px; }
        @keyframes evi-fill {
          0%, 10%  { transform: scaleY(0); opacity: 0.8; }
          90%, 100% { transform: scaleY(1); opacity: 0.9; }
        }
        .evi-star { animation: evi-twinkle 1.6s ease-in-out infinite; }
        @keyframes evi-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50%       { opacity: 1; transform: scale(1.15); }
        }
        .evi-pulse { animation: evi-ring 2.4s ease-out infinite; }
        @keyframes evi-ring {
          0%   { r: 2; opacity: 0.9; }
          100% { r: 18; opacity: 0; }
        }
      `}</style>
      {/* Calendar grid outline */}
      <rect x="8" y="14" width="48" height="42" rx="3" stroke="#C9A961" strokeWidth="1.3" fill="rgba(201,169,97,0.06)"/>
      <line x1="8" y1="22" x2="56" y2="22" stroke="#C9A961" strokeWidth="1" opacity="0.7"/>
      {/* Calendar header tabs */}
      <rect x="18" y="9" width="5" height="10" rx="1.5" stroke="#C9A961" strokeWidth="1.1" fill="rgba(201,169,97,0.15)"/>
      <rect x="41" y="9" width="5" height="10" rx="1.5" stroke="#C9A961" strokeWidth="1.1" fill="rgba(201,169,97,0.15)"/>
      {/* Calendar dots */}
      {[
        [16,30],[24,30],[32,30],[40,30],[48,30],
        [16,38],[24,38],[48,38],
        [16,46],[24,46],[32,46],[40,46],
      ].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="1.8" fill="rgba(201,169,97,0.3)" stroke="#C9A961" strokeWidth="0.5"/>)}
      {/* Highlighted event date */}
      <circle cx="32" cy="38" r="7" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.18)"/>
      <text x="29" y="42" fontSize="7" fill="#C9A961" className="evi-star" style={{fontFamily:'serif'}}>✦</text>
      {/* Pulsing ring */}
      <circle cx="32" cy="38" r="2" stroke="#C9A961" strokeWidth="0.8" fill="none" className="evi-pulse"/>
    </svg>
  );
}

/* Notable Deaths in the Community — animated memorial candle */
export function ObituariesIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .oi-flame { animation: none !important; }
          .oi-glow { animation: none !important; }
          .oi-smoke { animation: none !important; opacity: 0 !important; }
        }
        .oi-flame { animation: oi-flicker 1.8s ease-in-out infinite; transform-origin: 32px 20px; }
        @keyframes oi-flicker {
          0%, 100% { transform: scaleX(1) scaleY(1); }
          25%       { transform: scaleX(0.88) scaleY(1.08); }
          50%       { transform: scaleX(1.06) scaleY(0.95); }
          75%       { transform: scaleX(0.94) scaleY(1.04); }
        }
        .oi-glow { animation: oi-pulse 1.8s ease-in-out infinite; }
        @keyframes oi-pulse {
          0%, 100% { opacity: 0.25; r: 6; }
          50%       { opacity: 0.55; r: 9; }
        }
        .oi-smoke { animation: oi-rise 3s ease-out infinite; }
        @keyframes oi-rise {
          0%   { transform: translateY(0) scaleX(1); opacity: 0.4; }
          100% { transform: translateY(-12px) scaleX(0.3); opacity: 0; }
        }
      `}</style>
      {/* Candle body */}
      <rect x="24" y="28" width="16" height="28" rx="2" stroke="#C9A961" strokeWidth="1.3" fill="rgba(201,169,97,0.1)"/>
      {/* Wax drips */}
      <path d="M24 32 Q20 36 22 40" stroke="#C9A961" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M40 34 Q44 38 42 43" stroke="#C9A961" strokeWidth="1" fill="none" opacity="0.5"/>
      {/* Wick */}
      <line x1="32" y1="28" x2="32" y2="22" stroke="#C9A961" strokeWidth="1" strokeLinecap="round"/>
      {/* Glow halo */}
      <circle cx="32" cy="18" r="6" stroke="#C9A961" strokeWidth="0.7" fill="rgba(201,169,97,0.15)" className="oi-glow"/>
      {/* Flame */}
      <g className="oi-flame">
        <path d="M32 8 Q36 13 34 18 Q32 21 30 18 Q28 13 32 8 Z" fill="rgba(201,169,97,0.85)" stroke="#C9A961" strokeWidth="0.7"/>
        <path d="M32 12 Q33.5 15 32 18 Q30.5 15 32 12 Z" fill="rgba(255,240,180,0.9)"/>
      </g>
      {/* Rising smoke wisps */}
      <path d="M31 7 Q29 3 31 0" stroke="#C9A961" strokeWidth="0.7" strokeDasharray="1 2" className="oi-smoke" opacity="0.4"/>
      <path d="M33 6 Q35 2 33 -1" stroke="#C9A961" strokeWidth="0.7" strokeDasharray="1 2" className="oi-smoke" opacity="0.3"/>
      {/* Mourning wreath arc */}
      <path d="M14 56 Q14 50 32 50 Q50 50 50 56" stroke="#C9A961" strokeWidth="0.9" fill="none" strokeDasharray="2 3" opacity="0.6"/>
      {/* Star of remembrance */}
      <text x="29" y="60" fontSize="7" fill="#C9A961" opacity="0.7" style={{fontFamily:'serif'}}>✦</text>
    </svg>
  );
}

/* New Book Releases — animated book opening with light burst */
export function ReleasesIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ri-cover { animation: none !important; }
          .ri-rays { animation: none !important; opacity: 0.5 !important; }
          .ri-star { animation: none !important; }
        }
        .ri-cover { animation: ri-open 3.5s ease-in-out infinite; transform-origin: 32px 38px; }
        @keyframes ri-open {
          0%, 15%  { transform: perspective(80px) rotateY(0deg); }
          40%, 65% { transform: perspective(80px) rotateY(-35deg); }
          90%, 100%{ transform: perspective(80px) rotateY(0deg); }
        }
        .ri-rays { animation: ri-burst 3.5s ease-in-out infinite; }
        @keyframes ri-burst {
          0%, 30%  { opacity: 0; transform: scale(0.5); }
          45%, 60% { opacity: 0.8; transform: scale(1); }
          90%, 100%{ opacity: 0; transform: scale(0.5); }
        }
        .ri-star { animation: ri-twinkle 1.4s ease-in-out infinite; }
        @keyframes ri-twinkle {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }
      `}</style>
      {/* Book spine */}
      <rect x="29" y="14" width="6" height="44" rx="1" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.15)"/>
      {/* Back cover */}
      <rect x="32" y="14" width="22" height="44" rx="2" stroke="#C9A961" strokeWidth="1" fill="rgba(201,169,97,0.06)" opacity="0.7"/>
      {/* Front cover animated open */}
      <g className="ri-cover">
        <rect x="10" y="14" width="22" height="44" rx="2" stroke="#C9A961" strokeWidth="1.3" fill="rgba(201,169,97,0.1)"/>
        <line x1="14" y1="28" x2="28" y2="28" stroke="#C9A961" strokeWidth="0.8" opacity="0.5"/>
        <line x1="14" y1="34" x2="28" y2="34" stroke="#C9A961" strokeWidth="0.8" opacity="0.5"/>
        <text x="16" y="24" fontSize="7" fill="#C9A961" opacity="0.6" style={{fontFamily:'serif'}}>⊕</text>
      </g>
      {/* Light burst from spine */}
      <g className="ri-rays">
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const rad = deg * Math.PI / 180;
          return <line key={i}
            x1={32 + 4 * Math.cos(rad)} y1={36 + 4 * Math.sin(rad)}
            x2={32 + 14 * Math.cos(rad)} y2={36 + 14 * Math.sin(rad)}
            stroke="#C9A961" strokeWidth="0.8" opacity="0.7"/>;
        })}
        <circle cx="32" cy="36" r="4" fill="rgba(201,169,97,0.35)" className="ri-star"/>
      </g>
    </svg>
  );
}

/* New Podcasts & YouTube Channels — animated microphone with sound waves */
export function MediaIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .mi-wave { animation: none !important; opacity: 0.5 !important; }
          .mi-dot { animation: none !important; }
        }
        .mi-wave1 { animation: mi-pulse 1.6s ease-out infinite; }
        .mi-wave2 { animation: mi-pulse 1.6s ease-out infinite 0.3s; }
        .mi-wave3 { animation: mi-pulse 1.6s ease-out infinite 0.6s; }
        @keyframes mi-pulse {
          0%   { opacity: 0.9; stroke-width: 1.2; }
          100% { opacity: 0; stroke-width: 0.3; }
        }
        .mi-dot { animation: mi-blink 1.2s steps(1) infinite; }
        @keyframes mi-blink {
          0%, 49% { fill: #C9A961; }
          50%, 100% { fill: rgba(201,169,97,0.2); }
        }
      `}</style>
      {/* Microphone body */}
      <rect x="23" y="8" width="18" height="28" rx="9" stroke="#C9A961" strokeWidth="1.4" fill="rgba(201,169,97,0.1)"/>
      {/* Mic grille lines */}
      {[16,20,24,28,32].map((y, i) => <line key={i} x1="23" y1={y} x2="41" y2={y} stroke="#C9A961" strokeWidth="0.6" opacity="0.35"/>)}
      {/* Stand arm */}
      <path d="M14 36 Q14 50 32 50" stroke="#C9A961" strokeWidth="1.3" fill="none"/>
      <path d="M50 36 Q50 50 32 50" stroke="#C9A961" strokeWidth="1.3" fill="none"/>
      <line x1="32" y1="50" x2="32" y2="58" stroke="#C9A961" strokeWidth="1.3"/>
      <line x1="22" y1="58" x2="42" y2="58" stroke="#C9A961" strokeWidth="1.3"/>
      {/* Sound waves */}
      <path d="M14 28 Q10 32 14 36" stroke="#C9A961" fill="none" className="mi-wave1"/>
      <path d="M10 24 Q4 32 10 40" stroke="#C9A961" fill="none" className="mi-wave2"/>
      <path d="M50 28 Q54 32 50 36" stroke="#C9A961" fill="none" className="mi-wave3"/>
      <path d="M54 24 Q60 32 54 40" stroke="#C9A961" fill="none" className="mi-wave3"/>
      {/* Record dot */}
      <circle cx="32" cy="22" r="4" stroke="#C9A961" strokeWidth="1" className="mi-dot"/>
    </svg>
  );
}

/* Secret Societies in the News — animated all-seeing eye with radiating lines */
export function SocietiesIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .si-eye { animation: none !important; }
          .si-rays { animation: none !important; opacity: 0.5 !important; }
          .si-pupil { animation: none !important; }
        }
        .si-eye { animation: si-blink 4s ease-in-out infinite; transform-origin: 32px 30px; }
        @keyframes si-blink {
          0%, 38%  { transform: scaleY(1); }
          42%      { transform: scaleY(0.08); }
          46%, 100%{ transform: scaleY(1); }
        }
        .si-rays { animation: si-rotate 12s linear infinite; transform-origin: 32px 30px; }
        @keyframes si-rotate { to { transform: rotate(360deg); } }
        .si-pupil { animation: si-glow 2.4s ease-in-out infinite; }
        @keyframes si-glow {
          0%, 100% { opacity: 0.7; r: 5; }
          50%       { opacity: 1; r: 6; }
        }
      `}</style>
      {/* Triangle */}
      <path d="M32 6 L60 54 L4 54 Z" stroke="#C9A961" strokeWidth="1.4" fill="rgba(201,169,97,0.06)"/>
      {/* Inner triangle */}
      <path d="M32 14 L54 50 L10 50 Z" stroke="#C9A961" strokeWidth="0.6" fill="none" opacity="0.4"/>
      {/* Radiating sun lines */}
      <g className="si-rays">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
          const rad = deg * Math.PI / 180;
          return <line key={i}
            x1={32 + 10 * Math.cos(rad)} y1={30 + 10 * Math.sin(rad)}
            x2={32 + 16 * Math.cos(rad)} y2={30 + 16 * Math.sin(rad)}
            stroke="#C9A961" strokeWidth="0.7" opacity="0.6"/>;
        })}
      </g>
      {/* Eye container */}
      <g className="si-eye">
        {/* Eye whites */}
        <path d="M16 30 Q32 18 48 30 Q32 42 16 30 Z" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.08)"/>
        {/* Iris */}
        <circle cx="32" cy="30" r="7" stroke="#C9A961" strokeWidth="1" fill="rgba(201,169,97,0.12)"/>
        {/* Pupil */}
        <circle cx="32" cy="30" r="5" fill="#C9A961" className="si-pupil"/>
        {/* Pupil gleam */}
        <circle cx="34" cy="28" r="1.5" fill="rgba(255,255,220,0.5)"/>
      </g>
    </svg>
  );
}

/* Symbol Sightings in Architecture & Art — animated compass rose with rotating needle */
export function SightingsIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sgi-needle { animation: none !important; }
          .sgi-ring { animation: none !important; }
          .sgi-symbol { animation: none !important; }
        }
        .sgi-needle { animation: sgi-sweep 5s ease-in-out infinite; transform-origin: 32px 32px; }
        @keyframes sgi-sweep {
          0%   { transform: rotate(0deg); }
          30%  { transform: rotate(95deg); }
          60%  { transform: rotate(220deg); }
          85%  { transform: rotate(290deg); }
          100% { transform: rotate(360deg); }
        }
        .sgi-ring { animation: sgi-pulse 3s ease-in-out infinite; }
        @keyframes sgi-pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.8; }
        }
        .sgi-symbol { animation: sgi-appear 5s ease-in-out infinite; }
        @keyframes sgi-appear {
          0%, 20%  { opacity: 0; }
          40%, 70% { opacity: 1; }
          90%, 100%{ opacity: 0; }
        }
      `}</style>
      {/* Outer ring */}
      <circle cx="32" cy="32" r="26" stroke="#C9A961" strokeWidth="1.2" fill="rgba(201,169,97,0.04)"/>
      {/* Inner ring */}
      <circle cx="32" cy="32" r="18" stroke="#C9A961" strokeWidth="0.7" strokeDasharray="3 3" className="sgi-ring"/>
      {/* Cardinal marks */}
      {[0,90,180,270].map((deg, i) => {
        const rad = deg * Math.PI / 180;
        return <line key={i}
          x1={32 + 20 * Math.cos(rad)} y1={32 + 20 * Math.sin(rad)}
          x2={32 + 26 * Math.cos(rad)} y2={32 + 26 * Math.sin(rad)}
          stroke="#C9A961" strokeWidth="1.5"/>;
      })}
      {/* Intercardinal marks */}
      {[45,135,225,315].map((deg, i) => {
        const rad = deg * Math.PI / 180;
        return <line key={i}
          x1={32 + 22 * Math.cos(rad)} y1={32 + 22 * Math.sin(rad)}
          x2={32 + 26 * Math.cos(rad)} y2={32 + 26 * Math.sin(rad)}
          stroke="#C9A961" strokeWidth="0.8" opacity="0.6"/>;
      })}
      {/* Compass needle */}
      <g className="sgi-needle">
        <polygon points="32,10 34,32 32,34 30,32" fill="#C9A961" opacity="0.9"/>
        <polygon points="32,54 34,32 32,30 30,32" fill="rgba(201,169,97,0.3)"/>
      </g>
      {/* Center hub */}
      <circle cx="32" cy="32" r="3.5" fill="#C9A961"/>
      {/* Emerging symbol */}
      <text x="24" y="48" fontSize="7" fill="#C9A961" className="sgi-symbol" style={{fontFamily:'serif'}}>⊕</text>
    </svg>
  );
}

/* Brief Historical Oddities — animated hourglass with floating question mark */
export function OdditiesIcon() {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .odi-sand { animation: none !important; }
          .odi-top { animation: none !important; }
          .odi-mark { animation: none !important; }
          .odi-rotate { animation: none !important; }
        }
        .odi-rotate { animation: odi-flip 6s ease-in-out infinite; transform-origin: 32px 32px; }
        @keyframes odi-flip {
          0%, 40%   { transform: rotate(0deg); }
          50%, 55%  { transform: rotate(180deg); }
          90%, 100% { transform: rotate(180deg); }
        }
        .odi-sand { animation: odi-drain 6s ease-in-out infinite; transform-origin: 32px 38px; }
        @keyframes odi-drain {
          0%, 55%  { transform: scaleY(1); opacity: 0.7; }
          45%      { transform: scaleY(0); opacity: 0.4; }
          56%      { transform: scaleY(0); opacity: 0; }
          57%      { transform: scaleY(0); }
          100%     { transform: scaleY(1); opacity: 0.7; }
        }
        .odi-mark { animation: odi-float 4s ease-in-out infinite; }
        @keyframes odi-float {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
      {/* Floating question mark (historical mystery) */}
      <text x="44" y="24" fontSize="14" fill="#C9A961" className="odi-mark" style={{fontFamily:'serif'}}>?</text>
      {/* Hourglass frame */}
      <g className="odi-rotate">
        <path d="M14 10 L50 10 L32 32 L50 54 L14 54 L32 32 Z" stroke="#C9A961" strokeWidth="1.4" fill="rgba(201,169,97,0.06)"/>
        {/* Top cap */}
        <rect x="12" y="7" width="40" height="5" rx="2" stroke="#C9A961" strokeWidth="1.1" fill="rgba(201,169,97,0.15)"/>
        {/* Bottom cap */}
        <rect x="12" y="52" width="40" height="5" rx="2" stroke="#C9A961" strokeWidth="1.1" fill="rgba(201,169,97,0.15)"/>
        {/* Sand in bottom chamber */}
        <path d="M22 50 L32 38 L42 50 Z" fill="rgba(201,169,97,0.35)" className="odi-sand"/>
        {/* Sand stream */}
        <line x1="32" y1="32" x2="32" y2="38" stroke="#C9A961" strokeWidth="1.5" opacity="0.6" className="odi-sand"/>
      </g>
    </svg>
  );
}

import React from 'react';

function AetherMist() {
  return (
    <div className="aether-mist-container" aria-hidden="true">
      <svg
        className="aether-mist-svg"
        viewBox="0 0 1920 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="aether-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          <linearGradient id="aether-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(214, 220, 226, 0.4)" />
            <stop offset="50%" stopColor="rgba(200, 208, 216, 0.26)" />
            <stop offset="100%" stopColor="rgba(200, 208, 216, 0)" />
          </linearGradient>
          <linearGradient id="aether-gradient-soft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(220, 226, 232, 0.32)" />
            <stop offset="100%" stopColor="rgba(220, 226, 232, 0)" />
          </linearGradient>
        </defs>

        {/* Flowing mist layers — span full height so they fill any aspect ratio */}
        <g filter="url(#aether-blur)" opacity="0.7">
          <path
            className="aether-mist-wave aether-mist-wave-1"
            d="M0,40 Q480,10 960,40 T1920,40 L1920,120 L0,120 Z"
            fill="url(#aether-gradient)"
          />
        </g>

        <g filter="url(#aether-blur)" opacity="0.5">
          <path
            className="aether-mist-wave aether-mist-wave-2"
            d="M0,55 Q480,25 960,55 T1920,55 L1920,120 L0,120 Z"
            fill="url(#aether-gradient)"
          />
        </g>

        <g filter="url(#aether-blur)" opacity="0.45">
          <path
            className="aether-mist-wave aether-mist-wave-3"
            d="M0,30 Q480,5 960,30 T1920,30 L1920,120 L0,120 Z"
            fill="url(#aether-gradient-soft)"
          />
        </g>

        {/* Drifting particle wisps — spread across full width/height */}
        <g filter="url(#aether-blur)" opacity="0.5">
          <circle className="aether-particle aether-particle-1" cx="240" cy="45" r="38" fill="rgba(214, 220, 226, 0.3)" />
          <circle className="aether-particle aether-particle-2" cx="720" cy="60" r="48" fill="rgba(214, 220, 226, 0.26)" />
          <circle className="aether-particle aether-particle-3" cx="1200" cy="40" r="42" fill="rgba(214, 220, 226, 0.28)" />
          <circle className="aether-particle aether-particle-4" cx="1680" cy="65" r="40" fill="rgba(214, 220, 226, 0.26)" />
          <circle className="aether-particle aether-particle-5" cx="480" cy="70" r="30" fill="rgba(214, 220, 226, 0.24)" />
          <circle className="aether-particle aether-particle-6" cx="1440" cy="50" r="34" fill="rgba(214, 220, 226, 0.25)" />
        </g>
      </svg>
    </div>
  );
}

export default AetherMist;

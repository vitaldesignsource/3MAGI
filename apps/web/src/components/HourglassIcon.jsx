import React from 'react';

export default function HourglassIcon({ size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', margin: '0 auto 8px' }}
    >
      <defs>
        <linearGradient id="hg-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d1ad68" />
          <stop offset="100%" stopColor="#8a6228" />
        </linearGradient>
        <linearGradient id="hg-sand-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a961" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c9a961" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="hg-sand-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a961" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#c9a961" stopOpacity="0.75" />
        </linearGradient>
        <clipPath id="hg-top-clip">
          <polygon points="2,1 26,1 18,17 10,17" />
        </clipPath>
        <clipPath id="hg-bot-clip">
          <polygon points="10,19 18,19 26,35 2,35" />
        </clipPath>
      </defs>

      {/* Top cap bar */}
      <rect x="1" y="0" width="26" height="2.5" rx="1" fill="url(#hg-gold)" />
      {/* Bottom cap bar */}
      <rect x="1" y="33.5" width="26" height="2.5" rx="1" fill="url(#hg-gold)" />

      {/* Hourglass outline (two triangles meeting at center) */}
      <polygon
        points="2,1 26,1 18,17 10,17"
        stroke="url(#hg-gold)"
        strokeWidth="1.2"
        fill="rgba(179,139,70,0.06)"
      />
      <polygon
        points="10,19 18,19 26,35 2,35"
        stroke="url(#hg-gold)"
        strokeWidth="1.2"
        fill="rgba(179,139,70,0.06)"
      />

      {/* Sand draining in top chamber */}
      <rect
        x="2" y="1" width="24" height="14"
        fill="url(#hg-sand-top)"
        clipPath="url(#hg-top-clip)"
      >
        <animate
          attributeName="height"
          values="14;6;14"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="y"
          values="1;9;1"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </rect>

      {/* Sand accumulating in bottom chamber */}
      <rect
        x="2" y="25" width="24" height="10"
        fill="url(#hg-sand-bot)"
        clipPath="url(#hg-bot-clip)"
      >
        <animate
          attributeName="height"
          values="2;10;2"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="y"
          values="33;25;33"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
      </rect>

      {/* Falling sand stream */}
      <line x1="14" y1="17" x2="14" y2="19" stroke="#c9a961" strokeWidth="1.2" strokeLinecap="round">
        <animate attributeName="opacity" values="0;1;0" dur="4s" repeatCount="indefinite" />
      </line>

      {/* Neck dots pulse */}
      <circle cx="14" cy="18" r="1.2" fill="#b38b46">
        <animate attributeName="r" values="1.2;1.8;1.2" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Corner ornament diamonds */}
      <polygon points="14,0 15.2,1.2 14,2.4 12.8,1.2" fill="#d1ad68" opacity="0.7" />
    </svg>
  );
}

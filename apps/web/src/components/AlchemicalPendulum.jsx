import React from 'react';

function AlchemicalPendulum() {
  return (
    <figure className="alchemical-pendulum" aria-label="Alchemical swinging pendulum animation">
      <svg
        viewBox="0 0 200 280"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', maxWidth: '200px', height: 'auto', margin: '0 auto 2rem', display: 'block' }}
      >
        {/* Pivot point */}
        <circle cx="100" cy="30" r="4" fill="#b9924e" opacity="0.8" />

        {/* Rod/chain */}
        <g className="pendulum-rod">
          <line x1="100" y1="30" x2="100" y2="140" stroke="#b9924e" strokeWidth="1.5" opacity="0.6" />
        </g>

        {/* Pendulum bob (alchemical sphere) */}
        <g className="pendulum-bob">
          {/* Outer sphere */}
          <circle cx="100" cy="160" r="18" fill="none" stroke="#b9924e" strokeWidth="2" opacity="0.8" />
          {/* Inner glow */}
          <circle cx="100" cy="160" r="14" fill="none" stroke="#d1ad68" strokeWidth="1" opacity="0.5" />
          {/* Center dot */}
          <circle cx="100" cy="160" r="3" fill="#d1ad68" opacity="0.9" />
          {/* Alchemical symbol inside (Mercury/Hermes cross) */}
          <g opacity="0.6">
            <line x1="100" y1="150" x2="100" y2="170" stroke="#d1ad68" strokeWidth="1" />
            <line x1="90" y1="160" x2="110" y2="160" stroke="#d1ad68" strokeWidth="1" />
            <circle cx="100" cy="155" r="2" fill="#d1ad68" />
          </g>
        </g>

        {/* Decorative arc lines showing swing path */}
        <g opacity="0.3" stroke="#b9924e" strokeWidth="0.8" fill="none">
          <path d="M 70 35 Q 100 120 130 35" />
        </g>
      </svg>

      <style>{`
        @keyframes pendulum-swing {
          0%, 100% {
            transform: rotateZ(-28deg);
            transform-origin: 100px 30px;
          }
          50% {
            transform: rotateZ(28deg);
            transform-origin: 100px 30px;
          }
        }

        @keyframes pendulum-glow {
          0%, 100% {
            opacity: 0.8;
            filter: drop-shadow(0 0 4px rgba(217, 173, 104, 0.4));
          }
          50% {
            opacity: 1;
            filter: drop-shadow(0 0 12px rgba(217, 173, 104, 0.7));
          }
        }

        .alchemical-pendulum svg {
          animation: pendulum-glow 2.4s ease-in-out infinite;
        }

        .alchemical-pendulum .pendulum-rod,
        .alchemical-pendulum .pendulum-bob {
          animation: pendulum-swing 2.4s ease-in-out infinite;
          transform-origin: 100px 30px;
        }

        @media (prefers-reduced-motion: reduce) {
          .alchemical-pendulum svg,
          .alchemical-pendulum .pendulum-rod,
          .alchemical-pendulum .pendulum-bob {
            animation: none;
          }
          .alchemical-pendulum .pendulum-bob {
            transform: rotateZ(0deg);
          }
        }
      `}</style>
    </figure>
  );
}

export default AlchemicalPendulum;

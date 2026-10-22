import React, { useEffect, useRef, useCallback } from 'react';

// Eight-rayed star SVG as cursor data URI
const STAR_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><g transform='translate(10,10)'>${
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const x = Math.cos(a) * 8;
    const y = Math.sin(a) * 8;
    const bx = Math.cos(a + Math.PI / 8) * 3.2;
    const by = Math.sin(a + Math.PI / 8) * 3.2;
    return `<polygon points='0,0 ${bx.toFixed(2)},${by.toFixed(2)} ${x.toFixed(2)},${y.toFixed(2)}' fill='%23c9a84c'/>`;
  }).join('')
}</g></svg>`;

const CURSOR_URL = `url("data:image/svg+xml,${STAR_SVG}") 10 10, default`;

export default function AlchemicalCursor() {
  const haloRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const haloPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const isLinkRef = useRef(false);
  const isImageRef = useRef(false);
  const rippleContainerRef = useRef(null);

  const runningRef = useRef(false);
  const lastTsRef = useRef(0);

  const step = useCallback((ts) => {
    const halo = haloRef.current;
    if (!halo) { runningRef.current = false; return; }

    // Frame-rate-independent smoothing: the halo covers the same fraction of
    // the remaining distance per millisecond on a 60Hz and a 120Hz display.
    const dt = Math.min(48, ts - (lastTsRef.current || ts));
    lastTsRef.current = ts;
    const k = 1 - Math.exp(-dt * 0.011);
    const dx = posRef.current.x - haloPos.current.x;
    const dy = posRef.current.y - haloPos.current.y;
    haloPos.current.x += dx * k;
    haloPos.current.y += dy * k;
    halo.style.transform = `translate(${haloPos.current.x}px, ${haloPos.current.y}px) translate(-50%, -50%)`;

    // Settled: stop burning frames until the pointer moves again. The loop
    // used to run forever, writing an unchanged transform sixty times a
    // second while the page sat idle.
    if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
      runningRef.current = false;
      return;
    }
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const wake = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(step);
  }, [step]);

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Disable custom cursor on mobile (touch devices)
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const halo = haloRef.current;
    const rippleContainer = rippleContainerRef.current;

    // The amber trace used to create a fresh <div>, append it to document.body
    // and schedule a setTimeout to remove it — on EVERY mousemove. A 120Hz
    // pointer therefore produced ~120 nodes and ~120 timers per second, each
    // one invalidating style on body. The visual is identical if a small pool
    // of nodes is reused instead, refreshed at most once per animation frame.
    const TRACE_POOL = 24;
    const traceNodes = [];
    for (let i = 0; i < TRACE_POOL; i++) {
        const node = document.createElement('div');
        node.className = 'alch-trace';
        node.style.opacity = '0';
        rippleContainer.appendChild(node);
        traceNodes.push(node);
    }
    let traceIndex = 0;
    let pendingTrace = null;      // coordinates awaiting the next frame
    let traceRaf = null;
    let lastTarget = null;

    const flushTrace = () => {
        traceRaf = null;
        if (!pendingTrace) return;
        const { x, y } = pendingTrace;
        pendingTrace = null;
        const node = traceNodes[traceIndex];
        traceIndex = (traceIndex + 1) % TRACE_POOL;
        node.style.left = x + 'px';
        node.style.top = y + 'px';
        // Restart the fade: removing the class and forcing a reflow lets the
        // same element replay its animation without being recreated.
        node.classList.remove('alch-trace--on');
        void node.offsetWidth;
        node.classList.add('alch-trace--on');
    };

    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      wake();

      // closest() walks the ancestor chain; only worth doing when the pointer
      // has actually moved onto a different element.
      const target = e.target;
      if (target === lastTarget) {
        pendingTrace = { x: e.clientX, y: e.clientY };
        if (traceRaf === null) traceRaf = requestAnimationFrame(flushTrace);
        return;
      }
      lastTarget = target;
      const newIsLink = target.closest && target.closest('a, button, [role="button"], input, textarea, select, label') !== null;
      const newIsImage = !newIsLink && target.tagName === 'IMG';

      if (newIsLink !== isLinkRef.current || newIsImage !== isImageRef.current) {
        isLinkRef.current = newIsLink;
        isImageRef.current = newIsImage;
        if (halo) {
          halo.className = [
            'alch-halo',
            newIsLink ? 'alch-halo--link' : '',
            newIsImage ? 'alch-halo--image' : '',
          ].filter(Boolean).join(' ');
        }
      }

      // Amber trace, coalesced to one per frame from the pool above.
      pendingTrace = { x: e.clientX, y: e.clientY };
      if (traceRaf === null) traceRaf = requestAnimationFrame(flushTrace);
    };

    const onClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'alch-ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      rippleContainer.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const ripple = document.createElement('div');
      ripple.className = 'alch-ripple';
      ripple.style.left = touch.clientX + 'px';
      ripple.style.top = touch.clientY + 'px';
      rippleContainer.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick);
    document.addEventListener('touchstart', onTouchStart, { passive: true });

    wake();

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
      document.removeEventListener('touchstart', onTouchStart);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
      if (traceRaf !== null) cancelAnimationFrame(traceRaf);
      traceNodes.forEach((n) => n.remove());
    };
  }, [wake]);

  return (
    <>
      <div ref={rippleContainerRef} className="alch-ripple-container" aria-hidden="true" />
      <div ref={haloRef} className="alch-halo" aria-hidden="true" />
      <style>{`
        /* The star is the real cursor, rendered by the OS at input rate —
           hiding the native pointer and substituting the lerped halo made
           every movement feel ~300ms late, because the halo is *meant* to
           trail. Text-entry keeps an I-beam so selection stays workable. */
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          * { cursor: ${CURSOR_URL} !important; }
          input, textarea, select, [contenteditable="true"] { cursor: text !important; }
        }

        .alch-ripple-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 99999;
        }

        .alch-halo {
          position: fixed;
          top: 0;
          left: 0;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(201, 168, 76, 0.55);
          background: radial-gradient(circle, rgba(201, 168, 76, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 99998;
          will-change: transform;
          transition:
            width 280ms cubic-bezier(0.22, 0.61, 0.36, 1),
            height 280ms cubic-bezier(0.22, 0.61, 0.36, 1),
            border-color 280ms ease,
            border-width 280ms ease,
            background 280ms ease,
            box-shadow 280ms ease;
          box-shadow: 0 0 8px rgba(201, 168, 76, 0.12);
        }

        .alch-halo--link {
          width: 28px;
          height: 28px;
          border-width: 1.5px;
          border-color: rgba(201, 168, 76, 0.9);
          /* Alchemical circle: inner ring */
          box-shadow:
            0 0 0 3px rgba(201, 168, 76, 0.12),
            inset 0 0 0 5px rgba(201, 168, 76, 0.08),
            0 0 12px rgba(201, 168, 76, 0.22);
          background: radial-gradient(circle, rgba(201, 168, 76, 0.14) 0%, transparent 60%);
        }

        .alch-halo--image {
          width: 56px;
          height: 56px;
          border-color: rgba(201, 168, 76, 0.3);
          background: radial-gradient(circle, rgba(255, 245, 200, 0.15) 0%, transparent 72%);
          box-shadow:
            inset 0 0 18px rgba(255, 245, 200, 0.08),
            0 0 22px rgba(201, 168, 76, 0.14);
        }

        /* Pooled and reused, so the fade is driven by a class the script
           toggles rather than by the element being created. Without the
           class the node sits invisible and inert. */
        .alch-trace {
          position: fixed;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(201, 168, 76, 0.5);
          pointer-events: none;
          z-index: 99997;
          transform: translate(-50%, -50%);
          opacity: 0;
        }

        .alch-trace--on {
          animation: alch-trace-fade 300ms ease forwards;
        }

        @keyframes alch-trace-fade {
          0%   { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0;   transform: translate(-50%, -50%) scale(0.2); }
        }

        .alch-ripple {
          position: fixed;
          width: 0;
          height: 0;
          border-radius: 50%;
          border: 1px solid rgba(201, 168, 76, 0.65);
          pointer-events: none;
          z-index: 99999;
          transform: translate(-50%, -50%);
          animation: alch-ripple-out 700ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }

        @keyframes alch-ripple-out {
          0%   { width: 0;    height: 0;    opacity: 0.8; border-color: rgba(201, 168, 76, 0.65); }
          60%  { width: 48px; height: 48px; opacity: 0.35; border-color: rgba(201, 168, 76, 0.35); }
          100% { width: 64px; height: 64px; opacity: 0;   border-color: rgba(201, 168, 76, 0.0); }
        }

        @media (pointer: coarse) {
          .alch-halo,
          .alch-trace,
          .alch-ripple { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .alch-halo,
          .alch-trace,
          .alch-ripple { display: none !important; }
          * { cursor: auto !important; }
        }
      `}</style>
    </>
  );
}

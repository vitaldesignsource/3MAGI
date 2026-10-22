import React, { useMemo } from 'react';

// Deterministic pseudo-random generator so particle layout is stable across renders
function seededRandom(seed) {
    let value = seed;
    return () => {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}

const HeroMotionFX = () => {
    const particles = useMemo(() => {
        const rand = seededRandom(42);
        return Array.from({ length: 34 }).map((_, i) => {
            const size = 1.5 + rand() * 3.2;
            return {
                id: i,
                left: rand() * 100,
                top: 20 + rand() * 78,
                size,
                duration: 9 + rand() * 12,
                delay: -(rand() * 18),
                drift: (rand() - 0.5) * 60,
                opacity: 0.35 + rand() * 0.55,
            };
        });
    }, []);

    return (
        <div className="tl-entrance-fx" aria-hidden="true">
            <div className="tl-entrance-fx-gradient" />
            <div className="tl-entrance-fx-rays" />
            <div className="tl-entrance-fx-fog">
                <span className="tl-fog-blob tl-fog-1" />
                <span className="tl-fog-blob tl-fog-2" />
                <span className="tl-fog-blob tl-fog-3" />
            </div>
            <div className="tl-entrance-fx-particles">
                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="tl-fx-particle"
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            '--drift': `${p.drift}px`,
                            '--dur': `${p.duration}s`,
                            '--delay': `${p.delay}s`,
                            '--op': p.opacity,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroMotionFX;

import React from 'react';
import Rich from './rich';

// The vault of Christian Rosenkreuz, in plan, at the Fama's own measurements.
//
// The figure is honest about what it is. Nothing of the kind has been found
// and none is expected, so the caption says "a diagram of a text" and the
// heading says it too — a drawing this clean, on a page about a brotherhood
// that did not exist, would otherwise do the arguing for the wrong side.
//
// Geometry: a regular heptagon of seven equal walls, drawn with a flat wall at
// the bottom so it reads as a room rather than a star; the altar centred over
// the sarcophagus; the artificial sun marked at the roof, which in plan can
// only be shown as a light above the centre.

const SIDES = 7;
const R = 118;            // circumradius of the wall line
const CX = 160;
const CY = 158;

// Vertex i of the heptagon. Rotated so one wall sits flat along the bottom.
function vertex(i) {
    const step = (2 * Math.PI) / SIDES;
    const a = Math.PI / 2 + step * (i + 0.5);
    return [CX + R * Math.cos(a), CY + R * Math.sin(a)];
}

function RosicrucianVault({ vault }) {
    if (!vault) return null;
    const points = Array.from({ length: SIDES }, (_, i) => vertex(i).map((n) => n.toFixed(1)).join(',')).join(' ');
    // Midpoint of each wall, pushed out a little, for the numerals.
    const marks = Array.from({ length: SIDES }, (_, i) => {
        const [x1, y1] = vertex(i);
        const [x2, y2] = vertex((i + 1) % SIDES);
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const k = 1.13;
        return { n: i + 1, x: CX + (mx - CX) * k, y: CY + (my - CY) * k };
    });

    return (
        <figure className="ch-rc-vault">
            <div className="ch-rc-vault-stage">
                <svg viewBox="0 0 320 320" role="img" className="ch-rc-vault-svg"
                    aria-label="Plan of a seven-sided vault: seven equal walls, a round altar at the centre standing over the body, and an artificial sun in the roof above the altar.">
                    {/* the room */}
                    <polygon points={points} className="rcv-wall" />
                    {/* wall numerals */}
                    {marks.map((m) => (
                        <text key={m.n} x={m.x.toFixed(1)} y={m.y.toFixed(1)} className="rcv-num"
                            textAnchor="middle" dominantBaseline="middle">{m.n}</text>
                    ))}
                    {/* the sun in the roof, over the centre */}
                    <g className="rcv-sun" aria-hidden="true">
                        <circle cx={CX} cy={CY} r="46" className="rcv-sun-glow" />
                        {Array.from({ length: 16 }, (_, i) => {
                            const a = (Math.PI * 2 * i) / 16;
                            return (
                                <line key={i}
                                    x1={(CX + Math.cos(a) * 34).toFixed(1)} y1={(CY + Math.sin(a) * 34).toFixed(1)}
                                    x2={(CX + Math.cos(a) * 44).toFixed(1)} y2={(CY + Math.sin(a) * 44).toFixed(1)} />
                            );
                        })}
                    </g>
                    {/* the round altar, over the body */}
                    <circle cx={CX} cy={CY} r="26" className="rcv-altar" />
                    <circle cx={CX} cy={CY} r="17" className="rcv-altar-inner" />
                    <text x={CX} y={CY} className="rcv-altar-label" textAnchor="middle" dominantBaseline="middle">
                        A · C · R · C
                    </text>
                </svg>
                <p className="ch-rc-vault-scale">
                    <span>Seven walls</span>
                    <span>{vault.sideWidth}</span>
                    <span>{vault.height}</span>
                </p>
            </div>
            <figcaption><Rich t={vault.caption} /></figcaption>
        </figure>
    );
}

export default RosicrucianVault;

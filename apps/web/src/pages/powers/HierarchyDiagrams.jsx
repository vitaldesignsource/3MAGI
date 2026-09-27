import React from 'react';

// Precise diagrams for four ladders. Each is drawn from the structure the
// tradition actually asserts, not from a generic template: the Dionysian
// scheme is concentric because its claim is about light passed inward to
// outward; the Amesha Spentas are a hexad because each of the six holds one
// material creation; the gnostic diagram has a barrier across it because that
// is the whole point of the system; and the Enochic one is a chain of command
// that broke.
//
// All are pure SVG, currentColor-driven, and labelled for screen readers.

const F = 'Cinzel, Georgia, serif';

function Frame({ title, desc, viewBox, children, note }) {
    return (
        <figure className="pw-diagram">
            <svg viewBox={viewBox} role="img" aria-label={`${title}. ${desc}`}
                className="pw-diagram-svg">
                {children}
            </svg>
            {note && <figcaption>{note}</figcaption>}
        </figure>
    );
}

/* ---------------------------------------------------------------- Dionysius
   Three triads as three concentric bands, nine wedges. Light falls from the
   centre outward, which is the doctrine: nothing skips a step. */
function DionysianRings() {
    const cx = 250, cy = 250;
    const bands = [
        { r0: 60, r1: 112, names: ['Seraphim', 'Cherubim', 'Thrones'], label: 'First triad' },
        { r0: 112, r1: 164, names: ['Dominions', 'Virtues', 'Powers'], label: 'Second triad' },
        { r0: 164, r1: 216, names: ['Principalities', 'Archangels', 'Angels'], label: 'Third triad' },
    ];
    const arc = (r, a0, a1) => {
        const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
        const [x0, y0] = p(a0); const [x1, y1] = p(a1);
        return `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}`;
    };
    return (
        <Frame title="The nine choirs of Dionysius"
            desc="Three concentric triads of three, with the divine light at the centre passing outward rank by rank."
            viewBox="0 0 500 500"
            note="Concentric because that is the claim: each rank receives the light in the measure it can bear and hands it on. Nothing skips a step — which is why the same author's church hierarchy has bishops, priests and deacons in three ranks of three below it.">
            <circle cx={cx} cy={cy} r={34} className="pw-dg-core" />
            <text x={cx} y={cy + 4} textAnchor="middle" className="pw-dg-corelabel" style={{ fontFamily: F }}>θέωσις</text>
            {bands.map((b, bi) => (
                <g key={bi}>
                    <circle cx={cx} cy={cy} r={b.r1} className="pw-dg-ring" />
                    {b.names.map((n, i) => {
                        const step = (Math.PI * 2) / 9;
                        const idx = bi * 3 + i;
                        const a = -Math.PI / 2 + idx * step + step / 2;
                        const rm = (b.r0 + b.r1) / 2;
                        const x = cx + rm * Math.cos(a);
                        const y = cy + rm * Math.sin(a);
                        const spoke0 = -Math.PI / 2 + idx * step;
                        return (
                            <g key={n}>
                                <line className="pw-dg-spoke"
                                    x1={cx + b.r0 * Math.cos(spoke0)} y1={cy + b.r0 * Math.sin(spoke0)}
                                    x2={cx + b.r1 * Math.cos(spoke0)} y2={cy + b.r1 * Math.sin(spoke0)} />
                                <text x={x} y={y} textAnchor="middle" className="pw-dg-label"
                                    style={{ fontFamily: F }}>{n}</text>
                            </g>
                        );
                    })}
                </g>
            ))}
            {/* rays outward, to show direction of transmission */}
            {Array.from({ length: 24 }, (_, i) => {
                const a = (i / 24) * Math.PI * 2;
                return <line key={i} className="pw-dg-ray"
                    x1={cx + 220 * Math.cos(a)} y1={cy + 220 * Math.sin(a)}
                    x2={cx + 238 * Math.cos(a)} y2={cy + 238 * Math.sin(a)} />;
            })}
            <text x={cx} y={486} textAnchor="middle" className="pw-dg-caption" style={{ fontFamily: F }}>
                outward: toward creation
            </text>
        </Frame>
    );
}

/* ------------------------------------------------------------ Amesha Spentas
   A hexad around Ahura Mazda, each holding one of the material creations. */
function AmeshaHexad() {
    const cx = 250, cy = 230, R = 148;
    const six = [
        { n: 'Vohu Manah', g: 'Good Mind', c: 'cattle' },
        { n: 'Asha Vahishta', g: 'Best Truth', c: 'fire' },
        { n: 'Khshathra Vairya', g: 'Dominion', c: 'metals' },
        { n: 'Spenta Armaiti', g: 'Devotion', c: 'earth' },
        { n: 'Haurvatat', g: 'Wholeness', c: 'water' },
        { n: 'Ameretat', g: 'Immortality', c: 'plants' },
    ];
    return (
        <Frame title="The Amesha Spentas"
            desc="Ahura Mazda at the centre with six Bounteous Immortals around, each holding one of the material creations."
            viewBox="0 0 500 470"
            note="Each of the six is at once a person, a moral quality and the guardian of one material creation — which is why Zoroastrian ethics is inseparable from care of the physical world. Humanity is the seventh creation, and unallocated: it chooses.">
            {six.map((s, i) => {
                const a = -Math.PI / 2 + (i / 6) * Math.PI * 2;
                const x = cx + R * Math.cos(a);
                const y = cy + R * Math.sin(a);
                return (
                    <g key={s.n}>
                        <line className="pw-dg-spoke" x1={cx} y1={cy} x2={x} y2={y} />
                        <circle cx={x} cy={y} r={40} className="pw-dg-node" />
                        <text x={x} y={y - 6} textAnchor="middle" className="pw-dg-label" style={{ fontFamily: F }}>{s.g}</text>
                        <text x={x} y={y + 9} textAnchor="middle" className="pw-dg-sub">{s.n}</text>
                        <text x={x} y={y + 24} textAnchor="middle" className="pw-dg-creation">{s.c}</text>
                    </g>
                );
            })}
            <circle cx={cx} cy={cy} r={52} className="pw-dg-core" />
            <text x={cx} y={cy - 4} textAnchor="middle" className="pw-dg-corelabel" style={{ fontFamily: F }}>Ahura</text>
            <text x={cx} y={cy + 14} textAnchor="middle" className="pw-dg-corelabel" style={{ fontFamily: F }}>Mazda</text>
            <text x={cx} y={452} textAnchor="middle" className="pw-dg-caption" style={{ fontFamily: F }}>
                the seventh creation is humanity, and it is not assigned — it chooses
            </text>
        </Frame>
    );
}

/* -------------------------------------------------------------- Gnostic
   Pleroma above, archons below, a barrier between, and the soul's ascent. */
function PleromaArchons() {
    const gates = ['Yaldabaoth', 'Iao', 'Sabaoth', 'Adonaios', 'Eloaios', 'Astaphaios', 'Oraios'];
    return (
        <Frame title="Aeons and archons"
            desc="The Pleroma above a barrier, seven archontic gates below it, and the soul ascending through them."
            viewBox="0 0 500 560"
            note="The same shape as a Dionysian ladder with the sign reversed: here the intervening ranks are not conduits of light but keepers of gates, and each demands a password. Sabaoth is drawn apart because in one text he repents, condemns his father and is raised — the single defection in the system.">
            <text x={250} y={30} textAnchor="middle" className="pw-dg-caption" style={{ fontFamily: F }}>THE PLEROMA</text>
            {[0, 1, 2].map((i) => (
                <ellipse key={i} cx={250} cy={70 + i * 22} rx={170 - i * 26} ry={13} className="pw-dg-aeon" />
            ))}
            <text x={250} y={78} textAnchor="middle" className="pw-dg-sub">Invisible Spirit · Barbelo · the aeons</text>
            <text x={250} y={142} textAnchor="middle" className="pw-dg-sub">Sophia falls</text>
            <path d="M250,150 C250,168 250,168 250,182" className="pw-dg-fall" markerEnd="url(#pwArrow)" />
            <line x1={40} y1={196} x2={460} y2={196} className="pw-dg-barrier" />
            <text x={250} y={212} textAnchor="middle" className="pw-dg-caption" style={{ fontFamily: F }}>THE BOUNDARY</text>
            {gates.map((g, i) => {
                const y = 250 + i * 40;
                const apart = g === 'Sabaoth';
                return (
                    <g key={g}>
                        <rect x={apart ? 300 : 150} y={y - 15} width={200} height={30}
                            className={`pw-dg-gate${apart ? ' is-apart' : ''}`} />
                        <text x={apart ? 400 : 250} y={y + 5} textAnchor="middle" className="pw-dg-label"
                            style={{ fontFamily: F }}>{g}</text>
                        {apart && <text x={175} y={y + 5} textAnchor="middle" className="pw-dg-creation">repents, is raised</text>}
                    </g>
                );
            })}
            <path d="M92,520 L92,240" className="pw-dg-ascent" markerEnd="url(#pwArrow)" />
            <text x={78} y={400} className="pw-dg-caption" style={{ fontFamily: F }}
                transform="rotate(-90 78 400)" textAnchor="middle">the soul ascends, giving a name at each gate</text>
            <defs>
                <marker id="pwArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" className="pw-dg-arrowhead" />
                </marker>
            </defs>
        </Frame>
    );
}

/* -------------------------------------------------------------- Enochic
   A chain of command, and where it broke. */
function WatchersChain() {
    return (
        <Frame title="The Watchers and the four"
            desc="The four presences before the Glory, the watchers set over the earth, the two hundred who fell, and the giants whose ghosts remain."
            viewBox="0 0 500 420"
            note="Read as an organisational chart, which is what it is: authority delegated downward, a mutiny at one level, and a consequence that outlives the mutineers. The evil spirits of the world are, on this account, an administrative failure rather than a rival creation.">
            <rect x={175} y={20} width={150} height={38} className="pw-dg-gate" />
            <text x={250} y={44} textAnchor="middle" className="pw-dg-label" style={{ fontFamily: F }}>The Glory</text>
            <line x1={250} y1={58} x2={250} y2={92} className="pw-dg-spoke" />
            <rect x={110} y={92} width={280} height={38} className="pw-dg-gate" />
            <text x={250} y={116} textAnchor="middle" className="pw-dg-label" style={{ fontFamily: F }}>
                Michael · Sariel · Raphael · Gabriel
            </text>
            <line x1={250} y1={130} x2={250} y2={164} className="pw-dg-spoke" />
            <rect x={140} y={164} width={220} height={38} className="pw-dg-gate" />
            <text x={250} y={188} textAnchor="middle" className="pw-dg-label" style={{ fontFamily: F }}>
                the Watchers, set over the earth
            </text>
            <path d="M250,202 L250,236" className="pw-dg-fall" markerEnd="url(#pwArrow2)" />
            <rect x={120} y={236} width={260} height={38} className="pw-dg-gate is-fallen" />
            <text x={250} y={260} textAnchor="middle" className="pw-dg-label" style={{ fontFamily: F }}>
                two hundred descend · Shemihazah
            </text>
            <line x1={250} y1={274} x2={250} y2={306} className="pw-dg-spoke" />
            <rect x={165} y={306} width={170} height={34} className="pw-dg-gate is-fallen" />
            <text x={250} y={328} textAnchor="middle" className="pw-dg-label" style={{ fontFamily: F }}>the giants</text>
            <line x1={250} y1={340} x2={250} y2={366} className="pw-dg-spoke" />
            <text x={250} y={382} textAnchor="middle" className="pw-dg-sub">their spirits remain on the earth</text>
            <text x={250} y={402} textAnchor="middle" className="pw-dg-caption" style={{ fontFamily: F }}>
                — and are called the evil spirits
            </text>
            <defs>
                <marker id="pwArrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" className="pw-dg-arrowhead" />
                </marker>
            </defs>
        </Frame>
    );
}

const DIAGRAMS = {
    'dionysian-ninefold': DionysianRings,
    'amesha-spentas': AmeshaHexad,
    'gnostic-pleroma': PleromaArchons,
    'enochic-order': WatchersChain,
};

export default DIAGRAMS;

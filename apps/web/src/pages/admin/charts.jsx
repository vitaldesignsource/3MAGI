import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { bucketLabel, int, short } from './format';

// Hand-drawn inline SVG charts. No chart library: a time series (line + wash,
// with the previous period as a quiet second line), sparklines, inline bars
// and the small area strips used for per-bot crawler activity. Every chart
// has a text alternative: a summary sentence and a table of its values.

/** Width of an element, kept current with a ResizeObserver. Returns a
 *  callback ref, so it follows the element even when it mounts late. */
export function useWidth(initial = 640) {
    const [el, setEl] = useState(null);
    const [width, setWidth] = useState(initial);
    useLayoutEffect(() => {
        if (!el) return undefined;
        const set = () => setWidth(Math.max(120, Math.round(el.getBoundingClientRect().width)));
        set();
        if (typeof ResizeObserver === 'undefined') return undefined;
        const ro = new ResizeObserver(set);
        ro.observe(el);
        return () => ro.disconnect();
    }, [el]);
    return [setEl, width, el];
}

/** Round axis ticks: 0 … a clean maximum in `count` steps. */
export function niceTicks(max, count = 4) {
    if (!(max > 0)) return { max: 1, ticks: [0, 1] };
    const raw = max / count;
    const mag = 10 ** Math.floor(Math.log10(raw));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) || 10 * mag;
    const top = Math.ceil(max / step) * step;
    const ticks = [];
    for (let v = 0; v <= top + step / 2; v += step) ticks.push(Math.round(v * 1000) / 1000);
    return { max: top, ticks };
}

function linePath(xs, ys) {
    return xs.map((x, i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join('');
}

/**
 * A time series: the current period as a gold line over a faint wash, the
 * previous period (aligned bucket for bucket) as a thin grey line. A
 * crosshair follows the pointer or the arrow keys and reads both values.
 */
export function TimeChart({
    points, previous, valueKey, name, prevName = 'Previous period', granularity = 'day',
    showPrevious = true, height = 220, format = int, caption, tableLabel,
}) {
    const [wrapRef, width, wrapEl] = useWidth();
    const [active, setActive] = useState(null);
    const [keyboard, setKeyboard] = useState(false);
    const pointerFocus = useRef(false);
    const descId = useId();
    const n = points ? points.length : 0;
    const prev = showPrevious && previous && previous.length ? previous : null;

    const geo = useMemo(() => {
        const vals = (points || []).map((p) => Number(p[valueKey]) || 0);
        const pvals = prev ? prev.slice(0, n).map((p) => Number(p[valueKey]) || 0) : [];
        const maxV = Math.max(1, ...vals, ...pvals);
        const { max, ticks } = niceTicks(maxV, height < 180 ? 3 : 4);
        const labelW = Math.max(...ticks.map((t) => short(t).length)) * 7.5 + 10;
        const m = { l: Math.max(28, labelW), r: 12, t: 12, b: 26 };
        const pw = Math.max(10, width - m.l - m.r);
        const ph = height - m.t - m.b;
        const x = (i) => m.l + (n <= 1 ? pw / 2 : (i * pw) / (n - 1));
        const y = (v) => m.t + ph - (v / max) * ph;
        const xs = vals.map((_, i) => x(i));
        const ys = vals.map(y);
        const pxs = pvals.map((_, i) => x(i));
        const pys = pvals.map(y);
        const maxLabels = Math.max(2, Math.floor(pw / (granularity === 'hour' ? 46 : 58)));
        const every = Math.max(1, Math.ceil(n / maxLabels));
        const xticks = [];
        for (let i = 0; i < n; i += every) xticks.push(i);
        return { vals, pvals, max, ticks, m, pw, ph, x, y, xs, ys, pxs, pys, xticks };
    }, [points, prev, valueKey, width, height, n, granularity]);

    const summary = useMemo(() => {
        if (!n) return `${name}: no data in this range.`;
        let hi = 0;
        let lo = 0;
        geo.vals.forEach((v, i) => {
            if (v > geo.vals[hi]) hi = i;
            if (v < geo.vals[lo]) lo = i;
        });
        const lab = (i) => bucketLabel(points[i].label, granularity, { long: true });
        const total = geo.vals.reduce((a, b) => a + b, 0);
        const ptotal = geo.pvals.reduce((a, b) => a + b, 0);
        return `${name} per ${granularity}, ${lab(0)} to ${lab(n - 1)}. Highest ${format(geo.vals[hi])} (${lab(hi)}), lowest ${format(geo.vals[lo])} (${lab(lo)}), sum of ${granularity}s ${format(total)}`
            + (prev ? `; previous period ${format(ptotal)}.` : '.');
    }, [geo, n, name, points, granularity, format, prev]);

    if (!n) {
        return <p className="adm-empty">No data in this range.</p>;
    }

    const pick = (clientX) => {
        if (!wrapEl) return;
        const r = wrapEl.getBoundingClientRect();
        const rel = clientX - r.left - geo.m.l;
        const i = n <= 1 ? 0 : Math.round((rel / geo.pw) * (n - 1));
        setActive(Math.max(0, Math.min(n - 1, i)));
    };

    const onKey = (e) => {
        let i = active ?? n - 1;
        if (e.key === 'ArrowLeft') i -= 1;
        else if (e.key === 'ArrowRight') i += 1;
        else if (e.key === 'Home') i = 0;
        else if (e.key === 'End') i = n - 1;
        else if (e.key === 'Escape') { setActive(null); return; }
        else return;
        e.preventDefault();
        setKeyboard(true);
        setActive(Math.max(0, Math.min(n - 1, i)));
    };

    const a = active;
    const tipText = a === null ? '' : `${bucketLabel(points[a].label, granularity, { long: true })}: ${name} ${format(geo.vals[a])}`
        + (prev && prev[a] ? `; ${prevName.toLowerCase()} (${bucketLabel(prev[a].label, granularity, { long: true })}) ${format(geo.pvals[a])}` : '');
    const right = a !== null && geo.xs[a] > width * 0.58;

    return (
        <figure className="adm-chart">
            {caption && <figcaption className="adm-chart-cap">{caption}</figcaption>}
            {prev && (
                <ul className="adm-legend" aria-label="Legend">
                    <li><span className="adm-key adm-key-cur" aria-hidden="true" />{name}, this period</li>
                    <li><span className="adm-key adm-key-prev" aria-hidden="true" />{prevName}</li>
                </ul>
            )}
            <div
                ref={wrapRef}
                className="adm-chart-plot"
                style={{ height }}
                tabIndex={0}
                role="group"
                aria-label={`${name} chart. Use the left and right arrow keys to read each ${granularity}.`}
                aria-describedby={descId}
                onPointerMove={(e) => { setKeyboard(false); pick(e.clientX); }}
                onPointerDown={(e) => { pointerFocus.current = true; setKeyboard(false); pick(e.clientX); }}
                onPointerLeave={() => setActive(null)}
                onKeyDown={onKey}
                onFocus={() => {
                    // Focus by Tab starts the reading at the latest bucket; a click keeps where it landed.
                    if (!pointerFocus.current && active === null) { setKeyboard(true); setActive(n - 1); }
                    pointerFocus.current = false;
                }}
                onBlur={() => setActive(null)}
            >
                <svg width={width} height={height} aria-hidden="true" focusable="false">
                    {geo.ticks.map((t) => (
                        <g key={t}>
                            <line className="adm-gridline" x1={geo.m.l} x2={width - geo.m.r} y1={geo.y(t)} y2={geo.y(t)} />
                            <text className="adm-tick" x={geo.m.l - 8} y={geo.y(t) + 4} textAnchor="end">{short(t)}</text>
                        </g>
                    ))}
                    {geo.xticks.map((i) => (
                        <text key={i} className="adm-tick" x={geo.xs[i]} y={height - 8}
                            textAnchor={n === 1 ? 'middle' : i === 0 ? 'start' : (i >= n - 1 ? 'end' : 'middle')}>
                            {bucketLabel(points[i].label, granularity)}
                        </text>
                    ))}
                    {prev && geo.pxs.length > 1 && (
                        <path className="adm-line-prev" d={linePath(geo.pxs, geo.pys)} />
                    )}
                    {n > 1 && (
                        <>
                            <path className="adm-area" d={`${linePath(geo.xs, geo.ys)}L${geo.xs[n - 1].toFixed(1)},${geo.y(0).toFixed(1)}L${geo.xs[0].toFixed(1)},${geo.y(0).toFixed(1)}Z`} />
                            <path className="adm-line" d={linePath(geo.xs, geo.ys)} />
                        </>
                    )}
                    {n === 1 && <circle className="adm-dot" cx={geo.xs[0]} cy={geo.ys[0]} r={4} />}
                    {a !== null && (
                        <g>
                            <line className="adm-crosshair" x1={geo.xs[a]} x2={geo.xs[a]} y1={geo.m.t} y2={geo.y(0)} />
                            {prev && geo.pys[a] !== undefined && <circle className="adm-dot-prev" cx={geo.xs[a]} cy={geo.pys[a]} r={3.5} />}
                            <circle className="adm-dot" cx={geo.xs[a]} cy={geo.ys[a]} r={4.5} />
                        </g>
                    )}
                </svg>
                {a !== null && (
                    <div className="adm-tip" style={right ? { right: width - geo.xs[a] + 12 } : { left: geo.xs[a] + 12 }} aria-hidden="true">
                        <div className="adm-tip-when">{bucketLabel(points[a].label, granularity, { long: true })}</div>
                        <div className="adm-tip-row"><span className="adm-key adm-key-cur" /><strong>{format(geo.vals[a])}</strong> <span>{name}</span></div>
                        {prev && prev[a] && (
                            <div className="adm-tip-row"><span className="adm-key adm-key-prev" /><strong>{format(geo.pvals[a])}</strong> <span>{bucketLabel(prev[a].label, granularity, { long: true })}</span></div>
                        )}
                    </div>
                )}
            </div>
            <p id={descId} className="adm-sr">{summary}</p>
            <p className="adm-sr" aria-live="polite">{keyboard ? tipText : ''}</p>
            <details className="adm-chart-table">
                <summary>{tableLabel || 'Show these numbers as a table'}</summary>
                <div className="adm-scroll">
                    <table className="adm-table adm-table-plain">
                        <caption className="adm-sr">{summary}</caption>
                        <thead>
                            <tr>
                                <th scope="col">{granularity === 'hour' ? 'Hour' : 'Day'}</th>
                                <th scope="col" className="num">{name}</th>
                                {prev && <th scope="col">Previous {granularity}</th>}
                                {prev && <th scope="col" className="num">{name}, previous</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {points.map((p, i) => (
                                <tr key={p.ts}>
                                    <td>{bucketLabel(p.label, granularity, { long: true })}</td>
                                    <td className="num">{format(geo.vals[i])}</td>
                                    {prev && <td>{prev[i] ? bucketLabel(prev[i].label, granularity, { long: true }) : ''}</td>}
                                    {prev && <td className="num">{prev[i] ? format(geo.pvals[i]) : ''}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </details>
        </figure>
    );
}

/** A small line with the last point marked. Decorative: the number sits beside it. */
export function Sparkline({ values, width = 96, height = 26 }) {
    if (!values || values.length < 2) return null;
    const max = Math.max(1, ...values);
    const xs = values.map((_, i) => 2 + (i * (width - 4)) / (values.length - 1));
    const ys = values.map((v) => height - 3 - (v / max) * (height - 6));
    const d = linePath(xs, ys);
    return (
        <svg className="adm-spark" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
            <path className="adm-area" d={`${d}L${xs[xs.length - 1]},${height}L${xs[0]},${height}Z`} />
            <path className="adm-line adm-line-thin" d={d} />
            <circle className="adm-dot" cx={xs[xs.length - 1]} cy={ys[ys.length - 1]} r={2.5} />
        </svg>
    );
}

/** A filled strip for one series among many (per-bot crawler activity). */
export function Strip({ values, height = 28 }) {
    const [ref, width] = useWidth(200);
    const n = values ? values.length : 0;
    const max = Math.max(1, ...(values || [0]));
    let d = '';
    let top = '';
    if (n > 1) {
        const xs = values.map((_, i) => 1 + (i * (width - 2)) / (n - 1));
        const ys = values.map((v) => height - 1 - (v / max) * (height - 4));
        top = linePath(xs, ys);
        d = `${top}L${xs[n - 1]},${height}L${xs[0]},${height}Z`;
    }
    return (
        <div ref={ref} className="adm-strip" aria-hidden="true">
            <svg width={width} height={height} focusable="false">
                <line className="adm-gridline" x1={0} x2={width} y1={height - 0.5} y2={height - 0.5} />
                {d && <path className="adm-strip-fill" d={d} />}
                {top && <path className="adm-strip-line" d={top} />}
            </svg>
        </div>
    );
}

/** A thin horizontal bar for a value in a ranked table. */
export function Bar({ value, max }) {
    const w = max > 0 ? Math.max(value > 0 ? 1.5 : 0, Math.min(100, (value / max) * 100)) : 0;
    return (
        <span className="adm-bar" aria-hidden="true"><span style={{ width: `${w}%` }} /></span>
    );
}

/** Re-render on a timer (for "3 min ago" labels and countdowns). */
export function useNow(intervalMs = 1000) {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), intervalMs);
        return () => clearInterval(t);
    }, [intervalMs]);
    return now;
}

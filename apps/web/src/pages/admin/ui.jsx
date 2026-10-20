import React, { useEffect, useMemo, useState } from 'react';
import { int, dec1, pct } from './format';

// Building blocks shared by every section. Stored strings (paths, titles,
// referrers, user agents, queries) only ever reach the page as React text
// children, which React escapes; nothing here sets HTML.

export function Card({ title, kicker, actions, children, className = '', id, headingLevel = 3 }) {
    const H = `h${headingLevel}`;
    return (
        <section className={`adm-card ${className}`} aria-labelledby={id ? `${id}-h` : undefined}>
            {(title || actions) && (
                <header className="adm-card-head">
                    <div>
                        {kicker && <p className="adm-kicker">{kicker}</p>}
                        {title && <H id={id ? `${id}-h` : undefined} className="adm-card-title">{title}</H>}
                    </div>
                    {actions && <div className="adm-card-actions">{actions}</div>}
                </header>
            )}
            {children}
        </section>
    );
}

/** Wraps a section's content: dims it while fresh numbers load, never blanks it. */
export function Loadable({ loading, children }) {
    return <div className={`adm-loadable${loading ? ' is-loading' : ''}`} aria-busy={loading ? 'true' : 'false'}>{children}</div>;
}

export function Loading({ label = 'Loading…' }) {
    return <p className="adm-loading" role="status"><span className="adm-spinner" aria-hidden="true" />{label}</p>;
}

/** An API failure, said plainly. Storage problems show the server's own fix. */
export function ErrorNote({ error, onRetry }) {
    if (!error) return null;
    const storage = error.body && error.body.storage;
    return (
        <div className="adm-error" role="alert">
            <p className="adm-error-title">{error.code === 'storage_unavailable' ? 'Analytics storage is not available' : 'This could not be loaded'}</p>
            {storage ? (
                <>
                    {storage.message && <p>{storage.message}</p>}
                    {storage.fix && <p className="adm-error-fix"><strong>How to fix it:</strong> {storage.fix}</p>}
                </>
            ) : (
                <p>{error.message}</p>
            )}
            {onRetry && <button type="button" className="adm-btn adm-btn-quiet" onClick={onRetry}>Try again</button>}
        </div>
    );
}

export function Empty({ children = 'Nothing in this range.' }) {
    return <p className="adm-empty">{children}</p>;
}

export function Badge({ tone = 'neutral', children, title }) {
    return <span className={`adm-badge adm-badge-${tone}`} title={title}>{children}</span>;
}

/** Change against the previous period. Colour plus arrow plus words. */
export function Delta({ kpi, kind = 'pct', goodWhenUp = true, compact = false }) {
    if (!kpi) return null;
    let v;
    let text;
    if (kind === 'points') {
        v = kpi.change;
        if (typeof v !== 'number') return null;
        text = `${v > 0 ? '+' : v < 0 ? '−' : '±'}${dec1(Math.abs(v))} pts`;
    } else {
        v = kpi.change_pct;
        if (v === null || v === undefined) {
            if ((kpi.previous ?? 0) === 0 && (kpi.value ?? 0) > 0) {
                return <span className="adm-delta adm-delta-flat"><span className="adm-sr">Previous period was zero; </span>new</span>;
            }
            return <span className="adm-delta adm-delta-flat">–</span>;
        }
        text = `${v > 0 ? '+' : v < 0 ? '−' : '±'}${dec1(Math.abs(v))}%`;
    }
    const dir = v > 0 ? 'up' : v < 0 ? 'down' : 'flat';
    const good = dir === 'flat' ? 'flat' : ((dir === 'up') === goodWhenUp ? 'good' : 'bad');
    return (
        <span className={`adm-delta adm-delta-${good}`}>
            <span aria-hidden="true">{dir === 'up' ? '▲' : dir === 'down' ? '▼' : '●'}</span>
            <span className="adm-sr">{dir === 'up' ? 'up' : dir === 'down' ? 'down' : 'unchanged'} </span>
            {text}
            {!compact && <span className="adm-delta-vs"> vs previous</span>}
        </span>
    );
}

/** A KPI tile: label, value, change, an optional sparkline. */
export function Kpi({ label, value, kpi, kind, goodWhenUp, spark, note, previousText, live }) {
    return (
        <div className={`adm-kpi${live ? ' adm-kpi-live' : ''}`}>
            <dt className="adm-kpi-label">{live && <span className="adm-pulse" aria-hidden="true" />}{label}</dt>
            <dd className="adm-kpi-value">{value}</dd>
            {kpi && <dd className="adm-kpi-delta"><Delta kpi={kpi} kind={kind} goodWhenUp={goodWhenUp} compact /></dd>}
            {previousText && <dd className="adm-kpi-prev">{previousText}</dd>}
            {note && <dd className="adm-kpi-note">{note}</dd>}
            {spark && <dd className="adm-kpi-spark">{spark}</dd>}
        </div>
    );
}

const RATING_TEXT = { good: 'Good', 'needs-improvement': 'Needs work', poor: 'Poor' };
const RATING_ICON = { good: '●', 'needs-improvement': '▲', poor: '■' };
export function Rating({ rating }) {
    if (!rating) return <span className="adm-rating adm-rating-none">no data</span>;
    return (
        <span className={`adm-rating adm-rating-${rating}`}>
            <span className="adm-rating-icon" aria-hidden="true">{RATING_ICON[rating] || '●'}</span>
            {RATING_TEXT[rating] || rating}
        </span>
    );
}

/** "verified" only when reverse DNS confirmed it; everything else claims. */
export function Verdict({ verdict }) {
    if (verdict === 'verified') return <Badge tone="good">verified</Badge>;
    if (verdict === 'failed') return <Badge tone="bad" title="Reverse DNS did not confirm this address">claims to be · failed check</Badge>;
    return <Badge tone="neutral" title={verdict ? `Check result: ${verdict}` : 'Not checked'}>claims to be</Badge>;
}

/** A stored path, shown as text that wraps anywhere. */
export function Path({ children }) {
    return <span className="adm-path">{children}</span>;
}

export function Pager({ offset, limit, total, onChange, label = 'rows' }) {
    if (!(total > limit)) {
        return total > 10 ? <p className="adm-pager-info">{int(total)} {label}</p> : null;
    }
    const from = offset + 1;
    const to = Math.min(total, offset + limit);
    const page = Math.floor(offset / limit) + 1;
    const pages = Math.ceil(total / limit);
    return (
        <nav className="adm-pager" aria-label={`Pages of ${label}`}>
            <button type="button" className="adm-btn adm-btn-quiet" disabled={offset <= 0} onClick={() => onChange(0)} aria-label="First page">«</button>
            <button type="button" className="adm-btn adm-btn-quiet" disabled={offset <= 0} onClick={() => onChange(Math.max(0, offset - limit))}>Previous</button>
            <span className="adm-pager-info" aria-live="polite">{int(from)}–{int(to)} of {int(total)} {label} <span className="adm-muted">· page {int(page)} of {int(pages)}</span></span>
            <button type="button" className="adm-btn adm-btn-quiet" disabled={to >= total} onClick={() => onChange(offset + limit)}>Next</button>
            <button type="button" className="adm-btn adm-btn-quiet" disabled={to >= total} onClick={() => onChange((pages - 1) * limit)} aria-label="Last page">»</button>
        </nav>
    );
}

function compareValues(a, b) {
    if (a === b) return 0;
    if (a === null || a === undefined) return 1;
    if (b === null || b === undefined) return -1;
    if (typeof a === 'string' || typeof b === 'string') return String(a).localeCompare(String(b));
    return a < b ? -1 : 1;
}

const PHONE = '(max-width: 680px)';
/** True on a phone-width window (where tables stack and pages get shorter). */
export function usePhone() {
    const [m, setM] = useState(() => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(PHONE).matches);
    useEffect(() => {
        if (!window.matchMedia) return undefined;
        const mq = window.matchMedia(PHONE);
        const on = () => setM(mq.matches);
        on();
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);
    return m;
}

/**
 * A data table. Columns: { key, label, num, render(row), value(row), sortable,
 * primary, className, srLabel }. Sorting is client-side unless `sort` and
 * `onSort` are given (then the server sorts). Pages of `pageSize` rows.
 * On a phone each row becomes a stacked card with its labels (`stack`), or
 * the table scrolls inside its own box.
 */
export function DataTable({
    caption, columns, rows, rowKey, pageSize: wanted = 25, sort: controlledSort, onSort,
    defaultSort, stack = true, empty = 'Nothing in this range.', label = 'rows', captionVisible = false, dense = false, pager = true,
}) {
    const [localSort, setLocalSort] = useState(defaultSort || null);
    const [offset, setOffset] = useState(0);
    const phone = usePhone();
    // Shorter pages on a phone, where every row is a stacked card. A table
    // whose pages the server makes (pager off) shows all it was given.
    const pageSize = pager && phone ? Math.min(wanted, 20) : wanted;
    const sort = controlledSort || localSort;

    const sorted = useMemo(() => {
        if (!rows) return [];
        if (controlledSort || !localSort) return rows;
        const col = columns.find((c) => c.key === localSort.key);
        if (!col) return rows;
        const get = col.value || ((r) => r[col.key]);
        const out = [...rows].sort((a, b) => compareValues(get(a), get(b)));
        return localSort.dir === 'desc' ? out.reverse() : out;
    }, [rows, columns, localSort, controlledSort]);

    const sortKey = sort ? `${sort.key}:${sort.dir}` : '';
    useEffect(() => { setOffset(0); }, [rows, sortKey]);

    if (!rows || rows.length === 0) return <Empty>{empty}</Empty>;
    const page = sorted.slice(offset, offset + pageSize);

    const toggle = (col) => {
        const key = col.sortKey || col.key;
        const dir = sort && sort.key === key ? (sort.dir === 'desc' ? 'asc' : 'desc') : (col.num ? 'desc' : 'asc');
        if (onSort) onSort({ key, dir });
        else setLocalSort({ key, dir });
    };

    return (
        <div className="adm-table-block">
            <div className="adm-scroll">
                <table className={`adm-table${stack ? ' is-stack' : ''}${dense ? ' is-dense' : ''}`}>
                    {caption && <caption className={captionVisible ? 'adm-caption' : 'adm-sr'}>{caption}</caption>}
                    <thead>
                        <tr>
                            {columns.map((c) => {
                                const key = c.sortKey || c.key;
                                const active = sort && sort.key === key;
                                const sortable = onSort ? !!c.sortKey : c.sortable !== false;
                                return (
                                    <th key={c.key} scope="col" className={`${c.num ? 'num' : ''} ${c.nowrap ? 'nowrap' : ''} ${c.className || ''}`}
                                        aria-sort={active ? (sort.dir === 'desc' ? 'descending' : 'ascending') : undefined}>
                                        {sortable ? (
                                            <button type="button" className="adm-sort" onClick={() => toggle(c)}>
                                                {c.label}
                                                <span className="adm-sort-mark" aria-hidden="true">{active ? (sort.dir === 'desc' ? '▼' : '▲') : '↕'}</span>
                                            </button>
                                        ) : (c.srLabel ? <span className="adm-sr">{c.srLabel}</span> : c.label)}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {page.map((r, i) => (
                            <tr key={rowKey ? rowKey(r, offset + i) : offset + i}>
                                {columns.map((c) => (
                                    <td key={c.key} data-label={c.primary ? undefined : (c.stackLabel ?? c.label)}
                                        className={`${c.num ? 'num' : ''} ${c.nowrap ? 'nowrap' : ''} ${c.primary ? 'is-primary' : ''} ${c.className || ''}`}>
                                        {c.render ? c.render(r) : formatCell(r[c.key], c)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {pager && <Pager offset={offset} limit={pageSize} total={sorted.length} onChange={setOffset} label={label} />}
        </div>
    );
}

function formatCell(v, c) {
    if (c.format) return c.format(v);
    if (typeof v === 'number') return c.pct ? pct(v) : int(v);
    if (v === null || v === undefined || v === '') return '–';
    return String(v);
}

/** Toggle button group with radio semantics (one choice of a few). */
export function Segmented({ label, options, value, onChange, name }) {
    return (
        <fieldset className="adm-seg">
            <legend className="adm-sr">{label}</legend>
            {options.map((o) => (
                <label key={o.value} className={`adm-seg-opt${value === o.value ? ' is-on' : ''}`}>
                    <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
                    <span>{o.label}</span>
                </label>
            ))}
        </fieldset>
    );
}

/** The few key facts as a definition list. */
export function Facts({ items, className = '' }) {
    return (
        <dl className={`adm-facts ${className}`}>
            {items.filter(Boolean).map(([k, v]) => (
                <div key={k} className="adm-fact">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                </div>
            ))}
        </dl>
    );
}

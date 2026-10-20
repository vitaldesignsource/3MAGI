import React from 'react';
import { Bar } from './charts';
import { int, rangeLabel } from './format';
import { useDash } from './state';

// Pieces several sections share: the section heading, the ranked table with
// inline bars, and buttons that drill into a page or an address.

function compareText(range) {
    if (range.key === 'today') return 'compared with yesterday up to this time';
    if (range.key === 'yesterday') return 'compared with the day before';
    return `compared with the ${range.days} days before`;
}

export function SectionHead({ title, range, children, sub }) {
    const { compare } = useDash();
    return (
        <header className="adm-section-head">
            <h2 id="adm-h2" tabIndex={-1}>{title}</h2>
            <p className="adm-section-sub">
                {range ? (
                    <>
                        <span>{rangeLabel(range)}</span>
                        {compare && range.prev_from && <span className="adm-muted"> · {compareText(range)}</span>}
                    </>
                ) : sub}
            </p>
            {children}
        </header>
    );
}

/** Drill into one page's detail. The path is shown as text, never as a link out. */
export function PageButton({ path, title }) {
    const { go } = useDash();
    return (
        <button type="button" className="adm-link adm-path" onClick={() => go({ v: 'pages', path })} title={title || undefined}>
            {path}
        </button>
    );
}

/** Drill into one address's history. */
export function IpButton({ ip, masked }) {
    const { go } = useDash();
    return (
        <button type="button" className="adm-link adm-ip" onClick={() => go({ v: 'visitors', ip })}
            aria-label={`History of ${ip}${masked ? ' (masked)' : ''}`}>
            {ip}
        </button>
    );
}

/**
 * A ranking: label with a bar under it, then one or two numbers. Three
 * columns fit a phone, so this table never stacks; it is its own text
 * alternative.
 */
export function RankTable({ caption, rows, label, rowKey, value, valueLabel, secondary, secondaryLabel, empty, limit }) {
    if (!rows || !rows.length) return <p className="adm-empty">{empty || 'Nothing in this range.'}</p>;
    const list = limit ? rows.slice(0, limit) : rows;
    const max = Math.max(...list.map((r) => Number(value(r)) || 0));
    return (
        <table className="adm-rank">
            <caption className="adm-sr">{caption}</caption>
            <thead>
                <tr>
                    <th scope="col">{caption}</th>
                    <th scope="col" className="num">{valueLabel}</th>
                    {secondary && <th scope="col" className="num">{secondaryLabel}</th>}
                </tr>
            </thead>
            <tbody>
                {list.map((r, i) => (
                    <tr key={rowKey ? rowKey(r) : i}>
                        <td>
                            <div className="adm-rank-label">{label(r)}</div>
                            <Bar value={Number(value(r)) || 0} max={max} />
                        </td>
                        <td className="num">{int(value(r))}</td>
                        {secondary && <td className="num adm-muted">{secondary(r)}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export function ChannelTag({ channel }) {
    const short = { search: 'Search', social: 'Social', ai: 'AI', other: 'Site', direct: 'Direct' }[channel] || channel;
    return <span className={`adm-chan adm-chan-${channel}`}>{short}</span>;
}

export function SourceName({ row }) {
    return (
        <span className="adm-source">
            <ChannelTag channel={row.channel} />
            <span>{row.name || row.source || 'Direct'}</span>
        </span>
    );
}

export function CountryName({ row }) {
    return (
        <span className="adm-country">
            {row.country ? <span className="adm-cc" aria-hidden="true">{row.country}</span> : null}
            <span>{row.name || row.country_name || 'Unknown'}</span>
        </span>
    );
}

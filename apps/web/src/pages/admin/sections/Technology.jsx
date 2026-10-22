import React from 'react';
import { useApi } from '../api';
import { CountryName, RankTable, SectionHead } from '../common';
import { DEVICE_LABELS, int, pct } from '../format';
import { useDash } from '../state';
import { Card, ErrorNote, Loadable, Loading } from '../ui';

// Devices, browsers, systems, screens, languages: shares of the range's visits.

function Versions({ row }) {
    if (!row.versions || row.versions.length < 2) {
        return <span>{row.name}{row.versions && row.versions[0] && row.versions[0].version ? <span className="adm-muted"> {row.versions[0].version}</span> : null}</span>;
    }
    return (
        <details className="adm-versions">
            <summary>{row.name} <span className="adm-muted">· {row.versions.length} versions</span></summary>
            <ul>
                {row.versions.map((v) => (
                    <li key={v.version ?? 'none'}><span>{v.version || 'unknown'}</span> <span className="adm-num">{int(v.visits)}</span></li>
                ))}
            </ul>
        </details>
    );
}

export default function Technology() {
    const { params } = useDash();
    const { data, error, loading, reload } = useApi('stats', { section: 'technology', ...params });

    if (!data) {
        return (
            <>
                <SectionHead title="Technology" sub="Devices, browsers and languages" />
                {error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />}
            </>
        );
    }

    const share = (r) => pct(r.pct);
    const table = (caption, rows, label, opts = {}) => (
        <RankTable caption={caption} rows={rows} rowKey={(r) => r.name ?? r.country ?? 'unknown'} label={label}
            value={(r) => r.visits} valueLabel="Visits" secondary={share} secondaryLabel="Share" {...opts} />
    );

    return (
        <>
            <SectionHead title="Technology" range={data.range} />
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <p className="adm-lede">{int(data.visits)} visits in the range; every share below is of those visits.</p>
                <div className="adm-grid-3">
                    <Card title="Devices" id="tech-devices">{table('Device', data.devices, (r) => DEVICE_LABELS[r.name] || r.name)}</Card>
                    <Card title="Browsers" id="tech-browsers">{table('Browser', data.browsers, (r) => <Versions row={r} />)}</Card>
                    <Card title="Operating systems" id="tech-os">{table('System', data.os, (r) => <Versions row={r} />)}</Card>
                    <Card title="Window widths" id="tech-vw" kicker="CSS pixels">{table('Width', data.viewports, (r) => r.name)}</Card>
                    <Card title="Screens" id="tech-screens">{table('Screen', data.screens, (r) => r.name, { limit: 15 })}</Card>
                    <Card title="Languages" id="tech-lang" kicker="The browser's first language">{table('Language', data.languages, (r) => r.name, { limit: 15 })}</Card>
                    <Card title="Countries" id="tech-countries" kicker="Guessed from the time zone" className="adm-span-3">
                        {table('Country', data.countries, (r) => <CountryName row={r} />, { rowKey: (r) => r.country || 'unknown' })}
                    </Card>
                </div>
            </Loadable>
        </>
    );
}

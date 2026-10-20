import React, { useState } from 'react';
import { actionUrl, ApiError, apiPost, clearCache, useApi } from '../api';
import { SectionHead } from '../common';
import { bytes, dateTime, int } from '../format';
import { RANGES, useDash } from '../state';
import { Badge, Card, ErrorNote, Facts, Loadable, Loading } from '../ui';

// Storage, retention, server, secrets (configured or not, never the values),
// "Prune now", "Export CSV", and whether this browser is kept out of the stats.

const EXPORTS = [
    { value: 'pageviews', label: 'Pageviews' },
    { value: 'sessions', label: 'Visits (with IP addresses)' },
    { value: 'crawls', label: 'Crawler fetches' },
    { value: 'searches', label: 'Site searches' },
    { value: 'notfound', label: 'Not-found pages' },
    { value: 'vitals', label: 'Web vitals' },
    { value: 'outbound', label: 'Outbound clicks' },
    { value: 'page_facts', label: 'Page facts' },
];

const KEY_NOTES = {
    cookie_secret: 'signs the sign-in session',
    admin_email: 'the sign-in email',
    admin_password_hash: 'bcrypt hash of the password',
    analytics_dir: 'optional: where the database lives',
    analytics_ip_days: 'optional: days full IPs are kept (90)',
    analytics_keep_days: 'optional: days data is kept (730)',
    analytics_timezone: 'optional: default time zone',
    site_url: 'optional: the canonical site address',
};

function YesNo({ ok, yes = 'yes', no = 'no', tone }) {
    return ok ? <Badge tone={tone || 'good'}>{yes}</Badge> : <Badge tone={tone ? 'neutral' : 'bad'}>{no}</Badge>;
}

export default function Settings() {
    const { params, email, expires, signOut, global } = useDash();
    const { data, error, loading, reload } = useApi('health', {});
    const [prune, setPrune] = useState({ state: 'idle', result: null, error: null });
    const [table, setTable] = useState('pageviews');

    const runPrune = async () => {
        setPrune({ state: 'running', result: null, error: null });
        try {
            const result = await apiPost('prune', {});
            setPrune({ state: 'done', result, error: null });
            clearCache();
            reload();
        } catch (e) {
            setPrune({ state: 'idle', result: null, error: e instanceof ApiError ? e : new ApiError(0, { error: String(e) }) });
        }
    };

    const exportHref = actionUrl('export', { table, range: params.range, from: params.from, to: params.to, tz: params.tz });
    const rangeName = (RANGES.find((r) => r.value === global.range) || {}).long;

    if (!data) {
        return (
            <>
                <SectionHead title="Settings" sub="Storage, retention and this server" />
                {error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />}
            </>
        );
    }
    const s = data.storage || {};
    const lp = data.last_prune;
    const tb = data.this_browser || {};

    return (
        <>
            <SectionHead title="Settings" sub="Storage, retention and this server" />
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <div className="adm-grid-2">
                    <Card title="You" id="set-you">
                        <Facts items={[
                            ['Signed in as', email || '–'],
                            ['Session ends', dateTime(expires, params.tz, { year: true })],
                            ['This browser', tb.excluded ? <><Badge tone="good">excluded from the stats</Badge></> : <Badge>counted</Badge>],
                            ['Your own pageviews, last 30 days', int(tb.owner_pageviews_30d)],
                        ]} />
                        <p className="adm-small adm-muted">
                            A browser is kept out of the stats exactly while it is signed in here: the sign-in cookie travels with its pageviews.
                            Sign in once on each device you read the site on (phone included) to exclude it. Signing out counts it again.
                        </p>
                        <p><button type="button" className="adm-btn adm-btn-quiet" onClick={signOut}>Sign out</button></p>
                    </Card>

                    <Card title="Storage" id="set-storage" kicker={s.ok ? 'Working' : 'Needs attention'}>
                        {!s.ok && (
                            <div className="adm-error" role="alert">
                                <p className="adm-error-title">{s.message || 'Analytics storage is not available.'}</p>
                                {s.fix && <p className="adm-error-fix"><strong>How to fix it:</strong> {s.fix}</p>}
                            </div>
                        )}
                        <Facts items={[
                            ['Folder', s.dir ? <span className="adm-path">{s.dir}</span> : '–'],
                            ['Database', s.file ? <span className="adm-path">{s.file}</span> : '–'],
                            ['Chosen by', { default: 'default (beside public_html)', secrets: 'analytics_dir in the secrets file', env: 'TL_ANALYTICS_DIR (test setting)' }[s.source] || s.source || '–'],
                            ['Size', `${bytes(s.size_bytes)}${s.wal_bytes ? ` + ${bytes(s.wal_bytes)} journal` : ''}`],
                            ['Schema version', s.schema_version ?? '–'],
                            ['Oldest record', dateTime(data.oldest, params.tz, { year: true })],
                            ['Newest record', dateTime(data.newest, params.tz, { year: true })],
                        ]} />
                    </Card>

                    <Card title="Records" id="set-rows">
                        {data.rows ? (
                            <table className="adm-table adm-table-plain">
                                <caption className="adm-sr">Rows per table</caption>
                                <thead><tr><th scope="col">Table</th><th scope="col" className="num">Rows</th></tr></thead>
                                <tbody>
                                    {Object.entries(data.rows).map(([k, v]) => <tr key={k}><td>{k.replace(/_/g, ' ')}</td><td className="num">{int(v)}</td></tr>)}
                                </tbody>
                            </table>
                        ) : <p className="adm-empty">No database to count.</p>}
                    </Card>

                    <Card title="Retention" id="set-retention">
                        <Facts items={[
                            ['Full IP addresses kept', `${int(data.retention.ip_days)} days, then masked`],
                            ['Everything kept', `${int(data.retention.keep_days)} days, then deleted`],
                            ['A visit ends after', `${int(data.retention.session_gap_s / 60)} minutes of silence`],
                            ['Last prune', lp ? `${dateTime(lp.ts, params.tz, { year: true })}: masked ${int((lp.masked && lp.masked.sessions) || 0)} visits and ${int((lp.masked && lp.masked.crawls) || 0)} crawler fetches, deleted ${int(Object.values(lp.deleted || {}).reduce((a, b) => a + b, 0))} rows` : 'not yet'],
                        ]} />
                        <p className="adm-small adm-muted">Pruning also runs by itself, on about one hit in two hundred and at most once an hour.</p>
                        <p>
                            <button type="button" className="adm-btn" onClick={runPrune} disabled={prune.state === 'running'}>
                                {prune.state === 'running' ? 'Pruning…' : 'Prune now'}
                            </button>
                        </p>
                        <div role="status" aria-live="polite">
                            {prune.state === 'done' && prune.result && (
                                <p className="adm-ok">
                                    Done at {dateTime(prune.result.ran_at, params.tz, { seconds: true })}: masked {int(prune.result.masked.sessions)} visits and {int(prune.result.masked.crawls)} crawler fetches;
                                    {' '}deleted {int(Object.values(prune.result.deleted).reduce((a, b) => a + b, 0))} rows older than {int(prune.result.keep_days)} days.
                                </p>
                            )}
                        </div>
                        <ErrorNote error={prune.error} />
                    </Card>

                    <Card title="Export" id="set-export" kicker={`CSV for ${rangeName ? rangeName.toLowerCase() : 'the range chosen above'}`}>
                        <div className="adm-export">
                            <div className="adm-field">
                                <label htmlFor="exp-table">Table</label>
                                <select id="exp-table" value={table} onChange={(e) => setTable(e.target.value)}>
                                    {EXPORTS.map((x) => <option key={x.value} value={x.value}>{x.label}</option>)}
                                </select>
                            </div>
                            <a className="adm-btn" href={exportHref} download>Download CSV</a>
                        </div>
                        <p className="adm-small adm-muted">
                            Every row in the range chosen above, bots and your own visits included and marked. Times are UTC.
                            The visits file holds IP addresses: treat it as personal data.
                        </p>
                    </Card>

                    <Card title="Server" id="set-server">
                        <Facts items={[
                            ['PHP', data.php_version || '–'],
                            ['pdo_sqlite', <YesNo key="p" ok={data.pdo_sqlite} yes="present" no="missing" />],
                            ['SQLite', data.sqlite_version || '–'],
                            ['Extensions', data.extensions ? Object.entries(data.extensions).map(([k, v]) => `${k} ${v ? '✓' : '✗'}`).join(' · ') : '–'],
                            ['Crawler log', data.crawler_log ? (data.crawler_log.htaccess_block ? `on · last fetch ${dateTime(data.crawler_log.last_crawl, params.tz)}` : 'off (the .htaccess block is not there)') : '–'],
                        ]} />
                    </Card>

                    <Card title="Secrets file" id="set-secrets" kicker="Set or not; values are never shown">
                        <table className="adm-table adm-table-plain">
                            <caption className="adm-sr">Keys in tl-secrets.php</caption>
                            <thead><tr><th scope="col">Key</th><th scope="col">Set</th><th scope="col">What it is</th></tr></thead>
                            <tbody>
                                {Object.entries(data.keys || {}).map(([k, v]) => (
                                    <tr key={k}>
                                        <td><code>{k}</code></td>
                                        <td><YesNo ok={v} tone={KEY_NOTES[k] && KEY_NOTES[k].startsWith('optional') ? 'neutral' : undefined} no={KEY_NOTES[k] && KEY_NOTES[k].startsWith('optional') ? 'default' : 'missing'} /></td>
                                        <td className="adm-small adm-muted">{KEY_NOTES[k] || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data.password_needs_rehash ? (
                            <div className="adm-warn" role="note">
                                <p><strong>PHP recommends a new password hash</strong> (a newer default cost). The dashboard never rewrites the secrets file.</p>
                                <p className="adm-small">{data.rehash_advice}</p>
                            </div>
                        ) : (
                            <p className="adm-small adm-muted">The password hash is current. To change the password, make a new hash and replace admin_password_hash; every signed-in browser is then signed out.</p>
                        )}
                    </Card>
                </div>
            </Loadable>
        </>
    );
}

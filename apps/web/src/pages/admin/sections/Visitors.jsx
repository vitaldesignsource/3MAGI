import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError, apiGet, useApi } from '../api';
import { useNow } from '../charts';
import { ChannelTag, CountryName, IpButton, PageButton, RankTable, SectionHead } from '../common';
import { ago, CHANNEL_LABELS, dateTime, DEVICE_LABELS, duration, int, time } from '../format';
import { useDash } from '../state';
import { Badge, Card, DataTable, ErrorNote, Facts, Loadable, Loading, Pager, Path, usePhone, Verdict } from '../ui';

const FILTERS = ['f_ip', 'f_page', 'f_country', 'f_device', 'f_channel', 'f_source', 'f_agent'];
const LIVE_MS = 15000;

export default function Visitors() {
    const { sp } = useDash();
    const ip = sp.get('ip');
    return ip ? <VisitorDetail ip={ip} /> : <VisitList />;
}

function deviceText(v) {
    return [DEVICE_LABELS[v.device] || v.device, [v.browser, v.browser_version].filter(Boolean).join(' '), [v.os, v.os_version].filter(Boolean).join(' ')]
        .filter(Boolean).join(' · ');
}

function IpCell({ v }) {
    return (
        <span className="adm-ip-cell">
            <IpButton ip={v.ip} masked={v.ip_masked} />
            {v.ip_masked && <Badge title="The address was masked: after the retention period, or because the browser sent Global Privacy Control">masked</Badge>}
            {v.gpc && <Badge title="The browser asked not to be tracked (Global Privacy Control); the address was stored masked">GPC</Badge>}
            {v.owner && <Badge tone="gold">you</Badge>}
        </span>
    );
}

function SourceCell({ v }) {
    return (
        <span className="adm-source-cell">
            <span className="adm-source"><ChannelTag channel={v.channel} /> <span>{v.source || (v.channel === 'direct' ? 'Direct' : 'Unknown')}</span></span>
            {v.referrer && <span className="adm-sub"><Path>{v.referrer}</Path></span>}
            {v.utm && <span className="adm-sub">utm: {[v.utm.source, v.utm.medium, v.utm.campaign].filter(Boolean).join(' / ')}</span>}
        </span>
    );
}

function VisitList() {
    const { params, sp, go } = useDash();
    const LIMIT = usePhone() ? 20 : 50;
    const offset = Math.max(0, Math.min(100000, parseInt(sp.get('off') || '0', 10) || 0));
    const f = Object.fromEntries(FILTERS.map((k) => [k, sp.get(k) || '']));
    const api = {
        ...params,
        ip: f.f_ip || undefined,
        page: f.f_page || undefined,
        country: f.f_country || undefined,
        device: f.f_device || undefined,
        channel: f.f_channel || undefined,
        source: f.f_source || undefined,
        agent: f.f_agent || undefined,
        limit: LIMIT,
        offset: offset || undefined,
    };
    const { data, error, loading, reload } = useApi('visitors', api);
    const active = FILTERS.filter((k) => f[k]);

    const columns = [
        { key: 'start', label: 'Started', primary: true, nowrap: true, render: (v) => <span className="adm-when">{dateTime(v.start, params.tz)}</span> },
        { key: 'ip', label: 'Address', render: (v) => <IpCell v={v} /> },
        { key: 'country', label: 'Country', render: (v) => <CountryName row={{ country: v.country, name: v.country_name }} /> },
        {
            key: 'device', label: 'Device and language',
            render: (v) => (
                <span className="adm-device">
                    {v.agent !== 'human' ? <><Badge tone="warn">{v.agent}</Badge> {v.bot || ''} </> : null}{deviceText(v)}
                    <span className="adm-sub">{[v.lang, v.screen].filter(Boolean).join(' · ') || '–'}</span>
                </span>
            ),
        },
        { key: 'landing', label: 'Landing page', render: (v) => <PageButton path={v.landing} /> },
        { key: 'pages', label: 'Pages', num: true },
        { key: 'duration_s', label: 'Duration', num: true, format: duration },
        { key: 'source', label: 'Source', render: (v) => <SourceCell v={v} /> },
    ].map((c) => ({ ...c, sortable: false }));

    return (
        <>
            <SectionHead title="Visitors" range={data && data.range} sub="The visit log" />
            <LivePanel />
            <Card title="Visits" id="vis-log" kicker="Newest first · every visit that began in the range">
                <VisitFilters f={f} />
                <ErrorNote error={error} onRetry={reload} />
                {!data && !error && <Loading />}
                {data && (
                    <Loadable loading={loading}>
                        {active.length > 0 && (
                            <p className="adm-active-filters">
                                {int(data.total)} visits match
                                {active.map((k) => <Badge key={k} tone="gold">{k.slice(2)}: {f[k]}</Badge>)}
                            </p>
                        )}
                        <DataTable caption="Visits in the range, newest first" columns={columns} rows={data.visits} rowKey={(v) => v.id}
                            pageSize={LIMIT} pager={false} empty="No visits match." label="visits" />
                        <Pager offset={data.offset} limit={data.limit} total={data.total} onChange={(o) => go({ off: o || null }, { replace: true })} label="visits" />
                    </Loadable>
                )}
                <p className="adm-footnote">
                    Country is guessed from the browser's time zone, not looked up from the address.
                    Full addresses are kept for the retention period, then masked (the last part set to zero).
                </p>
            </Card>
        </>
    );
}

function VisitFilters({ f }) {
    const { go } = useDash();
    const [draft, setDraft] = useState(f);
    const key = FILTERS.map((k) => f[k]).join('|');
    useEffect(() => { setDraft(f); }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
    const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));
    const submit = (e) => {
        e.preventDefault();
        const patch = { off: null };
        for (const k of FILTERS) {
            let v = (draft[k] || '').trim();
            if (k === 'f_country') v = v.toUpperCase();
            if (k === 'f_page' && v && !v.startsWith('/')) v = `/${v}`;
            patch[k] = v || null;
        }
        go(patch, { replace: true });
    };
    const clear = () => go(Object.fromEntries([...FILTERS, 'off'].map((k) => [k, null])), { replace: true });
    const any = FILTERS.some((k) => f[k]);

    return (
        <form className="adm-filters-form" onSubmit={submit} aria-label="Filter visits">
            <div className="adm-field">
                <label htmlFor="vf-ip">IP address</label>
                <input id="vf-ip" type="text" inputMode="text" value={draft.f_ip} onChange={set('f_ip')} placeholder="203.0.113.7" spellCheck={false} autoCapitalize="off" />
            </div>
            <div className="adm-field">
                <label htmlFor="vf-page">Page viewed</label>
                <input id="vf-page" type="text" value={draft.f_page} onChange={set('f_page')} placeholder="/books" spellCheck={false} autoCapitalize="off" />
            </div>
            <div className="adm-field adm-field-s">
                <label htmlFor="vf-country">Country</label>
                <input id="vf-country" type="text" value={draft.f_country} onChange={set('f_country')} placeholder="GB" maxLength={2} pattern="[A-Za-z]{2}" title="Two-letter country code" autoCapitalize="characters" spellCheck={false} />
            </div>
            <div className="adm-field">
                <label htmlFor="vf-device">Device</label>
                <select id="vf-device" value={draft.f_device} onChange={set('f_device')}>
                    <option value="">Any</option>
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                    <option value="bot">Bot</option>
                </select>
            </div>
            <div className="adm-field">
                <label htmlFor="vf-channel">Channel</label>
                <select id="vf-channel" value={draft.f_channel} onChange={set('f_channel')}>
                    <option value="">Any</option>
                    {Object.entries(CHANNEL_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
            </div>
            <div className="adm-field">
                <label htmlFor="vf-source">Source</label>
                <input id="vf-source" type="text" value={draft.f_source} onChange={set('f_source')} placeholder="Google" maxLength={100} />
            </div>
            <div className="adm-field">
                <label htmlFor="vf-agent">Who</label>
                <select id="vf-agent" value={draft.f_agent} onChange={set('f_agent')}>
                    <option value="">People</option>
                    <option value="bot">Bots</option>
                    <option value="headless">Headless browsers</option>
                    <option value="all">Everyone</option>
                </select>
            </div>
            <div className="adm-field adm-field-actions">
                <button type="submit" className="adm-btn">Apply</button>
                {any && <button type="button" className="adm-btn adm-btn-quiet" onClick={clear}>Clear</button>}
            </div>
        </form>
    );
}

/** Polls `live` every 15 s while the tab is visible; pausable. */
function useLive(includeOwner) {
    const [state, setState] = useState({ data: null, error: null, at: null });
    const [paused, setPaused] = useState(false);
    const busy = useRef(false);

    const load = useCallback(async () => {
        if (busy.current || document.visibilityState === 'hidden') return;
        busy.current = true;
        try {
            const data = await apiGet('live', includeOwner ? { include_owner: 1 } : {});
            setState({ data, error: null, at: Date.now() });
        } catch (error) {
            if (!(error && error.name === 'AbortError')) setState((s) => ({ ...s, error }));
        } finally {
            busy.current = false;
        }
    }, [includeOwner]);

    useEffect(() => {
        if (paused) return undefined;
        load();
        const t = setInterval(load, LIVE_MS);
        const onVis = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVis);
        return () => { clearInterval(t); document.removeEventListener('visibilitychange', onVis); };
    }, [load, paused]);

    return { ...state, paused, setPaused, reload: load };
}

function LivePanel() {
    const { params, unauthenticated } = useDash();
    const live = useLive(!!params.include_owner);
    const now = useNow(5000);
    const [showRecent, setShowRecent] = useState(false);
    useEffect(() => {
        if (live.error instanceof ApiError && live.error.code === 'unauthenticated') unauthenticated();
    }, [live.error, unauthenticated]);
    const d = live.data;

    return (
        <Card title="Live" id="vis-live" className="adm-live"
            kicker={d ? `Last 5 minutes · updated ${time(Math.round(live.at / 1000), params.tz, { seconds: true })}${live.paused ? ' · paused' : ' · every 15 s'}` : 'Last 5 minutes'}
            actions={(
                <>
                    <button type="button" className="adm-btn adm-btn-quiet" onClick={() => live.setPaused(!live.paused)} aria-pressed={live.paused}>
                        {live.paused ? 'Resume' : 'Pause'}
                    </button>
                    <button type="button" className="adm-btn adm-btn-quiet" onClick={live.reload}>Refresh</button>
                </>
            )}>
            <ErrorNote error={live.error} onRetry={live.reload} />
            {!d ? <Loading /> : (
                <>
                    <dl className="adm-live-nums">
                        <div><dt>Visitors now</dt><dd>{int(d.visitors)}</dd></div>
                        <div><dt>Pageviews</dt><dd>{int(d.pageviews)}</dd></div>
                        <div><dt>Pages being read</dt><dd>{int(d.pages.length)}</dd></div>
                    </dl>
                    {d.visits.length === 0 ? <p className="adm-empty">Nobody on the site in the last five minutes.</p> : (
                        <div className="adm-live-grid">
                            <DataTable caption="Visits active in the last five minutes" dense
                                columns={[
                                    { key: 'ip', label: 'Address', primary: true, sortable: false, render: (v) => <IpCell v={v} /> },
                                    { key: 'country', label: 'Country', sortable: false, render: (v) => <CountryName row={{ country: v.country, name: v.country_name }} /> },
                                    { key: 'device', label: 'Device', sortable: false, render: (v) => [DEVICE_LABELS[v.device] || v.device, v.browser, v.os].filter(Boolean).join(' · ') },
                                    { key: 'current_path', label: 'Now reading', sortable: false, render: (v) => <PageButton path={v.current_path} /> },
                                    { key: 'pages', label: 'Pages', num: true, sortable: false },
                                    { key: 'source', label: 'Source', sortable: false, render: (v) => <span className="adm-source"><ChannelTag channel={v.channel} /> <span>{v.source || 'Direct'}</span></span> },
                                    { key: 'last', label: 'Last seen', nowrap: true, sortable: false, render: (v) => ago(v.last, now / 1000) },
                                ]}
                                rows={d.visits} rowKey={(v) => v.id} pageSize={10} label="active visits" />
                            <RankTable caption="Page" rows={d.pages} rowKey={(r) => r.path} label={(r) => <PageButton path={r.path} />}
                                value={(r) => r.views} valueLabel="Views" secondary={(r) => int(r.visitors)} secondaryLabel="Visitors" limit={10} />
                        </div>
                    )}
                    {d.recent.length > 0 && (
                        <div className="adm-recent">
                            <button type="button" className="adm-link" aria-expanded={showRecent} onClick={() => setShowRecent((s) => !s)}>
                                {showRecent ? 'Hide' : 'Show'} the last {int(d.recent.length)} pageviews
                            </button>
                            {showRecent && (
                                <ol className="adm-feed">
                                    {d.recent.map((r, i) => (
                                        <li key={`${r.ts}-${r.visit_id}-${i}`}>
                                            <span className="adm-when">{time(r.ts, params.tz, { seconds: true })}</span>
                                            <PageButton path={r.path} />
                                            <span className="adm-muted"><IpButton ip={r.ip} masked={r.ip_masked} /> · {r.country || '??'} · {[r.device, r.browser].filter(Boolean).join(' · ')}</span>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    )}
                </>
            )}
        </Card>
    );
}

const VISITS_PER_PAGE = 20;

function VisitorDetail({ ip }) {
    const { go, params } = useDash();
    const { data, error, loading, reload } = useApi('visitor', { ip });
    const [offset, setOffset] = useState(0);
    useEffect(() => setOffset(0), [ip]);
    const back = <button type="button" className="adm-back" onClick={() => go({ ip: null })}>← All visits</button>;

    if (!data) {
        return (
            <>
                {back}
                <SectionHead title="Address" sub={ip} />
                {error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />}
            </>
        );
    }

    return (
        <>
            {back}
            <SectionHead title="Address" sub={`Everything on record for this address, within the ${data.ip_retention_days}-day retention`} />
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <div className="adm-page-id">
                    <p className="adm-page-path adm-ip-big">{data.ip}</p>
                    <p className="adm-badges">
                        {data.masked ? <Badge>masked</Badge> : <Badge tone="gold">full address</Badge>}
                        {data.crawls.hits > 0 && <Badge tone="warn">also crawled</Badge>}
                    </p>
                </div>
                <Facts className="adm-facts-row" items={[
                    ['First seen', dateTime(data.first_seen, params.tz, { year: true })],
                    ['Last seen', dateTime(data.last_seen, params.tz, { year: true })],
                    ['Visits', int(data.visits_count)],
                    ['Pageviews', int(data.pageviews_count)],
                    ['Country (from time zone)', data.countries.length ? data.countries.map((c) => `${c.name} (${int(c.visits)})`).join(', ') : '–'],
                ]} />

                <Card title="User agents seen" id="ip-uas">
                    <DataTable caption="User agents seen from this address"
                        columns={[
                            { key: 'ua', label: 'User agent', primary: true, render: (u) => u.ua ? <span className="adm-ua">{u.ua}</span> : <span className="adm-muted">not kept (masked or Global Privacy Control)</span> },
                            { key: 'browser', label: 'Browser', render: (u) => [u.browser, u.browser_version].filter(Boolean).join(' ') || '–' },
                            { key: 'os', label: 'System', render: (u) => [u.os, u.os_version].filter(Boolean).join(' ') || '–' },
                            { key: 'device', label: 'Device', render: (u) => DEVICE_LABELS[u.device] || u.device || '–' },
                            { key: 'agent', label: 'Kind', render: (u) => (u.agent === 'human' ? 'person' : `${u.agent}${u.bot ? ` · ${u.bot}` : ''}`) },
                            { key: 'visits', label: 'Visits', num: true },
                            { key: 'last', label: 'Last', nowrap: true, render: (u) => dateTime(u.last, params.tz) },
                        ]}
                        rows={data.user_agents} rowKey={(u, i) => `${i}|${u.ua}|${u.last}`} pageSize={10} label="user agents"
                        empty="No visits from this address are on record." />
                </Card>

                <Card title={`Visits (${int(data.visits_count)})`} id="ip-visits" kicker={data.visits_count > data.visits.length ? `The latest ${int(data.visits.length)}` : 'Newest first'}>
                    {data.visits.length === 0 ? <p className="adm-empty">No visits from this address are on record.</p> : (
                        <>
                            <ol className="adm-visits">
                                {data.visits.slice(offset, offset + VISITS_PER_PAGE).map((v) => (
                                    <li key={v.id} className="adm-visit">
                                        <div className="adm-visit-head">
                                            <span className="adm-when">{dateTime(v.start, params.tz, { year: true })}</span>
                                            <span>{duration(v.duration_s)} · {int(v.pages)} {v.pages === 1 ? 'page' : 'pages'}</span>
                                            <SourceCell v={v} />
                                            <span className="adm-muted">{deviceText(v)}{v.lang ? ` · ${v.lang}` : ''}{v.tz ? ` · ${v.tz}` : ''}</span>
                                            <span className="adm-badges">
                                                {v.agent !== 'human' && <Badge tone="warn">{v.agent}{v.bot ? ` · ${v.bot}` : ''}</Badge>}
                                                {v.owner && <Badge tone="gold">you</Badge>}
                                                {v.gpc && <Badge>GPC</Badge>}
                                            </span>
                                        </div>
                                        <ol className="adm-pageviews">
                                            {v.page_views.map((p, i) => (
                                                <li key={`${p.ts}-${i}`}>
                                                    <span className="adm-when">{time(p.ts, params.tz)}</span>
                                                    <PageButton path={p.path} />
                                                    <span className="adm-muted">
                                                        {p.engaged_s !== null ? duration(p.engaged_s) : '–'}
                                                        {p.scroll_pct !== null ? ` · ${int(p.scroll_pct)}% scrolled` : ''}
                                                    </span>
                                                    {p.not_found && <Badge tone="bad">404</Badge>}
                                                </li>
                                            ))}
                                        </ol>
                                    </li>
                                ))}
                            </ol>
                            <Pager offset={offset} limit={VISITS_PER_PAGE} total={data.visits.length} onChange={setOffset} label="visits" />
                        </>
                    )}
                </Card>

                {data.crawls.hits > 0 && (
                    <Card title="Crawler fetches from this address" id="ip-crawls" kicker={`${int(data.crawls.hits)} fetches`}>
                        <p className="adm-badges">{data.crawls.bots.map((b) => <Badge key={b.bot}>{b.bot}: {int(b.hits)}</Badge>)}</p>
                        <DataTable caption="Recent crawler fetches from this address"
                            columns={[
                                { key: 'ts', label: 'When', nowrap: true, primary: true, render: (c) => dateTime(c.ts, params.tz) },
                                { key: 'path', label: 'Path', render: (c) => <Path>{c.path}</Path> },
                                { key: 'kind', label: 'Kind' },
                                { key: 'bot', label: 'Crawler' },
                                { key: 'status', label: 'Status', num: true },
                                { key: 'verdict', label: 'Identity', render: (c) => <Verdict verdict={c.verdict} /> },
                            ]}
                            rows={data.crawls.recent} rowKey={(c, i) => `${i}-${c.ts}`} pageSize={20} label="fetches" />
                    </Card>
                )}
            </Loadable>
        </>
    );
}

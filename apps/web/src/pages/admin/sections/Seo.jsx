import React, { useMemo, useState } from 'react';
import { ApiError, apiPost, clearCache, useApi } from '../api';
import { Bar, Strip } from '../charts';
import { IpButton, PageButton, RankTable, SectionHead } from '../common';
import { dateTime, DEVICE_LABELS, int, ms } from '../format';
import { useDash } from '../state';
import { Badge, Card, DataTable, ErrorNote, Facts, Kpi, Loadable, Loading, Path, Rating, Verdict } from '../ui';

// Seven parts: search-engine visits, crawlers, page health, Core Web Vitals,
// not-found pages, sitemap coverage, and plain links out to the search
// engines' own tools.

const PARTS = [
    { key: 'engines', label: 'Search engines' },
    { key: 'crawlers', label: 'Crawlers' },
    { key: 'health', label: 'Page health' },
    { key: 'vitals', label: 'Web vitals' },
    { key: 'notfound', label: 'Not found' },
    { key: 'sitemap', label: 'Sitemap' },
    { key: 'tools', label: 'Tools' },
];

export const ISSUE_LABELS = {
    title_missing: 'Title missing',
    title_long: 'Title over 60 characters',
    title_duplicate: 'Title shared with another page',
    description_missing: 'Description missing',
    description_short: 'Description under 70 characters',
    description_long: 'Description over 160 characters',
    description_duplicate: 'Description shared with another page',
    canonical_missing: 'Canonical missing',
    canonical_elsewhere: 'Canonical points elsewhere',
    noindex: 'Marked noindex',
    h1_missing: 'No h1 heading',
    h1_multiple: 'More than one h1',
    img_no_alt: 'Images without alt text',
    og_title_missing: 'No og:title',
    og_image_missing: 'No og:image',
    lang_missing: 'No page language',
};
const SERIOUS = new Set(['title_missing', 'description_missing', 'noindex', 'canonical_elsewhere', 'h1_missing']);
const VITALS = ['lcp', 'inp', 'cls', 'fcp', 'ttfb'];
const VITAL_NAMES = {
    lcp: 'Largest Contentful Paint', inp: 'Interaction to Next Paint', cls: 'Cumulative Layout Shift',
    fcp: 'First Contentful Paint', ttfb: 'Time to First Byte',
};

/** Only the server-built links, and only if they are plain https URLs. */
function safeHref(u) {
    return typeof u === 'string' && /^https:\/\/[a-z0-9.-]+\//i.test(u) ? u : null;
}

function OutLink({ href, children }) {
    const h = safeHref(href);
    if (!h) return <span className="adm-muted">{children}</span>;
    return <a className="adm-out" href={h} target="_blank" rel="noopener noreferrer">{children}<span className="adm-sr"> (opens in a new tab)</span><span aria-hidden="true"> ↗</span></a>;
}

export default function Seo() {
    const { params, sp, go } = useDash();
    const part = PARTS.some((p) => p.key === sp.get('part')) ? sp.get('part') : 'engines';
    const seo = useApi('seo', part === 'crawlers' ? null : params);
    const range = seo.data && seo.data.range;

    return (
        <>
            <SectionHead title="SEO" range={range} sub="Search engines, crawlers and page health" />
            <nav className="adm-subtabs" aria-label="SEO parts">
                <ul>
                    {PARTS.map((p) => (
                        <li key={p.key}>
                            <button type="button" aria-current={part === p.key ? 'page' : undefined} onClick={() => go({ part: p.key === 'engines' ? null : p.key }, { replace: true })}>
                                {p.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {part === 'crawlers' ? <Crawlers /> : (
                <>
                    <ErrorNote error={seo.error} onRetry={seo.reload} />
                    {!seo.data && !seo.error && <Loading />}
                    {seo.data && (
                        <Loadable loading={seo.loading}>
                            {part === 'engines' && <Engines d={seo.data.search_engines} />}
                            {part === 'health' && <Health d={seo.data.health} />}
                            {part === 'vitals' && <Vitals d={seo.data.vitals} />}
                            {part === 'notfound' && <NotFound d={seo.data.not_found} />}
                            {part === 'sitemap' && <Sitemap d={seo.data.sitemap} />}
                            {part === 'tools' && <Tools d={seo.data.links} />}
                        </Loadable>
                    )}
                </>
            )}
        </>
    );
}

function Engines({ d }) {
    const { go } = useDash();
    return (
        <>
            <dl className="adm-kpis adm-kpis-4">
                <Kpi label="Visits from search engines" value={int(d.visits)} />
                <Kpi label="Engines" value={int(d.engines.length)} />
                <Kpi label="Landing pages" value={int(d.landing_pages.length)} />
            </dl>
            <div className="adm-grid-main">
                <Card title="Landing pages from search" id="seo-landing" kicker="Where search visits began">
                    <DataTable caption="Pages where visits from search engines began"
                        columns={[
                            { key: 'path', label: 'Page', primary: true, render: (r) => <PageButton path={r.path} /> },
                            { key: 'visits', label: 'Visits', num: true },
                            { key: 'engines', label: 'Engines', sortable: false, render: (r) => <span className="adm-small">{r.engines.map((e) => `${e.name} ${int(e.visits)}`).join(' · ')}</span> },
                        ]}
                        rows={d.landing_pages} rowKey={(r) => r.path} pageSize={25} label="pages" empty="No visits from search engines in this range." />
                </Card>
                <Card title="Engines" id="seo-engines">
                    <RankTable caption="Engine" rows={d.engines} rowKey={(r) => r.name} label={(r) => r.name}
                        value={(r) => r.visits} valueLabel="Visits" secondary={(r) => int(r.visitors)} secondaryLabel="Visitors" />
                    <p><button type="button" className="adm-link" onClick={() => go({ v: 'visitors', f_channel: 'search' })}>See these visits</button></p>
                </Card>
            </div>
        </>
    );
}

function Crawlers() {
    const { params } = useDash();
    const [bot, setBot] = useState('');
    const { data, error, loading, reload } = useApi('crawlers', { ...params, bot: bot || undefined });
    const [verify, setVerify] = useState({ running: false, checked: 0, remaining: null, results: [], error: null, message: '' });

    const runVerify = async (body, all) => {
        setVerify({ running: true, checked: 0, remaining: null, results: [], error: null, message: 'Checking reverse DNS…' });
        let checked = 0;
        let results = [];
        try {
            for (let round = 0; round < 40; round += 1) {
                const res = await apiPost('verify-bot', body);
                checked += res.results.length;
                results = [...results, ...res.results];
                setVerify({ running: true, checked, remaining: res.remaining, results, error: null, message: `Checked ${checked} address${checked === 1 ? '' : 'es'}${res.remaining ? `, ${res.remaining} to go…` : '.'}` });
                if (!all || !res.remaining || !res.results.length) break;
            }
            setVerify((v) => ({ ...v, running: false, message: checked ? `Checked ${checked} address${checked === 1 ? '' : 'es'}.` : 'Nothing left to check: every verifiable address seen in the retention window has a recent verdict.' }));
        } catch (e) {
            setVerify((v) => ({ ...v, running: false, error: e instanceof ApiError ? e : new ApiError(0, { error: String(e) }), message: '' }));
        }
        clearCache();
        reload();
    };

    if (!data) {
        return error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />;
    }
    const t = data.totals;
    const series = data.series;
    const verificationTone = { verified: 'good', mixed: 'warn', failed: 'bad', claimed: 'neutral', unverifiable: 'neutral' };

    return (
        <>
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <dl className="adm-kpis adm-kpis-6">
                    <Kpi label="Crawler fetches" value={int(t.hits)} />
                    <Kpi label="Crawlers" value={int(t.bots)} />
                    <Kpi label="Pages crawled" value={int(t.pages)} />
                    <Kpi label="Verified fetches" value={int(t.verified_hits)} note="reverse DNS confirmed" />
                    <Kpi label="Failed checks" value={int(t.failed_hits)} note="impostors, likely" />
                    <Kpi label="Unchecked claims" value={int(t.claimed_hits)} />
                </dl>

                <Card title="Crawlers" id="cr-bots" kicker={bot ? `Showing ${bot} only` : 'Fetches per crawler'}
                    actions={bot && <button type="button" className="adm-btn adm-btn-quiet" onClick={() => setBot('')}>All crawlers</button>}>
                    <DataTable caption="Crawlers, with fetches, pages, addresses, last fetch and identity check"
                        columns={[
                            { key: 'bot', label: 'Crawler', primary: true, render: (b) => <button type="button" className="adm-link" onClick={() => setBot(b.bot === bot ? '' : b.bot)} aria-pressed={b.bot === bot}>{b.bot}</button> },
                            { key: 'verification', label: 'Identity', render: (b) => <Badge tone={verificationTone[b.verification] || 'neutral'}>{b.verification === 'verified' ? 'verified' : b.verification === 'unverifiable' ? 'claims to be · no DNS check' : b.verification === 'failed' ? 'claims to be · failed' : b.verification === 'mixed' ? 'mixed: some verified' : 'claims to be'}</Badge> },
                            { key: 'hits', label: 'Fetches', num: true },
                            { key: 'pages', label: 'Pages', num: true },
                            { key: 'ips', label: 'Addresses', num: true },
                            { key: 'last', label: 'Last fetch', nowrap: true, value: (b) => b.last, render: (b) => dateTime(b.last, params.tz) },
                        ]}
                        rows={data.bots} rowKey={(b) => b.bot} pageSize={25} label="crawlers" empty="No crawler fetched anything in this range." />
                </Card>

                {series && series.bots.length > 0 && (
                    <Card title={`Fetches per ${series.granularity}`} id="cr-series" kicker="Each crawler on its own scale">
                        <table className="adm-multiples">
                            <caption className="adm-sr">Fetches per {series.granularity} for each crawler; the totals and peaks are in the columns.</caption>
                            <thead><tr><th scope="col">Crawler</th><th scope="col"><span className="adm-sr">Shape over the range</span></th><th scope="col" className="num">Total</th><th scope="col" className="num">Peak</th></tr></thead>
                            <tbody>
                                {series.bots.map((b) => (
                                    <tr key={b.bot}>
                                        <th scope="row">{b.bot}</th>
                                        <td><Strip values={b.counts} /></td>
                                        <td className="num">{int(b.counts.reduce((a, c) => a + c, 0))}</td>
                                        <td className="num adm-muted">{int(Math.max(0, ...b.counts))}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}

                <div className="adm-grid-3">
                    {[['robots', 'robots.txt'], ['sitemap', 'sitemap.xml'], ['llms', 'llms.txt']].map(([k, name]) => {
                        const f = data.files[k];
                        return (
                            <Card key={k} title={name} id={`cr-${k}`} kicker={f && f.hits ? `${int(f.hits)} fetches · last ${dateTime(f.last, params.tz)}` : 'Not fetched in this range'}>
                                {f && f.bots.length ? (
                                    <RankTable caption="Crawler" rows={f.bots} rowKey={(r) => r.bot} label={(r) => r.bot}
                                        value={(r) => r.hits} valueLabel="Fetches" secondary={(r) => dateTime(r.last, params.tz)} secondaryLabel="Last" limit={8} />
                                ) : <p className="adm-empty">No fetches.</p>}
                            </Card>
                        );
                    })}
                </div>

                <Card title="Pages crawled" id="cr-pages" kicker="Last crawl per page">
                    <DataTable caption="Pages crawled, with fetches, last crawl, crawlers and sitemap status"
                        columns={[
                            { key: 'path', label: 'Page', primary: true, render: (p) => <PageButton path={p.path} /> },
                            { key: 'hits', label: 'Fetches', num: true },
                            { key: 'last', label: 'Last crawl', nowrap: true, render: (p) => dateTime(p.last, params.tz) },
                            { key: 'bots', label: 'Crawlers', sortable: false, render: (p) => <span className="adm-small">{p.bots.join(', ')}</span> },
                            { key: 'in_sitemap', label: 'Sitemap', render: (p) => (p.in_sitemap === true ? 'listed' : p.in_sitemap === false ? <Badge tone="warn">not listed</Badge> : '–') },
                        ]}
                        rows={data.pages} rowKey={(p) => p.path} pageSize={25} label="pages" empty="No pages crawled in this range." />
                </Card>

                <Card title="Addresses" id="cr-ips" kicker="Who claims to be which crawler, and whether reverse DNS agrees"
                    actions={(
                        <>
                            <button type="button" className="adm-btn" disabled={verify.running} onClick={() => runVerify({}, false)}>Check 5 unverified</button>
                            <button type="button" className="adm-btn adm-btn-quiet" disabled={verify.running} onClick={() => runVerify({}, true)}>Check all</button>
                        </>
                    )}>
                    <p className="adm-small adm-muted">Google, Bing, Apple, Yandex and Baidu can be checked: reverse DNS, the name under the operator's own domain, then forward DNS back to the same address. Other crawlers publish no such method and always show "claims to be".</p>
                    <p className="adm-verify-status" role="status" aria-live="polite">
                        {verify.running && <span className="adm-spinner" aria-hidden="true" />}
                        {verify.message}
                    </p>
                    <ErrorNote error={verify.error} />
                    {verify.results.length > 0 && (
                        <ul className="adm-verify-results">
                            {verify.results.map((r) => (
                                <li key={r.ip}><span className="adm-ip">{r.ip}</span> {r.bot} <Verdict verdict={r.verdict} /> {r.ptr && <span className="adm-muted"><Path>{r.ptr}</Path></span>}</li>
                            ))}
                        </ul>
                    )}
                    <DataTable caption="Crawler addresses with identity checks"
                        columns={[
                            { key: 'ip', label: 'Address', primary: true, render: (r) => <span className="adm-ip-cell"><IpButton ip={r.ip} masked={r.ip_masked} />{r.ip_masked && <Badge>masked</Badge>}</span> },
                            { key: 'bot', label: 'Claims to be' },
                            { key: 'hits', label: 'Fetches', num: true },
                            { key: 'last', label: 'Last', nowrap: true, render: (r) => dateTime(r.last, params.tz) },
                            {
                                key: 'verdict', label: 'Check', value: (r) => r.verdict || '',
                                render: (r) => (
                                    <span className="adm-verdict-cell">
                                        <Verdict verdict={r.verdict} />
                                        {r.ptr && <span className="adm-sub"><Path>{r.ptr}</Path></span>}
                                        {r.verifiable && !r.ip_masked && (
                                            <button type="button" className="adm-link adm-small" disabled={verify.running} onClick={() => runVerify({ ip: r.ip }, false)}>
                                                {r.verdict ? 'check again' : 'check'}
                                            </button>
                                        )}
                                    </span>
                                ),
                            },
                        ]}
                        rows={data.ips} rowKey={(r) => `${r.ip}|${r.bot}`} pageSize={20} label="addresses" empty="No crawler addresses in this range." />
                </Card>

                <Card title="Recent fetches" id="cr-recent">
                    <DataTable caption="Recent crawler fetches"
                        columns={[
                            { key: 'ts', label: 'When', nowrap: true, primary: true, render: (r) => dateTime(r.ts, params.tz, { seconds: true }) },
                            { key: 'path', label: 'Path', render: (r) => <Path>{r.path}</Path> },
                            { key: 'kind', label: 'Kind' },
                            { key: 'bot', label: 'Crawler' },
                            { key: 'ip', label: 'Address', render: (r) => <IpButton ip={r.ip} masked={r.ip_masked} /> },
                            { key: 'status', label: 'Status', num: true },
                            { key: 'verdict', label: 'Identity', render: (r) => <Verdict verdict={r.verdict} /> },
                        ]}
                        rows={data.recent} rowKey={(r, i) => `${i}-${r.ts}`} pageSize={25} label="fetches" />
                </Card>

                {data.beacon_bots && data.beacon_bots.length > 0 && (
                    <p className="adm-footnote">
                        Bots that ran the pages' JavaScript and sent beacons (kept out of every human figure):
                        {' '}{data.beacon_bots.map((b) => `${b.bot} ${int(b.pageviews)}`).join(', ')}.
                    </p>
                )}
            </Loadable>
        </>
    );
}

function Health({ d }) {
    const [issue, setIssue] = useState('');
    const rows = useMemo(() => (issue ? d.pages.filter((p) => p.issues.includes(issue)) : d.pages), [d, issue]);
    const withIssues = d.pages.filter((p) => p.issues.length).length;

    return (
        <>
            <p className="adm-lede">
                {int(d.pages_checked)} pages checked from what readers' browsers reported (the latest report per page, not limited to the range).
                {' '}{int(withIssues)} have something to look at.
            </p>
            <div className="adm-chips" role="group" aria-label="Show pages with one issue">
                <button type="button" className="adm-chip" aria-pressed={!issue} onClick={() => setIssue('')}>All <span className="adm-chip-n">{int(d.pages.length)}</span></button>
                {Object.keys(ISSUE_LABELS).map((k) => (
                    <button key={k} type="button" className={`adm-chip${d.summary[k] ? '' : ' is-zero'}`} aria-pressed={issue === k}
                        disabled={!d.summary[k]} onClick={() => setIssue(issue === k ? '' : k)}>
                        {ISSUE_LABELS[k]} <span className="adm-chip-n">{int(d.summary[k] || 0)}</span>
                    </button>
                ))}
            </div>
            <Card title={issue ? ISSUE_LABELS[issue] : 'Pages, most issues first'} id="seo-health">
                <DataTable caption="Page health: issues per page"
                    columns={[
                        {
                            key: 'path', label: 'Page', primary: true, sortable: false,
                            render: (p) => (
                                <div className="adm-health-cell">
                                    <PageButton path={p.path} />
                                    <span className="adm-issues">
                                        {p.issues.length === 0 ? <Badge tone="good">no issues</Badge> : p.issues.map((i) => (
                                            <Badge key={i} tone={SERIOUS.has(i) ? 'bad' : 'warn'}>{ISSUE_LABELS[i] || i}</Badge>
                                        ))}
                                    </span>
                                </div>
                            ),
                        },
                        { key: 'title', label: 'Title', sortable: false, render: (p) => <span className="adm-small">{p.title ?? <em>missing</em>} <span className="adm-muted">({int(p.title_length)})</span></span> },
                        { key: 'description', label: 'Description', sortable: false, render: (p) => <span className="adm-small adm-clamp">{p.description ?? <em>missing</em>}</span> },
                        { key: 'description_length', label: 'Desc. length', num: true },
                        { key: 'h1_count', label: 'H1', num: true },
                        { key: 'checked', label: 'Checked', nowrap: true, render: (p) => <CheckedAt ts={p.checked} /> },
                    ]}
                    rows={rows} rowKey={(p) => p.path} pageSize={25} label="pages" empty="No page facts have been reported yet." />
            </Card>
        </>
    );
}

function CheckedAt({ ts }) {
    const { params } = useDash();
    return <span className="adm-small">{dateTime(ts, params.tz)}</span>;
}

function VitalCell({ v, metric }) {
    if (!v || v.p75 === null || v.p75 === undefined) return <span className="adm-muted">–</span>;
    return (
        <span className="adm-vital-cell">
            <span className="adm-num">{ms(v.p75, metric)}</span>
            <Rating rating={v.rating} />
        </span>
    );
}

function Vitals({ d }) {
    const th = d.thresholds;
    const thText = (m) => (
        <>
            <span className="adm-vital-th">good ≤ {ms(th[m][0], m)}</span>
            <span className="adm-vital-th">poor &gt; {ms(th[m][1], m)}</span>
        </>
    );
    const devices = Object.entries(d.by_device || {}).map(([k, v]) => ({ device: k, ...v }));
    return (
        <>
            <p className="adm-lede">The 75th percentile of what readers' browsers measured on landing (the figure Google uses). {int(d.site.n)} landings in the range.</p>
            <dl className="adm-vitals adm-vitals-big">
                {VITALS.map((m) => (
                    <div key={m} className="adm-vital">
                        <dt><abbr title={VITAL_NAMES[m]}>{m.toUpperCase()}</abbr></dt>
                        <dd className="adm-vital-v">{d.site[m] ? ms(d.site[m].p75, m) : '–'}</dd>
                        <dd><Rating rating={d.site[m] && d.site[m].rating} /></dd>
                        <dd className="adm-small adm-muted">{thText(m)}</dd>
                    </div>
                ))}
            </dl>
            <Card title="By device" id="seo-vit-dev">
                <DataTable caption="Core Web Vitals by device, 75th percentile"
                    columns={[
                        { key: 'device', label: 'Device', primary: true, render: (r) => DEVICE_LABELS[r.device] || r.device },
                        { key: 'n', label: 'Landings', num: true },
                        ...VITALS.map((m) => ({ key: m, label: m.toUpperCase(), sortable: false, render: (r) => <VitalCell v={r[m]} metric={m} /> })),
                    ]}
                    rows={devices} rowKey={(r) => r.device} pageSize={10} label="devices" />
            </Card>
            <Card title="By page" id="seo-vit-pages" kicker="Pages with the most measurements first">
                <DataTable caption="Core Web Vitals per page, 75th percentile"
                    columns={[
                        { key: 'path', label: 'Page', primary: true, render: (r) => <PageButton path={r.path} /> },
                        { key: 'n', label: 'Landings', num: true },
                        ...VITALS.map((m) => ({ key: m, label: m.toUpperCase(), value: (r) => (r[m] ? r[m].p75 : null), num: true, className: 'is-wide', render: (r) => <VitalCell v={r[m]} metric={m} /> })),
                    ]}
                    rows={d.pages} rowKey={(r) => r.path} pageSize={25} label="pages" empty="No speed measurements in this range." />
            </Card>
        </>
    );
}

function NotFound({ d }) {
    const { params } = useDash();
    return (
        <>
            <p className="adm-lede">{int(d.hits)} readers saw the not-found page in the range. The referrer says where the broken link is.</p>
            <Card title="Missing pages" id="seo-404">
                <DataTable caption="Not-found pages with their referrers"
                    columns={[
                        { key: 'path', label: 'Path asked for', primary: true, render: (r) => <Path>{r.path}</Path> },
                        { key: 'hits', label: 'Readers', num: true },
                        { key: 'crawler_hits', label: 'Crawlers', num: true },
                        { key: 'last', label: 'Last', nowrap: true, render: (r) => dateTime(r.last, params.tz) },
                        {
                            key: 'referrers', label: 'Linked from', sortable: false,
                            render: (r) => (
                                <ul className="adm-refs">
                                    {r.referrers.map((x, i) => (
                                        <li key={`${i}-${x.ref}`}>{x.ref === null ? <span className="adm-muted">no referrer (typed or bookmarked)</span> : <Path>{x.ref}</Path>}{x.ref && x.ref.startsWith('/') && <span className="adm-muted"> (on this site)</span>} <span className="adm-num">{int(x.hits)}</span></li>
                                    ))}
                                </ul>
                            ),
                        },
                    ]}
                    rows={d.pages} rowKey={(r) => r.path} pageSize={25} label="paths" empty="Nobody hit a missing page in this range." />
            </Card>
        </>
    );
}

function PathList({ items, empty }) {
    if (!items || !items.length) return <p className="adm-empty">{empty}</p>;
    return (
        <ul className="adm-path-list">
            {items.map((p) => <li key={typeof p === 'string' ? p : p.path}>{typeof p === 'string' ? <PageButton path={p} /> : <><PageButton path={p.path} /> <span className="adm-num">{int(p.views)} views</span></>}</li>)}
        </ul>
    );
}

function Sitemap({ d }) {
    if (!d.available) {
        return <div className="adm-error" role="alert"><p className="adm-error-title">The sitemap could not be read</p><p>{d.error || 'sitemap.xml was not found.'}</p></div>;
    }
    return (
        <>
            <Facts className="adm-facts-row" items={[
                ['URLs in sitemap.xml', int(d.url_count)],
                ['Never visited in the range', int(d.never_visited.length)],
                ['Never crawled in the range', int(d.never_crawled.length)],
                ['Visited but not listed', int(d.not_in_sitemap.length)],
            ]} />
            <div className="adm-grid-3">
                <Card title="Listed, never visited" id="sm-unvisited" kicker="In the sitemap; no reader in the range">
                    <PathList items={d.never_visited} empty="Every listed page was visited." />
                </Card>
                <Card title="Listed, never crawled" id="sm-uncrawled" kicker="In the sitemap; no crawler in the range">
                    <PathList items={d.never_crawled} empty="Every listed page was crawled." />
                </Card>
                <Card title="Visited, not listed" id="sm-missing" kicker="Readers reach them; the sitemap does not list them">
                    <PathList items={d.not_in_sitemap} empty="Every visited page is in the sitemap." />
                </Card>
            </div>
        </>
    );
}

function Tools({ d }) {
    return (
        <>
            <p className="adm-lede">Plain links to the search engines' own tools. Nothing is sent from this dashboard; each opens in a new tab and asks you to sign in there.</p>
            <ul className="adm-tool-links">
                <li><OutLink href={d.search_console}>Google Search Console</OutLink></li>
                <li><OutLink href={d.bing_webmaster}>Bing Webmaster Tools</OutLink></li>
                <li><OutLink href={d.pagespeed_site}>PageSpeed Insights for the home page</OutLink></li>
            </ul>
            <Card title="Top pages" id="seo-tools-pages" kicker="Check the most-read pages one by one">
                <DataTable caption="Top pages with links to PageSpeed Insights and Search Console"
                    columns={[
                        { key: 'path', label: 'Page', primary: true, render: (r) => <PageButton path={r.path} /> },
                        { key: 'views', label: 'Views', num: true },
                        { key: 'pagespeed', label: 'PageSpeed', sortable: false, render: (r) => <OutLink href={r.pagespeed}>PageSpeed</OutLink> },
                        { key: 'inspect', label: 'Search Console', sortable: false, render: (r) => <OutLink href={r.search_console_inspect}>Inspect URL</OutLink> },
                    ]}
                    rows={d.pages} rowKey={(r) => r.path} pageSize={15} label="pages" />
            </Card>
        </>
    );
}

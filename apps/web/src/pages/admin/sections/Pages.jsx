import React, { useEffect, useState } from 'react';
import { useApi } from '../api';
import { TimeChart } from '../charts';
import { PageButton, RankTable, SectionHead, SourceName } from '../common';
import { dateTime, duration, int, ms, pct } from '../format';
import { useDash } from '../state';
import { Badge, Card, DataTable, Delta, ErrorNote, Facts, Kpi, Loadable, Loading, Path, Rating } from '../ui';

const SORTS = ['views', 'visitors', 'entries', 'exits', 'engaged', 'scroll', 'change', 'path'];

function kpiOf(value, previous) {
    const v = Number(value) || 0;
    const p = Number(previous) || 0;
    return { value: v, previous: p, change: v - p, change_pct: p > 0 ? Math.round(((v - p) * 1000) / p) / 10 : null };
}

export default function Pages() {
    const { sp } = useDash();
    const path = sp.get('path');
    return path ? <PageDetail path={path} /> : <PageList />;
}

function PageList() {
    const { params, sp, go, compare } = useDash();
    const sort = SORTS.includes(sp.get('sort')) ? sp.get('sort') : 'views';
    const dir = sp.get('dir') === 'asc' ? 'asc' : 'desc';
    const group = sp.get('group') || '';
    const prefix = sp.get('prefix') || '';
    const [prefixDraft, setPrefixDraft] = useState(prefix);
    useEffect(() => setPrefixDraft(prefix), [prefix]);

    const { data, error, loading, reload } = useApi('stats', {
        section: 'pages', ...params, sort, dir, group: group || undefined, prefix: prefix || undefined, limit: 2000,
    });

    const columns = [
        {
            key: 'path', label: 'Page', sortKey: 'path', primary: true,
            render: (r) => (
                <div className="adm-page-cell">
                    <PageButton path={r.path} title={r.title} />
                    {r.title && <span className="adm-page-title">{r.title}</span>}
                    {r.not_found && <Badge tone="bad">not found</Badge>}
                </div>
            ),
        },
        { key: 'views', label: 'Views', num: true, sortKey: 'views' },
        { key: 'visitors', label: 'Visitors', num: true, sortKey: 'visitors' },
        { key: 'entries', label: 'Entries', num: true, sortKey: 'entries' },
        { key: 'exits', label: 'Exits', num: true, sortKey: 'exits' },
        { key: 'avg_engaged_s', label: 'Engaged', num: true, sortKey: 'engaged', format: duration },
        { key: 'avg_scroll_pct', label: 'Scroll', num: true, sortKey: 'scroll', format: pct },
        ...(compare ? [{
            key: 'change_pct', label: 'Change', num: true, sortKey: 'change',
            render: (r) => <Delta kpi={{ change_pct: r.change_pct, previous: r.prev_views, value: r.views }} compact />,
        }] : []),
    ];

    const submitPrefix = (e) => {
        e.preventDefault();
        let p = prefixDraft.trim();
        if (p && !p.startsWith('/')) p = `/${p}`;
        go({ prefix: p || null }, { replace: true });
    };

    return (
        <>
            <SectionHead title="Pages" range={data && data.range} sub="Every page read in the range" />
            <ErrorNote error={error} onRetry={reload} />
            {!data && !error && <Loading />}
            {data && (
                <Loadable loading={loading}>
                    <div className="adm-toolbar">
                        <div className="adm-chips" role="group" aria-label="Show one group of pages">
                            <button type="button" className="adm-chip" aria-pressed={!group} onClick={() => go({ group: null }, { replace: true })}>
                                All <span className="adm-chip-n">{int(data.groups.reduce((a, g) => a + g.pages, 0))}</span>
                            </button>
                            {data.groups.map((g) => (
                                <button key={g.group} type="button" className="adm-chip" aria-pressed={group === g.group}
                                    onClick={() => go({ group: group === g.group ? null : g.group }, { replace: true })}
                                    title={`${int(g.views)} views · ${int(g.visitors)} visitors · ${int(g.pages)} pages`}>
                                    {g.label} <span className="adm-chip-n">{int(g.views)}</span>
                                </button>
                            ))}
                        </div>
                        <form className="adm-inline-form" onSubmit={submitPrefix} role="search" aria-label="Pages under a path">
                            <label htmlFor="pg-prefix">Under</label>
                            <input id="pg-prefix" type="text" inputMode="url" placeholder="/third-lamp/education" value={prefixDraft}
                                onChange={(e) => setPrefixDraft(e.target.value)} spellCheck={false} autoCapitalize="off" />
                            <button type="submit" className="adm-btn">Filter</button>
                            {prefix && <button type="button" className="adm-btn adm-btn-quiet" onClick={() => go({ prefix: null }, { replace: true })}>Clear</button>}
                        </form>
                    </div>

                    <div className="adm-grid-main">
                        <Card title={`${int(data.total_pages)} pages`} id="pg-all" kicker={group ? data.groups.find((g) => g.group === group)?.label : prefix ? `Under ${prefix}` : 'All groups'}>
                            <DataTable
                                caption="Pages, with views, visitors, entries, exits, engaged time, scroll depth and change"
                                columns={columns}
                                rows={data.pages}
                                rowKey={(r) => r.path}
                                pageSize={50}
                                sort={{ key: sort, dir }}
                                onSort={({ key, dir: d }) => go({ sort: key === 'views' && d === 'desc' ? null : key, dir: d === 'desc' ? null : d }, { replace: true })}
                                label="pages"
                                empty="No pages viewed in this range."
                            />
                            {data.total_pages > data.pages.length && (
                                <p className="adm-footnote">Showing the first {int(data.pages.length)} of {int(data.total_pages)} pages in this order.</p>
                            )}
                        </Card>
                        <Card title="Rising" id="pg-rising" kicker="Biggest gains on the previous period">
                            <RankTable caption="Page" rows={data.rising} rowKey={(r) => r.path}
                                label={(r) => <PageButton path={r.path} title={r.title} />}
                                value={(r) => r.gain} valueLabel="Gain"
                                secondary={(r) => `${int(r.prev_views)} → ${int(r.views)}`} secondaryLabel="Views"
                                empty="No page gained views on the previous period." />
                        </Card>
                    </div>
                </Loadable>
            )}
        </>
    );
}

function PageDetail({ path }) {
    const { params, go, compare } = useDash();
    const { data, error, loading, reload } = useApi('stats', { section: 'page', path, ...params });
    const back = <button type="button" className="adm-back" onClick={() => go({ path: null })}>← All pages</button>;

    if (!data) {
        return (
            <>
                {back}
                <SectionHead title="Page" sub={path} />
                {error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />}
            </>
        );
    }
    const t = data.totals;
    const f = data.facts;

    return (
        <>
            {back}
            <SectionHead title="Page" range={data.range} />
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <div className="adm-page-id">
                    <p className="adm-page-path"><Path>{data.path}</Path></p>
                    {data.title && <p className="adm-page-title">{data.title}</p>}
                    <p className="adm-badges">
                        <Badge>{data.group}</Badge>
                        {data.in_sitemap === true && <Badge tone="good">in sitemap</Badge>}
                        {data.in_sitemap === false && <Badge tone="warn">not in sitemap</Badge>}
                        {data.not_found && <Badge tone="bad">not found (404)</Badge>}
                    </p>
                </div>

                <dl className="adm-kpis adm-kpis-6">
                    <Kpi label="Views" value={int(t.views)} kpi={compare && kpiOf(t.views, data.previous.views)} previousText={compare ? `previous ${int(data.previous.views)}` : null} />
                    <Kpi label="Visitors" value={int(t.visitors)} kpi={compare && kpiOf(t.visitors, data.previous.visitors)} previousText={compare ? `previous ${int(data.previous.visitors)}` : null} />
                    <Kpi label="Entries" value={int(t.entries)} note="visits that began here" />
                    <Kpi label="Exits" value={int(t.exits)} note="visits that ended here" />
                    <Kpi label="Engaged time" value={duration(t.avg_engaged_s)} note="average, tab visible" />
                    <Kpi label="Scroll depth" value={pct(t.avg_scroll_pct)} note="average maximum" />
                </dl>

                <Card title="Views" id="pd-trend">
                    <TimeChart points={data.series.points} valueKey="views" name="Views" granularity={data.series.granularity} showPrevious={false} height={180} />
                </Card>

                <div className="adm-grid-3">
                    <Card title="Arrived from" id="pd-src" kicker="Visits that began on this page">
                        <RankTable caption="Source" rows={data.sources} rowKey={(r) => `${r.channel}:${r.name}`}
                            label={(r) => <SourceName row={r} />} value={(r) => r.entries} valueLabel="Entries" limit={15}
                            empty="No visit began here in this range." />
                    </Card>
                    <Card title="Came from page" id="pd-prev" kicker="The page read just before, in the same visit">
                        <RankTable caption="Previous page" rows={data.previous_pages} rowKey={(r) => r.path}
                            label={(r) => <PageButton path={r.path} />} value={(r) => r.views} valueLabel="Views" limit={15}
                            empty="Nobody came here from another page." />
                    </Card>
                    <Card title="Went on to" id="pd-next" kicker={`${int(data.left_site)} views were the last of their visit`}>
                        <RankTable caption="Next page" rows={data.next_pages} rowKey={(r) => r.path}
                            label={(r) => <PageButton path={r.path} />} value={(r) => r.views} valueLabel="Views" limit={15}
                            empty="Nobody went on to another page." />
                    </Card>
                </div>

                <div className="adm-grid-2">
                    <Card title="What the page reports" id="pd-facts" kicker={f ? `Checked ${dateTime(f.checked, params.tz)}` : 'Page facts'}>
                        {f ? (
                            <Facts items={[
                                ['Title', <>{f.title ?? <em>missing</em>} {f.title && <span className="adm-muted">({int(f.title.length)} chars)</span>}</>],
                                ['Description', <>{f.description ?? <em>missing</em>} {f.description && <span className="adm-muted">({int(f.description.length)} chars)</span>}</>],
                                ['Canonical', f.canonical ? <Path>{f.canonical}</Path> : <em>missing</em>],
                                ['Robots', f.robots ?? <span className="adm-muted">none (indexable)</span>],
                                ['Language', f.lang ?? <em>missing</em>],
                                ['H1 headings', int(f.h1_count)],
                                ['Open Graph', `${f.og_title ? 'title' : 'no title'}, ${f.og_image ? 'image' : 'no image'}`],
                                ['Images without alt', int(f.img_no_alt)],
                            ]} />
                        ) : <p className="adm-empty">No reader has reported this page's facts yet.</p>}
                    </Card>
                    <Card title="Core Web Vitals" id="pd-vitals" kicker={data.vitals ? `75th percentile of ${int(data.vitals.n)} landings` : 'Speed as readers felt it'}>
                        {data.vitals ? (
                            <dl className="adm-vitals">
                                {['lcp', 'inp', 'cls', 'fcp', 'ttfb'].map((m) => data.vitals[m] && (
                                    <div key={m} className="adm-vital">
                                        <dt>{m.toUpperCase()}</dt>
                                        <dd className="adm-vital-v">{ms(data.vitals[m].p75, m)}</dd>
                                        <dd><Rating rating={data.vitals[m].rating} /></dd>
                                    </div>
                                ))}
                            </dl>
                        ) : <p className="adm-empty">No speed measurements for this page in the range.</p>}
                    </Card>
                </div>

                <Card title="Crawlers" id="pd-crawls"
                    kicker={data.crawls && data.crawls.hits ? `${int(data.crawls.hits)} fetches · last ${dateTime(data.crawls.last, params.tz)}` : 'Search engine and AI crawler fetches'}>
                    {data.crawls && data.crawls.bots.length ? (
                        <RankTable caption="Crawler" rows={data.crawls.bots} rowKey={(r) => r.bot}
                            label={(r) => r.bot} value={(r) => r.hits} valueLabel="Fetches"
                            secondary={(r) => dateTime(r.last, params.tz)} secondaryLabel="Last" />
                    ) : <p className="adm-empty">No crawler fetched this page in the range.</p>}
                </Card>

                <p className="adm-actions">
                    <button type="button" className="adm-btn" onClick={() => go({ v: 'visitors', f_page: data.path })}>Visits that read this page</button>
                </p>
            </Loadable>
        </>
    );
}

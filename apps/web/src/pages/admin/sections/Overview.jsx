import React, { useState } from 'react';
import { useApi } from '../api';
import { Sparkline, TimeChart } from '../charts';
import { CountryName, PageButton, RankTable, SectionHead, SourceName } from '../common';
import { dec2, duration, int, pct } from '../format';
import { useDash } from '../state';
import { Card, ErrorNote, Kpi, Loadable, Loading, Segmented } from '../ui';

const METRICS = [
    { value: 'visitors', label: 'Visitors' },
    { value: 'visits', label: 'Visits' },
    { value: 'pageviews', label: 'Pageviews' },
];

export default function Overview() {
    const { params, compare, go } = useDash();
    const { data, error, loading, reload } = useApi('stats', { section: 'overview', ...params });
    const [metric, setMetric] = useState('visitors');

    if (!data) {
        return (
            <>
                <SectionHead title="Overview" sub="Traffic at a glance" />
                {error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />}
            </>
        );
    }

    const k = data.kpis;
    const pts = data.series.points;
    const spark = (key) => <Sparkline values={pts.map((p) => p[key])} />;
    const prev = (kpi, f = int) => (compare ? `previous ${f(kpi.previous)}` : null);
    // Ratios (per visit, bounce, length) mean nothing against a period with no visits.
    const hasPrev = k.visits.previous > 0;
    const ratioPrev = (kpi, f) => (compare ? (hasPrev ? `previous ${f(kpi.previous)}` : 'no visits before') : null);
    const metricLabel = METRICS.find((m) => m.value === metric).label;

    return (
        <>
            <SectionHead title="Overview" range={data.range} />
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <dl className="adm-kpis">
                    <Kpi label="Visitors" value={int(k.visitors.value)} kpi={compare && k.visitors} previousText={prev(k.visitors)} spark={spark('visitors')} />
                    <Kpi label="Visits" value={int(k.visits.value)} kpi={compare && k.visits} previousText={prev(k.visits)} spark={spark('visits')} />
                    <Kpi label="Pageviews" value={int(k.pageviews.value)} kpi={compare && k.pageviews} previousText={prev(k.pageviews)} spark={spark('pageviews')} />
                    <Kpi label="Views per visit" value={dec2(k.views_per_visit.value)} kpi={compare && hasPrev && k.views_per_visit} previousText={ratioPrev(k.views_per_visit, dec2)} />
                    <Kpi label="Bounce rate" value={pct(k.bounce_rate.value)} kpi={compare && hasPrev && k.bounce_rate} kind="points" goodWhenUp={false}
                        previousText={ratioPrev(k.bounce_rate, pct)} note="visits of one page" />
                    <Kpi label="Average visit" value={duration(k.avg_visit_s.value)} kpi={compare && hasPrev && k.avg_visit_s} previousText={ratioPrev(k.avg_visit_s, duration)} />
                    <Kpi live label="Live now" value={int(data.live.visitors)}
                        note={<>{int(data.live.pageviews)} pageviews in the last 5 min · <button type="button" className="adm-link" onClick={() => go({ v: 'visitors' })}>watch</button></>} />
                </dl>

                <Card title="Traffic" id="ov-traffic"
                    actions={<Segmented label="Metric shown in the chart" name="ov-metric" options={METRICS} value={metric} onChange={setMetric} />}>
                    <TimeChart
                        points={pts}
                        previous={data.series.previous}
                        valueKey={metric}
                        name={metricLabel}
                        granularity={data.series.granularity}
                        showPrevious={compare}
                    />
                </Card>

                <div className="adm-grid-3">
                    <Card title="Top pages" id="ov-pages"
                        actions={<button type="button" className="adm-link" onClick={() => go({ v: 'pages' })}>All pages</button>}>
                        <RankTable caption="Page" rows={data.top_pages} rowKey={(r) => r.path}
                            label={(r) => <PageButton path={r.path} />}
                            value={(r) => r.views} valueLabel="Views" secondary={(r) => int(r.visitors)} secondaryLabel="Visitors" />
                    </Card>
                    <Card title="Top sources" id="ov-sources"
                        actions={<button type="button" className="adm-link" onClick={() => go({ v: 'sources' })}>All sources</button>}>
                        <RankTable caption="Source" rows={data.top_sources} rowKey={(r) => `${r.channel}:${r.name}`}
                            label={(r) => <SourceName row={r} />}
                            value={(r) => r.visits} valueLabel="Visits" secondary={(r) => int(r.visitors)} secondaryLabel="Visitors" />
                    </Card>
                    <Card title="Top countries" id="ov-countries"
                        actions={<span className="adm-muted adm-small">from the time zone</span>}>
                        <RankTable caption="Country" rows={data.top_countries} rowKey={(r) => r.country || 'unknown'}
                            label={(r) => <CountryName row={r} />}
                            value={(r) => r.visits} valueLabel="Visits" secondary={(r) => int(r.visitors)} secondaryLabel="Visitors" />
                    </Card>
                </div>

                <p className="adm-footnote">
                    Visitors are counted per day: one person on three days counts three times (no cookies are used).
                    {' '}Not counted here: {int(data.excluded.owner_pageviews)} of your own pageviews,
                    {' '}{int(data.excluded.bot_pageviews)} from bots and {int(data.excluded.headless_pageviews)} from headless browsers.
                </p>
            </Loadable>
        </>
    );
}

import React from 'react';
import { useApi } from '../api';
import { Bar, TimeChart } from '../charts';
import { SectionHead } from '../common';
import { dateTime, dec1, int, pct } from '../format';
import { useDash } from '../state';
import { Card, DataTable, ErrorNote, Kpi, Loadable, Loading } from '../ui';

// The Scriptorium's own search: what readers look for, and what they look
// for and do not find.

export default function Search() {
    const { params } = useDash();
    const { data, error, loading, reload } = useApi('stats', { section: 'search', ...params });

    if (!data) {
        return (
            <>
                <SectionHead title="Search" sub="The site's own search" />
                {error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />}
            </>
        );
    }
    const t = data.totals;
    const maxTop = Math.max(1, ...data.top.map((q) => q.searches));
    const maxGap = Math.max(1, ...data.no_results.map((q) => q.searches));

    return (
        <>
            <SectionHead title="Search" range={data.range} />
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <dl className="adm-kpis adm-kpis-4">
                    <Kpi label="Searches" value={int(t.searches)} />
                    <Kpi label="Different queries" value={int(t.unique_queries)} />
                    <Kpi label="Searchers" value={int(t.searchers)} note="counted per day" />
                    <Kpi label="Found nothing" value={int(t.no_result_searches)} note={`${pct(t.searches ? (t.no_result_searches * 100) / t.searches : null)} of searches`} />
                </dl>

                <Card title="Searches" id="se-chart">
                    <TimeChart points={data.per_day.points} valueKey="searches" name="Searches" granularity={data.per_day.granularity} showPrevious={false} height={180} />
                </Card>

                <div className="adm-grid-2">
                    <Card title="Top queries" id="se-top" kicker="Lower-cased and trimmed">
                        <DataTable caption="Top search queries"
                            columns={[
                                { key: 'query', label: 'Query', primary: true, render: (q) => <div className="adm-rank-label-cell"><span className="adm-query">{q.query}</span><Bar value={q.searches} max={maxTop} /></div> },
                                { key: 'searches', label: 'Searches', num: true },
                                { key: 'visitors', label: 'Visitors', num: true },
                                { key: 'avg_results', label: 'Results', num: true, format: dec1 },
                                { key: 'last', label: 'Last', nowrap: true, render: (q) => dateTime(q.last, params.tz) },
                            ]}
                            rows={data.top} rowKey={(q) => q.query} pageSize={25} label="queries"
                            empty="Nobody searched in this range." />
                    </Card>
                    <Card title="Content gaps" id="se-gaps" kicker="Searches that found nothing">
                        <DataTable caption="Search queries with no results"
                            columns={[
                                { key: 'query', label: 'Query', primary: true, render: (q) => <div className="adm-rank-label-cell"><span className="adm-query">{q.query}</span><Bar value={q.searches} max={maxGap} /></div> },
                                { key: 'searches', label: 'Searches', num: true },
                                { key: 'visitors', label: 'Visitors', num: true },
                                { key: 'last', label: 'Last', nowrap: true, render: (q) => dateTime(q.last, params.tz) },
                            ]}
                            rows={data.no_results} rowKey={(q) => q.query} pageSize={25} label="queries"
                            empty="Every search found something." />
                    </Card>
                </div>
            </Loadable>
        </>
    );
}

import React, { useMemo, useState } from 'react';
import { useApi } from '../api';
import { Bar } from '../charts';
import { ChannelTag, PageButton, SectionHead } from '../common';
import { CHANNEL_LABELS, int, pct } from '../format';
import { useDash } from '../state';
import { Card, DataTable, Delta, ErrorNote, Loadable, Loading, Pager, Path } from '../ui';

const PAGE = 20;

export default function Sources() {
    const { params, go, compare } = useDash();
    const { data, error, loading, reload } = useApi('stats', { section: 'sources', ...params });
    const [channel, setChannel] = useState('');
    const [offset, setOffset] = useState(0);

    const sources = useMemo(() => {
        if (!data) return [];
        return channel ? data.sources.filter((s) => s.channel === channel) : data.sources;
    }, [data, channel]);

    if (!data) {
        return (
            <>
                <SectionHead title="Sources" sub="Where visits come from" />
                {error ? <ErrorNote error={error} onRetry={reload} /> : <Loading />}
            </>
        );
    }

    const maxChannel = Math.max(...data.channels.map((c) => c.visits));
    const pick = (c) => { setChannel(c); setOffset(0); };

    return (
        <>
            <SectionHead title="Sources" range={data.range} />
            <ErrorNote error={error} onRetry={reload} />
            <Loadable loading={loading}>
                <Card title="Channels" id="src-channels">
                    <DataTable
                        caption="Visits by channel"
                        stack
                        columns={[
                            {
                                key: 'label', label: 'Channel', primary: true, sortable: false,
                                render: (r) => (
                                    <div className="adm-rank-label-cell">
                                        <button type="button" className="adm-link" aria-pressed={channel === r.channel}
                                            onClick={() => pick(channel === r.channel ? '' : r.channel)}>
                                            {r.label}
                                        </button>
                                        <Bar value={r.visits} max={maxChannel} />
                                    </div>
                                ),
                            },
                            { key: 'visits', label: 'Visits', num: true },
                            { key: 'visitors', label: 'Visitors', num: true },
                            { key: 'pageviews', label: 'Pageviews', num: true },
                            { key: 'bounce_rate', label: 'Bounce', num: true, format: pct },
                            ...(compare ? [{ key: 'change_pct', label: 'Change', num: true, render: (r) => <Delta kpi={{ change_pct: r.change_pct, previous: r.prev_visits, value: r.visits }} compact /> }] : []),
                        ]}
                        rows={data.channels}
                        rowKey={(r) => r.channel}
                        pageSize={10}
                    />
                </Card>

                <Card title="Sources" id="src-list"
                    kicker={channel ? `${CHANNEL_LABELS[channel]} only` : 'Every referring site, grouped'}
                    actions={channel && <button type="button" className="adm-btn adm-btn-quiet" onClick={() => pick('')}>Show all channels</button>}>
                    {sources.length === 0 ? <p className="adm-empty">No visits from this channel in the range.</p> : (
                        <>
                            <ul className="adm-sources">
                                {sources.slice(offset, offset + PAGE).map((s) => <SourceRow key={`${s.channel}:${s.name}`} s={s} go={go} />)}
                            </ul>
                            <Pager offset={offset} limit={PAGE} total={sources.length} onChange={setOffset} label="sources" />
                        </>
                    )}
                </Card>

                <Card title="Campaigns" id="src-utm" kicker="Links tagged with utm_source, utm_medium, utm_campaign">
                    <DataTable
                        caption="UTM campaigns"
                        columns={[
                            { key: 'source', label: 'Source', primary: true },
                            { key: 'medium', label: 'Medium' },
                            { key: 'campaign', label: 'Campaign' },
                            { key: 'visits', label: 'Visits', num: true },
                            { key: 'visitors', label: 'Visitors', num: true },
                            { key: 'pageviews', label: 'Pageviews', num: true },
                        ]}
                        rows={data.campaigns}
                        rowKey={(r) => `${r.source}|${r.medium}|${r.campaign}`}
                        pageSize={20}
                        defaultSort={{ key: 'visits', dir: 'desc' }}
                        empty="No tagged links were followed in this range."
                        label="campaigns"
                    />
                </Card>
            </Loadable>
        </>
    );
}

function SourceRow({ s, go }) {
    // "Unknown" is a label, not a stored source name: filter by channel alone.
    const filterKey = s.channel === 'direct' ? 'Direct' : (s.name === 'Unknown' ? null : s.name);
    return (
        <li className="adm-source-row">
            <details>
                <summary>
                    <span className="adm-source-name"><ChannelTag channel={s.channel} /> <span>{s.name}</span></span>
                    <span className="adm-source-nums">
                        <span><strong>{int(s.visits)}</strong> visits</span>
                        <span className="adm-muted">{int(s.visitors)} visitors</span>
                        <span className="adm-muted">{pct(s.bounce_rate)} bounce</span>
                    </span>
                </summary>
                <div className="adm-source-body">
                    <div>
                        <h4 className="adm-mini-h">Hosts and referring pages</h4>
                        {s.hosts.length === 0 ? <p className="adm-empty">No referrer: typed, bookmarked, or the referring site sent none.</p> : (
                            <ul className="adm-hosts">
                                {s.hosts.map((h) => (
                                    <li key={h.host}>
                                        <div className="adm-host"><Path>{h.host}</Path> <span className="adm-num">{int(h.visits)}</span></div>
                                        {h.referrers.length > 0 && (
                                            <ul className="adm-refs">
                                                {h.referrers.map((r) => (
                                                    <li key={r.ref}><Path>{r.ref}</Path> <span className="adm-num">{int(r.visits)}</span></li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div>
                        <h4 className="adm-mini-h">Landing pages</h4>
                        <ul className="adm-landings">
                            {s.landing_pages.map((p) => (
                                <li key={p.path}><PageButton path={p.path} /> <span className="adm-num">{int(p.visits)}</span></li>
                            ))}
                        </ul>
                        <p><button type="button" className="adm-link" onClick={() => go({ v: 'visitors', f_source: filterKey, f_channel: s.channel })}>See these visits</button></p>
                    </div>
                </div>
            </details>
        </li>
    );
}

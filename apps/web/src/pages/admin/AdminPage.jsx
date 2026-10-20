import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiError, apiGet, apiPost, browserTimeZone, clearCache, onUnauthenticated } from './api';
import { GateMessage, Login, Setup } from './Auth';
import { DashContext, patchSearch, RANGES, rangeParams, readGlobal, SECTIONS } from './state';
import Overview from './sections/Overview';
import Pages from './sections/Pages';
import Sources from './sections/Sources';
import Visitors from './sections/Visitors';
import Search from './sections/Search';
import Seo from './sections/Seo';
import Technology from './sections/Technology';
import Settings from './sections/Settings';
import './admin.css';

// /admin — the owner's private dashboard. Lazy-loaded from App.jsx, so none of
// this reaches a reader's bundle. noindex, not in the sitemap, llms.txt or the
// search index, and not linked from anywhere on the site.

const VIEWS = {
    overview: Overview,
    pages: Pages,
    sources: Sources,
    visitors: Visitors,
    search: Search,
    seo: Seo,
    technology: Technology,
    settings: Settings,
};

export default function AdminPage() {
    const [auth, setAuth] = useState({ status: 'checking' });

    const check = useCallback(async () => {
        setAuth({ status: 'checking' });
        try {
            // health answers 200 signed in or out, so a signed-out visit
            // makes no failed request: it says whether setup is complete.
            const h = await apiGet('health', {});
            if (!h.configured) {
                setAuth({ status: 'setup', missing: h.missing || [] });
                return;
            }
            if (!h.authenticated) {
                setAuth({ status: 'login' });
                return;
            }
            const me = await apiGet('me', {});
            setAuth({ status: 'ready', email: me.email, expires: me.expires });
        } catch (e) {
            if (e instanceof ApiError && e.code === 'unauthenticated') setAuth({ status: 'login' });
            else if (e instanceof ApiError && e.code === 'not_configured') setAuth({ status: 'setup', missing: (e.body && e.body.missing) || [] });
            else setAuth({ status: 'error', error: e });
        }
    }, []);

    useEffect(() => { check(); }, [check]);

    useEffect(() => {
        onUnauthenticated(() => {
            clearCache();
            setAuth({ status: 'login', notice: 'Your session has ended. Please sign in again.' });
        });
        return () => onUnauthenticated(null);
    }, []);

    const signOut = useCallback(async () => {
        try { await apiPost('logout', {}); } catch { /* signed out locally either way */ }
        clearCache();
        setAuth({ status: 'login', notice: 'You are signed out. This browser counts in the stats again.' });
    }, []);

    let body;
    if (auth.status === 'checking') {
        body = <main className="adm-gate" id="adm-main" aria-busy="true"><p className="adm-loading" role="status"><span className="adm-spinner" aria-hidden="true" />Opening the dashboard…</p></main>;
    } else if (auth.status === 'setup') {
        body = <Setup missing={auth.missing} />;
    } else if (auth.status === 'login') {
        body = (
            <Login notice={auth.notice}
                onSignedIn={(res) => { clearCache(); setAuth({ status: 'ready', email: res.email, expires: res.expires }); }}
                onNotConfigured={(missing) => setAuth({ status: 'setup', missing })} />
        );
    } else if (auth.status === 'error') {
        body = (
            <GateMessage title="The dashboard could not start">
                <p className="adm-gate-lede">{auth.error && auth.error.message}</p>
                <p><button type="button" className="adm-btn adm-btn-primary" onClick={check}>Try again</button></p>
            </GateMessage>
        );
    } else {
        body = <Dashboard email={auth.email} expires={auth.expires} signOut={signOut} unauthenticated={() => setAuth({ status: 'login', notice: 'Your session has ended. Please sign in again.' })} />;
    }

    return (
        <div className="adm">
            <Helmet>
                <title>Dashboard · Three Magi Press</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            {body}
        </div>
    );
}

function Dashboard({ email, expires, signOut, unauthenticated }) {
    const [sp] = useSearchParams();
    const navigate = useNavigate();
    const global = useMemo(() => readGlobal(sp), [sp]);
    const tz = useMemo(() => browserTimeZone(), []);
    const params = useMemo(() => rangeParams(global, tz), [global, tz]);

    const go = useCallback((patch, { replace = false } = {}) => {
        navigate({ pathname: '/admin', search: patchSearch(sp, patch) }, { replace });
    }, [navigate, sp]);

    // A new section or drill-down starts at the top with focus on its heading,
    // so keyboard and screen-reader users land where the content changed.
    const where = `${global.v}|${sp.get('path') || ''}|${sp.get('ip') || ''}|${sp.get('part') || ''}`;
    const first = useRef(true);
    useEffect(() => {
        if (first.current) { first.current = false; return; }
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        const id = requestAnimationFrame(() => {
            const h = document.getElementById('adm-h2');
            if (h) h.focus({ preventScroll: true });
        });
        return () => cancelAnimationFrame(id);
    }, [where]);

    const ctx = useMemo(() => ({ sp, global, params, go, compare: global.compare, email, expires, signOut, unauthenticated }),
        [sp, global, params, go, email, expires, signOut, unauthenticated]);
    const View = VIEWS[global.v] || Overview;

    return (
        <DashContext.Provider value={ctx}>
            <a className="adm-skip" href="#adm-main">Skip to the figures</a>
            <header className="adm-top">
                <div className="adm-brand">
                    <span className="adm-brand-mark" aria-hidden="true">✶</span>
                    <span>
                        <span className="adm-brand-name">Three Magi Press</span>
                        <span className="adm-brand-sub">Dashboard</span>
                    </span>
                </div>
                <div className="adm-top-right">
                    <span className="adm-who" title={email}>{email}</span>
                    <a className="adm-btn adm-btn-quiet" href="/">Site</a>
                    <button type="button" className="adm-btn adm-btn-quiet" onClick={signOut}>Sign out</button>
                </div>
            </header>
            <nav className="adm-tabs" aria-label="Dashboard sections">
                <ul>
                    {SECTIONS.map((s) => (
                        <li key={s.key}>
                            <Link to={{ pathname: '/admin', search: patchSearch(sp, { v: s.key }) }} aria-current={global.v === s.key ? 'page' : undefined}>
                                {s.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <RangeBar global={global} go={go} tz={tz} />
            <main className="adm-main" id="adm-main">
                <View key={global.v} />
            </main>
        </DashContext.Provider>
    );
}

function todayIn(tz) {
    try {
        return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    } catch {
        return new Date().toISOString().slice(0, 10);
    }
}

function shiftDay(day, n) {
    const d = new Date(`${day}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
}

function RangeBar({ global, go, tz }) {
    const today = todayIn(tz);
    const [custom, setCustom] = useState(global.range === 'custom');
    const [from, setFrom] = useState(global.from || shiftDay(today, -29));
    const [to, setTo] = useState(global.to || today);
    const [msg, setMsg] = useState('');
    useEffect(() => {
        setCustom(global.range === 'custom');
        if (global.range === 'custom') { setFrom(global.from); setTo(global.to); }
    }, [global.range, global.from, global.to]);

    const pick = (value) => {
        setMsg('');
        if (value === 'custom') {
            setCustom(true);
            return;
        }
        setCustom(false);
        go({ range: value, from: null, to: null, off: null }, { replace: false });
    };
    const apply = (e) => {
        e.preventDefault();
        if (!from || !to) { setMsg('Choose both days.'); return; }
        if (from > to) { setMsg('The first day must not be after the last.'); return; }
        if (to > today) { setMsg('The last day cannot be after today.'); return; }
        const days = Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000) + 1;
        if (days > 731) { setMsg('A custom range can be at most 731 days.'); return; }
        setMsg('');
        go({ range: 'custom', from, to, off: null });
    };
    const shown = custom ? 'custom' : global.range;

    return (
        <div className="adm-rangebar" role="region" aria-label="Date range and options">
            <fieldset className="adm-seg adm-seg-range">
                <legend className="adm-sr">Date range</legend>
                {RANGES.map((r) => (
                    <label key={r.value} className={`adm-seg-opt${shown === r.value ? ' is-on' : ''}`}>
                        <input type="radio" name="adm-range" value={r.value} checked={shown === r.value} onChange={() => pick(r.value)} />
                        <span aria-hidden="true">{r.short}</span>
                        <span className="adm-sr">{r.long}</span>
                    </label>
                ))}
            </fieldset>
            {custom && (
                <form className="adm-custom" onSubmit={apply} aria-label="Custom range">
                    <label htmlFor="adm-from">From</label>
                    <input id="adm-from" type="date" value={from} max={to || today} onChange={(e) => setFrom(e.target.value)} required />
                    <label htmlFor="adm-to">to</label>
                    <input id="adm-to" type="date" value={to} min={from} max={today} onChange={(e) => setTo(e.target.value)} required />
                    <button type="submit" className="adm-btn">Apply</button>
                    {msg && <span className="adm-form-msg" role="alert">{msg}</span>}
                </form>
            )}
            <div className="adm-options">
                <label className="adm-check">
                    <input type="checkbox" checked={global.compare} onChange={(e) => go({ cmp: e.target.checked ? null : '0' }, { replace: true })} />
                    <span>Compare with previous period</span>
                </label>
                <label className="adm-check">
                    <input type="checkbox" checked={global.owner} onChange={(e) => go({ owner: e.target.checked ? '1' : null }, { replace: true })} />
                    <span>Include my own visits</span>
                </label>
                <span className="adm-tz" title="Days and hours are counted in this time zone">Times in {tz}</span>
            </div>
        </div>
    );
}

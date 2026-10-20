import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// The owner's analytics (src/lib/analytics.js, docs/analytics.md). The beacon
// is a chunk of its own (about 4 KB gzipped), fetched right after the first
// render, off the render path: the entry bundle carries only this stub. Until
// the chunk arrives, route changes wait in order, each with the path it was
// for. If it never arrives, nothing happens: analytics must never be the
// reason a page breaks.
let beacon = null;
let waiting = null;

function load() {
    import('../lib/analytics').then((m) => {
        beacon = m;
        const calls = waiting || [];
        waiting = null;
        calls.forEach((c) => { try { c(m); } catch { /* never the page's problem */ } });
    }, () => {
        beacon = {};          // every call into it throws and is swallowed: off
        waiting = null;
    });
}

function withBeacon(call) {
    try {
        if (beacon) {
            call(beacon);
        } else if (waiting) {
            waiting.push(call);
        } else {
            waiting = [call];
            setTimeout(load, 0);
        }
    } catch {
        // as above
    }
}

// Told about each route change. Renders nothing; the beacon decides whether
// to run at all.
export default function AnalyticsBeacon() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();
    useEffect(() => { withBeacon((b) => b.pageChanged(navigationType, pathname)); }, [pathname, navigationType]);
    return null;
}

// Rendered by a not-found page (the unmatched-route fallback, an unknown
// essay) so the dashboard can list broken links with their referrers. It
// adds nothing to the page.
export function NotFoundBeacon() {
    const { pathname } = useLocation();
    useEffect(() => { withBeacon((b) => b.trackNotFound(pathname)); }, [pathname]);
    return null;
}

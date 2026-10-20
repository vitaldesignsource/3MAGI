import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { pageChanged, trackNotFound } from '../lib/analytics';

// The owner's analytics (src/lib/analytics.js, docs/analytics.md) told about
// each route change. Renders nothing; the beacon decides whether to run at all.
export default function AnalyticsBeacon() {
    const { pathname } = useLocation();
    const navigationType = useNavigationType();
    useEffect(() => { pageChanged(navigationType); }, [pathname, navigationType]);
    return null;
}

// Rendered by a not-found page (the unmatched-route fallback, an unknown
// essay) so the dashboard can list broken links with their referrers. It
// adds nothing to the page.
export function NotFoundBeacon() {
    const { pathname } = useLocation();
    useEffect(() => { trackNotFound(); }, [pathname]);
    return null;
}

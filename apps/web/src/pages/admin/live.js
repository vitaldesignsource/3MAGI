import { useCallback, useEffect, useRef, useState } from 'react';
import { apiGet } from './api';

// "Who is on the site now", polled. Used by the Visitors section's live panel
// and by the Overview's "Live now" tile, so a tile with a pulsing dot never
// shows a number from minutes ago.

export const LIVE_MS = 15000;

/**
 * Polls `live` every 15 s while the tab is visible; pausable.
 * `immediate: false` waits one interval before the first request, for a view
 * that already has a figure from its own answer (the Overview).
 */
export function useLive(includeOwner, { immediate = true } = {}) {
    const [state, setState] = useState({ data: null, error: null, at: null, owner: null });
    const [paused, setPaused] = useState(false);
    const busy = useRef(false);

    const load = useCallback(async () => {
        if (busy.current || document.visibilityState === 'hidden') return;
        busy.current = true;
        try {
            const data = await apiGet('live', includeOwner ? { include_owner: 1 } : {});
            setState({ data, error: null, at: Date.now(), owner: !!includeOwner });
        } catch (error) {
            if (!(error && error.name === 'AbortError')) setState((s) => ({ ...s, error }));
        } finally {
            busy.current = false;
        }
    }, [includeOwner]);

    useEffect(() => {
        if (paused) return undefined;
        if (immediate) load();
        const t = setInterval(load, LIVE_MS);
        const onVis = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVis);
        return () => { clearInterval(t); document.removeEventListener('visibilitychange', onVis); };
    }, [load, paused, immediate]);

    return { ...state, paused, setPaused, reload: load };
}

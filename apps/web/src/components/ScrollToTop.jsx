import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';

// Routes are lazy-loaded, so when a hash link crosses into another page the
// target element does not exist on the first frame — the chunk is still in
// flight. Watch for it briefly and scroll as soon as it appears, rather than
// giving up and dumping the reader at the top of the page.
const HASH_WAIT_MS = 2000;

const ScrollToTop = () => {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            return undefined;
        }

        const id = decodeURIComponent(hash.slice(1));
        let cancelled = false;

        const scrollTo = (el) => {
            requestAnimationFrame(() => {
                if (!cancelled) el.scrollIntoView({ behavior: 'instant', block: 'start' });
            });
        };

        const existing = document.getElementById(id);
        if (existing) {
            scrollTo(existing);
            return undefined;
        }

        // Not rendered yet: wait for it, with a deadline so we never watch forever.
        const observer = new MutationObserver(() => {
            const el = document.getElementById(id);
            if (el) {
                observer.disconnect();
                clearTimeout(timer);
                scrollTo(el);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        const timer = setTimeout(() => observer.disconnect(), HASH_WAIT_MS);

        return () => {
            cancelled = true;
            observer.disconnect();
            clearTimeout(timer);
        };
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;

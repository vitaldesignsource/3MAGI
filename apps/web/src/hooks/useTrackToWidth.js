import { useLayoutEffect } from 'react';

/**
 * Track out a line of text with letter-spacing until its rendered width
 * matches another element's text, then keep them matched as the viewport
 * changes.
 *
 * Word-justification spreads the gaps between words and leaves the letters
 * themselves tight; this spreads the letters. CSS alone cannot do it because
 * letter-spacing takes a fixed length while the target here is set in
 * clamp()-scaled type, so its width moves with the viewport and with whichever
 * font has finished loading.
 *
 * CSS adds the spacing after every character including the last, so the final
 * gap is cancelled with an equal negative margin — otherwise the visible ink
 * would sit one space short of the target.
 */
export function useTrackToWidth(textRef, targetRef) {
    useLayoutEffect(() => {
        const el = textRef.current;
        const target = targetRef.current;
        if (!el || !target) return undefined;

        const textWidth = (node) => {
            const range = document.createRange();
            range.selectNodeContents(node);
            return range.getBoundingClientRect().width;
        };

        const apply = () => {
            const chars = (el.textContent || '').length;
            if (chars < 2) return;

            // Measure both untracked, so the maths never compounds.
            el.style.letterSpacing = '0px';
            el.style.marginRight = '0px';
            const natural = textWidth(el);
            const goal = textWidth(target);
            if (!natural || !goal) return;

            const spacing = (goal - natural) / (chars - 1);
            // Only ever track out. A negative value would crush the letters
            // together if the strapline were somehow the wider of the two.
            const safe = Math.max(0, spacing);
            el.style.letterSpacing = `${safe}px`;
            el.style.marginRight = `${-safe}px`;
        };

        apply();

        const observer = new ResizeObserver(apply);
        observer.observe(target);
        observer.observe(el.parentElement || el);

        // Re-measure once webfonts land, or the maths is done against fallbacks.
        let cancelled = false;
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => { if (!cancelled) apply(); });
        }

        return () => {
            cancelled = true;
            observer.disconnect();
        };
    }, [textRef, targetRef]);
}

export default useTrackToWidth;

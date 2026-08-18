import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { useSubscriptionAuth } from '@/contexts/SubscriptionAuthContext.jsx';
import { useUserTier } from '@/hooks/useUserTier';

function timeAgo(dateStr) {
    const then = new Date(dateStr).getTime();
    const diffMs = Date.now() - then;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

const HANDLE_HEIGHT = 56; // px — matches --notes-handle-h (3.5rem)

function CommunityNotes({ articleSlug }) {
    const [open, setOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [draft, setDraft] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Mobile bottom-sheet drag state
    const [isMobile] = useState(true);
    const [dragging, setDragging] = useState(false);
    const [dragY, setDragY] = useState(null); // px translate while dragging
    const tabRef = useRef(null);
    const dragState = useRef({ startY: 0, startTranslate: 0, maxTranslate: 0, moved: false });

    const { currentUser, isAuthenticated } = useSubscriptionAuth();
    const { hasTier } = useUserTier();
    const canContribute = isAuthenticated && hasTier('Supporter');

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        pb.collection('community_notes')
            .getFullList({
                filter: pb.filter('article_slug = {:slug}', { slug: articleSlug }),
                sort: '-created',
                expand: 'owner',
                requestKey: `community-notes-${articleSlug}`,
            })
            .then((list) => {
                if (!cancelled) setNotes(list);
            })
            .catch((err) => {
                console.error('Failed to load community notes', err);
                if (!cancelled) setNotes([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        void pb
            .collection('community_notes')
            .subscribe('*', (e) => {
                if (e.record.article_slug !== articleSlug) return;
                setNotes((prev) => {
                    if (e.action === 'create') return [e.record, ...prev];
                    if (e.action === 'update') return prev.map((n) => (n.id === e.record.id ? e.record : n));
                    if (e.action === 'delete') return prev.filter((n) => n.id !== e.record.id);
                    return prev;
                });
            })
            .catch((err) => console.error('Community notes realtime subscription failed', err));

        return () => {
            cancelled = true;
            void pb.collection('community_notes').unsubscribe('*').catch(() => {});
        };
    }, [articleSlug]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!draft.trim()) return;
        setSubmitting(true);
        setError(null);
        try {
            await pb.collection('community_notes').create({
                article_slug: articleSlug,
                content: draft.trim(),
                author_name: currentUser?.name || currentUser?.email?.split('@')[0] || 'A Supporter',
                owner: currentUser.id,
            });
            setDraft('');
        } catch (err) {
            setError(err?.message || 'Could not post your note. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const measureMaxTranslate = useCallback(() => {
        const tab = tabRef.current;
        if (!tab) return 0;
        const rect = tab.getBoundingClientRect();
        return Math.max(0, rect.height - HANDLE_HEIGHT);
    }, []);

    const onPointerDown = (e) => {
        if (e.pointerType === 'touch') return;
        e.preventDefault();
        dragState.current = {
            startY: e.clientY,
            startTranslate: open ? 0 : measureMaxTranslate(),
            maxTranslate: measureMaxTranslate(),
            moved: false,
        };
        setDragging(true);
        const onMove = (ev) => {
            const deltaY = dragState.current.startY - ev.clientY;
            if (Math.abs(deltaY) > 4) dragState.current.moved = true;
            let next = dragState.current.startTranslate - deltaY;
            next = Math.max(0, Math.min(next, dragState.current.maxTranslate));
            setDragY(next);
        };
        const onUp = () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            setDragging(false);
            setDragY((cur) => {
                const max = dragState.current.maxTranslate || measureMaxTranslate();
                const current = cur ?? dragState.current.startTranslate;
                if (dragState.current.moved) setOpen(current < max / 2);
                return null;
            });
        };
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
    };

    const onTouchStart = (e) => {
        if (!isMobile) return;
        const touch = e.touches[0];
        dragState.current = {
            startY: touch.clientY,
            startTranslate: open ? 0 : measureMaxTranslate(),
            maxTranslate: measureMaxTranslate(),
            moved: false,
        };
        setDragging(true);
    };

    const onTouchMove = (e) => {
        if (!dragging) return;
        const touch = e.touches[0];
        const deltaY = dragState.current.startY - touch.clientY; // up = positive
        if (Math.abs(deltaY) > 4) dragState.current.moved = true;
        let next = dragState.current.startTranslate - deltaY;
        next = Math.max(0, Math.min(next, dragState.current.maxTranslate));
        setDragY(next);
    };

    const onTouchEnd = () => {
        if (!dragging) return;
        const max = dragState.current.maxTranslate || measureMaxTranslate();
        const current = dragY ?? dragState.current.startTranslate;
        const threshold = max / 2;
        const shouldOpen = current < threshold;
        setOpen(shouldOpen);
        setDragY(null);
        setDragging(false);
    };

    const handleToggleClick = () => {
        // Suppress click if the last gesture was a real drag
        if (dragState.current.moved) {
            dragState.current.moved = false;
            return;
        }
        setOpen((o) => !o);
    };

    // Inline transform overrides CSS only while actively dragging
    const dragStyle =
        isMobile && dragging && dragY !== null
            ? { transform: `translateY(${dragY}px)` }
            : undefined;

    return (
        <div
            className={`community-notes-tab ${open ? 'is-open' : ''} ${dragging ? 'is-dragging' : ''}`}
            ref={tabRef}
            style={dragStyle}
        >
            {/* Mobile drag handle / bottom-sheet grip */}
            <button
                type="button"
                className="community-notes-drag-handle"
                onClick={handleToggleClick}
                onPointerDown={onPointerDown}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchEnd}
                aria-expanded={open}
                aria-controls="community-notes-panel"
                aria-label={`${open ? 'Collapse' : 'Expand'} community notes`}
            >
                <span className="community-notes-drag-bar" aria-hidden="true" />
                <span className="community-notes-drag-label">
                    Notes{notes.length > 0 ? ` (${notes.length})` : ''}
                </span>
                <span className="community-notes-drag-chevron" aria-hidden="true">{open ? '▾' : '▴'}</span>
            </button>

            {/* Desktop vertical side tab */}
            <button
                type="button"
                className="community-notes-toggle"
                onClick={handleToggleClick}
                aria-expanded={open}
                aria-controls="community-notes-panel"
            >
                <span className="community-notes-toggle-icon" aria-hidden="true">&#10022;</span>
                <span className="community-notes-toggle-label">
                    Notes{notes.length > 0 ? ` (${notes.length})` : ''}
                </span>
            </button>

            <div id="community-notes-panel" className="community-notes-panel">
                <div className="community-notes-panel-head">
                    <p className="kicker">The Margins</p>
                    <h3>Community Notes</h3>
                    <p className="community-notes-sub">
                        Annotations and discussion from subscribers of the Third Lamp.
                    </p>
                </div>

                <div className="community-notes-list">
                    {loading ? (
                        <p className="community-notes-empty">Gathering the marginalia…</p>
                    ) : notes.length === 0 ? (
                        <p className="community-notes-empty">No notes yet. Be the first to annotate this essay.</p>
                    ) : (
                        notes.map((note) => {
                            const owner = note.expand?.owner;
                            const displayName = owner?.name || note.author_name || 'A Supporter';
                            const avatarUrl = owner?.avatar
                                ? pb.files.getURL(owner, owner.avatar, { thumb: '60x60' })
                                : null;
                            const initials = displayName[0].toUpperCase();
                            return (
                                <article className="community-note" key={note.id}>
                                    <header>
                                        <div className="community-note-avatar">
                                            {avatarUrl ? (
                                                <img src={avatarUrl} alt={displayName} />
                                            ) : (
                                                <span>{initials}</span>
                                            )}
                                        </div>
                                        <div className="community-note-meta">
                                            <strong>{displayName}</strong>
                                            <time>{timeAgo(note.created)}</time>
                                        </div>
                                    </header>
                                    <p>{note.content}</p>
                                </article>
                            );
                        })
                    )}
                </div>

                <div className="community-notes-compose">
                    {!isAuthenticated ? (
                        <p className="community-notes-cta">
                            <Link to="/login" state={{ from: window.location.pathname }}>Sign in</Link> to join the conversation.
                        </p>
                    ) : !canContribute ? (
                        <p className="community-notes-cta">
                            Community notes are reserved for Supporter members.{' '}
                            <Link to="/plans">Become a Supporter — $3/month</Link>
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} className="community-notes-form">
                            <textarea
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                placeholder="Add a note, correspondence, or question for other readers…"
                                maxLength={2000}
                                rows={3}
                                required
                            />
                            {error && <p className="auth-error" role="alert">{error}</p>}
                            <button type="submit" className="tl-button tl-button-small" disabled={submitting}>
                                {submitting ? 'Posting…' : 'Post Note'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommunityNotes;

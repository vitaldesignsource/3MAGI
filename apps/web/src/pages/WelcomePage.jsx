import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams } from 'react-router-dom';
import ThirdLampHeader from '@/components/ThirdLampHeader.jsx';
import ThirdLampFooter from '@/components/ThirdLampFooter.jsx';

/**
 * Where Stripe sends a reader after payment.
 *
 * The session id in the URL is not proof of anything on its own — it is handed
 * to api/redeem.php, which asks Stripe whether that session was really paid
 * before issuing the pass.
 *
 * The permanent access link is shown here as well as emailed, so a reader can
 * save it immediately instead of depending on an email arriving.
 */
export default function WelcomePage() {
    const [params] = useSearchParams();
    const sessionId = params.get('session_id') || '';
    const [state, setState] = useState({ status: 'working' });

    useEffect(() => {
        if (!sessionId) {
            setState({ status: 'missing' });
            return undefined;
        }
        let alive = true;
        fetch(`/api/redeem.php?session_id=${encodeURIComponent(sessionId)}`, { credentials: 'same-origin' })
            .then(async (res) => {
                const body = await res.json().catch(() => null);
                if (!alive) return;
                if (res.ok && body && body.ok) {
                    setState({ status: 'ok', ...body });
                } else {
                    setState({ status: 'failed', error: (body && body.error) || 'Your payment could not be confirmed.', code: body && body.code });
                }
            })
            .catch(() => { if (alive) setState({ status: 'failed', error: 'We could not reach the server to confirm your payment.' }); });
        return () => { alive = false; };
    }, [sessionId]);

    return (
        <>
            <Helmet><title>Welcome | The Third Lamp</title><meta name="robots" content="noindex" /></Helmet>
            <div className="third-lamp-scope" style={{ background: 'var(--ink)', minHeight: '100vh' }}>
                <ThirdLampHeader />
                <main className="tl-plans-page" style={{ maxWidth: '760px' }}>
                    <header className="tl-plans-head">
                        <p className="kicker">The Inner Circle</p>
                        <h1>{state.status === 'ok' ? 'Welcome to the Third Lamp' : 'Confirming your membership'}</h1>
                    </header>

                    {state.status === 'working' && (
                        <p className="tl-plans-lede" role="status">Confirming your payment with Stripe…</p>
                    )}

                    {state.status === 'missing' && (
                        <div className="tl-plan-card">
                            <p className="tl-plan-desc">
                                This page is where Stripe returns you after payment. If you have just paid and
                                landed here without a confirmation, use <Link to="/restore">Restore access</Link>{' '}
                                and we will send your link again.
                            </p>
                        </div>
                    )}

                    {state.status === 'failed' && (
                        <div className="tl-plan-card">
                            <p className="tl-plan-desc" style={{ marginTop: 0 }}>{state.error}</p>
                            <p className="tl-plan-desc">
                                If you were charged, nothing is lost — use <Link to="/restore">Restore access</Link>,
                                or write to <a href="mailto:3rdlamp@3magipress.com">3rdlamp@3magipress.com</a> and
                                we will sort it out by hand.
                            </p>
                        </div>
                    )}

                    {state.status === 'ok' && (
                        <>
                            <div className="tl-plan-card">
                                <p className="tl-plan-desc" style={{ marginTop: 0 }}>
                                    Your membership is active in this browser. The whole archive is open to you.
                                </p>
                                <p className="tl-plan-desc">
                                    <strong style={{ color: 'var(--bone)' }}>Keep this link.</strong> It restores your
                                    access on a phone, another laptop, or after clearing cookies — it is the only key,
                                    because there are no passwords to remember.
                                </p>
                                <p style={{ wordBreak: 'break-all', background: 'rgba(0,0,0,0.35)', border: '1px solid var(--line)', padding: '0.9rem 1rem', font: '0.8rem/1.6 monospace', color: 'var(--gold-bright)' }}>
                                    {state.access}
                                </p>
                                {state.emailed
                                    ? <p className="tl-plan-desc">We have emailed it to {state.email || 'you'} as well.</p>
                                    : <p className="tl-plan-desc">Please save it now — we could not send the confirmation email.</p>}
                            </div>
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link className="tl-button" to="/third-lamp/archive">Enter the Archive</Link>
                                <Link className="tl-button tl-button-quiet" to="/third-lamp">The Third Lamp</Link>
                            </div>
                        </>
                    )}
                </main>
                <ThirdLampFooter />
            </div>
        </>
    );
}

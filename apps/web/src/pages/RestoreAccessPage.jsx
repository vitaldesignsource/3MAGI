import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '@/components/ThirdLampHeader.jsx';
import ThirdLampFooter from '@/components/ThirdLampFooter.jsx';

/**
 * "I paid, but I'm on a different device."
 *
 * The reply is deliberately identical whether or not the address belongs to a
 * member, so this cannot be used to find out who subscribes. The link is sent
 * to the address Stripe holds, never to whatever is typed here.
 */
export default function RestoreAccessPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            const body = new FormData();
            body.append('email', email);
            const res = await fetch('/api/recover.php', { method: 'POST', body, credentials: 'same-origin' });
            const data = await res.json().catch(() => null);
            setMessage((data && data.message) || 'If that address has a membership, the access link is on its way.');
            setStatus('sent');
        } catch {
            setMessage('We could not reach the server. Please try again shortly.');
            setStatus('idle');
        }
    };

    return (
        <>
            <Helmet><title>Restore access | The Third Lamp</title><meta name="robots" content="noindex" /></Helmet>
            <div className="third-lamp-scope" style={{ background: 'var(--ink)', minHeight: '100vh' }}>
                <ThirdLampHeader />
                <main className="tl-plans-page" style={{ maxWidth: '640px' }}>
                    <header className="tl-plans-head">
                        <p className="kicker">Members</p>
                        <h1>Restore your access</h1>
                        <p className="tl-plans-lede">
                            Enter the email you used when you joined and we will send your access link again.
                        </p>
                    </header>

                    {status === 'sent' ? (
                        <div className="tl-plan-card" role="status">
                            <p className="tl-plan-desc" style={{ margin: 0 }}>{message}</p>
                            <p className="tl-plan-desc">
                                It can take a minute or two. If nothing arrives, check your spam folder, then
                                write to <a href="mailto:3rdlamp@3magipress.com">3rdlamp@3magipress.com</a>.
                            </p>
                        </div>
                    ) : (
                        <form className="contributor-form" onSubmit={onSubmit}>
                            <fieldset>
                                <legend><span>I</span>Your membership</legend>
                                <div className="form-grid">
                                    <label className="form-wide">
                                        <span>Email</span>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="email"
                                        />
                                    </label>
                                </div>
                            </fieldset>
                            <div className="form-submit-row">
                                <p>{message || 'We will reply to the address your payment was made with.'}</p>
                                <button className="tl-button" type="submit" disabled={status === 'sending'}>
                                    {status === 'sending' ? 'Sending…' : 'Send my link'}
                                </button>
                            </div>
                        </form>
                    )}

                    <p style={{ marginTop: '2rem', color: 'var(--muted)', font: '0.9rem/1.7 Georgia, serif' }}>
                        Not a member yet? <Link to="/plans" style={{ color: 'var(--gold-bright)' }}>See the memberships</Link>.
                    </p>
                </main>
                <ThirdLampFooter />
            </div>
        </>
    );
}

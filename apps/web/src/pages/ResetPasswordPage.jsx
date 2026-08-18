import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import pb from '@/lib/pocketbaseClient';

function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token') || '';

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [done, setDone] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirm) {
            setError('Passwords do not match.');
            return;
        }
        setLoading(true);
        try {
            await pb.collection('users').confirmPasswordReset(token, password, confirm);
            setDone(true);
        } catch (err) {
            setError(err?.message || 'Could not reset your password. The link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Reset Password | The Third Lamp</title>
                <meta name="description" content="Set a new password for your Third Lamp membership." />
            </Helmet>
            <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main>
                    <section className="auth-gate">
                        <div className="auth-gate-card">
                            <p className="kicker">New Password</p>
                            <h1>Reset Password</h1>
                            {done ? (
                                <>
                                    <p className="auth-gate-lede" style={{ color: 'var(--gold-bright)' }}>
                                        Your password has been updated. You may now sign in with your new credentials.
                                    </p>
                                    <p className="auth-switch">
                                        <Link to="/login">Sign In</Link>
                                    </p>
                                </>
                            ) : !token ? (
                                <p className="auth-gate-lede">
                                    This link is invalid. Please <Link to="/forgot-password">request a new reset link</Link>.
                                </p>
                            ) : (
                                <>
                                    <p className="auth-gate-lede">
                                        Choose a new password for your membership account.
                                    </p>
                                    <form onSubmit={handleSubmit} className="auth-form">
                                        <label>
                                            <span>New Password <small>min. 8 characters</small></span>
                                            <input
                                                type="password"
                                                required
                                                minLength={8}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="new-password"
                                            />
                                        </label>
                                        <label>
                                            <span>Confirm Password</span>
                                            <input
                                                type="password"
                                                required
                                                minLength={8}
                                                value={confirm}
                                                onChange={(e) => setConfirm(e.target.value)}
                                                autoComplete="new-password"
                                            />
                                        </label>
                                        {error && <p className="auth-error" role="alert">{error}</p>}
                                        <button type="submit" className="tl-button" disabled={loading}>
                                            {loading ? 'Saving…' : 'Set New Password'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </section>
                </main>
                <ThirdLampFooter />
            </div>
        </>
    );
}

export default ResetPasswordPage;

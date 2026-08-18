import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import pb from '@/lib/pocketbaseClient';

function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await pb.collection('users').requestPasswordReset(email);
            setSent(true);
        } catch (err) {
            setError(err?.message || 'Could not send reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Forgot Password | The Third Lamp</title>
                <meta name="description" content="Reset your Third Lamp membership password." />
            </Helmet>
            <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main>
                    <section className="auth-gate">
                        <div className="auth-gate-card">
                            <p className="kicker">Reset Your Access</p>
                            <h1>Forgot Password</h1>
                            {sent ? (
                                <>
                                    <p className="auth-gate-lede" style={{ color: 'var(--gold-bright)' }}>
                                        A reset link has been sent to <strong>{email}</strong>. Check your inbox and follow the instructions to set a new password.
                                    </p>
                                    <p className="auth-switch">
                                        <Link to="/login">Return to Sign In</Link>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="auth-gate-lede">
                                        Enter the email address associated with your membership and we will send you a link to reset your password.
                                    </p>
                                    <form onSubmit={handleSubmit} className="auth-form">
                                        <label>
                                            <span>Email</span>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                autoComplete="email"
                                            />
                                        </label>
                                        {error && <p className="auth-error" role="alert">{error}</p>}
                                        <button type="submit" className="tl-button" disabled={loading}>
                                            {loading ? 'Sending…' : 'Send Reset Link'}
                                        </button>
                                    </form>
                                    <p className="auth-switch">
                                        Remembered it? <Link to="/login">Sign in</Link>
                                    </p>
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

export default ForgotPasswordPage;

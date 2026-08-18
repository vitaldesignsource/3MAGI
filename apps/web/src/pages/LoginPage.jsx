import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import pb from '@/lib/pocketbaseClient';

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const from = location.state?.from || '/third-lamp';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await pb.collection('users').authWithPassword(email, password);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err?.message || 'Could not sign in. Check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign In | The Third Lamp</title>
            </Helmet>
            <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main>
                    <section className="auth-gate">
                        <div className="auth-gate-card">
                            <p className="kicker">Members' Entrance</p>
                            <h1>Sign In to the Circle</h1>
                            <p className="auth-gate-lede">
                                Return to the Living Archive with your standing intact, and continue the conversation in the margins.
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
                                <label>
                                    <span>Password</span>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                    />
                                </label>
                                {error && <p className="auth-error" role="alert">{error}</p>}
                                <button type="submit" className="tl-button" disabled={loading}>
                                    {loading ? 'Signing in…' : 'Sign In'}
                                </button>
                            </form>
                            <p className="auth-switch">
                                <Link to="/forgot-password">Forgot your password?</Link>
                            </p>
                            <p className="auth-switch">
                                New to the Third Lamp? <Link to="/signup">Create an account</Link>
                            </p>
                        </div>
                    </section>
                </main>
                <ThirdLampFooter />
            </div>
        </>
    );
}

export default LoginPage;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import pb from '@/lib/pocketbaseClient';

function SignupPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        setLoading(true);
        try {
            await pb.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                name,
            });
            await pb.collection('users').authWithPassword(email, password);
            navigate('/plans', { replace: true });
        } catch (err) {
            setError(err?.response?.data?.email?.message || err?.message || 'Could not create your account.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Sign Up | The Third Lamp</title>
            </Helmet>
            <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main>
                    <section className="auth-gate">
                        <div className="auth-gate-card">
                            <p className="kicker">Join the Circle</p>
                            <h1>Create Your Account</h1>
                            <p className="auth-gate-lede">
                                Membership opens the margins of every essay. Subscribers may leave community notes,
                                trace correspondences, and converse in the living archive.
                            </p>
                            <form onSubmit={handleSubmit} className="auth-form">
                                <label>
                                    <span>Name</span>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                    />
                                </label>
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
                                    <span>Password <small>min. 8 characters</small></span>
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </label>
                                {error && <p className="auth-error" role="alert">{error}</p>}
                                <button type="submit" className="tl-button" disabled={loading}>
                                    {loading ? 'Creating account…' : 'Create Account'}
                                </button>
                            </form>
                            <p className="auth-switch">
                                Already a member? <Link to="/login">Sign in</Link>
                            </p>
                        </div>
                    </section>
                </main>
                <ThirdLampFooter />
            </div>
        </>
    );
}

export default SignupPage;

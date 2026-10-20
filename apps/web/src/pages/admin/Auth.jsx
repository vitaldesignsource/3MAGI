import React, { useEffect, useRef, useState } from 'react';
import { ApiError, apiPost } from './api';
import { useNow } from './charts';

// The way in: the sign-in form, and the setup steps shown instead of it
// while the server's secrets file lacks the dashboard keys. The steps carry
// placeholders only; no real value ever appears here.

function Frame({ children, wide = false }) {
    return (
        <main className={`adm-gate${wide ? ' is-wide' : ''}`} id="adm-main">
            <div className="adm-gate-card">
                <p className="adm-kicker">Three Magi Press</p>
                {children}
            </div>
            <p className="adm-gate-foot"><a href="/">Back to the site</a></p>
        </main>
    );
}

function remaining(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(s / 60);
    return m ? `${m} min ${String(s % 60).padStart(2, '0')} s` : `${s} s`;
}

export function Login({ notice, onSignedIn, onNotConfigured }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const [lockedUntil, setLockedUntil] = useState(0);
    const now = useNow(1000);
    const passRef = useRef(null);
    const locked = lockedUntil > now;

    useEffect(() => {
        if (lockedUntil && lockedUntil <= now) {
            setLockedUntil(0);
            setError(null);
        }
    }, [now, lockedUntil]);

    const submit = async (e) => {
        e.preventDefault();
        if (busy || locked) return;
        setBusy(true);
        setError(null);
        try {
            const res = await apiPost('login', { email: email.trim(), password });
            setPassword('');
            onSignedIn(res);
        } catch (err) {
            const code = err instanceof ApiError ? err.code : 'network';
            if (code === 'not_configured') {
                onNotConfigured((err.body && err.body.missing) || []);
                return;
            }
            if (code === 'locked') {
                const s = Number(err.body && err.body.retry_after) || 900;
                setLockedUntil(Date.now() + s * 1000);
                setError({ kind: 'locked', text: 'Too many failed attempts from this connection. Sign-in is paused; it reopens by itself.' });
            } else if (code === 'bad_credentials') {
                setError({ kind: 'bad', text: err.message || 'That email and password do not match.' });
                setPassword('');
                passRef.current && passRef.current.focus();
            } else if (code === 'csrf') {
                setError({ kind: 'bad', text: 'The server refused the request. Open the dashboard from the site\'s own address (not a copy or a preview) and try again.' });
            } else {
                setError({ kind: 'bad', text: err.message || 'Sign-in failed. Try again.' });
            }
        } finally {
            setBusy(false);
        }
    };

    return (
        <Frame>
            <h1 className="adm-gate-title">The owner's dashboard</h1>
            <p className="adm-gate-lede">Sign in to see traffic, sources, visitors and search health.</p>
            {notice && !error && <p className="adm-notice" role="status">{notice}</p>}
            <form className="adm-login" onSubmit={submit} noValidate={false}>
                <div className="adm-field">
                    <label htmlFor="adm-email">Email</label>
                    <input id="adm-email" type="email" name="email" autoComplete="username" required value={email}
                        onChange={(e) => setEmail(e.target.value)} autoCapitalize="off" spellCheck={false} disabled={locked}
                        aria-invalid={error && error.kind === 'bad' ? 'true' : undefined} aria-describedby={error ? 'adm-login-error' : undefined} />
                </div>
                <div className="adm-field">
                    <label htmlFor="adm-password">Password</label>
                    <div className="adm-pass">
                        <input id="adm-password" ref={passRef} type={show ? 'text' : 'password'} name="password" autoComplete="current-password" required
                            value={password} onChange={(e) => setPassword(e.target.value)} disabled={locked} maxLength={1024}
                            aria-invalid={error && error.kind === 'bad' ? 'true' : undefined} aria-describedby={error ? 'adm-login-error' : undefined} />
                        <button type="button" className="adm-btn adm-btn-quiet" onClick={() => setShow((s) => !s)} aria-pressed={show} aria-controls="adm-password">
                            {show ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <div id="adm-login-error" role="alert" className={error ? `adm-login-error is-${error.kind}` : 'adm-login-error'}>
                    {error && (
                        <>
                            <p>{error.text}</p>
                            {error.kind === 'locked' && locked && <p className="adm-countdown">Try again in {remaining(lockedUntil - now)}.</p>}
                        </>
                    )}
                </div>
                <button type="submit" className="adm-btn adm-btn-primary" disabled={busy || locked}>
                    {busy ? 'Signing in…' : locked ? 'Locked' : 'Sign in'}
                </button>
            </form>
            <p className="adm-gate-small">The session lasts seven days on this browser. While signed in, this browser's own visits are kept out of the figures.</p>
        </Frame>
    );
}

const KEY_TEXT = {
    cookie_secret: 'cookie_secret (also used by the membership pass)',
    admin_email: 'admin_email',
    admin_password_hash: 'admin_password_hash',
};

export function Setup({ missing }) {
    return (
        <Frame wide>
            <h1 className="adm-gate-title">The dashboard is not set up yet</h1>
            <p className="adm-gate-lede">
                The server's secrets file does not yet hold {missing && missing.length ? 'these keys' : 'the dashboard keys'}:
            </p>
            {missing && missing.length > 0 && (
                <ul className="adm-missing">{missing.map((k) => <li key={k}><code>{KEY_TEXT[k] || k}</code></li>)}</ul>
            )}
            <p className="adm-gate-small">Visits are being recorded regardless; only the dashboard waits for these. The full guide is <code>docs/analytics.md</code> in the site's repository.</p>
            <ol className="adm-steps">
                <li>
                    <h2>Check PHP's SQLite extension</h2>
                    <p>hPanel → Advanced → PHP Configuration → PHP Extensions: make sure <code>pdo_sqlite</code> (and <code>sqlite3</code>, <code>mbstring</code>, <code>intl</code>) are ticked. They usually are.</p>
                </li>
                <li>
                    <h2>Make a password hash</h2>
                    <p>Only a bcrypt hash of the password is ever stored. On any computer with PHP, or over SSH on Hostinger (hPanel → Advanced → SSH Access), run this, type the password, press Enter, and copy the line that starts with <code>$2y$</code>:</p>
                    <pre><code>php -r 'echo password_hash(trim(fgets(STDIN)), PASSWORD_DEFAULT), PHP_EOL;'</code></pre>
                    <p>Do not use an online "bcrypt generator": that hands the password to a stranger.</p>
                </li>
                <li>
                    <h2>Add the keys to the secrets file</h2>
                    <p>Open <code>tl-secrets.php</code>, one level <em>above</em> <code>public_html</code> (the same file the membership setup uses), and add these keys. Placeholders only: put your own values in.</p>
                    <pre><code>{`<?php
return [
    // … the keys already here (stripe_key, cookie_secret, …)

    'admin_email'         => 'you@example.com',
    'admin_password_hash' => '$2y$10$replace.this.with.the.hash.you.made',

    // Optional (defaults shown):
    // 'analytics_ip_days'   => 90,
    // 'analytics_keep_days' => 730,
    // 'analytics_timezone'  => 'America/New_York',
];`}</code></pre>
                    <p>Keep the hash in <strong>single quotes</strong>: inside double quotes PHP reads <code>$2y…</code> as a variable and sign-in never works. If <code>cookie_secret</code> is missing too, add a long random string (64 hex characters) for it.</p>
                </li>
                <li>
                    <h2>Reload this page and sign in</h2>
                    <p>Use that email (any capitalisation) and the password you typed in step 2.</p>
                </li>
            </ol>
        </Frame>
    );
}

export function GateMessage({ title, children }) {
    return (
        <Frame>
            <h1 className="adm-gate-title">{title}</h1>
            {children}
        </Frame>
    );
}

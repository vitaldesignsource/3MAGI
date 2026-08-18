import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import ThirdLampHeader from '../components/ThirdLampHeader';
import ThirdLampFooter from '../components/ThirdLampFooter';
import pb from '@/lib/pocketbaseClient';
import { useSubscriptionAuth } from '@/contexts/SubscriptionAuthContext.jsx';

function ProfilePage() {
    const { currentUser, isAuthenticated } = useSubscriptionAuth();
    const navigate = useNavigate();
    const fileRef = useRef(null);

    const [name, setName] = useState(currentUser?.name || '');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState(null);
    const [saveError, setSaveError] = useState(null);

    // Change password state
    const [oldPw, setOldPw] = useState('');
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [pwSaving, setPwSaving] = useState(false);
    const [pwMsg, setPwMsg] = useState(null);
    const [pwError, setPwError] = useState(null);

    if (!isAuthenticated) {
        return (
            <div className="third-lamp-scope">
                <ThirdLampHeader />
                <main>
                    <section className="auth-gate">
                        <div className="auth-gate-card">
                            <p className="kicker">Members Only</p>
                            <h1>Sign In Required</h1>
                            <p className="auth-gate-lede">
                                <Link to="/login">Sign in</Link> to view your profile.
                            </p>
                        </div>
                    </section>
                </main>
                <ThirdLampFooter />
            </div>
        );
    }

    const currentAvatarUrl = currentUser?.avatar
        ? pb.files.getURL(currentUser, currentUser.avatar, { thumb: '120x120' })
        : null;

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSaveMsg(null);
        setSaveError(null);
        try {
            const data = new FormData();
            data.append('name', name);
            if (avatarFile) {
                data.append('avatar', avatarFile);
            }
            await pb.collection('users').update(currentUser.id, data);
            // Refresh auth store
            await pb.collection('users').authRefresh();
            setSaveMsg('Profile updated successfully.');
            setAvatarFile(null);
        } catch (err) {
            setSaveError(err?.message || 'Could not save profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPwError(null);
        setPwMsg(null);
        if (newPw.length < 8) {
            setPwError('New password must be at least 8 characters.');
            return;
        }
        if (newPw !== confirmPw) {
            setPwError('Passwords do not match.');
            return;
        }
        setPwSaving(true);
        try {
            await pb.collection('users').update(currentUser.id, {
                oldPassword: oldPw,
                password: newPw,
                passwordConfirm: confirmPw,
            });
            setPwMsg('Password changed. Please sign in again with your new password.');
            setOldPw('');
            setNewPw('');
            setConfirmPw('');
            // Re-auth after password change
            setTimeout(() => {
                pb.authStore.clear();
                navigate('/login');
            }, 2500);
        } catch (err) {
            setPwError(err?.message || 'Could not change password. Check your current password and try again.');
        } finally {
            setPwSaving(false);
        }
    };

    const displayAvatar = avatarPreview || currentAvatarUrl;
    const initials = (currentUser?.name || currentUser?.email || '?')[0].toUpperCase();

    return (
        <>
            <Helmet>
                <title>My Profile | The Third Lamp</title>
                <meta name="description" content="Manage your Third Lamp membership profile." />
            </Helmet>
            <div className="third-lamp-scope" style={{ background: 'var(--ink)', minHeight: '100vh' }}>
                <ThirdLampHeader />
                <main className="profile-page">
                    <div className="profile-container">
                        <header className="profile-header">
                            <p className="kicker">Your Membership</p>
                            <h1>My Profile</h1>
                        </header>

                        {/* Profile Info */}
                        <section className="profile-section">
                            <h2 className="profile-section-title">Profile Information</h2>
                            <form onSubmit={handleProfileSave} className="profile-form">
                                {/* Avatar */}
                                <div className="profile-avatar-row">
                                    <div className="profile-avatar-wrap">
                                        {displayAvatar ? (
                                            <img loading="lazy" decoding="async"
                                                src={displayAvatar}
                                                alt="Profile"
                                                className="profile-avatar-img"
                                            />
                                        ) : (
                                            <div className="profile-avatar-placeholder">{initials}</div>
                                        )}
                                        <button
                                            type="button"
                                            className="profile-avatar-edit"
                                            onClick={() => fileRef.current?.click()}
                                            title="Change photo"
                                        >
                                            ✎
                                        </button>
                                    </div>
                                    <div className="profile-avatar-info">
                                        <p>Upload a profile photo. It will appear alongside your community notes.</p>
                                        <button
                                            type="button"
                                            className="tl-button tl-button-ghost tl-button-small"
                                            onClick={() => fileRef.current?.click()}
                                        >
                                            Choose Photo
                                        </button>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp,image/gif"
                                            style={{ display: 'none' }}
                                            onChange={handleAvatarChange}
                                        />
                                    </div>
                                </div>

                                <label className="auth-form-label">
                                    <span>Display Name</span>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                        className="auth-form-input"
                                    />
                                </label>

                                <label className="auth-form-label">
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        value={currentUser?.email || ''}
                                        disabled
                                        className="auth-form-input"
                                        style={{ opacity: 0.5 }}
                                    />
                                </label>

                                {saveMsg && <p className="auth-success" role="status">{saveMsg}</p>}
                                {saveError && <p className="auth-error" role="alert">{saveError}</p>}

                                <button type="submit" className="tl-button" disabled={saving}>
                                    {saving ? 'Saving…' : 'Save Profile'}
                                </button>
                            </form>
                        </section>

                        {/* Change Password */}
                        <section className="profile-section">
                            <h2 className="profile-section-title">Change Password</h2>
                            <form onSubmit={handlePasswordChange} className="profile-form">
                                <label className="auth-form-label">
                                    <span>Current Password</span>
                                    <input
                                        type="password"
                                        required
                                        value={oldPw}
                                        onChange={(e) => setOldPw(e.target.value)}
                                        autoComplete="current-password"
                                        className="auth-form-input"
                                    />
                                </label>
                                <label className="auth-form-label">
                                    <span>New Password <small>min. 8 characters</small></span>
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={newPw}
                                        onChange={(e) => setNewPw(e.target.value)}
                                        autoComplete="new-password"
                                        className="auth-form-input"
                                    />
                                </label>
                                <label className="auth-form-label">
                                    <span>Confirm New Password</span>
                                    <input
                                        type="password"
                                        required
                                        minLength={8}
                                        value={confirmPw}
                                        onChange={(e) => setConfirmPw(e.target.value)}
                                        autoComplete="new-password"
                                        className="auth-form-input"
                                    />
                                </label>
                                {pwMsg && <p className="auth-success" role="status">{pwMsg}</p>}
                                {pwError && <p className="auth-error" role="alert">{pwError}</p>}
                                <button type="submit" className="tl-button" disabled={pwSaving}>
                                    {pwSaving ? 'Changing…' : 'Change Password'}
                                </button>
                            </form>
                        </section>

                        <div className="profile-nav-links">
                            <Link to="/subscriptions" className="auth-switch-link">Manage Subscription →</Link>
                            <Link to="/third-lamp" className="auth-switch-link">Back to The Third Lamp →</Link>
                        </div>
                    </div>
                </main>
                <ThirdLampFooter />
            </div>
        </>
    );
}

export default ProfilePage;

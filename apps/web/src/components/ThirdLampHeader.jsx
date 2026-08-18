import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSubscriptionAuth } from '@/contexts/SubscriptionAuthContext.jsx';
import pb from '@/lib/pocketbaseClient';

const A = '/media';

function ThirdLampHeader() {
    const [open, setOpen] = useState(false);
    const [magazineOpen, setMagazineOpen] = useState(false);
    const [membershipOpen, setMembershipOpen] = useState(false);
    const location = useLocation();
    const { currentUser, isAuthenticated } = useSubscriptionAuth();

    const isActive = (path) => (location.pathname === path ? 'page' : undefined);

    const handleLogout = () => {
        pb.authStore.clear();
        setOpen(false);
    };

    const closeAll = () => {
        setOpen(false);
        setMagazineOpen(false);
        setMembershipOpen(false);
    };

    const toggleMenu = () => {
        if (open) {
            setMagazineOpen(false);
            setMembershipOpen(false);
        }
        setOpen((o) => !o);
    };

    return (
        <header className="tl-header">
            <Link className="publisher-link" to="/">Three Magi Press</Link>

            <Link className="tl-masthead" to="/third-lamp" aria-label="The Third Lamp home" onClick={closeAll}>
                <img className="tl-masthead-mark" src={`${A}/third-lamp-brand.webp`} alt="" />
                <span className="tl-masthead-copy">
                    <strong>The Third Lamp</strong>
                    <small>A Digital Esoteric Magazine</small>
                </span>
            </Link>

            <button
                className="menu-button"
                type="button"
                aria-expanded={open}
                aria-label="Open navigation"
                onClick={toggleMenu}
            >
                ☰
            </button>

            <nav className={`tl-nav ${open ? 'is-open' : ''}`} aria-label="Magazine navigation">
                <div className={`nav-group ${magazineOpen ? 'is-open' : ''}`}>
                    <button
                        className="nav-group-toggle"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={magazineOpen}
                        onClick={() => setMagazineOpen((v) => !v)}
                    >
                        Magazine <span aria-hidden="true">⌄</span>
                    </button>
                    <div className="nav-submenu">
                        <Link to="/third-lamp" aria-current={isActive('/third-lamp')} onClick={closeAll}>Current Issue</Link>
                        <Link to="/third-lamp/authors" aria-current={isActive('/third-lamp/authors')} onClick={closeAll}>Authors</Link>
                        <Link to="/third-lamp/contribute" aria-current={isActive('/third-lamp/contribute')} onClick={closeAll}>Contribute</Link>
                        <Link to="/third-lamp/lamp-post" aria-current={isActive('/third-lamp/lamp-post')} onClick={closeAll}>The Lamp Post</Link>
                    </div>
                </div>
                <Link to="/third-lamp/archive" aria-current={isActive('/third-lamp/archive')} onClick={closeAll}>Living Archive</Link>
                <Link to="/third-lamp/about" aria-current={isActive('/third-lamp/about')} onClick={closeAll}>About</Link>
                <Link to="/third-lamp/contact" aria-current={isActive('/third-lamp/contact')} onClick={closeAll}>Contact</Link>

                {isAuthenticated ? (
                    <div className={`nav-group tl-auth-group ${membershipOpen ? 'is-open' : ''}`}>
                        <button
                            className="nav-group-toggle"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded={membershipOpen}
                            onClick={() => setMembershipOpen((v) => !v)}
                        >
                            {currentUser?.name || currentUser?.email?.split('@')[0] || 'Account'} <span aria-hidden="true">⌄</span>
                        </button>
                        <div className="nav-submenu">
                            <Link to="/subscriptions" onClick={closeAll}>My Subscription</Link>
                            <Link to="/" onClick={handleLogout}>Sign Out</Link>
                        </div>
                    </div>
                ) : (
                    <div className={`nav-group tl-auth-group ${membershipOpen ? 'is-open' : ''}`}>
                        <button
                            className="nav-group-toggle"
                            type="button"
                            aria-haspopup="true"
                            aria-expanded={membershipOpen}
                            onClick={() => setMembershipOpen((v) => !v)}
                        >
                            Membership <span aria-hidden="true">⌄</span>
                        </button>
                        <div className="nav-submenu">
                            <Link to="/plans" onClick={closeAll}>Plans</Link>
                            {isAuthenticated ? (
                                <>
                                    <Link to="/profile" onClick={closeAll}>My Profile</Link>
                                    <Link to="/subscriptions" onClick={closeAll}>Subscription</Link>
                                    <button onClick={() => { handleLogout(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', color: 'inherit', font: 'inherit', width: '100%' }}>Sign Out</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={closeAll}>Sign In</Link>
                                    <Link to="/signup" onClick={closeAll}>Sign Up</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default ThirdLampHeader;

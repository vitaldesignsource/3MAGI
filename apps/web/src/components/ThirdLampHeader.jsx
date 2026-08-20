import React, { useRef, useState } from 'react';
import { useTrackToWidth } from '@/hooks/useTrackToWidth';
import { Link, useLocation } from 'react-router-dom';

const A = '/media';

function ThirdLampHeader() {
    // The strapline is tracked out to the exact width of the title above it.
    const titleRef = useRef(null);
    const straplineRef = useRef(null);
    useTrackToWidth(straplineRef, titleRef);

    const [open, setOpen] = useState(false);
    const [magazineOpen, setMagazineOpen] = useState(false);
    const [membershipOpen, setMembershipOpen] = useState(false);
    const location = useLocation();
    // The pass cookie is HttpOnly, so the browser cannot read it. This
    // companion cookie exists only to decide whether the menu says "Member" —
    // it grants nothing, and forging it changes one word.
    const isMember = typeof document !== 'undefined' && /(^|;\s*)tl_member=/.test(document.cookie);

    const isActive = (path) => (location.pathname === path ? 'page' : undefined);

    const handleSignOut = () => {
        fetch('/api/pass.php?logout=1', { credentials: 'same-origin' })
            .catch(() => {})
            .finally(() => window.location.assign('/'));
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
                <img className="tl-masthead-mark" src="/media/thumb/third-lamp-brand.webp" alt="" />
                <span className="tl-masthead-copy">
                    <strong ref={titleRef}>The Third Lamp</strong>
                    <small ref={straplineRef}>A Digital Esoteric Magazine</small>
                </span>
            </Link>

            {/* Three brass bars, echoing the three lamps: they flicker on
                hover and draw together into a flame when the menu is open. */}
            <button
                className={`menu-button${open ? ' is-open' : ''}`}
                type="button"
                aria-expanded={open}
                aria-label={open ? 'Close navigation' : 'Open navigation'}
                onClick={toggleMenu}
            >
                <span className="menu-button-glyph" aria-hidden="true">
                    <svg viewBox="0 0 34 26">
                        <rect className="menu-bar menu-bar--1" x="3"  y="4"  width="28" height="2" rx="1" />
                        <rect className="menu-bar menu-bar--2" x="3"  y="12" width="28" height="2" rx="1" />
                        <rect className="menu-bar menu-bar--3" x="3"  y="20" width="28" height="2" rx="1" />
                        <circle className="menu-ember" cx="17" cy="13" r="2.2" />
                    </svg>
                </span>
                <span className="menu-button-word" aria-hidden="true">{open ? 'Close' : 'Menu'}</span>
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

                <div className={`nav-group tl-auth-group ${membershipOpen ? 'is-open' : ''}`}>
                    <button
                        className="nav-group-toggle"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={membershipOpen}
                        onClick={() => setMembershipOpen((v) => !v)}
                    >
                        {isMember ? 'Member' : 'Membership'} <span aria-hidden="true">⌄</span>
                    </button>
                    <div className="nav-submenu">
                        <Link to="/plans" onClick={closeAll}>Membership</Link>
                        {isMember ? (
                            <button
                                type="button"
                                onClick={handleSignOut}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left', color: 'inherit', font: 'inherit', width: '100%' }}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link to="/restore" onClick={closeAll}>Restore Access</Link>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default ThirdLampHeader;

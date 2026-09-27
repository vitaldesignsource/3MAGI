import React from 'react';
import { Link } from 'react-router-dom';

function SiteFooter() {
    return (
        <footer className="site-footer">
            <div className="site-footer-cols">
                <div>
                    <p className="footer-brand">Three Magi Press</p>
                    <p>Hermetic, occult, and alchemical publications.</p>
                </div>
                <div className="footer-links">
                    <Link to="/books">Books</Link>
                    <Link to="/third-lamp">The Third Lamp</Link>
                    <Link to="/third-lamp/archive">Archive</Link>
                    <Link to="/third-lamp/contribute">Contribute</Link>
                    <Link to="/#about">About</Link>
                    <Link to="/#newsletter">Contact</Link>
                </div>
            </div>
            <p className="footer-copyright">&copy; {new Date().getFullYear()} Three Magi Press. All rights reserved.</p>
        </footer>
    );
}

export default SiteFooter;

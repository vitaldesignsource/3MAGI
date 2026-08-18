import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, X } from 'lucide-react';

const A = '/media';

function ThirdLampFooter() {
    return (
        <footer className="tl-footer tl-footer-rich">
            <div className="tl-footer-brand">
                <img className="tl-footer-mark" src={`${A}/third-lamp-brand.webp`} alt="" />
                <div>
                    <p className="tl-footer-kicker">The Third Lamp</p>
                    <strong>A publication of Three Magi Press</strong>
                    <span>An independent magazine for esoteric inquiry,<br />symbolic thought, and distinctive voices.</span>
                </div>
            </div>
            <nav className="tl-footer-nav" aria-label="The Third Lamp footer">
                <Link to="/third-lamp/archive">Living Archive</Link>
                <Link to="/third-lamp/authors">Authors</Link>
                <Link to="/third-lamp/about">About</Link>
                <Link to="/third-lamp/contribute">Contribute</Link>
            </nav>
            <div className="tl-footer-actions">
                <p>Issue I · The Return of the Invisible</p>
                <Link className="tl-button tl-button-small" to="/third-lamp/contribute#submission-portal">Submit Your Work</Link>
            </div>
            <div className="tl-footer-social">
                <a href="https://www.instagram.com/threemagipress/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a href="https://www.facebook.com/threemagipress/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook size={20} strokeWidth={1.5} />
                </a>
                <a href="https://x.com/ThreeMagiPress" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <X size={20} strokeWidth={1.5} />
                </a>
            </div>
        </footer>
    );
}

export default ThirdLampFooter;

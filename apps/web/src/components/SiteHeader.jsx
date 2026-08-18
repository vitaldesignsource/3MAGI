import React from 'react';
import { Link } from 'react-router-dom';
import AetherMist from './AetherMist';

const A = '/media';

function SiteHeader() {
    return (
        <header className="site-header">
            <AetherMist />
            <Link className="brand" to="/">
                <img className="brand-logo" src="/media/thumb/three-magi-logo-original.webp" alt="Three Magi Press logo" />
                <span>
                    <strong>Three Magi Press</strong>
                    <small>Hermetic Publications</small>
                </span>
            </Link>
            <nav className="site-nav">
                <Link to="/books">Books</Link>
                <Link to="/third-lamp">The Third Lamp</Link>
                <Link to="/#journal">Essays</Link>
                <Link to="/#about">About</Link>
                <Link to="/#newsletter">Dispatch</Link>
                <Link to="/#newsletter">Contact</Link>
            </nav>
            <div className="header-actions">
                <details className="header-menu">
                    <summary>Menu</summary>
                    <div className="header-menu-panel">
                        <Link to="/books">Books</Link>
                        <Link to="/third-lamp">The Third Lamp</Link>
                        <Link to="/#journal">Essays</Link>
                        <Link to="/#about">About</Link>
                        <Link to="/#newsletter">Dispatch</Link>
                        <Link to="/#newsletter">Contact</Link>
                    </div>
                </details>
                <button className="cart-pill" type="button">
                    <span>Cart</span>
                    <strong>0</strong>
                </button>
            </div>
        </header>
    );
}

export default SiteHeader;

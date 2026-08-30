import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AlchemicalCursor from './components/AlchemicalCursor';

// The landing page ships in the entry bundle so first paint needs no second
// round-trip. Every other route is its own chunk, fetched on first visit —
// so a reader who opens the homepage never downloads the contribute form,
// the archive, or the account pages, and the essay data (which is only
// imported by the archive and article pages) stays out of the entry entirely.
import HomePage from './pages/HomePage';
const BooksPage = lazy(() => import('./pages/BooksPage'));
const ThirdLampPage = lazy(() => import('./pages/ThirdLampPage'));
const ThirdLampArchivePage = lazy(() => import('./pages/ThirdLampArchivePage'));
const ThirdLampContributePage = lazy(() => import('./pages/ThirdLampContributePage'));
const ThirdLampAboutPage = lazy(() => import('./pages/ThirdLampAboutPage'));
const ThirdLampAuthorsPage = lazy(() => import('./pages/ThirdLampAuthorsPage'));
const ThirdLampLampPostPage = lazy(() => import('./pages/ThirdLampLampPostPage'));
const ThirdLampContactPage = lazy(() => import('./pages/ThirdLampContactPage'));
const EducationPortalPage = lazy(() => import('./pages/EducationPortalPage'));
const EducationLanguagePage = lazy(() => import('./pages/EducationLanguagePage'));
const EducationCoursePage = lazy(() => import('./pages/EducationCoursePage'));
const ChristianitiesPortalPage = lazy(() => import('./pages/christianities/ChristianitiesPortalPage'));
const ChristianitiesMapPage = lazy(() => import('./pages/christianities/ChristianitiesMapPage'));
const ChristianitiesCanonPage = lazy(() => import('./pages/christianities/ChristianitiesCanonPage'));
const ChristianitiesSectionPage = lazy(() => import('./pages/christianities/ChristianitiesSectionPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const PlansPage = lazy(() => import('./pages/PlansPage'));
const WelcomePage = lazy(() => import('./pages/WelcomePage'));
const RestoreAccessPage = lazy(() => import('./pages/RestoreAccessPage'));

// Route chunks are small and arrive fast; an empty fallback avoids a flash of
// spinner on the way in. The page keeps its dark background from <body>.
const RouteFallback = () => <div aria-busy="true" style={{ minHeight: '100vh' }} />;

// A stale tab after a deploy asks for a chunk that no longer exists (each build
// replaces the hashed files). Reload once so the tab picks up the new
// index.html; if it still fails, or anything else throws, show a way out
// instead of a blank page.
const STALE_CHUNK = /Failed to fetch dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk|Loading CSS chunk/i;
const RELOAD_KEY = 'tl:reloaded-for-stale-chunk';

class RouteErrorBoundary extends React.Component {
    constructor(props) { super(props); this.state = { error: null }; }
    static getDerivedStateFromError(error) { return { error }; }
    componentDidCatch(error) {
        if (STALE_CHUNK.test(String(error && error.message))) {
            let reloaded = false;
            try { reloaded = sessionStorage.getItem(RELOAD_KEY) === '1'; } catch { /* storage unavailable */ }
            if (!reloaded) {
                try { sessionStorage.setItem(RELOAD_KEY, '1'); } catch { /* storage unavailable */ }
                window.location.reload();
            }
        }
    }
    componentDidUpdate(prevProps) {
        // Navigating away clears the error so the next route gets a clean try.
        if (this.state.error && prevProps.pathname !== this.props.pathname) this.setState({ error: null });
    }
    render() {
        if (!this.state.error) return this.props.children;
        return (
            <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '4rem 1.5rem', textAlign: 'center', color: '#e7dfcf', fontFamily: 'Georgia, serif' }}>
                <div style={{ maxWidth: '30rem' }}>
                    <p style={{ letterSpacing: '0.16em', textTransform: 'uppercase', fontSize: '0.72rem', color: '#b38b46', margin: '0 0 1rem' }}>Something went wrong</p>
                    <h1 style={{ fontFamily: '"Cinzel", serif', fontWeight: 400, fontSize: '1.6rem', margin: '0 0 1rem' }}>This page could not be displayed.</h1>
                    <p style={{ color: '#9d9587', lineHeight: 1.7, margin: '0 0 2rem' }}>Reloading usually resolves it. If it keeps happening, the archive is always open.</p>
                    <p style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: 0 }}>
                        <button type="button" onClick={() => window.location.reload()} style={{ background: '#b38b46', color: '#080a0a', border: 0, padding: '0.8rem 1.4rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.75rem', cursor: 'pointer' }}>Reload</button>
                        <Link to="/third-lamp/archive" style={{ color: '#d1ad68', border: '1px solid #b38b46', padding: '0.8rem 1.4rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.75rem', textDecoration: 'none' }}>The Archive</Link>
                    </p>
                </div>
            </main>
        );
    }
}

// Gives the boundary the current path so it can reset on navigation.
function RouteBoundary({ children }) {
    const { pathname } = useLocation();
    return <RouteErrorBoundary pathname={pathname}>{children}</RouteErrorBoundary>;
}

function App() {
    return (
        <Router>
                <AlchemicalCursor />
                <ScrollToTop />
                <RouteBoundary>
                <Suspense fallback={<RouteFallback />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/third-lamp" element={<ThirdLampPage />} />
                    <Route path="/third-lamp/archive" element={<ThirdLampArchivePage />} />
                    <Route path="/third-lamp/contribute" element={<ThirdLampContributePage />} />
                    <Route path="/third-lamp/about" element={<ThirdLampAboutPage />} />
                    <Route path="/third-lamp/authors" element={<ThirdLampAuthorsPage />} />
                    <Route path="/third-lamp/lamp-post" element={<ThirdLampLampPostPage />} />
                    <Route path="/third-lamp/contact" element={<ThirdLampContactPage />} />
                    <Route path="/third-lamp/education" element={<EducationPortalPage />} />
                    <Route path="/third-lamp/education/:lang" element={<EducationLanguagePage />} />
                    <Route path="/third-lamp/education/:lang/course" element={<EducationCoursePage />} />
                    <Route path="/third-lamp/education/:lang/course/:lesson" element={<EducationCoursePage />} />
                    <Route path="/christianities" element={<ChristianitiesPortalPage />} />
                    <Route path="/christianities/map" element={<ChristianitiesMapPage />} />
                    <Route path="/christianities/canon" element={<ChristianitiesCanonPage />} />
                    <Route path="/christianities/:section" element={<ChristianitiesSectionPage />} />
                    <Route path="/articles/:slug" element={<ArticlePage />} />
                    <Route path="/plans" element={<PlansPage />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/restore" element={<RestoreAccessPage />} />
                </Routes>
                </Suspense>
                </RouteBoundary>
        </Router>
    );
}

export default App;

import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { SubscriptionAuthProvider } from './contexts/SubscriptionAuthContext.jsx';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import ThirdLampPage from './pages/ThirdLampPage';
import ThirdLampArchivePage from './pages/ThirdLampArchivePage';
import ThirdLampContributePage from './pages/ThirdLampContributePage';
import ThirdLampAboutPage from './pages/ThirdLampAboutPage';
import ThirdLampAuthorsPage from './pages/ThirdLampAuthorsPage';
import ThirdLampLampPostPage from './pages/ThirdLampLampPostPage';
import ThirdLampContactPage from './pages/ThirdLampContactPage';
import ArticlePage from './pages/ArticlePage';
import AlchemicalCursor from './components/AlchemicalCursor';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import PlansPage from './pages/PlansPage';
import SubscriptionsPage from './pages/SubscriptionsPage';

function App() {
    return (
        <Router>
            <SubscriptionAuthProvider>
                <AlchemicalCursor />
                <ScrollToTop />
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
                    <Route path="/articles/:slug" element={<ArticlePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/plans" element={<PlansPage />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                </Routes>
            </SubscriptionAuthProvider>
        </Router>
    );
}

export default App;

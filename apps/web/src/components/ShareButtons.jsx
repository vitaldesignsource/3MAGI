import React from 'react';

/**
 * ShareButtons — social media sharing for articles
 * Displays Twitter, Facebook, and LinkedIn share buttons
 */
function ShareButtons({ title, url, description }) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        instagram: `https://www.instagram.com/?url=${encodedUrl}`,
    };

    return (
        <div className="share-buttons">
            <p className="share-buttons-label">Share this article</p>
            <div className="share-buttons-group">
                <a
                    href={shareLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button share-button-twitter"
                    aria-label="Share on Twitter"
                    title="Share on Twitter"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 10.5.5 13-4.5a17.54 17.54 0 001-4c0-.27-.02-.53-.05-.78A7.7 7.7 0 0023 3z" />
                    </svg>
                    <span>Twitter</span>
                </a>

                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button share-button-facebook"
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z" />
                    </svg>
                    <span>Facebook</span>
                </a>

                <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button share-button-linkedin"
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>LinkedIn</span>
                </a>

                <a
                    href={shareLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-button share-button-instagram"
                    aria-label="Share on Instagram"
                    title="Share on Instagram"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M12 7a5 5 0 100 10 5 5 0 000-10z" fill="white" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
                    </svg>
                    <span>Instagram</span>
                </a>
            </div>
        </div>
    );
}

export default ShareButtons;

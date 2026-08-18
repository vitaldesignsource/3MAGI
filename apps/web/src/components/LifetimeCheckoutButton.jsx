import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeCheckout } from '@/api/EcommerceApi';
import { useSubscriptionAuth } from '@/contexts/SubscriptionAuthContext.jsx';
import { LOGIN_PATH, PLANS_PATH } from '@/config/subscriptionRoutes.js';

/**
 * Checkout CTA for the one-time "Lifetime Membership" product (not a
 * subscription — variant has no billing_interval, so it is bought once
 * through the base store checkout, mirroring SubscribeButton's payload shape).
 *
 * @param {{ variantId: string, className?: string, label?: string }} props
 */
export default function LifetimeCheckoutButton({ variantId, className, label }) {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const { currentUser, isAuthenticated } = useSubscriptionAuth();
	const navigate = useNavigate();

	const handleClick = async () => {
		if (!isAuthenticated) {
			navigate(LOGIN_PATH);
			return;
		}
		setErrorMessage(null);
		setLoading(true);
		try {
			const { url } = await initializeCheckout({
				items: [{ variant_id: variantId, quantity: 1 }],
				successUrl: window.location.origin + PLANS_PATH + '?just_purchased=1',
				cancelUrl: window.location.origin + PLANS_PATH + '?just_purchased=1',
				customer: {
					external_id: currentUser.id,
					email: currentUser.email,
				},
			});
			window.location.href = url;
		} catch {
			setErrorMessage("Couldn't start checkout. Please try again.");
			setLoading(false);
		}
	};

	return (
		<div>
			<button type="button" className={className} onClick={handleClick} disabled={loading}>
				{loading ? 'Redirecting…' : label || 'Purchase Lifetime Access'}
			</button>
			{errorMessage && <p className="mt-2 text-sm text-destructive">{errorMessage}</p>}
		</div>
	);
}

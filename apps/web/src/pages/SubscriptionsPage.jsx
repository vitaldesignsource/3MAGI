import React from 'react';
import { Link } from 'react-router-dom';
import SubscriptionAccountSection from '@/components/SubscriptionAccountSection.jsx';

export default function SubscriptionsPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-12">
			<Link
				to="/third-lamp"
				style={{
					display: 'inline-flex',
					alignItems: 'center',
					gap: '0.45rem',
					marginBottom: '2rem',
					color: 'var(--gold-bright, #d1ad68)',
					fontSize: '0.72rem',
					letterSpacing: '0.1em',
					textTransform: 'uppercase',
					textDecoration: 'none',
					borderBottom: '1px solid rgba(179,139,70,0.4)',
					paddingBottom: '0.1rem',
					transition: 'color 180ms ease',
				}}
			>
				&#8592; Back
			</Link>
			<header className="mb-8">
				<h1 className="text-3xl font-semibold sm:text-4xl">Your subscription</h1>
				<p className="mt-2 text-muted-foreground">
					View your current plan and manage billing.
				</p>
			</header>
			<SubscriptionAccountSection />
		</div>
	);
}

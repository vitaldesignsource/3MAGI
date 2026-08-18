import React, { useState } from 'react';
import { useSubscriptionAuth } from '@/contexts/SubscriptionAuthContext.jsx';
import { useEcommerceSubscriptionsPlans } from '@/hooks/useEcommerceSubscriptionsPlans';
import SubscribeButton from './SubscribeButton.jsx';
import ManageSubscriptionButton from './ManageSubscriptionButton.jsx';

/**
 * Shipped pricing grid: loads plans via {@link useEcommerceSubscriptionsPlans} and renders one
 * card per plan with a {@link SubscribeButton}. For authenticated users with an active/trialing
 * subscription, the card whose `plan.id` matches the user's subscription shows a "Current plan"
 * badge and a {@link ManageSubscriptionButton} instead of Subscribe — so subscribed visitors on
 * /plans see their tier highlighted and have a direct path to the manage portal.
 *
 * Post-checkout polling (after the user returns from Ecommerce API, typically to /plans) is handled by
 * {@link SubscriptionAuthProvider} — when the `subscriptionPending` sessionStorage flag is set
 * by SubscribeButton, the provider refreshes subscriptions every 2s until the new one lands.
 * PlansList just re-renders when `subscriptions` updates and the Subscribe → Manage swap fires.
 *
 * Usage (pricing / plans page — prefer this over hand-rolling the hook):
 *   import PlansList from '@/components/PlansList.jsx';
 *   <PlansList /> // optional className for the grid wrapper
 *
 * Agents may restyle layout and copy; keep `useEcommerceSubscriptionsPlans`,
 * the `SubscribeButton plan/variant` wiring, and the Subscribe→Manage swap on the active-tier card.
 *
 * @param {{ className?: string }} props
 */
export default function PlansList({ className, splitVariants = false, children }) {
	const { plans, loading, error } = useEcommerceSubscriptionsPlans();
	const { subscriptions, polling } = useSubscriptionAuth();

	if (loading) {
		return (
			<div className={className ?? 'tl-plans-grid'}>
				{[0, 1, 2].map((i) => (
					<div key={i} className="tl-plan-card tl-plan-card-loading" />
				))}
			</div>
		);
	}

	if (error) {
		return <p className="tl-plans-error">Failed to load subscription plans.</p>;
	}

	if (!plans.length) {
		return <p className="tl-plans-error">No subscription plans available yet.</p>;
	}

	return (
		<>
			{polling && (
				<div className="tl-plans-polling">
					<span className="tl-plans-polling-spinner" />
					<p>Updating your subscription…</p>
				</div>
			)}
			<div className={className ?? 'tl-plans-grid'}>
				{splitVariants
					? plans.flatMap((plan) =>
							(plan.variants ?? []).map((variant) => (
								<PlanCard
									key={variant.id}
									plan={plan}
									fixedVariant={variant}
									subscriptions={subscriptions}
								/>
							)),
					  )
					: plans.map((plan) => (
							<PlanCard
								key={plan.id}
								plan={plan}
								subscriptions={subscriptions}
							/>
					  ))}
				{children}
			</div>
		</>
	);
}

function PlanCard({ plan, subscriptions, fixedVariant }) {
	const variants = fixedVariant ? [fixedVariant] : (plan.variants ?? []);
	const [selectedVariant, setSelectedVariant] = useState(variants[0]);
	const isCurrentPlan = subscriptions.some(
		(subscription) => subscription && subscription.product_id === plan.id && (subscription.status === 'active' || subscription.status === 'trialing'),
	);
	const hasAnyActiveSub = subscriptions.some(
		(subscription) => subscription && (subscription.status === 'active' || subscription.status === 'trialing'),
	);
	const isLocked = hasAnyActiveSub && !isCurrentPlan;

	return (
		<div className={`tl-plan-card ${isLocked ? 'tl-plan-card-locked' : ''}`}>
			<div className="tl-plan-card-head">
				<h3>{fixedVariant ? fixedVariant.title : plan.title}</h3>
				{isCurrentPlan && <span className="tl-plan-badge">Current plan</span>}
			</div>
			{plan.description && <p className="tl-plan-desc">{plan.description}</p>}
			{variants.length > 1 && (
				<div className="tl-plan-toggle">
					{variants.map((variant) => (
						<button
							key={variant.id}
							type="button"
							onClick={() => setSelectedVariant(variant)}
							className={selectedVariant?.id === variant.id ? 'is-active' : ''}
						>
							{variant.title}
						</button>
					))}
				</div>
			)}
			{selectedVariant && (
				<p className="tl-plan-price">
					{selectedVariant.sale_price_in_cents != null && (
						<span className="tl-plan-price-strike">{selectedVariant.price_formatted}</span>
					)}
					{selectedVariant.sale_price_in_cents != null
						? selectedVariant.sale_price_formatted
						: selectedVariant.price_formatted}
					<span> / {selectedVariant.title}</span>
				</p>
			)}
			<div className="tl-plan-card-cta">
				{selectedVariant && (
					isCurrentPlan ? (
						<ManageSubscriptionButton className="tl-button tl-button-outline" />
					) : isLocked ? (
						<div>
							<p className="tl-plan-locked-note">Switch from your current plan in the customer portal.</p>
							<ManageSubscriptionButton className="tl-button tl-button-outline" />
						</div>
					) : (
						<SubscribeButton plan={plan} variant={selectedVariant} className="tl-button" />
					)
				)}
			</div>
		</div>
	);
}

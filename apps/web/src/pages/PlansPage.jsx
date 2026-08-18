import React from 'react';
import { Helmet } from 'react-helmet';
import PlansList from '@/components/PlansList.jsx';
import LifetimeCheckoutButton from '@/components/LifetimeCheckoutButton.jsx';
import ThirdLampHeader from '@/components/ThirdLampHeader.jsx';
import ThirdLampFooter from '@/components/ThirdLampFooter.jsx';

const LIFETIME_VARIANT_ID = 'variant_01KYDY745849MQFYT9E4N902BG';

/**
 * Shipped pricing page.
 *
 * Renders the subscription tiers via the shipped <PlansList /> (Monthly and
 * Yearly Supporter variants), plus a one-time Lifetime Membership card backed
 * by the base store's <LifetimeCheckoutButton />.
 *
 * Mount on App.jsx as a PUBLIC route at /plans (no auth gate — anonymous
 * visitors browse pricing; SubscribeButton redirects to /login when needed):
 *   import PlansPage from '@/pages/PlansPage.jsx';
 *   <Route path="/plans" element={<PlansPage />} />
 *
 * Header/nav MUST include a "Plans" or "Pricing" link to /plans.
 *
 * Agents may restyle copy/hero/surrounding sections freely (FAQ, comparison
 * tables, value props, testimonials — whatever fits the site). PRESERVE the
 * <PlansList /> mount inside the page. Do NOT recreate plan-fetching,
 * subscribe-button logic, or hardcode a plans array — those live in
 * PlansList and its dependencies and would create a parallel (broken) flow.
 */
export default function PlansPage() {
	return (
		<>
			<Helmet>
				<title>Membership Plans | The Third Lamp</title>
			</Helmet>
			<div className="third-lamp-scope" style={{ background: 'var(--ink)', minHeight: '100vh' }}>
				<ThirdLampHeader />
				<main className="tl-plans-page">
					<header className="tl-plans-head">
						<p className="kicker">The Inner Circle</p>
						<h1>Choose your membership</h1>
						<p className="tl-plans-lede">
							Supporters leave notes and annotations in the margins of every essay in the Living
							Archive. Join monthly, save with the year, or step through the gate for good.
						</p>
					</header>

					<PlansList className="tl-plans-grid tl-plans-grid-three" splitVariants>
						<div className="tl-plan-card tl-plan-card-lifetime">
							<div className="tl-plan-card-head">
								<h3>Lifetime</h3>
								<span className="tl-plan-badge">One payment</span>
							</div>
							<p className="tl-plan-desc">
								A single offering for permanent standing among the Supporters — full access to
								community notes and annotations, for as long as the lamp is lit.
							</p>
							<p className="tl-plan-price">
								$333<span> once</span>
							</p>
							<div className="tl-plan-card-cta">
								<LifetimeCheckoutButton
									variantId={LIFETIME_VARIANT_ID}
									className="tl-button"
									label="Purchase Lifetime Access"
								/>
							</div>
						</div>
					</PlansList>

					<section className="tl-plans-benefits">
						<h2>What every Supporter receives</h2>
						<ul>
							<li>Full access to community notes and marginalia on every essay</li>
							<li>Annotate the Living Archive alongside fellow readers</li>
							<li>Early word on new issues and open calls</li>
							<li>Standing among the inner circle of The Third Lamp</li>
						</ul>
					</section>
				</main>
				<ThirdLampFooter />
			</div>
		</>
	);
}

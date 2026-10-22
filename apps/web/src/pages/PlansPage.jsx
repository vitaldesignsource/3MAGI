import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ThirdLampHeader from '@/components/ThirdLampHeader.jsx';
import ThirdLampFooter from '@/components/ThirdLampFooter.jsx';
import { PLANS, PAYMENT_LINKS, BENEFITS, isConfigured } from '@/config/membership.js';

/**
 * Membership pricing.
 *
 * Every card is a plain link to a Stripe-hosted Payment Link — there is no
 * checkout code, no cart and no SDK here. Stripe takes the payment and
 * redirects to /welcome, where api/redeem.php verifies the session and issues
 * the pass.
 *
 * Until the Payment Links are filled in (config/membership.js) the page says
 * so plainly, rather than rendering buttons that go nowhere.
 */
export default function PlansPage() {
    const ready = isConfigured();

    return (
        <>
            <Helmet>
                <title>Membership | The Third Lamp</title>
                <meta name="description" content="Support The Third Lamp and read the full archive: monthly, yearly, or a single lifetime offering." />
            </Helmet>
            <div className="third-lamp-scope" style={{ background: 'var(--ink)', minHeight: '100vh' }}>
                <ThirdLampHeader />
                <main className="tl-plans-page">
                    <header className="tl-plans-head">
                        <p className="kicker">The Inner Circle</p>
                        <h1>Choose your membership</h1>
                        <p className="tl-plans-lede">
                            The current issue is free to everyone. Supporters read the whole archive —
                            every essay we have published, and every one still to come.
                        </p>
                    </header>

                    {!ready && (
                        <div className="tl-plan-card" role="status" style={{ marginBottom: '2.5rem' }}>
                            <p className="tl-plan-desc" style={{ margin: 0 }}>
                                Memberships open shortly. In the meantime the current issue is free to read,
                                and you are welcome to <Link to="/third-lamp/contact">write to the editors</Link>.
                            </p>
                        </div>
                    )}

                    <div className="tl-plans-grid tl-plans-grid-three">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`tl-plan-card${plan.featured ? ' tl-plan-card-lifetime' : ''}`}
                            >
                                <div className="tl-plan-card-head">
                                    <h3>{plan.name}</h3>
                                    {plan.featured && <span className="tl-plan-badge">Best value</span>}
                                </div>
                                <p className="tl-plan-desc">{plan.blurb}</p>
                                <p className="tl-plan-price">
                                    {plan.price}<span> {plan.cadence}</span>
                                </p>
                                <div className="tl-plan-card-cta">
                                    {PAYMENT_LINKS[plan.id] ? (
                                        <a className="tl-button" href={PAYMENT_LINKS[plan.id]}>
                                            {plan.id === 'lifetime' ? 'Purchase Lifetime Access' : 'Become a Supporter'}
                                        </a>
                                    ) : (
                                        <span className="tl-button" aria-disabled="true" style={{ opacity: 0.45, pointerEvents: 'none' }}>
                                            Opening soon
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <section className="tl-plans-benefits">
                        <h2>What every Supporter receives</h2>
                        <ul>
                            {BENEFITS.map((b) => <li key={b}>{b}</li>)}
                        </ul>
                        <p style={{ marginTop: '1.6rem', color: 'var(--muted)', font: '0.9rem/1.7 Georgia, serif' }}>
                            Already a member on another device? <Link to="/restore" style={{ color: 'var(--gold-bright)' }}>Restore your access</Link>.
                        </p>
                    </section>
                </main>
                <ThirdLampFooter />
            </div>
        </>
    );
}

// Membership configuration.
//
// The three URLs below are Stripe Payment Links. They are public by design —
// they are just checkout pages — so they belong in the repo. Everything that
// decides whether someone may READ a gated essay lives on the server in
// api/essay.php; nothing here grants access.
//
// To set these up: create three Payment Links in the Stripe Dashboard, and for
// each one set "After payment" to redirect to
//   https://threemagipress.com/welcome?session_id={CHECKOUT_SESSION_ID}
// Stripe substitutes the real session id, and api/redeem.php verifies it.

/** Paste the Payment Link URLs here. Empty means "not set up yet", and the
 *  plans page will say so rather than showing a dead button. */
export const PAYMENT_LINKS = {
    monthly: '',
    yearly: '',
    lifetime: '',
};

export const PLANS = [
    {
        id: 'monthly',
        name: 'Supporter',
        price: '$5',
        cadence: 'per month',
        blurb: 'Full access to the archive, and standing among the Supporters.',
    },
    {
        id: 'yearly',
        name: 'Supporter',
        price: '$45',
        cadence: 'per year',
        blurb: 'The same, at a lower rate — and the one that costs the press least in fees.',
        featured: true,
    },
    {
        id: 'lifetime',
        name: 'Lifetime',
        price: '$180',
        cadence: 'one payment',
        blurb: 'A single offering for permanent standing among the Supporters.',
    },
];

export const BENEFITS = [
    'Full access to every essay in the Living Archive',
    'The complete back archive, not only the current issue',
    'Early word on new issues and open calls',
    'Standing among the Supporters of the press',
];

export const isConfigured = () => Object.values(PAYMENT_LINKS).some((u) => u !== '');

# Membership — how it works and how to set it up

The Third Lamp sells memberships through Stripe. There are no user accounts,
no passwords and no database: Stripe holds the record of who paid, and this
site holds a signed cookie proving it.

## Setting it up

Four things, in order. Steps 1–3 are yours; step 4 is a code change.

### 1. Stripe account

At [dashboard.stripe.com](https://dashboard.stripe.com): sign up, complete
identity verification, connect a bank account. Verification can take a few
days, so start here.

### 2. Three Payment Links

**Products** → create three, then **Payment Links** for each:

| Link | Type | Suggested |
|---|---|---|
| Supporter monthly | recurring, monthly | $5 |
| Supporter yearly | recurring, yearly | $45 |
| Lifetime | one-time | $180 |

For **every** link, under *After payment*, choose **Redirect to a page** and set:

```
https://threemagipress.com/welcome?session_id={CHECKOUT_SESSION_ID}
```

Type `{CHECKOUT_SESSION_ID}` literally — Stripe substitutes the real value.
If this is wrong, buyers pay and never receive access.

Also enable the **customer portal** (Settings → Billing → Customer portal) so
members can cancel without emailing you.

> **On pricing.** Stripe takes 2.9% + $0.30 per charge. At $3/month that is 13%;
> at $5/month it is 8.8%; on $45/year it is 3.5%. The fixed 30¢ is what makes
> small monthly amounts expensive, which is why the yearly option is worth
> leading with. Change the numbers in `apps/web/src/config/membership.js`.

### 3. The secrets file

In **Stripe → Developers → API keys**, create a **restricted key** with
**read-only** permissions on: Checkout Sessions, Subscriptions, Customers,
Charges, PaymentIntents. Grant no write permissions anywhere. If this key ever
leaks, it can read customer records but cannot move money — do not skip this.

In hPanel → File Manager, create `tl-secrets.php` **one level above
`public_html`** (beside `form-submissions.log`):

```php
<?php
return [
    'stripe_key'    => 'rk_live_…',   // the restricted key
    'cookie_secret' => '…',            // 64 random hex characters
    'preview_key'   => '…',            // any long random string

    // The Lifetime price in cents (e.g. 33300 for $333.00). This is a safety
    // floor: "Restore access" grants a lifetime pass from a one-off charge,
    // and without this ANY one-off charge on the same Stripe account would
    // qualify. Harmless while membership is all you sell — but the moment you
    // sell anything else through this Stripe account (a book, a print, a
    // donation), that buyer gets a free lifetime membership unless this is set.
    'lifetime_min_amount' => 33300,
];
```

For `cookie_secret`, run `openssl rand -hex 32` or use any password generator.
**Changing it later signs every member out at once.**

This file must never go into git.

### 4. Paste the links

Put the three Payment Link URLs into
`apps/web/src/config/membership.js`, then rebuild and deploy. Until then the
plans page honestly says "opening soon" rather than showing dead buttons.

## Checking it works

Buy your own membership with a real card, confirm the access-link email
arrives and works on a phone that has never visited the site, then cancel and
confirm access drops within a week.

To read your own unpublished drafts, visit once per browser:

```
https://threemagipress.com/api/preview.php?key=<preview_key>
```

## Publishing an essay

Free essays live in `apps/web/src/data/articles/`. Members-only essays live in
`apps/web/src/data/articles/gated/`. **The directory is the paywall** — moving a
file is the whole operation.

When a new issue goes out, move the previous issue's essays into `gated/`.
Forgetting leaves them free, which is the safe direction to fail.

## What this protects, and what it does not

Gated essay text is not in the JavaScript. It sits in `tl-essays/`, which
Apache is configured to refuse, and only `api/essay.php` will part with it —
after checking the reader's signed cookie. Unpublished drafts are protected the
same way. That is a real improvement on what came before, where every "Members
Only" essay shipped its full text to every visitor in a public file.

Three honest limits:

- **The pass is a bearer token.** Whoever holds the cookie or the emailed link
  is a member. One person can paste their link into a group chat and nothing
  will notice, because noticing requires accounts — which is exactly what was
  removed to keep this simple.
- **A member can copy what they read.** Every paywall has this property.
- **Cancellation takes up to 7 days to bite** (30 for a refunded lifetime
  purchase), because access is re-checked periodically rather than by webhook.

This stops casual readers, not determined ones. For an independent magazine
that is very likely the right trade — but it should be called that, not
mistaken for access control.

## If Stripe ever closes the account

Every membership re-check fails and, after 60 days of grace, members lose
access. The file `tl-members.log` (above the web root) records every member as
they join. It is the only local copy of who paid — back it up.

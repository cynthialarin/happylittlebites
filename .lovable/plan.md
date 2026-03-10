

# Phase 2 Remainder — Plan

## What's Left

From the original Phase 2 list, three medium-priority items remain:

1. **Prominent Emergency SOS on Dashboard** — The SOS button exists as a small fixed circle at `bottom-20 right-4`. It should be a visible card/banner on the dashboard itself, not just a floating icon.
2. **"Share with Caregiver" CTA on Dashboard** — The caregiver share page exists at `/caregiver-share` but has no entry point on the dashboard.
3. **Pricing Preview on Landing Page** — Show future pricing tiers so users understand the value proposition.

---

## Implementation

### 1. Dashboard: Add SOS Banner + Caregiver CTA

**File: `src/pages/Dashboard.tsx`**

Add two new cards to the returning-user dashboard (between the AI suggestion CTA and Detailed Insights):

- **Emergency SOS card**: Red-tinted card with ShieldAlert icon, "Emergency? Tap for choking & allergy help" text. Clicking opens the Safety page (`/more/safety`) or triggers the existing SafetyButton dialog.
- **Share with Caregiver card**: Accent-tinted card with Users icon, "Share {child}'s report with a caregiver" text, links to `/caregiver-share`.

Also add both cards to the new-user Quick Actions grid.

### 2. Landing Page: Pricing Preview Section

**File: `src/components/landing/LandingPricing.tsx`** (new file)

Create a pricing preview component with 2-3 tiers:
- **Free** — Basic tracking, 1 child profile
- **Plus** ($4.99/mo) — Unlimited children, AI suggestions, weekly reports
- **Family** ($7.99/mo) — Caregiver sharing, priority support

Include a "Currently FREE during beta" badge and "Beta users get 50% off" callout. All CTAs link to `/signup`.

**File: `src/pages/LandingPage.tsx`**

Import and place `LandingPricing` between `LandingBetaOffer` and `LandingDifferentiators`.

### 3. Make SOS button smarter

**File: `src/components/SafetyButton.tsx`**

No structural changes needed — the floating button stays. The dashboard card is an additional, more prominent entry point.

---

## Summary of File Changes

| File | Change |
|------|--------|
| `src/pages/Dashboard.tsx` | Add SOS banner card + Caregiver share CTA card to both new & returning views |
| `src/components/landing/LandingPricing.tsx` | New component: 3-tier pricing preview |
| `src/pages/LandingPage.tsx` | Import and render LandingPricing |




## Landing Page Plan

### Approach
Create a new `LandingPage.tsx` that displays when unauthenticated users visit `/`. The current `Auth.tsx` becomes accessible via `/login` and `/signup` routes. The landing page will use framer-motion for scroll animations, the existing warm color palette, and mobile-first responsive design.

### Routing Changes (`src/App.tsx`)
In the unauthenticated routes block (line 118-126), change the catch-all from `Auth` to `LandingPage`, and add explicit `/login` and `/signup` routes pointing to `Auth`.

### New File: `src/pages/LandingPage.tsx`

**Sections (top to bottom):**

1. **Hero** — Large headline ("Your baby's food journey, joyfully tracked"), subtext about stress-free weaning, two CTAs (Get Started Free → `/signup`, Sign In → `/login`), floating food emojis with gentle bounce animation.

2. **Social Proof Bar** — "100% Free · No Ads · No Paywalls" trust badges.

3. **Video Demo** — Embedded placeholder/iframe for a demo video (aspect-ratio container). Can be a static screenshot with play button initially.

4. **Feature Grid** — 3-column (1-col mobile) cards with icons showcasing:
   - First 100 Foods Guide
   - AI Meal Suggestions
   - Allergen Tracker (Top 9/11)
   - Feeding, Sleep & Diaper Tracking
   - Picky Eater Toolkit
   - Weekly Pediatrician Reports
   - Growth Charts & Milestones
   - Multi-Child Profiles
   - Grocery List & Meal Planner

5. **"What Makes Us Different"** — Subtle comparison section (not a competitive table). Cards highlighting: All-in-one (no juggling 5 apps), completely free, works on any device (PWA), AI-powered suggestions, privacy-first (your data stays yours).

6. **How It Works** — 3-step visual: Create Profile → Log First Food → Watch Progress Grow.

7. **Testimonial/Quote** — Placeholder for future social proof.

8. **Final CTA** — "Start your baby's food journey today" with sign-up button.

9. **Footer** — Links to Privacy Policy, Terms of Service, and sign-in.

### Design Details
- Framer-motion `whileInView` fade-up animations on each section
- Existing color tokens: `sage`, `peach`, `sky`, `lavender`, `cream` for feature card accents
- `font-heading` (Nunito) for headlines, `font-body` (Quicksand) for text
- Mobile-first: stacked layout on 428px viewport, grid on desktop
- No new dependencies needed

### Files Modified
- `src/pages/LandingPage.tsx` — new file (~300 lines)
- `src/App.tsx` — add LandingPage route, add `/login` `/signup` routes




# Google OAuth Integration

## Overview
Add a "Sign in with Google" button to the Auth page using Lovable Cloud's managed Google OAuth, which requires no additional configuration.

## Steps

### 1. Configure Social Login (tool call)
Use the Configure Social Auth tool to generate the `src/integrations/lovable` module and install `@lovable.dev/cloud-auth-js`. This is a prerequisite before writing any code.

### 2. Update Auth Page (`src/pages/Auth.tsx`)
- Import `lovable` from `@/integrations/lovable/index`
- Add a "Sign in with Google" button with a Google icon (SVG) above the email form
- On click, call `lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin })`
- Add a visual divider ("or") between the Google button and the email/password form
- Show the Google button on both login and signup views (but not on the password reset view)

### 3. Landing Page CTA (optional)
- Add a "Sign in with Google" option on the landing page's CTA section for faster onboarding

## No database changes needed
The existing `handle_new_user` trigger already creates profile and preferences rows for any new auth user, so Google OAuth users will be handled automatically.




## Plan: Update FAQs, Terms, Privacy Policy & Build AI Support Chatbot

### Summary
Three-part update: (1) refresh all legal/informational pages to reflect the complete current feature set, (2) add new FAQs covering recently added features, and (3) build a comprehensive AI-powered support chatbot that lives as a floating help button throughout the app and can answer any question about the app's features, usage, safety guidelines, and troubleshooting.

---

### Part 1: Update Landing FAQ (`src/components/landing/LandingFAQ.tsx`)

Expand from 8 to ~14 FAQs covering new features:
- **Existing FAQs** -- refresh wording to reflect current feature set (150+ foods, fridge scanner, plate scanner, etc.)
- **New FAQs to add:**
  - "What is the Fridge Scanner / Plate Scanner?" -- explain AI-powered camera features
  - "How does the First 100 Foods tracker work?" -- guided journey with visual checklist
  - "Can I track feeding, sleep, and diapers too?" -- full baby tracker suite
  - "What are the Insights & Weekly Reports?" -- data visualization and pediatrician-ready reports
  - "How does the achievement/gamification system work?" -- badges, XP, streaks
  - "What is the Picky Eater Toolkit?" -- evidence-based strategies and reintroduction tracking

### Part 2: Update Terms of Service (`src/pages/TermsOfService.tsx`)

- Update "Last updated" date to March 13, 2026
- **Section 2 (Description of Service):** Add missing features:
  - Fridge Scanner (AI camera-based ingredient detection)
  - Plate Scanner (AI meal photo auto-logging)
  - Daily Timeline view
  - Store-Bought/Jar Food Guide (40+ products)
  - Insights page with charts and trend analysis
  - Feedback submission system
  - In-app product tour and contextual hints
  - AI Support Chatbot (new feature being added)
  - Cultural foods (40+ diverse entries)
- **Section 4 (AI Features):** Add Fridge Scanner, Plate Scanner, and AI Chatbot to the list of AI-powered features, with appropriate disclaimers

### Part 3: Update Privacy Policy (`src/pages/PrivacyPolicy.tsx`)

- Update "Last updated" date to March 13, 2026
- **Section 2 (Information We Collect):** Add:
  - Fridge/plate scanner photos (processed in real-time, not stored permanently)
  - Feedback ticket submissions
  - AI chatbot conversation history
  - Product tour and hint interaction data (localStorage)
- **Section 4 (How We Use):** Add fridge/plate scanning, AI chatbot support, feedback system
- **Section 5 (AI Data Processing):** Add fridge scanner images, plate scanner images, and chatbot conversations to the transparency notice

### Part 4: Build AI Support Chatbot

#### Backend: New Edge Function (`supabase/functions/support-chat/index.ts`)
- Uses Lovable AI gateway with `google/gemini-3-flash-preview`
- Comprehensive system prompt that covers **every feature** of the app:
  - Food Library (150+ foods, cultural foods, age-specific safety)
  - First 100 Foods tracker
  - Food Diary with meal logging, texture stages, acceptance levels
  - Allergen Tracker (Top 9 US / Top 11 Canada)
  - AI Meal Suggestions with Fridge Scanner
  - Plate Scanner for auto-logging
  - Meal Planner and Grocery Lists
  - Recipe Library (100+ recipes, saved AI recipes)
  - Feeding/Sleep/Diaper trackers
  - Growth Tracker
  - Daily Timeline
  - Weekly Reports for pediatricians
  - Achievements & Gamification (badges, XP, streaks)
  - Picky Eater Toolkit & Reintroduction Tracker
  - Caregiver Sharing
  - Child Profiles (multi-child support)
  - Data Management (export/delete)
  - Safety Reference (choking, CPR, emergency contacts)
  - Milestones tracker
  - Store-Bought Food Guide
  - Insights with charts
  - Feedback system
  - PWA / offline support
  - Country-specific guidelines (US vs Canada)
- System prompt includes navigation hints (which page to visit for each feature)
- Medical disclaimer baked into system prompt -- bot always defers to pediatricians for medical questions
- Streaming response support

#### Frontend: Floating Chat Widget (`src/components/SupportChatbot.tsx`)
- Floating help button (bottom-right, above nav bar) with `MessageCircle` icon
- Expandable chat panel with:
  - Message history (stored in component state, not persisted)
  - Markdown rendering for AI responses (`react-markdown`)
  - Streaming token display
  - Quick-start suggestion chips ("How do I log a meal?", "Tell me about allergens", "How does the fridge scanner work?")
  - Auto-scroll on new messages
- Integrated into `Layout.tsx` so it's available on every authenticated page
- Dismissible with animation

#### Files to create/modify:
1. **Create** `supabase/functions/support-chat/index.ts` -- edge function with comprehensive system prompt
2. **Create** `src/components/SupportChatbot.tsx` -- floating chat widget
3. **Modify** `src/components/Layout.tsx` -- add `<SupportChatbot />` 
4. **Modify** `src/components/landing/LandingFAQ.tsx` -- expand FAQ list
5. **Modify** `src/pages/TermsOfService.tsx` -- update feature descriptions and date
6. **Modify** `src/pages/PrivacyPolicy.tsx` -- update data collection and AI sections


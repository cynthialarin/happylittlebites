

# Happy Little Bites — The Free Baby & Toddler Food App

## Vision
A completely free, comprehensive food introduction and recipe app for parents of children 6 months to 5+ years. Addresses every pain point from Solid Starts, BLW Meals, First Bites, and AllergySpot — without any paywall.

---

## Pages & Features

### 1. Onboarding Flow
- Welcome screen with warm, friendly branding (soft yellows, greens, playful illustrations style)
- Add child profile: name, birthdate, known allergies, feeding approach (BLW, purees, combo)
- Multiple children support
- Data stored locally (localStorage) for now

### 2. Dashboard / Home
- Child's age displayed with current feeding stage
- "Today's suggestions" — age-appropriate food ideas
- Quick stats: foods tried, allergens introduced, streak tracker
- Progress ring showing allergen introduction completion
- Upcoming milestones (e.g., "Ready for finger foods soon!")

### 3. Food Library (500+ foods)
- Searchable, filterable database of foods
- Each food entry includes:
  - Safety info: choking hazards, how to serve by age (6mo, 9mo, 12mo, 2yr+) with visual guides
  - Nutritional highlights
  - Allergen flags (Top 9: milk, eggs, peanuts, tree nuts, wheat, soy, fish, shellfish, sesame)
  - Common reactions to watch for
  - Preparation tips with serving size guidance
- Filter by: age, allergen-free, food group, texture stage
- "Is this safe?" quick lookup — the #1 reason parents open these apps

### 4. Allergen Introduction Tracker
- Visual checklist of all top 9 (+ additional) allergens
- Guided introduction schedule with recommended order
- For each allergen: step-by-step first introduction protocol (small amount, wait, observe)
- Reaction logging: date, food, symptoms, severity, onset time, photos
- Timeline view to spot delayed reactions (the AllergySpot insight — reactions can hit 24-48hrs later)
- Exportable report for pediatrician visits

### 5. Food Diary / Tracker
- Daily log: what baby ate, reactions, mood, acceptance level (loved/okay/refused)
- First foods checklist with visual progress (like a bingo board)
- Weekly/monthly summary views
- Track texture progression (purees → mashed → soft chunks → finger foods)

### 6. Recipe Library (300+ recipes)
- Age-filtered recipes (6mo+, 9mo+, 12mo+, toddler, family meals)
- Categories: breakfast, lunch, dinner, snacks, smoothies, batch cooking
- Each recipe: ingredients, allergen tags, prep time, freezer-friendly flag, nutrition info
- "Family-friendly" tag for meals the whole family can eat (huge parent request)
- Serving modification tips for different ages
- Favorites and "tried it" tracking

### 7. Meal Planner
- Weekly drag-and-drop meal planner
- Auto-suggests meals based on: age, foods not yet tried, allergen schedule, nutritional balance
- Shopping list generator from meal plan
- Batch cooking suggestions for busy parents

### 8. Picky Eater Toolkit (unique differentiator)
- Evidence-based strategies for food refusal
- "Food exposure tracker" — research shows 15-20 exposures needed
- Sensory play ideas to build food comfort
- Mealtime environment tips
- Division of responsibility framework (Ellyn Satter method)
- Age-appropriate expectations guide

### 9. Safety & First Aid Reference
- Choking vs. gagging guide with visual comparison
- What to do if baby chokes — step-by-step with illustrations
- When to call the doctor: reaction severity guide
- CPR basics reminder
- Always accessible from any screen (floating safety button)

### 10. Growth & Milestones
- Feeding milestone tracker by age
- Texture progression guide
- Cup/utensil introduction timeline
- Self-feeding milestones

---

## Design & UX
- Mobile-first responsive design (parents use this one-handed while feeding)
- Warm, calming color palette: soft yellow primary, sage green accents, cream backgrounds
- Large touch targets, easy one-handed navigation
- Bottom navigation bar: Home, Foods, Recipes, Tracker, More
- Playful but trustworthy — friendly icons, rounded corners, gentle animations
- Dark mode for late-night feeding sessions
- Offline-capable (all data in localStorage)

---

## Technical Approach
- Frontend-only with localStorage for all data persistence
- React + TypeScript + Tailwind + shadcn/ui
- Static food & recipe data embedded in the app (JSON)
- react-router for page navigation
- Local state management with React context
- PWA-ready structure for future installability

---

## Data Model (localStorage)
- Children profiles with birthdates
- Food diary entries (date, food, reaction, acceptance)
- Allergen introduction records
- Favorite recipes
- Meal plans
- Settings/preferences




# Feature Audit & Jar Baby Food Database

## Feature Status

| Feature | Status | Location |
|---------|--------|----------|
| Baby profiles | ✅ Done | `ChildProfiles.tsx`, child switcher |
| Food introduction tracker | ✅ Done | `Tracker.tsx`, `First100Foods.tsx`, diary entries |
| Allergen exposure tracker | ✅ Done | `AllergenTracker.tsx`, guided protocol |
| Recipe database | ✅ Done | 104 recipes in `recipes.ts` + `culturalFoods.ts` |
| **Jar baby food database** | ❌ Missing | No commercial/store-bought baby food data exists |
| Homemade baby food recipes | ✅ Done | Full recipe library with age-appropriate prep |
| Feeding stage guidance | ✅ Done | `TextureProgression.tsx` (purees → mashed → soft chunks → finger foods → regular) |

**One feature is missing: a jar/commercial baby food database.** Everything else is built.

## Plan: Add Jar Baby Food Database

### What it is
A searchable reference of popular store-bought baby food products (Gerber, Beech-Nut, Happy Baby, Earth's Best, Plum Organics, etc.) with age stage, ingredients, allergen flags, and nutrition notes. Parents can look up a jar they're feeding and log it to their diary just like homemade food.

### Implementation

#### 1. New data file: `src/data/jarFoods.ts`
- ~80-100 entries covering the most popular US/CA commercial baby food products
- Each entry includes: `id`, `brand`, `name`, `emoji`, `stage` (1/2/3), `ageGroup`, `ingredients` (summary), `allergens`, `foodGroup`, `nutritionNotes`
- Organized by brand and stage

#### 2. New page: `src/pages/JarFoodLibrary.tsx`
- Searchable, filterable list of jar foods
- Filter by: brand, stage (1/2/3), allergen-free, food group
- Each item shows brand logo/emoji, product name, stage badge, allergen flags
- Tap to see full details (ingredients, nutrition notes, allergen warnings)
- "Log to Diary" button that pre-fills the food name and links to the diary entry form

#### 3. Update navigation
- Add "Store-Bought Guide" or "Jar Foods" entry in the More menu (`MoreMenu.tsx`)
- Add a tab or link from the existing Food Library page for cross-discovery

#### 4. Integrate with diary logging
- When logging a meal in `Tracker.tsx`, add a "Pick from Jar Foods" option alongside the existing food search
- Pre-fills food name with brand + product name (e.g., "Gerber 1st Foods Banana")

### No database changes needed
This is a static reference dataset (like `foods.ts` and `recipes.ts`). Diary entries already support free-text food names.


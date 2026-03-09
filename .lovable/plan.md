

# AI-Generated Food Photos

## What We're Building
Replace emoji placeholders with real, AI-generated food photos throughout the app — Food Library, Food Detail, Recipe cards, Recipe Detail, Meal Planner slots, and Dashboard. Images are generated once per food/recipe via a Lovable Cloud edge function using the Gemini image model, then cached in Supabase Storage so they're only generated once.

## Architecture

```text
User opens Food/Recipe
  → Check Supabase Storage for cached image
  → If exists: display cached URL
  → If not: call edge function → Gemini generates image → upload to Storage → return URL
```

## Technical Plan

### 1. Enable Lovable Cloud
Required for edge functions, storage, and the `LOVABLE_API_KEY`.

### 2. Create Storage Bucket
- Bucket: `food-images` (public, so images load without auth)

### 3. Edge Function: `generate-food-image`
- Input: `{ type: "food" | "recipe", id: string, name: string, description?: string }`
- Check if image already exists in `food-images/{type}/{id}.png`
- If yes, return the public URL
- If no, call Gemini image model (`google/gemini-2.5-flash-image`) with a carefully crafted prompt:
  - For foods: "Professional food photography of {name}, baby/toddler food preparation, soft natural lighting, clean white plate, overhead shot, appetizing and realistic"
  - For recipes: "Professional food photography of {recipe title}: {description}, home-cooked style, warm lighting, appetizing plating, realistic photo"
- Decode base64 response, upload to storage bucket
- Return public URL

### 4. New Component: `FoodImage`
- `src/components/FoodImage.tsx`
- Props: `type`, `id`, `name`, `description?`, `className?`, `fallbackEmoji?`
- Uses React Query to fetch/generate image
- Shows skeleton loader while loading, falls back to emoji on error
- Caches URL in React Query cache so repeat renders are instant

### 5. Update Pages to Use `FoodImage`
- **FoodLibrary.tsx**: Replace emoji `<span>` with `<FoodImage>` in each grid card
- **FoodDetail.tsx**: Replace large emoji header with `<FoodImage>` hero image
- **Recipes.tsx**: Replace emoji in recipe cards with `<FoodImage type="recipe">`
- **RecipeDetail.tsx**: Replace emoji header with `<FoodImage>` hero
- **MealSlot.tsx**: Show small `<FoodImage>` when a recipe is linked
- **Dashboard.tsx**: Food suggestion thumbnails (if applicable)

### 6. Config & Routing
- Add function to `supabase/config.toml` with `verify_jwt = false`
- Create storage bucket via migration

## Key Details
- Images generated lazily on first view, then cached permanently in storage
- ~200ms skeleton shimmer while loading, graceful emoji fallback on failure
- Prompt engineering ensures baby-food-appropriate, appetizing photos
- Rate limiting handled: if Gemini returns 429, show emoji fallback and retry later


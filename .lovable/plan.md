

# AI Photo Meal Scanner

## Overview
Add a "Scan Plate" button to the Food Diary that lets parents photograph their baby's plate. The AI identifies all visible foods and auto-populates diary entries for each one, eliminating manual food-by-food logging.

## Architecture

```text
Camera/Photo → Edge Function (scan-plate) → Gemini 2.5 Flash (vision) → Structured food list → Auto-log diary entries
```

## Implementation

### 1. New Edge Function: `supabase/functions/scan-plate/index.ts`
- Accepts `{ imageBase64, childAge, knownAllergies, mealType }` 
- Sends image to Lovable AI Gateway using `google/gemini-2.5-flash` (supports vision/multimodal)
- System prompt: "You are a pediatric food identification expert. Identify all baby/toddler foods visible on this plate."
- Uses tool calling to return structured output:
  ```json
  { "foods": [
    { "name": "avocado", "texture": "mashed", "confidence": "high" },
    { "name": "sweet potato", "texture": "soft-chunks", "confidence": "high" }
  ]}
  ```
- Flags any identified foods that match known allergens
- Config: `verify_jwt = false` in config.toml

### 2. New Component: `src/components/MealScanner.tsx`
- Full-screen dialog triggered from "Scan Plate" button
- Camera capture via `<input type="file" accept="image/*" capture="environment">`
- Flow:
  1. Parent takes/selects photo → shows preview
  2. Hits "Scan" → loading spinner with "Identifying foods..."
  3. AI returns food list → shows editable checklist of detected foods
  4. Parent can: remove false positives, adjust texture/acceptance per food, add missed foods
  5. "Log All" button → creates a diary entry for each checked food, uploads photo to first entry
- Handles errors (rate limit, no foods found) gracefully with toasts

### 3. Update Tracker Page: `src/pages/Tracker.tsx`
- Add a "📸 Scan Plate" button next to "Log a Meal"
- Opens the MealScanner dialog
- On completion, diary entries are added via existing `addDiaryEntry`

### 4. Upload the plate photo
- Reuse existing `diary-photos` storage bucket
- Attach photo to the first food entry logged from the scan

## No database changes needed
Uses existing `diary_entries` table and `diary-photos` bucket.

## Key Details
- Model: `google/gemini-2.5-flash` (multimodal, supports image input, cost-effective)
- Image is sent as base64 in the message content array (text + image_url)
- Compress image client-side to max 1MB before sending to keep edge function fast
- The review step before logging ensures parents stay in control


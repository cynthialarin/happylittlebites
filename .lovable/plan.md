

## Plan: My Pantry & Fridge Inventory with UPC Barcode Scanner

### What We're Building

A persistent, database-backed **"My Pantry & Fridge"** page with **4 ways to add items**: manual entry, AI photo scan, browse from the app's food library, and **UPC barcode scanning** for store-bought baby food, formula, diapers, etc. Items are organized by location (Fridge / Pantry / Freezer) and food category, with grocery list integration when items run out.

---

### Database

**New table: `pantry_items`**

| Column | Type | Default |
|--------|------|---------|
| id | uuid PK | gen_random_uuid() |
| user_id | uuid | RLS enforced |
| name | text | required |
| emoji | text | '🍽️' |
| category | text | 'other' (fruit, vegetable, protein, dairy, grain, legume, baby-food, formula, diapers, other) |
| location | text | 'pantry' (fridge, pantry, freezer) |
| quantity | text nullable | e.g. "2 jars" |
| food_id | text nullable | links to foods.ts / jarFoods.ts entry |
| upc_code | text nullable | scanned barcode |
| brand | text nullable | from UPC lookup or manual |
| in_stock | boolean | true |
| added_via | text | 'manual' (manual, scan, library, barcode) |
| created_at | timestamptz | now() |

RLS: standard `user_id = auth.uid()` for all CRUD.

---

### UPC Barcode Scanner

**New edge function: `supabase/functions/lookup-upc/index.ts`**
- Receives a UPC code string
- Uses the **Open Food Facts API** (free, no API key needed) to look up product info: `https://world.openfoodfacts.org/api/v2/product/{barcode}.json`
- Returns: product name, brand, category (auto-mapped to our categories), image URL, ingredients list
- Fallback: if not found in Open Food Facts, uses Lovable AI (`google/gemini-2.5-flash`) to identify the product from the barcode number and return structured data
- No API key required for Open Food Facts

**Frontend barcode scanning:**
- Use the `html5-qrcode` library (lightweight, works on mobile cameras) for real-time barcode scanning
- New component: `src/components/BarcodeScanner.tsx` — opens camera, detects UPC/EAN barcodes, returns code
- Supports UPC-A, UPC-E, EAN-13, EAN-8 formats (covers all grocery items)

---

### New Files

1. **Migration** — create `pantry_items` table with RLS
2. **`supabase/functions/lookup-upc/index.ts`** — UPC lookup via Open Food Facts + AI fallback
3. **`src/components/BarcodeScanner.tsx`** — camera-based barcode reader using `html5-qrcode`
4. **`src/hooks/usePantryItems.ts`** — React Query hook for CRUD, bulk insert, toggle stock
5. **`src/pages/MyPantry.tsx`** — main inventory page

### Modified Files

6. **`src/App.tsx`** — add `/pantry` route
7. **`src/components/FridgeScanner.tsx`** — after scan, bulk-insert detected items into `pantry_items`
8. **`src/pages/MealSuggestions.tsx`** — add "Use My Pantry" button that pulls in-stock items as ingredients
9. **`supabase/config.toml`** — register `lookup-upc` function

---

### MyPantry Page Layout

- **Header**: "My Pantry & Fridge" with total item count
- **Location tabs**: Fridge | Pantry | Freezer
- **4 action buttons**: "+ Manual" | "📸 Photo Scan" | "📚 From Library" | "🔲 Scan Barcode"
- **Items grouped by category** with emoji headers (🍎 Fruits, 🥦 Vegetables, 🍼 Baby Food, 🧴 Formula, 🧷 Diapers, etc.)
- **Each item**: emoji + name + brand (if any) + quantity + in-stock toggle
- **Out-of-stock items** show "🛒 Add to grocery list" button
- Swipe or tap to delete

### Add Item Flows

1. **Manual**: name, category dropdown, location, optional quantity/brand
2. **Photo Scan**: existing FridgeScanner → bulk-insert with `added_via = 'scan'`
3. **From Library**: searchable list from `foods.ts` + `jarFoods.ts` — tap to add with emoji/category pre-filled
4. **Barcode Scan**: opens camera → reads UPC → calls `lookup-upc` → shows product preview → confirm to add with `added_via = 'barcode'`, `upc_code` saved

### Grocery List Integration

- Toggle item: in-stock (green) ↔ out (gray)
- When out, "🛒 Add to list" appears → calls `useGroceryList.addItems()`

### Meal Suggestions Integration

- New "Use My Pantry" button on MealSuggestions page
- Fetches all in-stock `pantry_items` as available ingredients for the AI suggest-meals function


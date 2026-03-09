

# First 100 Foods & Food Safety Audit — Research Findings

## Research Sources Consulted
- AAP (American Academy of Pediatrics) / HealthyChildren.org
- CDC Infant and Toddler Nutrition guidelines (updated March 2025)
- FDA fish/mercury advisory
- AAP 2025 Guidelines for Early Food Introduction (Pediatrics Vol. 156)
- LEAP study allergen introduction evidence
- Solid Starts methodology comparison

---

## Overall Assessment: Our Data is Solid

The First 100 Foods list and food data are **largely aligned with current guidelines**. However, I found several items that need correction or clarification to reduce liability risk.

---

## Issues Found — Corrections Needed

### 1. Tuna — Mercury Warning Needs Strengthening
**Current tip:** `"Choose light tuna, limit due to mercury"`
**Issue:** FDA/EPA guidelines specifically recommend children eat 2-3 servings of "Best Choices" (low mercury) fish per week. Light/skipjack tuna is a "Best Choice" but albacore/white tuna is only a "Good Choice" (1 serving/week). Our tip is vague.
**Fix:** Change tip to: `"Choose light/skipjack only (lowest mercury). Limit to 1-2 oz per week for babies. Avoid albacore/white tuna."`

### 2. Honey Warnings — Mostly Good, One Gap
Honey is correctly flagged in bread and yogurt tips. Recipes correctly mark `(12mo+)`. **No issues found** — this is handled well.

### 3. Grapes — Correct but Could Be Stronger
**Current tip:** `"ALWAYS cut lengthwise — never serve whole"`
**Guideline:** CDC and AAP say grapes must be cut lengthwise into quarters (not just halves) for children under 4. Our tip says "lengthwise" but doesn't specify quarters.
**Fix:** Change to: `"ALWAYS quarter lengthwise — #1 choking hazard. Never serve whole or in rounds until age 4+"`

### 4. Raw Cucumber at 9+ months — Potentially Problematic
**Current:** `ageRecommended: '9+ months'`
**Issue:** Raw cucumber can be hard and is listed by some guidelines as a choking risk for younger babies. However, Solid Starts and AAP both support thin raw cucumber sticks from 9 months. **This is acceptable** but the tip should emphasize thinness.
**Current tip is fine** — already says "Peel and cut into thin sticks."

### 5. Mozzarella at 9+ months — Correct
Stringy/melted cheese is a choking hazard. 9+ months with "shred or slice thinly" is aligned with guidelines.

### 6. Goat Cheese at 9+ months — Acceptable
Soft, crumbly goat cheese could actually be introduced at 6+ months (it's softer than many cheeses). But 9+ is conservative and safe. **No liability issue.**

### 7. Duck at 9+ months — Acceptable
No official guideline restricts duck beyond 6 months. 9+ is conservative. Fine.

### 8. Cherries at 9+ months — Correct
Pit is a choking hazard. 9+ months with quarters is appropriate per CDC.

### 9. Cow's Milk as a Drink — NOT in Our List (Good)
We correctly include yogurt, cheese, and kefir (all OK from 6+ months per AAP) but do NOT include cow's milk as a beverage. This is correct — cow's milk as a drink should only be introduced at 12+ months. **No issue.**

### 10. Whole Nuts / Nut Butters — Correctly Handled
All our entries use "butter" forms (peanut butter, almond butter, etc.) and tips correctly say "never serve whole nuts" and "thin with milk." Aligned with AAP/CDC guidance that whole nuts are a choking hazard until age 4+.

### 11. Liver — Additional Note Needed
**Current tip:** `"Incredibly iron-rich — blend into meatballs"`
**Issue:** Liver is very high in vitamin A (retinol). Excessive vitamin A can be harmful. NHS and other guidelines recommend limiting liver to once per week for babies.
**Fix:** Add: `"Limit to once per week due to high vitamin A content"`

### 12. Rice — Arsenic Concern Is Good
Our tip already mentions arsenic concerns. This aligns with AAP/FDA recommendations to vary grains and not rely solely on rice cereal.

### 13. Allergen Introduction Timing — All Correct
Per the 2024-2025 AAP guidelines (informed by LEAP, EAT, PETIT studies), all top 9 allergens should be introduced early (around 6 months), not delayed. Our data correctly marks peanut butter, egg, milk (dairy), wheat, soy (tofu/edamame), fish, shellfish (shrimp/crab), sesame (tahini), and tree nuts at 6+ months. **Fully aligned.**

### 14. Couscous at 9+ months
Couscous is technically fine from 6+ months (it's tiny pasta). The 9+ recommendation appears to be based on pincer grasp development, which is reasonable and conservative. **Acceptable.**

---

## Summary of Required Changes

| Food | Issue | Fix |
|------|-------|-----|
| Tuna | Mercury warning too vague | Specify light/skipjack only, 1-2 oz/week, avoid albacore |
| Grapes | Doesn't say "quarter" | Specify quarter lengthwise, mention age 4+ for whole |
| Liver | Missing vitamin A warning | Add "limit to once per week" |

### Also in `foods.ts`:
The same corrections should be mirrored in the main food database entries for tuna, grapes, and liver if they exist there.

---

## Recipes Check
All recipes using honey are correctly marked `(12mo+)` in both ingredients and age groups. No recipe serves whole nuts. Fish recipes don't use high-mercury species. **No issues found in recipes.**

---

## Plan: Apply 3 Corrections

1. **`src/data/first100foods.ts`** — Update tips for tuna (line 104), grapes (line 47), and liver (line 101)
2. **`src/data/foods.ts`** — Update corresponding entries for grapes and any tuna/liver entries with strengthened safety language

These are minor text changes to 2 files. No structural changes needed.




# Fix: CSS Build Error

The build fails because Tailwind's PostCSS parser can't handle the escaped `/` in selectors like `.bg-peach\/10` inside the `@media print` block. The fix is to replace those Tailwind-style selectors with broader, simpler selectors.

## Change

**File: `src/index.css` (line 220)**

Replace the problematic selector `.bg-peach\/10, .bg-lavender\/10, .bg-sky\/10, .bg-sage\/10, .bg-primary\/5` with a plain class list or attribute selectors that don't use `/`. Since these are just print overrides for colored backgrounds, we can use `[class*="bg-"]` as a catch-all or list them without the Tailwind fraction syntax.

Simplest fix: replace line 220 with `[class*="bg-peach"], [class*="bg-lavender"], [class*="bg-sky"], [class*="bg-sage"], [class*="bg-primary"]` which matches the same elements without triggering the PostCSS parser error.


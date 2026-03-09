

# Plan: Improve Onboarding Readability and Contrast

## Problem
The onboarding page (step 2) has small, low-contrast text — especially the feeding approach descriptions at `text-[10px]` with `text-muted-foreground`, and labels that blend into the background.

## Changes — `src/pages/Onboarding.tsx`

**Feeding approach buttons:**
- Increase description text from `text-[10px]` to `text-xs` (12px)
- Change description color from `text-muted-foreground` to `text-foreground/70` for better contrast
- Increase label from `text-xs` to `text-sm` and make it `font-bold`
- Increase emoji size from `text-xl` to `text-2xl`
- Increase button padding from `p-4` to `p-5`

**Labels throughout step 2:**
- Increase label size from default to `text-base` with `font-bold`
- Increase subtitle text from default to `text-base`

**Learn more section:**
- Increase summary text from `text-xs` to `text-sm`
- Increase detail text from `text-xs` to `text-sm`
- Use `text-foreground/70` instead of `text-muted-foreground` for detail paragraphs

**General page:**
- Increase heading from `text-2xl` to `text-3xl`
- Increase subtitle from default to `text-base` with `text-foreground/60` for better readability

**Selected state improvement:**
- Use stronger selected state: `border-primary bg-primary/15 ring-2 ring-primary/30` for clearer active indication

No new files. Single file edit.


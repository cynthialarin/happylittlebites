

# Plan: Add Feeding Approach Descriptions to Onboarding

## What
Add short, parent-friendly descriptions under each feeding approach button on step 2 of onboarding so parents understand what Baby-Led (BLW), Purées, and Combo mean.

## Changes — `src/pages/Onboarding.tsx`

Update the feeding approach options array to include a `desc` field, then render it inside each button:

```
{ value: 'blw', label: 'Baby-Led', emoji: '🤚', desc: 'Baby self-feeds soft finger foods from the start' },
{ value: 'purees', label: 'Purées', emoji: '🥣', desc: 'Spoon-fed smooth foods, gradually adding texture' },
{ value: 'combo', label: 'Combo', emoji: '✨', desc: 'Mix of both — spoon-feeding & finger foods' },
```

Each button gets a small `text-[10px] text-muted-foreground` line below the label. Buttons get slightly more vertical padding (`p-4` instead of `p-3`) to fit the text while keeping everything compact and on-screen.

No other files changed.


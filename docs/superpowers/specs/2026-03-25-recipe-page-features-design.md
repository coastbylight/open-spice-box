# Recipe Page Features & Homepage Category Links

**Date:** 2026-03-25
**Status:** Approved

## Overview

Add seven features to Ancient Pantry: print recipe, breadcrumbs, social sharing, related recipes, homepage category quick-links, serving scaler, and a nicer "Jump to Recipe" button.

## 1. Print Recipe Button

**Component:** Inline button in recipe header area (next to Jump to Recipe)
**Behavior:** Calls `window.print()` on click
**Print CSS** (in `globals.css`):
- Hide: nav, footer, comments, ratings, social share buttons, save button, serving scaler controls, unit toggle, breadcrumbs
- Show: recipe title, subtitle, yield, times, ingredients (at current unit/scale state), instructions, cultural notes
- Clean serif typography, no decorative backgrounds

## 2. Breadcrumbs

**Component:** `components/ui/Breadcrumbs.tsx`
**Format:** `Home / Recipes / {Recipe Title}`
**Styling:** `text-xs text-charcoal-400` with link hover states, matching existing collections breadcrumb pattern
**SEO:** Add JSON-LD `BreadcrumbList` schema to recipe page metadata
**Placement:** Above recipe title in recipe detail page

## 3. Social Sharing Buttons

**Component:** `components/recipe/SocialShareButtons.tsx` (client component)
**Platforms:**
- Pinterest: `https://pinterest.com/pin/create/button/?url={url}&media={heroImage}&description={title}`
- Facebook: `https://www.facebook.com/sharer/sharer.php?u={url}`
- X/Twitter: `https://twitter.com/intent/tweet?url={url}&text={title}`
- Email: `mailto:?subject={title}&body={url}`
- Copy Link: `navigator.clipboard.writeText(url)` with brief "Copied!" feedback

**Styling:** Muted charcoal icon buttons in a horizontal row. Hover transitions to platform brand colors (Pinterest red, Facebook blue, X black, etc.).
**Placement:** Near save button in recipe header area.

## 4. Related Recipes

**Component:** `components/recipe/RelatedRecipes.tsx` (server component, data fetched in page)
**Algorithm:**
1. Find recipes sharing the most tags with current recipe
2. Boost score for same `tradition` or `cultural_origin`
3. Exclude current recipe
4. Return top 4 results

**Display:** 4-card grid (1 col mobile, 2 col sm, 4 col lg) using existing recipe card styling (image, title, cook time, difficulty badge)
**Placement:** After recipe content sections, before ratings/comments
**Heading:** "You Might Also Like"

## 5. Homepage Category Quick-Links

**Location:** New section on homepage between Featured Recipes and Philosophy strip
**Two groups:**
- **By Health Benefit:** anti-inflammatory, gut-health, immune, digestive, warming, adaptogen, tonic, healing (top 8 tags)
- **By Origin:** Chinese, Indian, Japanese, Korean, Thai, Vietnamese, Middle Eastern, Mediterranean (derived from `cultural_origin` field)

**Styling:** Pill/chip buttons, earthy color treatment matching brand palette
**Links:** Navigate to `/recipes?tag=X` or `/recipes?origin=X`
**RecipeGrid extension:** Add support for `origin` URL search param filtering

## 6. Serving Scaler

**Component:** Extend existing `RecipeIngredients.tsx`
**Controls:** +/- buttons flanking the yield display
**Steps:** 0.5x, 1x, 1.5x, 2x, 3x, 4x
**Behavior:**
- Multiply all ingredient `amount` values by the scale factor
- Display updated yield (e.g., "Serves 4" at 1x -> "Serves 8" at 2x)
- Works alongside existing metric/imperial toggle (scale first, then convert)
- Uses existing `parseAmount` and fraction rendering from `unit-conversion.ts`

## 7. Nicer "Jump to Recipe" Button

**Current:** Two implementations - an sr-only skip link and a text link with underline
**New:** Replace both with a single visible styled button
**Style:** Small outlined/secondary button with down-arrow icon: "Jump to Recipe ↓"
**Behavior:** Smooth scroll to `#ingredients` section
**Placement:** In recipe header area alongside print and share buttons

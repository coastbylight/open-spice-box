# Recipe Page Features Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add print button, breadcrumbs, social sharing, related recipes, homepage category quick-links, serving scaler, and a nicer "Jump to Recipe" button.

**Architecture:** All features are independent components added to existing pages. No database schema changes. The serving scaler extends the existing `RecipeIngredients.tsx` client component. Related recipes uses a server-side query scoring shared tags. Homepage quick-links use existing recipe data.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, Supabase (read-only queries)

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `components/recipe/SocialShareButtons.tsx` | Client component — share to Pinterest/FB/X/Email/Copy |
| Create | `components/recipe/RelatedRecipes.tsx` | Server component — 4-card grid of related recipes |
| Create | `components/ui/Breadcrumbs.tsx` | Reusable breadcrumb nav with JSON-LD |
| Create | `components/recipe/PrintButton.tsx` | Client component — triggers window.print() |
| Modify | `components/recipe/RecipeIngredients.tsx` | Add serving scaler (+/- buttons, multiplier state) |
| Modify | `app/(public)/recipes/[slug]/page.tsx` | Integrate all new components + restyle Jump to Recipe |
| Modify | `app/(public)/page.tsx` | Add category quick-links section |
| Modify | `app/(public)/recipes/page.tsx` | Support `?origin=` URL param filtering |
| Modify | `components/recipe/RecipeGrid.tsx` | Add `cultural_origin` filter support |
| Modify | `app/globals.css` | Add print media query styles |

---

## Chunk 1: Print Button + Print CSS + Jump to Recipe Restyle

### Task 1: Create PrintButton component

**Files:**
- Create: `components/recipe/PrintButton.tsx`

- [ ] **Step 1: Create PrintButton component**

```tsx
// components/recipe/PrintButton.tsx
'use client'

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-600 hover:text-charcoal-800 active:text-charcoal-900 bg-white border border-parchment-200 px-3.5 py-2 rounded-lg shadow-[0_1px_3px_-1px_rgba(74,63,53,0.1)] hover:shadow-[0_2px_6px_-2px_rgba(74,63,53,0.13)] hover:-translate-y-[0.5px] transition-[transform,box-shadow,color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
      aria-label="Print this recipe"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path fillRule="evenodd" d="M5 2.75C5 1.784 5.784 1 6.75 1h6.5c.966 0 1.75.784 1.75 1.75v3.552c.377.06.734.179 1.06.348a3.75 3.75 0 011.94 3.289V14a1 1 0 01-1 1h-2v1.25A1.75 1.75 0 0113.25 18h-6.5A1.75 1.75 0 015 16.25V15H3a1 1 0 01-1-1V9.939a3.75 3.75 0 011.94-3.289A3.69 3.69 0 015 6.302V2.75zm8.5 0v3.5h-7v-3.5a.25.25 0 01.25-.25h6.5a.25.25 0 01.25.25zM6.5 15v1.25c0 .138.112.25.25.25h6.5a.25.25 0 00.25-.25V15h-7z" clipRule="evenodd" />
      </svg>
      Print
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/recipe/PrintButton.tsx
git commit -m "feat: add PrintButton component"
```

### Task 2: Add print media query to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add print styles at end of globals.css**

Append after the existing `@media (prefers-reduced-motion: reduce)` block:

```css
/* ── Print Styles ── */
@media print {
  /* Hide non-essential UI */
  nav,
  footer,
  .no-print,
  [data-no-print] {
    display: none !important;
  }

  /* Clean background */
  body {
    background: white !important;
    color: #1c1714 !important;
    font-size: 11pt;
    line-height: 1.6;
  }

  /* Remove decorative shadows and borders */
  * {
    box-shadow: none !important;
    text-shadow: none !important;
  }

  /* Ensure images print */
  img {
    max-width: 100% !important;
    page-break-inside: avoid;
  }

  /* Avoid breaking inside recipe sections */
  section {
    page-break-inside: avoid;
  }

  /* Links: show URL for external links only */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 9pt;
    color: #666;
  }
  a[href^="/"]::after {
    content: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add print media query styles"
```

### Task 3: Restyle Jump to Recipe button and integrate PrintButton

**Files:**
- Modify: `app/(public)/recipes/[slug]/page.tsx`

- [ ] **Step 1: Add import for PrintButton**

At top of file (line 9), add:
```tsx
import PrintButton from '@/components/recipe/PrintButton'
```

- [ ] **Step 2: Replace the sr-only skip link (lines 119-125) and the header action bar (lines 176-186)**

Remove the sr-only `<a>` skip link (lines 119-125).

Replace the existing header action bar (lines 176-186) with:

```tsx
{/* Action bar: Jump to Recipe + Print + Save */}
<div className="mt-6 flex flex-wrap items-center gap-3" data-no-print>
  <a
    href="#ingredients"
    onClick={(e) => {
      e.preventDefault()
      document.getElementById('ingredients')?.scrollIntoView({ behavior: 'smooth' })
    }}
    className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-ochre-600 hover:bg-ochre-500 active:bg-ochre-700 px-4 py-2 rounded-lg shadow-[0_1px_4px_rgba(139,90,43,0.35)] hover:shadow-[0_3px_10px_-2px_rgba(139,90,43,0.4)] hover:-translate-y-[0.5px] transition-[transform,box-shadow,background] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
  >
    Jump to Recipe
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
    </svg>
  </a>
  <PrintButton />
  <SaveRecipeButton recipeId={r.id} size="sm" />
</div>
```

Note: The `<a>` needs `onClick` for smooth scroll but keeps `href="#ingredients"` for accessibility/fallback. This must be a client component interaction — wrap the action bar or handle via the existing client boundary. Since `SaveRecipeButton` is already a client component and this `<a>` needs an onClick, extract this action bar into a small client wrapper, or use a simpler approach: keep the `<a>` as a progressive enhancement where the href handles navigation and add smooth scroll behavior via CSS.

**Simpler approach — use CSS smooth scroll instead of onClick:**

Add to `app/globals.css` (before the print media query):
```css
html {
  scroll-behavior: smooth;
}
```

Then the `<a>` stays as a plain server-rendered link:
```tsx
<a
  href="#ingredients"
  className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-ochre-600 hover:bg-ochre-500 active:bg-ochre-700 px-4 py-2 rounded-lg shadow-[0_1px_4px_rgba(139,90,43,0.35)] hover:shadow-[0_3px_10px_-2px_rgba(139,90,43,0.4)] hover:-translate-y-[0.5px] transition-[transform,box-shadow,background] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
>
  Jump to Recipe
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
  </svg>
</a>
```

- [ ] **Step 3: Add `data-no-print` to elements that should not print**

Add `data-no-print` attribute to these existing elements in the recipe page:
- The hero image `<div>` (line 131)
- The ratings/comments section `<div>` (line 338)

- [ ] **Step 4: Verify the dev server shows the updated recipe page with the new buttons**

Run: Visit any recipe page at `http://localhost:3000/recipes/{any-slug}` and confirm:
- "Jump to Recipe" appears as an ochre button with down arrow
- "Print" button appears next to it
- "Save" heart button is still visible
- Ctrl/Cmd+P shows a clean print preview without nav/footer

- [ ] **Step 5: Commit**

```bash
git add app/(public)/recipes/[slug]/page.tsx app/globals.css
git commit -m "feat: restyle Jump to Recipe button, integrate print button, add smooth scroll"
```

---

## Chunk 2: Breadcrumbs

### Task 4: Create Breadcrumbs component

**Files:**
- Create: `components/ui/Breadcrumbs.tsx`

- [ ] **Step 1: Create Breadcrumbs component with JSON-LD**

```tsx
// components/ui/Breadcrumbs.tsx
import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href && { item: `https://ancientpantry.com${item.href}` }),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6" data-no-print>
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-charcoal-400 font-body">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true" className="text-parchment-300 select-none">/</span>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-ochre-600 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500 rounded"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-charcoal-600 truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Breadcrumbs.tsx
git commit -m "feat: add reusable Breadcrumbs component with JSON-LD"
```

### Task 5: Add Breadcrumbs to recipe detail page

**Files:**
- Modify: `app/(public)/recipes/[slug]/page.tsx`

- [ ] **Step 1: Import Breadcrumbs**

Add at top of file:
```tsx
import Breadcrumbs from '@/components/ui/Breadcrumbs'
```

- [ ] **Step 2: Add Breadcrumbs inside the `<article>` tag, before `<header>`**

After `<article className="max-w-2xl mx-auto px-4 sm:px-6 pb-24">` (line 143), add:

```tsx
<Breadcrumbs items={[
  { label: 'Home', href: '/' },
  { label: 'Recipes', href: '/recipes' },
  { label: r.title },
]} />
```

- [ ] **Step 3: Adjust header padding — change `pt-10` to `pt-8` on the `<header>` since breadcrumbs now provide top spacing**

- [ ] **Step 4: Commit**

```bash
git add app/(public)/recipes/[slug]/page.tsx
git commit -m "feat: add breadcrumbs to recipe detail page"
```

---

## Chunk 3: Social Sharing Buttons

### Task 6: Create SocialShareButtons component

**Files:**
- Create: `components/recipe/SocialShareButtons.tsx`

- [ ] **Step 1: Create SocialShareButtons client component**

```tsx
// components/recipe/SocialShareButtons.tsx
'use client'

import { useState } from 'react'

interface Props {
  title: string
  imageUrl?: string | null
}

export default function SocialShareButtons({ title, imageUrl }: Props) {
  const [copied, setCopied] = useState(false)

  // Build URL client-side to get the actual current page URL
  const getUrl = () => typeof window !== 'undefined' ? window.location.href : ''

  function share(platform: string) {
    const url = encodeURIComponent(getUrl())
    const text = encodeURIComponent(title)
    const urls: Record<string, string> = {
      pinterest: `https://pinterest.com/pin/create/button/?url=${url}${imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''}&description=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      email: `mailto:?subject=${text}&body=Check out this recipe: ${url}`,
    }
    const target = urls[platform]
    if (platform === 'email') {
      window.location.href = target
    } else {
      window.open(target, '_blank', 'noopener,noreferrer,width=600,height=500')
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input')
      input.value = getUrl()
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const btnClass =
    'p-2 rounded-lg text-charcoal-400 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1'

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Share this recipe" data-no-print>
      <span className="text-xs text-charcoal-400 mr-1 select-none">Share</span>

      {/* Pinterest */}
      <button onClick={() => share('pinterest')} className={`${btnClass} hover:text-[#E60023]`} aria-label="Share on Pinterest">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      </button>

      {/* Facebook */}
      <button onClick={() => share('facebook')} className={`${btnClass} hover:text-[#1877F2]`} aria-label="Share on Facebook">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      {/* X / Twitter */}
      <button onClick={() => share('x')} className={`${btnClass} hover:text-charcoal-900`} aria-label="Share on X">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      {/* Email */}
      <button onClick={() => share('email')} className={`${btnClass} hover:text-ochre-600`} aria-label="Share via email">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </button>

      {/* Copy Link */}
      <button onClick={copyLink} className={`${btnClass} hover:text-sage-600`} aria-label={copied ? 'Link copied' : 'Copy link'}>
        {copied ? (
          <svg className="w-4 h-4 text-sage-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
          </svg>
        )}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/recipe/SocialShareButtons.tsx
git commit -m "feat: add SocialShareButtons component"
```

### Task 7: Integrate SocialShareButtons into recipe page

**Files:**
- Modify: `app/(public)/recipes/[slug]/page.tsx`

- [ ] **Step 1: Import SocialShareButtons**

Add import:
```tsx
import SocialShareButtons from '@/components/recipe/SocialShareButtons'
```

- [ ] **Step 2: Add SocialShareButtons after the action bar (Jump to Recipe + Print + Save)**

After the action bar `</div>`, add:

```tsx
<div className="mt-3">
  <SocialShareButtons title={r.title} imageUrl={r.hero_image_url} />
</div>
```

- [ ] **Step 3: Commit**

```bash
git add app/(public)/recipes/[slug]/page.tsx
git commit -m "feat: add social sharing buttons to recipe page"
```

---

## Chunk 4: Related Recipes

### Task 8: Create RelatedRecipes component

**Files:**
- Create: `components/recipe/RelatedRecipes.tsx`

- [ ] **Step 1: Create RelatedRecipes component**

This receives pre-fetched related recipes (the query runs in the page server component).

```tsx
// components/recipe/RelatedRecipes.tsx
import Link from 'next/link'
import Image from 'next/image'

interface RelatedRecipe {
  slug: string
  title: string
  hero_image_url: string | null
  total_time: string | null
  difficulty: string | null
  cultural_origin: string | null
  tradition: string | null
}

interface Props {
  recipes: RelatedRecipe[]
}

export default function RelatedRecipes({ recipes }: Props) {
  if (recipes.length === 0) return null

  return (
    <section className="mt-16 pt-10 border-t border-parchment-200" data-no-print>
      <h2 className="font-display text-xl text-charcoal-900 tracking-tight mb-6">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recipes.map(recipe => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group block bg-white border border-parchment-200 rounded-xl overflow-hidden shadow-[0_2px_12px_-2px_rgba(139,90,43,0.08)] hover:shadow-[0_8px_28px_-4px_rgba(139,90,43,0.18)] hover:-translate-y-1 transition-[transform,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-2"
          >
            <div className="relative h-36 bg-parchment-100 overflow-hidden">
              {recipe.hero_image_url ? (
                <>
                  <Image
                    src={recipe.hero_image_url}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/30 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-parchment-300 text-3xl select-none" aria-hidden="true">🫙</span>
                </div>
              )}
              {recipe.difficulty && (
                <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider bg-white/90 text-charcoal-600 px-1.5 py-0.5 rounded-full">
                  {recipe.difficulty}
                </span>
              )}
            </div>
            <div className="p-3">
              {(recipe.tradition || recipe.cultural_origin) && (
                <p className="text-[9px] uppercase tracking-widest text-ochre-600 mb-1">
                  {[recipe.tradition, recipe.cultural_origin].filter(Boolean).join(' · ')}
                </p>
              )}
              <h3 className="font-display text-sm text-charcoal-900 leading-snug tracking-tight group-hover:text-ochre-800 transition-colors line-clamp-2">
                {recipe.title}
              </h3>
              {recipe.total_time && (
                <p className="text-[10px] text-charcoal-400 mt-1.5">{recipe.total_time}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/recipe/RelatedRecipes.tsx
git commit -m "feat: add RelatedRecipes component"
```

### Task 9: Query related recipes and integrate into recipe page

**Files:**
- Modify: `app/(public)/recipes/[slug]/page.tsx`

- [ ] **Step 1: Import RelatedRecipes**

```tsx
import RelatedRecipes from '@/components/recipe/RelatedRecipes'
```

- [ ] **Step 2: Add related recipes query in the page's data fetching section**

After the existing `Promise.all` block (after line 98), add a new query:

```tsx
// Fetch candidate recipes for "Related" section
const { data: allRecipes } = await supabase
  .from('recipes')
  .select('slug, title, hero_image_url, total_time, difficulty, cultural_origin, tradition, tags')
  .eq('published', true)
  .neq('slug', params.slug)
  .limit(50)
```

Then compute related recipes after `const r = recipe as Recipe`:

```tsx
// Score and pick top 4 related recipes
const relatedRecipes = (() => {
  if (!allRecipes) return []
  const currentTags = new Set(r.tags ?? [])
  const scored = allRecipes.map(candidate => {
    let score = 0
    for (const tag of candidate.tags ?? []) {
      if (currentTags.has(tag)) score += 2
    }
    if (candidate.tradition === r.tradition && r.tradition) score += 3
    if (candidate.cultural_origin === r.cultural_origin && r.cultural_origin) score += 2
    return { ...candidate, score }
  })
  return scored
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
})()
```

- [ ] **Step 3: Add RelatedRecipes component before the ratings section**

Insert before the `{/* ── Ratings & Comments ── */}` section:

```tsx
{/* ── Related Recipes ── */}
<RelatedRecipes recipes={relatedRecipes} />
```

- [ ] **Step 4: Commit**

```bash
git add app/(public)/recipes/[slug]/page.tsx
git commit -m "feat: add related recipes section to recipe detail page"
```

---

## Chunk 5: Serving Scaler

### Task 10: Add serving scaler to RecipeIngredients

**Files:**
- Modify: `components/recipe/RecipeIngredients.tsx`

- [ ] **Step 1: Add `recipeYield` prop and scaler state**

Update the Props interface and component signature to accept `recipeYield`:

```tsx
export default function RecipeIngredients({
  items,
  ingredientSlugs,
  recipeYield,
}: {
  items:           RecipeIngredient[]
  ingredientSlugs: Record<string, string>
  recipeYield?:    string | null
}) {
  const [system, setSystem] = useState<UnitSystem>('imperial')
  const [scale, setScale] = useState(1)
```

- [ ] **Step 2: Create ServingScaler sub-component**

Add this above the main export:

```tsx
const SCALE_STEPS = [0.5, 1, 1.5, 2, 3, 4]

function ServingScaler({
  scale,
  onChange,
  recipeYield,
}: {
  scale: number
  onChange: (s: number) => void
  recipeYield?: string | null
}) {
  const stepIdx = SCALE_STEPS.indexOf(scale)
  const canDecrease = stepIdx > 0
  const canIncrease = stepIdx < SCALE_STEPS.length - 1

  // Try to compute scaled yield (e.g. "Serves 4" at 2x → "Serves 8")
  const scaledYield = (() => {
    if (!recipeYield) return null
    const m = recipeYield.match(/(\d+)/)
    if (!m) return recipeYield
    const base = parseInt(m[1], 10)
    const scaled = Math.round(base * scale)
    return recipeYield.replace(/\d+/, String(scaled))
  })()

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Adjust servings">
      <button
        type="button"
        onClick={() => canDecrease && onChange(SCALE_STEPS[stepIdx - 1])}
        disabled={!canDecrease}
        className="w-7 h-7 rounded-full border border-parchment-200 bg-white text-charcoal-600 hover:bg-parchment-50 hover:border-ochre-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1"
        aria-label="Decrease servings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
        </svg>
      </button>
      <span className="text-xs font-medium text-charcoal-700 min-w-[3rem] text-center select-none">
        {scale === 1 ? (scaledYield ?? '1×') : (scaledYield ?? `${scale}×`)}
      </span>
      <button
        type="button"
        onClick={() => canIncrease && onChange(SCALE_STEPS[stepIdx + 1])}
        disabled={!canIncrease}
        className="w-7 h-7 rounded-full border border-parchment-200 bg-white text-charcoal-600 hover:bg-parchment-50 hover:border-ochre-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1"
        aria-label="Increase servings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
      </button>
      {scale !== 1 && (
        <button
          type="button"
          onClick={() => onChange(1)}
          className="text-[10px] text-ochre-600 hover:text-ochre-700 ml-1 underline underline-offset-2 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-ochre-500 rounded"
        >
          Reset
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Update SectionHeading to include ServingScaler alongside UnitToggle**

Update the return JSX of RecipeIngredients:

```tsx
return (
  <section id="ingredients">
    <SectionHeading
      action={
        <div className="flex items-center gap-3">
          <ServingScaler scale={scale} onChange={setScale} recipeYield={recipeYield} />
          <div className="w-px h-5 bg-parchment-200" aria-hidden="true" />
          <UnitToggle system={system} onChange={setSystem} />
        </div>
      }
    >
      Ingredients
    </SectionHeading>
    <ul>
      {items.map((item, i) => (
        <IngredientLine
          key={i}
          item={item}
          system={system}
          scale={scale}
          slugs={ingredientSlugs}
        />
      ))}
    </ul>
  </section>
)
```

- [ ] **Step 4: Update IngredientLine to accept and apply `scale`**

Add `scale` prop to IngredientLine:

```tsx
function IngredientLine({
  item,
  system,
  scale,
  slugs,
}: {
  item:   RecipeIngredient
  system: UnitSystem
  scale:  number
  slugs:  Record<string, string>
}) {
```

Scale the amount before passing to `convertIngredient`:

```tsx
// Scale the amount
const scaledAmount = (() => {
  if (scale === 1 || !item.amount) return item.amount
  const parsed = parseAmount(item.amount)
  if (parsed === 0) return item.amount
  return String(Math.round(parsed * scale * 100) / 100)
})()

// Scale imperial hints too
const scaledImperialAmount = (() => {
  if (scale === 1 || !item.imperial_amount) return item.imperial_amount
  const parsed = parseAmount(item.imperial_amount)
  if (parsed === 0) return item.imperial_amount
  return String(Math.round(parsed * scale * 100) / 100)
})()

const converted = convertIngredient(
  scaledAmount,
  item.unit,
  item.ingredient,
  system,
  scaledImperialAmount,
  item.imperial_unit,
)
```

Import `parseAmount` from the unit-conversion module:

```tsx
import { convertIngredient, parseAmount, type UnitSystem } from '@/lib/unit-conversion'
```

- [ ] **Step 5: Pass `recipeYield` from the recipe page**

In `app/(public)/recipes/[slug]/page.tsx`, update the RecipeIngredients usage:

```tsx
<RecipeIngredients
  items={r.ingredients ?? []}
  ingredientSlugs={ingredientSlugs}
  recipeYield={r.yield}
/>
```

- [ ] **Step 6: Verify serving scaler works**

Visit a recipe page. Confirm:
- +/- buttons appear next to the yield text
- Clicking + increases the multiplier through 1.5x, 2x, 3x, 4x
- Clicking - decreases back
- Ingredient amounts update accordingly
- "Reset" link appears when not at 1x
- Yield text updates (e.g., "Serves 4" → "Serves 8" at 2x)
- Works correctly with the metric/imperial toggle

- [ ] **Step 7: Commit**

```bash
git add components/recipe/RecipeIngredients.tsx app/(public)/recipes/[slug]/page.tsx
git commit -m "feat: add serving scaler to recipe ingredients"
```

---

## Chunk 6: Homepage Category Quick-Links

### Task 11: Add category quick-links section to homepage

**Files:**
- Modify: `app/(public)/page.tsx`

- [ ] **Step 1: Query distinct cultural origins and popular tags from recipes**

In the existing `Promise.all` in the homepage, add a third query:

```tsx
const [{ data: recipes }, { data: ingredients }, { data: allRecipes }] = await Promise.all([
  // ... existing recipes query ...
  // ... existing ingredients query ...
  supabase
    .from('recipes')
    .select('cultural_origin, tags')
    .eq('published', true),
])
```

Then compute the categories:

```tsx
// Compute category quick-links
const origins = Array.from(
  new Set((allRecipes ?? []).map(r => r.cultural_origin).filter(Boolean) as string[])
).sort()

const HEALTH_TAGS = [
  'anti-inflammatory', 'gut-health', 'immune', 'digestive', 'warming',
  'adaptogen', 'tonic', 'healing', 'probiotic', 'respiratory',
]
const tagCounts = new Map<string, number>()
for (const r of allRecipes ?? []) {
  for (const tag of r.tags ?? []) {
    if (HEALTH_TAGS.includes(tag)) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1)
    }
  }
}
const healthTags = [...tagCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([tag]) => tag)
  .slice(0, 8)
```

- [ ] **Step 2: Add the category quick-links section between Featured Recipes and Philosophy strip**

Insert after the Featured Recipes section closing `</section>` and before `{/* ── Philosophy strip ── */}`:

```tsx
{/* ── Browse by Category ── */}
{(healthTags.length > 0 || origins.length > 0) && (
  <section className="bg-white border-y border-parchment-200">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="block w-4 h-px bg-lacquer-400/60" aria-hidden="true" />
          <p className="text-[10px] uppercase tracking-[0.22em] text-lacquer-500 font-body font-medium">
            Discover
          </p>
          <span className="block w-4 h-px bg-lacquer-400/60" aria-hidden="true" />
        </div>
        <h2 className="font-display text-3xl sm:text-4xl text-charcoal-950 tracking-tight font-semibold">
          Browse by Category
        </h2>
      </div>

      {/* Health Benefits */}
      {healthTags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[10px] uppercase tracking-[0.18em] text-charcoal-400 mb-3 font-body text-center">
            By Health Benefit
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {healthTags.map(tag => (
              <Link
                key={tag}
                href={`/recipes?tag=${encodeURIComponent(tag)}`}
                className="text-xs px-4 py-2 rounded-full border border-sage-200 bg-sage-50 text-sage-700 hover:bg-sage-100 hover:border-sage-300 hover:text-sage-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-1 font-body"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* By Origin */}
      {origins.length > 0 && (
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.18em] text-charcoal-400 mb-3 font-body text-center">
            By Origin
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {origins.map(origin => (
              <Link
                key={origin}
                href={`/recipes?origin=${encodeURIComponent(origin)}`}
                className="text-xs px-4 py-2 rounded-full border border-ochre-200 bg-ochre-50 text-ochre-700 hover:bg-ochre-100 hover:border-ochre-300 hover:text-ochre-800 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ochre-500 focus-visible:ring-offset-1 font-body"
              >
                {origin}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
)}
```

- [ ] **Step 3: Commit**

```bash
git add app/(public)/page.tsx
git commit -m "feat: add category quick-links section to homepage"
```

### Task 12: Support URL params in RecipeGrid for tag and origin filtering

**Files:**
- Modify: `components/recipe/RecipeGrid.tsx`
- Modify: `app/(public)/recipes/page.tsx`

- [ ] **Step 1: Update RecipeGrid to accept initial filter values**

Add `initialTag` and `initialOrigin` props:

```tsx
interface Props {
  recipes: RecipeCardProps['recipe'][]
  allTags: string[]
  initialTag?: string
  initialOrigin?: string
}

export default function RecipeGrid({ recipes, allTags, initialTag, initialOrigin }: Props) {
  const medicinalTags = allTags.filter(t => MEDICINAL_TAGS.has(t.toLowerCase()))
  const [query, setQuery] = useState(initialOrigin ?? '')
  const [activeTags, setActiveTags] = useState<Set<string>>(
    initialTag ? new Set([initialTag]) : new Set()
  )
```

Also update the filter logic to include `cultural_origin` matching:

```tsx
const filtered = useMemo(() => {
  const q = query.toLowerCase().trim()
  return recipes.filter(r => {
    const matchesQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      (r.cultural_origin ?? '').toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    const matchesTags =
      activeTags.size === 0 || Array.from(activeTags).every(t => r.tags.includes(t))
    return matchesQuery && matchesTags
  })
}, [recipes, query, activeTags])
```

- [ ] **Step 2: Update the recipes page to pass URL params**

In `app/(public)/recipes/page.tsx`, accept searchParams:

```tsx
interface PageProps {
  searchParams: { tag?: string; origin?: string }
}

export default async function RecipesPage({ searchParams }: PageProps) {
```

Pass them to RecipeGrid:

```tsx
<RecipeGrid
  recipes={all}
  allTags={allTags}
  initialTag={searchParams.tag}
  initialOrigin={searchParams.origin}
/>
```

- [ ] **Step 3: Commit**

```bash
git add components/recipe/RecipeGrid.tsx app/(public)/recipes/page.tsx
git commit -m "feat: support tag and origin URL params for recipe filtering"
```

---

## Chunk 7: Final Verification

### Task 13: Verify all features end-to-end

- [ ] **Step 1: Visit homepage** at `http://localhost:3000`
  - Confirm "Browse by Category" section appears between Featured Recipes and Philosophy strip
  - Confirm health benefit pills and origin pills are displayed
  - Click a health tag — should navigate to `/recipes?tag=X` with that tag pre-selected
  - Click an origin — should navigate to `/recipes?origin=X` with search pre-filled

- [ ] **Step 2: Visit a recipe page**
  - Confirm breadcrumbs appear: Home / Recipes / {Title}
  - Confirm "Jump to Recipe" is a styled ochre button with down arrow
  - Confirm Print button appears next to Jump to Recipe
  - Confirm Save heart button still works
  - Confirm social share buttons appear below action bar (Pinterest, Facebook, X, Email, Copy Link)
  - Click "Copy Link" — confirm "Copied!" checkmark appears briefly
  - Confirm serving scaler +/- buttons appear next to Ingredients heading
  - Click + a few times — confirm ingredient amounts update
  - Confirm "Reset" link appears when scale > 1x
  - Toggle metric/imperial — confirm it still works with scaling
  - Scroll down — confirm "You Might Also Like" section appears with up to 4 related recipe cards
  - Use Ctrl/Cmd+P — confirm print preview is clean (no nav, footer, share buttons, comments)

- [ ] **Step 3: Commit any final adjustments**

```bash
git add -A
git commit -m "chore: final adjustments after end-to-end verification"
```

# Ancient Pantry — MVP Task Plan

**PRD:** `/tasks/prd-ancient-pantry.md`
**Stack:** Next.js 14 (App Router) · Supabase · Tailwind · Vercel

---

## Critical Path

```
1. Project setup
   → 2. Supabase schema
      → 3. Admin auth
         → 4. Recipe CRUD (admin)
            → 5. Recipe detail page (first user flow)
               → 6. List pages + search/filter
                  → 7. Remaining pages
```

Nothing after step 2 can be properly built or tested without real data in the database.
Nothing after step 3 can be populated without the admin panel.
The recipe detail page is the core product experience — build it first before other public pages.

---

## Phase 1 — Setup

| # | Task | Done |
|---|---|---|
| 1.1 | Initialize Next.js 14 project (App Router, TypeScript, Tailwind) | [ ] |
| 1.2 | Configure Tailwind with custom design tokens (earth-tone palette, typography scale, spacing) | [ ] |
| 1.3 | Install and configure `react-markdown` + `remark-gfm` | [ ] |
| 1.4 | Set up Supabase project, connect to Next.js via `@supabase/ssr` | [ ] |
| 1.5 | Configure `.env.local` with Supabase keys (URL + anon key + service role key) | [ ] |
| 1.6 | Set up project folder structure (`/app`, `/components`, `/lib`, `/types`) | [ ] |
| 1.7 | Configure Vercel project + environment variables | [ ] |

---

## Phase 2 — Core Data Models

| # | Task | Done |
|---|---|---|
| 2.1 | Create Supabase schema: `recipes` table (all fields per PRD) | [ ] |
| 2.2 | Create Supabase schema: `ingredients` table (all fields per PRD) | [ ] |
| 2.3 | Create Supabase schema: `traditions` table | [ ] |
| 2.4 | Create Supabase schema: `howto_articles` table | [ ] |
| 2.5 | Create Supabase schema: `blog_posts` table | [ ] |
| 2.6 | Create Supabase schema: `contact_submissions` table | [ ] |
| 2.7 | Set up Row Level Security (RLS): public read on published rows, authenticated write | [ ] |
| 2.8 | Configure Supabase Storage bucket for images | [ ] |
| 2.9 | Generate TypeScript types from Supabase schema (`supabase gen types`) | [ ] |

---

## Phase 3 — Admin Panel

| # | Task | Done |
|---|---|---|
| 3.1 | Build admin login page (`/admin/login`) with Supabase Auth | [ ] |
| 3.2 | Add server-side auth guard middleware for all `/admin/*` routes | [ ] |
| 3.3 | Build admin layout shell (nav sidebar, logout) | [ ] |
| 3.4 | Build recipe CRUD form (create / edit / publish toggle / delete) | [ ] |
| 3.5 | Build ingredient CRUD form | [ ] |
| 3.6 | Build tradition CRUD form | [ ] |
| 3.7 | Build how-to article CRUD form | [ ] |
| 3.8 | Build blog post CRUD form | [ ] |
| 3.9 | Build contact submissions viewer (read-only list) | [ ] |
| 3.10 | Seed database: 2 recipes + 5 ingredients for development testing | [ ] |

---

## Phase 4 — First User Flow (Recipe Detail Page)

*This is the core product experience. Build it completely before moving to list pages.*

| # | Task | Done |
|---|---|---|
| 4.1 | Build recipe detail page (`/recipes/[slug]`) — all sections per PRD § 4.3 | [x] |
| 4.2 | Implement "Skip to Recipe" button anchoring to `#ingredients` | [x] |
| 4.3 | Implement ingredient linking: match ingredient names in the ingredients list to their slugs in the DB | [x] |
| 4.4 | Render Markdown fields with `react-markdown` | [x] |
| 4.5 | Generate and inject JSON-LD recipe schema (server-side) | [x] |
| 4.6 | Apply Ancient Pantry design system to recipe detail page (typography, spacing, colors) | [x] |

---

## Phase 5 — Core UI Pages

| # | Task | Done |
|---|---|---|
| 5.1 | Build global navigation (desktop + mobile) | [x] |
| 5.2 | Build global footer | [x] |
| 5.3 | Build recipes list page (`/recipes`) — grid layout | [x] |
| 5.4 | Add keyword search + multi-select tag filter to recipes list (client-side) | [x] |
| 5.5 | Build ingredient detail page (`/ingredients/[slug]`) — all sections per PRD § 4.4 | [x] |
| 5.6 | Build ingredients list page (`/ingredients`) with search + filter | [x] |
| 5.7 | Add backlinks: ingredient detail page lists recipes that use that ingredient | [x] |
| 5.8 | Build home page — hero, featured recipes, featured ingredients, CTAs | [x] |
| 5.9 | Build tradition overview pages (`/traditions/[slug]`) | [x] |
| 5.10 | Build traditions index page (`/traditions`) | [x] |
| 5.11 | Build how-to detail page + index (`/how-to/[slug]`, `/how-to`) | [x] |
| 5.12 | Build blog post detail page + index (`/blog/[slug]`, `/blog`) | [x] |
| 5.13 | Build about page (`/about`) | [x] |
| 5.14 | Build contact pages (`/contact`, `/contact/work-with-us`, `/contact/press`, `/contact/message`) | [x] |
| 5.15 | Wire contact form to Supabase `contact_submissions` | [x] |

---

## Phase 6 — Polish & Launch Readiness

| # | Task | Done |
|---|---|---|
| 6.1 | Accessibility audit — heading hierarchy, alt text, keyboard nav, contrast | [x] |
| 6.2 | SEO audit — meta tags, JSON-LD validation (Google Rich Results Test) | [x] |
| 6.3 | Mobile responsiveness pass across all pages | [x] |
| 6.4 | Performance check — Vercel deployment, page load under 3s | [x] |
| 6.5 | Seed full content: 174 recipes + 15 ingredients + 2 traditions | [x] |

---

## Status Legend

| Symbol | Meaning |
|---|---|
| [ ] | Not started |
| [~] | In progress |
| [x] | Complete |
| [!] | Blocked |

---

## Current Task

**Phase 6 complete.** All tasks done. 174 recipes, 15 ingredients, 2 traditions seeded. Ready for launch.

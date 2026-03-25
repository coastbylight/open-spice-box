# PRD: Ancient Pantry — MVP

**Version:** 1.1 (Updated with Ground Truth Specification)
**Date:** 2026-03-16
**Status:** Draft

---

## 1. Introduction / Overview

### What This Is

Ancient Pantry is a curated recipe and ingredient knowledge platform that bridges traditional medicine systems (TCM, Ayurveda, Mediterranean, Middle Eastern, Indigenous, and other historical food traditions) with modern nutrition science.

It is a **content-first, editorially driven web app** — not a recipe generator, not a social platform, not a supplement marketplace.

### The Three Perspectives Framework

Every piece of content on Ancient Pantry is understood through **three lenses simultaneously**:

1. **Traditional medicine knowledge** — how historical traditions have described and used this ingredient or dish
2. **Modern scientific research** — what current research suggests about the ingredient
3. **Culinary tradition** — how cultures have historically cooked with it

This three-perspective framework is the editorial and intellectual backbone of the product. It must be reflected in both the data model and the UI.

### The Problem It Solves

People who cook with intention — health-curious home cooks who own interesting pantry ingredients — have no single resource that gives them:

- High-quality, cookable recipes with cultural depth
- Honest, educational context about *why* ingredients matter (traditional use + modern research + culinary history)

Generic recipe blogs skip the depth. Supplement brands skip the food. Academic sources skip the cooking. Ancient Pantry sits in the intersection.

### Why It Matters

**Core philosophy: Food is medicine.**

Not in a prescriptive or clinical sense — in the older, truer sense that what we eat shapes how we feel, and that many traditional food cultures understood this long before modern research confirmed it.

Ancient Pantry treats recipes as **cultural artifacts, cooking guides, and ingredient education tools** — not just instructions.

### What This Is Not

- Not an AI recipe generator
- Not a calorie or macro tracker
- Not a supplement marketplace
- Not a user-generated content platform
- Not a social network
- Not a biohacking dashboard
- Not a spiritual oracle

---

## 2. Goals

### Primary MVP Goals

1. **Launch a functional, publicly accessible website** with all eight core page types live and navigable
2. **Publish a small curated dataset** — minimum 10 recipes and 20 ingredient pages — with full structured content across all three perspectives
3. **Enable content search and tag filtering** so users can find relevant recipes and ingredients
4. **Support admin content management** via admin-only authentication with simple CRUD forms for all content types
5. **Achieve WCAG 2.2 baseline accessibility** across all pages
6. **Be indexable and SEO-ready** — recipe schema, meta descriptions, semantic HTML on all content pages

### Secondary Goals (Post-MVP)

- Email newsletter capture
- User-facing accounts (save recipes, collections)
- Expanded content library
- Recipe print views
- AI meal planning
- Seasonal cooking guides

---

## 3. User Stories

### Visitor: Health Explorer Cook

A health-curious home cook interested in nutrition, longevity, functional foods — turmeric, adaptogens, fermentation. Wants food to support daily wellbeing without extremes.

- As a visitor, I want to browse recipes filtered by health benefit tags (e.g., "anti-inflammatory," "gut health") so I can find dishes aligned with my health intentions.
- As a visitor, I want to read what an ingredient does from both a traditional medicine perspective AND modern research so I can understand it fully without having to cross-reference elsewhere.
- As a visitor, I want to click an ingredient in a recipe's ingredient list and land on that ingredient's detail page so I can go deeper if I'm curious.
- As a visitor, I want a "Skip to Recipe" button so I can get straight to cooking without reading the full context.

### Visitor: Cultural Explorer Cook

A food-curious cook interested in global cuisines, culinary history, and the anthropology of food.

- As a visitor, I want to explore traditional medicine systems (TCM, Ayurveda) and understand how they approach food so I can cook with more cultural context.
- As a visitor, I want recipe pages to include cultural origin stories so cooking feels like participating in a tradition.
- As a visitor, I want ingredient pages to show which culinary traditions use an ingredient and how so I can understand it in context.

### Admin (Content Manager)

- As an admin, I want to log in securely so I can manage content without exposing the CMS to the public.
- As an admin, I want to create and edit recipes, ingredients, traditions, how-to articles, and blog posts via forms so I don't need to touch the database directly.
- As an admin, I want to publish/unpublish content without deleting it so I can control what's live safely.

---

## 4. Functional Requirements

### 4.1 Navigation & Structure

1. The site must include a persistent top navigation with links to: Home, Recipes, Ingredients, How-To, Traditional Medicine, Blog, About, Contact.
2. The site must be mobile-responsive (mobile-first layout).
3. All pages must have appropriate `<title>` and `<meta description>` tags.

### 4.2 Home Page

4. The home page must display a hero section communicating the "Food is medicine" concept.
5. The home page must display a featured recipes section (minimum 3, manually curated).
6. The home page must display a featured ingredients section (minimum 3).
7. The home page must include clear CTAs guiding users to Recipes and Ingredients.

### 4.3 Recipes

8. The Recipes page must display all published recipes in a grid or list layout.
9. The Recipes page must support keyword search across recipe titles and tags.
10. The Recipes page must support multi-select tag filtering (cuisine, health benefit, dietary type, tradition, difficulty).
11. Filtering and search must update results without a full page reload.
12. Each recipe must have a dedicated detail page at `/recipes/[slug]`.
13. Each recipe detail page must include a "Skip to Recipe" button at the top, anchoring to the `#ingredients` section.
14. Each recipe detail page must include the following sections in order:
    - Title and subtitle
    - Cultural story / headnote (180–320 words)
    - At a Glance (yield, prep, cook, total, difficulty)
    - Ingredients *(with ingredient links — see req. 15)*
    - Method (numbered steps)
    - Key Ingredient Benefits *(see req. 16)*
    - Why This Works
    - Substitutions and Variations
    - Serving Suggestions
    - Storage and Reheating
    - Cultural Notes
    - Source Acknowledgment (if applicable)
15. Ingredients in the **Ingredients section only** must link to their ingredient detail page if that ingredient exists in the database. Each ingredient is linked once — not in method steps or other sections.
16. The **Key Ingredient Benefits** section must present health and wellness context for significant ingredients through both traditional medicine perspectives AND modern research findings. These must be clearly distinguished.
17. Each recipe detail page must include valid JSON-LD recipe schema.

### 4.4 Ingredients

18. The Ingredients page must display all published ingredients in a grid or list layout.
19. The Ingredients page must support keyword search and multi-select tag filtering.
20. Each ingredient must have a dedicated detail page at `/ingredients/[slug]`.
21. Each ingredient detail page must include the following sections:
    - Name and alternative names
    - Image
    - Overview / short description
    - Flavor profile (e.g., earthy, bitter, warming, sharp)
    - Traditional medicine perspectives (by named system — TCM, Ayurveda, etc.)
    - Modern scientific research
    - Culinary use and preparation methods
    - Origin regions
    - Traditional dishes that feature this ingredient
    - Recipes on Ancient Pantry that use this ingredient (backlinks)
    - Functional tags
22. Traditional medicine perspectives must be attributed to the specific system (e.g., "In Traditional Chinese Medicine…"). Claims must not be blended across traditions or presented as universal.
23. Modern research notes must use responsible language: "studies suggest," "research indicates," "has been associated with." No absolute claims (no "cures," "prevents," "guarantees").
24. Culinary application must always be included on every ingredient page.

### 4.5 How-To Page

25. The How-To page must display a list of technique articles organized by cuisine or method category.
26. Each how-to article must have a detail page with full content.

### 4.6 Traditional Medicine Systems Page

27. The Traditional Medicine Systems section must include overview pages for at least TCM and Ayurveda at launch.
28. Each system page must include: name, region, philosophy, core principles as they relate to food, common ingredients, cooking techniques, and representative dishes.
29. Each system page must link to relevant recipes and ingredients tagged with that tradition.

### 4.7 Blog

30. The Blog must display published posts in reverse-chronological order.
31. Each blog post must have a detail page with full content and appropriate meta tags.

### 4.8 Contact

32. Contact must include three sub-pages: Work With Us, Press, Send Us a Message.
33. The Send Us a Message sub-page must include a contact form (name, email, message) that stores submissions in the database.

### 4.9 About

34. The About page must include the brand story and "Food is medicine" philosophy.

### 4.10 Admin Panel

35. Admin access must be protected by Supabase Auth. Admin routes (`/admin/*`) must reject unauthenticated users server-side.
36. The admin panel must support full CRUD for: recipes, ingredients, traditions, how-to articles, blog posts.
37. All content items must have a `published` boolean. Unpublished items are invisible to public users but remain in the database.

### 4.11 Search & Filtering

38. Search must query across title and tags for recipes and ingredients.
39. Tag filters must be multi-select.
40. Filtering and search must update without full page reload (client-side filtering on fetched data for MVP).

---

## 5. Data Models

### Recipe

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| title | text | |
| slug | text | unique, kebab-case |
| subtitle | text | |
| cultural_origin | text | e.g., "Persian," "Sichuan" |
| tradition | text | e.g., "TCM," "Ayurveda" |
| headnote | markdown | 180–320 words |
| yield | text | |
| prep_time | text | |
| cook_time | text | |
| total_time | text | |
| difficulty | enum | Easy / Medium / Involved |
| ingredients | jsonb | structured list with measurements and prep notes |
| instructions | jsonb | numbered steps array |
| key_ingredient_benefits | markdown | traditional + research perspectives |
| why_this_works | markdown | |
| substitutions | markdown | |
| serving_suggestions | markdown | |
| storage_reheating | markdown | |
| cultural_notes | markdown | |
| source_name | text | |
| source_url | text | |
| source_author | text | |
| tags | text[] | cuisine, health, dietary, tradition, difficulty |
| hero_image_url | text | |
| seo_title | text | |
| meta_description | text | ~150 chars |
| published | boolean | default false |
| created_at | timestamp | |
| updated_at | timestamp | |

### Ingredient

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| name | text | |
| slug | text | unique, kebab-case |
| alternative_names | text[] | other names, regional names |
| image_url | text | |
| overview | markdown | short description |
| flavor_profile | text[] | e.g., earthy, bitter, warming |
| cultural_history | markdown | origin and historical context |
| origin_regions | text[] | geographic origins |
| traditional_medicine_perspectives | jsonb | keyed by system name |
| modern_scientific_research | markdown | |
| culinary_uses | markdown | how to cook with it |
| preparation_methods | markdown | how to prep/handle it |
| traditional_dishes | text[] | dish names (not linked) |
| tags | text[] | functional, cuisine, tradition |
| published | boolean | default false |
| created_at | timestamp | |
| updated_at | timestamp | |

### Tradition (Traditional Medicine System)

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| name | text | e.g., "Traditional Chinese Medicine" |
| slug | text | unique, kebab-case |
| region | text | |
| philosophy | markdown | |
| food_principles | markdown | core food/cooking principles |
| common_ingredients | text[] | |
| cooking_techniques | text[] | |
| representative_dishes | text[] | |
| published | boolean | |
| created_at | timestamp | |

### How-To Article

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| title | text | |
| slug | text | |
| category | text | cuisine or method |
| body | markdown | |
| tags | text[] | |
| published | boolean | |
| created_at | timestamp | |

### Blog Post

| Field | Type | Notes |
|---|---|---|
| id | uuid | |
| title | text | |
| slug | text | |
| body | markdown | |
| tags | text[] | |
| published | boolean | |
| created_at | timestamp | |

### Contact Submission

| Field | Type |
|---|---|
| id | uuid |
| name | text |
| email | text |
| message | text |
| created_at | timestamp |

---

## 6. Non-Goals (Out of Scope for MVP)

- AI or automated recipe generation
- User accounts, saved recipes, or collections
- Social features (comments, ratings, shares)
- Email newsletter signup
- Paid content or subscription tiers
- Recipe print views
- Mobile app (web only)
- Multi-language support
- Nutritional / macro tracking
- Ingredient purchase or affiliate links
- User-uploaded content
- External CMS (Contentful, Sanity, etc.)

---

## 7. Design Considerations

### Aesthetic: Modern Apothecary

The visual language is inspired by:
- Vintage herb shops and spice markets
- Botanical illustrations and antique apothecary drawers
- Glass jars of herbs and roots
- Old-world ingredient culture + modern digital clarity

The design should feel: **curated, tactile, warm, and enduring — never loud, never urgent.**

### Color

- No default Tailwind palette (no indigo-500, blue-600)
- Earth tones: warm ochres, deep greens, terracotta, off-whites, deep charcoal
- Derive a brand color and build a consistent scale from it

### Typography

- Heading font: display or serif (Playfair Display, Lora, or similar)
- Body font: clean sans-serif (Inter, DM Sans, or similar)
- Large headings: tight tracking (~`-0.03em`)
- Body: generous line-height (~`1.7`)

### Layout & Depth

- Intentional, consistent spacing tokens
- Layered surface system: base → elevated → floating
- Cards: layered color-tinted shadows, not flat `shadow-md`
- Gradients: subtle, layered radial gradients for depth

### Interactions

- Every clickable element: hover, focus-visible, and active states
- Animate only `transform` and `opacity` — never `transition-all`
- Spring-style easing

### Accessibility (WCAG 2.2 Baseline)

- All images: descriptive `alt` text
- Color contrast: AA standard minimum
- All interactive elements: keyboard-navigable
- Skip navigation link at top of every page
- Logical heading hierarchy (`h1` → `h2` → `h3`) on every page
- Sequential, unambiguous recipe steps

### "Skip to Recipe"

- Present on every recipe detail page
- Positioned prominently at the top
- Anchors to `#ingredients`
- Fully accessible (visible, keyboard-reachable)

---

## 8. Technical Considerations

### Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth (admin-only) |
| Deployment | Vercel |
| Markdown rendering | `react-markdown` + `remark-gfm` |
| Image storage | Supabase Storage |
| Recipe schema | JSON-LD, server-side rendered |

### Architecture Notes

- **App Router + Server Components** for all public content pages (SEO, performance, no client bundle overhead for static content)
- **Admin panel at `/admin/*`** — server-side auth guard on every route
- **API routes** for contact form submission and admin CRUD
- **Client-side filtering** on Recipes/Ingredients pages for MVP (fetch all published records, filter in-browser; upgrade to server-side search if dataset outgrows this)
- **Ingredient linking in recipes**: at render time, check each ingredient name in the recipe's ingredient list against the ingredient slug database; wrap matched names in links

### Environment & Secrets

- `.env.local` for local Supabase keys
- Vercel environment variables for production
- No secrets committed to repo

---

## 9. Success Metrics

### MVP Launch Criteria

- [ ] All 8 page types live and navigable
- [ ] Minimum 10 published recipes, fully structured
- [ ] Minimum 20 published ingredients with images and three-perspective content
- [ ] At least 2 tradition overview pages (TCM, Ayurveda)
- [ ] Search and tag filtering functional on Recipes and Ingredients pages
- [ ] Admin panel operational for all content types
- [ ] Contact form stores submissions
- [ ] Recipe JSON-LD validates in Google Rich Results Test
- [ ] WCAG 2.2 automated audit passes
- [ ] Page load under 3 seconds on standard connection

### Post-Launch Signals (First 30 Days)

- Organic search impressions (Google Search Console)
- Recipe page time-on-page and scroll depth
- Contact form submissions

---

## 10. Open Questions

1. **Contact form delivery** — should submissions be stored in Supabase only (admin reviews in dashboard), or also forwarded to an email address? If email, need a destination address and email provider (Resend recommended).
2. **Image sourcing for launch** — will images for the initial 10 recipes and 20 ingredients be provided, or should we use high-quality stock/placeholder images initially?
3. **Featured content curation** — who selects what appears in the Home Page featured sections? Manual admin selection field, or most-recently-published?
4. **Domain** — is a domain already purchased, or will MVP run on Vercel preview URL?

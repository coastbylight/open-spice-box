# Current State — Ancient Pantry

_Last updated: 2026-03-24_

## What Was Just Completed

**Chinese Seal hero animation** — `app/(public)/page.tsx` + `app/globals.css`: The decorative `ChineseSeal` component on the homepage hero is now animated with layered CSS keyframes. Structure restructured into two rotation groups: outer bezel (lattice + outer rings + cardinal tick marks) rotates CW at 52s; inner mechanism (inner rings + crosshairs) counter-rotates CCW at 84s. Corner accent dots pulse with staggered 0.9s offsets. Center square breathes with opacity+scale on 4.2s loop. Wrapper entry: scale(0.82)+rotate(-6°) → normal on spring easing (0.3s delay), then continuous breathing scale on 8s loop. All animations use `transform`/`filter` only; disabled via `prefers-reduced-motion`.

**Traditional dishes hyperlinked to recipes** — `app/(public)/ingredients/[slug]/page.tsx`: The Traditional Dishes section now links dish names to matching recipes. `findRecipeSlugForDish()` does a three-tier fuzzy match (exact → substring → 2+ word overlap) against all published recipe titles fetched at render time. Matching dishes render as `<Link>` with ochre underline style; non-matching dishes remain plain text. Script `scripts/link-traditional-dishes.mjs` updated 13 ingredients in Supabase that had zero linkable dishes — appended actual recipe titles (e.g., Cumin → "Fennel, Cumin & Coriander Digestive Tea", Ashwagandha → "Ashwagandha Moon Milk", Soy Sauce → "Kolkata Chowmein", Garlic → "Punjabi Chicken Curry"). Audit script at `scripts/audit-traditional-dishes.mjs`.

---

**Ingredient quantities added to recipe method steps** — Python script (`scripts/add-quantities-to-method.py`) processes all recipe markdown files and annotates each ingredient's first mention in the Method section with its quantity in parentheses (e.g., "turmeric (½ tsp)"). 183 recipe files updated. All recipes re-seeded to Supabase via `load-full-recipes.mjs`.

**Ingredient links restored in recipe pages** — `app/(public)/recipes/[slug]/page.tsx`: `IngredientLine` now links ingredient names to their ingredient detail pages with a dotted ochre underline. The page fetches ingredient slug/name pairs in parallel with the recipe query and does a case-insensitive name match.

**Ingredients removed from recipes page** — 146 ingredient markdown files in `full_recipes/ingredients/` were accidentally being loaded into the `recipes` table by `load-full-recipes.mjs`. Fixed by: (1) skipping the `ingredients/` subdirectory in `findMdFiles`, and (2) running `scripts/remove-ingredients-from-recipes.mjs` to delete the 146 spurious recipe records.

---

**Indian ingredients expansion — Batch 2** — 22 ingredient pages added to Supabase and as markdown files in `full_recipes/ingredients/`. Total ingredient count is now **146** (up from 124).
Seed script: `scripts/seed-ingredients-batch2.mjs`

**Legumes & Dals (10):**
```
chickpeas, lentils, toor-dal, chana-dal, urad-dal, moong-dal, masoor-dal,
rajma, black-chickpeas, split-chickpeas
```

**Dairy & Sweeteners (6):**
```
paneer, yogurt, cream, jaggery, palm-sugar, brown-sugar
```
Note: `ghee` already existed; skipped.

**Vegetables (6):**
```
okra, drumsticks, pumpkin, bottle-gourd, ridge-gourd, snake-gourd
```

---

**Indian ingredients expansion — Batch 1** — 26 ingredient pages added to Supabase and as markdown files in `full_recipes/ingredients/`. Total ingredient count went from **98** to **124**.
Seed script: `scripts/seed-new-ingredients-batch.mjs`

**Chinese condiments & oils (4):**
```
peanut-oil, scallion-oil, ginger-scallion-paste, chinese-sausage
```

**Indian spices & ingredients (22):**
```
amchoor, asafoetida, atta, basmati-rice, bay-leaves, beetroot, bitter-gourd,
black-cardamom, black-cumin-seeds, carom-seeds, kasuri-methi, garam-masala,
nigella-seeds, kashmiri-chilies, mace, mustard-seeds, nutmeg, pomegranate-seeds,
red-chili-powder, white-poppy-seeds, green-chilies, curry-leaves
```
Note: green cardamom, black peppercorns, cinnamon, cloves, coriander seeds, cumin seeds, fennel seeds, fenugreek seeds, cassia bark, saffron, star anise, turmeric already existed; skipped.

---

**Chinese pantry ingredient expansion** — Four batches of Chinese/Asian ingredient pages added to Supabase and as markdown files in `full_recipes/ingredients/`. Total ingredient count was **98** (up from 20 originals + 79 Chinese batches below).

### Batch 4 — Root Vegetables, Dried/Preserved Pantry, Tofu, Noodles & Wrappers (24 ingredients)
Seed script: `scripts/seed-chinese-pantry-batch4.mjs`
```
daikon-radish, taro, chinese-yam, water-chestnuts, arrowhead-root,
dried-shiitake-mushrooms, dried-scallops, dried-shrimp, fermented-black-beans,
fermented-tofu, salted-duck-eggs, century-eggs, preserved-mustard-greens,
pickled-vegetables,
tofu, firm-tofu, silken-tofu, bean-curd-sticks, tofu-puffs,
egg-noodles, rice-noodles, glass-noodles, wonton-wrappers, dumpling-wrappers
```
Note: `dried-shiitake-mushrooms` is distinct from the existing `shiitake-mushrooms` (fresh) entry. `preserved-mustard-greens` is distinct from `mustard-greens` (fresh).

---

## Previously Completed

**Chinese pantry ingredient expansion** — Three large batches of Chinese/Asian ingredient pages added to Supabase and as markdown files in `full_recipes/ingredients/`. Total ingredient count is now **95** (up from 20).

### Batch 1 — Chinese Pantry Condiments & Sauces (18 ingredients)
Seed script: `scripts/seed-chinese-pantry.mjs`
```
soy-sauce, light-soy-sauce, dark-soy-sauce, sesame-oil, shaoxing-wine,
oyster-sauce, hoisin-sauce, black-vinegar, rice-vinegar, chili-oil,
chili-garlic-sauce, doubanjiang, ground-bean-sauce, sweet-bean-sauce,
yellow-lantern-chili-sauce, lao-gan-ma-chili-sauce, chinese-sesame-paste, baijiu
```

### Batch 2 — Chinese Spices & Seasonings (12 ingredients)
Seed script: `scripts/seed-chinese-spices.mjs`
Note: `black-pepper` and `cloves` already existed; skipped.
```
five-spice-powder, star-anise, cassia-cinnamon, sichuan-peppercorn,
fennel-seeds, white-pepper, dried-chilies, sichuan-chili-flakes,
chinese-rock-sugar, salt, msg, chicken-bouillon-powder
```

### Batch 3 — Chinese Aromatics & Vegetables (24 ingredients)
Seed script: `scripts/seed-chinese-aromatics-vegetables.mjs`
Note: `ginger` already existed; skipped. Scallions and Green Onions combined into one entry.
```
garlic, scallions, shallots, fresh-chilies, garlic-chives, chinese-celery,
bok-choy, shanghai-baby-bok-choy, chinese-broccoli, water-spinach, snow-peas,
bean-sprouts, lotus-root, bamboo-shoots, baby-corn, chinese-eggplant,
napa-cabbage, mustard-greens, choy-sum, yu-choy,
enoki-mushrooms, shiitake-mushrooms, wood-ear-mushrooms, straw-mushrooms
```

All ingredient files follow the same structure as existing files: frontmatter (name, slug, alternative_names, origin_regions, flavor_profile, traditional_dishes, tags, published) + sections for Overview, Cultural History, Traditional Medicine Perspectives (TCM and/or Ayurveda), Modern Scientific Research, Culinary Uses, Preparation Methods, and Traditional Dishes.

---

## Previously Completed

**Ingredient markdown files created** — All 20 original ingredients that existed only in Supabase now have corresponding markdown files in `full_recipes/ingredients/`:
```
turmeric, ginger, saffron, black-pepper, cardamom, cinnamon, cumin, coriander,
fennel, fenugreek, ashwagandha, holy-basil, miso, moringa, reishi-mushroom,
licorice-root, amla, ghee, cloves, rose
```

---

## Previously Completed

Previously: **Nav logo zoom + sliding terracotta indicator** — two UI improvements to `components/layout/SiteNav.tsx`:
- Logo is now rendered at 2.2× scale inside an `overflow-hidden` container (64px × 260px), cropping whitespace from the PNG so the star anise dot on the "i" is visible
- Desktop nav links now have a sliding terracotta (`terra-500` / `#d4521e`) pill indicator that animates between items on hover, matching the sana.ai interaction pattern. Implemented with a single absolutely-positioned `<span>` whose `left`/`width` are set via `onMouseEnter` and fade out on `onMouseLeave`

**Recipe tag filter — medicinal only** — `components/recipe/RecipeGrid.tsx` now defines a `MEDICINAL_TAGS` allowlist (ayurveda, tcm, anti-inflammatory, gut-health, digestive, immune, healing, adaptogen, tonic, warming, stress, blood-sugar, tridoshic, carminative, bloating, probiotic, respiratory, throat, sleep, bedtime, daily-ritual, digestion). The tag filter bar displays only these tags; all 182 recipes and their full tag data are unaffected.

**Wellness recipe markdown files created** — 9 recipes that existed only in Supabase (seeded via scripts) now have corresponding markdown files in `full_recipes/wellness_recipes/`:
```
full_recipes/wellness_recipes/
├── Ayurveda/
│   ├── golden-milk.md
│   ├── ashwagandha-moon-milk.md
│   ├── fennel-cumin-coriander-digestive-tea.md
│   ├── tulsi-holy-basil-tea.md
│   └── cinnamon-cardamom-oats.md
├── TCM/
│   ├── reishi-mushroom-congee.md
│   └── miso-soup-ginger-reishi.md
└── Cross-Cultural/
    ├── spiced-bone-broth.md
    └── licorice-root-ginger-throat.md
```
Note: Khichdi already had a file at `full_recipes/indian_recipes/Rice recipes/khichdi.md`. Ingredient markdown files do not yet exist (20 ingredients seeded from scripts have no MD source files).

---

Previously: **Visual Redesign** — homepage and global UI redesigned to an editorial Asian aesthetic. Fonts: Cormorant Garamond + Lora. Color: `lacquer` (Chinese red) as primary accent. Nav, footer, homepage hero, recipe cards, philosophy strip, ingredient grid, CTA section all restyled. Files changed: `app/layout.tsx`, `tailwind.config.ts`, `app/globals.css`, `components/layout/SiteNav.tsx`, `components/layout/SiteFooter.tsx`, `app/(public)/page.tsx`

---

Previously: Phase 6 (Polish & Launch) is complete. The app is fully launch-ready: accessibility audited, SEO wired, mobile-responsive, performance-checked, and fully seeded with 182 recipes + 20 ingredients + 2 traditions.

---

## Phase Status

- Phase 1 (Setup) — **COMPLETE**
- Phase 2 (Core Data Models) — **COMPLETE**
- Phase 3 (Admin Panel) — **COMPLETE**
- Phase 4 (Recipe Detail Page) — **COMPLETE**
- Phase 5 (Core UI Pages) — **COMPLETE**
- Phase 6 (Polish & Launch) — **COMPLETE** ✓

---

## Phase 1 — Setup (COMPLETE)

- Next.js 14 App Router + TypeScript + Tailwind initialized
- Custom Tailwind design tokens: `ochre`, `sage`, `terra`, `parchment`, `stone`, `charcoal` color scales
- Fonts: Playfair Display (`font-display`) + Inter (`font-body`) via `next/font/google`, CSS variables wired into Tailwind
- `react-markdown` + `remark-gfm` installed
- Supabase clients: `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/admin.ts`
- Middleware: `middleware.ts` — protects `/admin/*`, redirects unauthenticated to `/admin/login`
- `.env.local` with real Supabase keys
- TypeScript types: `types/recipe.ts`, `types/ingredient.ts`, `types/database.ts`, `types/index.ts`
- Logo: `brand_assets/ancient_pantry_logo.png` copied to `public/logo.png`

---

## Phase 2 — Core Data Models (COMPLETE)

6 tables via SQL migrations in `supabase/migrations/`:
- `001_recipes.sql` — recipes + updated_at trigger
- `002_ingredients.sql`
- `003_traditions.sql`
- `004_howto_articles.sql`
- `005_blog_posts.sql`
- `006_contact_submissions.sql`
- `007_rls_policies.sql` — public read published rows, auth full access, public insert on contact_submissions
- `008_storage.sql` — `images` bucket, public read

All tables verified live in Supabase.

---

## Phase 3 — Admin Panel (COMPLETE)

- Login: `app/admin/login/page.tsx`
- Protected layout: `app/admin/(protected)/layout.tsx` + `components/layout/AdminSidebar.tsx`
- Full CRUD (list + create + edit + delete + publish toggle) for:
  - Recipes: `app/admin/(protected)/recipes/` + `app/api/admin/recipes/[id]/route.ts`
  - Ingredients: `app/admin/(protected)/ingredients/` + `app/api/admin/ingredients/[id]/route.ts`
  - Traditions: `app/admin/(protected)/traditions/` + `app/api/admin/traditions/[id]/route.ts`
  - How-To: `app/admin/(protected)/howto/` + `app/api/admin/howto/[id]/route.ts`
  - Blog: `app/admin/(protected)/blog/` + `app/api/admin/blog/[id]/route.ts`
  - Contact viewer (read-only): `app/admin/(protected)/contact/` + `app/api/admin/contact/route.ts`
- Admin user exists in Supabase Auth

---

## Phase 4 — Recipe Detail Page (COMPLETE)

All 6 tasks done in one pass. Files:

- `app/(public)/recipes/[slug]/page.tsx` — server component
  - Fetches recipe by slug + all published ingredient slugs in parallel
  - Renders all 12 sections per PRD § 4.3: title/subtitle, headnote, at-a-glance, ingredients, method, key ingredient benefits, why this works, substitutions, serving suggestions, storage/reheating, cultural notes, source
  - "Skip to Recipe" — visible link + sr-only keyboard shortcut, both anchor to `#ingredients`
  - Ingredient linking — case-insensitive match of ingredient names to DB slugs, linked with dotted ochre underline
  - JSON-LD recipe schema injected server-side via `<script type="application/ld+json">`
  - `generateMetadata` for SEO title + description + OG
  - 404 via `notFound()` if slug not found or not published
- `components/ui/MarkdownRenderer.tsx` — client component, `react-markdown` + `remark-gfm`, styled prose with Tailwind

---

## Phase 5 — Core UI Pages (COMPLETE)

### Route Group Structure

All public pages live in `app/(public)/` route group with a shared layout:
- `app/(public)/layout.tsx` — wraps all public pages with `<SiteNav />` + `<SiteFooter />`
- Admin routes are unaffected (separate nested layout)

### Shared Layout Components

- `components/layout/SiteNav.tsx` — client component
  - Sticky top nav, parchment background with blur + shadow
  - Logo (`public/logo.png`) via `next/image`
  - Desktop: horizontal links with active state (ochre underline)
  - Mobile: animated hamburger → slide-down menu with backdrop
  - Closes on route change, prevents body scroll when open
  - Full keyboard nav + focus-visible rings + Escape key + focus trap
- `components/layout/SiteFooter.tsx` — server component
  - Dark charcoal-950 background
  - Brand logo + tagline column + two link columns (Explore, Company)
  - "Food is medicine." tagline in bottom bar

### Public Pages Built

| Route | File | Notes |
|---|---|---|
| `/` | `app/(public)/page.tsx` | Hero (dark, gradient), featured recipes (3), philosophy strip, featured ingredients (6), CTA section |
| `/recipes` | `app/(public)/recipes/page.tsx` | Grid via `RecipeGrid` client component |
| `/recipes/[slug]` | `app/(public)/recipes/[slug]/page.tsx` | Full recipe detail (Phase 4) |
| `/ingredients` | `app/(public)/ingredients/page.tsx` | Grid via `IngredientGrid` client component |
| `/ingredients/[slug]` | `app/(public)/ingredients/[slug]/page.tsx` | All sections per PRD § 4.4 + backlinks |
| `/traditions` | `app/(public)/traditions/page.tsx` | List with region + philosophy preview |
| `/traditions/[slug]` | `app/(public)/traditions/[slug]/page.tsx` | Detail: principles, ingredients, techniques, dishes, linked recipes |
| `/how-to` | `app/(public)/how-to/page.tsx` | List grouped by category |
| `/how-to/[slug]` | `app/(public)/how-to/[slug]/page.tsx` | Article detail |
| `/blog` | `app/(public)/blog/page.tsx` | Reverse-chron list with dates + tags |
| `/blog/[slug]` | `app/(public)/blog/[slug]/page.tsx` | Post detail |
| `/about` | `app/(public)/about/page.tsx` | Brand story + "Food is medicine" philosophy |
| `/contact` | `app/(public)/contact/page.tsx` | Hub: links to 3 sub-pages |
| `/contact/work-with-us` | `app/(public)/contact/work-with-us/page.tsx` | Partnerships page |
| `/contact/press` | `app/(public)/contact/press/page.tsx` | Press inquiries |
| `/contact/message` | `app/(public)/contact/message/page.tsx` | Contact form (uses `ContactForm`) |

### Client Components Built

- `components/recipe/RecipeGrid.tsx` — recipe list with keyword search + multi-select tag filter (client-side)
- `components/ingredient/IngredientGrid.tsx` — ingredient list with keyword search + multi-select tag filter
- `components/forms/ContactForm.tsx` — controlled form, POSTs to `/api/contact`, shows success/error state

### API Routes

- `app/api/contact/route.ts` — public POST endpoint, validates input, inserts to `contact_submissions`

---

## Phase 6 — Polish & Launch (COMPLETE)

### 6.1 Accessibility
- Global skip-to-content link in `app/(public)/layout.tsx`
- Mobile nav: Escape key close, focus trap, focus restored to hamburger on close
- Footer column headings changed from `<p>` to `<h2>`
- Contact form: focus moved to success message on submit (`role="status"`, `tabIndex={-1}`)
- All decorative arrows/dashes/emojis marked `aria-hidden="true"`
- External source links: `<span className="sr-only"> (opens in new tab)</span>` added

### 6.2 SEO
- `openGraph` metadata added to all 16 public pages
- Default `twitter` card metadata added to root `app/layout.tsx`
- JSON-LD already present on recipe detail page from Phase 4

### 6.3 Mobile Responsiveness
- Full pass across all pages confirmed — responsive at all breakpoints

### 6.4 Performance
- All `<img>` tags replaced with `next/image` `<Image>` across all components and pages
- `next.config.mjs` updated with Supabase Storage remote patterns for `next/image`
- Build verified clean with no warnings

### 6.5 Content Seeding
- **172 regional recipes** loaded from `full_recipes/indian_recipes/` (15 regional collections: Andhra, Awadhi, Bengali, Dum, Goan, Indian Sweets, Kashmiri, Kerala, Maharashtrian, Parsi, Punjabi, Rajasthani, Rice, Tamil Nadu, Tandoor)
- **10 wellness/functional recipes** seeded via scripts: Khichdi, Golden Milk, Spiced Bone Broth, Miso Soup with Ginger and Reishi, Ashwagandha Moon Milk, Fennel/Cumin/Coriander Digestive Tea, Reishi Mushroom Congee, Tulsi Holy Basil Tea, Cinnamon Cardamom Oats, Licorice Root & Ginger Throat Soother. All 9 (except Khichdi which had an existing file) now also have markdown files in `full_recipes/wellness_recipes/`
- **182 total recipes** in Supabase, all published
- **20 ingredients** seeded: Turmeric, Ginger, Saffron, Black Pepper, Cardamom (from `seed.mjs`) + Cinnamon, Cumin, Coriander, Fennel, Fenugreek, Ashwagandha, Holy Basil, Miso, Moringa, Reishi Mushroom, Licorice Root, Amla, Ghee, Cloves, Rose (from `seed-full-content.mjs`). Markdown source files now exist for all 20 in `full_recipes/ingredients/`.
- **2 traditions** seeded: Ayurveda, Traditional Chinese Medicine
- Seed scripts: `scripts/load-full-recipes.mjs` (regional recipes from markdown), `scripts/seed.mjs` (5 ingredients + 2 recipes), `scripts/seed-full-content.mjs` (15 ingredients + 8 recipes + 2 traditions)
- All content published (`published: true`)

---

## Key Technical Decisions

- `app/(public)/` route group shares nav/footer without affecting URLs or admin routes
- Fonts via `next/font/google` → CSS variables (`--font-playfair`, `--font-inter`) → Tailwind `font-display` / `font-body`
- `charcoal-*` used for dark admin UI (our custom `stone` is warm brown, not near-black)
- Client-side filtering for MVP (fetch all published, filter in-browser)
- Ingredient linking: case-insensitive match of ingredient names at render time; linked only in the ingredients list, not in method steps
- JSON-LD: server-side injected on recipe detail page
- `next/image` with Supabase remote patterns configured in `next.config.mjs`
- No Turbopack (webpack for stability)
- Recipe seeding: full markdown text stored in `ingredient` field (amount/unit/prep_note left null) for simplicity and correct display

---

## Running the App

```bash
cd "/Users/pih5/Documents/Projects/Claude Projects/ancient pantry"
npm run dev
# → http://localhost:3000
# → http://localhost:3000/admin/login
```

## Supabase Project

- Project ID: cttehkkjlcyfovsxbpcz
- URL: https://cttehkkjlcyfovsxbpcz.supabase.co
- Keys in: `.env.local` (not committed to git)

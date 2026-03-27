# Current State — Ancient Pantry

_Last updated: 2026-03-26_

## What Was Just Completed

**108 new recipes + 36 blog posts + content infrastructure (2026-03-26)**

### New Recipes (108 total, bringing site total to 450)
- **38 Chinese recipes** in `full_recipes/chinese recipes/`: twice-cooked-pork, dry-fried-green-beans, tomato-egg-stir-fry, stir-fried-napa-cabbage, stir-fried-shrimp-eggs, red-braised-pork-belly, red-braised-fish, soy-braised-eggs, braised-tofu-mushrooms, shanghai-braised-gluten, zhajiangmian, scallion-oil-noodles, hot-dry-noodles, beef-chow-fun, shrimp-fried-rice, yangzhou-fried-rice, sticky-rice-chinese-sausage, sheng-jian-bao, guo-tie, beef-onion-dumplings, chive-pancakes, scallion-pancakes, beggars-chicken, sichuan-mouthwatering-chicken, three-cup-chicken, steamed-fish-black-bean-sauce, cantonese-steamed-shrimp-garlic, salt-pepper-shrimp, garlic-bok-choy, chinese-eggplant-garlic-sauce, stir-fried-tofu-chili-bean-paste, wood-ear-mushroom-salad, dang-gui-chicken-soup, snow-fungus-dessert-soup, jianbing, chinese-egg-tarts, sesame-balls, chongqing-spicy-chicken
- **11 Indian recipes**: chicken-chettinad, fish-moilee, mutton-keema, egg-curry, kadhi-pakora, paneer-bhurji, chana-masala, bhindi-masala, tamarind-rice, lassi, masala-chai
- **13 Japanese recipes**: okonomiyaki, takoyaki, karaage, tonkatsu, katsudon, oyakodon, gyudon, tamagoyaki, agedashi-tofu, nasu-dengaku, nikuman, curry-udon, matcha-tiramisu
- **21 Korean recipes**: tteokbokki, gimbap, kimchijeon, pajeon, jjajangmyeon, jjamppong, budae-jjigae, gamjatang, bossam, gochujang-chicken, yangnyeom-chicken, mul-naengmyeon, bibim-naengmyeon, dak-kalguksu, kongguksu, hobak-jeon, gamja-jorim, sigeumchi-namul, kongnamul-muchim, eomuk-soup, hotteok
- **5 Malaysian recipes**: char-kway-teow, hokkien-mee, roti-canai, nasi-kerabu, curry-puff
- **9 Thai recipes**: pad-prik-king, gai-pad-med-mamuang, khao-kha-moo, pad-kra-pao-moo, yum-woon-sen, thai-iced-tea, thai-iced-coffee, moo-hong, khao-moo-daeng
- **11 Vietnamese recipes**: banh-mi, com-tam, bun-thit-nuong, banh-cuon, cha-gio, thit-nuong, ca-kho-to, thit-kho-tau, bo-luc-lac, ca-phe-trung, chanh-muoi

### Blog System (36 published posts across 8 topic clusters)
All posts written following Ancient Pantry blog skill, voice skill, and SEO best practices. Published to Supabase with staggered Tue/Thu schedule from Jan 6 to May 7, 2026.

**Cluster 1: Gut Health & Digestion (5 posts)**
- what-to-eat-stomach-upset, best-foods-bloating-gas, foods-help-constipation-naturally, best-spices-digestion, how-to-reset-gut-naturally

**Cluster 2: Anti-Inflammatory (5 posts)**
- anti-inflammatory-foods-joint-pain, anti-inflammatory-foods-gut-health, anti-inflammatory-foods-skin, anti-inflammatory-spices-cooking, how-to-start-anti-inflammatory-diet

**Cluster 3: Stress & Nervous System (6 posts, incl. existing vagus nerve pillar)**
- vagus-nerve-stimulation-ancient-modern (existing), foods-that-calm-nervous-system, what-to-eat-anxiety-relief, foods-that-reduce-cortisol, adaptogenic-herbs-stress-anxiety, evening-routine-calm-anxiety

**Cluster 4: Cultural Health Practices (5 posts)**
- why-chinese-drink-hot-water, why-indian-food-uses-spices, hot-cold-foods-chinese-medicine, ayurveda-food-combining-rules, ayurveda-vs-tcm-food-philosophy

**Cluster 5: Spice-Based Functional Cooking (5 posts)**
- how-to-cook-with-turmeric-every-day, what-is-tadka-how-to-make, warming-spices-winter-cooking, whole-spices-vs-ground, how-to-build-spice-cabinet

**Cluster 6: "What to Eat When..." Condition-Based (5 posts)**
- what-to-eat-when-sick-no-appetite, what-to-eat-after-food-poisoning, what-to-eat-cold-flu, what-to-eat-tired-all-the-time, what-to-eat-after-antibiotics

**Cluster 7: Sleep & Nighttime Foods (5 posts)**
- foods-that-help-you-sleep, what-to-eat-before-bed-sleep, how-to-stop-waking-up-3am, best-teas-for-sleep, warm-milk-before-bed-does-it-work

**Blog SEO stats:**
- 36 posts linking to 55+ unique ingredient pages and 40+ unique recipe pages
- Both tradition pages (Ayurveda, TCM) linked from all 36 posts
- Dense cross-cluster internal linking creating topical authority web
- Each post: YAML metadata, 4-8 internal links per 1,000 words, FAQ section for featured snippets

### Content Infrastructure
- `scripts/push-blog-posts.mjs` — Pushes all blog markdown files to Supabase blog_posts table (upsert by slug)
- `scripts/set-blog-dates.mjs` — Sets staggered Tue/Thu publish dates across all posts
- `scripts/generate-recipe-index.mjs` — Generates `full_recipes/RECIPE-INDEX.md` with all 450 recipes organized by cuisine
- PostToolUse hook in `.claude/settings.local.json` — Auto-regenerates recipe index when any recipe file is written/edited
- `blog_posts/BLOG-IDEAS.md` — Future blog post concepts (13 ideas)

### Recipe Skill & Data Fixes
- Recipe folder names changed from underscores to spaces (`chinese_recipes` → `chinese recipes`)
- `cultural_origin` field now shows "[Country] Cuisine" (e.g. "Chinese Cuisine", "Indian Cuisine")
- `tradition` field only shows meaningful sub-traditions (Punjabi, Bengali, Kerala, etc.) or null to prevent duplication
- Title field quotation marks removed from all 116 affected recipe files
- Recipe skill updated: no quotes in titles, spaces in folder names, cuisine field must be country-level only
- Blog skill updated: folder name references corrected, recipe count updated to 450+

---

**Recipe page features + homepage category links (2026-03-26)** — Seven features added based on competitor analysis (RecipeTinEats, Woks of Life, Food52):

### New Components
- `components/recipe/PrintButton.tsx` — Client component, calls `window.print()` with printer icon
- `components/recipe/SocialShareButtons.tsx` — Client component, share to Pinterest, Facebook, X, Email, Copy Link with brand-colored hover states and "Copied!" feedback
- `components/recipe/RelatedRecipes.tsx` — Server component, 4-card grid of related recipes scored by shared tags (+2 each), same tradition (+3), same cultural origin (+2)
- `components/ui/Breadcrumbs.tsx` — Reusable breadcrumb nav with JSON-LD `BreadcrumbList` schema for SEO

### Recipe Detail Page Updates (`app/(public)/recipes/[slug]/page.tsx`)
- **Jump to Recipe** — Restyled from plain text link to prominent ochre button with down-arrow icon
- **Print button** — Next to Jump to Recipe, triggers `window.print()`
- **Social sharing** — Row of icon buttons below action bar (Pinterest, Facebook, X, Email, Copy Link)
- **Breadcrumbs** — Home / Recipes / {Title} above recipe header with JSON-LD
- **Related recipes** — "You Might Also Like" section before ratings/comments, fetches top 4 scored matches
- **Serving scaler** — +/- buttons next to Ingredients heading, steps through 0.5x/1x/1.5x/2x/3x/4x, scales all ingredient amounts, works alongside metric/imperial toggle, shows scaled yield text
- `data-no-print` attributes on hero image, action bar, share buttons, related recipes, and ratings/comments sections

### RecipeIngredients Updates (`components/recipe/RecipeIngredients.tsx`)
- Added `recipeYield` prop and `scale` state
- `ServingScaler` sub-component with +/- circular buttons, yield display, and Reset link
- `IngredientLine` now scales amounts by multiplier before passing to `convertIngredient`
- Imports `parseAmount` from `lib/unit-conversion.ts` for scaling calculations

### Homepage Updates (`app/(public)/page.tsx`)
- **Browse by Category** section added between Featured Recipes and Philosophy strip
- Two groups: "By Health Benefit" (sage-colored pills, top 8 health tags by frequency) and "By Origin" (ochre-colored pills, all distinct cultural origins)
- Pills link to `/recipes?tag=X` or `/recipes?origin=X`

### Recipe Filtering Updates
- `components/recipe/RecipeGrid.tsx` — Added `initialTag` and `initialOrigin` props, `cultural_origin` matching in filter logic
- `app/(public)/recipes/page.tsx` — Accepts `searchParams` (`tag`, `origin`), passes to RecipeGrid

### Print Styles (`app/globals.css`)
- `html { scroll-behavior: smooth; }` for smooth anchor scrolling
- `@media print` block: hides nav/footer/`[data-no-print]`, resets backgrounds, removes shadows, prevents page-break-inside on images/sections, shows URLs for external links

### Database Update
- Fixed `tradition` field values: replaced underscored values (`chinese_recipes`, `japanese_recipes`, `korean_recipes`, `thai_recipes`, `vietnamese_recipes`, `indonesian_recipes`, `malaysian_recipes`) with clean names (`Chinese Recipes`, `Japanese Recipes`, etc.) across 158 recipes

### Market Research
- `market research/market research.md` — Full competitor analysis comparing Ancient Pantry against RecipeTinEats, Woks of Life, and Food52. Feature comparison matrix, gap analysis, unique differentiators, and strategic recommendations.
- `supplemental_materials/suggested changes.md` — Prioritized launch readiness recommendations: SEO essentials, legal requirements, technical gaps, content needs, and implementation timeline.

---

**User account system with ratings, comments, and saved recipes** — Full auth and social features added to the site.

### Auth System
- Email/password signup and login at `/auth/signup` and `/auth/login`
- Google OAuth integration (requires Google Cloud credentials + Supabase provider config)
- Password reset flow: `/auth/reset-password` and `/auth/update-password`
- OAuth callback handler at `/auth/callback/route.ts`
- Seamless UX: `redirectTo` param preserved across all auth flows so users return to where they were
- Middleware updated to protect `/profile/*` routes (redirects to login with return URL)

### User Profiles (Rich)
- `/profile` — View profile: display name, avatar, bio (optional), cooking skill, dietary preferences, cuisine interests, favorite ingredients
- `/profile/settings` — Edit all profile fields, toggle collection visibility
- `/profile/collections` — Manage saved recipe collections
- Role system: `user`, `verified_creator`, `admin` (future-proofed for user-submitted recipes)
- `created_by` column added to recipes table for future recipe attribution

### Recipe Ratings & Comments
- Hybrid rating system: standalone star rating (1-5) OR rating attached to a comment
- Split layout on desktop (rating summary + form on left, comments on right), stacks on mobile
- Rating histogram showing distribution across 5 star levels
- Denormalized `average_rating` and `rating_count` on recipes table, auto-updated by DB triggers
- Single-level comment replies (top-level comments can have replies, replies cannot have replies)
- Comment flagging system: users can flag inappropriate comments, flags tracked per-user to prevent duplicates
- Auto-publish with flagging (comments go live immediately, flagged ones surface in admin)
- Edit/delete own comments, admins can delete any comment
- Sort comments by newest, oldest, or highest rated

### Saved Recipes & Collections
- Bookmark/save button on every recipe page (heart icon with pulse animation)
- Default "Saved" collection auto-created on signup
- User-created collections with add/remove recipes
- Per-collection public/private toggle + master `public_collections` toggle on profile
- Long-press/right-click on save button opens collection chooser modal

### Navigation Auth
- `UserMenu` component in desktop nav: avatar dropdown with profile/collections/settings/sign-out
- `MobileUserMenu` in mobile nav drawer
- Sign In button styled as terra (terracotta) CTA button
- Avatar uses deterministic brand colors (sage/terra/ochre/lacquer/charcoal) based on name initial

### Database (Migration 010)
- 6 new tables: `profiles`, `recipe_ratings`, `recipe_comments`, `user_collections`, `collection_recipes`, `comment_flags`
- `handle_new_user()` trigger on `auth.users` auto-creates profile + default "Saved" collection
- `update_recipe_rating_aggregates()` trigger recalculates average from both standalone ratings and comment ratings
- Full RLS policies: public read on profiles/ratings/comments, users manage their own data, admins can delete any comment and read all flags
- Migration applied to live Supabase DB

### Files Created
- `supabase/migrations/010_user_accounts.sql`
- `app/auth/callback/route.ts`
- `app/(public)/auth/login/page.tsx`, `signup/page.tsx`, `reset-password/page.tsx`, `update-password/page.tsx`
- `app/(public)/profile/page.tsx`, `settings/page.tsx`, `collections/page.tsx`
- `components/layout/UserMenu.tsx`
- `components/recipe/StarRating.tsx`, `RatingSummary.tsx`, `CommentForm.tsx`, `CommentList.tsx`, `RecipeRatingComments.tsx`
- `components/recipe/SaveRecipeButton.tsx`, `AddToCollectionModal.tsx`

### Files Modified
- `middleware.ts` — added `/profile` route protection
- `types/recipe.ts` — added `average_rating`, `rating_count`, `created_by` fields
- `app/(public)/recipes/[slug]/page.tsx` — added SaveRecipeButton + RecipeRatingComments section at bottom
- `components/layout/SiteNav.tsx` — integrated UserMenu, adjusted nav spacing for 8 links + auth

---

**92 Thai, Vietnamese, Malaysian, Indonesian, and Japanese recipes added** — Bringing total recipe count from 250 to **342**.

- **25 Thai recipes** in `full_recipes/thai_recipes/`: tom-yum-goong, tom-kha-gai, green-curry, red-curry, massaman-curry, panang-curry, pad-thai, pad-see-ew, khao-soi, som-tam, larb, yam-nua, gaeng-som, jungle-curry, pad-krapow, pla-nueng-manao, khao-tom, jok-thai-rice-congee, mango-sticky-rice, turmeric-fried-fish, gai-yang, sai-krok-isan, gaeng-liang, nam-prik, boat-noodles
- **20 Vietnamese recipes** in `full_recipes/vietnamese_recipes/`: pho-bo, pho-ga, bun-bo-hue, hu-tieu, canh-ga-gung, canh-chua, bun-rieu, chao-ga, chao-long, banh-xeo, goi-cuon, bun-cha, ga-kho-gung, thit-kho-trung, ga-nuong-xa, bo-kho, goi-ngo-sen, canh-kho-qua, cha-ca-la-vong, bun-thang
- **15 Malaysian recipes** in `full_recipes/malaysian_recipes/`: nasi-lemak, chicken-rendang, laksa, bak-kut-teh, hainanese-chicken-rice, ayam-percik, satay, soto-ayam, mee-rebus, roti-jala, gulai-ayam, sayur-lodeh, ikan-bakar, sup-kambing, beef-rendang
- **12 Indonesian recipes** in `full_recipes/indonesian_recipes/`: soto-betawi, nasi-uduk, gado-gado, ayam-bakar, ayam-goreng-lengkuas, pepes-ikan, sayur-asem, rawon, bubur-ayam, tempeh-goreng, opor-ayam, wedang-jahe
- **20 Japanese recipes** in `full_recipes/japanese_recipes/`: miso-shiru, tonkotsu-ramen, shoyu-ramen, udon, soba, oden, nabe, sukiyaki, shabu-shabu, kare-raisu, nikujaga, shogayaki, saba-shioyaki, teriyaki-chicken, chawanmushi, tamago-kake-gohan, onigiri, takikomi-gohan, hijiki-salad, kinpira-gobo
- All recipes follow Ancient Pantry format with country tags (thai, vietnamese, malaysian, indonesian, japanese)
- All 342 recipes uploaded to Supabase via `scripts/load-full-recipes.mjs`

**Vagus nerve blog post** — `blog_posts/vagus-nerve-stimulation-ancient-modern.md`: ~2,800 word article on vagus nerve stimulation covering modern clinical methods (FDA-approved VNS, gammaCore, taVNS), non-device methods (cold exposure, slow breathing, humming), TCM practices (auricular acupuncture, ST36, PC6, Qi Gong), Ayurvedic practices (Nadi Shodhana, Bhramari, Ujjayi, Abhyanga, yoga), and the food connection (fermented foods, omega-3s, L. rhamnosus vagotomy study, anti-inflammatory foods). 18 internal links to ingredients, recipes, and tradition pages. Uploaded to Supabase `blog_posts` table.

---

**66 Chinese and Korean recipes added** — 41 Chinese and 25 Korean recipe files created in `full_recipes/chinese_recipes/` and `full_recipes/korean_recipes/`, bringing total recipe count to **250**.

- Each recipe sourced from 3 authentic URLs per dish (first URL as main pillar, unique elements from sources 2 and 3 merged where they improved the recipe)
- All recipes follow the Ancient Pantry format: YAML frontmatter, headnote (180-320 words), At a Glance table, Ingredients, Method with sensory cues, Why This Works, Ingredient & Health Notes (research vs tradition clearly distinguished), Substitutions, Serving Suggestions, Storage, Source Acknowledgment
- SEO metadata (seo_title, meta_description, hero_image_prompt) on every recipe
- At least 4 internal links per recipe using `[Name](/recipes/slug)` format
- Chinese recipes organized into soups (7), noodles (6), dim sum (6), roast/BBQ (6), stir-fries & misc (16)
- Korean recipes organized into soups/jjigae (10), mains (8), kimchi/sides (3+), porridges (2), teas (2)

**Cuisine origin tags added to all recipes** — Added missing `chinese` tag to 21 Chinese recipe files, `korean` tag to 13 Korean recipe files, and `indian` tag to 145 Indian recipe files. Also fixed missing regional tags: `andhra` (3 files), `maharashtrian` (1), `punjabi` (1), `rice` (2), `comfort food` (20). Both bracket (`tags: [...]`) and non-bracket (`tags: ...`) YAML formats handled.

**Ingredient parser upgraded** — `scripts/load-full-recipes.mjs` `parseIngredients()` rewritten to properly extract structured `amount`, `unit`, `ingredient`, and `prep_note` fields from ingredient lines. Previous parser stored everything as raw text with `amount: null` and `unit: null`, which meant the metric/imperial toggle had no effect. New parser recognizes all metric units (g, kg, ml, L), imperial units (tsp, tbsp, cup, oz, lb), count-based units (clove, sprig, piece), and normalizes long-form units to abbreviations (e.g. "tablespoon" → "tbsp").

**All new recipe ingredients converted to metric** — All 66 Chinese/Korean recipe files updated to use metric measurements (g, ml, kg, L) in the Ingredients section. Proteins in grams, liquids in ml/L, spices in grams, dry goods in grams, count items kept as counts. Non-ingredient sections (Method, Substitutions, etc.) retain imperial references. The frontend `unit-conversion.ts` converter handles displaying imperial (tsp/tbsp/cup/oz/lb) when the toggle is set to oz.

**Method step bold markers removed** — Removed `**bold**` wrapping from the opening phrase of each numbered method step across all 250 recipe files (Chinese, Korean, Indian, wellness). Recipe skill updated to explicitly prohibit bolding step openings.

**Method step numbers restyled** — `app/(public)/recipes/[slug]/page.tsx`: Method section step numbers changed from `text-parchment-300` to `text-charcoal-800` (`#47403b`, Charcoal Brown from brand palette) across all recipes.

**Recipe skill updated** — `skills/ancient-pantry-recipe:SKILL.md` updated with two new standards:
  1. Ingredient Measurement Standard: metric stored (g/ml/kg/L), imperial displayed via toggle. Proteins use g, spices use g, liquids use ml, dry goods use g. Non-ingredient sections always use imperial.
  2. Method formatting: no bold wrapping on step openings.

---

**Site-wide design polish — purposeful details invoking ancient knowledge**

- **Button system** (`app/globals.css`) — New `.btn-primary` and `.btn-secondary` CSS classes replace all inline button Tailwind strings across the site. Primary: warm lacquer gradient (`#d64530 → #a42619`), inset bevel shadow, outer red glow, shimmer sweep on hover, lift + shadow deepen on hover, press-down on active. Secondary: white with warm border, lifts to parchment-50 on hover, border tints ochre.

- **Global polish** (`app/globals.css`) — `::selection` uses a subtle lacquer tint. 4px branded scrollbar with lacquer-red thumb.

- **Homepage** (`app/(public)/page.tsx`):
  - Hero badge → editorial rule-lines flanking spaced uppercase text (removed pill shape)
  - Decorative rules → gradient-fade lines with flanking vertical bars around the diamond ornament
  - Section eyebrows ("From the kitchen", "In the pantry") → small lacquer rule before each label
  - Recipe cards → lift on hover (`-translate-y-1`) with deeper warm shadow
  - Category tags → `font-medium` + inner shadow for stamp/seal feel
  - Philosophy strip → SVG grain texture overlay + layered warm glow
  - CTA section → buttons updated to new system

- **Navigation** (`components/layout/SiteNav.tsx`) — Letter spacing tightened to `0.05em` on nav links.

- **Footer** (`components/layout/SiteFooter.tsx`) — Footer links slide `0.5px` right on hover. Decorative divider → gradient fade lines + diamond cluster with flanking vertical bars. "Food is medicine." tagline slightly brighter.

- **Recipe & Ingredient grids** (`components/recipe/RecipeGrid.tsx`, `components/ingredient/IngredientGrid.tsx`) — Same lift-hover (`-translate-y-1`, `transition-[transform,box-shadow]`) applied to all cards.

---

**Metric / Imperial unit toggle on recipe pages** — Every recipe detail page now has a **g / oz pill toggle** inline with the Ingredients heading. Imperial is the default.

- **Data migration** — All 183 recipes (2,154 ingredients) had their ingredient data stored as flat strings (`"7 g coriander powder (about 2 teaspoons)"`) with `amount` and `unit` both null. `scripts/migrate-ingredients.mjs` parsed every string into structured fields: `amount`, `unit`, `ingredient`, `prep_note`, `imperial_amount`, `imperial_unit`. Parenthetical hints like `(about ¾ tsp)` or `(about 3 medium onions)` were extracted into `imperial_amount`/`imperial_unit`.

- **`types/recipe.ts`** — `RecipeIngredient` updated: `amount` is now `string | null` (was `string`), and two optional fields added: `imperial_amount?: string | null`, `imperial_unit?: string | null`.

- **`lib/unit-conversion.ts`** — Conversion library with accurate USDA-sourced density table. Rules by category:
  - **Spices / powders / seeds** → tsp / tbsp (density table, 35+ entries). Fixes incorrect hints in DB (e.g. 7g coriander powder: was "2 tsp", now correctly calculates **3¾ tsp** at 1.8 g/tsp)
  - **Fresh aromatics** (ginger paste, garlic paste, fresh ginger, fresh garlic, green chillies, fresh coriander, mint, curry leaves) → tsp / tbsp / cup via density
  - **Liquids (ml / L)** → tsp / tbsp / fl oz / cup / qt depending on amount
  - **Proteins** (meat, fish, seafood, paneer) → oz / lb
  - **Vegetables** → oz / lb + `"(about N items)"` count note using a weight-per-item table (potato ~150g, onion ~150g, tomato ~120g, cauliflower ~550g, etc.). Uses stored parenthetical count hint when available.
  - **Everything else** → stored imperial volume hint if present, else oz / lb
  - **oz → lb threshold**: anything over 8 oz (½ lb) displays in lb

- **`components/recipe/RecipeIngredients.tsx`** — New client component replacing the server-rendered ingredient list. Holds toggle state (default `'imperial'`). Passes `imperial_amount`/`imperial_unit` from DB through to conversion logic. Renders `countNote` (e.g. "about 2–3 potatoes") after the ingredient name in imperial mode.

- **`app/(public)/recipes/[slug]/page.tsx`** — Updated to import and render `RecipeIngredients` instead of the old inline `IngredientLine` component.

---

**Ingredients page — Chinese medicine cabinet UI** — `components/ingredient/IngredientCabinet.tsx` replaces `IngredientGrid` on the ingredients page. Every ingredient is a drawer in a Chinese medicine cabinet (百子柜):

- **Cabinet frame**: Deep red-black lacquered rosewood (`#1C0504`–`#110302`) with repeating vertical grain lines and two decorative gold inlay strips on the crown and base rails. Offset box-shadow gives a thick carved-wood presence.
- **Drawer faces**: Per-drawer CSS rosewood grain (hue 8–15°, saturation 62–70%, layered repeating-linear-gradient) with inset carved panel shadow and bottom edge shadow. Each drawer has slight hue/lightness variation so no two look identical.
- **Label plate**: Parchment-50/parchment-100 gradient background (matching site palette) with a layered ochre metal frame — `ochre-800` outer line → `ochre-400` gold band → `ochre-600` inner line. Inner engraved border in `ochre-500`. Ingredient name in `var(--font-cormorant)` at 13px/600 weight in `charcoal-900` — legible and on-brand.
- **Brass ring**: Perfect circle SVG pull using site ochre palette (`ochre-200` through `ochre-900`). Diagonal + horizontal gradient layers simulate cast-brass volume. Specular arc at top-left. Cast shadow circle offset below. Boss plate with rivet dots at top.
- **Hover**: Drawer slides forward (`translateZ 18px`, `rotateX -0.8deg`) with spring easing; ring lifts 6px; shadow deepens; ochre glow rim appears inside drawer edge.
- **Click/exit**: Drawer pulls dramatically forward (`translateZ 70px`) before navigating to `/ingredients/[slug]`.
- **Accessibility**: `prefers-reduced-motion` disables all transforms; `aria-label="View [name]"` on every drawer; focus-visible ring in `ochre-400`.
- Search and tag filters above the cabinet are unchanged.

**Ingredient tag filter — medical tags only** — `app/(public)/ingredients/page.tsx`: the tag filter bar on the ingredients listing page now only shows tags with medical/health meanings. A `MEDICAL_TAGS` allowlist filters `allTags` before passing to `IngredientCabinet`. Kept: `absorptive`, `adaptogenic`, `anti-inflammatory`, `anti-nausea`, `antimicrobial`, `antioxidant`, `beta-glucan`, `bioavailability-enhancer`, `cooling`, `digestive`, `healing`, `immune`, `liver`, `medicinal`, `mood`, `postpartum`, `probiotic`, `spleen`, `tonic`, `warming`, `yin-nourishing`. Ingredient detail pages are unaffected.

---

**Collections feature added** — New `/collections` section added between Recipes and Ingredients in the nav.

- `supabase/migrations/009_collections.sql` — `collections` table with `name`, `slug`, `description`, `cover_image_url`, `recipe_slugs text[]`, `published`, RLS policies matching the rest of the site. **Migration must be applied manually in Supabase SQL Editor** (not yet run against the live DB).
- `types/collection.ts` — `Collection` TypeScript interface
- `app/(public)/collections/page.tsx` — grid of published collections, shows name, description, and recipe count
- `app/(public)/collections/[slug]/page.tsx` — detail page with breadcrumb, optional cover image, and recipe card grid linking to `/recipes/[slug]`. Recipe order follows the `recipe_slugs` array.
- `scripts/seed-collections.mjs` — seed script for loading collections; run with `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` env vars
- `components/layout/SiteNav.tsx` — "Collections" added to `NAV_LINKS` between Recipes and Ingredients
- First collection **Edible Skincare** (`slug: edible-skincare`) defined in seed script with empty `recipe_slugs` (recipes to be added manually later)

**Ingredient tag filter — medical tags only** — `app/(public)/ingredients/page.tsx`: the tag filter bar on the ingredients listing page now only shows tags with medical/health meanings. A `MEDICAL_TAGS` allowlist filters `allTags` before passing to `IngredientGrid`. Kept: `absorptive`, `adaptogenic`, `anti-inflammatory`, `anti-nausea`, `antimicrobial`, `antioxidant`, `beta-glucan`, `bioavailability-enhancer`, `cooling`, `digestive`, `healing`, `immune`, `liver`, `medicinal`, `mood`, `postpartum`, `probiotic`, `spleen`, `tonic`, `warming`, `yin-nourishing`. Ingredient detail pages are unaffected.

---

**Ajwain Water recipe added** — `full_recipes/wellness_recipes/Ayurveda/ajwain-water-digestive-infusion.md`: Full recipe page for the traditional North Indian carom seed digestive infusion. Created following the ancient-pantry-recipe skill format with headnote, method, ingredient health notes (Ayurvedic classification, thymol antispasmodic research, honey-heating caution), substitutions and variations (ginger, fennel, black pepper), serving suggestions, storage, and cultural notes. Loaded via `load-full-recipes.mjs`. Now at **184 total recipes** in Supabase. The recipe title "Ajwain Water (Digestive Infusion)" fuzzy-matches exactly against the "Ajwain water (digestive infusion)" entry in the carom seeds ingredient's `traditional_dishes` array, so the ingredient page at `/ingredients/carom-seeds` now renders that dish as a hyperlink automatically.

**Tradition pages deepened — Ayurveda and TCM** — The `/traditions/ayurveda` and `/traditions/traditional-chinese-medicine` pages now carry substantially expanded content in both the `philosophy` and `food_principles` fields, updated directly in Supabase:

- **Ayurveda philosophy** (9,055 chars): Covers full history of the three foundational texts (Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam), the 8 classical branches, the three doshas with their gunas and physical/mental manifestations, prakriti vs vikriti, agni and its 5 subtypes, ama (undigested matter), and a spice-by-spice breakdown (turmeric/haridra, ginger/sunthi, black pepper/maricha, cumin/jeeraka, coriander/dhania, cardamom/ela, cinnamon/tvak, fenugreek/methi, fennel/shatapushpa, carom seeds/ajwain) with Sanskrit names, Ayurvedic classification, and doshic actions.

- **Ayurveda food_principles** (15,008 chars): All six tastes (shad rasa) with their qualities and doshic effects, the 20 gunas framework, four agni types and which spices address each, deep nutrient-density section (piperine/curcumin 2000% bioavailability research, cumin iron content, ginger's gingerols, cinnamon blood sugar data — all framed with research vs tradition distinction), seasonal eating by dosha, viruddha ahara incompatibility examples.

- **TCM philosophy** (11,562 chars): History of Huangdi Neijing, Shennong Bencao Jing, and Shanghan Lun; Qi as vital force (non-mystical explanation); Yin/Yang in the body; the Five Elements (Wu Xing) with organ, season, emotion, flavor, and color correspondences; the 12 zang-fu organ pairs; and a TCM-specific spice classification section (ginger as sheng jiang/gan jiang, cinnamon as rou gui/gui zhi, sha ren cardamom, ding xiang cloves, ba jiao hui xiang star anise, jiang huang turmeric, xiao hui xiang fennel, hei zhi ma black sesame, hua jiao Sichuan pepper) with meridian entries and specific TCM actions.

- **TCM food_principles** (20,109 chars): Five flavors (wu wei) with Chinese characters, clinical actions, and example foods for each; thermal nature practical guide for cooking; which spices enter which meridians; deep section on warming spices as Yang tonics with modern research parallels; Qi-moving vs dampness-transforming spices; the five colors doctrine (wu se); seasonal cooking by element (all four seasons with specific spice guidance); therapeutic congee as base.

---

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
- **184 total recipes** in Supabase, all published (182 original + 2 subsequent: ajwain-water-digestive-infusion + any other additions)
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
- Recipe ingredients: originally stored as flat strings in the `ingredient` field (amount/unit null). Migrated to structured fields (amount, unit, ingredient, prep_note, imperial_amount, imperial_unit) via `scripts/migrate-ingredients.mjs`. The `RecipeIngredients` client component handles metric/imperial display with dynamic conversion.

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

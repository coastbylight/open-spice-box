# Ancient Pantry — Suggested Changes Before Launch

**Date:** 2026-03-26
**Based on:** Codebase audit, competitor analysis (RecipeTinEats, Woks of Life, Food52), SEO best practices

---

## Top 10 Most Recommended Changes

| # | Change | Why It Matters |
|---|--------|----------------|
| 1 | **Add sitemap.xml** + submit to Google Search Console | Without a sitemap, Google can't efficiently discover your recipes, ingredients, and blog posts. This is the single most impactful SEO action. |
| 2 | **Add robots.txt** | Tells search engines what to crawl and what to skip (admin pages). Standard requirement for any public site. |
| 3 | **Configure Google OAuth for production** | The login UI exists but Google OAuth requires Google Cloud credentials, OAuth consent screen, and Supabase provider config. Without this, Google sign-in won't work for users. |
| 4 | **Add aggregateRating to recipe JSON-LD** | You already store `average_rating` and `rating_count` but don't include them in structured data. Adding this gets you star ratings in Google search results — dramatically increases click-through rate. |
| 5 | **Set up Google Analytics (GA4)** | You have zero analytics. Without tracking from day one, you'll have no data on what content performs, where visitors come from, or what to optimize. |
| 6 | **Privacy Policy + Terms of Service pages** | Legally required since you collect user data (accounts, emails, dietary preferences, comments). Missing these could block you from Google AdSense or partnerships later. |
| 7 | **Custom 404 and error pages** | Visitors hitting broken links currently see generic Next.js pages. A branded 404 with search and recipe links keeps visitors on your site instead of bouncing. |
| 8 | **Populate or hide empty content sections** | Blog says "coming soon", Traditions and How-To show preparation messages. Empty pages hurt perceived quality and SEO. Either publish content or remove nav links until ready. |
| 9 | **Compress logo.png** (currently 1.3MB) and add a default OG image | 1.3MB logo slows every page load. A default 1200x630 OG image ensures social shares of non-recipe pages show a branded preview instead of nothing. |
| 10 | **Newsletter/email signup** | Every major competitor has this. It's the primary way recipe sites build a return audience. Consider offering a free guide (e.g., "10 Anti-Inflammatory Recipes") as a lead magnet. |

---

## Full Recommendations by Category

### MUST-HAVE (Do Before Launch)

#### SEO Essentials

**1. Add sitemap.xml**
- Next.js supports automatic generation via `app/sitemap.ts`
- Should include all published recipes, ingredients, blog posts, traditions, how-to articles, and collections
- Submit to Google Search Console immediately after deploying

**2. Add robots.txt**
- Create via `app/robots.ts` or `public/robots.txt`
- Allow all public routes, block `/admin/*` and `/api/*`
- Include sitemap URL reference

**3. Add OG images for non-recipe pages**
- Recipe pages already include OG images from `hero_image_url`
- Homepage, ingredients list, blog list, about page, etc. have no OG image
- Create a default branded OG image (1200x630px) with the Ancient Pantry logo and tagline
- Set it in the root layout metadata as a fallback

#### Authentication

**4. Configure Google OAuth for production**
- The Google OAuth login button exists in the UI but requires Google Cloud credentials to function
- Steps: Create a Google Cloud project, configure the OAuth consent screen, generate OAuth client ID and secret, add the production callback URL (`https://yourdomain.com/auth/callback`), and configure the Google provider in Supabase Dashboard (Authentication > Providers > Google)
- Without this, users can only sign up via email/password — Google login will fail silently or error

#### Legal (Required With User Accounts)

**5. Privacy Policy page**
- You collect: user accounts, email addresses, dietary preferences, cuisine interests, favorite ingredients, recipe ratings, comments
- Required by GDPR, CCPA, and most jurisdictions
- Add at `/privacy` and link from footer

**6. Terms of Service page**
- Covers: user-generated content (comments/ratings), acceptable use, liability, intellectual property
- Important for protecting yourself with user-submitted content
- Add at `/terms` and link from footer

#### Technical

**7. Custom 404 page**
- Create `app/not-found.tsx` with your branding, a search bar, and links to popular recipes
- Currently shows generic Next.js 404

**8. Error boundary page**
- Create `app/error.tsx` (client component) with branded error state
- Prevents users from seeing raw error screens on server failures

---

### HIGH IMPACT FOR SEO (At Launch or Within First Week)

**8. Google Search Console**
- Set up at search.google.com/search-console
- Verify domain ownership
- Submit sitemap.xml
- Monitor: indexing status, search queries, crawl errors, mobile usability

**9. Google Analytics (GA4)**
- Add GA4 tracking script to root layout (`app/layout.tsx`)
- Track from day one: page views, popular recipes, user behavior, traffic sources
- Without this, you're flying blind on what content performs

**10. Add aggregateRating to recipe JSON-LD**
- You already have `average_rating` and `rating_count` in the database
- Add to the `buildJsonLd` function in `app/(public)/recipes/[slug]/page.tsx`:
  ```json
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "ratingCount": 42
  }
  ```
- This gets you star ratings displayed directly in Google search results
- Dramatically increases click-through rate from search

**11. Structured data for non-recipe pages**
- Add `Organization` schema to the homepage (name, logo, URL, social links)
- Add `BreadcrumbList` schema to ingredient detail pages, blog posts, and how-to articles (recipes already have this)
- Add `Article` schema to blog posts

**12. Canonical URLs**
- Add `alternates.canonical` to metadata on all pages
- Prevents duplicate content issues if accessible at multiple URLs (www vs non-www, trailing slashes, query params)

**13. Meta robots on admin pages**
- Ensure `/admin/*` routes have `robots: { index: false, follow: false }` in their metadata
- Prevents admin pages from appearing in search results

---

### VISITOR TOOLS & UX IMPROVEMENTS

**14. Loading skeletons**
- Create `app/loading.tsx` with a branded spinner or skeleton layout
- Currently pages show nothing while waiting for Supabase data
- Improves perceived performance significantly

**15. RSS feed**
- Recipe blogs benefit from RSS — food aggregators and power users subscribe
- Add at `app/feed.xml/route.ts` or `/api/feed`
- Include recipes and blog posts with proper XML formatting

**16. Breadcrumbs on all detail pages**
- Recipe pages now have breadcrumbs (Home / Recipes / Title)
- Add the same pattern to: ingredient detail pages, blog posts, how-to articles, tradition pages
- Use the existing `Breadcrumbs` component from `components/ui/Breadcrumbs.tsx`

**17. Search in mobile nav**
- Verify the search experience works well on mobile
- Consider adding a search input to the hamburger menu overlay
- Recipe search is a primary user action on mobile

---

### CONTENT GAPS

**18. Blog content**
- Blog page currently shows "Blog posts are coming soon"
- Launch with at least 3-5 published posts to signal activity
- The vagus nerve post exists in the database — verify it's published
- Blog posts help SEO significantly (long-tail keywords, internal linking)

**19. Traditions pages**
- Currently shows "Tradition pages are being prepared"
- If TCM, Ayurveda, and other tradition pages aren't ready, hide the nav link temporarily
- Empty pages hurt perceived quality and search engine trust

**20. How-To guides**
- Same as traditions — "How-to guides are being prepared"
- Either populate with content or remove from navigation until ready
- Good candidates: "How to use a wok", "How to balance flavors in TCM cooking", "Ayurvedic cooking principles"

---

### NICE-TO-HAVE (Post-Launch)

**21. PWA manifest (manifest.json)**
- Lets users "install" the site on their phone home screen
- Particularly useful for a recipe site — people use it while cooking and want quick access
- Add name, icons, theme color, display mode

**22. Apple touch icon**
- Shows your logo when someone bookmarks on iOS Safari
- Place `apple-touch-icon.png` (180x180) in the public folder

**23. Compress logo.png**
- Currently 1.3MB — should be under 100KB
- Convert to WebP or compress the PNG
- This file loads on every page via the footer

**24. Newsletter/email signup**
- Biggest gap from competitor analysis — every major recipe site has this
- Critical for building a return audience and driving repeat visits
- Options: Mailchimp, ConvertKit, Resend, or store in Supabase
- Placement: footer, homepage section, blog sidebar, post-recipe CTA
- Lead magnet idea: "10 Anti-Inflammatory Recipes" or "TCM Food Guide" PDF

**25. Nutrition facts on recipes**
- Second biggest content gap from competitor analysis
- Requires: new DB columns (calories, protein, fat, carbs, fiber, sodium), admin form updates, display component
- Enables richer Google recipe snippets when added to JSON-LD
- Users actively search for nutritional information

**26. Recipe video embeds**
- High engagement format used by RecipeTinEats and Woks of Life
- Could start by embedding YouTube videos in recipes where relevant
- Adds to structured data (Google shows video thumbnails in results)

---

### SECURITY

**27. Check Supabase service role key exposure**
- `.env.local` contains `SUPABASE_SERVICE_ROLE_KEY` — this key has full database access and bypasses Row Level Security
- Run: `git log --all -p -- .env.local` to check if it's in git history
- If exposed: **rotate the key immediately** in your Supabase dashboard (Settings > API)
- Ensure `.env.local` is in `.gitignore`
- For deployment, use environment variables in your hosting platform (Vercel, etc.) — never commit secrets

---

## Implementation Priority Timeline

### Before Launch (Week 0)
- sitemap.xml + robots.txt
- Configure Google OAuth (Google Cloud project + Supabase provider)
- Privacy Policy + Terms of Service
- Custom 404 + error pages
- Compress logo.png
- Default OG image
- Check/rotate service role key
- Hide or populate empty content pages

### Launch Week (Week 1)
- Google Search Console setup + sitemap submission
- GA4 analytics
- aggregateRating in recipe JSON-LD
- Canonical URLs
- Admin page noindex

### Post-Launch (Weeks 2-4)
- Loading skeletons
- Breadcrumbs on all detail pages
- RSS feed
- Blog content (3-5 posts minimum)
- Organization + Article structured data

### Future Roadmap
- Newsletter/email signup system
- Nutrition facts
- Recipe videos
- PWA manifest
- Apple touch icon

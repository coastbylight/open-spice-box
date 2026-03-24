# Supabase Migrations

## How to run

1. Open the [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Open each migration file in order, paste the contents, and click **Run**

Run migrations in this exact order — each file may depend on objects created by the previous one.

---

## Migration order and purpose

| File | Purpose |
|------|---------|
| `001_recipes.sql` | Creates the `recipes` table with full recipe fields (ingredients/instructions stored as JSONB), slug uniqueness, difficulty enum, and the shared `set_updated_at()` trigger function used by all subsequent tables. Also creates indexes for slug, published, and tags. |
| `002_ingredients.sql` | Creates the `ingredients` table for pantry ingredient pages, including alternative names, flavor profile, origin regions, traditional medicine perspectives (JSONB), and culinary metadata. |
| `003_traditions.sql` | Creates the `traditions` table for cultural food tradition profiles, including region, philosophy, and lists of common ingredients, techniques, and representative dishes. |
| `004_howto_articles.sql` | Creates the `howto_articles` table for technique and how-to guide content, with category and body fields. |
| `005_blog_posts.sql` | Creates the `blog_posts` table for editorial/blog content, with a descending index on `created_at` for efficient feed queries. |
| `006_contact_submissions.sql` | Creates the `contact_submissions` table to store inbound contact form entries (name, email, message). No `updated_at` — submissions are immutable. |
| `007_rls_policies.sql` | Enables Row Level Security on all six tables and applies policies: anonymous users can read published content and submit contact forms; authenticated users (admins) have full access to everything. |
| `008_storage.sql` | Creates the public `images` storage bucket and applies storage object policies: public read, authenticated write/update/delete. |

---

## Notes

- Migrations 002–006 depend on the `set_updated_at()` function created in `001_recipes.sql`. Run `001` first.
- Migration `007` depends on all six tables existing — run it after `001`–`006`.
- Migration `008` touches the `storage` schema, which Supabase manages. It is safe to run at any point after the project is created.
- All content tables have a `published` boolean (default `false`). Rows are hidden from the public until explicitly published.

---
name: ancient-pantry-blog
description: Write SEO-optimized blog posts for Ancient Pantry with full internal linking to recipes, ingredients, traditions, and how-to guides. Use this skill whenever writing any Ancient Pantry blog post, editorial article, or content piece — whether the user provides a topic, a keyword target, or a draft to improve. Always invoke alongside the ancient-pantry-voice skill for all written content.
argument-hint: [topic | keyword | draft]
user-invocable: true
---

# Ancient Pantry Blog Writer

This skill produces a **complete, publication-ready Ancient Pantry blog post** — from topic brief to finished Markdown with full internal linking.

Ancient Pantry blog posts are not content marketing. They are the same intelligent, grounded editorial voice as the recipe pages — articles that a curious, health-aware reader would return to and share because they genuinely learned something.

Always invoke the **ancient-pantry-voice skill** before writing any prose.

---

## Input

$ARGUMENTS

Accepted inputs:
- A topic or angle ("the history of turmeric", "anti-inflammatory spices for winter")
- A primary keyword to target ("how to use miso", "what is ghee")
- A loose brief with audience intent ("something for people who just found us through saffron")
- A draft to SEO-optimize and internally link

---

# Step 1 — Clarify the Brief

Before writing anything, establish:

1. **Primary keyword** — what search query should this rank for? If the user gave a topic not a keyword, derive the clearest, most-searched version.
2. **Audience intent** — is this informational (learning), navigational (finding something specific), or commercial (comparing/deciding)?
3. **Content angle** — what's the specific hook that makes this *Ancient Pantry's* take, not a generic food blog's take? The intersection of culinary, cultural, and traditional-medicine knowledge is where Ancient Pantry lives.
4. **Target length** — default to 1,000–1,600 words. Go longer for deep-dive ingredient profiles or tradition explainers; shorter for focused how-to or seasonal pieces.

---

# Step 2 — Research Internal Linking Targets

Before writing, identify all plausible internal links. This is not optional — internal linking is the structural backbone of Ancient Pantry's SEO.

## Site URL patterns

| Content type | URL pattern | Example |
|---|---|---|
| Recipes | `/recipes/[slug]` | `/recipes/golden-milk` |
| Ingredients | `/ingredients/[slug]` | `/ingredients/turmeric` |
| Traditions | `/traditions/[slug]` | `/traditions/ayurveda` |
| How-to guides | `/how-to/[slug]` | `/how-to/how-to-make-ghee` |
| Other blog posts | `/blog/[slug]` | `/blog/the-case-for-black-pepper` |
| Collections | `/collections/[slug]` | `/collections/edible-skincare` |

## How to find slugs

**Ingredients** — slugs are the filenames (without `.md`) in `full_recipes/ingredients/`. Glob `full_recipes/ingredients/*.md` to get all ~146 ingredient slugs. The slug is always kebab-case (e.g. `black-pepper`, `turmeric`, `sichuan-peppercorn`).

**Recipes** — slugs are in the YAML frontmatter `slug:` field of every `.md` file under `full_recipes/`. Grep for `^slug:` across all recipe files to find matching titles/slugs. There are 184+ recipes across `full_recipes/indian_recipes/`, `full_recipes/chinese_recipes/`, and `full_recipes/wellness_recipes/`.

**Traditions** — only two: `ayurveda` and `traditional-chinese-medicine`.

**How-to and blog** — these live in Supabase, not local files. Reference them by slug if you know them from context; otherwise don't invent slugs for content that may not exist.

## Linking rules

- Link on **first mention** of an ingredient, recipe, or tradition — not every mention.
- Prefer **descriptive anchor text** that includes a keyword: `[golden milk](/recipes/golden-milk)` not `[this recipe](/recipes/golden-milk)`.
- Target **4–8 internal links per 1,000 words**. More than that feels mechanical; fewer misses SEO value.
- Always verify a slug exists in the file system before linking to it. Don't invent slugs.
- Cluster related links naturally — a paragraph on turmeric might link to the ingredient page *and* a turmeric recipe, which is fine and expected.

---

# Step 3 — Structure the Post

Plan the structure before drafting. A well-structured Ancient Pantry post has:

**Opening (150–250 words)**
- Sensory or narrative hook (not "In this article, we'll explore...")
- State the central question or claim the post answers
- Primary keyword in the first 100 words, naturally

**Body sections (H2 headings)**
- 2–4 focused sections, each earning its own heading
- Each section advances the reader's understanding, not just adds word count
- Ingredient mentions link to `/ingredients/[slug]` on first use
- Recipe mentions link to `/recipes/[slug]` on first use
- Tradition references (Ayurveda, TCM) link to `/traditions/[slug]` on first use

**Optional: FAQ section**
- 2–4 questions in the format: `### [Natural question]` followed by 2–4 sentence answer
- Target featured-snippet length (40–60 words per answer)
- Questions should mirror how people actually search ("Can I use turmeric every day?", "What does miso taste like?")

**Closing (100–150 words)**
- What the reader should do next — cook something, explore an ingredient, read another post
- At least one internal link in the closing CTA

---

# Step 4 — Write the Post

Follow the **ancient-pantry-voice skill** throughout.

Additional blog-specific guidance:

**Subheadings** should be useful, not clever. "What Makes Turmeric Anti-Inflammatory?" ranks better than "The Golden Secret." Both are fine, but when in doubt, clarity beats wit.

**Health claims** follow the same rules as recipe pages: distinguish research from tradition, use qualified language (*associated with*, *research suggests*, *traditionally used for*), never prescribe or diagnose.

**Cultural context** is expected in Ancient Pantry content. If writing about a spice or dish rooted in a specific tradition, acknowledge that origin without flattening it. Name the system (Ayurveda, TCM, folk medicine) specifically.

**No padding.** Every paragraph should earn its place. If a section isn't adding information the reader needs, cut it.

**Write like a person, not a language model.** AI-written prose has a recognizable texture: overlong sentences that hedge everything, filler transitions ("it's worth noting that", "it's important to understand"), conclusions that restate the introduction, and a general sense of completeness-without-substance. Ancient Pantry readers are smart and curious. They can feel the difference. Write the way a knowledgeable cook or food writer would actually talk.

Specific rules:
- **No em dashes.** Restructure the sentence, use a comma, use a period, or use parentheses instead. Em dashes are a reliable AI tell.
- **No boilerplate closings.** Do not end with "At Ancient Pantry, we believe..." or any variation of a site disclaimer. If you want to close warmly, point the reader somewhere useful: a recipe, an ingredient page, the next thing to explore.
- **No throat-clearing transitions.** Cut: "It's worth noting that", "It's important to understand that", "In this article, we'll explore", "Let's take a closer look at". Start sentences directly.
- **Vary sentence length deliberately.** A short sentence after two long ones creates rhythm. Long, clause-heavy sentences read as AI filler. Mix them.
- **Specificity over generality.** "Ginger's primary bioactives, gingerols and shogaols, affect thermogenesis" is better than "ginger has warming properties that may support the body." Concrete details signal a writer who actually knows the subject.

---

# Step 5 — SEO Metadata

## Title (`title` field)

- Lead with the primary keyword or a close variant
- 50–65 characters
- Specific and descriptive: "Why Black Pepper Makes Turmeric More Powerful" not "About Black Pepper and Turmeric"
- Do not write "Ancient Pantry" in the title — it's added by the page template

## Slug (`slug` field)

- Kebab-case of the primary keyword phrase
- 3–6 words, no filler words (no "the", "a", "of")
- Examples: `black-pepper-turmeric-bioavailability`, `how-to-use-miso`, `anti-inflammatory-spices-winter`

## Tags (`tags` field)

- 3–7 tags: mix of cuisine/tradition tags, ingredient tags, health theme tags, and content-type tags
- Reuse tags from the existing tag taxonomy where possible (e.g. `ayurveda`, `tcm`, `anti-inflammatory`, `spice`, `ingredient-deep-dive`, `wellness`)
- Tags are used for filtering and discovery — choose tags that help the right reader find this post

## Meta description

- 140–160 characters
- Answers: what is this post about and why should I click?
- Include the primary keyword naturally
- Do not start with "In this article" or "Learn how"

---

# Output Format

Return in this exact order.

---

## PART 1 — Metadata Block

```yaml
title:
slug:
tags: []
meta_description:
internal_links_used: []
```

**`internal_links_used`** — list every internal link used, in the format `[anchor text](/path/to/page)`. This serves as a quick audit reference.

---

## PART 2 — Blog Post Body (Markdown)

Write the full post. Use:
- `##` for main section headings
- `###` for subsections or FAQ questions
- Inline Markdown links `[text](/path)` for all internal links
- No raw HTML

The body is stored directly in the Supabase `blog_posts.body` field and rendered by `MarkdownRenderer`. All Markdown features (bold, italic, links, headings, lists) are supported.

---

# Final Quality Check

Before finishing, confirm:

- [ ] Primary keyword appears in the first paragraph, at least one H2, and the meta description
- [ ] 4–8 internal links per 1,000 words, all verified against actual slugs in `full_recipes/`
- [ ] Every linked slug exists as a file in `full_recipes/ingredients/` or as a known recipe slug
- [ ] Health language is qualified — no "cures," "heals," or "treats" without caveats
- [ ] Cultural origins are named specifically, not flattened
- [ ] Voice is Ancient Pantry: calm, grounded, intelligent — not hyped, not clinical
- [ ] No em dashes (restructure sentences instead)
- [ ] The post earns its word count — no padding
- [ ] No em dashes anywhere in the body
- [ ] No boilerplate closing disclaimer
- [ ] No filler transitions ("it's worth noting", "it's important to understand", "let's explore")
- [ ] A reader who finds this via search would learn something specific and feel the site is worth exploring further

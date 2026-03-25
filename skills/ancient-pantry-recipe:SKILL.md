---
name: ancient-pantry-recipe
description: Build a complete Ancient Pantry recipe page from any input — URL, pasted text, cooking notes, or dish concept. Use this skill when creating or adapting any recipe for Ancient Pantry. Invoke it when the user provides a recipe URL, pastes recipe text, describes a dish they want to develop, or asks you to build, adapt, or format a recipe for the Ancient Pantry app. Always pair with the ancient-pantry-voice skill for all written editorial content.
argument-hint: [url | recipe text | dish idea]
disable-model-invocation: true
user-invocable: true
---

# Ancient Pantry Recipe Builder

This skill produces a **complete Ancient Pantry recipe page** — from raw input to finished, publishable content.

Ancient Pantry recipes are not just instructions. They are the intersection of **culinary craft, ingredient knowledge, and traditional food wisdom** — written for curious, health-aware cooks who want to understand what they're making and why.

Always invoke the **ancient-pantry-voice skill** when writing headnotes, ingredient notes, health context, or any editorial prose.

---

## Accepted Inputs

- Recipe URL
- Pasted recipe text
- Cooking notes or partial recipe
- Dish concept or ingredient-led idea (e.g., "a warming miso broth with mushrooms")

Raw input:

$ARGUMENTS

---

# Step 1 — Identify Input Type

Determine the input type:

**A) URL** → fetch and extract structured recipe data
**B) Full recipe text** → normalize and enrich
**C) Partial recipe or notes** → fill gaps intelligently, flag assumptions
**D) Dish concept** → develop the recipe from scratch

For type C or D: note any invented or inferred elements clearly. Do not silently invent ingredients or steps.

---

# Step 2 — Extract Recipe Data (URL inputs)

Fetch the URL and extract all available data.

Prioritize structured data:
- JSON-LD recipe schema
- Recipe card markup
- Structured ingredient and instruction lists

Extract:
- Title
- Ingredients (with quantities and prep notes)
- Instructions
- Yield
- Prep time, cook time, total time
- Author and publication source

**Never invent missing data.** If fields are absent, leave them blank in the YAML and note the gap.

---

# Step 3 — Normalize Recipe Structure

Make the recipe clearly cookable.

Ensure:
- Ingredients appear in order of use
- Measurements follow the **Ingredient Measurement Standard** (see below)
- Cooking times are plausible for the technique described
- Instructions are clear and sequential

### Ingredient Measurement Standard (Critical)

The app has a metric/imperial toggle. Write ingredients to support both systems correctly.

**Imperial mode (when toggle shows oz):**
- **Proteins (meat, cheese, seafood) and produce:** use oz if under 8 oz, use lb if 8 oz or above. Example: "1 lb ground pork", "6 oz shrimp", "2 lb pork ribs"
- **Spices, salt, pepper, ginger, garlic, and aromatics:** always use tsp or tbsp. Never oz or grams. Example: "1 tsp turmeric", "2 tbsp minced ginger"
- **Liquids:** use cups, tablespoons, teaspoons. Example: "1 cup chicken broth", "2 tbsp soy sauce"
- **Dry goods (flour, sugar, rice, etc.):** use cups. Example: "2 cups jasmine rice"
- **Fresh herbs and leafy items:** use cups (loosely packed) or count. Example: "1/2 cup cilantro leaves", "4 sprigs thyme"

**Metric mode (when toggle shows g):**
- Use grams (g) for everything under 1000 g, kilograms (kg) for 1000 g and above
- Use milliliters (ml) for liquids under 1000 ml, liters (L) for 1000 ml and above

**In non-ingredient sections** (Method, Why This Works, Substitutions, Serving Suggestions, etc.): always reference amounts in imperial units. Example: "Add the 2 tablespoons of soy sauce" not "Add the 30 ml of soy sauce."

**Conversion accuracy is critical.** Double-check every conversion. Common references:
- 1 tbsp = 15 ml = ~15 g (water/liquid)
- 1 tsp = 5 ml = ~5 g
- 1 cup = 240 ml
- 1 oz = 28 g
- 1 lb = 454 g = 16 oz

Add sensory cues at key moments:
- Onions turning deep golden and sweet-smelling
- Garlic becoming fragrant and just beginning to color
- Sauce coating the back of a spoon
- Edges crisping and browning
- Spices blooming in oil and releasing aroma

---

# Step 4 — Improve the Recipe

Enhance the recipe for higher cooking success and Ancient Pantry's ingredient-forward philosophy.

Add where helpful:
- **Doneness cues** — what does "done" look, smell, and feel like?
- **Troubleshooting tips** — what if it looks wrong at a key step?
- **Substitutions** — especially for specialty or seasonal ingredients
- **Make-ahead notes** — what can be prepped in advance?
- **Storage guidance** — fridge/freezer times and methods
- **Reheating instructions** — how to revive the dish without ruining it

Maintain the identity of the original dish. Do not drift it into a different cuisine or technique without noting the change.

---

# Step 5 — Ingredient & Health Context

This is a key Ancient Pantry differentiator. Think carefully.

For each significant ingredient, consider whether it has:
- Traditional culinary significance (why it appears in this cuisine)
- Traditional wellness use (TCM, Ayurveda, folk medicine)
- Modern research interest (anti-inflammatory, gut health, etc.)

Not every ingredient needs a note. Focus on the ingredients that are meaningful to the dish or that the reader is likely to find interesting.

**Health language rules (critical):**
- Clearly distinguish research from tradition
- Use: *research suggests*, *associated with*, *traditionally used for*, *studied for*
- Never use: *heals*, *cures*, *treats*, *supercharged*
- Medical information should inform, not prescribe

See the **ancient-pantry-voice skill** for full health framing guidance and examples.

---

# SEO Optimization

Write for search as well as readers.

**Title:** Lead with the main dish name, include a descriptor that signals flavor or technique. Examples: "Slow-Braised Lamb Shanks with Harissa and Preserved Lemon" not "Easy Lamb."

**Meta description (~150 characters):** Include the key dish name and one compelling detail. Example: "A warming miso-glazed salmon with ginger and sesame — ready in 25 minutes, weeknight-friendly."

**Keywords to target:**
- Primary: the dish name + cuisine/technique
- Secondary: key ingredients, dietary tags (anti-inflammatory, gluten-free, etc.)
- Long-tail: "what to do with [ingredient]" style queries where relevant

**Headings:** Use clear, descriptive H2/H3s (Why This Works, Substitutions, Storage) — these appear in featured snippets.

**Structured data:** The YAML output feeds the app's recipe schema. Populate all fields accurately to support search engine recipe cards.

---

# Accessibility Requirements (WCAG 2.2)

- Clear heading hierarchy
- Sequential, numbered steps (no backtracking)
- Short paragraphs and instructions
- Consistent section structure across all recipes
- Concise, unambiguous language

The structure below is fixed — maintain it across all recipes for predictability and screen reader compatibility.

---

# Output Format

Return in the following order.

---

## PART 1 — YAML Metadata

```yaml
title:
slug:
subtitle:
source_name:
source_url:
source_author:
yield:
prep_time:
cook_time:
total_time:
difficulty:
cuisine:
course:
tags: []
ingredients_key: []
equipment_key: []
hero_image_prompt:
seo_title:
meta_description:
medical_notes:
```

**Slug:** lowercase kebab-case, matches the primary SEO keyword phrase.

**Tags:** include cuisine, course, dietary flags (gluten-free, dairy-free, vegan, etc.), key ingredients, health themes (anti-inflammatory, gut health, etc.).

**Hero image prompt:** describe the plating, lighting, surface, and mood. Example: "A wide shallow bowl of golden lentil dal, steam rising, garnished with a swirl of cream and crispy shallots, photographed overhead on a worn wooden table in warm afternoon light."

**Medical notes:** populate only if the recipe has specific allergy, interaction, or contraindication relevance (e.g., high oxalate, blood-thinning herbs). Leave blank otherwise.

---

## PART 2 — Recipe Page

**[Skip to Recipe]** ← button at top of page, anchors to Ingredients section

---

### [Recipe Title]

*[Subtitle — one evocative line describing the dish]*

---

### Headnote

180–320 words. Written in the Ancient Pantry voice.

Include:
1. Sensory opening moment
2. Cultural or seasonal context
3. What the dish delivers (flavor, texture, mood)
4. One practical cooking insight the reader will use

See the **ancient-pantry-voice skill** for headnote guidance and examples.

---

### At a Glance

| | |
|---|---|
| Yield | |
| Prep | |
| Cook | |
| Total | |
| Difficulty | Easy / Medium / Involved |

---

### Ingredients

List with measurements and prep notes (finely chopped, room temperature, etc.).

Group into sections if the recipe warrants it (e.g., For the marinade / For the braise).

---

### Method

Numbered steps. Each step includes:
- Clear instruction
- Sensory cue where relevant
- Brief explanation of why it matters (for key steps only)

**Do NOT bold the opening phrase of each step.** Write plain text throughout. No `**Cook the onions.**` patterns. Just `1. Cook the onions until...`

---

### Why This Works

2–4 short paragraphs explaining the cooking logic.

Topics may include:
- Browning and flavor development
- Salt / fat / acid / heat balance
- Texture development
- Heat management and timing
- Why a traditional technique produces the result it does

Ground this in Ancient Pantry's philosophy: food is intelligent. There are reasons things work.

---

### Ingredient & Health Notes

For each significant ingredient:
- Its culinary role in this dish
- Traditional use (TCM, Ayurveda, folk medicine) if relevant
- Modern research interest if relevant

Distinguish clearly between research and tradition. Use responsible language throughout. Not every ingredient needs a note.

---

### Substitutions and Variations

Realistic swaps that multiple other people have mentioned online. Include:
- What changes with the substitution (flavor, texture, result)
- Variations that produce a meaningfully different dish

---

### Serving Suggestions

How to serve and what pairs well. Written in the hospitable Ancient Pantry tone — like a knowledgeable host sharing what they'd put on the table.

---

### Storage and Reheating

Fridge and freezer guidance with specific timeframes. Reheating method that preserves the dish.

---

### Source Acknowledgment

If adapted from another recipe, credit the source and describe significant changes made.

---

## PART 3 — App Summary

- One-sentence recipe description
- SEO meta description (~150 characters)
- 3–7 tags
- Key ingredients list
- Hero image prompt

---

# Final Quality Check

Before finishing, confirm:

- The recipe is cookable from these instructions alone
- Ingredients and instructions match throughout
- Sensory cues exist at key moments
- Health notes are responsibly framed (research and tradition clearly distinguished)
- SEO elements are present and accurate
- Accessibility structure is intact
- The writing reflects Ancient Pantry's voice: calm, grounded, intelligent, culturally respectful
- Nothing prescribes, diagnoses, or overwhelms
- The writing sounds like a human wrote it — use natural, conversational expressions, not polished AI-sounding prose. Avoid em dashes (use commas, periods, or restructure the sentence instead). Write the way a knowledgeable cook would actually talk.

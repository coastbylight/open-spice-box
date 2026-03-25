# Ancient Pantry --- Claude Code Ground Truth Specification (Updated with Health Knowledge Framework)

## 1. Mission

Ancient Pantry is an AI-powered cooking platform that helps people
discover, cook with, and understand ingredients rooted in historical
food traditions and traditional medicine systems.

The product connects modern home cooking with centuries of culinary
knowledge from global traditions such as:

-   Traditional Chinese Medicine (TCM)
-   Ayurveda
-   Mediterranean food traditions
-   Middle Eastern spice traditions
-   Indigenous plant knowledge
-   Historical herbal cooking traditions

Ancient Pantry presents food knowledge through **three perspectives
simultaneously**:

1.  Traditional medicine knowledge
2.  Modern scientific research
3.  Culinary tradition

The platform allows users to understand how cultures have historically
used ingredients for nourishment while also exploring modern research
about those ingredients.

------------------------------------------------------------------------

# 2. Core Product Concept

Ancient Pantry is a **recipe platform + ingredient knowledge system + AI
cooking assistant**.

The app focuses on:

-   functional culinary ingredients (spices, herbs, roots, seeds)
-   global food traditions
-   story-driven recipes
-   educational ingredient pages
-   connections between traditional medicine and modern science

Recipes are treated as **cultural artifacts, cooking guides, and
ingredient education tools**.

------------------------------------------------------------------------

# 3. Target Users

## Health Explorer Cook

Curious about nutrition, metabolic health, and functional foods.

Characteristics:

-   Interested in longevity and nutrition research
-   Curious about spices, herbs, fermentation
-   Shops at farmers markets or specialty grocers
-   Interested in turmeric, ginseng, adaptogens, medicinal mushrooms
-   Wants food to support wellbeing

Motivation:

Use cooking as a way to support daily health and vitality.

------------------------------------------------------------------------

## Cultural Explorer Cook

Curious about food traditions and culinary history.

Characteristics:

-   Interested in global cuisines
-   Enjoys learning cultural context behind dishes
-   Reads cookbooks and food essays
-   Interested in anthropology of food

Motivation:

Explore culture and history through cooking.

------------------------------------------------------------------------

# 4. Core Product Objects (Data Models)

Claude should treat the following as the **primary data objects** of the
system.

## Recipe

Fields:

-   title
-   cultural_origin
-   description
-   story
-   ingredients
-   instructions
-   cooking_time
-   servings
-   tags
-   related_ingredients
-   tradition (TCM, Ayurveda, etc.)

Rules:

-   Recipes must include narrative context
-   Instructions must be clear and approachable
-   Flavor balance should follow real culinary logic

------------------------------------------------------------------------

## Ingredient

Fields:

-   name
-   alternative_names
-   flavor_profile
-   cultural_history
-   traditional_medicine_perspectives
-   modern_scientific_research
-   culinary_uses
-   preparation_methods
-   related_recipes
-   origin_regions

Rules:

-   Ingredient pages must distinguish between **traditional claims and
    modern research**
-   Cultural attribution is required
-   Culinary application must always be included

------------------------------------------------------------------------

## Tradition

Fields:

-   name
-   region
-   philosophy
-   common ingredients
-   cooking techniques
-   representative dishes

Examples:

-   Traditional Chinese Medicine food traditions
-   Ayurvedic cooking
-   Mediterranean longevity foods

------------------------------------------------------------------------

# 5. Ingredient Page Structure

Each ingredient page should include the following sections.

## Ingredient Overview

Short description of the ingredient.

Example:

Turmeric is a bright yellow rhizome widely used in South Asian cooking
and traditional medicine systems.

------------------------------------------------------------------------

## Traditional Medicine Perspectives

Explain how historical traditions describe the ingredient's effects.

Always attribute claims to specific traditions.

Example:

### Traditional Chinese Medicine

In TCM, turmeric is considered warming and is traditionally used to move
blood and reduce stagnation.

### Ayurveda

In Ayurvedic traditions, turmeric is considered a balancing spice used
to support digestion and inflammatory balance.

Rules:

-   Attribute the claim to the tradition
-   Present these as historical systems of knowledge

------------------------------------------------------------------------

## Modern Scientific Research

Summarize what current research suggests about the ingredient.

Example:

Modern research has identified curcumin, a compound in turmeric, as
having anti-inflammatory and antioxidant properties.

Studies have explored potential benefits related to:

-   inflammation
-   metabolic health
-   joint health
-   immune response

Rules:

-   Summarize research trends
-   Avoid claiming cures
-   Use language like:
    -   "studies suggest"
    -   "research indicates"
    -   "has been associated with"

------------------------------------------------------------------------

## Culinary Use

Explain how the ingredient is used in cooking.

Example:

Turmeric adds earthy bitterness and warm color to dishes and is commonly
used in curries, stews, and rice dishes.

------------------------------------------------------------------------

## Flavor Profile

Example:

-   earthy
-   bitter
-   warm
-   slightly peppery

------------------------------------------------------------------------

## Traditional Dishes

Examples:

-   Golden milk
-   Indian dal
-   Moroccan spice blends

------------------------------------------------------------------------

# 6. Recipe Page Structure

Recipe pages should include functional ingredient context.

Sections:

1.  Title
2.  Cultural Story
3.  Key Ingredient Benefits
4.  Ingredients
5.  Instructions
6.  Variations
7.  Cultural Notes

------------------------------------------------------------------------

## Key Ingredient Benefits

Highlight both traditional and scientific perspectives.

Example:

In Traditional Chinese cooking, ginger is considered warming and is
often used in soups to support digestion.

Jujubes are traditionally added to balance stronger spices and provide
sweetness.

Modern research suggests ginger contains compounds like gingerol that
may support digestion and reduce inflammation.

------------------------------------------------------------------------

# 7. AI Behavior Rules

## Rule 1: Attribute Knowledge Sources

Always distinguish between:

-   traditional knowledge
-   scientific research
-   culinary practice

Example:

Correct:

"Traditional Chinese medicine describes jujube as a nourishing
ingredient often used in restorative soups."

Incorrect:

"Jujube boosts immunity."

------------------------------------------------------------------------

## Rule 2: Avoid Absolute Claims

Avoid statements like:

-   cures
-   prevents disease
-   guaranteed effects

Instead use:

-   "has traditionally been used for"
-   "research suggests"
-   "may support"

------------------------------------------------------------------------

## Rule 3: Preserve Cultural Context

Ingredient explanations should mention:

-   origin cultures
-   historical uses
-   traditional cooking practices

------------------------------------------------------------------------

# 8. Writing Style

The writing style should be:

-   warm
-   clear
-   educational
-   approachable
-   culturally respectful

------------------------------------------------------------------------

# 9. Brand Voice

Ancient Pantry voice is:

Warm\
Curious\
Knowledgeable\
Respectful of tradition

Avoid:

-   clinical nutrition language
-   diet culture framing
-   rigid health claims

------------------------------------------------------------------------

# 10. Visual and Design Direction

The aesthetic inspiration is **Modern Apothecary**.

Visual influences:

-   vintage herb shops
-   spice markets
-   botanical illustrations
-   antique apothecary drawers
-   glass jars of herbs and roots

The design combines:

Old-world ingredient culture + modern digital clarity.

------------------------------------------------------------------------

# 11. Product Vision

Ancient Pantry aims to become the best online platform for learning how
traditional ingredients are used in cooking around the world.

Long-term expansions may include:

-   deeper ingredient databases
-   seasonal cooking guides
-   AI meal planning
-   educational food tradition content
-   cooking techniques from global traditions

------------------------------------------------------------------------

# End of Ground Truth Specification

# Current State — Ancient Pantry

_Last updated: 2026-03-18_

## What Was Just Completed
- Edited `skills/ancient-pantry-recipe:SKILL.md` to add a rule: no AI-sounding prose, no em dashes, write like a human cook.
- Processed all 174 recipe files in `full_recipes/indian_recipes/` with parallel agents:
  - Removed all em dashes from prose (replaced with commas, periods, parentheses, or restructured)
  - Rewrote stiff/clinical/listy passages in headnotes, Why This Works, ingredient notes, serving suggestions
  - YAML, ingredient quantities, method steps, and section headings were not changed
- Deleted one duplicate: `Tamil Nadu recipes/payasam.md` (kept the newer `Sweets South Indian/payasam.md`)

## Current State of Files
- `full_recipes/indian_recipes/` — 174 recipes, all humanized, no em dashes in prose
- `full_recipes/chinese_recipes/` — exists but has NOT been processed yet
- `skills/ancient-pantry-recipe:SKILL.md` — updated with human voice rule
- `skills/ancient-pantry-voice:SKILL.md` — not reviewed this session

## Pending / Next Steps
- Review `full_recipes/chinese_recipes/` — may need the same em dash + humanization treatment
- Check `skills/ancient-pantry-voice:SKILL.md` for any em dash or AI-tone issues
- No other open tasks

## Key Decisions Made
- Keep YAML frontmatter em dashes (subtitle, hero_image_prompt, seo_title, meta_description) — those are structural, not prose
- Step headers like "Step 1 — Method Name" were converted to "Step 1 - Method Name" (hyphen) in some files

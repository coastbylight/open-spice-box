#!/usr/bin/env python3
"""
Add ingredient quantities inline to method sections of recipe markdown files.

For each recipe:
1. Parse the ingredients section to extract name → quantity mappings
2. Scan method steps for ingredient mentions
3. Add (quantity) after the first mention of each ingredient in the method
"""

import re
import os
import glob
import sys
from pathlib import Path

# ─── Quantity extraction ───────────────────────────────────────────────────────

def parse_ingredient_line(raw_line):
    """
    Parse a single ingredient bullet line.
    Returns (name_variants: list[str], display_qty: str) or (None, None).
    """
    line = raw_line.strip()
    if line.startswith('- '):
        line = line[2:].strip()
    if not line:
        return None, None

    # Skip section headers / non-ingredient lines
    if line.startswith('#') or line.startswith('|') or line.startswith('**'):
        return None, None

    # "Salt to taste", "Garnishes", etc. — no leading quantity
    # We'll still try to parse; if no quantity found, return None

    # Check for "about X unit" qualifier in parentheses (prefer as display qty)
    about_match = re.search(r'\(about ([^)]+)\)', line)

    # ── Pattern A: leading metric weight/volume with optional space: "300g", "30 g" ──
    m = re.match(
        r'^([\d½¼¾]+(?:\.\d+)?)\s*(g|ml|kg|l)\s+(.+?)(?:\s*[,(].*)?$',
        line, re.IGNORECASE
    )
    if m:
        qty_num, qty_unit, rest = m.group(1), m.group(2), m.group(3)
        qty_str = about_match.group(1) if about_match else f"{qty_num} {qty_unit}"
        return get_name_variants(rest.strip()), qty_str.strip()

    # ── Pattern B: leading volume unit word: "1 tsp", "½ tablespoon", "2 cups" ──
    m = re.match(
        r'^([\d½¼¾]+(?:\.\d+)?(?:½|¼|¾)?)\s*(tablespoons?|teaspoons?|tbsp|tsp|cups?|cup)\s+(.+?)(?:\s*[,(].*)?$',
        line, re.IGNORECASE
    )
    if m:
        qty_num, qty_unit, rest = m.group(1), m.group(2), m.group(3)
        qty_str = f"{qty_num} {qty_unit}"
        return get_name_variants(rest.strip()), qty_str.strip()

    # ── Pattern C: "1 pinch", "2 sprigs", "3 leaves", "1 piece", etc. ──
    m = re.match(
        r'^([\d½¼¾]+(?:\.\d+)?)\s*(pinch(?:es)?|sprigs?|pieces?|blades?|drops?|sticks?|pods?)\s+(.+?)(?:\s*[,(].*)?$',
        line, re.IGNORECASE
    )
    if m:
        qty_num, qty_unit, rest = m.group(1), m.group(2), m.group(3)
        qty_str = f"{qty_num} {qty_unit}"
        return get_name_variants(rest.strip()), qty_str.strip()

    # ── Pattern D: count only "2 bay leaves", "1 cinnamon stick", "3 cloves garlic" ──
    m = re.match(
        r'^([\d½¼¾]+)\s+(?!(?:g|ml|kg|l|tablespoons?|teaspoons?|tbsp|tsp|cups?|pinch|sprigs?|pieces?|blades?|drops?|sticks?|pods?)\b)(.+?)(?:\s*[,(].*)?$',
        line, re.IGNORECASE
    )
    if m:
        qty_num, rest = m.group(1), m.group(2)
        qty_str = qty_num
        return get_name_variants(rest.strip()), qty_str.strip()

    return None, None


def get_name_variants(name_raw):
    """
    Return a deduplicated list of lowercase name variants for matching.
    The first element is the most specific (full name).
    """
    # Remove markdown formatting
    name = re.sub(r'\*+([^*]+)\*+', r'\1', name_raw)
    # Remove content in parentheses
    name = re.sub(r'\(.*?\)', '', name)
    # Take only the first part if there's a slash (e.g., "caraway seeds / shahi jeera")
    name = re.split(r'\s*/\s*', name)[0]
    name = name.strip(' ,.')

    if not name:
        return []

    base = name.lower()
    variants = [base]

    words = base.split()
    if not words:
        return variants

    # Remove leading qualifier adjectives → add shorter variant
    leading_qualifiers = {
        'fresh', 'dried', 'ground', 'whole', 'fine', 'coarse', 'raw',
        'ripe', 'large', 'small', 'medium', 'hot', 'warm', 'cold', 'plain',
        'thick', 'thin', 'crushed', 'minced', 'chopped', 'grated', 'beaten',
        'light', 'dark', 'young', 'salted', 'unsalted', 'heaped', 'level',
        'double', 'single',
    }
    color_adj = {'red', 'green', 'black', 'white', 'yellow', 'brown', 'golden', 'orange'}

    if len(words) > 1 and words[0] in (leading_qualifiers | color_adj):
        rest = ' '.join(words[1:])
        if rest not in variants:
            variants.append(rest)

    # Remove trailing descriptor words → add shorter variant
    trailing_descriptors = {
        'powder', 'seeds', 'leaves', 'oil', 'paste', 'sauce', 'juice',
        'water', 'flour', 'extract', 'flakes', 'strips', 'chips',
    }
    if len(words) > 1 and words[-1] in trailing_descriptors:
        rest = ' '.join(words[:-1])
        if rest not in variants:
            variants.append(rest)

    # Try removing one interior color/quality adjective from 3+ word names
    # e.g., "kashmiri red chilli powder" → "kashmiri chilli powder"
    interior_adj = color_adj | leading_qualifiers
    if len(words) >= 3:
        for i, w in enumerate(words[1:-1], 1):  # skip first and last word
            if w in interior_adj:
                candidate = ' '.join(words[:i] + words[i+1:])
                if candidate not in variants:
                    variants.append(candidate)

    # Generate "core" by stripping both a leading qualifier AND a trailing descriptor
    # e.g., "whole fennel seeds" → "fennel", "ground turmeric" → "turmeric"
    core = list(words)
    if core and core[0] in (leading_qualifiers | color_adj):
        core = core[1:]
    if core and core[-1] in trailing_descriptors:
        core = core[:-1]
    core_str = ' '.join(core)
    if core_str and core_str not in variants and len(core_str) > 2:
        variants.append(core_str)

    return [v for v in dict.fromkeys(variants) if v]  # deduplicated, ordered


# ─── Ingredient section parsing ────────────────────────────────────────────────

def extract_ingredients(content):
    """
    Parse the ## Ingredients section.
    Returns a list of (name_variants_list, display_qty) tuples.
    Each tuple is one "ingredient group".
    """
    m = re.search(r'##\s+Ingredients[^\n]*\n(.*?)(?=\n##\s|\Z)', content, re.DOTALL)
    if not m:
        return []

    ing_block = m.group(1)
    results = []
    for raw_line in ing_block.split('\n'):
        variants, qty = parse_ingredient_line(raw_line)
        if variants and qty:
            results.append((variants, qty))
    return results


# ─── Method annotation ─────────────────────────────────────────────────────────

def build_lookup(ingredient_list):
    """
    Build lookup data for method annotation.
    Returns:
      - sorted_pairs: list of (variant_str, qty, group_id) sorted longest-first
      - group_variants: dict of group_id -> set of all variants in the group
    """
    group_variants = {}  # group_id -> set of variant strings
    sorted_pairs = []

    for group_id, (variants, qty) in enumerate(ingredient_list):
        group_variants[group_id] = set(variants)
        for v in variants:
            sorted_pairs.append((v, qty, group_id))

    # Sort longest first so more specific phrases are matched before shorter ones
    sorted_pairs.sort(key=lambda x: -len(x[0]))
    return sorted_pairs, group_variants


def already_annotated(text, match_end):
    """Check if the match at match_end is already followed by a parenthetical."""
    suffix = text[match_end:match_end + 40]
    return bool(re.match(r'\s*\(', suffix))


def already_has_qty_before(text, match_start):
    """Check if there's already an explicit quantity immediately before the ingredient match."""
    prefix = text[max(0, match_start - 35):match_start]
    # Look for trailing quantity pattern at end of prefix: "1 tsp ", "½ g ", "200 ml ", etc.
    qty_pattern = r'[\d½¼¾]+(?:\s*(?:g|ml|kg|l|tsp|tbsp|tablespoons?|teaspoons?|cups?|pinch(?:es)?))?\s+$'
    return bool(re.search(qty_pattern, prefix, re.IGNORECASE))


def annotate_method_step(step_text, sorted_pairs, group_variants, annotated_groups):
    """
    Annotate a single method step with ingredient quantities.
    annotated_groups: set of group_ids already annotated (modified in-place).
    Returns annotated step text.
    """
    result = step_text

    for variant, qty, group_id in sorted_pairs:
        if group_id in annotated_groups:
            continue  # already annotated this ingredient group

        # Build regex for word/phrase boundary matching
        escaped = re.escape(variant)
        # \b doesn't work well with hyphens; use lookaround instead
        pattern = r'(?<![a-zA-Z\-])' + escaped + r'(?![a-zA-Z\-])'

        m = re.search(pattern, result, re.IGNORECASE)
        if m:
            if not already_annotated(result, m.end()) and not already_has_qty_before(result, m.start()):
                insert_pos = m.end()
                result = result[:insert_pos] + f" ({qty})" + result[insert_pos:]
                annotated_groups.add(group_id)

    return result


def annotate_method_section(content, sorted_pairs, group_variants):
    """
    Find the ## Method section and annotate each prose line.
    Returns modified content.
    """
    method_match = re.search(
        r'(##\s+Method[^\n]*\n)(.*?)(?=\n##\s|\Z)',
        content, re.DOTALL
    )
    if not method_match:
        return content

    method_start = method_match.start(2)
    method_end = method_match.end(2)
    method_body = method_match.group(2)

    annotated_groups = set()

    lines = method_body.split('\n')
    new_lines = []
    for line in lines:
        stripped = line.strip()
        # Skip blank lines, headings, horizontal rules, table rows
        if not stripped or stripped.startswith('#') or stripped.startswith('---') or stripped.startswith('|'):
            new_lines.append(line)
            continue
        # Skip bold-only step headings like "**1. Soak overnight.**"
        if re.match(r'^\*\*[^*]+\*\*\s*$', stripped):
            new_lines.append(line)
            continue

        annotated = annotate_method_step(line, sorted_pairs, group_variants, annotated_groups)
        new_lines.append(annotated)

    new_method_body = '\n'.join(new_lines)
    return content[:method_start] + new_method_body + content[method_end:]


# ─── File processing ───────────────────────────────────────────────────────────

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    ingredient_list = extract_ingredients(content)
    if not ingredient_list:
        return False, "no ingredients section"

    sorted_pairs, group_variants = build_lookup(ingredient_list)
    if not sorted_pairs:
        return False, "empty lookup"

    new_content = annotate_method_section(content, sorted_pairs, group_variants)

    if new_content == content:
        return False, "no changes"

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True, "updated"


def main():
    base = Path("/Users/pih5/Documents/Projects/Claude Projects/ancient pantry/full_recipes")
    files = sorted(base.rglob("*.md"))

    total = len(files)
    updated = 0
    skipped = 0
    errors = []

    print(f"Processing {total} recipe files...\n")

    for fp in files:
        try:
            changed, reason = process_file(str(fp))
            rel = fp.relative_to(base)
            if changed:
                updated += 1
                print(f"  [UPDATED] {rel}")
            else:
                skipped += 1
                if reason not in ("no changes",):
                    print(f"  [SKIP] {rel} — {reason}")
        except Exception as e:
            errors.append((str(fp), str(e)))
            print(f"  [ERROR] {fp.name}: {e}")

    print(f"\n─────────────────────────────────────")
    print(f"Done. {updated} updated, {skipped} unchanged, {len(errors)} errors.")
    if errors:
        print("\nErrors:")
        for path, err in errors:
            print(f"  {path}: {err}")


if __name__ == "__main__":
    main()

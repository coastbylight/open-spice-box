# CLAUDE.md — Ancient Pantry Project

## Context Loading (Critical)
At the start of any session or major task:

1. Read:
   - `current-state.md`
   - `docs/prd.md` (if exists)

2. Summarize internally:
   - what the app does
   - current progress
   - any known issues
   - next priority

Do not begin work until this context is loaded.
- At the end of any work session, or when asked to wrap up, update `current-state.md` with what was completed, what's pending, any known issues, and what's next.
- When the user says "update current state", "save progress", or "we're done for now" — write to `current-state.md` immediately.

## Project Overview
Ancient Pantry is a recipe app focused on traditional Indian (and other) cuisine. Recipes live in `full_recipes/indian_recipes/` as markdown files, organized by regional cuisine.

## Pre-Task Check

Before implementing anything:

- Does this align with the PRD?
- Does this match current architecture?
- Does this duplicate existing functionality?

If not aligned, pause and adjust before coding.

# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided, identify whether the goal is:
  - exact recreation
  - close adaptation
  - inspiration only
- For exact recreation, match layout, spacing, typography, and color as closely as possible. 
- For adaptation or inspiration, preserve the key visual language while aligning with the product, brand, and UX needs.
- Do not add unnecessary sections or features unless required by the product brief. Swap in placeholder content (images via `https://placehold.co/`, generic copy). 
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the existing dev server for the project.
- Prefer the project’s defined scripts in package.json.
- Common commands:
  - `npm run dev`
  - `pnpm dev`
  - `yarn dev`
- If no app framework is present and the project is a static site, a simple local server is acceptable.
- If the repo includes a local server script such as `serve.mjs`, use it when appropriate.
- Otherwise use the project’s normal dev server from `package.json`.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Use the project’s existing browser tooling if available. If no tooling exists, use `screenshot.mjs` if available
- Do not assume machine-specific paths.
- Detect installed tooling from the repo and environment.

- When validating frontend output, use the project’s available browser testing or screenshot tooling.
- Prefer Playwright CLI or existing screenshot scripts if configured in the repo.
- Always view pages through a local or tunneled server, never `file:///`.
- Compare screenshots against references when reference fidelity matters.
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Follow the architecture and stack already defined in the repo or PRD.
- For static mockups or one-page concepts, a single HTML file is acceptable.
- For real applications, use the project framework and component structure.
- Prefer reusable components, clear file organization, and maintainable styling patterns.
- Mobile-first responsive by default.
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not push updates made to code in claude code when working with localhost to github until I tell you specifically to push changes to github main branch or commit changes to main branch


## Recipe Files
- All recipes: `full_recipes/indian_recipes/` 
- Recipe format: YAML frontmatter + structured markdown sections (Headnote, Ingredients, Method, Why This Works, Ingredient & Health Notes, Substitutions, Serving Suggestions, Storage)
- Skills for recipe creation: `skills/ancient-pantry-recipe:SKILL.md` and `skills/ancient-pantry-voice:SKILL.md`

## Writing Standards
- No em dashes in prose. Use commas, periods, parentheses, or restructure.
- Write like a knowledgeable cook talking, not an AI generating content.
- Health notes must distinguish research from tradition. Never use "heals", "cures", "treats".
- Do not change YAML values, ingredient quantities, numbered steps, or section headings.

## Workflow Roles
- GSD owns PRD alignment, architecture context, and project memory.
- Task/task-tracking systems own prioritization and task status.
- Superpowers-style workflow governs implementation discipline, verification, and small safe changes.
- Do not redo product planning if a PRD already exists.
- Do not make architecture changes without updating the relevant docs.

## Mobile Preview
- When useful, expose the local dev server to mobile via LAN or tunnel.
- Prefer localhost for desktop development and a tunnel/LAN IP for mobile testing.
- Validate responsive behavior on mobile breakpoints before declaring frontend work complete.

## Stack Detection
- First inspect the repo for `package.json`, framework config files, and existing app structure.
- If the repo uses Next.js, React, Vite, Vue, or another framework, follow that framework’s conventions.
- Do not replace an existing framework architecture with a single static HTML file unless explicitly requested.
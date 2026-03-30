---
name: figma-design-to-code
description: Adapt Figma designs into codebase-aligned implementation guidance. Use when a user provides a Figma file, node, or URL and wants UI analysis, structure, styling, assets, or code derived from that design without directly editing the Figma file.
---

# Figma Design To Code

## Overview

Inspect a Figma node, extract the design context, and translate it into implementation guidance that fits the current codebase. Prefer existing components, tokens, and patterns over literal one-off recreation.

## Workflow

1. Parse the Figma URL if the user provides one.
2. Call `get_design_context` on the target node.
3. Keep screenshots enabled unless the user explicitly asks to exclude them.
4. Read the local codebase before proposing code so the implementation matches existing components, styling conventions, and state patterns.
5. Search for reusable design system components or local equivalents before suggesting new bespoke UI.
6. Treat the returned code as reference code to adapt, not as something to paste blindly.
7. Explain the mapping from design structure to local components, CSS, layout model, and assets.

## Tool Routing

- Use `get_design_context` as the default entry point for design-to-code work.
- Use `get_metadata` only when you need a lightweight overview of page structure or need help finding the right node to inspect next.
- Use `get_screenshot` when the user needs an image artifact or when visual verification is useful outside the main design-context response.
- Use `get_variable_defs` when the node appears tokenized and the implementation needs variable names or resolved values.
- Use `search_design_system` before suggesting brand-new components if the file likely depends on a shared library.

## Adaptation Rules

- Preserve semantics and interaction intent first; exact pixel matching is secondary unless the user explicitly asks for high-fidelity recreation.
- Match the local stack. If the repo uses existing primitives, variants, tokens, or layout helpers, adapt the design to those instead of inventing a parallel system.
- Call out any uncertain parts such as missing responsive behavior, hidden states, or ambiguous spacing.
- Keep asset handling explicit. If the design context returns downloadable assets, state which ones are required and where they belong in the project.

## Do Not Use This Skill For

- Direct Figma editing. Use `use_figma` workflows instead.
- First-time webpage capture into Figma. Use `generate_figma_design`.
- Code Connect mapping work. Use the dedicated Code Connect workflow.

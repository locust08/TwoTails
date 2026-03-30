---
name: figma-edit-file
description: Edit Figma files directly through the plugin API. Use when a user wants to create, modify, delete, restyle, reorganize, or inspect nodes in an existing Figma file instead of only reading design context or capturing a webpage.
---

# Figma Edit File

## Overview

Make targeted, reversible changes inside a Figma file and reuse existing design-system assets whenever possible. Keep edits narrow, inspect before changing, and summarize exactly what was modified.

## Workflow

1. Confirm the target file and node scope from the user prompt or URL.
2. Inspect the relevant node with `get_design_context`, `get_metadata`, or `get_screenshot` when the structure is unclear.
3. Search the design system before creating components, variants, variables, or styles from scratch.
4. Use `use_figma` for all write operations.
5. Keep the JavaScript payload focused on the requested change, and avoid broad document mutations unless the user asked for them.
6. After writing, report the user-facing result and mention any created pages, frames, or component names that matter.

## Tool Routing

- Use `use_figma` as the default write path for pages, frames, components, variants, styles, text, variables, and other file mutations.
- Use `search_design_system` before creating new components or component sets so you can import and reuse existing assets instead.
- Use `get_design_context` for deeper context when editing a complex existing node.
- Use `get_metadata` for lightweight structural inspection when you need node IDs or layout overview.

## Editing Rules

- Prefer importing existing library assets over recreating local duplicates.
- Keep naming consistent with the file's existing conventions.
- Preserve layout intent. When adjusting auto-layout, constraints, or spacing, change only the properties required for the requested outcome.
- If the task touches typography or variables, prefer existing styles and variable collections over hard-coded values.
- If a dedicated `figma-use` skill is available in the environment, load it before calling `use_figma`.

## Do Not Use This Skill For

- First-time webpage import into Figma. Use `generate_figma_design`.
- Pure read-only design-to-code analysis. Use `get_design_context` workflows.
- Code Connect mapping work unless the edit explicitly includes Code Connect metadata changes.

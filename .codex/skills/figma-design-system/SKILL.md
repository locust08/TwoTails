---
name: figma-design-system
description: Reuse and align with existing Figma design system assets. Use when a user needs to find components, variables, styles, or libraries, apply design-system conventions, or avoid recreating UI that already exists in a shared library.
---

# Figma Design System

## Overview

Search for reusable design-system assets first, then build or edit with those assets instead of duplicating them. This skill is about discovery, reuse, and consistency across libraries and files.

## Workflow

1. Start with the narrowest useful search query based on the user’s goal, such as the component name, token family, or style concept.
2. Call `search_design_system` before creating new components, styles, or variables.
3. If relevant results appear, reuse or import those assets instead of rebuilding them locally.
4. Use `get_variable_defs` when the user needs the variable names or resolved values attached to a node.
5. Use `get_design_context` when you need to understand how a node consumes shared components, styles, or variables.
6. When editing the file, pair this skill with `use_figma` so imported assets are placed correctly.

## Reuse Rules

- Prefer importing components or component sets by key rather than recreating near-duplicates.
- Restrict searches to specific library keys only when the user or prior results indicate the correct library.
- Treat variables and styles as first-class assets, not just supporting details.
- If no reusable asset exists, say so clearly before creating something new.

## Do Not Use This Skill For

- Pure webpage capture into Figma.
- Pure code mapping work without any design-system lookup or reuse goal.
- General design-to-code analysis when the user is not asking about shared assets, tokens, or libraries.

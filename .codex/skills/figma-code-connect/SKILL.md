---
name: figma-code-connect
description: Link Figma nodes to code components with Code Connect. Use when a user wants to inspect existing mappings, get AI mapping suggestions, add manual mappings, or save approved Code Connect links for a Figma design system or component.
---

# Figma Code Connect

## Overview

Find, review, and save Code Connect mappings between Figma nodes and the local codebase. Separate discovery, suggestion, approval, and persistence so mappings stay deliberate and easy to audit.

## Workflow

1. Identify the target file key and node ID from the prompt or Figma URL.
2. Inspect the local codebase enough to know the framework and language labels to send with mapping calls. If they are genuinely unclear, pass `unknown`.
3. If the user wants to see current mappings, call `get_code_connect_map`.
4. If the user wants AI help, call `get_code_connect_suggestions` first.
5. Review the suggested mappings with the user before persisting them.
6. Save approved mappings with `send_code_connect_mappings`.
7. Use `add_code_connect_map` for a single direct mapping only when the desired source path and component name are already known and the user does not need a suggestion phase.

## Mapping Rules

- Prefer real component source paths over vague directories.
- Keep component names aligned with code exports or the team’s documented naming.
- When several mappings exist for different frameworks, use the correct `label` instead of overwriting unrelated mappings.
- If the user needs a full figmadoc template, provide `template` and `templateDataJson`; otherwise use simple component-browser mappings.

## Do Not Use This Skill For

- General design-to-code extraction without mapping intent.
- Direct layout or visual edits inside Figma unless the request explicitly includes Code Connect metadata changes.
- First-time webpage capture into Figma.

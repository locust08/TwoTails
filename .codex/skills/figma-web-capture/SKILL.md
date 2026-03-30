---
name: figma-web-capture
description: Capture webpages or HTML into Figma as design content. Use when a user wants to import, send, screenshot, or push a local or external web page into Figma for the first time.
---

# Figma Web Capture

## Overview

Capture a real webpage into Figma using the dedicated capture flow instead of rebuilding the page manually. Use this skill for first-time imports, then prefer direct Figma edits for follow-up refinements.

## Workflow

1. Identify whether the source is a local dev page, raw HTML, or an external URL.
2. For local projects, inspect the codebase to find the right route, startup command, and URL before calling the capture tool.
3. For external sites, use Playwright-based browsing and capture guidance instead of trying to open remote pages through generic page tools with hash fragments.
4. Call `generate_figma_design` without `outputMode` first so the tool can return the available capture options and instructions.
5. Start the capture using the chosen mode.
6. Poll with the returned `captureId` every 5 seconds, up to 10 times, until the status becomes `completed`.
7. Treat each `captureId` as single-use.
8. Share the resulting file key, claim URL, or completion state with the user.

## Output Rules

- Use `newFile` when the user needs a fresh Figma artifact.
- Use `existingFile` when the user wants to add the captured design into an existing file or node.
- Use `clipboard` only when the user specifically wants a paste-ready result.
- If the user does not specify a file name for `newFile`, generate one automatically instead of asking.

## Do Not Use This Skill For

- Ongoing edits to a page that has already been captured. Use `use_figma`.
- Pure design-node analysis from an existing Figma file. Use `get_design_context`.
- Code Connect mapping tasks.

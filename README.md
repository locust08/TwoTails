# TwoTails

Starter project built with Next.js, shadcn/ui, Lucide React, and optional Doppler-backed secrets.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS v4
- shadcn/ui configured with the `base-nova` preset
- Lucide React for icons
- Doppler for runtime secrets

## Local Setup

1. Start the app locally:

   ```bash
   npm run dev
   ```

2. If you need Doppler-managed secrets, log in:

   ```bash
   doppler login
   ```

3. Link this folder to the correct project and config if needed:

   ```bash
   npm run doppler:setup
   ```

4. Start the app through Doppler when secrets are required:

   ```bash
   npm run dev:doppler
   ```

The app will be available at `http://localhost:3000`.

## Scripts

- `npm run dev` runs Next.js locally without Doppler.
- `npm run build` runs the production build locally without Doppler.
- `npm run start` runs the production server locally without Doppler.
- `npm run dev:doppler` runs Next.js through Doppler.
- `npm run build:doppler` runs the production build through Doppler.
- `npm run start:doppler` runs the production server through Doppler.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript without emitting files.

## MCP Notes

- `~/.codex/config.toml` should include both `stitch` and `shadcn` MCP servers.
- After Codex config changes, restart Codex before using those MCP tools.
- `components.json` is already present and ready for standard shadcn registry usage.

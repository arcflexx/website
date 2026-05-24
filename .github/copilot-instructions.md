# Copilot instructions for Arcflex Athletics

## Commands

- `npm run dev` — start the local Next.js dev server
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — run ESLint

There is no test runner or `test` script in `package.json`, so there is no single-test command configured yet.
Playwright MCP is configured in `.vscode/mcp.json` for browser-based checks.

## Architecture

- This is a Next.js App Router app. Routes live under `app/`, with `app/layout.tsx` providing the shared shell and metadata.
- `app/layout.tsx` imports `app/globals.css` and renders the site-wide `Navbar` above every page.
- `app/components/Navbar.tsx` and `app/components/Hero.tsx` are client components; most route pages are server components with static markup.
- Commerce helpers live in `lib/ecommerce/`, with `lib/shopify.ts` kept as a compatibility wrapper and `lib/types.ts` exposing shared ecommerce types.
- CDS helpers live in `lib/cds/`; `CDS_PROVIDER` selects `local` or `aws`, and the AWS path is used to build CloudFront-friendly asset URLs.
- The storefront uses Tailwind classes directly in components, with shared reset/theme rules in `app/globals.css`.
- `next.config.ts` whitelists the fallback image host and any CDN host provided via `CDS_ASSET_BASE_URL`.
- Use the configured Playwright MCP server for browser checks when verifying UI behavior.

## Conventions

- Keep route pages aligned with the fixed navbar by preserving the existing `pt-24` top offset on full-page sections.
- Use `use client` only for interactive components that need hooks or browser APIs.
- When adding remote images, prefer `next/image` and update `next.config.ts` if the host is not already allowed.
- `ECOMMERCE_BACKEND` selects `shopify` or `test`; Shopify credentials are only required when the Shopify backend is active.
- `CDS_PROVIDER` selects `local` or `aws`; local CDS can use `CDS_HERO_VIDEO_URL`, while AWS CDS uses `CDS_ASSET_BASE_URL`.
- The Shopify backend throws when env vars are missing and surfaces GraphQL/user errors explicitly; keep that behavior when extending the API layer.
- The site’s visual language is minimalist black/white with light gray surfaces, large headings, and wide spacing.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Aurora is a React component library — the design system shared between two brands: **Consumidor Positivo (cp)** and **Acordo Certo (ac)**. It is published as `@consumidor-positivo/aurora` and consumed by external applications. The library entry point is [lib/main.ts](lib/main.ts).

## Commands

```bash
# Install dependencies
npm install

# Run Storybook (component explorer) — runs prebuild first
npm run storybook        # port 6006

# Run tests
npm test                 # run all tests once
npm run test:watch       # watch mode
npm run test:coverage    # with coverage report

# Run a single test file
npx vitest lib/components/Button/Button.test.tsx

# Lint
npm run lint

# Build the library (output to dist/)
npm run build

# Prebuild only (regenerate tokens + icons, required before build/dev/storybook)
npm run prebuild

# Regenerate only tokens or only icons
npm run tokens
npm run icons
```

## Prebuild: tokens and icons

**Always run `npm run prebuild` after changing token JSON files or adding/removing SVG icon files.**

- `npm run tokens` — reads `lib/core/tokens/*.json` and generates:
  - `lib/core/tokens/.cache/variables.scss` (SCSS variables)
  - `lib/core/tokens/.cache/tokens.ts` (exported TS constants)

- `npm run icons` — reads SVG files from `lib/assets/icons/<collection>/` and generates React components into `lib/components/icons/<collection>/`. The `default` collection uses `currentColor` for stroke/fill; other collections keep original colors.

Never edit files inside `lib/core/tokens/.cache/` or `lib/components/icons/` directly — they are fully generated.

## Architecture

### Component structure

Each component lives in `lib/components/<ComponentName>/` and typically contains:
- `index.tsx` — the component itself
- `styles.scss` — scoped styles, auto-injected into the build output via `vite-plugin-lib-inject-css`
- `types.ts` — shared types (when needed)
- `hooks.ts` — custom hooks (when needed)
- `*.stories.tsx` — Storybook stories
- `*.test.tsx` — Vitest + Testing Library tests

Components with brand variants (e.g., Footer, Logo) have `ac/` and `cp/` subdirectories.

### CSS conventions

All component classes use the `au-` prefix (e.g., `au-btn`, `au-icon`). Modifier classes follow BEM-like patterns: `au-btn--type-primary`, `au-btn--size-large`. SCSS token variables (e.g., `$color-brand-primary`) and mixins are globally injected by Vite via `additionalData` in [vite.config.ts](vite.config.ts) — no explicit imports needed in component SCSS files.

### Path aliases

| Alias | Resolves to |
|---|---|
| `@components` | `lib/components` |
| `@core` | `lib/core` |
| `@assets` | `lib/assets` |

These aliases work in both Vite (build/dev/Storybook) and Vitest.

### Build output

Vite builds in library mode, ES format only, with per-component code splitting. Each component gets its own `dist/components/<Name>/index.es.js` and `dist/components/<Name>/styles.css`. Icons each get their own entry: `dist/components/icons/<IconName>/index.es.js`. The global stylesheet (`GlobalStyles.scss`) is included in `dist/main.es.js`.

### Prototype components

`lib/components/Prototype/` contains experimental components (currently Carousel). These are exported under the `Prototype` namespace and require peer dependencies not bundled by default (`react-snap-carousel`).

### Design tokens

Token source files live in `lib/core/tokens/*.json`. Each file has a `name`, `desc`, and `items` map. The `items` keys become SCSS variables and TypeScript named exports (in `CONSTANT_CASE`). Token exports are re-exported from [lib/core/tokens/index.ts](lib/core/tokens/index.ts) which points to the generated cache.

## Testing

Tests use Vitest with jsdom and `@testing-library/react`. Setup is in `vitest.setup.ts`. Generated files (`lib/components/icons/default/**`, `lib/components/Logo/ac/**`, `lib/components/Logo/cp/**`) are excluded from test runs and coverage.

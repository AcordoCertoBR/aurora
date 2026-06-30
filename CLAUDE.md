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

## Skills

Project skills live in `.claude/skills/`. Each skill is a directory with a `SKILL.md` file and is invoked via `/<skill-name>`.

**Whenever you create a new skill** (i.e. write a new `.claude/skills/<name>/SKILL.md`), you must update `lib/docs/DevelopingWithAI.mdx` to include a section describing it — what it does, how to invoke it, and a usage example. This keeps the Storybook documentation in sync with the available skills.

## Testing

Tests use Vitest with jsdom and `@testing-library/react`. Setup is in `vitest.setup.ts`. Generated files (`lib/components/icons/default/**`, `lib/components/Logo/ac/**`, `lib/components/Logo/cp/**`) are excluded from test runs and coverage.

## Releases & commits

Versioning and `CHANGELOG.md` are automated by **release-please** (`.github/workflows/release.yml`) from the conventional commits merged into `main`. The commit/PR title type drives the bump: `feat:` → minor + npm publish, `fix:`/`refactor:` → patch + publish, `docs:`/`chore:`/`test:` → changelog only (no publish), breaking change (`feat!:` or `BREAKING CHANGE:`) → major. Since Aurora is consumed by external apps, changing public props, `au-` classes, or exported tokens is a **breaking change** — type the commit accordingly. The `/create-pr` skill encodes this.

## Onde achar o resto (ponteiros)

- **Referência longa & operação:** `docs/` — `docs/self-improvement.md` (protocolo que mantém os docs vivos) e `docs/observability.md` (onde investigar quando um componente quebra — Aurora é lib, não tem runtime próprio).
- **Docs de negócio:** `.ai-docs/services/aurora.md` (o que é o design system, em linguagem de negócio — lido por design/produto via MCP `github-readonly`) e `.ai-docs/missions/` (mudanças não-triviais em voo). Aprofundar com `/cp-ai-doc`.
- **Documentação no Storybook:** `lib/docs/*.mdx` (Configure, Patterns, Dependencies, Icons, DevelopingWithAI).
- **Subagents read-only:** `.claude/agents/` (`code-reviewer`, `explorer`).

## Contexto da organização (Consumidor Positivo)

Brain central: repo `AcordoCertoBR/claude-org-context` (consulte via GitHub MCP / org-skills `cp-*` quando precisar).
- Quem é dono de quê / qual squad / onde perguntar: `cp-org`. Convenções do brain: `cp-conventions`. Pilares de como o agente trabalha: `cp-pillars`.
- Definições de métrica governadas: `cp-metrics` (raramente aplicável a uma lib de UI; relevante só se tocar telemetria/eventos).
- As org-skills (`cp-*`) já estão no harness — não recrie contexto base aqui.
- Aurora é consumida por apps externos das duas marcas (cp/ac); trate o contrato público (props, classes `au-`, tokens) como compromisso versionado.

## Protocolo de auto-melhoria (OBRIGATÓRIO — ver `docs/self-improvement.md`)

Este setup é vivo. Ao trabalhar neste repo, mantenha-o verdadeiro:
- Mudou API/comportamento visível de um componente → atualize este `CLAUDE.md` e, se visível ao negócio/design, `.ai-docs/services/aurora.md` + changelog.
- Criou/alterou uma skill em `.claude/skills/` → atualize `lib/docs/DevelopingWithAI.mdx` (regra do repo; há hook que lembra).
- Descobriu gotcha/tech-debt → registre com `file:line` aqui.
- Doc contradiz o código → corrija o doc (docs envelhecem; verifique contra o source).
- Mudança não-trivial / missão → registro em `.ai-docs/missions/`.
- Faltou cobertura nesta estrutura (padrão novo) → registre em `docs/setup-gaps.md` e sinalize ao brain (skill `cp-repo-setup`).

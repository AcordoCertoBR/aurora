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

# Type check the .astro components (also runs in CI)
npm run check:astro

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
- `index.astro` — the Astro version of the same component (optional; see below)

Components with brand variants (e.g., Footer, Logo) have `ac/` and `cp/` subdirectories.

### Astro components

Aurora ships a second format of the same component for the static public pages
(the public pages monorepo): `@consumidor-positivo/aurora/astro/<Name>/index.astro`.
The `.astro` file lives in the component's own folder and reuses the same
`styles.scss` as the React one. Unlike the public pages monorepo, the controller is
**not** a separate `controller.ts` — it goes inline in the component's `<script>`,
using `elementController` from `@consumidor-positivo/aurora/astro/runtime`
(`lib/astro/runtime/`).

`.astro` files are published as **source** — Rollup cannot parse them, and
compiling them here would pin the package to one Astro version's internal
runtime — so they get no Vite entry. `viteStaticCopy` copies each one to
`astro/<path>/index.astro` **at the package root, not inside `dist`**, and rewrites
its `./styles.scss` import to the CSS Vite already emitted for the React component,
so the consumer needs no Sass configuration. The root path is deliberate: consumers
on `moduleResolution: "node"` ignore the `exports` field and resolve the specifier
as a real path on disk, so the physical path has to match the exported one. Only the
shared runtime is a real Vite entry (`dist/astro/runtime/`), reachable under the same
specifier through the `astro/runtime/package.json` proxy folder the build copies.

`astro.config.mjs` at the root exists only for this: Aurora is not an Astro site,
and `srcDir` points into `.astro/` so the files Astro generates stay out of the
repo root. `npm run check:astro` (`astro check`, gated in CI) type-checks the `.astro` files,
including the contents of their `<script>` tags. Props are typed with
`HTMLAttributes` from `astro/types`, never an open `[key: string]: unknown` index.
The runtime self-import resolves through a `tsconfig.json` path alias pointing at
`lib/astro/runtime`, so the check does not depend on a freshly built `dist`.

Astro has no callback props, so the `.astro` versions ship markup and initial
state and leave app-level behavior to the consumer (every HTML attribute is
forwarded, so an `id` or `data-*` is the hook); behavior that belongs to the
component itself, like the `Header.NavbarLink` dropdown, keeps its controller.
A page built only with Astro components must import the reset once, with
`import '@consumidor-positivo/aurora/global.css'` — it never loads the React
entry that carries `GlobalStyles`.

Today `Button`, `Text`, `Icon`, `Tabs` (+ `Tabs/TabPanel`), `Header` (+ its nine
parts) and `Footer` have an `.astro` version.
Full reference, conventions and gotchas: [docs/astro.md](docs/astro.md).

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

## Gotchas & tech debt

- No `exports` do `package.json`, a condição `types` tem que vir antes de `import`; com `import` na frente o subpath resolve como `any` no consumidor (`package.json:21`).
- `Button` React marca `@deprecated` na prop `type` para desencorajar só o valor `'link'`, e isso gera aviso em toda chamada (`lib/components/Button/index.tsx:29`). A versão Astro evita a tag; o React continua com o falso positivo.
- Componente Astro instalado via `npm install file:` quebra os `<script>` hoisted do Astro (`No cached compile metadata found`); teste sempre com `npm pack` + tarball (`docs/astro.md`).
- `Button` em Astro não tem `loading`: o spinner depende de um ícone React e os ícones ainda não têm versão Astro (`lib/components/Button/index.astro`).
- `Tabs` em Astro renderiza todos os painéis (esconde com `hidden`) e exige `active` explícito no `TabPanel` inicial (`lib/components/Tabs/TabPanel/index.astro:11`).
- `Checkbox.Field` não tem prop de posição do controle (`Radio.Field` tem `direction: 'left' | 'right'`); o Figma prevê `Position: Left | Right` para ambos.

## Onde achar o resto (ponteiros)

- **Referência longa & operação:** `docs/` — `docs/astro.md` (o formato Astro: onde mora, como é publicado, gotchas), `docs/self-improvement.md` (protocolo que mantém os docs vivos) e `docs/observability.md` (onde investigar quando um componente quebra — Aurora é lib, não tem runtime próprio).
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

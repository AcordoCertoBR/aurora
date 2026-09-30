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

# Astro playground: renders the .astro components from lib/ in a browser (port 4321)
npm run playground:astro        # runs prebuild first
npm run playground:astro:build  # static build of the same pages; also runs in CI

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

- `npm run icons` — reads SVG files from `lib/assets/icons/<collection>/` and generates, into `lib/components/icons/<collection>/`, a React component (`IconName.tsx`) **and** an Astro one (`IconName.astro`) per icon, plus the React barrel. The `default` collection uses `currentColor` for stroke/fill; other collections keep original colors. The Astro icons wrap `lib/components/Icon/index.astro`, the hand-written primitive that renders the `au-icon` div.

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

Components with brand variants (e.g., Footer, Logo) have `ac/` and `cp/` subdirectories. A compound component keeps each part in its own folder next to the root (`Header/Logo/index.tsx`, `Header/Navbar/index.tsx`), so the React part, the `.astro` version and any shared file sit together.

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
including the contents of their `<script>` tags. `playground/` is the Astro counterpart of
Storybook: a small Astro site (`npm run playground:astro`, its own `astro.config.mjs`) with one page
per component under `playground/src/pages/components/`, rendering the `.astro` files straight
from `lib/` through Vite aliases. CI builds it, which compiles every example page and catches
the compiler errors `astro check` misses. Props are typed with
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

Every visual component has an `.astro` version that renders and behaves
**exactly** like the React one, including all 20 `Logo/ac|cp` variants, the
`SelectField` and the `Datepicker` (whose calendar grid is a copy of what
`react-aria-components` 1.17 renders). React-only
utilities (`Transition`, `IsMobile`, `misc/*`) and `Prototype/Carousel` stay
React. Token values come from `@consumidor-positivo/aurora/astro/tokens` (the
generated tokens as their own entry), never hex: `lib/astro/tokens/tokens.test.ts`
fails on a hex literal in a `.astro`. The
`Drawer` and `Modal` have no `isOpen`: any element carrying
`data-au-drawer-toggle` / `data-au-modal-toggle="<id>"` opens them; callbacks
become `au:*` events emitted from the root. An `.astro` finds its CSS through
`recordEmittedStylesheets` in `vite.config.ts`, which reads the bundle (CSS
asset names collide for nested entries, so the path can't be derived).
Full reference, conventions and gotchas: [docs/astro.md](docs/astro.md).

Pairing is enforced: `lib/astro/parity/pairing.test.ts` fails when an
`index.tsx` that renders markup has no `index.astro` beside it, or an
`index.astro` has no React counterpart. React-only utilities are listed in
`REACT_ONLY` with the reason; `.astro` files whose React lives elsewhere
(`Header/index.astro` ↔ `Header/Wrap/index.tsx`, `Tabs/TabPanel`) in
`ASTRO_COUNTERPART`. The same test runs as the husky `pre-commit` hook
(`.husky/pre-commit`), so a commit with an unpaired component fails locally
before it reaches CI. Editing one side of a pair triggers the
`.claude/hooks/astro-parity-reminder.py` hook, which reminds the agent that the
other side needs the same change. `/create-component` scaffolds both formats
plus the playground page.

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

Vite builds in library mode, ES format only, with per-component code splitting. Each component gets its own entry, named after **its path** under `lib/components` — `dist/components/Header/Logo/index.es.js`, `dist/components/form/Field/Root/index.es.js` — so nested components with the same folder name (`Header/Logo` and `Logo`, the three `Field`s) stop overwriting each other in the entry map. Icons each get their own entry: `dist/components/icons/<IconName>/index.es.js`. The global stylesheet (`GlobalStyles.scss`) rides in `dist/main.es.js` and is also emitted on its own as `dist/components/globalStyles/styles.css`, exported as `@consumidor-positivo/aurora/global.css` for pages that only use the Astro components.

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
- `export type Props = Omit<` quebrado em várias linhas quebra o compilador do Astro no build (`Expected ">" but found "$$Index"`) e o `astro check` não pega; mantenha numa linha ou use alias (`lib/components/Chip/index.astro:7`).
- `.astro` não importa `lib/core` nem `.ts` irmão (só `.astro` é publicado). Token tem entry próprio (`astro/tokens`); helper não, então o `getInitialLetters` está copiado (`lib/components/ProfileNav/index.astro:16`).
- A paridade Astro × React foi provada com um harness fora do repo (React via `react-dom`, Astro via `experimental_AstroContainer`, controllers em jsdom); não roda no CI, então mudou um componente, confira os dois lados (`docs/astro.md`, Paridade com o React).
- Modal: o cabeçalho troca em 767px, mas o layout `full-screen` usa 600px (`belowMedium`); entre os dois sai SubHeader sem tela cheia, no React e no Astro (`lib/components/Modal/styles.scss`).
- `Tabs` em Astro renderiza todos os painéis (esconde com `hidden`) e exige `active` explícito no `TabPanel` inicial (`lib/components/Tabs/TabPanel/index.astro:11`).
- Passar `class:list` para um componente Astro da Aurora sobrescreve as classes internas dele (o Astro entrega a diretiva como prop crua). `Text`, `Button` e `Icon` mesclam; nos demais, use `class` (`lib/components/Text/index.astro:51`).
- CSS de componente Astro não pode depender de ordem de folha: regra de estado que dispute com classe de token do `Text` precisa compor a especificidade (`lib/components/NavbarVertical/styles.scss:26`).
- `Checkbox.Field` não tem prop de posição do controle (`Radio.Field` tem `direction: 'left' | 'right'`); o Figma prevê `Position: Left | Right` para ambos.
- `Header.Profile` Astro: o `span` do badge sem `count` carrega espaço em branco do template e sai com 18px em vez dos 12px do React (`lib/components/Header/Profile/index.astro:55`). Expressão de texto dentro de `span` pequeno tem que ficar na mesma linha das tags.
- Footer completo entre 768 e 1023px: o React decide o bloco de lojas e a borda dos certificados com `isMobile()` (767px), o Astro com o breakpoint de 1024px do CSS; nessa faixa os dois divergem (`lib/components/Footer/styles.scss:202`).
- Tabs React deixa 32px (24px no mobile) abaixo do painel quando a aba ativa não é a última: os painéis inativos são `div` vazias com `margin-top`. O Astro esconde com `hidden` e não tem o espaço (`lib/components/Tabs/styles.scss:68`).
- NavbarVertical: no React, clicar num link do dropdown também alterna o grupo; o controller Astro ignora esses cliques de propósito (`lib/components/NavbarVertical/Link/index.astro:94`).
- O `Icon` React descarta qualquer prop não declarada, inclusive o `aria-hidden="true"` que Drawer, Header, Alert, SubHeader, Modal e SpecialButton passam; o `Icon` Astro repassa. O atributo só existe no lado Astro (`lib/components/icons/Icon.tsx:34`).
- `Text` com `dangerouslySetInnerHTML` embrulha o HTML num `div` extra; o `html` do Astro injeta direto (`lib/components/Text/index.tsx:31`).
- Componente Astro passado com `slot="x"` espalha o atributo `slot` no HTML final via `...rest` (Icon, Logo, Text, Button). Inerte, mas aparece em 15 componentes; `NotificationsBar/List/index.astro:25` mostra como descartar.
- Paridade Astro × React medida em 28/09/2026 com um harness Playwright fora do repo (`~/Documents/aurora-parity-harness`): 666 comparações, relatório na página da missão no Notion.
- `SelectField` Astro lê a seleção inicial do `li` marcado com `--selected`, não do `<select hidden>`: um `<select>` sem `selected` devolve a primeira opção como valor, e o React trata isso como nada selecionado (`lib/components/form/SelectField/index.astro`, `selectedIndex`). Os `li` são atualizados no lugar, nunca recriados: um `li` novo sob o mouse parado dispara `mouseenter` e destaca a opção, o que o React (keyed por índice) não faz.
- `Modal` Astro: `portal` move o modal para o `body` na inicialização e `au:modalcontrol` (evento em `document`, `detail: { id, open }`) abre e fecha por código; é o que o `SelectField` usa no modo tela cheia (`lib/components/Modal/index.astro`).
- `Datepicker` Astro copia o DOM que o `react-aria-components` 1.17.0 gera para a grade (roles, `aria-label` por dia via `Intl`, `tabindex` circulante, `data-focused|selected|disabled|today|hovered|focus-visible|outside-month`, `data-rac`, anúncio em região `aria-live`). Subir o react-aria exige reconferir a paridade no harness (`lib/components/form/Datepicker/index.astro`).
- `Datepicker` Astro: as strings do calendário (rótulo do dia, "Hoje,", "Data selecionada:") vêm de uma cópia dos dicionários pt-BR e en-US do react-aria; outro idioma do navegador cai em en-US, enquanto o React tem todos os idiomas do react-aria. `defaultValue="now"` nasce vazio no HTML e o controller preenche o dia do navegador. `format` não tem contraparte (só DD/MM/YYYY).
- O foco no calendário React segue o `useEffect` da célula do react-aria: a célula que vira a focada rouba o foco de onde estiver (do próprio campo, inclusive, ao digitar uma data completa), menos na montagem, quando o foco do campo vence; um clique de mouse num dia não move o foco (`preventFocusOnPress`), e `data-focus-visible` some ao mover o mouse. O controller Astro replica cada uma dessas regras; mudar uma quebra a paridade.

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

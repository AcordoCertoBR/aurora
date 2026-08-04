# design-sync notes — Aurora

Repo-specific gotchas for syncing `@consumidor-positivo/aurora` to claude.ai/design.
Read this before re-running the sync.

## Setup / build

- Node: `.nvmrc` pins **20** (repo dev node is 24). Run every build with
  `export PATH="$HOME/.nvm/versions/node/v20.20.2/bin:$PATH"`.
- `npm run build` = `tsc && vite build` — it does **not** run `prebuild`.
  Run `npm run prebuild` (tokens + icons codegen) before building the reference
  storybook; `lib/core/tokens/.cache/` and `lib/components/icons/default|social/`
  are gitignored generated trees, so a fresh clone needs it.
- Converter entry: `--entry ./dist/main.es.js`, `--node-modules ./node_modules`
  (single-package repo, react at root).
- Reference storybook: `npx storybook build -c .storybook -o "$(git rev-parse --show-toplevel)/.design-sync/sb-reference"`.
  Do **not** use `npm run build-storybook` (writes to `storybook-static/`).

## CSS / fonts

- Aurora ships no single global stylesheet: `vite-plugin-lib-inject-css` emits
  one `styles.css` per component under `dist/components/<Name>/`. `cfg.cssEntry`
  is therefore left **unset** — the converter scrapes the compiled CSS out of
  the storybook build (`[CSS_FROM_STORYBOOK]`), which is the complete set.
- Brand fonts (**Lexend Deca**, **Source Sans 3**) are not shipped by the
  package — `.storybook/preview-head.html` loads them from Google Fonts. The
  converter picked that up as a remote stylesheet and `styles.css` carries the
  `@import url(...)`, so the families load at runtime (`[FONT_REMOTE]`, not
  `[FONT_MISSING]`). Aurora's contract is "host app provides the fonts".

## Story title → export mapping (`cfg.titleMap`)

Titles are `Components/<Name>` / `Components/form/<Name>`; the converter scans
segments right-to-left for a known export, so most resolve on their own.
The exceptions:

- `Datepicker: "DatepickerField"` — title says `Components/form/Datepicker`,
  the export is `DatepickerField`.
- `ConditionalComponents: null` — `Utilities/Conditional Components`
  (`Conditional`/`Case`/`Default`/`Else`) is control flow, not visual UI.
- `AC: null`, `CP: null` — excludes `Components/Logos/AC` and `/CP`.
  **Why null and not a remap:** `lib/components/Logo/index.tsx` exports the 20
  brand variants (`LogoPrimaryCP`, `LogoBadgetAC`, …) but **not** the base
  `Logo` wrapper, so no export matches those titles. Mapping `AC`/`CP` to a
  concrete export would also hijack `Components/Footer/AC` and `/CP` (same last
  segment) — with `null` the right-to-left scan skips past it and still lands on
  `Footer`. User decision (2026-08-04): leave Logo out of the sync rather than
  widen the lib's public API. To sync logos later, add
  `export { Logo } from './Logo'` to `lib/components/Logo/index.tsx` and switch
  to `"Logos": "Logo"`.

## Repo bugs found while syncing

- `lib/main.ts` exported `Image` via the `@components/Image` tsconfig alias.
  `unplugin-dts` doesn't rewrite aliases, so `dist/main.d.ts` shipped
  `export { Image } from '../../../../../../lib/components/Image'` — a path that
  escapes `dist/` and resolves nowhere. Consumers got no types for `Image`, and
  the converter (which reads exports from `main.d.ts`) dropped the component
  entirely. Fixed to `'./components/Image'`. **Every export in `lib/main.ts`
  must use a relative path** — aliases break the shipped `.d.ts`.

## Storybook addons the previews must account for

Aurora's stories lean on two storybook addons. Neither ships in the DS bundle,
so the preview render diverges from the reference unless handled:

- **`parameters.backgrounds`** — `[GENERAL]`. 37 story files use it, and some
  render WHITE content that is only visible because of it (`Button.Negative*`,
  `Spinner.Negative`, `ChipBanner` dark). The generated wrapper ignored it, so
  those cells were white-on-white while storybook looked correct.
  **Fix: `.design-sync/overrides/preview-gen-storybook.mjs`** (declared in
  `cfg.libOverrides`) — the fork resolves `backgrounds` the way the addon does
  (merged `values`, story-then-meta `default`, plus the built-in `light`
  `#F8F8F8` / `dark` `#333333` presets) and paints it behind the story. Do NOT
  fix this per-component with owned previews: an owned preview shadows the
  generated one forever, even after the fork is corrected.
  Side effect: the wrapper is `width: 100%`, which can push a story past its
  grid cell — that's what `cfg.overrides.AdBox.cardMode: "column"` is for.
- **`storybook-addon-pseudo-states`** (`parameters.pseudo`) — `[GENERAL]`,
  **not fixable**. Stories named `*Hover` / `*Pressed` force `:hover`/`:active`
  in the storybook build by rewriting CSS selectors. The DS's own CSS only has
  the real pseudo-classes, so the preview renders the base state. Those stories
  are graded **`close`** on purpose — the component render is identical, only
  the forced state is missing. Don't chase them.

## Known render warns

- `[FONT_REMOTE] "Source Sans 3", "Lexend Deca"` — expected; see CSS / fonts
  above. The families load from Google Fonts at runtime.
- `[GRID_OVERFLOW]` is resolved for every component via `cfg.overrides`
  (`AdBox`/`Footer`/`Tabs`/`Transition`/`Header` → `column`; `Drawer`/`Modal` →
  `single`). `escape` stays monitored, so a newly added portal story can
  re-flag — that's the check working, not a regression.

## Card presentation overrides (`cfg.overrides`)

The default grid card puts one story per cell at a 900x700 capture. Aurora needs four
kinds of exception, all already applied:

- `cardMode: "column"` — story renders wider than a grid cell (`[GRID_OVERFLOW] … wide`):
  `AdBox`, `Footer`, `Header`, `Tabs`, `Transition`. Every story is kept, one per row.
- `cardMode: "single"` + `primaryStory` — `position: fixed` content escapes any cell
  (`[GRID_OVERFLOW] … escape`): `Drawer` (→ `WithText`), `Modal` (→ `Default`).
- `viewport` — the story is taller than the 900x700 capture, so grading saw a cropped
  render: `Footer` (`900x2000`, the footer is ~1900px), `NavbarVertical` (`900x1000`, the
  CTAs were cut). **This is a grading-fidelity fix, not cosmetics** — without it the
  compare sheet silently hides the bottom of the component.
- `skip` — the story cannot render statically: `Header` skips
  `components-header-withposition--fixed` (`position: fixed` escapes even in column mode,
  and `Static` already covers the position axis); `Divider` skips
  `components-divider--invisible` (`state: "invisible"` renders nothing on purpose, so
  storybook itself returns an empty root → `sb-error`).

## Owned previews (`.design-sync/previews/`)

- **`Drawer.tsx`** — only the `BottomSheet` export is customised; everything else is the
  generated wrapper verbatim. `cardMode: "single"` wraps the card in a containing block, so
  the sheet's `position: fixed; bottom: 0` resolves against that wrapper instead of the
  viewport, and a content-height wrapper pinned the sheet to the TOP. The fix gives the cell
  an explicit `height: 540` so the wrapper is tall and the sheet lands at the bottom.
  `cfg.overrides.Drawer.viewport` does **not** substitute for this — it sizes the capture,
  not the containing block. If the generated wrapper changes upstream, re-derive this file
  from `.design-sync/.cache/previews/Drawer.tsx` and re-apply only the `BottomSheet` wrap.

## Re-sync risks

- The Google-Fonts `@import` in `styles.css` comes from
  `.storybook/preview-head.html`. If that file stops loading the fonts (or the
  URL changes), every design renders in a fallback font and nothing downstream
  catches it — re-check for `[FONT_MISSING]` / `[FONT_REMOTE]` after any change
  to `.storybook/`.
- `cfg.titleMap`'s `AC`/`CP` nulls depend on `Footer` staying a package export
  and on the right-to-left segment scan. A new story titled `.../<X>/AC` would
  be silently dropped.
- New components only appear if they have a story whose title's last matching
  segment equals a `lib/main.ts` export name. A component added to `main.ts`
  without a story gets no card.
- **Only partially verified — story caps.** Compare grades at most 6 stories per component
  by default. Fully covered: `Button` (28/28, run with `--max-stories 28`), `Text` (12/20),
  `Card` (10/10). Capped at 6 and therefore carrying ungraded tail stories:
  `Alert` (6/21), `BadgeState` (6/17), `Chip` (6/16), `Radio` (6/13), `Checkbox` (6/12),
  `SpecialButton` (6/12), `TextAreaField` (6/11), `InputField` (6/10), `EmailField` (6/9),
  `SelectField` (6/9), `Header` (6/14), `PasswordField` (6/7), `Skeleton` (6/7). Those
  components are treated as verified-by-upload on future syncs even though their tail
  stories were never individually judged — raise `--max-stories` if a tail story carries a
  variant worth proving.
- **`Footer` grade keys collide.** The AC and CP story files use identical display names
  (`Logged Out`, `Logged In`), and `.grade.json` is keyed by display name — so two stories
  share one verdict and cannot be graded apart. Both rows were judged from the sheet. If AC
  and CP ever diverge, rename one pair's stories to regain independent verdicts.
- **Accepted `close` verdicts** (deliberate, not unfinished):
  `Button` `*Hover`/`*Pressed` × 3 types (pseudo-states addon, not in the bundle);
  `ChipBanner` `WithTimer`/`Negative` (10s wall-clock timer, the two panels land on
  different points of the cycle); `Drawer` `BottomSheet` (card containment reference frame).
  Each has the full rationale in its `.design-sync/.cache/compare/<Name>.grade.json` note —
  but that cache is gitignored, so this list is the durable record.
- **What the build assumed:** node 20 (`.nvmrc`), the repo's `package-lock.json` via
  `npm ci`, playwright chromium build 1234 in `.ds-sync/`, and live network egress —
  `Card`, `Image` and `Footer` stories fetch remote images from
  `assets.consumidorpositivo.com.br` / `cdn.pixabay.com`, and the brand fonts come from
  Google Fonts. In a network-sandboxed shell those blank on **both** panels, so grades pass
  while real output differs (`[ASSETS_BLOCKED]`). Re-grade image-bearing components only
  from a shell with egress.
- `[REFERENCE_STALE?]` fires on any run that rebuilds the bundle without rebuilding
  `.design-sync/sb-reference`. Harmless when only `.design-sync/config.json` changed
  (config hashes are stamped into the bundle); rebuild the reference whenever `lib/` moved.

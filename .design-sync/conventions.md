## How to build with Aurora

Aurora is the shared design system of two Brazilian brands — **Consumidor Positivo** and
**Acordo Certo**. UI copy is **pt-BR**. There is **no provider, no theme context and no
`ThemeProvider`**: components are styled entirely by `styles.css`, so linking that one file
is the whole setup. If a rendered screen looks unstyled or falls back to a system font,
`styles.css` is missing — it is what pulls in the brand fonts (**Lexend Deca** for
titles/headings, **Source Sans 3** for body) plus every component's CSS.

### The styling idiom: props, not classes

Aurora is a **prop-driven** system. Component CSS classes (`au-btn`, `au-text--heading-big`,
`au-card__root`, …) are generated internally from props — never hand-write an `au-*` class,
and never invent a new one: no stylesheet defines it, so it silently does nothing. Reach for
the prop instead.

- **Typography goes through `Text`**, not raw `<h1>`/`<p>`. Its `variant` is the type scale:
  `display-large` `display-medium` `display-small` · `heading-big` `heading-large`
  `heading-medium` `heading-small` `heading-minimum` `heading-micro` `heading-nano` ·
  `body-big` `body-large` `body-medium` (default) `body-small` · `caption`.
  Plus `weight` (`regular` `medium` `semibold` `bold` `light`), `color`
  (`common` `secondary` `white`), `as` (any HTML tag), and `variantDesk` for a different
  desktop step.
- **Buttons** carry their design language in `type` (`primary` `outlined` `ghost` `link`),
  `size` (`medium` `large`), and the booleans `negative` (for brand-colored backgrounds),
  `round` (icon-only), `loading`, `disabled`, `expand="x"` (full width).
- **Compound components** are namespaced objects — compose the parts, don't nest raw divs:
  `Card.Root` / `Card.Container` / `Card.Item` / `Card.Group` / `Card.Image` / `Card.Tag` /
  `Card.Emphasis`; `Header.Root` / `.Logo` / `.Actions` / `.Navigation` / `.Navbar` /
  `.NavbarLink` / `.Profile` / `.Hamburger` / `.Badges` / `.Button` / `.Group` / `.Item`;
  `Checkbox.Field` / `.Group` / `.Item`; `Radio.Field` / `.Group` / `.Item`;
  `NotificationsBar.Root` / `.List` / `.Group` / `.Item` / `.Link`.
  `Card.Container` takes flex props directly: `direction`, `alignItems`,
  `justifyContent`, `gap`.
- **Status-bearing components take `status`, not `type`** — `BadgeState`
  (`success` `error` `warning` `info` `neutral` `support`, plus `variant`:
  `regular` `strong`) and `BadgeInfo` (`success` `error` `warning` `info` `progress`
  `neutral`, plus `color`: `primary` `secondary`). The two lists are **not** identical.
  `type` belongs to `Button` (`primary`/`outlined`/`ghost`/`link`) and `ChipBanner`
  (`play`/`pause`). Check the `.d.ts` rather than assuming.

### Tokens for your own layout glue

For spacing and color *around* Aurora components, read the design tokens off the same global
rather than hardcoding hex or px. They are plain string exports (CSS values), so they drop
straight into inline styles:

```jsx
const { COLOR_NEUTRAL_10, SPACING_400, BORDER_RADIUS_MEDIUM } = window.ConsumidorPositivoAurora;
```

- **Color** — `COLOR_NEUTRAL_00`…`_70` (00 = white), `COLOR_BRAND_BLUE_00`…`_60`
  (CP brand; `_40` is the primary blue), `COLOR_BRAND_EMERALD_10`…`_60`,
  `COLOR_BRAND_CYAN_10`…`_60`, and feedback ramps `COLOR_SUCCESS_*`, `COLOR_ERROR_*`,
  `COLOR_WARNING_*`, `COLOR_INFO_*` (each `_00`…`_60`).
- **Spacing** — `SPACING_050` `SPACING_100` `SPACING_200` … `SPACING_900`.
- **Radius** — `BORDER_RADIUS_SMALL` `_MEDIUM` `_BIG` `_PILL`.
- **Shadow** — `SHADOW_01`…`SHADOW_04`. **Opacity** — `OPACITY_00`…`OPACITY_40`.
- **Type** — `FONT_TITLE`, `FONT_BODY`, `FONT_SIZE_H1`…`H6`, `FONT_SIZE_P1`…`P4`,
  `FONT_WEIGHT_REGULAR|MEDIUM|SEMIBOLD|BOLD`.
- **Breakpoints** — `BREAKPOINT_XSM` `SM` `MD` `LG` `XLG`, and `CONTAINER_SIZE`.

`Container` is the page-width wrapper — use it instead of your own max-width rule.

Note: Aurora compiles token values straight into its CSS, so it defines **no `var(--*)`
custom properties** and the project's `tokens/` directory is empty. The JS constants above
are the only token surface — don't look for a token stylesheet.

### Where the truth lives

Read `styles.css` and its imports (`_ds_bundle.css`) before writing any styling, and
`components/<group>/<Name>/<Name>.prompt.md` + `<Name>.d.ts` before using a component — the
real files always beat this summary. Groups are `components/` (29), `form/` (8) and `utils/`
(1). Logos are exported but have no card: use them by name —
`LogoPrimaryCP`, `LogoPrimaryAC`, `LogoBadgetCP`, `LogoBadgetAC`, and the white/negative
variants (`LogoPrimaryWhiteAC`, `LogoPrimaryFullWhiteCP`, …).

### An idiomatic build

```jsx
const {
  Container, Card, Text, Button, BadgeState,
  SPACING_400, COLOR_NEUTRAL_00,
} = window.ConsumidorPositivoAurora;

function OfferCard() {
  return (
    <Container>
      <Card.Root>
        <Card.Container gap={16}>
          <BadgeState status="success">Chance alta de aprovação</BadgeState>
          <Text as="h2" variant="heading-large" weight="bold">Cartão sem anuidade</Text>
          <Text variant="body-medium" color="secondary">
            Peça em minutos e acompanhe pelo app.
          </Text>
          {/* layout glue: tokens, never hardcoded values, never invented au-* classes */}
          <div style={{ display: 'flex', gap: SPACING_400, background: COLOR_NEUTRAL_00 }}>
            <Button type="primary" expand="x">Pedir cartão</Button>
            <Button type="outlined">Ver detalhes</Button>
          </div>
        </Card.Container>
      </Card.Root>
    </Container>
  );
}
```

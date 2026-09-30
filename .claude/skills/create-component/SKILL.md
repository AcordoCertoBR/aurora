---
name: create-component
description: Creates the full structure of a new Aurora component — index.tsx, styles.scss, stories, the Astro version (index.astro) and its playground page — following the project's conventions
---

# Create Aurora Component

Create a new component for the Aurora library based on the information provided by the user. Aurora ships every visual component in two formats that must render the same DOM: React (`index.tsx`) and Astro (`index.astro`). A component is not done until both exist; `lib/astro/parity/pairing.test.ts` fails otherwise.

Before creating any file, read `lib/docs/Patterns.mdx` to ensure all patterns are followed, and `docs/astro.md` (sections "Paridade com o React", "Adicionando um componente novo" and "Gotchas") for the Astro side.

If the component name or its props have not been provided, ask for that information before proceeding.

---

## Files to create

Create the 4 files below in `lib/components/<ComponentName>/`, plus one page in `playground/src/pages/components/`.

---

### 1. `index.tsx`

Follow the patterns from `lib/docs/Patterns.mdx`:

**React**
- Always use **named exports** — never `export default`
- For components with sub-parts, use the **composition** pattern: define `Root` and sub-components, export as an object `{ Root, SubComp }` with the component name
- Internal (private) functions must be prefixed with `_`

**TypeScript**
- Use **`type`** to type props — never `interface`
- Name the type as `<Name>Props`

**CSS**
- Import `classNames` from `classnames` to build conditional classes
- Import `'./styles.scss'`
- All CSS classes must have the `au-` prefix following BEM:
  - Block: `au-name`
  - Element: `au-name__element`
  - Modifier: `au-name--modifier`

**Imports**
- Use path aliases: `@components`, `@core`, `@assets`

Base structure:

```tsx
import classNames from 'classnames'
import './styles.scss'

export type <Name>Props = {
  // props
}

export const <Name> = ({ /* props */ }: <Name>Props) => {
  const classes = classNames('au-<name>', {
    [`au-<name>--<modifier>`]: !!prop,
  })

  return (
    <div className={classes}>
      {/* JSX */}
    </div>
  )
}
```

---

### 2. `styles.scss`

- Root class: `.au-<name-in-kebab-case>`
- BEM: `&__element` for children, `&--modifier` for variants
- Maximum **2 levels** of nesting
- For modifiers that affect children, prefer:
  ```scss
  .au-name {
    &--modifier &__child { }
  }
  ```
  or, for larger blocks:
  ```scss
  .au-name {
    &--modifier {
      .au-name__child { }
    }
  }
  ```
- **Do not import** variables or mixins — they are globally injected by Vite
- Create the class structure for all received props (even without defined style values)

---

### 3. `<Name>.stories.tsx`

Required boilerplate — follow this pattern exactly:

```tsx
import { Meta, StoryObj } from '@storybook/react'
import { <Name>, <Name>Props } from '.'

const meta: Meta<<Name>Props> = {
  title: 'Components/<Name>',
  component: <Name>,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof <Name>>

const container = (args: <Name>Props) => {
  return <<Name> {...args} />
}
```

**Story generation:**
- Create one story for each relevant union prop value (e.g. each `status`, each `type`, each `size`)
- For combinations of two variant props, cover the most representative ones — no need to cover every combination
- Name stories in descriptive PascalCase: `SuccessSmall`, `ErrorWithAction`, `NeutralReadOnly`
- Format for each story:

```tsx
export const <StoryName>: Story = {
  render: (args) => container(args),
  args: {
    // only the props relevant to this story
  },
}
```

---

### 4. `index.astro`

The Astro version renders **exactly** what `index.tsx` renders: same tags, same `au-` classes, same attributes and text, with the same props. Write it from the finished `index.tsx`, prop by prop, and translate only what the format forces you to:

- **Props** are typed with `HTMLAttributes` from `astro/types`, never an open index signature. Export them as `Props`. Keep `Omit<...>` on one line (a multi-line `Omit<` breaks the Astro compiler and `astro check` does not catch it).
- **Callback props do not exist** (`onClick`, `onChange`). Drop them: every HTML attribute is forwarded through `...rest`, so the consumer hooks an `id` or `data-*`. Behavior that belongs to the component itself is emitted as an `au:<name>` event from the root.
- **`ReactNode` props become slots**: `children` is `<slot />`, `icon` is `<slot name="icon" />`. Test presence with `Astro.slots.has('icon')`.
- **Classes**: destructure `class: className` from `Astro.props` and build with `class:list`, mirroring the `classNames` call.
- **Colors** come from `@consumidor-positivo/aurora/astro/tokens` (the generated constants), never a hex literal; `lib/astro/tokens/tokens.test.ts` fails on hex.
- **Boolean `false` attributes are not rendered**: where `"false"` matters for accessibility, pass the string (`aria-selected={active ? 'true' : 'false'}`).
- **Sibling `.ts` files are not published**: an `.astro` cannot import `./types.ts`, `./hooks.ts` or `lib/core`. Inline the types; if a helper is needed, copy it with a comment pointing at the source.
- **Behavior** (state, timers, toggles) goes in a `<script>` at the end using `elementController` from `@consumidor-positivo/aurora/astro/runtime`, keyed by a `data-element="au-<name>"` on the root. Port the hook step by step; the DOM after the controller runs must match the React DOM after render.
- Document the differences from React in a JSDoc block above `Props` (see `lib/components/Alert/index.astro` and `lib/components/Chip/index.astro`).

Base structure (no behavior):

```astro
---
import type { HTMLAttributes } from 'astro/types'
import './styles.scss'

/**
 * Differences from React:
 * - `onClick` has no counterpart: forward an `id` or `data-*` and listen on it.
 * - `icon` is the `icon` slot.
 */
export type Props = HTMLAttributes<'div'> & {
  // same props as <Name>Props, minus callbacks and ReactNodes
}

const { /* props with the same defaults as index.tsx */ class: className, ...rest } = Astro.props
---

<div
  class:list={['au-<name>', prop && 'au-<name>--<modifier>', className]}
  {...rest}>
  <slot />
</div>
```

With behavior, add to the root `data-element="au-<name>"` and:

```astro
<script>
  import { elementController } from '@consumidor-positivo/aurora/astro/runtime'

  elementController('au-<name>', ({ root, on, emit }) => {
    on('click', () => {
      // same state change the React hook makes
      emit('au:<name>change', { /* detail */ })
    })
  })
</script>
```

---

### 5. `playground/src/pages/components/<name>.astro`

The playground is the Astro counterpart of Storybook, and CI builds it (that build catches compiler errors `astro check` misses). One page per component, lowercase file name, one `Example` per story created in step 3, with the same props:

```astro
---
import Layout from '../../layouts/Layout.astro'
import Example from '../../components/Example.astro'
import <Name> from '@components/<Name>/index.astro'
---

<Layout title="<Name>" description="<one line, same idea as the stories>">
  <Example name="<story name>"><<Name> prop="value">Texto</<Name>></Example>
  <Example name="<other story>" bg="dark"><<Name> negative /></Example>
</Layout>
```

The index lists the page by itself. Add a one-line description for it in the `descriptions` map of `playground/src/pages/index.astro`.

---

## After creating the files

1. List the created files with their full paths
2. Add the component export in `lib/main.ts`, under the `// Components` section, at the end of the other component exports:
   ```ts
   export { <Name> } from './components/<Name>'
   ```
3. Verify both formats:
   ```bash
   npx vitest run lib/astro/parity          # both sides exist
   npm run check:astro                      # types and <script> of the .astro
   npm run playground:astro:build           # the example page compiles
   ```
4. Open the story and the playground page side by side (`npm run storybook`, `npm run playground:astro`) and compare the rendered DOM for each example: tags, `au-` classes, attributes and text must match. Fix the `.astro`, not the React, when they differ.

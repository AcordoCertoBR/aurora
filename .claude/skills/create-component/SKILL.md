---
name: create-component
description: Creates the full structure of a new Aurora component — index.tsx, styles.scss, stories and Code Connect template (.figma.ts) — following the project's conventions
---

# Create Aurora Component

Create a new React component for the Aurora library based on the information provided by the user.

Before creating any file, read `lib/docs/Patterns.mdx` to ensure all patterns are followed.

If the component name or its props have not been provided, ask for that information before proceeding.

---

## Files to create

Create the 4 files below in `lib/components/<ComponentName>/`.

> **Regra de nascimento duplo:** todo componente novo nasce com um template
> Code Connect (`<Name>.figma.ts`) apontando para o component set correspondente
> no Figma "Aurora DS" (fileKey `mJ6TJpnbZZYLiGXYnpg84b`). Se a página ainda não
> existe no Figma, crie o arquivo mesmo assim com um `TODO` no comentário `url=`
> e registre o gap — o design cria a página e o node id é preenchido depois.

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

### 4. `<Name>.figma.ts` — Code Connect template

Template **parserless** que mapeia o component set do Figma ao componente
(fica fora do build/lint — nada o importa). Estrutura:

```ts
// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=<node-id>
// source=lib/components/<Name>/index.tsx
// component=<Name>
import figma from 'figma'
const instance = figma.selectedInstance

// Um get* por propriedade do Figma (nomes exatos, case-sensitive):
// TEXT → instance.getString('Label')
// VARIANT → instance.getEnum('Type', { Primary: 'primary', ... }) — mapear TODOS os valores
// BOOLEAN → instance.getBoolean('Show Icon')
// INSTANCE_SWAP → instance.getInstanceSwap('Switch Icon') + executeTemplate()
// Estados só de CSS (Hover/Focus/Pressed) mapeiam para o render default.

export default {
  example: figma.code`<<Name> ... />`,
  imports: ["import { <Name> } from '@consumidor-positivo/aurora'"],
  id: '<name-kebab>',
  metadata: { nestable: true },
}
```

- Descubra o node id e as propriedades do set via MCP do Figma
  (`get_context_for_code_connect`) ou peça a URL ao usuário.
- Só emita props que existem no type `<Name>Props` — se uma propriedade do
  Figma não tem correspondente no código, omita (e registre o gap).
- Se a página no Figma ainda não existe, crie o arquivo com `TODO` no
  comentário `url=` (regra de nascimento duplo).

---

## After creating the files

1. List the 4 created files with their full paths
2. Add the component export in `lib/main.ts`, under the `// Components` section, at the end of the other component exports:
   ```ts
   export { <Name> } from './components/<Name>'
   ```
3. Publique o vínculo no Figma via MCP (`send_code_connect_mappings`) quando o
   node id existir — o template completo é publicado depois via CLI
   (`figma connect publish`).

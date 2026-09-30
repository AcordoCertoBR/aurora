import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// Every visual component ships in two formats that must stay in step: the
// React `index.tsx` and the Astro `index.astro` beside it (docs/astro.md,
// "Paridade com o React"). This test fails the moment one side exists without
// the other, so a new component cannot land React-only and an `.astro` cannot
// outlive the React it mirrors. Icons and Logo variants are generated or
// hand-paired elsewhere and stay out.
const COMPONENTS = resolve(__dirname, '../../components')

const reactSources = import.meta.glob<string>(
  [
    '../../components/**/index.tsx',
    '!../../components/icons/**',
    '!../../components/Logo/**',
  ],
  { query: '?raw', import: 'default', eager: true },
)

const astroFiles = Object.keys(
  import.meta.glob([
    '../../components/**/index.astro',
    '!../../components/icons/**',
    '!../../components/Logo/**',
  ]),
)

/**
 * React utilities that have no Astro version on purpose. The key is the folder
 * under `lib/components`; the value is the reason, for the reader.
 */
const REACT_ONLY: Record<string, string> = {
  IsMobile: 'runtime helper, not markup',
  Transition: 'React-only animation wrapper',
  'Prototype/Carousel': 'experimental, depends on react-snap-carousel',
  'misc/DynamicTagComponent':
    'React helper for a dynamic tag; Astro components pick the tag inline (`as`)',
  'form/Datepicker/PortalHolder':
    'React portal target; the Astro Datepicker mounts its own #au-portal',
  'Header/Wrap': 'the Astro root is Header/index.astro (see ASTRO_COUNTERPART)',
}

/**
 * `.astro` files whose React counterpart is not a sibling `index.tsx`. The
 * value is the React file that renders the same markup, relative to
 * `lib/components`.
 */
const ASTRO_COUNTERPART: Record<string, string> = {
  Icon: 'icons/Icon.tsx',
  Header: 'Header/Wrap/index.tsx',
  'Tabs/TabPanel': 'Tabs/index.tsx',
  'NavbarVertical/Link': 'NavbarVertical/index.tsx',
  'NotificationsBar/Link': 'NotificationsBar/index.tsx',
  'NotificationsBar/List': 'NotificationsBar/index.tsx',
}

// A barrel (`export { components as Card }`) only re-exports its parts, which
// are paired on their own. Anything that returns JSX (or calls
// `React.createElement`, like LazyImage) is a component.
const RENDERS_MARKUP = /(?:return|=>)\s*\(?\s*<|className=|React\.createElement\(/

const toKey = (path: string) =>
  dirname(path.replace(/^(\.\.\/)+components\//, ''))

const reactComponents = Object.entries(reactSources)
  .filter(([, source]) => RENDERS_MARKUP.test(source))
  .map(([path]) => toKey(path))

const astroComponents = astroFiles.map(toKey)

describe('every React component has its Astro version', () => {
  it('finds the components', () => {
    expect(reactComponents.length).toBeGreaterThan(50)
    expect(astroComponents.length).toBeGreaterThan(50)
  })

  it('has an index.astro beside every index.tsx that renders markup', () => {
    const missing = reactComponents.filter(
      (key) => !(key in REACT_ONLY) && !astroComponents.includes(key),
    )
    expect(
      missing,
      `Components without lib/components/<name>/index.astro. Write the Astro version (docs/astro.md, "Adicionando um componente novo") or, if the component is React-only by design, list it in REACT_ONLY with the reason.`,
    ).toEqual([])
  })

  it('keeps REACT_ONLY honest: each entry exists and still has no index.astro', () => {
    const stale = Object.keys(REACT_ONLY).filter(
      (key) => !reactComponents.includes(key) || astroComponents.includes(key),
    )
    expect(
      stale,
      'Entries in REACT_ONLY that no longer match a React-only component. Remove them.',
    ).toEqual([])
  })

  it('has a React counterpart for every index.astro', () => {
    const orphans = astroComponents.filter((key) => {
      if (reactComponents.includes(key)) return false
      const counterpart = ASTRO_COUNTERPART[key]
      return !counterpart || !existsSync(resolve(COMPONENTS, counterpart))
    })
    expect(
      orphans,
      'Astro components with no React file rendering the same markup. Pair them or map them in ASTRO_COUNTERPART.',
    ).toEqual([])
  })

  it('keeps ASTRO_COUNTERPART honest: each entry is an Astro file without a sibling index.tsx', () => {
    const stale = Object.keys(ASTRO_COUNTERPART).filter(
      (key) => !astroComponents.includes(key) || reactComponents.includes(key),
    )
    expect(
      stale,
      'Entries in ASTRO_COUNTERPART that now have a sibling index.tsx or no index.astro. Remove them.',
    ).toEqual([])
  })
})

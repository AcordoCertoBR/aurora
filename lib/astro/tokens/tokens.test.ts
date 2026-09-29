import { describe, expect, it } from 'vitest'

// The `.astro` components take token values from
// `@consumidor-positivo/aurora/astro/tokens`, the same generated constants the
// React components use. A hex literal in one of them is a copy that drifts the
// day the token changes. Logo variants inline the brand SVG and the icons are
// generated from SVG files, so both are left out.
const sources = import.meta.glob<string>(
  [
    '../../components/**/*.astro',
    '!../../components/icons/**',
    '!../../components/Logo/**',
  ],
  { query: '?raw', import: 'default', eager: true },
)

const HEX_LITERAL = /['"`]#[0-9a-fA-F]{3,8}['"`]/

describe('astro components use the token entry for colors', () => {
  it('finds the astro components', () => {
    expect(Object.keys(sources).length).toBeGreaterThan(50)
  })

  it.each(Object.entries(sources))('%s has no hardcoded hex color', (_file, source) => {
    expect(source).not.toMatch(HEX_LITERAL)
  })
})

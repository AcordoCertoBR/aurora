import { describe, expect, it } from 'vitest'
import pkg from '../../package.json'

describe('globalStyles entry', () => {
  // `main.es.js` reaches the reset through this JS file, which only imports
  // its CSS. Outside `sideEffects`, the app bundler drops it in production and
  // pages lose the reset and the body font (dev keeps it, so it hides there).
  it('is declared as a side effect', () => {
    expect(pkg.sideEffects).toContain(
      './dist/components/globalStyles/index.es.js',
    )
  })
})

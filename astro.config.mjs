import { defineConfig } from 'astro/config'

// Aurora is a component library, not an Astro site. This config exists only so
// `npm run check:astro` can type-check the .astro components. `srcDir` keeps the
// files Astro generates (`env.d.ts`) inside `.astro/`, out of the repo root.
export default defineConfig({
  srcDir: './.astro/src',
})

import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'astro/config'

// The playground is a tiny Astro site that renders the `.astro` components
// straight from `lib/`, so a change can be seen in a browser without building
// and packing the library. It is the Astro-side equivalent of Storybook.
//
// Run it from the repo root: `npm run playground:astro`. The aliases mirror the
// `tsconfig.json` paths (Astro only picks those up with a `baseUrl`, which the
// library tsconfig does not set): `@components` and `@core` point at the
// source, and the `@consumidor-positivo/aurora/astro/*` self-imports of the
// components resolve to the runtime and tokens source, not to a built `dist`.
const repoRoot = fileURLToPath(new URL('..', import.meta.url))
const fromRoot = (path) => resolve(repoRoot, path)

export default defineConfig({
  srcDir: './playground/src',
  outDir: './playground/dist',
  server: { port: 4321 },
  vite: {
    resolve: {
      alias: {
        '@components': fromRoot('lib/components'),
        '@core': fromRoot('lib/core'),
        '@assets': fromRoot('lib/assets'),
        '@consumidor-positivo/aurora/astro/runtime': fromRoot('lib/astro/runtime'),
        '@consumidor-positivo/aurora/astro/tokens': fromRoot('lib/core/tokens'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Same injection as `vite.config.ts`: the component SCSS uses the
          // token variables and mixins without importing them.
          api: 'modern-compiler',
          loadPaths: [repoRoot],
          additionalData: `
            @use "lib/core/tokens/.cache/variables.scss" as *;
            @use "lib/core/styles/mixins.scss" as *;
          `,
        },
      },
    },
  },
})

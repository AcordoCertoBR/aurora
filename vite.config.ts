import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import dotenv from 'dotenv'
import pkg from './package.json'
import { resolve, dirname, basename, parse, relative, sep } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import glob from 'glob'
import { viteStaticCopy } from 'vite-plugin-static-copy'

dotenv.config()

// Filled by `recordEmittedStylesheets` in `generateBundle`, before the copy
// transform reads it in `writeBundle`. Source `styles.scss` → emitted CSS files.
const stylesheetMap = new Map<string, string[]>()

process.env['VITE_LIB_VERSION'] = pkg.version

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
        globalStyles: resolve(__dirname, 'lib/core/styles/globalStyles.ts'),
        'astro/runtime': resolve(__dirname, 'lib/astro/runtime/index.ts'),
        // The same generated tokens the React components import, for the
        // `.astro` frontmatter: only `.astro` files ship as source, so they
        // cannot reach `lib/core` the way the React components do.
        'astro/tokens': resolve(__dirname, 'lib/core/tokens/index.ts'),
        ...getComponentsEntries(),
      },

      fileName: (format, entryName) => {
        const isMainFile = entryName === 'main'
        const isAstroFile = entryName.startsWith('astro/')
        const isIconFile = entryName.startsWith('Icon') && entryName !== 'Icon'
        if (isMainFile) return `main.${format}.js`
        if (isAstroFile) return `${entryName}/index.${format}.js`
        if (isIconFile) {
          return `components/icons/${entryName}/index.${format}.js`
        }
        return `components/${entryName}/index.${format}.js`
      },
      name: 'aurora',
      formats: ['es'],
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: ({ name }) => {
          const isCSS = name.endsWith('.css')
          return isCSS && 'components/[name]/styles[extname]'
        },

        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
    sourcemap: true,
    minify: 'terser',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@assets': '/lib/assets',
      '@components': '/lib/components',
      '@core': '/lib/core',
    },
  },
  plugins: [
    react(),
    dts({
      include: ['lib'],
      exclude: ['**/*.stories.tsx', '**/*.test.ts', '**/*.test.tsx'],
    }),
    libInjectCss(),
    recordEmittedStylesheets(),
    viteStaticCopy({
      targets: [
        {
          src: 'lib/components/**/*.astro',
          dest: '../astro',
          rename: (_name, _ext, fullPath) => relativeToComponents(fullPath),
          transform: (content, filePath) =>
            pointAstroStylesToBuiltCss(content, filePath),
        },
        {
          // Proxy folder so `@consumidor-positivo/aurora/astro/runtime` also
          // resolves for consumers on `moduleResolution: "node"`, which ignores
          // the `exports` field and needs a real directory on disk.
          src: 'lib/astro/runtime/package.proxy.json',
          dest: '../astro/runtime',
          rename: () => 'package.json',
        },
        {
          src: 'lib/astro/tokens/package.proxy.json',
          dest: '../astro/tokens',
          rename: () => 'package.json',
        },
        {
          src: 'lib/core/styles/mixins.scss',
          dest: '.',
          transform: (content) =>
            content
              .toString()
              .replace('../tokens/.cache/variables.scss', './variables.scss'),
        },
        {
          src: 'lib/core/tokens/.cache/variables.scss',
          dest: '.',
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: ['.'],
        additionalData: `
          @use "lib/core/tokens/.cache/variables.scss" as *;
          @use "lib/core/styles/mixins.scss" as *;
        `,
      },
    },
  },
})

// Resolved on call, not at module scope: `getComponentsEntries()` runs while
// the config object is still being evaluated, before a `const` up here exists.
function relativeToComponents(fullPath: string) {
  const componentsDir = resolve(__dirname, 'lib/components')
  return relative(componentsDir, fullPath).split(sep).join('/')
}

/**
 * Maps each component's source `styles.scss` to the CSS Vite emitted for it, so
 * a `.astro` file can import any component stylesheet by its source path and get
 * the built one in the published package.
 *
 * Read from the bundle, not derived from the entry name: CSS assets are named
 * after the chunk's basename, so nested entries collide and get numbered in
 * build order (`form/Field`, `Checkbox/Field` and `Radio/Field` all land in
 * `Field/styles{,2,3}.css`), and a stylesheet shared by a barrel lands in
 * whatever chunk the bundler picked.
 */
function recordEmittedStylesheets(): Plugin {
  const componentsDir = resolve(__dirname, 'lib/components')
  return {
    name: 'aurora:record-emitted-stylesheets',
    generateBundle(_options, bundle) {
      stylesheetMap.clear()
      Object.values(bundle).forEach((output) => {
        if (output.type !== 'chunk') return
        const emitted = [...(output.viteMetadata?.importedCss ?? [])]
        if (!emitted.length) return
        output.moduleIds
          .filter(
            (id) =>
              id.startsWith(componentsDir) && basename(id) === 'styles.scss',
          )
          .forEach((id) => {
            const files = stylesheetMap.get(id) ?? []
            emitted.forEach((file) => files.includes(file) || files.push(file))
            stylesheetMap.set(id, files)
          })
      })
    },
  }
}

/**
 * `.astro` files ship as source, so their stylesheet imports have to resolve
 * inside the published package. In the repo they import the same `styles.scss`
 * the React components use; here those become the CSS Vite already emitted,
 * which is what spares the consumer any Sass configuration. An import with no
 * emitted counterpart is dropped (a part that inherits the parent's styles).
 */
function pointAstroStylesToBuiltCss(content: string, filePath: string) {
  const copiedDir = resolve(
    __dirname,
    'astro',
    dirname(relativeToComponents(filePath)),
  )

  return content.replace(
    /^import (['"])(\.[^'"]*\.scss)\1\n/gm,
    (_line, _quote, specifier) => {
      const source = resolve(dirname(filePath), specifier)
      const stylesheets = stylesheetMap.get(source) ?? []

      return stylesheets
        .map((file) => {
          const emitted = resolve(__dirname, 'dist', file)
          const importPath = relative(copiedDir, emitted).split(sep).join('/')
          return `import '${importPath}'\n`
        })
        .join('')
    },
  )
}

function getComponentsEntries(): Record<string, string> {
  const dir = 'lib/components'
  // `Icon*.tsx` also matches `Icon.test.tsx`, which would otherwise become a
  // real library entry and publish the whole test bundle (~1.3 MB) to npm.
  const ignore = ['**/*.test.tsx', '**/*.stories.tsx']

  // Keyed by path, not folder name: `Header/Logo` and `Logo` are different
  // components, and a plain `basename` silently drops one of them (the same
  // already happened between `Card/Image` and `Image`, `form/*/Field`, …).
  const baseComponents = glob
    .sync(`${dir}/**/*/index.tsx`, { ignore })
    .reduce((acc, filePath) => {
      const componentName = relativeToComponents(dirname(filePath))
      return { ...acc, [componentName]: filePath }
    }, {})

  const iconComponents = glob
    .sync(`${dir}/**/*/Icon*.tsx`, { ignore })
    .reduce((acc, filePath) => {
      const { name: componentName } = parse(basename(filePath))
      return { ...acc, [componentName]: filePath }
    }, {})

  const allComponents = {
    ...baseComponents,
    ...iconComponents,
  }

  console.log('components', baseComponents)
  return allComponents
}

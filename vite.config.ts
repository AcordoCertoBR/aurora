import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import dotenv from 'dotenv'
import pkg from './package.json'
import { existsSync } from 'fs'
import { resolve, dirname, basename, parse, relative, sep } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import glob from 'glob'
import { viteStaticCopy } from 'vite-plugin-static-copy'

dotenv.config()

// Built once and reused: the copy transform runs for every `.astro` file, and
// there are hundreds of generated icons.
let stylesheetMapCache: Map<string, string> | null = null

process.env['VITE_LIB_VERSION'] = pkg.version

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
        globalStyles: resolve(__dirname, 'lib/core/styles/globalStyles.ts'),
        'astro/runtime': resolve(__dirname, 'lib/astro/runtime/index.ts'),
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
 * Maps each component's source `styles.scss` to the CSS Vite emits for it, so a
 * `.astro` file can import any component stylesheet by its source path and get
 * the built one in the published package.
 */
function getStylesheetMap() {
  if (stylesheetMapCache) return stylesheetMapCache

  const map = new Map<string, string>()

  Object.entries(getComponentsEntries()).forEach(([name, entryPath]) => {
    const source = resolve(__dirname, dirname(entryPath), 'styles.scss')
    const emitted = resolve(__dirname, 'dist/components', name, 'styles.css')
    // Both ends have to exist: a component whose CSS the bundler folded into a
    // shared chunk has no stylesheet of its own to point at, and emitting the
    // import anyway breaks the consumer's build.
    if (!existsSync(source) || !existsSync(emitted)) return
    map.set(source, emitted)
  })

  stylesheetMapCache = map
  return map
}

/**
 * `.astro` files ship as source, so their stylesheet imports have to resolve
 * inside the published package. In the repo they import the same `styles.scss`
 * the React components use; here those become the CSS Vite already emitted,
 * which is what spares the consumer any Sass configuration. An import with no
 * emitted counterpart is dropped (a part that inherits the parent's styles).
 */
function pointAstroStylesToBuiltCss(content: string, filePath: string) {
  const stylesheets = getStylesheetMap()
  const copiedDir = resolve(
    __dirname,
    'astro',
    dirname(relativeToComponents(filePath)),
  )

  return content.replace(
    /^import (['"])(\.[^'"]*\.scss)\1\n/gm,
    (_line, _quote, specifier) => {
      const source = resolve(dirname(filePath), specifier)
      const stylesheet = stylesheets.get(source)
      if (!stylesheet) return ''

      const importPath = relative(copiedDir, stylesheet).split(sep).join('/')
      return `import '${importPath}'\n`
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

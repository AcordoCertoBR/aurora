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

process.env['VITE_LIB_VERSION'] = pkg.version

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
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
          src: 'lib/components/**/index.astro',
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

const componentsDir = resolve(__dirname, 'lib/components')

function relativeToComponents(fullPath: string) {
  return relative(componentsDir, fullPath).split(sep).join('/')
}

/**
 * `.astro` files ship as source, so their stylesheet import has to resolve
 * inside the published package. In the repo they import the same `styles.scss`
 * the React component uses; here that becomes the CSS Vite already emitted for
 * it, which is what spares the consumer any Sass configuration.
 */
function pointAstroStylesToBuiltCss(content: string, filePath: string) {
  const componentPath = dirname(relativeToComponents(filePath))
  const stylesheet = resolve(
    __dirname,
    'dist/components',
    basename(componentPath),
    'styles.css',
  )

  if (!existsSync(stylesheet)) {
    return content.replace(/^import ['"]\.\/styles\.scss['"]\n/m, '')
  }

  const importPath = relative(
    resolve(__dirname, 'astro', componentPath),
    stylesheet,
  )
    .split(sep)
    .join('/')

  return content.replace(/(['"])\.\/styles\.scss\1/, `'${importPath}'`)
}

function getComponentsEntries() {
  const dir = 'lib/components'
  // `Icon*.tsx` also matches `Icon.test.tsx`, which would otherwise become a
  // real library entry and publish the whole test bundle (~1.3 MB) to npm.
  const ignore = ['**/*.test.tsx', '**/*.stories.tsx']

  const baseComponents = glob
    .sync(`${dir}/**/*/index.tsx`, { ignore })
    .reduce((acc, filePath) => {
      const folderPath = dirname(filePath)
      const componentName = basename(folderPath)
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

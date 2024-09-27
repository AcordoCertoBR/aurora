import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import dotenv from 'dotenv'
import pkg from './package.json'
import { resolve, dirname, basename, parse } from 'path'
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
        ...getComponentsEntries(),
      },

      fileName: (format, entryName) => {
        const isMainFile = entryName === 'main'
        const isIconFile = entryName.startsWith('Icon') && entryName !== 'Icon'
        if (isMainFile) return `main.${format}.js`
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
    dts({ include: ['lib'], exclude: ['**/*.stories.tsx'] }),
    libInjectCss(),
    viteStaticCopy({
      targets: [
        {
          src: [
            'lib/core/styles/mixins.scss',
            'lib/core/tokens/.cache/variables.scss',
          ],
          dest: '.',
        },
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `
          @import "lib/core/tokens/.cache/variables.scss";
          @import "lib/core/styles/mixins.scss";
          `,
        ],
      },
    },
  },
})

function getComponentsEntries() {
  const dir = 'lib/components'

  const baseComponents = glob
    .sync(`${dir}/**/*/index.tsx`)
    .reduce((acc, filePath) => {
      const folderPath = dirname(filePath)
      const componentName = basename(folderPath)
      return { ...acc, [componentName]: filePath }
    }, {})

  const iconComponents = glob
    .sync(`${dir}/**/*/Icon*.tsx`)
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

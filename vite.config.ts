import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import dotenv from 'dotenv'
import pkg from './package.json'
import { resolve } from 'path'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

import fs from 'fs'

dotenv.config()

process.env['VITE_LIB_VERSION'] = pkg.version

function mapComponents(dir) {
  const componentsDir = resolve(__dirname, dir)
  const components = fs
    .readdirSync(componentsDir)
    .filter((file) => fs.statSync(resolve(componentsDir, file)).isDirectory())
    .reduce((acc, folder) => {
      acc[folder] = resolve(componentsDir, folder, 'index.tsx')
      return acc
    }, {})
  return components
}

export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] }), libInjectCss()],
  build: {
    copyPublicDir: false,
    target: 'es2015',
    lib: {
      entry: {
        main: resolve(__dirname, 'lib/main.ts'),
        ...mapComponents('lib/components'),
      },
      fileName: (format, entryName) =>
        entryName === 'main'
          ? `main.${format}.js`
          : `components/${entryName}/index.${format}.js`,
      name: 'aurora',
      formats: ['es', 'cjs'],
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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `
          @import "lib/core/tokens/colors.scss";
          @import "lib/core/tokens/fonts.scss";
          @import "lib/core/tokens/layout.scss";
          @import "lib/core/tokens/elements.scss";`,
        ],
      },
    },
  },
})

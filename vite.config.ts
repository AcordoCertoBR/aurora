import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import dotenv from 'dotenv'
import pkg from './package.json'
import { resolve } from 'path'

dotenv.config()

process.env['VITE_LIB_VERSION'] = pkg.version

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    target: 'es2015',
    lib: {
      entry: resolve(__dirname, './lib/main.ts'),
      name: 'aurora',
      fileName: 'aurora',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
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

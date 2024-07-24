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
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          `
          @import "src/core/tokens/colors.scss";
          @import "src/core/tokens/fonts.scss";
          @import "src/core/tokens/layout.scss";
          @import "src/core/tokens/elements.scss";`,
        ],
      },
    },
  },
})

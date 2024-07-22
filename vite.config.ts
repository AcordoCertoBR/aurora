import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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

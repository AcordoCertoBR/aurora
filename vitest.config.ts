import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['lib/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'lcov'],
    },
  },
})

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'lib/components/**/*.test.{ts,tsx}',
      'lib/components/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: ['**/*.stories.*', '**/*.stories.@(ts|tsx|js|jsx|mdx)', 'dist/**'],
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      include: ['lib/components/**/*.ts', 'lib/components/**/*.tsx'],
      exclude: [
        '**/*.stories.*',
        '**/*.stories.@(ts|tsx|js|jsx|mdx)',
        'dist/**',
      ],
    },
  },
})

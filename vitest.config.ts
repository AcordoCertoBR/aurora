import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: resolve(__dirname, 'lib/components'),
      },
      { find: '@core', replacement: resolve(__dirname, 'lib/core') },
      { find: '@assets', replacement: resolve(__dirname, 'lib/assets') },
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'lib/components/**/*.test.{ts,tsx}',
      'lib/components/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [
      '**/*.stories.*',
      '**/*.stories.@(ts|tsx|js|jsx|mdx)',
      'dist/**',
      'lib/components/Logo/ac/**',
      'lib/components/Logo/cp/**',
      'lib/components/icons/default/**',
      'lib/components/icons/social/**',
    ],
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      include: ['lib/components/**/*.ts', 'lib/components/**/*.tsx'],
      exclude: [
        '**/*.stories.*',
        '**/*.stories.@(ts|tsx|js|jsx|mdx)',
        'dist/**',
        'lib/components/Logo/ac/**',
        'lib/components/Logo/cp/**',
        'lib/components/icons/default/**',
        'lib/components/icons/social/**',
      ],
    },
  },
})

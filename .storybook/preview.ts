import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../lib/core/styles/GlobalStyles.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
}

export default preview

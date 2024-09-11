import { addons } from '@storybook/manager-api'
import { themes } from '@storybook/theming'
import cpTheme from './theme'

addons.setConfig({
  theme: cpTheme,
})

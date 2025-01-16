import type { Meta, StoryObj } from '@storybook/react'
import { COLOR_BRAND_BLUE_40 } from '@core/tokens'
import { Spinner } from './index'

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}

export default meta

type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  args: {
    color: COLOR_BRAND_BLUE_40,
    size: 32,
  },
}

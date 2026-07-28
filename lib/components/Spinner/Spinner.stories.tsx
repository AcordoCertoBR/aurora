import type { Meta, StoryObj } from '@storybook/react'
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

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const Negative: Story = {
  args: {
    size: 'large',
    negative: true,
  },
  parameters: {
    backgrounds: {
      default: 'brand',
      values: [{ name: 'brand', value: '#0048db' }],
    },
  },
}

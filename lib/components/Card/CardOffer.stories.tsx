import { Meta, StoryObj } from '@storybook/react'
import { Card } from './index'

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Offer',
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
}

export const Small: Story = {
}
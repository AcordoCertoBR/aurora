import type { Meta, StoryObj } from '@storybook/react'
import { Datepicker } from './index'

const meta: Meta<typeof Datepicker> = {
  title: 'Components/Datepicker',
  component: Datepicker,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Datepicker>

export const WithText: Story = {
  args: {
    style: { maxWidth: '272px' },
    label: 'lulu',
    onChange: (date) => alert(date?.toString()),
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { DatepickerField } from './index'

const meta: Meta<typeof DatepickerField> = {
  title: 'Components/form/Datepicker',
  component: DatepickerField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof DatepickerField>

export const WithoutCalendar: Story = {
  args: {
    style: { maxWidth: '272px' },
    label: 'Digite a data',
    calendar: false,
  },
}

export const WithCalendar: Story = {
  args: {
    style: { maxWidth: '272px' },
    label: 'Escolha a data',
  },
}

// default date
// controlled
// uncontrolled

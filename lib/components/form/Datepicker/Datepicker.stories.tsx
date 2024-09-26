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

export const WithText: Story = {
  args: {
    style: { maxWidth: '272px' },
    label: 'lulu',
    /* defaultValue: new Date("02-20-1999"), */
    /* onChange: (date) => alert(date?.toString()), */
  },
}

// default date
// controlled
// uncontrolled


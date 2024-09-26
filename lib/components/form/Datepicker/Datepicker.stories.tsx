import type { Meta, StoryObj } from '@storybook/react'
import { DatepickerField } from './index'
import { useState } from 'react'
import { AUCalendarDateShape } from './types'
import { DDMMYYYY } from './helpers'

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
  render: (args) => {
    return (
      <div style={{ minHeight: '800px' }}>
        <DatepickerField {...args} />
      </div>
    )
  },
  args: {
    style: { maxWidth: '272px' },
    label: 'Escolha a data',
  },
}

export const ControlledDatepicker: Story = {
  render: (args) => {
    const [value, setValue] = useState<AUCalendarDateShape | null>()
    const formatted = value ? DDMMYYYY.toString(value) : ''
    function setDate() {
      setValue({ day: 12, month: 2, year: 1972 })
    }

    function setNewDate(date?: AUCalendarDateShape | null) {
      setValue(date)
    }

    return (
      <div style={{ minHeight: '800px' }}>
        <p>displayed date: {formatted}</p>
        <button onClick={setDate}>Change to date 12 fev 1972</button>
        <DatepickerField {...args} onChange={setNewDate} value={value} />
      </div>
    )
  },
  args: {
    style: { maxWidth: '272px' },
    label: 'Escolha a data',
  },
}

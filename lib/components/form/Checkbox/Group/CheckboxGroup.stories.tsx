import { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '..'

const meta: Meta<typeof Checkbox.Group> = {
  title: 'Components/form/Checkbox/Group',
  component: Checkbox.Group,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox.Group>

const data = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
]

const options = data.map((option, index) => {
  return <Checkbox.Field key={index} value={option.value} label={option.label} />
})

export const Default: Story = {
  render: (args) => {
    return <Checkbox.Group {...args}>{options}</Checkbox.Group>
  },
  args: {
    label: 'Multiple options',
    onChange: (e) => console.log('valores escolhidos ->', e.target.checked)
  },
}

export const Required: Story = {
  render: (args) => {
    return <Checkbox.Group {...args}>{options}</Checkbox.Group>
  },
  args: {
    label: 'Multiple options',
    required: true,
  },
}

export const HorizontalOrientation: Story = {
  render: (args) => {
    return <Checkbox.Group {...args}>{options}</Checkbox.Group>
  },
  args: {
    label: 'Multiple options',
    orientation: 'horizontal',
  },
}

export const Error: Story = {
  render: (args) => {
    return <Checkbox.Group {...args}>{options}</Checkbox.Group>
  },
  args: {
    label: 'Multiple options',
    error: true,
    errorMessage: 'Selecione as opções',
  },
}

export const WithinLabel: Story = {
  render: (args) => {
    return <Checkbox.Group {...args}>{options}</Checkbox.Group>
  },
}

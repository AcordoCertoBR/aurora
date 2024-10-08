import { Meta, StoryObj } from '@storybook/react'
import { Radio } from '..'

const meta: Meta<typeof Radio.Group> = {
  title: 'Components/form/Radio/Group',
  component: Radio.Group,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Radio.Group>

const data = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
]

const options = data.map((option, index) => {
  return <Radio.Field key={index} value={option.value} label={option.label} />
})

export const Default: Story = {
  render: (args) => {
    return <Radio.Group {...args}>{options}</Radio.Group>
  },
  args: {
    label: 'Multiple options',
    onChange: (e) => console.log('valor escolhido ->', e.target.value),
  },
}

export const WithDefaultValue: Story = {
    render: (args) => {
      return <Radio.Group {...args}>{options}</Radio.Group>
    },
    args: {
      label: 'Multiple options',
      defaultValue: 2
    },
  }

export const HorizontalOrientation: Story = {
  render: (args) => {
    return <Radio.Group {...args}>{options}</Radio.Group>
  },
  args: {
    label: 'Multiple options',
    orientation: 'horizontal',
  },
}

export const Error: Story = {
  render: (args) => {
    return <Radio.Group {...args}>{options}</Radio.Group>
  },
  args: {
    label: 'Multiple options',
    error: true,
    errorMessage: 'Selecione uma opção',
  },
}

export const WithinLabel: Story = {
  render: (args) => {
    return <Radio.Group {...args}>{options}</Radio.Group>
  },
}

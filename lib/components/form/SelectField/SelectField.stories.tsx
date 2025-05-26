import { Meta, StoryObj } from '@storybook/react'
import { SelectField } from './index'

const meta: Meta<typeof SelectField> = {
  title: 'Components/form/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof SelectField>

const commonArgs = {
  label: 'Select Label',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Disabled Option', disabled: true },
    { value: 'option4', label: 'Option 4' },
    { value: 'option5', label: 'Option 5' },
    { value: 'option6', label: 'Option 6' },
  ],
  style: { maxWidth: '272px' },
}

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'default-select',
    ...commonArgs,
  },
}

export const FullScreenOptions: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'fullscreen-select',
    fullScreenOptions: true,
    autocomplete: true,
    ...commonArgs,
  },
}

export const Autocomplete: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} autocomplete />
      </div>
    )
  },
  args: {
    ...commonArgs,
    id: 'autocomplete-select',
    label: 'Autocomplete Select',
placeholder: 'Select a country artist', 
    options: [
      { value: '1', label: 'Johnny Cash' },
      { value: '2', label: 'Dolly Parton' },
      { value: '3', label: 'Willie Nelson', disabled: true },
      { value: '4', label: 'Cody Johnson' },
      { value: '5', label: 'Shania Twain' },
      { value: '6', label: 'Chris Stapleton' },
      { value: '7', label: 'Brad Paisley' },
      { value: '8', label: 'Thomas Rhett' },
      { value: '9', label: 'Tim McGraw' },
      { value: '10', label: 'Carrie Underwood' },
    ],
    onChange: (value) => {
      console.log('Selected value:', value);
    },
  },
}

export const Selected: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'selected-select',
    value: 'option5',
    ...commonArgs,
  },
}

export const Optional: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'optional-select',
    showOptionalLabel: true,
    ...commonArgs,
  },
}

export const Disabled: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'disabled-select',
    disabled: true,
    ...commonArgs,
    label: 'Disabled Select',
  },
}

export const Required: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'required-select',
    required: true,
    ...commonArgs,
    label: 'Required Select',
  },
}

export const Error: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'errored-select',
    error: true,
    errorMessage: 'Mensagem de erro',
    ...commonArgs,
    label: 'Error Select',
  },
}

export const Placeholder: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '400px' }}>
        <SelectField {...args} />
      </div>
    )
  },
  args: {
    id: 'placeholder-select',
    placeholder: 'Custom placeholder',
    ...commonArgs,
  },
}

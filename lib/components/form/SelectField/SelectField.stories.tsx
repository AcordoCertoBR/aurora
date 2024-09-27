import { Meta, StoryObj } from '@storybook/react'
import { SelectField } from './index'

const meta: Meta<typeof SelectField> = {
  title: 'Components/form/SelectField',
  component: SelectField,
  tags: ['autodocs'],
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
  args: {
    id: 'default-select',
    ...commonArgs,
  },
}

export const Selected: Story = {
  args: {
    id: 'selected-select',
    value: 'option5',
    ...commonArgs,
  },
}

export const Optional: Story = {
  args: {
    id: 'optional-select',
    optional: true,
    ...commonArgs,
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled-select',
    disabled: true,
    ...commonArgs,
    label: 'Disabled Select',
  },
}

export const Required: Story = {
  args: {
    id: 'required-select',
    required: true,
    ...commonArgs,
    label: 'Required Select',
  },
}

export const Error: Story = {
  args: {
    id: 'errored-select',
    error: true,
    errorMessage: 'Mensagem de erro',
    ...commonArgs,
    label: 'Error Select',
  },
}

export const Placeholder: Story = {
  args: {
    id: 'placeholder-select',
    placeholder: 'Custom placeholder',
    ...commonArgs,
  },
}



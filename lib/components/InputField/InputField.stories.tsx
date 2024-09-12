import { Meta, StoryObj } from '@storybook/react'
import { InputField } from './index'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InputField>

const commonArgs = {
  label: 'Label',
  placeholder: 'Text',
  style: { maxWidth: '272px' },
}

export const Default: Story = {
  args: {
    id: 'default-input',
    ...commonArgs,
  },
}

export const Required: Story = {
  args: {
    id: 'required-input',
    requiredInput: true,
    required: true,
    ...commonArgs,
  },
}

export const Optional: Story = {
  args: {
    id: 'optional-input',
    optional: true,
    ...commonArgs,
  },
}

export const Success: Story = {
  args: {
    id: 'success-input',
    status: 'success',
    ...commonArgs,
  },
}

export const Error: Story = {
  args: {
    id: 'error-input',
    status: 'error',
    errorMessage: 'Mensagem de erro',
    ...commonArgs,
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    disabled: true,
    ...commonArgs,
  },
}

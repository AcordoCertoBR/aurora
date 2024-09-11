import { Meta, StoryObj } from '@storybook/react'
import { InputField } from './index'

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: [],
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
    ...commonArgs,
  },
}

export const Required: Story = {
  args: {
    requiredInput: true,
    required: true,
    ...commonArgs,
  },
}

export const Opcional: Story = {
  args: {
    optional: true,
    ...commonArgs,
  },
}

export const Success: Story = {
  args: {
    status: 'success',
    ...commonArgs,
  },
}

export const Error: Story = {
  args: {
    status: 'error',
    errorMessage: 'Mensagem de erro',
    ...commonArgs,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    ...commonArgs,
  },
}

import { Meta, StoryObj } from '@storybook/react'
import { InputField } from './index'

const meta: Meta<typeof InputField> = {
  title: 'Components/form/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
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

export const Focus: Story = {
  args: {
    id: 'focus-input',
    autoFocus: true,
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
    success: true,
    ...commonArgs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Estilo temporário com duração de 2 segundos',
      },
    },
  },
}

export const Error: Story = {
  args: {
    id: 'error-input',
    error: true,
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

export const WithoutLabel: Story = {
  args: {
    style: commonArgs.style,
    placeholder: commonArgs.placeholder,
  },
}

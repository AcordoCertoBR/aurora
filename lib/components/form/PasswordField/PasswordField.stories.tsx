import { Meta, StoryObj } from '@storybook/react'
import { PasswordField } from './index'

const meta: Meta<typeof PasswordField> = {
  title: 'Components/form/PasswordField',
  component: PasswordField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof PasswordField>

const commonArgs = {
  label: 'Digite sua senha',
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
    errorMessage: 'Senha incorreta',
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

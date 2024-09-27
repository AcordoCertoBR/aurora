import { Meta, StoryObj } from '@storybook/react'
import { TokenField } from './index'

const meta: Meta<typeof TokenField> = {
  title: 'Components/form/TokenField',
  component: TokenField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof TokenField>

const commonArgs = {
  label: 'Label',
  style: { maxWidth: '272px' },
}

export const Default: Story = {
  args: {
    ...commonArgs,
  },
}

export const CustomSize: Story = {
  args: {
    size: 4,
    ...commonArgs,
  },
}

export const Success: Story = {
  args: {
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
    error: true,
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

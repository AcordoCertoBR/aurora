import { Meta, StoryObj } from '@storybook/react'
import { EmailField } from './index'

const meta: Meta<typeof EmailField> = {
  title: 'Components/form/EmailField',
  component: EmailField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof EmailField>

const commonArgs = {
  label: 'Digite seu e-mail',
  placeholder: 'Text',
  style: { maxWidth: '272px' },
}

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    id: 'default-input',
    ...commonArgs,
  },
}

export const Focus: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    id: 'focus-input',
    autoFocus: true,
    ...commonArgs,
  },
}

export const HelpText: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    id: 'help-text-input',
    helpMessage: 'Help text',
    ...commonArgs,
  },
}

export const ShowRequired: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    id: 'show-required-input',
    requiredInput: true,
    showOptionalLabel: false,
    ...commonArgs,
  },
}

export const Success: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
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
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    id: 'error-input',
    error: true,
    errorMessage: 'Mensagem de erro',
    ...commonArgs,
  },
}

export const Disabled: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    id: 'disabled-input',
    disabled: true,
    ...commonArgs,
  },
}

export const WithoutLabel: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    style: commonArgs.style,
    placeholder: commonArgs.placeholder,
  },
}

export const HelperMessage: Story = {
  render: (args) => {
    return (
      <div style={{ minHeight: '320px' }}>
        <EmailField {...args} />
      </div>
    )
  },
  args: {
    id: 'helper-input',
    helpMessage: 'Help text',
    ...commonArgs,
  },
}

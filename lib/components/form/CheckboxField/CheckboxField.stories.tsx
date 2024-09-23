import { Meta, StoryObj } from '@storybook/react'
import { CheckboxField } from './index'

const meta: Meta<typeof CheckboxField> = {
  title: 'Components/form/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof CheckboxField>

const commonArgs = {
    label: 'Label'
}

export const Default: Story = {
  args: {
    id: 'default-input',
    ...commonArgs
  },
}

export const Focus: Story = {
  args: {
    id: 'focus-input',
    autoFocus: true,
    ...commonArgs
  },
}

export const Error: Story = {
  args: {
    id: 'error-input',
    error: true,
    errorMessage: 'Mensagem de erro',
    ...commonArgs
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    disabled: true,
    ...commonArgs
  },
}

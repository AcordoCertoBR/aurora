import { Meta, StoryObj } from '@storybook/react'
import { TextAreaField } from './index'

const meta: Meta<typeof TextAreaField> = {
  title: 'Components/form/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof TextAreaField>

const commonArgs = {
  label: 'Label',
  placeholder: 'Escreva aqui...',
  style: { maxWidth: '272px' },
}

export const Default: Story = {
  args: {
    id: 'default-textarea',
    rows: 4,
    ...commonArgs,
  },
}

export const CharCount: Story = {
  args: {
    id: 'charcount-textarea',
    maxLength: 100,
    ...commonArgs,
  },
}

export const HorizontalResize: Story = {
  args: {
    id: 'horizontalresize-textarea',
    horizontalResize: true, 
    maxLength: 100,
    ...commonArgs,
  },
}

export const OneRow: Story = {
  args: {
    ...commonArgs,
    id: 'horizontalresize-textarea',
    rows: 1,
    maxLength: 100,
    placeholder: 'textarea com 1 row...',
  },
}

export const MoreRows: Story = {
  args: {
    ...commonArgs,
    id: 'horizontalresize-textarea',
    rows: 12,
    maxLength: 100,
    placeholder: 'textarea com 12 rows...',
  },
}

export const Required: Story = {
  args: {
    id: 'required-textarea',
    required: true,
    ...commonArgs,
  },
}

export const Optional: Story = {
  args: {
    id: 'optional-textarea',
    optional: true,
    ...commonArgs,
  },
}

export const Success: Story = {
  args: {
    id: 'success-textarea',
    success: true,
    ...commonArgs,
  },
}

export const Error: Story = {
  args: {
    id: 'error-textarea',
    error: true,
    errorMessage: 'Mensagem de erro',
    ...commonArgs,
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled-textarea',
    disabled: true,
    ...commonArgs,
  },
}

export const CustomRows: Story = {
  args: {
    id: 'customrows-textarea',
    rows: 6,
    ...commonArgs,
  },
}

export const WithoutLabel: Story = {
  args: {
    style: commonArgs.style,
    placeholder: commonArgs.placeholder,
  },
}

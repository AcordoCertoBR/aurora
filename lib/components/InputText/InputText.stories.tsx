import { Meta, StoryObj } from '@storybook/react'
import { InputText } from './index'

const meta: Meta<typeof InputText> = {
  title: 'Components/InputText',
  component: InputText,
  tags: [],
}

export default meta

type Story = StoryObj<typeof InputText>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Text',
  },
}

export const Success: Story = {
  args: {
    label: 'Label',
    placeholder: 'Text',
    status: 'success',
  },
}

export const Error: Story = {
  args: {
    label: 'Label',
    placeholder: 'Text',
    status: 'error',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Label',
    placeholder: 'Text',
    disabled: true,
  },
}

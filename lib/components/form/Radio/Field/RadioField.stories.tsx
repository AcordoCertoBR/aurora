import { Meta, StoryObj } from '@storybook/react'
import { Radio } from '..'


const meta: Meta<typeof Radio.Field> = {
  title: 'Components/form/Radio/Field',
  component: Radio.Field,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Radio.Field>

const commonArgs = {
    label: 'Label',
}

export const Default: Story = {
  args: {
    id: 'default-radio',
    ...commonArgs
  },
}

export const Checked: Story = {
    args: {
      id: 'default-radio',
      defaultChecked: true,
      ...commonArgs
    },
  }

export const Focus: Story = {
  args: {
    id: 'focus-radio',
    autoFocus: true,
    ...commonArgs
  },
}


export const Error: Story = {
  args: {
    id: 'error-radio',
    error: true,
    ...commonArgs
  },
}

export const Disabled: Story = {
  args: {
    id: 'disabled-radio',
    disabled: true,
    ...commonArgs
  },
}

export const DisabledChecked: Story = {
    args: {
      id: 'disabled-checked-radio',
      disabled: true,
      defaultChecked: true,
      ...commonArgs
    },
}

export const RightDirection: Story = {
    args: {
      id: 'direction-radio',
      direction: 'right',
      ...commonArgs
    },
}

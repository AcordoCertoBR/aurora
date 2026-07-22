import { Meta, StoryObj } from '@storybook/react'
import { Divider, DividerProps } from '.'

const meta: Meta<DividerProps> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#ffffff27' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Divider>

const container = (args: DividerProps) => {
  return <Divider {...args} />
}

export const Default: Story = {
  render: (args) => container(args),
  args: {
    borderWidth: 1,
    state: 'visible',
  },
}

export const Thick: Story = {
  render: (args) => container(args),
  args: {
    borderWidth: 2,
    state: 'visible',
  },
}

export const Invisible: Story = {
  render: (args) => container(args),
  args: {
    borderWidth: 1,
    state: 'invisible',
  },
}

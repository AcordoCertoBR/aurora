import { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from '.'
import { IconHelpCircle } from '@components/icons'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Tooltip {...args}>
        <IconHelpCircle />
      </Tooltip>
    </div>
  ),
  args: {
    text: 'Tooltip text',
    position: 'top',
  },
}

export const Bottom: Story = {
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Tooltip {...args}>
        <IconHelpCircle />
      </Tooltip>
    </div>
  ),
  args: {
    text: 'Tooltip text',
    position: 'bottom',
  },
}

export const Left: Story = {
  render: (args) => (
    <div style={{ padding: '100px' }}>
      <Tooltip {...args}>
        <IconHelpCircle />
      </Tooltip>
    </div>
  ),
  args: {
    text: 'Tooltip text',
    position: 'left',
  },
}

export const Right: Story = {
  render: (args) => (
    <div style={{ padding: '50px' }}>
      <Tooltip {...args}>
        <IconHelpCircle />
      </Tooltip>
    </div>
  ),
  args: {
    text: 'Tooltip text',
    position: 'right',
  },
}

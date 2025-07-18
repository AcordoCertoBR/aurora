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
  decorators: [
    (story) => {
      return (
        <div style={{ padding: '50px' }}>
          {story()}
        </div>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  args: {
    text: 'Tooltip text',
    position: 'top',
    children: <IconHelpCircle />,
  },
}

export const Bottom: Story = {
  args: {
    text: 'Tooltip text',
    position: 'bottom',
    children: <IconHelpCircle />,
  },
}

export const Left: Story = {
  args: {
    text: 'Tooltip text',
    position: 'left',
    children: <IconHelpCircle />,
  },
}

export const Right: Story = {
  args: {
    text: 'Tooltip text',
    position: 'right',
    children: <IconHelpCircle />,
  },
}

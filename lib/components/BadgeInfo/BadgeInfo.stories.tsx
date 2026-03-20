import { Meta, StoryObj } from '@storybook/react'
import { BadgeInfo, BadgeInfoProps } from '.'

const meta: Meta<BadgeInfoProps> = {
  title: 'Components/BadgeInfo',
  component: BadgeInfo,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof BadgeInfo>

const container = (args: BadgeInfoProps) => {
  return <BadgeInfo {...args} />
}

export const InfoBadgeInfo: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    text: 'Support text',
  },
}

export const SuccessBadgeInfo: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    text: 'Support text',
  },
}

export const ProgressBadgeInfo: Story = {
  render: (args) => container(args),
  args: {
    status: 'progress',
    text: 'Support text',
  },
}

export const NeutralBadgeInfo: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    text: 'Support text',
  },
}

export const CustomIconBadgeInfo: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    text: 'Support text',
    customIcon: '🔥',
  },
}

export const WarningBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    text: 'Support text',
  },
}


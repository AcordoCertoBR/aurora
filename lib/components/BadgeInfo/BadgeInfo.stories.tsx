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

export const InfoReadOnly: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    text: 'support text',
  },
}

export const SuccessReadOnly: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    text: 'support text',
  },
}

export const WarningReadOnlySmall: Story = {
  render: (args) => container(args),
  args: {
    size: 'small',
    status: 'warning',
    text: 'support text',
  },
}

export const ProgressReadOnlyMedium: Story = {
  render: (args) => container(args),
  args: {
    status: 'progress',
    text: 'progress text',
  },
}

export const ErrorReadOnlyLarge: Story = {
  render: (args) => container(args),
  args: {
    size: 'large',
    status: 'error',
    text: 'support text',
  },
}

export const CustomIconReadOnly: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    text: 'support text',
    customIcon: '🔥',
  },
}

export const InfoBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    text: 'info',
  },
}

export const ErrorBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    text: 'error',
  },
}

export const WarningBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    text: 'warning',
  },
}

export const ProggressBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'progress',
    text: 'progress',
  },
}

export const NeutralBadgeSmall: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    size: 'small',
    text: 'neutral',
  },
}

export const NeutralBadgeMedium: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    size: 'medium',
    text: 'neutral',
  },
}

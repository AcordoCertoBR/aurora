import { Meta, StoryObj } from '@storybook/react'
import { BadgeState, BadgeStateProps } from '.'

const meta: Meta<BadgeStateProps> = {
  title: 'Components/BadgeState',
  component: BadgeState,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof BadgeState>

const container = (args: BadgeStateProps) => {
  return <BadgeState {...args} />
}

export const InfoTextBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    text: 'Info',
  },
}

export const SuccessTextBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    text: 'Success',
  },
}

export const WarningTextBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    text: 'Warning',
  },
}

export const SupportTextBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'support',
    text: 'Support',
  },
}

export const NeutralTextBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    text: 'Badge',
  },
}

export const NeutralTextBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    text: 'Badge',
    variant: 'strong',
  },
}

export const NeutralIconBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    iconOnly: true,
  },
}

export const NeutralIconBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    iconOnly: true,
    variant: 'strong',
  },
}

export const ErrorTextBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    text: 'Error',
    variant: 'strong',
  },
}

export const WarningTextBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    text: 'Warning',
    variant: 'strong',
  },
}

export const SupportIconBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'support',
    iconOnly: true,
  },
}

export const InfoIconBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    iconOnly: true,
  },
}

export const ErrorIconBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    iconOnly: true,
    variant: 'strong',
  },
}

export const SuccessIconBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    iconOnly: true,
    variant: 'strong',
  },
}

export const SupportIconBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'support',
    iconOnly: true,
    variant: 'strong',
  },
}

export const NumberErrorBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    text: '99',
    isNumberBadge: true,
  },
}

export const NumberWarningBadgeStrong: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    text: '1',
    isNumberBadge: true,
    variant: 'strong',
  },
}

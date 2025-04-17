import { Meta, StoryObj } from '@storybook/react'
import { Tag, TagProps } from '.'

const meta: Meta<TagProps> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Tag>

const container = (args: TagProps) => {
  return (
      <Tag {...args} />
  )
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

export const SupportReadOnlyMedium: Story = {
  render: (args) => container(args),
  args: {
    status: 'support',
    text: 'support text',
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
    customIcon: '🔥'
  },
}

export const InfoBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    type: 'badge',
    text: 'info',
  },
}

export const ErrorBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    type: 'badge',
    text: 'error',
  },
}

export const WarningBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    type: 'badge',
    text: 'warning',
  },
}

export const SupportBadge: Story = {
  render: (args) => container(args),
  args: {
    status: 'support',
    type: 'badge',
    text: 'support',
  },
}

export const NeutralBadgeSmall: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    type: 'badge',
    size: 'small',
    text: 'neutral',
  },
}

export const NeutralBadgeMedium: Story = {
  render: (args) => container(args),
  args: {
    status: 'neutral',
    type: 'badge',
    size: 'medium',
    text: 'neutral',
  },
}


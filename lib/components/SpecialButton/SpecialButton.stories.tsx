import { Meta, StoryObj } from '@storybook/react'
import { SpecialButton, SpecialButtonProps } from '.'

const meta: Meta<SpecialButtonProps> = {
  title: 'Components/SpecialButton',
  component: SpecialButton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof SpecialButton>

const container = (args: SpecialButtonProps) => {
  return (
    <div style={{ maxWidth: 272 }}>
      <SpecialButton {...args} />
    </div>
  )
}

export const PressEnabled: Story = {
  render: (args) => container(args),
  args: {
    type: 'press',
    children: 'Hold to confirm',
  },
}

export const PressDisabled: Story = {
  render: (args) => container(args),
  args: {
    type: 'press',
    children: 'Hold to confirm',
    disabled: true,
  },
}

export const PressLoading: Story = {
  render: (args) => container(args),
  args: {
    type: 'press',
    loading: true,
  },
}

export const PressSuccess: Story = {
  render: (args) => container(args),
  args: {
    type: 'press',
    children: 'Hold to confirm',
    success: true,
  },
}

export const PressCustomDuration: Story = {
  render: (args) => container(args),
  args: {
    type: 'press',
    children: 'Hold for 3 seconds',
    holdDuration: 3000,
  },
}

export const SliderPrimary: Story = {
  render: (args) => container(args),
  args: {
    type: 'slider',
    children: 'Slide to action',
  },
}

export const SliderSecondary: Story = {
  render: (args) => container(args),
  args: {
    type: 'slider',
    children: 'Slide to action',
    variant: 'secondary',
  },
}

export const SliderDisabled: Story = {
  render: (args) => container(args),
  args: {
    type: 'slider',
    children: 'Slide to action',
    disabled: true,
  },
}

export const SliderSuccess: Story = {
  render: (args) => container(args),
  args: {
    type: 'slider',
    children: 'Slide to action',
    success: true,
  },
}

export const SliderSecondarySuccess: Story = {
  render: (args) => container(args),
  args: {
    type: 'slider',
    children: 'Slide to action',
    variant: 'secondary',
    success: true,
  },
}

export const SliderLoading: Story = {
  render: (args) => container(args),
  args: {
    type: 'slider',
    loading: true,
  },
}

export const SliderSkeleton: Story = {
  render: (args) => container(args),
  args: {
    type: 'slider',
    skeleton: true,
  },
}

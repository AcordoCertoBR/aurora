import { Meta, StoryObj } from '@storybook/react'
import { ChipBanner, ChipBannerProps } from '.'

const meta: Meta<ChipBannerProps> = {
  title: 'Components/ChipBanner',
  component: ChipBanner,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['play', 'pause'],
    },
    timeInSeconds: { control: 'number' },
    loop: { control: 'boolean' },
    negative: { control: 'boolean' },
  },
  parameters: {
    backgrounds: {
      default: 'default',
      values: [
        { name: 'default', value: '#fff' },
        { name: 'dark', value: '#0048DB' },
      ],
    },
  },
}

export default meta

type Story = StoryObj<typeof ChipBanner>

export const Pause: Story = {
  args: {
    type: 'pause',
  },
}

export const Play: Story = {
  args: {
    type: 'play',
  },
}

export const WithTimer: Story = {
  args: {
    type: 'pause',
    timeInSeconds: 10,
  },
}

export const Looping: Story = {
  args: {
    type: 'pause',
    timeInSeconds: 10,
    loop: true,
  },
}

export const Negative: Story = {
  args: {
    type: 'pause',
    timeInSeconds: 10,
    negative: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

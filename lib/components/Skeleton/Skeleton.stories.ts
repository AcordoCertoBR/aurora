import { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './index'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#fff' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Skeleton>

export const Example: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: `Exemplo de aplicação [aqui](${window.location.host}/?path=/story/components-card-offer--loading-offer-card)`,
      },
    },
  },
}

export const Square: Story = {
  args: {
    shape: 'square',
    width: 100,
    height: 100,
  },
}

export const Circle: Story = {
  args: {
    shape: 'circle',
    width: 100,
    height: 100,
  },
}

export const Block: Story = {
  args: {
    block: true,
  },
}

export const NotActive: Story = {
  args: {
    active: false,
  },
}

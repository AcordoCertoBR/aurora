import { Meta, StoryObj } from '@storybook/react'
import { Carousel } from './index'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Prototype/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#fff' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Carousel>

export const Example: Story = {
  args: {
    items: [
      <div style={{ width: '250px', height: '100%', backgroundColor: 'red' }} />,
      <div style={{ width: '250px', height: '100%', backgroundColor: 'blue' }} />,
      <div style={{ width: '250px', height: '100%', backgroundColor: 'green' }} />,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `Exemplo de aplicação [aqui](${window.location.host}/?path=/story/components-card-offer--loading-offer-card)`,
      },
    },
  },
}

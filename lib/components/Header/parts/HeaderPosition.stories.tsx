import { Meta, StoryObj } from '@storybook/react'
import { LogoBadgetCP } from '../../Logo'
import { IconChevronLeft } from '../../icons/default'
import { Header } from '../index'

const meta: Meta<typeof Header.Root> = {
  title: 'Components/Header/Position',
  component: Header.Root,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Header.Root>

export const Fixed: Story = {
  args: {
    position: 'fixed',
  },
  render: (args) => (
    <Header.Root {...args}>
      <Header.Button onClick={() => ''}>
        <IconChevronLeft />
      </Header.Button>
      <LogoBadgetCP />
    </Header.Root>
  ),
}

export const Static: Story = {
  args: {
    position: 'static',
  },
  render: (args) => (
    <Header.Root {...args}>
      <Header.Button onClick={() => ''}>
        <IconChevronLeft />
      </Header.Button>
      <LogoBadgetCP />
    </Header.Root>
  ),
}

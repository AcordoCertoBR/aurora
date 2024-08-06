import { Meta, StoryObj } from '@storybook/react'
import { LogoBadgetAC, LogoBadgetCP } from '../../Logo'
import { IconChevronLeft, IconX } from '../../icons/default'
import { Header } from '../index'

const meta: Meta<typeof Header.Root> = {
  title: 'Components/Header/WithNavIntern',
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

export const BackButton: Story = {
  render: (args) => (
    <Header.Root {...args}>
      <Header.Button onClick={() => ''}>
        <IconChevronLeft />
      </Header.Button>
      <LogoBadgetCP />
    </Header.Root>
  ),
}

export const BackAndClose: Story = {
  render: (args) => (
    <Header.Root {...args}>
      <Header.Button onClick={() => ''}>
        <IconChevronLeft />
      </Header.Button>
      <LogoBadgetCP />
      <Header.Button onClick={() => ''}>
        <IconX />
      </Header.Button>
    </Header.Root>
  ),
}

export const BackAndBadges: Story = {
  render: (args) => (
    <Header.Root {...args}>
      <Header.Button onClick={() => ''}>
        <IconChevronLeft />
      </Header.Button>
      <Header.Badges>
        <LogoBadgetCP />
        <LogoBadgetAC />
      </Header.Badges>
    </Header.Root>
  ),
}

export const BackCloseBadges: Story = {
  render: (args) => (
    <Header.Root {...args}>
      <Header.Button onClick={() => ''}>
        <IconChevronLeft />
      </Header.Button>
      <Header.Badges>
        <LogoBadgetCP />
        <LogoBadgetAC />
      </Header.Badges>
      <Header.Button onClick={() => ''}>
        <IconX />
      </Header.Button>
    </Header.Root>
  ),
}

import type { Meta, StoryObj } from '@storybook/react'
import { Drawer } from './index'
import { Text } from '../Text'
import { LogoPrimaryCP } from '../Logo'
import { ProfileNav } from '../ProfileNav'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Drawer>

export const WithText: Story = {
  args: {
    isOpen: true,
    renderHeader: () => (
      <Text as="h3" variant="heading-small" weight="bold">
        Notificações
      </Text>
    ),
    renderContent: () => <div></div>,
  },
}

export const WithLogo: Story = {
  args: {
    isOpen: true,
    renderHeader: () => <LogoPrimaryCP />,
    renderContent: () => <div></div>,
  },
}

export const WithProfile: Story = {
  args: {
    isOpen: true,
    renderHeader: () => <ProfileNav name="Fulano" />,
    renderContent: () => <div></div>,
  },
}

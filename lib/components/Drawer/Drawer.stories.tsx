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
    renderHeader: (
      <Text as="h3" variant="heading-small" weight="bold">
        Notificações
      </Text>
    ),
    renderContent: <div></div>,
  },
}

export const WithLogo: Story = {
  args: {
    isOpen: true,
    renderHeader: <LogoPrimaryCP />,
    renderContent: <div></div>,
  },
}

export const WithProfile: Story = {
  args: {
    isOpen: true,
    renderHeader: <ProfileNav name="Fulano" fullName="Fulano Silva" />,
    renderContent: <div></div>,
  },
}

export const BottomSheet: Story = {
  args: {
    isOpen: true,
    position: 'bottom',
    renderHeader: (
      <Text as="h3" variant="heading-small" weight="bold">
        Título do bottom sheet
      </Text>
    ),
    renderContent: (
      <div style={{ padding: '16px 24px' }}>
        <Text as="p" variant="body-medium">
          Conteúdo ancorado na parte inferior da tela (Figma: Modal v2,
          Surface=BottomSheet).
        </Text>
      </div>
    ),
  },
}

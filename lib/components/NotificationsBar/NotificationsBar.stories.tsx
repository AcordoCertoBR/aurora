import type { Meta, StoryObj } from '@storybook/react'
import { NotificationsBar } from './index'
import {
  IconAlertCircle,
  IconSearch,
  IconSpark,
  IconVelocimeter,
} from '../icons'

const meta: Meta<typeof NotificationsBar.Root> = {
  title: 'Components/NotificationsBar',
  component: NotificationsBar.Root,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NotificationsBar.Root>

export const Default: Story = {
  args: {
    renderRecents: () => (
      <NotificationsBar.List
        title="Rencetes"
        dataSource={[
          {
            title: 'Seu Score mudou!',
            Icon: <IconVelocimeter color="info" />,
            onClick: () => '/',
            createdAt: '14/set',
          },
          {
            title: 'Um Objetivo subiu de nível',
            Icon: <IconSpark color="info" />,
            onClick: () => '/',
            createdAt: '14/set',
          },
        ]}
        renderItem={(item) => (
          <NotificationsBar.Link
            title={item.title}
            onClick={item.onClick}
            Icon={item.Icon}
            createdAt={item.createdAt}
          />
        )}
      />
    ),
    renderOlds: () => (
      <NotificationsBar.List
        title="Antigas"
        dataSource={[
          {
            title: 'Você tem uma nova dívida negativada',
            Icon: <IconAlertCircle color="info" />,
            onClick: () => '/',
            createdAt: '14/set',
            onDelete: () => '',
          },
          {
            title: 'Identificamos uma nova consulta em seu cpf!',
            Icon: <IconSearch color="info" />,
            onClick: () => '/',
            createdAt: '14/set',
            onDelete: () => '',
          },
        ]}
        renderItem={(item) => (
          <NotificationsBar.Link
            title={item.title}
            onClick={item.onClick}
            Icon={item.Icon}
            createdAt={item.createdAt}
            onDelete={item.onDelete}
          />
        )}
      />
    ),
  },
}

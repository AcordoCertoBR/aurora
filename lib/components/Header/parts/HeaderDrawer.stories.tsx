import { Meta, StoryObj } from '@storybook/react'
import { Drawer } from '../../Drawer'
import { LogoPrimaryCP } from '../../Logo'
import { Text } from '../../Text'
import { Header } from '../index'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Header/WithDrawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: {
        type: 'inline-radio',
      },
      options: [true, false],
    },
  },
  decorators: [
    (story) => {
      return (
        <div
          style={{
            overflow: 'hidden',
            height: '100vh',
          }}>
          <Header.Root>
            <Header.Logo>
              <LogoPrimaryCP />
            </Header.Logo>
            <Header.Actions>
              <Header.Profile
                onClickNotifications={() => ''}
                onClickMenu={() => ''}
                fullName="Fulano Silva"
              />
            </Header.Actions>

            {story()}
          </Header.Root>
        </div>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Menu: Story = {
  args: {
    isOpen: false,
    handleOpen: () => '',
    renderHeader: <LogoPrimaryCP />,
    renderContent: '',
  },
  render: (args) => {
    return <Drawer {...args} />
  },
}

export const Notifications: Story = {
  args: {
    isOpen: false,
    handleOpen: () => '',
    renderHeader: (
      <Text as="h3" variant="heading-small" weight="bold">
        Notificações
      </Text>
    ),
    renderContent: '',
  },
  render: (args) => {
    return <Drawer {...args} />
  },
}

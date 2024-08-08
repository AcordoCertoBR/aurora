import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../../Logo'
import { Header } from '../index'
import { Button } from '../../Button'

const meta: Meta<typeof Header.Actions> = {
  title: 'Components/Header/WithActions',
  component: Header.Actions,
  tags: ['autodocs'],
  argTypes: {
    children: {
      options: ['Button', 'ProfileActions'],
      mapping: {
        Button: <Button>Consultar CPF</Button>,
        ProfileActions: <Header.Profile fullName="Fulano Silva" />,
      },
    },
  },
  decorators: [
    (story) => {
      return (
        <Header.Root>
          <Header.Logo>
            <LogoPrimaryCP />
          </Header.Logo>
          {story()}
        </Header.Root>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof Header.Actions>

export const ActionButton: Story = {
  args: {
    children: <Button>Consultar CPF</Button>,
  },
  name: 'Button',
}

export const ActionDeskDivider: Story = {
  args: {
    children: <Button>Consultar CPF</Button>,
    divider: true,
  },
  name: 'Divider',
}

export const ActionProfile: Story = {
  args: {
    children: <Header.Profile fullName="Fulano Silva" />,
    divider: true,
  },
  name: 'Profile',
}

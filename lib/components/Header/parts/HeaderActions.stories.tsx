import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../../Logo'
import { Header } from '../index'
import { Button } from '../../Button'

const meta: Meta<typeof Header.Actions> = {
  title: 'Components/Header/WithActions',
  component: Header.Actions,
  tags: ['autodocs'],
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
}

export const ActionDeskDivider: Story = {
  args: {
    children: <Button>Consultar CPF</Button>,
    divider: true,
  },
}

export const ActionProfiler: Story = {
  args: {
    children: <Header.Profile fullName="Fulano Silva" />,
    divider: true,
  },
}

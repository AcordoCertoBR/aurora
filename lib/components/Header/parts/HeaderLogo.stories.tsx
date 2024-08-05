import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../../Logo'
import { Header } from '../index'

const meta: Meta<typeof Header.Logo> = {
  title: 'Components/Header/WithLogo',
  component: Header.Logo,
  tags: ['autodocs'],
  decorators: [
    (story) => {
      return <Header.Root>{story()}</Header.Root>
    },
  ],
}

export default meta

type Story = StoryObj<typeof Header.Logo>

export const Default: Story = {
  args: {
    children: <LogoPrimaryCP />,
  },
}

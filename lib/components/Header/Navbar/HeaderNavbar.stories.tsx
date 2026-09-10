import { Meta, StoryObj } from '@storybook/react'
import { LogoPrimaryCP } from '../../Logo'
import { Header } from '../index'

const meta: Meta<typeof Header.Navbar> = {
  title: 'Components/Header/WithNavbar',
  component: Header.Navbar,
  tags: ['autodocs'],
  decorators: [
    (story) => {
      return (
        <Header.Root>
          <Header.Logo>
            <LogoPrimaryCP />
          </Header.Logo>
          <Header.Navigation>{story()}</Header.Navigation>
        </Header.Root>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof Header.Navbar>

export const Default: Story = {
  args: {
    data: [
      {
        name: 'Inicio',
        onClick: () => (window.location.href = '/'),
      },
      {
        name: 'Quem Somos',
        onClick: () => (window.location.href = '/'),
      },
      {
        name: 'Score',
        onClick: () => (window.location.href = '/'),
      },
      {
        name: 'Cadastro Positivo',
        onClick: () => (window.location.href = '/'),
      },
      {
        name: 'Crédito',
        onClick: () => (window.location.href = '/'),
        active: true,
        dropdown: [
          {
            name: 'Cartões de Crédito',
            onClick: () => (window.location.href = '/'),
          },
          {
            name: 'Empréstimos',
            onClick: () => (window.location.href = '/'),
            active: true,
          },
        ],
      },
      {
        name: 'Blog',
        onClick: () => (window.location.href = '/'),
      },
    ],
    renderItem: (item) => {
      return (
        <Header.NavbarLink
          key={item.name}
          active={item.active}
          dropdown={item.dropdown}
          name={item.name}
          onClick={item.onClick}
        />
      )
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import {
  IconBarChart,
  IconCreditCard,
  IconFileText,
  IconHelpCircle,
  IconLayers,
  IconMoney,
  IconNegotiation,
  IconSpark,
  IconUser,
} from '../icons/default'
import { NavbarVertical } from './index'
import { Button } from '../Button'

const meta: Meta<typeof NavbarVertical> = {
  title: 'Components/NavbarVertical',
  component: NavbarVertical,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof NavbarVertical>

export const Organic: Story = {
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
    renderItem: (link) => {
      return (
        <NavbarVertical.Link
          active={link.active}
          dropdown={link.dropdown}
          Icon={link.Icon}
          name={link.name}
          onClick={link.onClick}
        />
      )
    },
    renderActions: () => {
      return (
        <>
          <Button type="outlined">Cadastrar</Button>
          <Button>Consultar CPF</Button>
        </>
      )
    },
  },
}

export const Logged: Story = {
  args: {
    data: [
      {
        name: 'Aumentar Meu Score',
        onClick: () => (window.location.href = '/'),
        Icon: <IconSpark />,
      },
      {
        name: 'Histórico de Score',
        onClick: () => (window.location.href = '/'),
        Icon: <IconLayers />,
        active: true,
      },
      {
        name: 'Ver Meu Progresso',
        onClick: () => (window.location.href = '/'),
        Icon: <IconBarChart />,
      },
      {
        name: 'Minhas Ofertas',
        onClick: () => (window.location.href = '/'),
        Icon: <IconCreditCard />,
      },
      {
        name: 'Dívidas Negativadas',
        onClick: () => (window.location.href = '/'),
        Icon: <IconNegotiation />,
      },
      {
        name: 'Contas e Pagamentos',
        onClick: () => (window.location.href = '/'),
        Icon: <IconMoney />,
      },
      {
        name: 'Consultas em Meu CPF',
        onClick: () => (window.location.href = '/'),
        Icon: <IconFileText />,
      },
      {
        name: 'Minha Conta',
        onClick: () => (window.location.href = '/'),
        Icon: <IconUser />,
      },
      {
        name: 'Central de Ajuda',
        onClick: () => (window.location.href = '/credito'),
        Icon: <IconHelpCircle />,
      },
    ],
    renderItem: (link) => {
      return (
        <NavbarVertical.Link
          active={link.active}
          dropdown={link.dropdown}
          Icon={link.Icon}
          name={link.name}
          onClick={link.onClick}
        />
      )
    },
    renderActions: () => {
      return (
        <Button type="outlined" expand="x">
          Sair
        </Button>
      )
    },
  },
}

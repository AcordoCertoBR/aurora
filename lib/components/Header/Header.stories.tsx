import { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { LogoPrimaryCP } from '../Logo'
import { Text } from '../Text'
import { IconChevronLeft, IconX } from '../icons/default'
import HeaderRoot, { Header } from './index'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header>

export const Admission: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <HeaderRoot.Logo>
          <LogoPrimaryCP />
        </HeaderRoot.Logo>
      </Header>
    )
  },
}

export const Organic: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <HeaderRoot.Logo>
          <LogoPrimaryCP />
        </HeaderRoot.Logo>
        <HeaderRoot.Navigation>
          <HeaderRoot.Navbar
            data={[
              {
                name: 'Inicio',
                onClick: () => (window.location.href = '/'),
              },
              {
                name: 'Quem Somos',
                onClick: () => (window.location.href = '/querm-somos'),
              },
              {
                name: 'Score',
                onClick: () => (window.location.href = '/score'),
              },
              {
                name: 'Cadastro Positivo',
                onClick: () => (window.location.href = '/cadastro-positivo'),
              },
              {
                name: 'Crédito',
                onClick: () => (window.location.href = '/credito'),
              },
              {
                name: 'Blog',
                onClick: () => (window.location.href = '/blog'),
              },
            ]}
            renderItem={(item) => {
              return (
                <HeaderRoot.NavbarLink
                  name={item.name}
                  onClick={item.onClick}
                />
              )
            }}
          />
          <Button />
        </HeaderRoot.Navigation>
      </Header>
    )
  },
}

export const Blog: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <HeaderRoot.Logo>
          <LogoPrimaryCP />
          <Text variant="body-medium">Blog</Text>
        </HeaderRoot.Logo>
        <HeaderRoot.Navigation>
          <HeaderRoot.Navbar
            data={[
              {
                name: 'Inicio',
                onClick: () => (window.location.href = '/'),
              },
              {
                name: 'Limpe Seu Nome',
                onClick: () => (window.location.href = '/querm-somos'),
              },
              {
                name: 'Empréstimos',
                onClick: () => (window.location.href = '/score'),
              },
              {
                name: 'Score',
                onClick: () => (window.location.href = '/cadastro-positivo'),
              },
              {
                name: 'Mais',
                onClick: () => (window.location.href = '/credito'),
              },
            ]}
            renderItem={(item) => {
              return (
                <HeaderRoot.NavbarLink
                  name={item.name}
                  onClick={item.onClick}
                />
              )
            }}
          />
          <Button />
        </HeaderRoot.Navigation>
      </Header>
    )
  },
}

export const FunilBack: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <IconChevronLeft />
        <LogoPrimaryCP />
      </Header>
    )
  },
}

export const FunilClose: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <IconChevronLeft />
        <HeaderRoot.Logo>
          <LogoPrimaryCP />
        </HeaderRoot.Logo>
        <IconX />
      </Header>
    )
  },
}

export const FunilPartnerBack: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <IconChevronLeft />
        <HeaderRoot.Logo>
          <LogoPrimaryCP />
          <LogoPrimaryCP />
        </HeaderRoot.Logo>
      </Header>
    )
  },
}

export const FunilPartnerClose: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <IconChevronLeft />
        <HeaderRoot.Logo>
          <LogoPrimaryCP />
          <LogoPrimaryCP />
        </HeaderRoot.Logo>
        <IconX />
      </Header>
    )
  },
}

export const Dashboard: Story = {
  render: (args) => {
    return (
      <Header {...args}>
        <HeaderRoot.Logo>
          <LogoPrimaryCP />
        </HeaderRoot.Logo>
        <HeaderRoot.Navigation>
          <HeaderRoot.Navbar
            data={[
              {
                name: 'Inicio',
                onClick: () => (window.location.href = '/'),
              },
              {
                name: 'Meus Acordos',
                onClick: () => (window.location.href = '/acordos'),
              },
              {
                name: 'Minhas Ofertas',
                onClick: () => (window.location.href = '/ofertas'),
              },
              {
                name: 'Monitorar CPF',
                onClick: () => (window.location.href = '/cpf'),
              },
              {
                name: 'Central de Ajuda',
                onClick: () => (window.location.href = '/central'),
              },
            ]}
            renderItem={(item) => {
              return (
                <HeaderRoot.NavbarLink
                  name={item.name}
                  onClick={item.onClick}
                />
              )
            }}
          />
          <HeaderRoot.NavbarActions />
        </HeaderRoot.Navigation>
      </Header>
    )
  },
}

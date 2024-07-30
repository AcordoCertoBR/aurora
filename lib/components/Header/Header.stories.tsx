import { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { LogoBadgetAC, LogoBadgetCP, LogoPrimaryCP } from '../Logo'
import { Text } from '../Text'
import { IconChevronLeft, IconX } from '../icons/default'
import Header from './index'

const meta: Meta<typeof Header.Root> = {
  title: 'Components/Header',
  component: Header.Root,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Header.Root>

export const Admission: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Logo>
          <LogoPrimaryCP />
        </Header.Logo>
      </Header.Root>
    )
  },
}

export const Organic: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Logo>
          <LogoPrimaryCP />
        </Header.Logo>
        <Header.Navigation>
          <Header.Navbar
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
                <Header.NavbarLink name={item.name} onClick={item.onClick} />
              )
            }}
          />
          <Header.Actions>
            <Button>Consultar CPF</Button>
          </Header.Actions>
        </Header.Navigation>
      </Header.Root>
    )
  },
}

export const Blog: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Logo>
          <LogoPrimaryCP />
          <Text variant="body-medium">Blog</Text>
        </Header.Logo>
        <Header.Navigation>
          <Header.Navbar
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
                <Header.NavbarLink name={item.name} onClick={item.onClick} />
              )
            }}
          />
          <Header.Actions>
            <Button>Consultar CPF</Button>
          </Header.Actions>
        </Header.Navigation>
      </Header.Root>
    )
  },
}

export const FunilBack: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Link onClick={() => ''}>
          <IconChevronLeft />
        </Header.Link>
        <LogoBadgetCP />
      </Header.Root>
    )
  },
}

export const FunilClose: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Link onClick={() => ''}>
          <IconChevronLeft />
        </Header.Link>
        <LogoBadgetAC />
        <Header.Link onClick={() => ''}>
          <IconX />
        </Header.Link>
      </Header.Root>
    )
  },
}

export const FunilPartnerBack: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Link onClick={() => ''}>
          <IconChevronLeft />
        </Header.Link>
        <Header.Logo>
          <LogoBadgetCP />
          <LogoBadgetAC />
        </Header.Logo>
      </Header.Root>
    )
  },
}

export const FunilPartnerClose: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Link onClick={() => ''}>
          <IconChevronLeft />
        </Header.Link>
        <Header.Logo>
          <LogoBadgetCP />
          <LogoBadgetAC />
        </Header.Logo>
        <Header.Link onClick={() => ''}>
          <IconX />
        </Header.Link>
      </Header.Root>
    )
  },
}

export const Dashboard: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Logo>
          <LogoPrimaryCP />
        </Header.Logo>
        <Header.Navigation>
          <Header.Navbar
            data={[
              {
                name: 'Inicio',
                onClick: () => (window.location.href = '/'),
              },
              {
                name: 'Meus Acordos',
                onClick: () => (window.location.href = '/acordos'),
                active: true,
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
                <Header.NavbarLink
                  name={item.name}
                  onClick={item.onClick}
                  active={item.active}
                />
              )
            }}
          />
          <Header.Actions divider={true}>
            <Header.HeaderProfile />
          </Header.Actions>
        </Header.Navigation>
      </Header.Root>
    )
  },
}

export const OrganicSubMenu: Story = {
  render: (args) => {
    return (
      <Header.Root {...args}>
        <Header.Logo>
          <LogoPrimaryCP />
        </Header.Logo>
        <Header.Navigation>
          <Header.Navbar
            data={[
              {
                name: 'Inicio',
                onClick: () => (window.location.href = '/'),
              },
              {
                name: 'Sobre Nós',
                onClick: () => (window.location.href = '/sobre-nos'),
              },
              {
                name: 'Serviços',
                onClick: () => (window.location.href = '/score'),
                dropdown: [
                  {
                    name: 'Consultar Score',
                    onClick: () => (window.location.href = '/consultar'),
                  },
                  {
                    name: 'Sobre Meu CPF',
                    onClick: () => (window.location.href = '/Sobre'),
                    active: true,
                  },
                  {
                    name: 'Monitorar CPF',
                    onClick: () => (window.location.href = '/monitorar'),
                  },
                ],
              },
              {
                name: 'Desenrola Brasil',
                onClick: () => (window.location.href = '/cadastro-positivo'),
              },
              {
                name: 'Parceiros',
                onClick: () => (window.location.href = '/partners'),
              },
              {
                name: 'Blog',
                onClick: () => (window.location.href = '/blog'),
              },
            ]}
            renderItem={(item) => {
              console.log(item)
              return (
                <Header.NavbarLink
                  name={item.name}
                  onClick={item.onClick}
                  dropdown={item.dropdown}
                />
              )
            }}
          />
          <Header.Actions>
            <Button>Consultar CPF</Button>
          </Header.Actions>
        </Header.Navigation>
      </Header.Root>
    )
  },
}

import { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../Button'
import { Drawer } from '../../Drawer'
import { useDrawer } from '../../Drawer/hooks'
import { LogoBadgetCP, LogoPrimaryCP } from '../../Logo'
import { NavbarVertical } from '../../NavbarVertical'
import { Header } from '../index'

const meta: Meta<typeof Drawer> = {
  title: 'Components/Header/WithDrawer',
  component: Drawer,
  tags: ['autodocs'],
  decorators: [
    () => {
      const { drawerOpen, handleOpenDrawer } = useDrawer()
      return (
        <Header.Root>
          <Header.Logo>
            <LogoPrimaryCP />
          </Header.Logo>
          <Header.Actions>
            <Header.Profile onClickMenu={handleOpenDrawer} />
          </Header.Actions>

          <Drawer
            isOpen={drawerOpen}
            handleOpen={handleOpenDrawer}
            renderHeader={() => <LogoBadgetCP />}
            renderContent={() => (
              <NavbarVertical
                data={[
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
                ]}
                renderItem={(link) => {
                  return (
                    <NavbarVertical.Link
                      key={link.name}
                      active={link.active}
                      dropdown={link.dropdown}
                      Icon={link.Icon}
                      name={link.name}
                      onClick={link.onClick}
                    />
                  )
                }}
                renderActions={() => {
                  return (
                    <>
                      <Button type="outlined">Cadastrar</Button>
                      <Button>Consultar CPF</Button>
                    </>
                  )
                }}
              />
            )}
          />
        </Header.Root>
      )
    },
  ],
}

export default meta

type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  args: {
    // isOpen: false,
    // handleOpen: () => false,
    // renderHeader: () => <LogoBadgetCP />,
    // renderContent: () => (
    //   <NavbarVertical
    //     data={[
    //       {
    //         name: 'Inicio',
    //         onClick: () => '#',
    //       },
    //       {
    //         name: 'Quem Somos',
    //         onClick: () => '#',
    //       },
    //       {
    //         name: 'Score',
    //         onClick: () => '#',
    //       },
    //       {
    //         name: 'Cadastro Positivo',
    //         onClick: () => '#',
    //       },
    //       {
    //         name: 'Crédito',
    //         onClick: () => '#',
    //         active: true,
    //         dropdown: [
    //           {
    //             name: 'Cartões de Crédito',
    //             onClick: () => '#',
    //           },
    //           {
    //             name: 'Empréstimos',
    //             onClick: () => '#',
    //             active: true,
    //           },
    //         ],
    //       },
    //       {
    //         name: 'Blog',
    //         onClick: () => '#',
    //       },
    //     ]}
    //     renderItem={(link) => {
    //       return (
    //         <NavbarVertical.Link
    //           key={link.name}
    //           active={link.active}
    //           dropdown={link.dropdown}
    //           Icon={link.Icon}
    //           name={link.name}
    //           onClick={link.onClick}
    //         />
    //       )
    //     }}
    //     renderActions={() => {
    //       return (
    //         <>
    //           <Button type="outlined">Cadastrar</Button>
    //           <Button>Consultar CPF</Button>
    //         </>
    //       )
    //     }}
    //   />
    // ),
  },
}

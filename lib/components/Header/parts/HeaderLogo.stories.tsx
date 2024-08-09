import { Meta, StoryObj } from '@storybook/react'
import { LogoBadgetCP, LogoPrimaryCP, LogoTertiaryAC } from '../../Logo'
import { Header } from '../index'

const meta: Meta<typeof Header.Logo> = {
  title: 'Components/Header/WithLogo',
  component: Header.Logo,
  tags: ['autodocs'],
  argTypes: {
    children: {
      options: ['LogoPrimaryCP', 'LogoTertiaryAC'],
      mapping: {
        LogoPrimaryCP: <LogoPrimaryCP />,
        LogoTertiaryAC: <LogoTertiaryAC />,
      },
      description: 'Select Logo type',
    },
    renderDesktop: {
      description: 'Selection version Logo to render only in desktop',
    },
    renderMobile: {
      description: 'Selection version Logo to render only in mobile',
    },
  },
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

export const Responsive: Story = {
  args: {
    renderDesktop: <LogoPrimaryCP />,
    renderMobile: <LogoBadgetCP />,
  },
}

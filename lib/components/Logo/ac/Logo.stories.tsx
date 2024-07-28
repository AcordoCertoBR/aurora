import { Meta, StoryObj } from '@storybook/react'
import { LogoAC } from '../index'

const meta: Meta<typeof LogoAC> = {
  title: 'Components/Logos/AC',
  component: LogoAC,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof LogoAC>

export const Tertiary: Story = {}

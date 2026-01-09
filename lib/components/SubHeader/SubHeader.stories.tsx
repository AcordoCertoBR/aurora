import type { Meta, StoryObj } from '@storybook/react'
import { SubHeader } from './index'

const meta: Meta<typeof SubHeader> = {
  title: 'Components/SubHeader',
  component: SubHeader,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof SubHeader>

export const Default: Story = {
  args: {
    title: 'Editar informações',
    handleReturn: () => {},
  },
}

export const WithHelpInfo: Story = {
  args: {
    title: 'Editar informações',
    handleReturn: () => {},
    handleHelpInfo: () => {},
  },
}

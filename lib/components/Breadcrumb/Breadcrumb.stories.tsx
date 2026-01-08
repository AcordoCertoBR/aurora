import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumb } from './index'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Breadcrumb>

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

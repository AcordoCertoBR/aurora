import { Meta, StoryObj } from '@storybook/react'
import { TabsProps } from '.'
import { Tabs } from '.'

const meta: Meta<TabsProps> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<TabsProps>

export const CustomContent: Story = {
  args: {
    tabs: [
    {
      title: 'Todas as ofertas',
      tab: 'tab 1',
    },
    {
      title: 'Cartões',
      tab: 'tab 2',
    },
    {
      title: 'Empréstimos',
      tab: 'tab 3',
    },
  ],
  activeTab: 'tab 3',
  onClick: () => {
    alert('tab clicked');
  },
  },
}

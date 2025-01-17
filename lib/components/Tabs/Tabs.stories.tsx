import { Meta, StoryObj } from '@storybook/react'
import { TabsProps } from '.'
import { Tabs } from '.'
import { LogoBadgetAC } from '@components/Logo'
import { LogoBadgetCP } from '@components/Logo'
import { LogoPrimaryNegativeAC } from '@components/Logo'

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
      title: 'Logo do AC',
      tab: 'tab 1',
      children: <LogoBadgetAC/>
    },
    {
      title: 'Logo do CP',
      tab: 'tab 2',
      children: <LogoBadgetCP/>
    },
    {
      title: 'Logo do AC Negativo',
      tab: 'tab 3',
      children: <LogoPrimaryNegativeAC/>
    },
  ],
  initialTab: 'tab 1',
  onClick: () => {
    console.log('tab clicked');
  },
  },
}

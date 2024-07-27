import type { Meta, StoryObj } from '@storybook/react'
import DynamicTagComponent from '../DynamicTagComponent'

const meta: Meta<typeof DynamicTagComponent> = {
  title: 'Components/Utils/DynamicTagComponent',
  component: DynamicTagComponent,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DynamicTagComponent>

export const Default: Story = {
  args: {
    children: 'Dynamic tag component',
    tag: 'button',
  },
  render: (args) => {
    return <DynamicTagComponent {...args} />
  },
}

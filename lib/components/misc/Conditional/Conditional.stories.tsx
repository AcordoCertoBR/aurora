import type { Meta, StoryObj } from '@storybook/react'
import Conditional from '../Conditional'

const meta: Meta<typeof Conditional> = {
  title: 'Components/Utils/Conditional',
  component: Conditional,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Conditional>

export const Default: Story = {
  args: {
    condition: 2 === 1 + 1,
    renderIf: 'if true, render 🥔',
    renderElse: 'if false, render 🥕',
  },
  render: (args) => {
    return <Conditional {...args} />
  },
}

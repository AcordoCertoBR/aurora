import { Meta, StoryObj } from '@storybook/react'
import { FilterProps } from '.'
import { Filter } from '.'

const meta: Meta<FilterProps> = {
  title: 'Components/Filter',
  component: Filter,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<FilterProps>

export const CustomContent: Story = {
  args: {
    content: [{ title: 'Todas as ofertas', onClick: () => console.log('action!'), type: 'outlined' }, { title: 'Cartões', onClick: () => console.log('action!'), type: 'outlined' }]
  },
}

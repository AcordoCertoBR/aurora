// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import { Meta, StoryObj } from '@storybook/react'
import Icon from '../index'
import IconColorfulWarning from './IconColorfulWarning'

const meta: Meta<typeof Icon> = {
  title: 'icons/colorful',
  component: Icon,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Icon>

export const ColorfulWarning: Story = {
  render: (args) => {
    return <IconColorfulWarning {...args} />
  },
  name: 'ColorfulWarning',
}

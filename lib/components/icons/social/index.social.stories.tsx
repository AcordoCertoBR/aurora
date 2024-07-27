// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import { Meta, StoryObj } from '@storybook/react'
import Icon from '../index'
import IconSocialGoogle from './IconSocialGoogle'

const meta: Meta<typeof Icon> = {
  title: 'icons/social',
  component: Icon,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Icon>

export const SocialGoogle: Story = {
  render: (args) => {
    return <IconSocialGoogle {...args} />
  },
  name: 'SocialGoogle',
}

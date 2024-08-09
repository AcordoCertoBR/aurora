// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import { Meta, StoryObj } from '@storybook/react'
import Icon, { IconSize, IconColor } from '../Icon'
import { IconSocialGoogle } from './IconSocialGoogle'

const meta: Meta<typeof Icon> = {
  title: 'icons/social',
  component: Icon,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Icon>
type IconProps = { size: IconSize; color: IconColor }

export const Google: Story = {
  render: (args) => {
    return <IconSocialGoogle {...(args as IconProps)} />
  },
  name: 'google',
}

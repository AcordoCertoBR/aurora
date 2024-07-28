import { Meta, StoryObj } from '@storybook/react'
import {
  LogoPrimaryCP,
  LogoPrimaryFillWhiteCP,
  LogoPrimaryFullWhiteCP,
  LogoPrimaryLogoWhiteCP,
  LogoPrimaryNegativeCP,
  LogoPrimaryWhiteCP,
} from '..'

const meta: Meta = {
  title: 'Components/Logos/CP',
  component: () => '',
  tags: ['autodocs'],
}

export default meta

export const Primary: StoryObj = {
  render: (args) => {
    return <LogoPrimaryCP {...args} />
  },
}

export const PrimaryLogoWhiteCP: StoryObj = {
  render: (args) => {
    return <LogoPrimaryLogoWhiteCP {...args} />
  },
}

export const PrimaryFillWhite: StoryObj = {
  render: (args) => {
    return <LogoPrimaryFillWhiteCP {...args} />
  },
}

export const PrimaryNegative: StoryObj = {
  render: (args) => {
    return <LogoPrimaryNegativeCP {...args} />
  },
}

export const PrimaryWhite: StoryObj = {
  render: (args) => {
    return <LogoPrimaryWhiteCP {...args} />
  },
}

export const PrimaryFullWhite: StoryObj = {
  render: (args) => {
    return <LogoPrimaryFullWhiteCP {...args} />
  },
  name: 'LogoPrimaryFullWhiteCP',
}

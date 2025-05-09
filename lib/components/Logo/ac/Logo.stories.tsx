import { Meta, StoryObj } from '@storybook/react'
import {
  LogoPrimaryAC,
  LogoTertiaryAC,
  LogoPrimaryFillWhiteAC,
  LogoPrimaryNegativeAC,
  LogoPrimaryWhiteAC,
  LogoPrimaryFullWhiteAC,
  LogoBadgetAC,
	LogoBadgeWhiteStrokeAC
} from '../index'

const meta: Meta = {
  title: 'Components/Logos/AC',
  component: () => '',
  tags: ['autodocs'],
}

export default meta

export const Primary: StoryObj = {
  render: (args) => {
    return <LogoPrimaryAC {...args} />
  },
}

export const PrimaryFillWhite: StoryObj = {
  render: (args) => {
    return <LogoPrimaryFillWhiteAC {...args} />
  },
}

export const PrimaryNegative: StoryObj = {
  render: (args) => {
    return <LogoPrimaryNegativeAC {...args} />
  },
}

export const PrimaryWhite: StoryObj = {
  render: (args) => {
    return <LogoPrimaryWhiteAC {...args} />
  },
}

export const PrimaryFullWhite: StoryObj = {
  render: (args) => {
    return <LogoPrimaryFullWhiteAC {...args} />
  },
}

export const Tertiary: StoryObj = {
  render: (args) => {
    return <LogoTertiaryAC {...args} />
  },
}

export const BadgetAC: StoryObj = {
  render: (args) => {
    return <LogoBadgetAC {...args} />
  },
}

export const BadgeWhiteStrokeCP: StoryObj = {
	render: (args) => {
		return <LogoBadgeWhiteStrokeAC {...args} />
	},
}


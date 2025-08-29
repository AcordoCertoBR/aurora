import { Meta, StoryObj } from '@storybook/react'

import { CardSwitch } from './index';
import { CardSwitchProps } from './types';

const meta: Meta<CardSwitchProps> = {
  title: 'Components/CardSwitch',
  component: CardSwitch,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof CardSwitch>

export const Switch: Story = {
	render: (args) => {
		return <CardSwitch {...args} />
	},
	args: {
		isActive: true,
		id: "resubSwitch",
		label: "Teste label do switch",
		activateCallBack: () => console.log("Ativou o switch"),
		deactivateCallBack: () => console.log("Desativou o switch") , 
		shouldFadeOutAfterActivate: false
	},
}

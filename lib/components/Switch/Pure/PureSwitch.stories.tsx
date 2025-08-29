import { Meta, StoryObj } from '@storybook/react'

import { PureSwitch } from './index';
import { SwitchProps } from './types';

const meta: Meta<SwitchProps> = {
  title: 'Components/Switch',
  component: PureSwitch,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof PureSwitch>

export const Switch: Story = {
	render: (args) => {
		return <PureSwitch {...args} />
	},
	args: {
		isActive: true,
		id: "resubSwitch",
		label: "Teste label do switch",
		activateCallBack: () => console.log("Ativou o switch")
	},
}

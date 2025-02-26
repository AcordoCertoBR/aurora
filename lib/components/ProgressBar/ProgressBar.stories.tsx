import type { Meta, StoryObj } from '@storybook/react'
import { ProgressBar } from './index'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#fff' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    percentageMode: false,
    stepName: 'Etapa',
    currentStep: 1,
    totalSteps: 3,
  },
}

export const PercentageProgress: Story = {
  args: {
    percentageMode: true,
    stepName: 'Etapa',
    currentStep: 3,
    totalSteps: 12,
  },
}

export const StepProgress: Story = {
  args: {
    percentageMode: false,
    stepName: 'Etapa',
    currentStep: 3,
    totalSteps: 12,
  },
}

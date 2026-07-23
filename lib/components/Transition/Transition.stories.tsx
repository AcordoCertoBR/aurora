import { Meta, StoryObj } from '@storybook/react'
import { Transition, TransitionProps } from '.'

const meta: Meta<TransitionProps> = {
  title: 'Components/Transition',
  component: Transition,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#fff' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Transition>

const container = (args: TransitionProps) => {
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <Transition {...args} />
    </div>
  )
}

const messages = [
  'Gerando acordo...',
  'Ajustando detalhes do acordo...',
  'Tudo pronto!',
]

export const Default: Story = {
  render: (args) => container(args),
  args: {
    messages,
    messageDuration: 2000,
    align: 'left',
  },
}

export const AlignCenter: Story = {
  render: (args) => container(args),
  args: {
    messages,
    messageDuration: 2000,
    align: 'center',
  },
}

export const AsyncGated: Story = {
  render: (args) => container(args),
  parameters: {
    docs: {
      description: {
        story:
          'Enquanto `isLoading` for `true`, o fluxo segura na penúltima mensagem. Alterne para `false` nos controles para liberar a mensagem final ("Tudo pronto!") e disparar o `onFinish`.',
      },
    },
  },
  args: {
    messages,
    messageDuration: 2000,
    isLoading: true,
  },
}

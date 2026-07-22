import { Meta, StoryObj } from '@storybook/react'
import { AdBox, AdBoxProps } from '.'

const meta: Meta<AdBoxProps> = {
  title: 'Components/AdBox',
  component: AdBox,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#fff' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof AdBox>

const Placeholder = () => (
  <span style={{ color: '#c4c9d4', fontSize: 14, fontWeight: 600 }}>
    Placeholder
  </span>
)

const Creative = () => (
  <div
    role="img"
    aria-label="Anúncio do parceiro"
    style={{
      width: '100%',
      height: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#e2e4e9',
      color: '#5e6573',
      fontWeight: 600,
    }}
  >
    Ad creative
  </div>
)

const container = (args: AdBoxProps) => {
  return (
    <div style={{ width: 272 }}>
      <AdBox {...args} />
    </div>
  )
}

// Desktop/mobile são automáticos via `@include aboveMedium()` — redimensione
// o viewport para ver a variante Content alternar entre os dois layouts.
export const Content: Story = {
  render: (args) => container(args),
  args: {
    type: 'content',
    children: <Placeholder />,
  },
}

export const Heading: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <AdBox {...args} />
    </div>
  ),
  args: {
    type: 'heading',
    children: <Placeholder />,
  },
}

export const WithCreative: Story = {
  render: (args) => container(args),
  args: {
    type: 'content',
    children: <Creative />,
  },
}

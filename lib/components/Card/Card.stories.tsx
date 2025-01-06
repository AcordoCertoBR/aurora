import { Meta, StoryObj } from '@storybook/react'
import { Card } from './index'
import { COLOR_INFO_50 } from '@core/tokens'
import { IconGift } from '@components/icons'
import { Text } from '@components/Text'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Container: Story = {
  render: () => {
    return (
      <Card.Root width={280} height={300}>
        <Card.Container justifyContent="center" alignItems="center">
          <Text variant="heading-small">Hello world!</Text>
        </Card.Container>
      </Card.Root>
    )
  },
}

export const Emphasis: Story = {
  render: () => {
    return (
      <Card.Root width={280}>
        <Card.Container gap={16}>
          <Text variant="heading-small">Hello world!</Text>
          <Card.Emphasis
            content={[
              { title: 'title 1', description: 'description 1' },
              { title: 'title 2', description: 'description 2' },
            ]}
          />
        </Card.Container>
      </Card.Root>
    )
  },
}

export const Image: Story = {
  render: () => {
    return (
      <Card.Root width={280}>
        <Card.Container alignItems="center">
          <Card.Image
            alt="Cartão"
            width={140}
            src="https://assets.consumidorpositivo.com.br/f/114280/106x88/54c054bb14/cards-latampass-black.png"
          />
        </Card.Container>
      </Card.Root>
    )
  },
}

export const Tag: Story = {
  render: () => {
    return (
      <Card.Root width={280}>
        <Card.Container gap={16}>
          <Card.Tag>Tag</Card.Tag>
          <Card.Tag
            color="secondary"
            icon={<IconGift rawColor={COLOR_INFO_50} size="small" />}>
            Tag
          </Card.Tag>
        </Card.Container>
      </Card.Root>
    )
  },
}

import { Meta, StoryObj } from '@storybook/react'
import { Card } from './index'
import { IconGift } from '@components/icons'
import { COLOR_INFO_50 } from '@core/tokens'
import { Text } from '@components/Text'
import { Button } from '@components/Button'
import { Skeleton } from '@components/Skeleton'

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Offer',
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

const data = {
  img: 'https://assets.consumidorpositivo.com.br/f/114280/106x88/54c054bb14/cards-latampass-black.png',
  tag: {
    preApproved: 'Chance alta de aprovação',
    default: 'Até 3,5 pontos/dólar',
  },
  product: 'Cartão Black',
  description: 'Viagens com experiência e benefícios exclusivos!',
  limit: 'Limite de R$3.000*',
  highlights: [
    {
      title: 'Anuidade',
      description: 'Grátis por gastos',
    },
    {
      title: 'Benefício',
      description: 'Tenha acesso a pré-venda de ingressos de eventos',
    },
  ],
  button: {
    primary: 'Pedir cartão',
    secondary: 'Ver detalhes',
  },
}

export const DefaultOfferCard: Story = {
  render: () => {
    return (
      <Card.Root maxWidth={308}>
        <Card.Container gap={16} alignItems="center">
          <Card.Tag
            color="secondary"
            icon={<IconGift rawColor={COLOR_INFO_50} size="small" />}>
            {data.tag.default}
          </Card.Tag>
          <Card.Image src={data.img} />
          <Card.Container alignItems="center">
            <Text variant="heading-micro" weight="bold">
              {data.product}
            </Text>
          </Card.Container>
          <Card.Emphasis height={111} content={data.highlights} />
          <Card.Container gap={8}>
            <Button expand="x">{data.button.primary}</Button>
            <Button expand="x" type="outlined">
              {data.button.secondary}
            </Button>
          </Card.Container>
        </Card.Container>
      </Card.Root>
    )
  },
}

export const PreApprovedOfferCard: Story = {
  render: () => {
    return (
      <Card.Root maxWidth={308}>
        <Card.Container gap={16} alignItems="center">
          <Card.Tag>{data.tag.preApproved}</Card.Tag>
          <Card.Image src={data.img} />
          <Card.Container alignItems="center">
            <Text variant="body-medium" weight="semibold">
              {data.product}
            </Text>
            <Text variant="heading-small" weight="bold">
              {data.limit}
            </Text>
          </Card.Container>
          <Card.Emphasis height={81} content={[data.highlights[1]]} />
          <Card.Container gap={8}>
            <Button expand="x">{data.button.primary}</Button>
            <Button expand="x" type="outlined">
              {data.button.secondary}
            </Button>
          </Card.Container>
        </Card.Container>
      </Card.Root>
    )
  },
}

export const SmallDefaultOfferCard: Story = {
  render: () => {
    return (
      <Card.Root maxWidth={288} border={false} color="secondary">
        <Card.Container gap={16}>
          <Card.Tag
            color="secondary"
            icon={<IconGift rawColor={COLOR_INFO_50} size="small" />}>
            {data.tag.default}
          </Card.Tag>
          <Card.Container direction="row" alignItems="center" gap={16}>
            <Card.Image height={64} src={data.img} />
            <Card.Container>
              <Text variant="heading-micro" weight="bold">
                {data.product}
              </Text>
              <Text variant="body-small" color="secondary">
                {data.description}
              </Text>
            </Card.Container>
          </Card.Container>
          <Card.Container direction="row" alignItems="center" gap={8}>
            <Button type="outlined">{data.button.secondary}</Button>
            <Button>{data.button.primary}</Button>
          </Card.Container>
        </Card.Container>
      </Card.Root>
    )
  },
}

export const SmallPreApprovedOfferCard: Story = {
  render: () => {
    return (
      <Card.Root maxWidth={288} border={false}>
        <Card.Container gap={16}>
          <Card.Tag>{data.tag.preApproved}</Card.Tag>
          <Card.Container direction="row" alignItems="center" gap={16}>
            <Card.Image height={64} src={data.img} />
            <Card.Container>
              <Text variant="body-small" color="secondary" weight="semibold">
                {data.product}
              </Text>
              <Text variant="heading-small" weight="bold">
                {data.limit}
              </Text>
            </Card.Container>
          </Card.Container>
          <Card.Container direction="row" alignItems="center" gap={8}>
            <Button type="outlined">{data.button.secondary}</Button>
            <Button>{data.button.primary}</Button>
          </Card.Container>
        </Card.Container>
      </Card.Root>
    )
  },
}

export const LoadingOfferCard: Story = {
  render: () => {
    return (
      <Card.Root maxWidth={308}>
        <Card.Container gap={16} alignItems="center">
          <Skeleton height={29} block />
          <Skeleton height={72} width={88} />
          <Card.Container alignItems="center">
            <Skeleton width={194} />
          </Card.Container>
          <Skeleton shape="square" height={111} block />
          <Card.Container gap={8}>
            <Skeleton height={48} block shape="circle" />
            <Skeleton height={48} block shape="circle" />
          </Card.Container>
        </Card.Container>
      </Card.Root>
    )
  },
}

export const LoadingSmallOfferCard: Story = {
  render: () => {
    return (
      <Card.Root maxWidth={288} border={false}>
        <Card.Container gap={16}>
          <Skeleton height={29} block />
          <Card.Container direction="row" alignItems="center" gap={16}>
            <Card.Container width={80}>
              <Skeleton width={80} height={64} />
            </Card.Container>
            <Card.Container gap={8}>
              <Skeleton block height={22} />
              <Skeleton block height={40} />
            </Card.Container>
          </Card.Container>
          <Card.Container direction="row" alignItems="center" gap={8}>
            <Skeleton height={48} block shape="circle" />
            <Skeleton height={48} block shape="circle" />
          </Card.Container>
        </Card.Container>
      </Card.Root>
    )
  },
}

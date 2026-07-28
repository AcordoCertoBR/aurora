import { Meta, StoryObj } from '@storybook/react'
import { IconArrowRight } from '../icons/default'
import { LinkButton, LinkButtonProps } from '.'

const meta: Meta<LinkButtonProps> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof LinkButton>

const container = (args: LinkButtonProps) => {
  return <LinkButton {...args} />
}

export const Small: Story = {
  render: (args) => container(args),
  args: {
    children: 'Link',
    size: 'small',
    iconLeft: <IconArrowRight />,
    iconRight: <IconArrowRight />,
  },
}

export const Medium: Story = {
  render: (args) => container(args),
  args: {
    children: 'Link',
    size: 'medium',
    iconLeft: <IconArrowRight />,
    iconRight: <IconArrowRight />,
  },
}

export const Large: Story = {
  render: (args) => container(args),
  args: {
    children: 'Link',
    size: 'large',
    iconLeft: <IconArrowRight />,
    iconRight: <IconArrowRight />,
  },
}

export const WithoutIcons: Story = {
  render: (args) => container(args),
  args: {
    children: 'Link',
  },
}

export const HoverPressed: Story = {
  render: (args) => container(args),
  args: {
    children: 'Link',
    iconRight: <IconArrowRight />,
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const AsAnchor: Story = {
  render: (args) => container(args),
  args: {
    as: 'a',
    href: 'https://consumidorpositivo.com.br',
    target: '_blank',
    children: 'Link externo',
    iconRight: <IconArrowRight />,
  },
}

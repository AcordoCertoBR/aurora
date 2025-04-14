import { Meta, StoryObj } from '@storybook/react'
import { Tag, TagProps } from '.'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

const meta: Meta<TagProps> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Tag>

const container = (args: TagProps) => {
  return (
    <div style={{ width: '300px' }}>
      <Tag {...args} />
    </div>
  )
}

export const Info: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const Success: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const Warning: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const Error: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const Timer: Story = {
  render: (args) => container(args),
  args: {
    status: 'timer',
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const InfoTwoType: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    type: 2,
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const SuccessTwoType: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    type: 2,
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const WarningTwoType: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    type: 2,
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const ErrorTwoType: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    type: 2,
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const TimerTwoType: Story = {
  render: (args) => container(args),
  args: {
    status: 'timer',
    type: 2,
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const VerticalOrientation: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    orientation: 'vertical',
    title: { content: 'Title' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
  },
}

export const WithCloseButton: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    orientation: 'vertical',
    title: { content: 'Title' },
    closeButton: true
  },
}

export const WithSupportText: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    title: { content: 'Title', weight: 'bold' },
    actionButton: {content: 'Action', onClick: () => console.log('action!')},
    text: 'Support Text',
  },
}

export const WithinActionButton: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    title: { content: 'Title' },
  },
}

export const CustomContent: Story = {
  render: (args) => container(args),
  args: {
    status: 'info',
    children: (
      <div style={{ width: '100%' }}>
        <Text as="p" variant="body-large">
          Hello World
        </Text>
        <Button expand="x" type="outlined">
          Click
        </Button>
      </div>
    ),
  },
}

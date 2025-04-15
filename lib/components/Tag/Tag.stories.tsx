import { Meta, StoryObj } from '@storybook/react'
import { Tag, TagProps } from '.'

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
    text: 'support text',
  },
}

export const Success: Story = {
  render: (args) => container(args),
  args: {
    status: 'success',
    text: 'support text',
  },
}

export const Warning: Story = {
  render: (args) => container(args),
  args: {
    status: 'warning',
    text: 'support text',
  },
}

export const Error: Story = {
  render: (args) => container(args),
  args: {
    status: 'error',
    text: 'support text',
  },
}

export const Custom: Story = {
  render: (args) => container(args),
  args: {
    status: 'custom',
    text: 'support text',
    customIcon: '🔥'
  },
}

//COLOCAR AS OUTRAS VARIAÇÕES AQUI DEPOIS!!







// export const CustomContent: Story = {
//   render: (args) => container(args),
//   args: {
//     status: 'info',
//     children: (
//       <div style={{ width: '100%' }}>
//         <Text as="p" variant="body-large">
//           Hello World
//         </Text>
//         <Button expand="x" type="outlined">
//           Click
//         </Button>
//       </div>
//     ),
//   },
// }

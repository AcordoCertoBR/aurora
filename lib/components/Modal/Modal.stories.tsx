import { Meta, StoryObj } from '@storybook/react'
import { Modal } from './'
import './styles.scss'
import { Text } from '@components/Text'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#f1f1f1' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: (args) => {
    return <Modal {...args} />
  },
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    headerContent: (
      <>
        <Text variant="heading-small" weight="bold">
          Default Modal
        </Text>
        <Text variant="body-small" weight="regular">
          Helper Text
        </Text>
      </>
    ),
    content: (
      <div style={{ margin: '16px 0' }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    ),
  },
}

export const Centralized: Story = {
  render: (args) => {
    return <Modal {...args} />
  },
  args: {
    isOpen: true,
    onClose: () => console.log('Modal closed'),
    layoutMobile: 'centralized',
    layoutDesktop: 'centralized',
    headerContent: (
      <>
        <Text variant="heading-small" weight="bold">
          Centralized Modal
        </Text>
        <Text variant="body-small" weight="regular">
          Helper Text
        </Text>
      </>
    ),
    content: (
      <div style={{ marginBottom: '16px' }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    ),
  },
}

import { Meta, StoryObj } from '@storybook/react'
import { IconGift } from '../icons/default'
import { PartnerBanner, PartnerBannerProps } from '.'

const meta: Meta<PartnerBannerProps> = {
  title: 'Components/PartnerBanner',
  component: PartnerBanner,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#fff' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof PartnerBanner>

const container = (args: PartnerBannerProps) => {
  return <PartnerBanner {...args} />
}

export const Default: Story = {
  render: (args) => container(args),
  args: {
    text: 'Description text with more that two lines about something.',
    btnText: 'Link Button',
  },
}

export const WithIcon: Story = {
  render: (args) => container(args),
  args: {
    text: 'Description text with more that two lines about something.',
    btnText: 'Link Button',
    icon: <IconGift />,
  },
}

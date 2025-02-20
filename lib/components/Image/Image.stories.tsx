import type { Meta, StoryObj } from '@storybook/react'
import { Image } from '.'

const meta: Meta<typeof Image> = {
  title: 'Components/Utils/Image',
  component: Image,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Image>

export const Default: Story = {
  args: {
    srcMob: 'https://cdn.pixabay.com/photo/2022/08/31/13/05/sea-7423274_1280.jpg',
    srcTablet: 'https://cdn.pixabay.com/photo/2017/03/25/18/05/aurora-2174062_1280.jpg',
    srcDesk: 'https://cdn.pixabay.com/photo/2021/12/11/15/06/northern-lights-6862969_1280.jpg'
  },
  render: (args) => {
    return <Image {...args} style={{width: '500px'}} />
  },
}

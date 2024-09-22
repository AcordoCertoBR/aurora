import type { Meta, StoryObj } from '@storybook/react'
import { IconDownload, IconSlash } from '../icons/default'
import { Button } from './index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
}

export const PrimaryIcon: Story = {
  args: {
    children: (
      <>
        <IconDownload /> Primary + Icon
      </>
    ),
  },
}

export const PrimaryHover: Story = {
  args: {
    children: 'Primary Hover',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const PrimaryPressed: Story = {
  args: {
    children: 'Primary Pressed',
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const PrimaryDisabled: Story = {
  args: {
    children: (
      <>
        <IconSlash /> Primary Disabled
      </>
    ),
    disabled: true,
  },
}

export const PrimaryLoading: Story = {
  args: {
    children: 'Primary Loading',
    loading: true,
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outlined',
    type: 'outlined',
  },
}

export const OutlinedIcon: Story = {
  args: {
    children: (
      <>
        <IconDownload />
        Outlined + Icon
      </>
    ),
    type: 'outlined',
  },
}

export const OutlinedHover: Story = {
  args: {
    children: 'Outlined Hover',
    type: 'outlined',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const OutlinedPressed: Story = {
  args: {
    children: 'Outlined Pressed',
    type: 'outlined',
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const OutlinedDisabled: Story = {
  args: {
    children: (
      <>
        <IconSlash /> Outlined Disabled
      </>
    ),
    type: 'outlined',
    disabled: true,
  },
  parameters: {
    pseudo: { hover: true },
    children: 'Primary Hover',
  },
}

export const OutlinedLoading: Story = {
  args: {
    children: 'Outlined Loading',
    loading: true,
    type: 'outlined',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    type: 'ghost',
  },
}

export const GhostIcon: Story = {
  args: {
    children: (
      <>
        <IconDownload />
        Ghost + Icon
      </>
    ),
    type: 'ghost',
  },
}

export const GhostHover: Story = {
  args: {
    children: 'Ghost Hover',
    type: 'ghost',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const GhostPressed: Story = {
  args: {
    children: 'Ghost Pressed',
    type: 'ghost',
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const GhostDisabled: Story = {
  args: {
    children: (
      <>
        <IconSlash /> Ghost Disabled
      </>
    ),
    type: 'ghost',
    disabled: true,
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const GhostLoading: Story = {
  args: {
    children: 'Ghost Loading',
    loading: true,
    type: 'ghost',
  },
}

export const RoundPrimary: Story = {
  args: {
    children: <IconDownload />,
    round: true,
    type: 'primary'
  },
}

export const RoundOutlined: Story = {
  args: {
    children: <IconDownload />,
    round: true,
    type: 'outlined'
  },
}

export const RoundGhost: Story = {
  args: {
    children: <IconDownload />,
    round: true,
    type: 'ghost'
  },
}

export const RoundLargeSize: Story = {
  args: {
    children: <IconDownload />,
    round: true,
    size: 'large'
  },
}

// export const Negative: Story = {
//   args: {
//     children: 'Negative',
//     negative: true,
//   },
// }

// export const TextButton: Story = {
//   args: {
//     children: 'Text Button',
//     btnText: true,
//   },
// }

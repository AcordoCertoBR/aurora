import type { Meta, StoryObj } from '@storybook/react'
import { Text } from '../Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Text>

// -- Displays
export const DisplayLarge: Story = {
  args: {
    as: 'h1',
    children: 'Display Large',
    variant: 'display-large',
  },
  render: (args) => <Text {...args} />,
}

export const DisplayMedium: Story = {
  args: {
    as: 'h1',
    children: 'Display Medium',
    variant: 'display-medium',
  },
  render: (args) => <Text {...args} />,
}

export const DisplaySmall: Story = {
  args: {
    as: 'h1',
    children: 'Display Small',
    variant: 'display-small',
  },
  render: (args) => <Text {...args} />,
}

// -- Headings
export const HeadingBig: Story = {
  args: {
    as: 'h1',
    children: 'Heading Big',
    variant: 'heading-big',
  },
  render: (args) => <Text {...args} />,
}

export const HeadingLarge: Story = {
  args: {
    as: 'h1',
    children: 'Heading Large',
    variant: 'heading-large',
  },
  render: (args) => <Text {...args} />,
}

export const HeadingMedium: Story = {
  args: {
    as: 'h1',
    children: 'Heading Medium',
    variant: 'heading-medium',
  },
  render: (args) => <Text {...args} />,
}

export const HeadingSmall: Story = {
  args: {
    as: 'h3',
    children: 'Heading Small',
    variant: 'heading-small',
  },
  render: (args) => <Text {...args} />,
}

// -- BodyText
export const ParagraphBig: Story = {
  args: {
    as: 'p',
    children: 'Paragraph Big',
    variant: 'body-big',
  },
  render: (args) => <Text {...args} />,
}

export const ParagraphLarge: Story = {
  args: {
    as: 'p',
    children: 'Paragraph Large',
    variant: 'body-large',
  },
  render: (args) => <Text {...args} />,
}

export const ParagraphMedium: Story = {
  args: {
    as: 'p',
    children: 'Paragraph Medium',
    variant: 'body-medium',
  },
  render: (args) => <Text {...args} />,
}

export const ParagraphSmall: Story = {
  args: {
    as: 'p',
    children: 'Paragraph Small',
    variant: 'body-small',
  },
  render: (args) => <Text {...args} />,
}

// -- Caption
export const Caption: Story = {
  args: {
    as: 'p',
    children: 'Caption Text',
    variant: 'caption',
  },
  render: (args) => <Text {...args} />,
}

// -- Weight
export const WeightBold: Story = {
  args: {
    as: 'h1',
    children: 'Weight Bold',
    variant: 'heading-large',
    weight: 'bold',
  },
  render: (args) => <Text {...args} />,
}

export const WeightMedium: Story = {
  args: {
    as: 'h1',
    children: 'Weight Medium',
    variant: 'heading-large',
    weight: 'medium',
  },
  render: (args) => <Text {...args} />,
}

export const WeightSemibold: Story = {
  args: {
    as: 'h1',
    children: 'Weight Semibold',
    variant: 'heading-large',
    weight: 'semibold',
  },
  render: (args) => <Text {...args} />,
}

export const WeightRegular: Story = {
  args: {
    as: 'h1',
    children: 'Weight regular',
    variant: 'heading-large',
    weight: 'regular',
  },
  render: (args) => <Text {...args} />,
}

export const WeightLight: Story = {
  args: {
    as: 'h1',
    children: 'Weight Light',
    variant: 'heading-large',
    weight: 'light',
  },
  render: (args) => <Text {...args} />,
}

module.exports = function storiesContentTemplate({ content, name }) {
  return `
// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import { Meta, StoryObj } from '@storybook/react';
import Icon from "../Icon";
${content.join('\n')}

const meta: Meta<typeof Icon> = {
  title: 'icons/${name}',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icon>;

${content
  .map((Icon) => {
    const IconComp = Icon.split(' ')[1]
    const IconStory = IconComp.replace('Icon', '')
    return `
export const ${IconStory}: Story = { 
  render: (args) => {
    return (
      <${IconComp} {...args}/>
    )
  },
  name: '${IconStory}'
}`
  })
  .join('\n')}
`
}

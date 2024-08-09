import { noCase, pascalCase } from 'change-case'
import { getCollectionPrefix } from '../helpers'

export function collectionStoriesTemplate(
  componentsList: string[],
  collection: string,
) {
  return `
// This file is generated automatically
// To edit see the file lib/tasks/generateIcons.js
import { Meta, StoryObj } from '@storybook/react';
import Icon, { IconSize, IconColor } from "../Icon";
${componentsList.map((component) => `import { ${component} } from "./${component}"`).join('\n')}

const meta: Meta<typeof Icon> = {
  title: 'icons/${collection}',
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icon>;
type IconProps = { size: IconSize; color: IconColor }


${componentsList
  .map((component) => {
    const componentPrefix = getCollectionPrefix(collection)
    const iconStory = component.replace(componentPrefix, '')

    return `
    export const ${pascalCase(iconStory)}: Story = { 
      render: (args) => {
          return (
            <${component} {...args as IconProps}/>
          )
      },
      name: '${noCase(iconStory)}'
  }
  
  `
  })
  .join('\n')}

`
}

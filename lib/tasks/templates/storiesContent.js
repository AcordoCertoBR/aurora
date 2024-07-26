module.exports = function storiesContentTemplate({ content, name }) {
  return `
// This file is generated automatically
// To edit see the file libs/atlas/scr/tasks/generateIcons.js
import { Meta } from '@storybook/react';
import Icon from "../index";
${content.join('\n')}

export default {
  title: 'icons/${name}',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: 'Icons ${name}',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
} as Meta;

const Template = () => {
  return (
    <div>
      <div style={{ margin: '20px 0' }}>
        <div style={{
          width: '100%', display: 'grid',
          gridTemplateColumns: 'repeat(21, 1fr)',
          gridTemplateRows: 'repeat(15, 1fr)',
          gridColumnGap: '4px',
          gridRowGap: '4px', gap: '10px',
        }}>
        ${content
          .map((Icon) => {
            const IconComp = Icon.split(' ')[1]
            return `
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer'}} onClick={() => navigator.clipboard.writeText('<${IconComp} />')}>
            <${IconComp} />
            <div
              style={{
                fontSize: '12px',
                border: '1px solid #D4BFFF',
                padding: '4px',
                textAlign: 'center',
                color: '#510CB2',
                backgroundColor: '#F3F0FC',
                borderRadius: '4px',
                width: '100%',
              }}
            >
              ${IconComp}
            </div>
          </div>
          `
          })
          .join('\n')}
        </div>
      </div>
    </div>
  );
};

export const IconsList = Template.bind({});
`
}

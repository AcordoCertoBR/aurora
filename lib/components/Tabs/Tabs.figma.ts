// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=13237-7529
// source=lib/components/Tabs/index.tsx
// component=Tabs
import figma from 'figma'
const instance = figma.selectedInstance

// Size (Mobile | Desktop) is responsive in code — no prop.
const hasTab2 = instance.getBoolean('Tab 2?')
const hasTab3 = instance.getBoolean('Tab 3?')
const hasTab4 = instance.getBoolean('Tab 4?')

export default {
  example: figma.code`<Tabs
  tabs={[
    { tab: 'tab-1', title: 'Tab 1', children: <></> },
    ${hasTab2 ? "{ tab: 'tab-2', title: 'Tab 2', children: <></> }," : ''}
    ${hasTab3 ? "{ tab: 'tab-3', title: 'Tab 3', children: <></> }," : ''}
    ${hasTab4 ? "{ tab: 'tab-4', title: 'Tab 4', children: <></> }," : ''}
  ]}
/>`,
  imports: ["import { Tabs } from '@consumidor-positivo/aurora'"],
  id: 'tabs',
  metadata: { nestable: false },
}

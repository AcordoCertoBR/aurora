// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=18579-851
// source=lib/components/Divider/index.tsx
// component=Divider
import figma from 'figma'
const instance = figma.selectedInstance

const borderWidth = instance.getEnum('Width', { Small: '1', Large: '2' })
const state = instance.getEnum('Invisible', {
  False: 'visible',
  True: 'invisible',
})

export default {
  example: figma.code`<Divider borderWidth={${borderWidth}} state="${state}" />`,
  imports: ["import { Divider } from '@consumidor-positivo/aurora'"],
  id: 'divider',
  metadata: { nestable: true },
}

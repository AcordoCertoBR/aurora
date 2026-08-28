// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=13111-8590
// source=lib/components/AdBox/index.tsx
// component=AdBox
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', { Content: 'content', Heading: 'heading' })
// Size (Desktop | Mobile) is responsive in code — no prop.

export default {
  example: figma.code`<AdBox type="${type}" />`,
  imports: ["import { AdBox } from '@consumidor-positivo/aurora'"],
  id: 'ad-box',
  metadata: { nestable: true },
}

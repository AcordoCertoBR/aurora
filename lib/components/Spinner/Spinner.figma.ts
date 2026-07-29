// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=6785-23375
// source=lib/components/Spinner/index.tsx
// component=Spinner
import figma from 'figma'
const instance = figma.selectedInstance

// Status (Down | Left | Top | Right) are static animation frames — the code
// component animates for real, so there is no prop for it.
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})
const negative = instance.getEnum('Negative', { True: true, False: false })

export default {
  example: figma.code`<Spinner size="${size}"${negative ? ' negative' : ''} />`,
  imports: ["import { Spinner } from '@consumidor-positivo/aurora'"],
  id: 'spinner',
  metadata: { nestable: true },
}

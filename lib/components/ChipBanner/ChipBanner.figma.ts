// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=9677-1988
// source=lib/components/ChipBanner/index.tsx
// component=ChipBanner
import figma from 'figma'
const instance = figma.selectedInstance

const type = instance.getEnum('Type', { Play: 'play', Pause: 'pause' })
// States (Default | Hover / Pressed) is a CSS state — no code prop.
const negative = instance.getEnum('Negative', { True: true, False: false })

export default {
  example: figma.code`<ChipBanner type="${type}"${negative ? ' negative' : ''} timeInSeconds={10} />`,
  imports: ["import { ChipBanner } from '@consumidor-positivo/aurora'"],
  id: 'chip-banner',
  metadata: { nestable: true },
}

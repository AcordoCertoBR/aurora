// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=13880-559
// source=lib/components/Tooltip/index.tsx
// component=Tooltip
import figma from 'figma'
const instance = figma.selectedInstance

// Figma names the position by where the arrow points; code names it by
// where the balloon renders relative to the anchor.
const position = instance.getEnum('Position', {
  Down: 'bottom',
  Up: 'top',
  Right: 'right',
  Left: 'left',
})

export default {
  example: figma.code`<Tooltip text="Texto do tooltip" position="${position}">
  <span>Conteúdo ancorado</span>
</Tooltip>`,
  imports: ["import { Tooltip } from '@consumidor-positivo/aurora'"],
  id: 'tooltip',
  metadata: { nestable: false },
}

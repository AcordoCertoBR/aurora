// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=18634-14344
// source=lib/components/Chip/index.tsx
// component=Chip (variant="order")
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const active = instance.getEnum('Active?', { True: true, False: false })
// Hover/Focus are CSS states; Selected renders as active.
const state = instance.getEnum('State', {
  Default: 'default',
  Selected: 'selected',
  Hover: 'default',
  Focus: 'default',
  Disabled: 'disabled',
})

export default {
  example: figma.code`<Chip
  variant="order"
  label="${label}"
  isActive={${active || state === 'selected' ? 'true' : 'false'}}
  ${state === 'disabled' ? 'isDisabled ' : ''}onClick={() => {}}
/>`,
  imports: ["import { Chip } from '@consumidor-positivo/aurora'"],
  id: 'chip-order',
  metadata: { nestable: true },
}

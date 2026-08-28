// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=10365-5120
// source=lib/components/Chip/index.tsx
// component=Chip
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

const showIcon = instance.getBoolean('Show Icon')
const icon = showIcon ? instance.getInstanceSwap('Switch Icon') : null
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<Chip
  label="${label}"
  isActive={${active || state === 'selected' ? 'true' : 'false'}}
  ${state === 'disabled' ? 'isDisabled ' : ''}${iconCode ? figma.code`icon={${iconCode}} ` : ''}onClick={() => {}}
/>`,
  imports: ["import { Chip } from '@consumidor-positivo/aurora'"],
  id: 'chip',
  metadata: { nestable: true },
}

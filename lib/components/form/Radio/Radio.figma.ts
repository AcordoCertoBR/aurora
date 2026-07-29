// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=5951-8171
// source=lib/components/form/Radio/index.tsx
// component=Radio.Field
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label Text')
const checked = instance.getEnum('Selection', { Check: true, Uncheck: false })
const direction = instance.getEnum('Direction', { Left: 'left', Right: 'right' })
// Focus/Hover are CSS states. Error message renders at the Radio.Group level.
const state = instance.getEnum('State', {
  Default: 'default',
  Disabled: 'disabled',
  Focus: 'default',
  Error: 'error',
  Hover: 'default',
})

export default {
  example: figma.code`<Radio.Field
  ${showLabel ? figma.code`label="${label}"` : ''}
  direction="${direction}"
  ${checked ? 'defaultChecked' : ''}
  ${state === 'disabled' ? 'disabled' : ''}
  ${state === 'error' ? 'error' : ''}
/>`,
  imports: ["import { Radio } from '@consumidor-positivo/aurora'"],
  id: 'radio-field',
  metadata: { nestable: true },
}

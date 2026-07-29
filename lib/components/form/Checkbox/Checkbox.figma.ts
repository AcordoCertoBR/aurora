// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=8533-1149
// source=lib/components/form/Checkbox/index.tsx
// component=Checkbox.Field
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label Text')
const showErrorMessage = instance.getBoolean('Show Error Message')
const errorMessage = instance.getString('Error Message')
const checked = instance.getEnum('Selection', { Check: true, Uncheck: false })
// Focus/Hover are CSS states. Position (Left | Right) has no code prop yet
// (gotcha registrado no CLAUDE.md).
const state = instance.getEnum('State', {
  Default: 'default',
  Disabled: 'disabled',
  Focus: 'default',
  Error: 'error',
  Hover: 'default',
})

export default {
  example: figma.code`<Checkbox.Field
  ${showLabel ? figma.code`label="${label}"` : ''}
  ${checked ? 'defaultChecked' : ''}
  ${state === 'disabled' ? 'disabled' : ''}
  ${state === 'error' ? 'error' : ''}
  ${showErrorMessage ? figma.code`errorMessage="${errorMessage}"` : ''}
/>`,
  imports: ["import { Checkbox } from '@consumidor-positivo/aurora'"],
  id: 'checkbox-field',
  metadata: { nestable: true },
}

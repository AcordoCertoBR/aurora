// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=8815-6690
// source=lib/components/form/Datepicker/index.tsx
// component=DatepickerField
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const placeholder = instance.getString('Placeholder')
const errorMessage = instance.getString('Error Message')
const showOptional = instance.getBoolean('Show Optional')
const calendar = instance.getEnum('Function', {
  'With Calendar': true,
  Simple: false,
})
const state = instance.getEnum('States', {
  Default: 'default',
  Focus: 'default',
  Error: 'error',
  Disabled: 'disabled',
  Filled: 'default',
  Active: 'default',
  Hover: 'default',
})

export default {
  example: figma.code`<DatepickerField
  ${showLabel ? figma.code`label="${label}"` : ''}
  placeholder="${placeholder}"
  ${calendar ? 'calendar' : ''}
  ${showOptional ? 'showOptionalLabel' : ''}
  ${state === 'error' ? figma.code`error errorMessage="${errorMessage}"` : ''}
  ${state === 'disabled' ? 'disabled' : ''}
/>`,
  imports: ["import { DatepickerField } from '@consumidor-positivo/aurora'"],
  id: 'datepicker-field',
  metadata: { nestable: true },
}

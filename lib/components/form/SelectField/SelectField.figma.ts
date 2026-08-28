// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=442-2828
// source=lib/components/form/SelectField/index.tsx
// component=SelectField
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const placeholder = instance.getString('Placeholder')
const showOptional = instance.getBoolean('Opcional')
const showErrorMessage = instance.getBoolean('Show Error message')
const errorMessage = instance.getString('Error message')
// Show Option N/Scroll/Open describe the dropdown mock — options come from data.
const status = instance.getEnum('Status', {
  Default: 'default',
  Hover: 'default',
  Focus: 'default',
  Active: 'default',
  Filled: 'default',
  Disabled: 'disabled',
  Error: 'error',
})

export default {
  example: figma.code`<SelectField
  label="${label}"
  placeholder="${placeholder}"
  options={[{ value: '1', label: 'Opção 1' }]}
  ${showOptional ? 'showOptionalLabel' : ''}
  ${status === 'error' || showErrorMessage ? figma.code`error errorMessage="${errorMessage}"` : ''}
  ${status === 'disabled' ? 'disabled' : ''}
/>`,
  imports: ["import { SelectField } from '@consumidor-positivo/aurora'"],
  id: 'select-field',
  metadata: { nestable: true },
}

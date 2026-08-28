// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=442-2433
// source=lib/components/form/InputField/index.tsx
// component=InputField
import figma from 'figma'
const instance = figma.selectedInstance

const showLabel = instance.getBoolean('Show Label')
const label = instance.getString('Label')
const showPlaceholder = instance.getBoolean('Show Placeholder')
const placeholder = instance.getString('Placeholder')
const showHelpText = instance.getBoolean('Show Help Text')
const helpMessage = instance.getString('Help Text')
const errorMessage = instance.getString('Error Message')
const showOptional = instance.getBoolean('Show Optional')
// Mostrar/Ocultar + Password belong to PasswordField; Show Icon maps to
// rightSlot. Hover/Focus/Active/Filled/Skeleton/Loading are visual states.
const state = instance.getEnum('States', {
  Default: 'default',
  Hover: 'default',
  Focus: 'default',
  Active: 'default',
  Filled: 'default',
  Success: 'success',
  Error: 'error',
  Disabled: 'disabled',
  Skeleton: 'default',
  Loading: 'default',
})

export default {
  example: figma.code`<InputField
  ${showLabel ? figma.code`label="${label}"` : ''}
  ${showPlaceholder ? figma.code`placeholder="${placeholder}"` : ''}
  ${showHelpText ? figma.code`helpMessage="${helpMessage}"` : ''}
  ${showOptional ? 'showOptionalLabel' : ''}
  ${state === 'success' ? 'success' : ''}
  ${state === 'error' ? figma.code`error errorMessage="${errorMessage}"` : ''}
  ${state === 'disabled' ? 'disabled' : ''}
/>`,
  imports: ["import { InputField } from '@consumidor-positivo/aurora'"],
  id: 'input-field',
  metadata: { nestable: true },
}

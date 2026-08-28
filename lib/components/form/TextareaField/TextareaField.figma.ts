// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=10973-17349
// source=lib/components/form/TextareaField/index.tsx
// component=TextAreaField
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const placeholder = instance.getString('Placeholder')
const showOptional = instance.getBoolean('Show Optional')
const showErrorMessage = instance.getBoolean('Show Error message')
const errorMessage = instance.getString('Error message')
const showCharacterLimit = instance.getBoolean('Show Character Limit')
// Character Counter renders from maxLength; Show Expand is the native resize.
const state = instance.getEnum('States', {
  Default: 'default',
  Hover: 'default',
  Active: 'default',
  Focus: 'default',
  Filled: 'default',
  Disabled: 'disabled',
  Skeleton: 'default',
  Error: 'error',
})

export default {
  example: figma.code`<TextAreaField
  label="${label}"
  placeholder="${placeholder}"
  ${showOptional ? 'showOptionalLabel' : ''}
  ${showCharacterLimit ? 'maxLength={200}' : ''}
  ${state === 'error' || showErrorMessage ? figma.code`error errorMessage="${errorMessage}"` : ''}
  ${state === 'disabled' ? 'disabled' : ''}
/>`,
  imports: ["import { TextAreaField } from '@consumidor-positivo/aurora'"],
  id: 'textarea-field',
  metadata: { nestable: true },
}

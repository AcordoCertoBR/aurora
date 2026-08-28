// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=444-2701
// source=lib/components/form/TokenField/index.tsx
// component=TokenField
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const showHelpText = instance.getBoolean('Show Help Text')
const helpMessage = instance.getString('Help Text')
const errorMessage = instance.getString('Error Message')
const type = instance.getEnum('Type', { Code: 'number', Password: 'password' })
// Digit 1..6 are the mock content — value comes from the user.
const status = instance.getEnum('Status', {
  Default: 'default',
  Focus: 'default',
  Success: 'success',
  Error: 'error',
  Disabled: 'disabled',
  Actived: 'default',
})

export default {
  example: figma.code`<TokenField
  label="${label}"
  size={6}
  type="${type}"
  ${showHelpText ? figma.code`helpMessage="${helpMessage}"` : ''}
  ${status === 'success' ? 'success' : ''}
  ${status === 'error' ? figma.code`error errorMessage="${errorMessage}"` : ''}
  ${status === 'disabled' ? 'disabled' : ''}
  onComplete={() => {}}
/>`,
  imports: ["import { TokenField } from '@consumidor-positivo/aurora'"],
  id: 'token-field',
  metadata: { nestable: true },
}

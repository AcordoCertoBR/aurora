// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=8842-8689
// source=lib/components/Alert/index.tsx
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Label')
const text = instance.getString('Text')
// Running/Resend are the two phases of the timer status (countdown running /
// finished with resend action) — both map to status='timer'.
const status = instance.getEnum('States', {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Running: 'timer',
  Resend: 'timer',
  Progress: 'progress',
  Neutral: 'neutral',
})
const lines = instance.getEnum('Line Text', { '1': 1, '2': 2 })
const showAction = instance.getBoolean('Show Action')
// In code, orientation='vertical' places the action to the right (Figma
// Direction=Right) and 'horizontal' stacks it below (Figma Direction=Down).
const orientation = instance.getEnum('Action Direction', {
  Right: 'vertical',
  Down: 'horizontal',
  None: 'horizontal',
  Both: 'horizontal',
})

export default {
  example: figma.code`<Alert
  status="${status}"
  orientation="${orientation}"
  title={{ content: '${title}' }}
  ${lines === 2 ? figma.code`text="${text}"` : ''}
  ${showAction ? "actionButton={{ content: 'Action', onClick: () => {} }}" : ''}
/>`,
  imports: ["import { Alert } from '@consumidor-positivo/aurora'"],
  id: 'alert',
  metadata: { nestable: false },
}

// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=11702-868
// source=lib/components/ProgressBar/index.tsx
// component=ProgressBar (percentageMode)
import figma from 'figma'
const instance = figma.selectedInstance

const stepName = instance.getString('Label')
const percentage = instance.getEnum('Porcentage', {
  '0%': '0',
  '20%': '20',
  '30%': '30',
  '40%': '40',
  '50%': '50',
  '60%': '60',
  '70%': '70',
  '80%': '80',
  '90%': '90',
  '100%': '100',
})

export default {
  example: figma.code`<ProgressBar percentageMode stepName="${stepName}" currentStep={${percentage}} totalSteps={100} />`,
  imports: ["import { ProgressBar } from '@consumidor-positivo/aurora'"],
  id: 'progress-bar-percentage',
  metadata: { nestable: true },
}

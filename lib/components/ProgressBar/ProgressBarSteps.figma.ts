// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=11702-867
// source=lib/components/ProgressBar/index.tsx
// component=ProgressBar (steps)
import figma from 'figma'
const instance = figma.selectedInstance

const stepName = instance.getString('Label')
// Description is a visual detail of the Figma spec — no code prop.
const totalSteps = instance.getEnum('Quantity', {
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
})
const currentStep = instance.getEnum('Step', {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
})

export default {
  example: figma.code`<ProgressBar stepName="${stepName}" currentStep={${currentStep}} totalSteps={${totalSteps}} />`,
  imports: ["import { ProgressBar } from '@consumidor-positivo/aurora'"],
  id: 'progress-bar-steps',
  metadata: { nestable: true },
}

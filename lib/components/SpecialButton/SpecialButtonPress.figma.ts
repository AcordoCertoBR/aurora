// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=15624-745
// source=lib/components/SpecialButton/index.tsx
// component=SpecialButton (type="press")
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('✎ Label')
// Enabled/Holding/On Tap are interaction states handled by the component itself.
const state = instance.getEnum('◇ State', {
  Disabled: 'disabled',
  Enabled: 'default',
  Holding: 'default',
  Loading: 'loading',
  'On Tap': 'default',
  Success: 'success',
})

export default {
  example: figma.code`<SpecialButton type="press" ${state === 'disabled' ? 'disabled ' : ''}${state === 'loading' ? 'loading ' : ''}${state === 'success' ? 'success ' : ''}onConfirm={() => {}}>
  ${label}
</SpecialButton>`,
  imports: ["import { SpecialButton } from '@consumidor-positivo/aurora'"],
  id: 'special-button-press',
  metadata: { nestable: true },
}

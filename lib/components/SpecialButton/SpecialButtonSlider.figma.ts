// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=15618-1079
// source=lib/components/SpecialButton/index.tsx
// component=SpecialButton (type="slider")
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('✎ Label')
const variant = instance.getEnum('◇ Type', {
  Primary: 'primary',
  Secondary: 'secondary',
})
// Enabled/On Drag/On Tap are interaction states handled by the component itself.
const state = instance.getEnum('◇ State', {
  Disabled: 'disabled',
  Enabled: 'default',
  Loading: 'loading',
  'On Drag': 'default',
  'On Tap': 'default',
  Skeleton: 'skeleton',
  Success: 'success',
})

export default {
  example: figma.code`<SpecialButton type="slider" variant="${variant}" ${state === 'disabled' ? 'disabled ' : ''}${state === 'loading' ? 'loading ' : ''}${state === 'success' ? 'success ' : ''}${state === 'skeleton' ? 'skeleton ' : ''}onConfirm={() => {}}>
  ${label}
</SpecialButton>`,
  imports: ["import { SpecialButton } from '@consumidor-positivo/aurora'"],
  id: 'special-button-slider',
  metadata: { nestable: true },
}

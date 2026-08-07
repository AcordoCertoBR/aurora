// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=365-1443
// source=lib/components/Button/index.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('✎ Label')
const type = instance.getEnum('◇ Type', {
  Primary: 'primary',
  Outlined: 'outlined',
  Ghost: 'ghost',
})
const size = instance.getEnum('↕ Size', {
  Large: 'large',
  Medium: 'medium',
})
// Hover/Pressed are CSS states — they map to the same default rendering.
const state = instance.getEnum('◇ State', {
  Default: 'default',
  Hover: 'default',
  Pressed: 'default',
  Disabled: 'disabled',
  Loading: 'loading',
})
const negative = instance.getEnum('◇ Negative?', { True: true, False: false })
const round = instance.getEnum('☰ Style', { Icon: true, Default: false })

const showLeadingIcon = instance.getBoolean('👁 Show Leading Icon')
const leadingIcon = showLeadingIcon
  ? instance.getInstanceSwap('Switch Leading Icon')
  : null
let leadingIconCode
if (leadingIcon && leadingIcon.type === 'INSTANCE') {
  leadingIconCode = leadingIcon.executeTemplate().example
}

const showTrailingIcon = instance.getBoolean('👁 Show Trailing Icon')
const trailingIcon = showTrailingIcon
  ? instance.getInstanceSwap('Switch Trailing Icon')
  : null
let trailingIconCode
if (trailingIcon && trailingIcon.type === 'INSTANCE') {
  trailingIconCode = trailingIcon.executeTemplate().example
}

export default {
  example: figma.code`<Button type="${type}" size="${size}" ${negative ? 'negative ' : ''}${round ? 'round ' : ''}${state === 'disabled' ? 'disabled ' : ''}${state === 'loading' ? 'loading ' : ''}onClick={() => {}}>
  ${leadingIconCode ? figma.code`${leadingIconCode} ` : ''}${label}${trailingIconCode ? figma.code` ${trailingIconCode}` : ''}
</Button>`,
  imports: ["import { Button } from '@consumidor-positivo/aurora'"],
  id: 'button',
  metadata: { nestable: true },
}

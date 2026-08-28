// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=8772-4891
// source=lib/components/LinkButton/index.tsx
// component=LinkButton
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Label')
const size = instance.getEnum('Size', {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
})
// Status (Default | Hover / Pressed) is a CSS state — no code prop.

const hasLeftIcon = instance.getBoolean('Left Icon')
const leftIcon = hasLeftIcon ? instance.getInstanceSwap('Switch Icon Left') : null
let leftIconCode
if (leftIcon && leftIcon.type === 'INSTANCE') {
  leftIconCode = leftIcon.executeTemplate().example
}

const hasRightIcon = instance.getBoolean('Right Icon')
const rightIcon = hasRightIcon
  ? instance.getInstanceSwap('Switch Icon Right')
  : null
let rightIconCode
if (rightIcon && rightIcon.type === 'INSTANCE') {
  rightIconCode = rightIcon.executeTemplate().example
}

export default {
  example: figma.code`<LinkButton size="${size}" ${leftIconCode ? figma.code`iconLeft={${leftIconCode}} ` : ''}${rightIconCode ? figma.code`iconRight={${rightIconCode}} ` : ''}onClick={() => {}}>
  ${label}
</LinkButton>`,
  imports: ["import { LinkButton } from '@consumidor-positivo/aurora'"],
  id: 'link-button',
  metadata: { nestable: true },
}

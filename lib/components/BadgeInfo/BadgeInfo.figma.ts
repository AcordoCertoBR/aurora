// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=16358-6348
// source=lib/components/BadgeInfo/index.tsx
// component=BadgeInfo
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Label')
const status = instance.getEnum('State', {
  Neutral: 'neutral',
  Error: 'error',
  'Info/New': 'info',
  Success: 'success',
  Warning: 'warning',
  Progress: 'progress',
})

const showEmoji = instance.getBoolean('Show Emoji')
const emoji = instance.getString('Emoji')

const showIcon = instance.getBoolean('Show Icon')
const icon = showIcon ? instance.getInstanceSwap('❖ Switch Icon') : null
let iconCode
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<BadgeInfo
  status="${status}"
  text="${text}"
  ${iconCode ? figma.code`customIcon={${iconCode}}` : showEmoji ? figma.code`customIcon="${emoji}"` : ''}
/>`,
  imports: ["import { BadgeInfo } from '@consumidor-positivo/aurora'"],
  id: 'badge-info',
  metadata: { nestable: true },
}

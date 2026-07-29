// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=6375-1980
// source=lib/components/Switch/Pure/index.tsx
// component=PureSwitch
import figma from 'figma'
const instance = figma.selectedInstance

const showText = instance.getBoolean('Show Text')
const label = instance.getString('Edit Text')
const isActive = instance.getEnum('Switch', { On: true, Off: false })
// Hover is a CSS state. Show Icon / Text Direction have no code prop.
const state = instance.getEnum('State', {
  Enabled: 'enabled',
  Hover: 'enabled',
  Disabled: 'disabled',
})

export default {
  example: figma.code`<PureSwitch
  id="switch"
  isActive={${isActive ? 'true' : 'false'}}
  ${showText ? figma.code`label="${label}"` : ''}
  ${state === 'disabled' ? 'disabled' : ''}
  activateCallBack={() => {}}
/>`,
  imports: ["import { PureSwitch } from '@consumidor-positivo/aurora'"],
  id: 'pure-switch',
  metadata: { nestable: true },
}

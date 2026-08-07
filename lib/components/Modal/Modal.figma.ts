// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=17604-220
// source=lib/components/Modal/index.tsx
// component=Modal (Surface=Modal) | Drawer (Surface=BottomSheet/SideSheet)
import figma from 'figma'
const instance = figma.selectedInstance

const title = instance.getString('Label')
// Size (Mobile | Desktop) is responsive in code — no prop.
// Description/Support Text/Footer/Secondary Button compose inside the content.
const surface = instance.getEnum('Surface', {
  Modal: 'modal',
  BottomSheet: 'bottom',
  SideSheet: 'right',
})
const body = instance.getSlot('Body')

let example
if (surface === 'modal') {
  example = figma.code`<Modal
  isOpen
  onClose={() => {}}
  headerContent="${title}"
  content={<>${body}</>}
/>`
} else {
  example = figma.code`<Drawer
  isOpen
  position="${surface}"
  handleOpen={() => {}}
  renderHeader="${title}"
  renderContent={<>${body}</>}
/>`
}

export default {
  example,
  imports: ["import { Modal, Drawer } from '@consumidor-positivo/aurora'"],
  id: 'modal-v2',
  metadata: { nestable: false },
}

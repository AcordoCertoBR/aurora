import { constantCase } from 'change-case'
import { CollectionsMap, ColorEntry, ColorsMap } from './types'

export function getColorsGroups(colorsMap: ColorsMap) {
  const collectionsMap = Object.entries(colorsMap).reduce(
    (acc, [color, value]) => {
      const [, groupName] = color.split('-')
      const collection = acc[groupName] || []
      const colorEntry: ColorEntry = {
        name: color,
        value,
        titleSCSS: `$${color}`,
        titleJS: constantCase(color),
      }
      return { ...acc, [groupName]: [...collection, colorEntry] }
    },
    {} as CollectionsMap,
  )

  return Object.entries(collectionsMap)
}

export function isColorLight(hexColor: string) {
  // Convert hex color to RGB
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Check if the color is light or dark
  return luminance > 0.5
}

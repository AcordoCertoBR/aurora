import fs from 'node:fs'
import { pascalCase } from 'change-case'
import { outputFolder } from './constants'

export function formatSVG(svgContent: string, { currentColor = false }) {
  const content = svgContent
    .replace(/\\/g, '')
    .replace(/"/g, "'")
    .replace(/\n/g, '')

  if (currentColor) {
    return content.replace(new RegExp('#0048DB', 'g'), 'currentColor')
  }

  return content
}

export function getIsDefaultCollection(collection: string) {
  return collection === 'default'
}

export function getCollectionPrefix(collection: string) {
  return getIsDefaultCollection(collection)
    ? 'Icon'
    : `Icon${pascalCase(collection)}`
}

export function getComponentsOfCollection(collection: string) {
  const collectionPath = `${outputFolder}/${collection}`
  const components = fs
    .readdirSync(collectionPath)
    .filter((file) => file.startsWith('Icon'))

  return components.map((filename) => filename.replace('.tsx', ''))
}

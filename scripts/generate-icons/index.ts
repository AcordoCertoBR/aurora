import fs from 'node:fs'
import { rimrafSync } from 'rimraf'
import { pascalCase } from 'change-case'
import iconContentTemplate from './templates/iconContent'
import astroIconContentTemplate from './templates/astroIconContent'
import { iconsFolder, outputFolder } from './constants'
import {
  formatSVG,
  getCollectionPrefix,
  getComponentsOfCollection,
  getIsDefaultCollection,
} from './helpers'

function generateIconComponents() {
  const collections = fs
    .readdirSync(iconsFolder)
    .filter((item) => !item.includes('.'))

  collections.forEach((collection) => {
    createCollectionComponents(collection)
    createCollectionRoot(collection)
  })

  createIconsRoot()
}

function createCollectionComponents(collection: string) {
  const collectionPath = `${outputFolder}/${collection}`
  rimrafSync(collectionPath)
  fs.mkdirSync(collectionPath)
  const svgExt = '.svg'
  const isDefaultCollection = getIsDefaultCollection(collection)

  const collectionSVGs = fs
    .readdirSync(`${iconsFolder}/${collection}`)
    .filter((file) => file.endsWith(svgExt))

  collectionSVGs.forEach((icon) => {
    const collectionPrefix = getCollectionPrefix(collection)
    const iconName = icon.replace(svgExt, '')
    const componentName = `${collectionPrefix}${pascalCase(iconName)}`.replace(
      '_',
      '',
    )
    const destPath = `${collectionPath}/${componentName}.tsx`
    const svgContent = fs.readFileSync(
      `${iconsFolder}/${collection}/${icon}`,
      'utf8',
    )
    const formattedSvg = formatSVG(svgContent, {
      currentColor: isDefaultCollection,
    })
    const markup = JSON.stringify(formattedSvg)
    const reactComponent = iconContentTemplate(componentName, markup)
    const astroComponent = astroIconContentTemplate(componentName, markup)

    fs.writeFileSync(destPath, reactComponent, 'utf8')
    fs.writeFileSync(`${collectionPath}/${componentName}.astro`, astroComponent, 'utf8')
  })
}

function createCollectionRoot(collection: string) {
  const collectionPath = `${outputFolder}/${collection}`
  const components = getComponentsOfCollection(collection)
  const rootTemplate = components.reduce((acc, component) => {
    const reExport = `export { ${component} } from './${component}';`
    return `${acc}\n${reExport}`
  }, '')

  fs.writeFileSync(`${collectionPath}/index.tsx`, rootTemplate, 'utf8')
}

function createIconsRoot() {
  const collections = fs
    .readdirSync(outputFolder)
    .filter((item) => !item.includes('.'))

  const template =
    collections
      .map((collection) => `export * from './${collection}'`)
      .join('\n') + '\n'

  fs.writeFileSync(`${outputFolder}/index.tsx`, template, 'utf8')
}

generateIconComponents()

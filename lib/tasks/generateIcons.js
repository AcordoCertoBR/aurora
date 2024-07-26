const fs = require('fs')
const path = require('path')
const storiesContentTemplate = require('./templates/storiesContent')
const iconContentTemplate = require('./templates/iconContent')

let configs = [
  {
    name: 'default',
    prefix: 'Icon',
    exportsContent: [],
    importsContent: [],
    storiesContent: [],
  },
  {
    name: 'colorful',
    prefix: 'IconColorful',
    exportsContent: [],
    importsContent: [],
    storiesContent: [],
  },
  {
    name: 'social',
    prefix: 'IconSocial',
    exportsContent: [],
    importsContent: [],
    storiesContent: [],
  },
]

function generateAllIcons() {
  for (const icon of configs) {
    const destSvgs = `../icons/${icon.name}`
    const destFolder = `../components/icons/${icon.name}`
    const destInports = `../components/icons/${icon.name}/index.ts`
    const destStories = `../components/icons/${icon.name}/index.${icon.name}.stories.tsx`

    generateIcons({
      destSvgs,
      destFolder,
      destInports,
      destStories,
      prefix: icon.prefix,
      icon,
    })
  }
}

function generateIcons({
  destSvgs,
  destFolder,
  destInports,
  destStories,
  prefix,
  icon,
}) {
  fs.readdir(destSvgs, async (err, files) => {
    if (err) {
      console.error('Erro ao ler a pasta:', err)
      return
    }

    files.sort((a, b) => a.localeCompare(b))

    files.forEach(async (file) => {
      const pathSvg = path.join(destSvgs, file)
      fs.readFile(pathSvg, 'utf-8', (err, data) => {
        if (err) {
          console.error(`Erro ao ler o arquivo ${file}:`, err)
          return
        }

        generateIconsComponent({
          files,
          file,
          data,
          destFolder,
          destInports,
          destStories,
          prefix,
          icon,
        })
      })
    })
  })
}

function toCamelCase(str) {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase())
}

function formatSvg({ data, icon }) {
  let content = data.replace(/\\/g, '').replace(/"/g, "'").replace(/\n/g, '')

  if (icon.name === 'default') {
    return content.replace(new RegExp('#0048DB', 'g'), 'currentColor')
  }

  return content
}

async function generateIconsComponent({
  files,
  file,
  data,
  destFolder,
  destInports,
  destStories,
  prefix,
  icon,
}) {
  const svgContent = JSON.stringify(formatSvg({ data, icon }))
  const componentName = `${prefix}${toCamelCase(file.replace('.svg', ''))}`
  const componentReact = iconContentTemplate(componentName, svgContent)
  const destPath = path.join(destFolder, `${componentName}.tsx`)

  fs.writeFile(destPath, componentReact, (err) => {
    if (err) {
      console.error(`Erro ao escrever o arquivo ${destPath}:`, err)
    } else {
      console.log(`Componente React gerado com sucesso: ${destPath}`)
      icon.exportsContent.push(
        `export { default as ${componentName} } from "./${componentName}";`,
      )
      icon.importsContent.push(
        `import ${componentName} from "./${componentName}";`,
      )
    }

    if (files.indexOf(file) === files.length - 1) {
      generateExportsTemplate({
        destInports,
        icon,
      })
      generateStoriesTemplate({
        destStories,
        icon,
      })
    }
  })
}

function generateStoriesTemplate({ destStories, icon }) {
  const getStoriesContentTemplate = storiesContentTemplate({
    content: icon.importsContent,
    name: icon.name,
  })
  icon.storiesContent.push(getStoriesContentTemplate)

  fs.writeFile(destStories, icon.storiesContent.join('\n'), (err) => {
    if (err) {
      console.error(
        `Erro ao escrever o arquivo de stories ${destStories}:`,
        err,
      )
    } else {
      console.log(`Arquivo de stories gerado com sucesso: ${destStories}`)
    }
  })
}

function generateExportsTemplate({ destInports, icon }) {
  fs.writeFile(destInports, icon.exportsContent.join('\n'), (err) => {
    if (err) {
      console.error(
        `Erro ao escrever o arquivo de exportação ${destInports}:`,
        err,
      )
    } else {
      console.log(`Arquivo de exportação gerado com sucesso: ${destInports}`)
    }
  })
}

generateAllIcons()

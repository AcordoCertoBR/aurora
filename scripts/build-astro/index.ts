import glob from 'glob'
import fs from 'node:fs'
import path from 'node:path'
import { transform } from '@astrojs/compiler'

const componentsFolder = 'lib/components'
const distFolder = 'dist'
const astroDistFolder = `${distFolder}/astro`

/**
 * `.astro` files are shipped as source — the consumer's Astro compiles them.
 * The only rewrite is the stylesheet import: in the repo each component
 * imports its own `styles.scss` (the same file the React component uses), and
 * in `dist` that resolves to the CSS Vite already emitted for it, so the
 * consumer needs no Sass configuration.
 */
async function buildAstro() {
  const files = glob.sync(`${componentsFolder}/**/index.astro`)

  if (!files.length) {
    console.log('No .astro components found')
    return
  }

  console.log(`Building ${files.length} astro component(s)`)

  for (const filePath of files) {
    const relativePath = path.relative(componentsFolder, path.dirname(filePath))
    const outputPath = path.join(astroDistFolder, relativePath, 'index.astro')
    const source = fs.readFileSync(filePath, 'utf8')

    await validate(source, filePath)

    const content = replaceStylesImport(source, relativePath)

    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, content, 'utf8')
    console.log(`  ${filePath} -> ${outputPath}`)
  }
}

async function validate(source: string, filePath: string) {
  const { diagnostics } = await transform(source, { filename: filePath })
  const errors = diagnostics.filter((diagnostic) => diagnostic.severity === 1)

  if (errors.length) {
    errors.forEach((error) =>
      console.error(`${filePath}: ${error.text} (${error.code})`),
    )
    throw new Error(`Invalid astro component: ${filePath}`)
  }
}

function replaceStylesImport(source: string, relativePath: string) {
  const componentName = path.basename(relativePath)
  const stylesheet = path.join(
    distFolder,
    'components',
    componentName,
    'styles.css',
  )

  if (!fs.existsSync(stylesheet)) {
    return source.replace(/^import ['"]\.\/styles\.scss['"]\n/m, '')
  }

  const importPath = path
    .relative(path.join(astroDistFolder, relativePath), stylesheet)
    .split(path.sep)
    .join('/')

  return source.replace(/(['"])\.\/styles\.scss\1/, `'${importPath}'`)
}

buildAstro()

import glob from 'glob'
import fs from 'node:fs'
import { rimrafSync } from 'rimraf'
import { constantCase } from 'change-case'

type TokensMap = Record<string, string>

type TokensGroup = {
  name: string
  desc: string
  items: TokensMap
}

const tokensFolder = 'lib/core/tokens/'
const tokensCacheFolder = `${tokensFolder}.cache/`

function updateTokens() {
  console.log('Updating tokens')
  rimrafSync(tokensCacheFolder)
  fs.mkdirSync(tokensCacheFolder)
  const tokensFiles = glob.sync(`${tokensFolder}*.json`)
  const allTokensMap = tokensFiles.reduce((acc, tokenGroupFile) => {
    const content = fs.readFileSync(tokenGroupFile, 'utf8')
    const parsedContent = JSON.parse(content) as TokensGroup
    const tokens = parsedContent.items
    return { ...acc, ...tokens }
  }, {} as TokensMap)

  createSCSSVariables(allTokensMap)
  createTSConsts(allTokensMap)
}

function createSCSSVariables(tokensMap: TokensMap) {
  const sassCode = Object.entries(tokensMap)
    .map(([key, value]) => `$${key}: ${value};`)
    .join('\n')

  fs.writeFileSync(`${tokensCacheFolder}variables.scss`, sassCode, 'utf8')
}

function createTSConsts(tokensMap: TokensMap) {
  const TSCode = Object.entries(tokensMap)
    .map(([key, value]) => `export const ${constantCase(key)} = "${value}";`)
    .join('\n')

  fs.writeFileSync(`${tokensCacheFolder}tokens.ts`, TSCode, 'utf8')
}

updateTokens()

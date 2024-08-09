import { capitalCase, constantCase } from 'change-case'
import { useState } from 'react'

import {
  IconCopy,
  IconCheck,
  COLOR_INFO_00,
  COLOR_INFO_10,
  COLOR_INFO_50,
  BORDER_RADIUS_SMALL,
  COLOR_SUCESS_50,
  COLOR_SUCESS_00,
} from '../../main'

type ColorsMap = Record<string, string>
type ColorEntry = {
  value: string
  titleSCSS: string
  titleJS: string
  name: string
}
type CollectionsMap = Record<string, ColorEntry[]>

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

type ColorGridProps = {
  collection: string
  colors: ColorEntry[]
}

function isColorLight(hexColor: string) {
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

export function ColorGrid({ colors, collection }: ColorGridProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h1>{capitalCase(collection)}</h1>
      <div style={{ gridTemplateColumns: 'repeat(5, 1fr)', display: 'grid' }}>
        {colors.map((color) => (
          <ColorItem color={color} />
        ))}
      </div>
    </div>
  )
}

function ColorItem({ color }: { color: ColorEntry }) {
  const [isHovering, setIsHovering] = useState(false)

  function synthHover() {
    setIsHovering(true)
  }

  function synthBlur() {
    setIsHovering(false)
  }
  return (
    <div
      onMouseEnter={synthHover}
      onMouseLeave={synthBlur}
      style={{
        backgroundColor: color.value,
        height: '200px',
        cursor: 'pointer',
        fontSize: '12px',
        color: isColorLight(color.value) ? 'black' : 'white',
        padding: '15px',
        position: 'relative',
      }}>
      <div
        style={{
          position: 'absolute',
          inset: '0',
          backgroundColor: 'rgba(0,0,0, 0.7)',
          transition: 'opacity .3s ease, visibility .3s ease',
          opacity: isHovering ? 1 : 0,
          visibility: isHovering ? 'visible' : 'hidden',
          color: 'white',
          padding: '10px',
        }}>
        <ColorClipboard title="HEX" value={color.value} />
        <ColorClipboard title="SCSS" value={color.titleSCSS} />
        <ColorClipboard title="JS" value={color.titleJS} />
      </div>
      {color.name} <br />
      {color.value}
    </div>
  )
}

type ColorClipboardProps = {
  title?: string
  value: string
}

function ColorClipboard({ title, value }: ColorClipboardProps) {
  const [copied, setCopied] = useState(false)

  function copyTextValue() {
    setCopied(true)

    navigator.clipboard.writeText(value)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div>
      {title && (
        <p
          style={{
            padding: 0,
            margin: 0,
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
          {title}
        </p>
      )}
      <div
        onClick={copyTextValue}
        style={{
          transition: 'all .2s ease',
          color: copied ? COLOR_SUCESS_50 : COLOR_INFO_50,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: copied ? COLOR_SUCESS_50 : COLOR_INFO_10,
          backgroundColor: copied ? COLOR_SUCESS_00 : COLOR_INFO_00,
          fontSize: '12px',
          borderRadius: BORDER_RADIUS_SMALL,
          padding: '5px',
          overflow: 'hidden',
          position: 'relative',
        }}>
        <div
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateY(-50%)',
            color: 'red',
          }}>
          {copied ? <IconCheck rawColor={COLOR_SUCESS_50} /> : <IconCopy />}
        </div>
        {value}
      </div>
    </div>
  )
}

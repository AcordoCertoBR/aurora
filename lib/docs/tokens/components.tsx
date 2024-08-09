import { useState } from 'react'
import { capitalCase, constantCase } from 'change-case'
import {
  IconCopy,
  IconCheck,
  COLOR_INFO_00,
  COLOR_INFO_10,
  COLOR_INFO_50,
  BORDER_RADIUS_SMALL,
  COLOR_SUCESS_50,
  COLOR_SUCESS_00,
  BORDER_RADIUS_MEDIUM,
} from '../../main'

import { ColorEntry, TokenCollection } from './types'
import { isColorLight } from './helpers'

type ColorGridProps = {
  collection: string
  colors: ColorEntry[]
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
        <Clipboard title="HEX" value={color.value} />
        <Clipboard title="SCSS" value={color.titleSCSS} />
        <Clipboard title="JS" value={color.titleJS} />
      </div>
      {color.name} <br />
      {color.value}
    </div>
  )
}

type ClipboardProps = {
  title?: string
  value: string
  style?: React.CSSProperties
}

function Clipboard({ title, value, style }: ClipboardProps) {
  const [copied, setCopied] = useState(false)

  function copyTextValue() {
    setCopied(true)

    navigator.clipboard.writeText(value)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  return (
    <div style={style}>
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
          cursor: 'pointer',
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

type CollectionTableProps = {
  collections: TokenCollection[]
}

export function CollectionsList({ collections }: CollectionTableProps) {
  return (
    <div>
      {collections.map((collection) => (
        <div style={{ marginBottom: '60px' }}>
          <h2>{collection.name}</h2>
          <p>{collection.desc}</p>
          <CollectionTable collectionItems={collection.items} />
        </div>
      ))}
    </div>
  )
}

function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p style={{ padding: '0', margin: '0' }} {...props} />
}

function CollectionTable({
  collectionItems,
}: {
  collectionItems: Record<string, string>
}) {
  const entries = Object.entries(collectionItems)

  return (
    <div
      style={{
        marginTop: '30px',
      }}>
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          padding: '10px',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
        <P>
          <strong>Name</strong>
        </P>
        <P>
          <strong>Variables</strong>
        </P>
        <P>
          <strong>Value</strong>
        </P>
      </div>
      <div
        style={{
          border: '1px solid rgba(255, 255, 255, .1)',
          borderRadius: BORDER_RADIUS_MEDIUM,
        }}>
        {entries.map(([key, value], idx) => (
          <div
            style={{
              display: 'grid',
              alignItems: 'center',
              padding: '10px',
              gridTemplateColumns: 'repeat(3, 1fr)',
              borderBottom:
                idx < entries.length - 1
                  ? '1px solid rgba(255, 255, 255, .1)'
                  : 'none',
            }}>
            <div>
              <P>{key}</P>
            </div>
            <div>
              <Clipboard
                style={{ maxWidth: '200px', marginBottom: '5px' }}
                value={`$${key}`}
              />
              <Clipboard
                style={{ maxWidth: '200px' }}
                value={constantCase(key)}
              />
            </div>
            <span
              style={{
                border: '1px solid #454E54',
                color: 'rgba(201, 205, 207, 0.7)',
                padding: '3px 5px',
                backgroundColor: 'hsla(203, 50%, 30%, 0.15)',
                fontFamily:
                  'ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New", monospace',
                fontSize: '12px',
                wordBreak: 'break-word',
                whiteSpace: 'normal',
                maxWidth: '200px',
                margin: '0',
                borderRadius: '3px',
                marginRight: '4px',
                marginBottom: '4px',
                paddingTop: '2px',
                paddingBottom: '2px',
                lineHeight: '13px',
              }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

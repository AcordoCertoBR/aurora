import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Conditional } from './Conditional'
import DynamicTagComponent from './DynamicTagComponent'
import { Portal } from './Portal'

describe('Conditional', () => {
  it('renders renderIf when condition is true', () => {
    const { container } = render(
      <Conditional condition={true} renderIf={<div>yes</div>} renderElse={<div>no</div>} />,
    )
    expect(screen.getByText('yes')).toBeInTheDocument()
    expect(container.textContent).not.toContain('no')
  })

  it('renders renderElse when condition is false', () => {
    const { container } = render(
      <Conditional condition={false} renderIf={<div>yes</div>} renderElse={<div>no</div>} />,
    )
    expect(screen.getByText('no')).toBeInTheDocument()
    expect(container.textContent).not.toContain('yes')
  })
})

describe('DynamicTagComponent', () => {
  it('renders as different html tags', () => {
    const { rerender } = render(<DynamicTagComponent tag="button">Click</DynamicTagComponent>)
    expect(screen.getByText('Click').tagName.toLowerCase()).toBe('button')

    rerender(<DynamicTagComponent tag="div">Block</DynamicTagComponent>)
    expect(screen.getByText('Block').tagName.toLowerCase()).toBe('div')
  })
})

describe('Portal', () => {
  it('creates portal root and appends children', () => {
    render(<Portal><div>inside portal</div></Portal>)
    
    expect(document.getElementById('au-portal')).toBeTruthy()
    expect(screen.getByText('inside portal')).toBeInTheDocument()
  })
})

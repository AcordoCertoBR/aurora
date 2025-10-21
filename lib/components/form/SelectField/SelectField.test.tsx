import { render, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import { SelectField } from './index'

const options = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three', disabled: true },
]

describe('SelectField', () => {
  let _origScrollIntoView:
    | ((options?: ScrollIntoViewOptions | boolean) => void)
    | undefined
  beforeAll(() => {
    const proto = HTMLElement.prototype as unknown as {
      scrollIntoView?: (options?: ScrollIntoViewOptions | boolean) => void
    }
    _origScrollIntoView = proto.scrollIntoView
    proto.scrollIntoView = vi.fn()
  })

  afterAll(() => {
    const proto = HTMLElement.prototype as unknown as {
      scrollIntoView?: (options?: ScrollIntoViewOptions | boolean) => void
    }
    proto.scrollIntoView = _origScrollIntoView
  })
  it('renders and applies classes for disabled/error/required', () => {
    const { container } = render(
      <SelectField
        options={options}
        disabled
        error
        required
        className="my-class"
      />,
    )

    expect(container.querySelector('.au-field__select--disabled')).toBeTruthy()
    expect(container.querySelector('.au-field__select--error')).toBeTruthy()
    expect(container.querySelector('.au-field__select--required')).toBeTruthy()
    expect(container.querySelector('.my-class')).toBeTruthy()
  })

  it('toggles dropdown on click and sets active option on open', () => {
    const { container, getByRole } = render(<SelectField options={options} />)
    const combobox = getByRole('combobox')

    expect(combobox.getAttribute('aria-expanded')).toBe('false')

    fireEvent.click(combobox)
    expect(combobox.getAttribute('aria-expanded')).toBe('true')

    const listbox = container.querySelector('[role="listbox"]')
    expect(listbox).toBeTruthy()
    expect(listbox?.textContent).toContain('One')
  })

  it('filters options when autocomplete is enabled', async () => {
    const onChange = vi.fn()
    const { container } = render(
      <SelectField options={options} autocomplete onChange={onChange} />,
    )
    const input = container.querySelector(
      '.au-field__select-input',
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Tw' } })
    expect(onChange).toHaveBeenCalledWith('Tw')

    await waitFor(() => {
      const optionsRendered = container.querySelectorAll(
        '.au-field__select-option',
      )
      expect(optionsRendered.length).toBe(1)
      expect(optionsRendered[0].textContent).toContain('Two')
    })
  })

  it('navigates with keyboard and selects option with Enter', () => {
    const onChange = vi.fn()
    const { getByRole } = render(
      <SelectField options={options} onChange={onChange} />,
    )
    const combobox = getByRole('combobox')

    fireEvent.keyDown(combobox, { key: 'Enter' })
    expect(combobox.getAttribute('aria-expanded')).toBe('true')
    fireEvent.keyDown(combobox, { key: 'ArrowDown' })
    fireEvent.keyDown(combobox, { key: 'ArrowUp' })
    fireEvent.keyDown(combobox, { key: 'Enter' })

    expect(onChange).toHaveBeenCalled()
  })

  it('selects option via click and via native select change', () => {
    const onChange = vi.fn()
    const { container } = render(
      <SelectField options={options} onChange={onChange} />,
    )

    const combobox = container.querySelector(
      '.au-field__select-wrapper',
    ) as HTMLDivElement
    fireEvent.click(combobox)

    const optionItems = container.querySelectorAll('.au-field__select-option')

    fireEvent.pointerUp(optionItems[1])

    expect(onChange).toHaveBeenCalledWith('2')

    const select = container.querySelector('select') as HTMLSelectElement
    fireEvent.change(select, { target: { value: '1' } })
    expect(onChange).toHaveBeenCalledWith('1')
  })

  it('calls onBlur with selected option when blurred', async () => {
    const onBlur = vi.fn()
    const { getByRole, container } = render(
      <SelectField options={options} onBlur={onBlur} autocomplete />,
    )
    const combobox = getByRole('combobox')
    const input = container.querySelector(
      '.au-field__select-input',
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: 'One' } })
    fireEvent.blur(combobox)

    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(onBlur).toHaveBeenCalled()
    const callArg = onBlur.mock.calls[0][0]
    expect(callArg.target).toBeTruthy()
  })
})

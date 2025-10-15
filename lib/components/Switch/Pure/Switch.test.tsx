import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { PureSwitch } from './index'

describe('PureSwitch', () => {
  it('renders the switch with label', () => {
    render(
      <PureSwitch
        isActive={false}
        id="test-switch"
        label="Test Label"
        activateCallBack={() => {}}
        disabled={false}
      />,
    )
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('calls activateCallBack when activated', async () => {
    const activateCallBack = vi.fn()
    render(
      <PureSwitch
        isActive={false}
        id="test-switch"
        label="Test Label"
        activateCallBack={activateCallBack}
        disabled={false}
      />,
    )

    const user = userEvent.setup()
    const checkbox = screen.getByRole('switch')
    await user.click(checkbox)

    expect(activateCallBack).toHaveBeenCalled()
  })

  it('calls deactivateCallBack when deactivated', async () => {
    const deactivateCallBack = vi.fn()
    render(
      <PureSwitch
        isActive={true}
        id="test-switch"
        label="Test Label"
        activateCallBack={() => {}}
        deactivateCallBack={deactivateCallBack}
        disabled={false}
      />,
    )

    const user = userEvent.setup()
    const checkbox = screen.getByRole('switch')
    await user.click(checkbox)

    expect(deactivateCallBack).toHaveBeenCalled()
  })

  it('does not allow interaction when disabled', async () => {
    const activateCallBack = vi.fn()
    render(
      <PureSwitch
        isActive={false}
        id="test-switch"
        label="Test Label"
        activateCallBack={activateCallBack}
        disabled
      />,
    )

    const user = userEvent.setup()
    const checkbox = screen.getByRole('switch')
    await user.click(checkbox)

    expect(activateCallBack).not.toHaveBeenCalled()
  })
})
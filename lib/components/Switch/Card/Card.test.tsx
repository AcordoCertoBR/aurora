import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { CardSwitch } from './index'

describe('CardSwitch', () => {
  it('renders and applies active class when isActive is true', () => {
    render(
      <CardSwitch
        isActive={true}
        label="Card"
        id="card-switch"
        disabled={false}
        activateCallBack={() => {}}
      />,
    )

    const wrapper = document.querySelector('.au-card-switch-wrapper')
    expect(wrapper).toBeTruthy()
    expect(wrapper?.classList.contains('au-card-switch-wrapper--active')).toBe(
      true,
    )
  })

  it('applies fade-out class when shouldFadeOutAfterActivate is true and isActive', () => {
    render(
      <CardSwitch
        isActive={true}
        shouldFadeOutAfterActivate
        label="Card"
        id="card-switch"
        disabled={false}
        activateCallBack={() => {}}
      />,
    )

    const wrapper = document.querySelector('.au-card-switch-wrapper')
    expect(wrapper).toBeTruthy()
    expect(
      wrapper?.classList.contains('au-card-switch-wrapper--fade-out'),
    ).toBe(true)
  })

  it('forwards activate and deactivate callbacks to inner PureSwitch', async () => {
    const activate = vi.fn()
    const deactivate = vi.fn()
    render(
      <CardSwitch
        isActive={false}
        label="Card"
        id="card-switch"
        disabled={false}
        activateCallBack={activate}
        deactivateCallBack={deactivate}
      />,
    )

    const user = userEvent.setup()
    const checkbox = screen.getByRole('switch')
    await user.click(checkbox)

    expect(activate).toHaveBeenCalled()
  })
})

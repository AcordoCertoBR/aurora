import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Container,
  Skeleton,
  Modal,
  BadgeInfo,
  TokenField,
  SelectField,
  Checkbox,
  Radio,
  Card,
  Header,
  PureSwitch,
} from '../main'
import { IconCheck } from './icons'
import { LogoPrimaryCP } from './Logo'

describe('data-testid contract', () => {
  it('simple components forward to root', () => {
    render(
      <>
        <Container data-testid="c">x</Container>
        <Skeleton data-testid="sk" />
        <Modal isOpen data-testid="md" />
        <BadgeInfo status="info" text="t" data-testid="bi" />
        <Card.Root data-testid="cr">x</Card.Root>
        <Header.Root data-testid="hr">x</Header.Root>
        <PureSwitch
          data-testid="ps"
          isActive={false}
          label="l"
          id="i"
          disabled={false}
          activateCallBack={() => {}}
        />
      </>,
    )
    ;['c', 'sk', 'md', 'bi', 'cr', 'hr', 'ps'].forEach((id) =>
      expect(screen.getByTestId(id)).toBeInTheDocument(),
    )
  })

  it('generated icon forwards via {...props} chain', () => {
    render(<IconCheck data-testid="ic" />)
    expect(screen.getByTestId('ic')).toBeInTheDocument()
  })

  it('logo wrapper forwards through base Logo', () => {
    render(<LogoPrimaryCP data-testid="lg" />)
    expect(screen.getByTestId('lg')).toBeInTheDocument()
  })

  it('previously-broken form components now forward', () => {
    render(
      <>
        <TokenField data-testid="tk" />
        <SelectField options={[{ value: 'a', label: 'A' }]} data-testid="sf" />
        <Checkbox.Group data-testid="cg">
          {[<Checkbox.Field key="a" value="a" label="A" />]}
        </Checkbox.Group>
        <Radio.Group data-testid="rg">
          {[<Radio.Field key="a" value="a" label="A" />]}
        </Radio.Group>
      </>,
    )
    ;['tk', 'sf', 'cg', 'rg'].forEach((id) =>
      expect(screen.getByTestId(id)).toBeInTheDocument(),
    )
  })
})

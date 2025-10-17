import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './index';

describe('Checkbox', () => {
  it('renders Checkbox.Field', () => {
    const { getByLabelText } = render(<Checkbox.Field label="Label" />);
    expect(getByLabelText('Label')).toBeInTheDocument();
  });

  it('applies error prop in Checkbox.Field', () => {
    const { container } = render(<Checkbox.Field label="Label" error />);
    expect(container.querySelector('.au-checkbox--error')).toBeInTheDocument();
  });

  it('shows errorMessage only if error is true', () => {
    const { queryByText, rerender } = render(
      <Checkbox.Field label="Label" error={false} errorMessage="Error message" />
    );
    expect(queryByText('Error message')).not.toBeInTheDocument();

    rerender(
      <Checkbox.Field label="Label" error={true} errorMessage="Error message" />
    );
    expect(queryByText('Error message')).toBeInTheDocument();
  });

  it('applies disabled prop in Checkbox.Field', () => {
    const { getByLabelText } = render(<Checkbox.Field label="Label" disabled />);
    expect(getByLabelText('Label')).toBeDisabled();
  });

  it('calls onChange in Checkbox.Field', () => {
    const onChange = vi.fn();
    const { getByLabelText } = render(<Checkbox.Field label="Label" onChange={onChange} />);
    fireEvent.click(getByLabelText('Label'));
    expect(onChange).toHaveBeenCalled();
  });

  it('renders Checkbox.Group with multiple Checkbox.Field', () => {
    const { getByLabelText } = render(
      <Checkbox.Group>
        {[
          <Checkbox.Field key="1" label="Option 1" value="1" />, 
          <Checkbox.Field key="2" label="Option 2" value="2" />
        ]}
      </Checkbox.Group>
    );
    expect(getByLabelText('Option 1')).toBeInTheDocument();
    expect(getByLabelText('Option 2')).toBeInTheDocument();
  });

  it('Checkbox.Group calls onChange when selecting', () => {
    const onChange = vi.fn();
    const { getByLabelText } = render(
      <Checkbox.Group onChange={onChange}>
        {[
          <Checkbox.Field key="1" label="Option 1" value="1" />, 
          <Checkbox.Field key="2" label="Option 2" value="2" />
        ]}
      </Checkbox.Group>
    );
    fireEvent.click(getByLabelText('Option 1'));
    expect(onChange).toHaveBeenCalled();
  });

  it('applies vertical orientation by default in Checkbox.Group', () => {
    const { container } = render(
      <Checkbox.Group>
        {[
          <Checkbox.Field key="1" label="Option 1" value="1" />, 
          <Checkbox.Field key="2" label="Option 2" value="2" />
        ]}
      </Checkbox.Group>
    );
    expect(container.querySelector('.au-checkbox-group')).toBeInTheDocument();
    expect(container.querySelector('.au-checkbox-group--horizontal')).not.toBeInTheDocument();
  });

  it('applies horizontal orientation in Checkbox.Group', () => {
    const { container } = render(
      <Checkbox.Group orientation="horizontal">
        {[
          <Checkbox.Field key="1" label="Option 1" value="1" />, 
          <Checkbox.Field key="2" label="Option 2" value="2" />
        ]}
      </Checkbox.Group>
    );
    expect(container.querySelector('.au-checkbox-group')).toBeInTheDocument();
    expect(container.querySelector('.au-checkbox-group--horizontal')).toBeInTheDocument();
  });
});
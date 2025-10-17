import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { EmailField } from './index';

describe('EmailField', () => {
  it('renders EmailField', () => {
    const { container } = render(<EmailField />);
    expect(container).toBeInTheDocument();
  });

  it('shows suggestions when typing after @ and filters domains', () => {
    const { getByRole, getByRole: getBy, getAllByRole } = render(<EmailField />);
    const input = getByRole('textbox') as HTMLInputElement;

    // type user@ to open dropdown with all domains
    fireEvent.change(input, { target: { value: 'user@' } });
    const listbox = getBy('listbox');
    expect(listbox).toHaveAttribute('aria-expanded', 'true');
    // many suggestions should be present
    expect(getAllByRole('option').length).toBeGreaterThan(5);

    // refine to gm -> should filter to gmail.com
    fireEvent.change(input, { target: { value: 'user@gm' } });
    const options = getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(1);
    expect(options[0]).toHaveTextContent(/gmail\.com/);
  });

  it('calls onChange prop on typing and when suggestion clicked, and completes the email', () => {
    const onChange = vi.fn();
    const { getByRole, getAllByRole } = render(<EmailField onChange={onChange} />);
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'me@' } });
    expect(onChange).toHaveBeenCalledWith('me@');

    fireEvent.change(input, { target: { value: 'me@gm' } });
    const option = getAllByRole('option')[0];
    fireEvent.click(option);

    // after clicking suggestion, input value should be completed
    expect((getByRole('textbox') as HTMLInputElement).value).toMatch(/^me@gmail\.com$/);
    // onChange should have been called with the completed value
    expect(onChange).toHaveBeenCalledWith(expect.stringMatching(/me@gmail\.com/));
  });
});
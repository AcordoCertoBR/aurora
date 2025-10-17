import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextAreaField } from './index';

describe('TextAreaField', () => {
  it('renders TextAreaField', () => {
    const { container } = render(<TextAreaField />);
    expect(container).toBeInTheDocument();
  });
});
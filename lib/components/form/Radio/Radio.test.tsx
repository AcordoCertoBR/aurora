import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Radio } from './index';

describe('Radio', () => {
  it('renders Radio.Field', () => {
    const { container } = render(<Radio.Field label="Label" />);
    expect(container).toBeInTheDocument();
  });
  it('renders Radio.Group', () => {
    const { container } = render(
      <Radio.Group>
        {[
          <Radio.Field key="1" label="Option 1" value="1" />,
          <Radio.Field key="2" label="Option 2" value="2" />,
        ]}
      </Radio.Group>
    );
    expect(container).toBeInTheDocument();
  });
});
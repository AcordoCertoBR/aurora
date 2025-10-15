import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IsMobile } from './index';
import * as isMobileUtil from '@core/utils/isMobile';

describe('IsMobile', () => {
  let isMobileSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    isMobileSpy = vi.spyOn(isMobileUtil, 'isMobile');
  });

  afterEach(() => {
    isMobileSpy.mockRestore();
  });

  it('renders renderIf when isMobile returns true', () => {
    isMobileSpy.mockReturnValue(true);
    const { getByText } = render(
      <IsMobile renderIf={<div>Mobile</div>} renderElse={<div>Desktop</div>} />
    );
    expect(getByText('Mobile')).toBeInTheDocument();
  });

  it('renders renderElse when isMobile returns false', () => {
    isMobileSpy.mockReturnValue(false);
    const { getByText } = render(
      <IsMobile renderIf={<div>Mobile</div>} renderElse={<div>Desktop</div>} />
    );
    expect(getByText('Desktop')).toBeInTheDocument();
  });
});
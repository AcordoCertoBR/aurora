import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Image } from './index';
import { BREAKPOINT_LG, BREAKPOINT_MD } from "@core/tokens"

describe('Image', () => {
  it('renders a picture with correct sources and img', () => {
    const { container } = render(
      <Image
        srcMob="mobile.jpg"
        srcTablet="tablet.jpg"
        srcDesk="desktop.jpg"
        alt="Test image"
        data-testid="main-img"
      />
    );

    const picture = container.querySelector('picture');
    const sources = container.querySelectorAll('source');
    const img = container.querySelector('img');

    expect(picture).toBeInTheDocument();
    expect(sources.length).toBe(2);
    expect(sources[0]).toHaveAttribute('srcset', 'mobile.jpg');
    expect(sources[1]).toHaveAttribute('srcset', 'tablet.jpg');
    expect(sources[0]).toHaveAttribute('media', `(max-width: ${BREAKPOINT_MD})`);
    expect(sources[1]).toHaveAttribute('media', `(max-width: ${BREAKPOINT_LG})`);
    expect(img).toHaveAttribute('src', 'desktop.jpg');
    expect(img).toHaveAttribute('alt', 'Test image');
  });
});
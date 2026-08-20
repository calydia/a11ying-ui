import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const tokens = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8');
const globalStyles = readFileSync(new URL('./global.css', import.meta.url), 'utf8');

describe('framework-neutral style tokens', () => {
  it('contains the stable brand foundations', () => {
    expect(tokens).toContain('--color-lt-blue-dark: #033573;');
    expect(tokens).toContain('--color-dk-blue-light: #ade5f8;');
    expect(tokens).toContain('--font-sans: "Atkinson Hyperlegible", Arial, sans-serif;');
    expect(tokens).toContain('--gradient-brand:');
  });

  it('retains application utility aliases for compatibility', () => {
    expect(tokens).toContain('--spacing-4-px: 16px;');
    expect(tokens).toContain('--height-125-px: 125px;');
    expect(tokens).toContain('--max-width-screen-menu: 100rem;');
  });

  it('is consumed by the complete global stylesheet', () => {
    expect(globalStyles).toContain("@import './tokens.css';");
    expect(globalStyles).not.toContain('--color-lt-blue-dark:');
  });
});

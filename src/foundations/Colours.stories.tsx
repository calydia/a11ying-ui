import type { Meta, StoryObj } from '@storybook/react';
import tailwindConfig from '../../tailwind.config.cjs';

const colors = tailwindConfig.theme.extend.colors as Record<string, string>;

const groups: { label: string; prefix: string }[] = [
  { label: 'Light mode', prefix: 'lt-' },
  { label: 'Dark mode', prefix: 'dk-' },
  { label: 'Shared', prefix: '' },
];

function isShared(name: string) {
  return !name.startsWith('lt-') && !name.startsWith('dk-');
}

function contrastColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Perceived luminance
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.5 ? '#000' : '#fff';
}

function Swatch({ name, value }: { name: string; value: string }) {
  const text = contrastColor(value);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', width: '10rem' }}>
      <div
        style={{
          backgroundColor: value,
          color: text,
          height: '4rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0.35rem 0.5rem',
          fontSize: '0.65rem',
          fontFamily: 'monospace',
        }}
      >
        {value}
      </div>
      <span style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{name}</span>
    </div>
  );
}

function PaletteGroup({ label, prefix }: { label: string; prefix: string }) {
  const entries = Object.entries(colors).filter(([name]) =>
    prefix === '' ? isShared(name) : name.startsWith(prefix)
  );

  if (entries.length === 0) return null;

  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2 style={{ marginTop: 0 }}>{label}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {entries.map(([name, value]) => (
          <Swatch key={name} name={name} value={value} />
        ))}
      </div>
    </section>
  );
}

const meta: Meta = {
  title: 'Foundations/Colours',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};
export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => (
    <div>
      {groups.map((g) => (
        <PaletteGroup key={g.prefix} label={g.label} prefix={g.prefix} />
      ))}
    </div>
  ),
};

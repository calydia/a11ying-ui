import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';

const meta: Meta<typeof SkipLink> = {
  title: 'Components/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
  name: 'Default (focus to reveal)',
  args: {
    href: '#main-content',
    id: 'skip-to-main',
    label: 'Skip to main content',
    forceVisible: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Visually hidden until focused. Click inside this canvas and press **Tab** to see it appear.',
      },
    },
  },
};

export const Visible: Story = {
  name: 'Visible (Storybook preview)',
  args: {
    href: '#main-content',
    id: 'skip-to-main',
    label: 'Skip to main content',
    forceVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '`forceVisible` is a Storybook/testing helper only. In production always use the default hidden-until-focused behaviour.',
      },
    },
  },
};

export const MultipleLinks: Story = {
  name: 'Multiple skip links',
  render: () => (
    <div style={{ position: 'relative', minHeight: '5rem' }}>
      <SkipLink href="#main-content" id="skip-to-main" label="Skip to main content" forceVisible />
      <SkipLink href="#main-navigation" id="skip-to-nav" label="Skip to navigation" forceVisible />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple skip links can be stacked. Give each a unique `id`.',
      },
    },
  },
};

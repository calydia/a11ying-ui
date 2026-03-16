import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    ariaLabel: 'Breadcrumb',
    items: [
      { label: 'Home', href: '/en/' },
      { label: 'Fundamentals', href: '/en/fundamentals/' },
      { label: 'The basics' },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    ariaLabel: 'Breadcrumb',
    items: [{ label: 'Home' }],
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'Breadcrumb',
    items: [],
  },
};

export const LongPath: Story = {
  args: {
    ariaLabel: 'Breadcrumb',
    items: [
      { label: 'Home', href: '/en/' },
      { label: 'WCAG', href: '/en/wcag/' },
      { label: '1 Perceivable', href: '/en/wcag/perceivable/' },
      { label: '1.1 Text alternatives', href: '/en/wcag/perceivable/text-alternatives/' },
      { label: '1.1.1 Non-text content' },
    ],
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { SearchBlock } from './SearchBlock';

const meta: Meta<typeof SearchBlock> = {
  title: 'Components/SearchBlock',
  component: SearchBlock,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof SearchBlock>;

export const English: Story = {
  args: {
    searchLabel: 'Search',
    searchUrl: '/en/search/',
  },
};

export const Finnish: Story = {
  args: {
    searchLabel: 'Haku',
    searchUrl: '/fi/haku/',
  },
};

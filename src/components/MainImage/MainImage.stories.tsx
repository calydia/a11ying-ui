import type { Meta, StoryObj } from '@storybook/react';
import { MainImage } from './MainImage';

const meta: Meta<typeof MainImage> = {
  title: 'Components/MainImage',
  component: MainImage,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof MainImage>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    darkLabel: { control: 'text' },
    lightLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  args: {
    darkLabel: 'Switch to dark mode',
    lightLabel: 'Switch to light mode',
  },
};

export const Finnish: Story = {
  args: {
    darkLabel: 'Vaihda tummaan tilaan',
    lightLabel: 'Vaihda vaaleaan tilaan',
  },
};

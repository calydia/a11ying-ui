import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'alternative'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Read more',
  },
};

export const Alternative: Story = {
  args: {
    variant: 'alternative',
    children: 'Skip to content',
  },
};

export const AsLink: Story = {
  args: {
    variant: 'primary',
    href: '#',
    children: 'Go to glossary',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Submit',
  },
};

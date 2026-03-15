import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['toc', 'notice', 'blockquote'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const TableOfContents: Story = {
  args: {
    variant: 'toc',
    children: (
      <ul>
        <li><a href="#">Introduction</a></li>
        <li><a href="#">What is accessibility?</a></li>
        <li><a href="#">Who benefits</a></li>
      </ul>
    ),
  },
};

export const Notice: Story = {
  args: {
    variant: 'notice',
    children: <p>This page contains examples of inaccessible patterns for educational purposes.</p>,
  },
};

export const Blockquote: Story = {
  args: {
    variant: 'blockquote',
    children: (
      <>
        <p>The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.</p>
        <cite>Tim Berners-Lee, W3C Director</cite>
      </>
    ),
  },
};

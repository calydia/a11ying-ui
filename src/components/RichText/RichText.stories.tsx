import type { Meta, StoryObj } from '@storybook/react';
import type { RichTextNode } from '../../types/RichTextNode';
import { RichText } from './RichText';

const meta: Meta<typeof RichText> = {
  title: 'Components/RichText',
  component: RichText,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof RichText>;

// Minimal helpers to build fixture nodes without a CMS
const p = (text: string): RichTextNode => ({
  demoContent: false,
  type: 'paragraph',
  children: [{ demoContent: false, type: 'text', text }],
});

const h = (tag: NonNullable<RichTextNode['tag']>, text: string): RichTextNode => ({
  demoContent: false,
  type: 'heading',
  tag,
  children: [{ demoContent: false, type: 'text', text }],
});

const bold = (text: string): RichTextNode => ({
  demoContent: false,
  type: 'text',
  format: 1,
  text,
});

const nodes: RichTextNode[] = [
  p('This is a paragraph rendered by the RichText component. It supports all standard Payload CMS rich text node types.'),
  h('h2', 'Formatted text'),
  {
    demoContent: false,
    type: 'paragraph',
    children: [
      { demoContent: false, type: 'text', text: 'Text can be ' },
      bold('bold'),
      { demoContent: false, type: 'text', text: ', ' },
      { demoContent: false, type: 'text', format: 2, text: 'italic' },
      { demoContent: false, type: 'text', text: ', or ' },
      { demoContent: false, type: 'text', format: 16, text: 'inline code' },
      { demoContent: false, type: 'text', text: '.' },
    ],
  },
  h('h2', 'Lists'),
  {
    demoContent: false,
    type: 'list',
    tag: 'ul',
    children: [
      { demoContent: false, type: 'listitem', children: [{ demoContent: false, type: 'text', text: 'Perceivable' }] },
      { demoContent: false, type: 'listitem', children: [{ demoContent: false, type: 'text', text: 'Operable' }] },
      { demoContent: false, type: 'listitem', children: [{ demoContent: false, type: 'text', text: 'Understandable' }] },
      { demoContent: false, type: 'listitem', children: [{ demoContent: false, type: 'text', text: 'Robust' }] },
    ],
  },
  h('h2', 'Blockquote'),
  {
    demoContent: false,
    type: 'quote',
    children: [p('The power of the Web is in its universality.')],
  },
  h('h2', 'Link'),
  {
    demoContent: false,
    type: 'paragraph',
    children: [
      { demoContent: false, type: 'text', text: 'Visit the ' },
      {
        demoContent: false,
        type: 'link',
        fields: { url: 'https://www.w3.org/WAI/', newTab: true } as RichTextNode['fields'],
        children: [{ demoContent: false, type: 'text', text: 'W3C WAI website' }],
      },
      { demoContent: false, type: 'text', text: ' for more.' },
    ],
  },
];

const tocNodes: RichTextNode[] = [
  h('h2', 'Introduction'),
  p('Some introductory content.'),
  h('h2', 'The four principles'),
  p('WCAG is built around four principles.'),
  h('h3', 'Perceivable'),
  p('Information must be presentable in ways users can perceive.'),
  h('h3', 'Operable'),
  p('Interface components must be operable.'),
];

const headingIdNodes: RichTextNode[] = [
  h('h2', 'Näkö ja ääni'),
  p('Accented Finnish text should produce a readable ASCII fragment.'),
  h('h2', 'Overview'),
  p('The first repeated heading uses the base fragment.'),
  h('h2', 'Overview'),
  p('The second repeated heading receives a numeric suffix.'),
  {
    demoContent: false,
    type: 'block',
    fields: {
      blockType: 'ContentBox',
      heading: 'Overview',
      cssClass: 'notice-box',
      boxContent: {
        root: {
          children: [
            h('h3', 'Overview'),
            p('This nested heading receives an ID but stays outside the table of contents.'),
          ],
        },
      },
      content: {},
    },
  },
];

export const Default: Story = {
  args: { nodes, lang: 'en' },
};

export const Finnish: Story = {
  args: { nodes, lang: 'fi' },
};

export const WithTableOfContents: Story = {
  name: 'With table of contents',
  args: { nodes: tocNodes, lang: 'en', withTOC: true },
};

export const WithTableOfContentsFinnish: Story = {
  name: 'With table of contents (Finnish)',
  args: { nodes: tocNodes, lang: 'fi', withTOC: true },
};

export const WithCustomTocLabel: Story = {
  name: 'With custom TOC label',
  args: {
    nodes: tocNodes,
    lang: 'sv',
    withTOC: true,
    tocLabel: 'På den här sidan',
  },
};

export const HeadingIdPair: Story = {
  name: 'Heading ID pair',
  args: {
    nodes: headingIdNodes,
    lang: 'fi',
  },
  render: (args) => (
    <>
      <RichText {...args} withTOC />
      <RichText {...args} />
    </>
  ),
};

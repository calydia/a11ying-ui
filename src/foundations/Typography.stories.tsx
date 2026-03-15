import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};
export default meta;

type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div>
      <h1>Heading level 1</h1>
      <h2>Heading level 2</h2>
      <h3>Heading level 3</h3>
      <h4>Heading level 4</h4>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div>
      <p>
        This is a body paragraph using the default font (Atkinson Hyperlegible). It is set at{' '}
        <code>text-lg md:text-xl</code> with <code>font-light</code> weight and relaxed line
        height, designed for comfortable reading. The font was chosen specifically for its
        accessibility — it was created to improve character disambiguation for readers with low
        vision.
      </p>
      <p>
        A second paragraph. <strong>Bold text looks like this.</strong> Links look like{' '}
        <a href="#">this example link</a>, and an{' '}
        <a href="#" aria-current="page">active/current page link</a> looks slightly different.
      </p>
    </div>
  ),
};

export const InlineCode: Story = {
  render: () => (
    <p>
      Use the <code>aria-label</code> attribute to provide an accessible name when the visual
      label is insufficient. The <code>role="button"</code> attribute turns any element into a
      button for assistive technology, but prefer the native <code>&lt;button&gt;</code> element.
    </p>
  ),
};

export const Lists: Story = {
  render: () => (
    <div>
      <h3>Unordered list</h3>
      <ul>
        <li>Perceivable</li>
        <li>Operable</li>
        <li>Understandable</li>
        <li>Robust</li>
      </ul>

      <h3>Ordered list</h3>
      <ol>
        <li>Identify the interactive element</li>
        <li>Check keyboard reachability via Tab</li>
        <li>Verify a visible focus indicator is present</li>
        <li>Confirm the action is triggerable with Enter or Space</li>
      </ol>

      <h3>Nested list</h3>
      <ul>
        <li>
          WCAG 2.2
          <ul>
            <li>Level A</li>
            <li>Level AA</li>
            <li>Level AAA</li>
          </ul>
        </li>
        <li>WCAG 3.0 (in progress)</li>
      </ul>
    </div>
  ),
};

export const Blockquote: Story = {
  render: () => (
    <blockquote>
      <p>
        The power of the Web is in its universality. Access by everyone regardless of disability
        is an essential aspect.
      </p>
      <cite>Tim Berners-Lee, W3C Director and inventor of the World Wide Web</cite>
    </blockquote>
  ),
};

export const AllElements: Story = {
  name: 'All elements',
  render: () => (
    <article style={{ maxWidth: '65ch' }}>
      <h1>Web Content Accessibility Guidelines</h1>
      <p>
        WCAG is developed through the W3C process in cooperation with individuals and organisations
        around the world, with a goal of providing a single shared standard for web content
        accessibility.
      </p>

      <h2>The four principles</h2>
      <p>
        The guidelines are organised around four principles, often referred to as{' '}
        <strong>POUR</strong>:
      </p>
      <ul>
        <li>Perceivable</li>
        <li>Operable</li>
        <li>Understandable</li>
        <li>Robust</li>
      </ul>

      <h3>Perceivable</h3>
      <p>
        Information and user interface components must be presentable to users in ways they can
        perceive. Use <code>alt</code> text on images, captions on video, and sufficient colour
        contrast.
      </p>

      <h4>Example: colour contrast</h4>
      <p>
        Text must have a contrast ratio of at least <code>4.5:1</code> against its background
        (Level AA). Large text requires a ratio of <code>3:1</code>.
      </p>

      <blockquote>
        <p>Accessibility is not a feature, it is a social trend.</p>
        <cite>Antonio Santos</cite>
      </blockquote>

      <h2>Conformance levels</h2>
      <ol>
        <li>Level A — minimum</li>
        <li>Level AA — standard target for most sites</li>
        <li>Level AAA — enhanced</li>
      </ol>
    </article>
  ),
};

import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { RichTextNode } from '../../types/RichTextNode';
import { RichText } from './RichText';

const text = (value: string): RichTextNode => ({
  demoContent: false,
  type: 'text',
  text: value,
});

const heading = (value: string): RichTextNode => ({
  demoContent: false,
  type: 'heading',
  tag: 'h2',
  children: [text(value)],
});

const contentBox = (
  value: string,
  children: RichTextNode[] = []
): RichTextNode => ({
  demoContent: false,
  type: 'block',
  fields: {
    blockType: 'ContentBox',
    heading: value,
    boxContent: { root: { children } },
    content: {},
  },
});

describe('RichText heading IDs', () => {
  it('uses one collision namespace for normal, ContentBox, and nested headings', () => {
    const nodes = [
      heading('Näkö ja ääni'),
      contentBox('Näkö ja ääni', [heading('Näkö ja ääni')]),
    ];

    const html = renderToStaticMarkup(
      <RichText nodes={nodes} lang="fi" />
    );

    expect(html).toContain('<h2 id="nako-ja-aani"');
    expect(html).toContain('<h2 id="nako-ja-aani-1">');
    expect(html).toContain('<h2 id="nako-ja-aani-2"');
  });

  it('uses the same planned IDs for TOC links and rendered targets', () => {
    const nodes = [
      heading('Overview'),
      heading('Overview'),
      contentBox('Overview', [heading('Overview')]),
    ];

    const tocHtml = renderToStaticMarkup(
      <RichText nodes={nodes} lang="en" withTOC />
    );
    const contentHtml = renderToStaticMarkup(
      <RichText nodes={nodes} lang="en" />
    );

    expect(tocHtml).toContain('href="#overview"');
    expect(tocHtml).toContain('href="#overview-1"');
    expect(tocHtml).toContain('href="#overview-2"');
    expect(tocHtml).not.toContain('href="#overview-3"');

    expect(contentHtml).toContain('id="overview"');
    expect(contentHtml).toContain('id="overview-1"');
    expect(contentHtml).toContain('id="overview-2"');
    expect(contentHtml).toContain('id="overview-3"');
  });
});

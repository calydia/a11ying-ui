import { describe, expect, it } from 'vitest';
import type { RichTextNode, RichTextTag } from '../types/RichTextNode';
import {
  buildRichTextHeadingPlan,
  slugifyHeading,
} from './richTextHeadingPlan';

const text = (value: string): RichTextNode => ({
  demoContent: false,
  type: 'text',
  text: value,
});

const heading = (
  value: string,
  tag: RichTextTag = 'h2'
): RichTextNode => ({
  demoContent: false,
  type: 'heading',
  tag,
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

const disclosure = (children: RichTextNode[]): RichTextNode => ({
  demoContent: false,
  type: 'block',
  fields: {
    blockType: 'DisclosureWidget',
    heading: 'Details',
    content: { root: { children } },
  },
});

describe('slugifyHeading', () => {
  it.each([
    ['Näkö ja ääni', 'nako-ja-aani'],
    ['  Hello,   world!  ', 'hello-world'],
    ['Cafe\u0301', 'cafe'],
    ['中文 😀', ''],
  ])('normalizes %j to %j', (input, expected) => {
    expect(slugifyHeading(input)).toBe(expected);
  });
});

describe('buildRichTextHeadingPlan', () => {
  it('allocates duplicate suffixes without colliding with natural suffixes', () => {
    const nodes = [
      heading('Overview'),
      heading('Overview'),
      heading('Overview-1'),
      heading('Overview'),
    ];

    const plan = buildRichTextHeadingPlan(nodes);

    expect(nodes.map((node) => plan.ids.get(node))).toEqual([
      'overview',
      'overview-1',
      'overview-1-1',
      'overview-2',
    ]);
  });

  it('shares one namespace across normal and ContentBox headings', () => {
    const normal = heading('Overview');
    const box = contentBox('Overview');
    const nodes = [normal, box];

    const plan = buildRichTextHeadingPlan(nodes);

    expect(plan.ids.get(normal)).toBe('overview');
    expect(plan.ids.get(box)).toBe('overview-1');
    expect(plan.tocEntries).toEqual([
      { id: 'overview', text: 'Overview', level: 'h2' },
      { id: 'overview-1', text: 'Overview', level: 'h2' },
    ]);
  });

  it('uses type-specific fallbacks for headings without a usable slug', () => {
    const normal = heading('😀');
    const box = contentBox('中文');

    const plan = buildRichTextHeadingPlan([normal, box]);

    expect(plan.ids.get(normal)).toBe('heading');
    expect(plan.ids.get(box)).toBe('content-box');
  });

  it('allocates nested IDs without adding field-backed headings to the TOC', () => {
    const topLevel = heading('Repeated');
    const nestedInBox = heading('Repeated');
    const nestedInDisclosure = heading('Repeated');
    const box = contentBox('Box', [nestedInBox]);
    const details = disclosure([nestedInDisclosure]);

    const plan = buildRichTextHeadingPlan([topLevel, box, details]);

    expect(plan.ids.get(topLevel)).toBe('repeated');
    expect(plan.ids.get(box)).toBe('box');
    expect(plan.ids.get(nestedInBox)).toBe('repeated-1');
    expect(plan.ids.get(nestedInDisclosure)).toBe('repeated-2');
    expect(plan.tocEntries).toEqual([
      { id: 'repeated', text: 'Repeated', level: 'h2' },
      { id: 'box', text: 'Box', level: 'h2' },
    ]);
  });

  it('collects mixed inline heading text in document order', () => {
    const node: RichTextNode = {
      demoContent: false,
      type: 'heading',
      tag: 'h3',
      children: [
        text('Read '),
        { ...text('this'), format: 1 },
        text(' first'),
      ],
    };

    const plan = buildRichTextHeadingPlan([node]);

    expect(plan.ids.get(node)).toBe('read-this-first');
    expect(plan.tocEntries).toEqual([
      { id: 'read-this-first', text: 'Read this first', level: 'h3' },
    ]);
  });
});

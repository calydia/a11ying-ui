import type { RichTextNode } from '../types/RichTextNode';

export interface RichTextTocEntry {
  id: string;
  text: string;
  level: string;
}

export interface RichTextHeadingPlan {
  ids: WeakMap<RichTextNode, string>;
  tocEntries: RichTextTocEntry[];
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\p{M}+/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectText(node: RichTextNode): string {
  if (node.type === 'text') {
    return node.text ?? '';
  }

  return node.children?.map(collectText).join('') ?? '';
}

export function buildRichTextHeadingPlan(
  nodes: RichTextNode[]
): RichTextHeadingPlan {
  const ids = new WeakMap<RichTextNode, string>();
  const tocEntries: RichTextTocEntry[] = [];
  const allocatedIds = new Set<string>();
  const nextSuffix = new Map<string, number>();

  function allocateId(text: string, fallback: string): string {
    const base = slugifyHeading(text) || fallback;

    if (!allocatedIds.has(base)) {
      allocatedIds.add(base);
      nextSuffix.set(base, 1);
      return base;
    }

    let suffix = nextSuffix.get(base) ?? 1;
    let candidate = `${base}-${suffix}`;

    while (allocatedIds.has(candidate)) {
      suffix += 1;
      candidate = `${base}-${suffix}`;
    }

    allocatedIds.add(candidate);
    nextSuffix.set(base, suffix + 1);
    return candidate;
  }

  function walk(node: RichTextNode, includeInToc: boolean) {
    if (node.type === 'heading') {
      const text = collectText(node);
      const id = allocateId(text, 'heading');
      ids.set(node, id);

      if (includeInToc) {
        tocEntries.push({
          id,
          text,
          level: node.tag ?? 'h2',
        });
      }
    }

    if (node.type === 'block' && node.fields?.blockType === 'ContentBox') {
      const text = node.fields.heading ?? '';
      const id = allocateId(text, 'content-box');
      ids.set(node, id);

      if (includeInToc) {
        tocEntries.push({ id, text, level: 'h2' });
      }

      node.fields.boxContent?.root?.children?.forEach((child) => {
        walk(child, false);
      });
    } else if (
      node.type === 'block' &&
      node.fields?.blockType === 'DisclosureWidget'
    ) {
      node.fields.content?.root?.children?.forEach((child) => {
        walk(child, false);
      });
    }

    node.children?.forEach((child) => walk(child, includeInToc));
  }

  nodes.forEach((node) => walk(node, true));

  return { ids, tocEntries };
}

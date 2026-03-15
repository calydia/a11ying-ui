import type { RichTextNode } from '../../types/RichTextNode';
import React, { useMemo } from 'react';

export interface RichTextProps {
  nodes: RichTextNode[];
  /** BCP 47 language tag, e.g. "en" or "fi". Used by inline language blocks. */
  lang: string;
  /** Render a table-of-contents box above the content. */
  withTOC?: boolean;
  /**
   * Label for the table-of-contents heading.
   * Defaults to "On this page" for English, "Tällä sivulla" for Finnish.
   * Pass this prop to override or support additional languages.
   */
  tocLabel?: string;
}

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectHeadings(nodes: RichTextNode[]) {
  const headings: { id: string; text: string; level: string }[] = [];

  function walk(node: RichTextNode) {
    if (node.type === 'heading') {
      const text = node.children?.map((c) => c.text || '').join('') || '';
      const id = slugify(text);
      headings.push({ id, text, level: node.tag as unknown as string });
    }

    if (node.type === 'block' && node.fields?.blockType === 'ContentBox') {
      const text = node.fields?.heading?.replace(' ', '-');
      const id = slugify(text ?? '') || 'content-box';
      headings.push({ id, text: node.fields?.heading ?? '', level: 'h2' });
    }

    node.children?.forEach(walk);
  }

  nodes.forEach(walk);
  return headings;
}

const renderers: Record<
  string,
  (node: RichTextNode, children: React.ReactNode[], lang: string) => JSX.Element | null
> = {
  paragraph: (_, children) => <p className="mb-4">{children}</p>,

  heading: (node, children) => {
    const Tag = `${node.tag}` as keyof JSX.IntrinsicElements;
    const text = node.children?.map((c) => c.text || '').join('') || '';
    const id = slugify(text);
    return (
      <Tag id={id} className="font-bold mt-6 mb-2">
        {children}
      </Tag>
    );
  },

  text: (node) => {
    let text: React.ReactNode = node.text;

    if (node.format) {
      if (node.format & 1) text = <strong>{text}</strong>;
      if (node.format & 2) text = <em>{text}</em>;
      if (node.format & 4) text = <s>{text}</s>;
      if (node.format & 8) text = <u>{text}</u>;
      if (node.format & 16) text = <code>{text}</code>;
      if (node.format & 32) text = <sub>{text}</sub>;
      if (node.format & 64) text = <sup>{text}</sup>;
    }

    return <>{text}</>;
  },

  linebreak: () => <br />,

  link: (node, children) => (
    <a
      href={node.fields?.url}
      target={node.fields?.newTab ? '_blank' : undefined}
      rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),

  list: (node, children) => {
    const Tag = `${node.tag || 'ul'}` as keyof JSX.IntrinsicElements;
    return <Tag className="ml-6">{children}</Tag>;
  },

  listitem: (_, children) => <li>{children}</li>,

  quote: (_, children) => <blockquote>{children}</blockquote>,

  horizontalrule: () => <hr className="my-6" />,

  upload: (node) =>
    node.value?.url ? (
      <img
        src={node.value.url}
        alt={node.value.alt || ''}
        className="my-4 rounded-lg shadow"
      />
    ) : null,

  block: (node, _children, lang) => {
    const blockType = node.fields?.blockType;

    if (blockType === 'DisclosureWidget') {
      const nestedNodes = node.fields?.content?.root?.children || [];
      return (
        <details>
          <summary className="cursor-pointer font-bold text-2xl">
            {node.fields?.heading || 'Details'}
          </summary>
          <div className="details-content">
            <RichText nodes={nestedNodes} lang={lang} />
          </div>
        </details>
      );
    }

    if (blockType === 'ContentBox') {
      const nestedNodes = node.fields?.boxContent?.root?.children || [];
      const text = node.fields?.heading?.replace(' ', '-') ?? '';
      const id = slugify(text) || 'content-box';
      const mainClass = node.fields?.cssClass;
      const extraClasses =
        node.fields?.cssClass === 'box-gradient'
          ? 'gradient-border-light dark:gradient-border-dark'
          : '';

      return (
        <div className={`${mainClass} ${extraClasses}`}>
          <h2 id={id}>{node.fields?.heading}</h2>
          <div className="content-box--inner-wrapper">
            <RichText nodes={nestedNodes} lang={lang} />
          </div>
        </div>
      );
    }

    if (blockType === 'CodeBlock') {
      if (node.fields?.renderField) {
        return (
          <div
            className="richtext-html-block"
            dangerouslySetInnerHTML={{ __html: node.fields?.HTMLContent ?? '' }}
          />
        );
      }
      return (
        <code className="w-full my-2 block">{node.fields?.HTMLContent}</code>
      );
    }

    if (blockType === 'quoteWithCite') {
      return (
        <blockquote>
          {node.fields?.quote}
          <cite>{node.fields?.cite}</cite>
        </blockquote>
      );
    }

    return null;
  },

  inlineBlock: (node) => {
    const blockType = node.fields?.blockType;

    if (blockType === 'language') {
      return (
        <span lang={node.fields?.language || 'en'}>
          {node.fields?.languageContent}
        </span>
      );
    }

    if (blockType === 'abbreviation') {
      return (
        <abbr title={node.fields?.definition ?? undefined}>
          {node.fields?.abbreviation}
        </abbr>
      );
    }

    return null;
  },
};

function renderNode(
  node: RichTextNode,
  key: number,
  lang: string
): JSX.Element | null {
  const children =
    node.children?.map((child, i) => renderNode(child, i, lang)) || [];

  if (renderers[node.type]) {
    return (
      <React.Fragment key={key}>
        {renderers[node.type](node, children, lang)}
      </React.Fragment>
    );
  }

  return (
    <span key={key} className="bg-red-100 text-red-700">
      [Unhandled node type: {node.type}]
    </span>
  );
}

function defaultTocLabel(lang: string): string {
  return lang === 'fi' ? 'Tällä sivulla' : 'On this page';
}

export function RichText({ nodes, lang, withTOC = false, tocLabel }: RichTextProps) {
  const toc = useMemo(() => collectHeadings(nodes), [nodes]);
  const heading = tocLabel ?? defaultTocLabel(lang);

  if (withTOC) {
    return (
      <>
        {toc.length > 0 && (
          <div className="toc-box">
            <h2 id="toc-heading" className="mb-2 mt-0">
              {heading}
            </h2>
            <nav aria-labelledby="toc-heading">
              <ul className="ml-4 mb-0">
                {toc.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-blue-600 underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </>
    );
  }

  return <>{nodes.map((node, i) => renderNode(node, i, lang))}</>;
}

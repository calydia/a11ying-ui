import type { RichTextNode } from '../../types/RichTextNode';
import {
  buildRichTextHeadingPlan,
  type RichTextHeadingPlan,
} from '../../lib/richTextHeadingPlan';
import { sanitizeCmsHtml, sanitizeCmsUrl } from '../../lib/sanitizeCmsHtml';
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

interface RenderContext {
  lang: string;
  headingPlan: RichTextHeadingPlan;
}

const renderers: Record<
  string,
  (
    node: RichTextNode,
    children: React.ReactNode[],
    context: RenderContext
  ) => React.JSX.Element | null
> = {
  paragraph: (_, children) => <p className="mb-4">{children}</p>,

  heading: (node, children, context) => {
    const Tag = (node.tag || 'h2') as React.ElementType;
    const id = context.headingPlan.ids.get(node) ?? 'heading';
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

  link: (node, children) => {
    const href = sanitizeCmsUrl(node.fields?.url);

    return href ? (
      <a
        href={href}
        target={node.fields?.newTab ? '_blank' : undefined}
        rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
        className="underline underline-offset-4 decoration-1 hover:decoration-2"
      >
        {children}
      </a>
    ) : <>{children}</>;
  },

  list: (node, children) => {
    const Tag = (node.tag || 'ul') as React.ElementType;
    return <Tag className="ml-6">{children}</Tag>;
  },

  listitem: (_, children) => <li>{children}</li>,

  quote: (_, children) => <blockquote>{children}</blockquote>,

  horizontalrule: () => <hr className="my-6" />,

  upload: (node) => {
    const value = node.value;
    const src = sanitizeCmsUrl(value?.url, ['http', 'https']);

    return src ? (
      <img
        src={src}
        alt={value?.alt || ''}
        className="my-4 rounded-lg shadow"
      />
    ) : null;
  },

  block: (node, _children, context) => {
    const blockType = node.fields?.blockType;

    if (blockType === 'DisclosureWidget') {
      const nestedNodes = node.fields?.content?.root?.children || [];
      return (
        <details>
          <summary className="cursor-pointer font-bold text-2xl">
            {node.fields?.heading || 'Details'}
          </summary>
          <div className="details-content">
            {renderNodes(nestedNodes, context)}
          </div>
        </details>
      );
    }

    if (blockType === 'ContentBox') {
      const nestedNodes = node.fields?.boxContent?.root?.children || [];
      const id = context.headingPlan.ids.get(node) ?? 'content-box';
      const mainClass = node.fields?.cssClass;
      const extraClasses =
        node.fields?.cssClass === 'box-gradient'
          ? 'gradient-border-light dark:gradient-border-dark'
          : '';

      return (
        <div className={`${mainClass} ${extraClasses}`}>
          <h2 id={id}>{node.fields?.heading}</h2>
          <div className="content-box--inner-wrapper">
            {renderNodes(nestedNodes, context)}
          </div>
        </div>
      );
    }

    if (blockType === 'CodeBlock') {
      if (node.fields?.renderField) {
        return (
          <div
            className="richtext-html-block"
            dangerouslySetInnerHTML={{ __html: sanitizeCmsHtml(node.fields?.HTMLContent) }}
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
  context: RenderContext
): React.JSX.Element | null {
  const children =
    node.children?.map((child, i) => renderNode(child, i, context)) || [];

  if (renderers[node.type]) {
    return (
      <React.Fragment key={key}>
        {renderers[node.type](node, children, context)}
      </React.Fragment>
    );
  }

  return (
    <span key={key} className="bg-red-100 text-red-700">
      [Unhandled node type: {node.type}]
    </span>
  );
}

function renderNodes(nodes: RichTextNode[], context: RenderContext) {
  return nodes.map((node, index) => renderNode(node, index, context));
}

function defaultTocLabel(lang: string): string {
  return lang === 'fi' ? 'Tällä sivulla' : 'On this page';
}

export function RichText({ nodes, lang, withTOC = false, tocLabel }: RichTextProps) {
  const headingPlan = useMemo(() => buildRichTextHeadingPlan(nodes), [nodes]);
  const heading = tocLabel ?? defaultTocLabel(lang);

  if (withTOC) {
    return (
      <>
        {headingPlan.tocEntries.length > 0 && (
          <div className="toc-box">
            <h2 id="toc-heading" className="mb-2 mt-0">
              {heading}
            </h2>
            <nav aria-labelledby="toc-heading">
              <ul className="ml-4 mb-0">
                {headingPlan.tocEntries.map((h) => (
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

  return <>{renderNodes(nodes, { lang, headingPlan })}</>;
}

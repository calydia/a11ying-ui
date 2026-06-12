import sanitizeHtml from 'sanitize-html';

const allowedSchemes = ['http', 'https', 'mailto', 'tel'];

export function sanitizeCmsUrl(
  value: string | null | undefined,
  schemes: readonly string[] = allowedSchemes
): string | undefined {
  const url = value?.trim();

  if (!url || url.startsWith('//') || /[\u0000-\u001F\u007F]/.test(url)) {
    return undefined;
  }

  const scheme = url.match(/^([a-z][a-z0-9+.-]*):/i)?.[1]?.toLowerCase();
  return !scheme || schemes.includes(scheme) ? url : undefined;
}

export function sanitizeCmsHtml(value: string | null | undefined): string {
  return sanitizeHtml(value ?? '', {
    allowedTags: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'code', 'pre',
      'blockquote', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'a', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'caption',
      'img', 'hr', 'sub', 'sup', 'abbr',
    ],
    allowedAttributes: {
      '*': ['id', 'lang', 'dir'],
      a: ['href', 'title', 'target', 'rel', 'hreflang', 'class'],
      abbr: ['title'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
      ol: ['start', 'reversed', 'type'],
      li: ['value'],
      th: ['colspan', 'rowspan', 'scope', 'headers'],
      td: ['colspan', 'rowspan', 'headers'],
    },
    allowedSchemes,
    allowedSchemesByTag: {
      img: ['http', 'https'],
    },
    allowProtocolRelative: false,
    transformTags: {
      a: (_tagName, attributes) => {
        attributes.class = 'underline underline-offset-4 decoration-1 hover:decoration-2';

        if (attributes.target === '_blank') {
          const rel = new Set((attributes.rel ?? '').split(/\s+/).filter(Boolean));
          rel.add('noopener');
          rel.add('noreferrer');
          attributes.rel = [...rel].join(' ');
        }

        return { tagName: 'a', attribs: attributes };
      },
    },
  });
}

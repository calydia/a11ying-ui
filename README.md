# a11ying-ui

Shared design system for A11ying brand sites. Contains the brand token config (colours, typography, spacing) and React UI components, documented with Storybook.

## Usage

### Shared Tailwind config

In a consuming site's `tailwind.config.cjs`:

```js
const baseConfig = require('a11ying-ui/tailwind');

module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,         // design system src
    './src/**/*.{astro,html,ts,tsx,js,jsx,mdx}', // site src
  ],
};
```

### Global styles

Import once in your site's layout:

```js
import 'a11ying-ui/styles';
```

### Framework-neutral tokens

Consumers that need the shared brand foundations without React components or global element styles can import the tokens-only stylesheet after Tailwind:

```css
@import "tailwindcss";
@import "a11ying-ui/tokens";
```

The supported cross-site foundation includes the brand colors, font-family names, shared dark-mode variant, and stable brand custom properties. The export also retains existing spacing and dimension aliases for application compatibility, but those utilities are not part of the cross-site brand contract. It does not load font files or component styles.

### Components

```tsx
import { Button, Box } from 'a11ying-ui';
```

## Development

```bash
npm run storybook      # start Storybook at localhost:6006
npm run build-storybook # build static Storybook
```

## Adding a component

1. Create `src/components/MyComponent/MyComponent.tsx`
2. Create `src/components/MyComponent/MyComponent.stories.tsx`
3. Export from `src/index.ts`

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

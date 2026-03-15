import '../src/styles/global.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'Light', value: '#fafafa' },
        dark: { name: 'Dark', value: '#010017' },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const bg = context.globals?.backgrounds?.value;
      const isDark = bg === '#010017';
      return (
        <div className={isDark ? 'dark' : 'light'} style={{ padding: '2rem', minHeight: '100vh', backgroundColor: bg || '#fafafa' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
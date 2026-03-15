import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync } from 'fs';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'A11yingUI',
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'qs-esm'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [
    {
      name: 'copy-non-js-assets',
      closeBundle() {
        mkdirSync('dist', { recursive: true });
        copyFileSync('tailwind.config.cjs', 'dist/tailwind.config.cjs');
        copyFileSync('src/styles/global.css', 'dist/global.css');
      },
    },
  ],
});

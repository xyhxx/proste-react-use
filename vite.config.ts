/*
 * @Description:
 * @FilePath: /proste-react-use/vite.config.ts
 */
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '.',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'prosteReactUse',
      fileName: format => `${format}/index.js`,
    },
    rollupOptions: {
      external: ['react', 'fast-deep-equal', 'use-context-selector', 'dayjs'],
      output: {
        globals: {
          react: 'react',
          'fast-deep-equal': 'fast-deep-equal',
          dayjs: 'dayjs',
          'use-context-selector': 'use-context-selector',
        },
      },
    },
  },
});

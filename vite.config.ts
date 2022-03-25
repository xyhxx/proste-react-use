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
      external: ['react', '@tarojs/taro', 'lodash', 'use-context-selector', 'events'],
      output: {
        globals: {
          react: 'react',
          '@tarojs/taro': '@tarojs/taro',
          lodash: 'lodash',
          events: 'eventsEmitter',
          'use-context-selector': 'use-context-selector',
        },
      },
    },
  },
});

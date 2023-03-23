import { defineConfig } from 'vite';
import createExternal from 'vite-plugin-external';

export default defineConfig({
  root: './__tests__/integration/',
  server: {
    port: 8080,
    open: '/',
  },
  // plugins: [
  //   createExternal({
  //     externals: {
  //       '@antv/g2': 'G2',
  //     },
  //   }),
  // ],
});

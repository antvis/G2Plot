import { defineConfig } from 'dumi';

export default defineConfig({
  mode: 'site',
  title: 'G2Plot',
  base: '/',
  publicPath: '/',
  exportStatic: {},
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  navs: [null, { title: 'GitHub', path: 'https://github.com/antvis/G2Plot' }],
  analytics: {
    ga: 'UA-72788897-12',
  },
  chainWebpack(memo) {
    memo.plugins.delete('copy');
  },
  // more config: https://d.umijs.org/config
});

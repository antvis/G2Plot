// @ts-nocheck
import { ApplyPluginsType } from '/Users/lf/publicWorkspaces/G2Plot/node_modules/_@umijs_runtime@3.2.9@@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    path: '/',
    component: (props) =>
      require('react').createElement(
        require('../../../node_modules/_@umijs_preset-dumi@1.0.33@@umijs/preset-dumi/lib/themes/default/layout.js')
          .default,
        {
          ...{
            menus: {
              '*': {
                '*': [{ path: '/', title: 'G2Plot - 简单好用的图表库', meta: { order: 10 } }],
                '/demos': [{ path: '/demos/scatter', title: '散点图', meta: { order: 17 } }],
              },
            },
            locales: [],
            navs: {
              '*': [
                { path: '/demos', title: 'Demos' },
                { title: 'GitHub', path: 'https://github.com/antvis/G2Plot' },
              ],
            },
            title: 'G2Plot',
            logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            mode: 'site',
            repoUrl: 'https://github.com/antvis/g2plot',
          },
          ...props,
        }
      ),
    routes: [
      {
        path: '/',
        component: require('../../../docs/index.md').default,
        exact: true,
        meta: {
          filePath: 'docs/index.md',
          updatedTime: 1594623264475,
          title: 'G2Plot - 简单好用的图表库',
          order: 10,
          hero: {
            title: 'G2Plot',
            desc: '<div class="markdown"><p>简单好用的图表库</p></div>',
            actions: [
              {
                text: '快速上手',
                link: '/demos/scatter',
              },
            ],
          },
          features: [
            {
              icon:
                'https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png',
              title: '开箱即用',
              desc: '<div class="markdown"><p>一个简单的配置就能呈现优雅、标准的图表</p></div>',
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/oyqsrPh0Kg/houyuan.png',
              title: '后援强大',
              desc: '<div class="markdown"><p>AntV团队支持，基于 G2 实现，简单方便、专业可靠、无限可能</p></div>',
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/aKCFl7vDAB/tubiao.png',
              title: '图表完善',
              desc: '<div class="markdown"><p>支持全量的 G2 图表，几乎做到同步升级更新</p></div>',
            },
          ],
          footer: '<div class="markdown"><p>Open-source MIT Licensed | Copyright © 2019-present</p></div>',
          slugs: [
            {
              depth: 2,
              value: '反馈',
              heading: '反馈',
            },
          ],
        },
        title: 'G2Plot - 简单好用的图表库',
      },
      {
        path: '/demos/scatter',
        component: require('../../../docs/demos/scatter.md').default,
        exact: true,
        meta: {
          filePath: 'docs/demos/scatter.md',
          updatedTime: 1594623711409,
          title: '散点图',
          order: 17,
          slugs: [
            {
              depth: 1,
              value: '散点图',
              heading: '散点图',
            },
            {
              depth: 2,
              value: 'Scatter',
              heading: 'scatter',
            },
          ],
          nav: {
            path: '/demos',
            title: 'Demos',
          },
        },
        title: '散点图',
      },
      {
        path: '/demos',
        meta: {},
        exact: true,
        redirect: '/demos/scatter',
      },
    ],
    title: 'G2Plot',
  },
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };

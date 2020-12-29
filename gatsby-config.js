const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        // eslint-disable-next-line quotes
        GATrackingId: `UA-148148901-2`,
      },
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    isAntVSite: false,
    title: 'G2Plot',
    description: 'A collection of charts made with the Grammar of Graphics',
    siteUrl: 'https://g2plot.antv.vision',
    githubUrl: repository.url,
    versions: {
      'latest v2': 'https://g2plot.antv.vision',
      '1.x': 'https://g2plot-v1.antv.vision',
    },
    showChartResize: true, // 是否在demo页展示图表视图切换
    showAPIDoc: true, // 是否在demo页展示API文档
    themeSwitcher: 'g2plot',
    navs: [
      {
        slug: 'docs/manual',
        title: {
          zh: '教程',
          en: 'Manual',
        },
        order: 2,
      },
      {
        slug: 'docs/api',
        title: {
          zh: 'API',
          en: 'API',
        },
        order: 1,
      },
      {
        slug: 'examples',
        title: {
          zh: '图表示例',
          en: 'Examples',
        },
        order: 0,
      },
      {
        slug: 'https://charts.ant.design/',
        title: {
          zh: 'React 版本',
          en: 'React Version',
        },
      },
    ],
    docs: [
      {
        slug: 'api/components',
        title: {
          zh: '图表组件',
          en: 'Components',
        },
        order: 2,
      },
      {
        slug: 'api/plots',
        title: {
          zh: '基础图表',
          en: 'Plots',
        },
        order: 3,
      },
    ],
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery',
        title: {
          zh: '',
          en: '',
        },
      },
      {
        slug: 'case',
        icon: 'gallery',
        title: {
          zh: '场景案例',
          en: 'Show Case',
        },
      },
      {
        slug: 'line',
        icon: 'line', // 图表名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '折线图',
          en: 'Line',
        },
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area',
        },
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱形图',
          en: 'Column',
        },
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar',
        },
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie',
        },
      },
      {
        slug: 'progress-plots',
        icon: 'gauge',
        title: {
          zh: '进度图',
          en: 'Progress Plots',
        },
      },
      {
        slug: 'scatter',
        icon: 'point',
        title: {
          zh: '散点气泡图',
          en: 'Scatter and Bubble',
        },
      },
      {
        slug: 'dual-axes',
        icon: 'line',
        title: {
          zh: '双轴图',
          en: 'Dual Axes',
        },
      },
      {
        slug: 'rose',
        icon: 'rose',
        title: {
          zh: '玫瑰图',
          en: 'Rose',
        },
      },
      {
        slug: 'relation-plots',
        icon: 'sankey',
        title: {
          zh: '关系图',
          en: 'Relation Plots',
        },
      },
      {
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'Heatmap',
        },
      },
      {
        slug: 'tiny',
        icon: 'other',
        title: {
          zh: '迷你图',
          en: 'Tiny Plots',
        },
      },
      {
        slug: 'more-plots',
        icon: 'other',
        title: {
          zh: '更多图表',
          en: 'More Plots',
        },
      },
      // OTHERS
      {
        slug: 'general',
        icon: 'other',
        title: {
          zh: '图表通用配置',
          en: 'General Configuration',
        },
      },
      {
        slug: 'dynamic-plots',
        icon: 'other',
        title: {
          zh: '动态交互图',
          en: 'Dynamic Plots',
        },
      },
      {
        slug: 'plugin',
        icon: 'other',
        title: {
          zh: '自定义扩展图表',
          en: 'Custom Plots',
        },
      },
    ],
    docsearchOptions: {
      apiKey: '0d19588d7661a81faa8b75f6ade80321',
      indexName: 'antv_g2plot',
    },
  },
};

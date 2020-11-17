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
          zh: '使用文档',
          en: 'Manual',
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
        slug: 'manual/plots',
        title: {
          zh: '图表',
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
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie',
        },
      },
      {
        slug: 'gauge',
        icon: 'gauge',
        title: {
          zh: '仪表盘',
          en: 'Gauge',
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
        slug: 'waterfall',
        icon: 'column',
        title: {
          zh: '瀑布图',
          en: 'Waterfall Charts',
        },
      },
      {
        slug: 'scatter',
        icon: 'point',
        title: {
          zh: '散点图',
          en: 'Scatter',
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
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'Radar',
        },
      },
      {
        slug: 'liquid',
        icon: 'other',
        title: {
          zh: '水波图',
          en: 'Liquid',
        },
      },
      {
        slug: 'word-cloud',
        icon: 'word-cloud',
        title: {
          zh: '词云图',
          en: 'Word Cloud',
        },
      },
      {
        slug: 'funnel',
        icon: 'funnel',
        title: {
          zh: '漏斗图',
          en: 'Funnel',
        },
      },
      {
        slug: 'bullet',
        icon: 'bullet',
        title: {
          zh: '子弹图',
          en: 'Bullet',
        },
      },
      {
        slug: 'histogram',
        icon: 'histogram',
        title: {
          zh: '直方图',
          en: 'Histogram',
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
        slug: 'tiny',
        icon: 'other',
        title: {
          zh: '迷你图',
          en: 'Tiny Charts',
        },
      },
      {
        slug: 'box',
        icon: 'box',
        title: {
          zh: '箱型图',
          en: 'Box',
        },
      },
      {
        slug: 'heatmap',
        icon: 'heatmap',
        title: {
          zh: '热力图',
          en: 'heatmap',
        },
      },
      {
        slug: 'stock',
        icon: 'candlestick',
        title: {
          zh: '股票图',
          en: 'Stock',
        },
      },
      {
        slug: 'sunburst',
        icon: 'other',
        title: {
          zh: '旭日图',
          en: 'Sunburst',
        },
      },
      {
        slug: 'radial-bar',
        icon: 'radial-bar',
        title: {
          zh: '玉珏图',
          en: 'Radial Bar',
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

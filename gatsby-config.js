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
          en: 'Charts',
        },
        order: 3,
      },
    ],
    examples: [
      {
        slug: 'gallery',
        icon: 'gallery',
        title: {
          zh: '官方精品库',
          en: 'Featured',
        },
      },
      {
        slug: 'line',
        icon: 'line', // 图表名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '折线图',
          en: 'Line Charts',
        },
      },
      {
        slug: 'area',
        icon: 'area',
        title: {
          zh: '面积图',
          en: 'Area Charts',
        },
      },
      {
        slug: 'column',
        icon: 'column',
        title: {
          zh: '柱形图',
          en: 'Column Charts',
        },
      },
      {
        slug: 'bar',
        icon: 'bar',
        title: {
          zh: '条形图',
          en: 'Bar Charts',
        },
      },
      {
        slug: 'pie',
        icon: 'pie',
        title: {
          zh: '饼图',
          en: 'Pie Charts',
        },
      },
      {
        slug: 'dual-axes',
        icon: 'line',
        title: {
          zh: '双轴图',
          en: 'DualAxes Charts',
        },
      },
      {
        slug: 'scatter',
        icon: 'point',
        title: {
          zh: '散点图',
          en: 'Scatter Charts',
        },
      },
      {
        slug: 'gauge',
        icon: 'gauge',
        title: {
          zh: '仪表盘',
          en: 'Gauge Charts',
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
        slug: 'histogram',
        icon: 'histogram',
        title: {
          zh: '直方图',
          en: 'Histogram Charts',
        },
      },
      {
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'Radar Charts',
        },
      },
      {
        slug: 'box',
        icon: 'box',
        title: {
          zh: '箱型图',
          en: 'Box Charts',
        },
      },
      {
        slug: 'funnel',
        icon: 'funnel',
        title: {
          zh: '漏斗图',
          en: 'Funnel Charts',
        },
      },
      {
        slug: 'liquid',
        icon: 'other',
        title: {
          zh: '水波图',
          en: 'Liquid Charts',
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
        slug: 'tiny',
        icon: 'other',
        title: {
          zh: '迷你图',
          en: 'Tiny Charts',
        },
      },
      {
        slug: 'bullet',
        icon: 'other',
        title: {
          zh: '子弹图',
          en: 'Bullet Charts',
        },
      },
      {
        slug: 'rose',
        icon: 'rose',
        title: {
          zh: '玫瑰图',
          en: 'Rose Charts',
        },
      },
      {
        slug: 'stock',
        icon: 'candlestick',
        title: {
          zh: '股票图',
          en: 'Stock Charts',
        },
      },
      {
        slug: 'word-cloud',
        icon: 'other',
        title: {
          zh: '词云图',
          en: 'Word Cloud Charts',
        },
      },
      {
        slug: 'sunburst',
        icon: 'other',
        title: {
          zh: '旭日图',
          en: 'Sunburst Charts',
        },
      },
      {
        slug: 'radial-bar',
        icon: 'other',
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
          en: 'General Configration',
        },
      },
    ],
    docsearchOptions: {
      apiKey: '0d19588d7661a81faa8b75f6ade80321',
      indexName: 'antv_g2plot',
    },
  },
};

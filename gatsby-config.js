const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
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
    navs: [
      {
        slug: 'docs/manual',
        title: {
          zh: '使用文档',
          en: 'docs',
        },
      },
      {
        slug: 'examples',
        title: {
          zh: '图表演示',
          en: 'Examples',
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
      {
        slug: 'manual/advanced',
        title: {
          zh: '进阶',
          en: 'Advanced',
        },
        order: 4,
      },
    ],
    examples: [
      {
        slug: 'line',
        icon: 'line', // 图标名可以去 https://antv.alipay.com/zh-cn/g2/3.x/demo/index.html 打开控制台查看图标类名
        title: {
          zh: '折线图',
          en: 'Line Charts',
        },
      },
      {
        slug: 'step-line',
        icon: 'kagi',
        title: {
          zh: '阶梯折线图',
          en: 'Step Charts',
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
          zh: '柱状图',
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
        slug: 'scatter',
        icon: 'point',
        title: {
          zh: '散点图',
          en: 'Scatter Charts',
        },
      },
      {
        slug: 'bubble',
        icon: 'point',
        title: {
          zh: '气泡图',
          en: 'Bubble Charts',
        },
      },
      {
        slug: 'radar',
        icon: 'radar',
        title: {
          zh: '雷达图',
          en: 'radar',
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
        slug: 'funnel',
        icon: 'other',
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
        slug: 'gauge',
        icon: 'gauge',
        title: {
          zh: '仪表盘',
          en: 'Gauge Charts',
        },
      },
      {
        slug: 'combo',
        icon: 'other',
        title: {
          zh: '双轴图',
          en: 'Combo Charts',
        },
      },
      {
        slug: 'sparkline',
        icon: 'other',
        title: {
          zh: '迷你图表',
          en: 'Sparkline',
        },
      },
      {
        slug: 'general',
        icon: 'other',
        title: {
          zh: '通用配置',
          en: 'General Config',
        },
      },
      {
        slug: 'advanced',
        icon: 'other',
        title: {
          zh: '高级功能尝鲜',
          en: 'advanced',
        },
      },
    ],
    docsearchOptions: {
      apiKey: '0d19588d7661a81faa8b75f6ade80321',
      indexName: 'antv_g2plot',
    },
  },
};

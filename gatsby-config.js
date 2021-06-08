const { repository, version } = require('./package.json');

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
      [version]: 'https://g2plot.antv.vision',
      '1.x': 'https://g2plot-v1.antv.vision',
    },
    galleryMenuCloseAll: true,
    showChartResize: true, // 是否在demo页展示图表视图切换
    showAPIDoc: true, // 是否在demo页展示API文档
    themeSwitcher: 'g2plot',
    playground: {
      devDependencies: {
        typescript: 'latest',
      },
    },
    mdPlayground: {
      // markdown 文档中的 playground 若干设置
      splitPaneMainSize: '50%',
    },
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
    ],
    ecosystems: [
      {
        name: {
          zh: 'Ant Design Charts（React）',
          en: 'Ant Design Charts (React)',
        },
        url: 'https://charts.ant.design/',
      },
      {
        name: {
          zh: 'G2Plot 可视化圈子（博客文章）',
          en: 'Blog posts of G2Plot',
        },
        url: 'https://www.yuque.com/antv/g2plot',
      },
      {
        name: {
          zh: 'AntV ThemeSet（主题构建器）',
          en: 'AntV ThemeSet',
        },
        url: 'https://theme-set.antv.vision',
      },
      {
        name: {
          zh: 'Vis Dashboard（可视化精选集）',
          en: 'Vis Dashboard',
        },
        url: 'https://vis-dashboard.antv.vision',
      },
    ],
    docs: [
      {
        slug: 'manual/plots',
        title: {
          zh: '图表指引',
          en: 'Plot Guide',
        },
        order: 3,
      },
      {
        slug: 'api/plots',
        title: {
          zh: '基础图表',
          en: 'Plots',
        },
        order: 2,
      },
      {
        slug: 'api/advanced-plots',
        title: {
          zh: '高级图表',
          en: 'Advanced plots',
        },
        order: 3,
      },
      {
        slug: 'api/components',
        title: {
          zh: '图表组件',
          en: 'Components',
        },
        order: 4,
      },
      {
        slug: 'api/options',
        title: {
          zh: '通用配置',
          en: 'Common Configuration',
        },
        order: 5,
      }
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
        slug: 'facet',
        icon: 'gallery',
        title: {
          zh: 'Facet ❤️',
          en: '分面图 ❤️',
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
        slug: 'dual-axes',
        icon: 'line',
        title: {
          zh: '双轴图',
          en: 'Dual Axes',
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
      {
        slug: 'treemap',
        icon: 'other',
        title: {
          zh: '矩形树图',
          en: 'Treemap',
        },
      },
      // OTHERS
      {
        slug: 'plugin',
        icon: 'other',
        title: {
          zh: '高级图表',
          en: 'Advanced Plots',
        },
      },
      {
        slug: 'dynamic-plots',
        icon: 'other',
        title: {
          zh: '动态交互',
          en: 'Dynamic Plots',
        },
      },
      {
        slug: 'component',
        icon: 'other',
        title: {
          zh: '图表组件',
          en: 'Components',
        },
      },
      {
        slug: 'general',
        icon: 'other',
        title: {
          zh: '通用配置',
          en: 'General Configuration',
        },
      },
    ],
    docsearchOptions: {
      apiKey: '0d19588d7661a81faa8b75f6ade80321',
      indexName: 'antv_g2plot',
    },
    announcement: {
      zh: '1. 上新图表啦！请前往「教程 - 图表指引」查看「分面图、小提琴图」介绍。2.「旭日图」支持下钻！3.「国际化」来了。4. 更多内容请前往 G2Plot 可视化圈子：https://www.yuque.com/antv/g2plot/v2.3.22 🔎 查看',
      en: '1. 上新图表啦！请前往「教程 - 图表指引」查看「分面图、小提琴图」介绍。2.「旭日图」支持下钻！3.「国际化」来了。4. 更多内容请前往 G2Plot 可视化圈子：https://www.yuque.com/antv/g2plot/v2.3.22 🔎 查看',
    }
  },
};

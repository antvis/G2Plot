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
      '2.x': 'https://g2plot.antv.vision/',
      '1.x': 'https://g2plot-v1.antv.vision/',
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
    docs: [],
    examples: [
      {
        slug: 'scatter',
        icon: 'point',
        title: {
          zh: '散点图',
          en: 'Scatter Charts',
        },
      },
      // OTHERS
    ],
    docsearchOptions: {
      apiKey: '200ec461f4aa0bb4f0e761566f1a1336',
      indexName: 'antv_g2plot',
    },
  },
};

const { repository } = require('./package.json');

module.exports = {
  plugins: [
    {
      resolve: '@antv/gatsby-theme-antv',
      options: {
        GATrackingId: `UA-148148901-2`,
        pathPrefix: '/g2plot',
      },
    },
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: 'G2Plot',
    description: 'A collection of charts made with the Grammar of Graphics',
    githubUrl: repository.url,
    docs: [
      {
        slug: 'manual',
        title: {
          zh: '使用文档',
          en: 'docs',
        },
        redirect: 'introduction',
        order: 0,
      },
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
      {
        slug: 'examples',
        title: {
          zh: '图表演示',
          en: 'Examples',
        },
        order: 100,
        redirect: 'basic',
      },
    ],
  },
};

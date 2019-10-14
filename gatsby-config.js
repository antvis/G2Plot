const { homepage, repository } = require('./package.json');

module.exports = {
  pathPrefix: `/g2plot`,
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
    siteUrl: homepage,
    githubUrl: repository.url,
    languages: {
      langs: ['en', 'zh'],
      defaultLangKey: 'zh',
    },
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
    ],
  },
};

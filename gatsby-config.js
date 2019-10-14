const { homepage, repository } = require('./package.json');

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
    title: 'My Blog Title',
    author: 'My Name',
    description: 'My site description...',
    siteUrl: homepage,
    githubUrl: repository.url,
    social: [
      {
        name: 'twitter',
        url: 'https://twitter.com/gatsbyjs',
      },
      {
        name: 'github',
        url: 'https://github.com/gatsbyjs',
      },
    ],
  },
};

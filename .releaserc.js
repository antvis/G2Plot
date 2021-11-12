module.exports = {
  branch: 'master',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/git',
      {
        message: 'chore(release): 🤖 ${nextRelease.version} [ci skip]',
      },
    ],
    '@semantic-release/npm',
    '@semantic-release/github',
  ],
  preset: 'angular',
};

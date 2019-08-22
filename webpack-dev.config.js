const webpackConfig = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = merge(webpackConfig, {
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
  },
});

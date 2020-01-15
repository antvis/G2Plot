const routes = require('./scripts/demo-route');
const path = require('path');

module.exports = {
  entry: {
    g2plot: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    library: 'g2plot',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist/'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  externals: {},
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    contentBase: [__dirname],
    before(app) {
      app.get('/demos/index.html', routes.index);
      app.get('/demos/:target.html', routes.page);
    },
  },
  devtool: 'source-map',
};

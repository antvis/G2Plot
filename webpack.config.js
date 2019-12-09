const webpack = require('webpack');
const resolve = require('path').resolve;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    g2plot: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    library: 'G2Plot',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'dist/'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.less'],
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
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    ...(process.env.MODE === 'ANALYZER' ? [new BundleAnalyzerPlugin({ analyzerMode: 'static' })] : []),
  ],
  externals: {
    moment: 'moment',
    '../moment': 'moment',
  },
  performance: {
    hints: false,
  },
  devtool: 'source-map',
};

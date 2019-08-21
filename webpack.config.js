const webpack = require('webpack');
const resolve = require('path').resolve;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    'g2-plot': './src/index.ts',
  },
  output: {
    filename: '[name].min.js',
    library: 'g2-plot',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'build/'),
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

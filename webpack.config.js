const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const BundleTracker = require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const hotReload = process.env.HOT_RELOAD === '1';


const styleRule = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { plugins: () => [autoprefixer()] } },
    'sass-loader'
  ]
};

const jsRule = {
  test: /\.js$/,
  loader: 'babel-loader',
  include: path.resolve('./src/js'),
  exclude: /node_modules/
};

const assetRule = {
  test: /.(jpg|png|woff(2)?|eot|ttf|svg)$/,
  loader: 'file-loader'
};

const plugins = [
  new webpack.ProvidePlugin({
    'window.Sentry': 'Sentry',
    'Sentry': 'Sentry',
    'window.jQuery': 'jquery',
    'jQuery': 'jquery',
    '$': 'jquery'
  }),
  new BundleTracker({ filename: devMode ? './webpack-stats.json' : './webpack-stats-prod.json' }),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
  }),
  new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin([
    { from: './src/images/**/*', to: path.resolve('./static/dist/images/[name].[ext]'), toType: 'template' }
  ])
];

if (devMode) {
  styleRule.use = ['css-hot-loader', ...styleRule.use];
} else {
  plugins.push(
    new webpack.EnvironmentPlugin(['NODE_ENV',])
  );
  if (process.env.SENTRY_DSN) {
    plugins.push(
      new SentryCliPlugin({
        include: '.',
        release: process.env.SOURCE_VERSION,
        ignore: ['node_modules', 'webpack.config.js'],
      })
    );
  }
}

module.exports = {
  context: __dirname,
  entry: {
    app: './src/js/index.js',
  },
  output: {
    path: path.resolve('./static/dist/'),
    filename: '[name]-[hash].js',
    publicPath: hotReload ? 'http://localhost:8080/' : ''
  },
  devtool: devMode ? 'cheap-eval-source-map' : 'source-map',
  devServer: {
    hot: true,
    quiet: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    port: 8080
  },
  module: { rules: [jsRule, styleRule, assetRule] },
  externals: { jquery: 'jQuery', Sentry: 'Sentry' },
  plugins,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    alias: {
      static: path.resolve('./static'),
    }
  }
};

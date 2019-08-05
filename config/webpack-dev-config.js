// webpack-dev-config.js

// configuration data related to development only

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const paths = require('./paths');
// import common webpack config
const common = require('./webpack-common-config.js');

//import user files
const sassUtils = require('./scss/utils.js');

const devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});
const serverUrl = new webpack.DefinePlugin({
  __serverURL__: JSON.stringify('https://localhost:8001/')
})

module.exports = merge(common, {
  entry: [paths.appIndexJs],
  mode: 'development',
  // devtool option controls if and how source maps are generated.
  // see https://webpack.js.org/configuration/devtool/
  // If you find that you need more control of source map generation,
  // see https://webpack.js.org/plugins/source-map-dev-tool-plugin/
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    devFlagPlugin,
    serverUrl
  ],
  module: {
    rules: [
      {
        // look for .js or .jsx files
        test: /\.(js|jsx)$/,
        // in the `src` directory
        include: path.resolve(paths.appSrc),
        exclude: /(node_modules)/,
        use: {
          // use babel for transpiling JavaScript files
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/react',
              '@babel/preset-env',
              {
                plugins: [
                  '@babel/plugin-proposal-class-properties'
                ]
              }
            ],
          },
        },
      },
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        include: [path.resolve(paths.appSrc)],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              discardDuplicates: true,
              importLoaders: 1,
              // This enables local scoped CSS based in CSS Modules spec
              modules: false,
              // generates a unique name for each class (e.g. app__app___2x3cr)
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: sassUtils
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, "./scss/variables.scss")
              ]
            }
          }
        ],
      },
    ],
  },
});

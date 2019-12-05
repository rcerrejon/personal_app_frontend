// const withSass = require('@zeit/next-sass');
// const withPlugins = require('next-compose-plugins');
// const path = require('path');
//
// module.exports = withPlugins([
//     // optimizedImages,
//     withSass({
//       cssModules: true
//     })
//   ],
//   {
//     webpack: (config, { dev }) => {
//       config.plugins.push(
//         new webpack.EnvironmentPlugin(process.env),
//       );
//
//       // Config to have absolute imports instead of relative imports
//       // config.resolve.alias['components'] = path.join(__dirname, 'components')
//       // config.resolve.alias['static'] = path.join(__dirname, 'static')
//
//       return config;
//     },
//   });

const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const withProgressBar = require('next-progressbar')

module.exports = withProgressBar(withSass({
  env: {
    REACT_APP_SERVERURL: 'http://udachin.tech/api'
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  progressBar: {
    profile: true
  },
  webpack (config, {dev, isServer}) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    });

    // if (isServer) {
    //   return config;
    // }
    //
    // var isProduction = config.mode === 'production';
    // if (!isProduction) {
    //   return config;
    // }         config.plugins.push(
    //   new webpack.optimize.LimitChunkCountPlugin({
    //     maxChunks: 1,
    //   })
    // );
    //
    // config.optimization.minimizer.push(
    //   new OptimizeCSSAssetsPlugin({})
    // );

    return config;
  }
}))

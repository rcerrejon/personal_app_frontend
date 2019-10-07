// const webpack = require('webpack')
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
const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
module.exports = withCSS(withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    });

    return config;
  }
}));

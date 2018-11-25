const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  return {
    mode: 'development',
    entry: {
      loader: `./src/${env.example}/loader.ts`,
      widget: `./src/${env.example}/widget.ts`,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [],
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunks: ['loader'],
        meta: {
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        },
      }),
    ],
  };
};

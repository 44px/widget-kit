const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const template = './src/template.html';

  return {
    mode: env.mode,
    entry: {
      loader: `./src/${env.example}/loader.ts`,
      widget: `./src/${env.example}/widget.tsx`,
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: ['ts-loader'] },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ],
    },
    plugins: [
      // Host page:
      new HtmlWebpackPlugin({ chunks: ['loader'], template }),
      // Widget page:
      new HtmlWebpackPlugin({
        filename: 'widget.html',
        chunks: ['widget'],
        template,
      }),
    ],
  };
};

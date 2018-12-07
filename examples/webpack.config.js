const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const isProductionBuild = argv.mode === 'production';
  const template = './src/template.html';

  return getSubDirectories('./src').map((example) => {
    const distPath = path.resolve(__dirname, 'dist', example);

    return {
      name: example,
      mode: argv.mode,
      entry: {
        loader: `./src/${example}/loader.ts`,
        widget: `./src/${example}/widget.tsx`,
      },
      output: {
        path: distPath,
        filename: '[name].js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      module: {
        rules: [
          { test: /\.tsx?$/, use: ['ts-loader'] },
          {
            test: /\.css$/,
            use: [
              isProductionBuild ? { loader: MiniCssExtractPlugin.loader } : 'style-loader',
              'css-loader',
            ],
          },
        ],
      },
      plugins: [
        isProductionBuild ? new CleanWebpackPlugin([distPath]) : null,
        isProductionBuild ? new MiniCssExtractPlugin() : null,
        isProductionBuild ? new CompressionPlugin() : null,
        // Host page:
        new HtmlWebpackPlugin({ chunks: ['loader'], template }),
        // Widget page:
        new HtmlWebpackPlugin({
          filename: 'widget.html',
          chunks: ['widget'],
          template,
        }),
      ].filter(Boolean),
      stats: {
        assets: true,
        children: false,
        chunks: false,
        modules: false,
      },
    };
  });
};

function getSubDirectories(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((p) => p.isDirectory())
    .map((p) => p.name);
}

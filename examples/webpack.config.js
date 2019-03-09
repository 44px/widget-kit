const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const examples = argv.example ? [argv.example] : getSubDirectories('./src');
  const isProductionBuild = argv.mode === 'production';
  const template = './src/template.html';

  return examples.reduce((configs, example) => {
    // Using multiple entry points disable tree-shaking
    // So we should produce separate config for loader and widget
    // see https://github.com/webpack/webpack/issues/4453
    const commonSettings = {
      mode: argv.mode,
      devtool: 'source-map',
      output: {
        path: path.resolve(__dirname, 'dist', example),
        publicPath: isProductionBuild
          ? `https://44px.github.io/widget-kit/${example}`
          : `http://localhost:8080/${example}`,
        filename: '[name].js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },
      stats: {
        assets: true,
        children: false,
        chunks: false,
        modules: false,
      },
    };

    const loader = {
      ...commonSettings,
      name: `${example}-loader`,
      entry: {
        loader: `./src/${example}/loader.ts`,
      },
      module: {
        rules: [{ test: /\.tsx?$/, use: ['ts-loader'] }],
      },
      plugins: [
        isProductionBuild ? new CleanWebpackPlugin() : null,
        isProductionBuild ? new CompressionPlugin({ include: /\.js$/ }) : null,
        new HtmlWebpackPlugin({ template }),
      ].filter(Boolean),
    };

    const widget = {
      ...commonSettings,
      name: `${example}-widget`,
      entry: {
        widget: `./src/${example}/widget.tsx`,
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
        isProductionBuild ? new MiniCssExtractPlugin() : null,
        isProductionBuild ? new CompressionPlugin({ include: /\.js$/ }) : null,
        new HtmlWebpackPlugin({ filename: 'widget.html', template }),
      ].filter(Boolean),
    };

    return [...configs, loader, widget];
  }, []);
};

function getSubDirectories(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((p) => p.isDirectory())
    .map((p) => p.name);
}

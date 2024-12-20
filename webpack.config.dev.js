const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',

    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'], 
        exclude: 'node_modules',
      })
    ],

    devServer: {
        port: 9000,
        hot: true,
        open: true,
      },
})
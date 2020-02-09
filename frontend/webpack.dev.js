// #1. Подключение внешних модулей;
const merge = require('webpack-merge'), // для слияния конфигов webpack;
      path = require('path'),
      webpack = require('webpack'),
      common = require('./webpack.common.js'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      HtmlWebpackHotPlugin = require('html-webpack-hot-plugin'),
      htmlHotPlugin = new HtmlWebpackHotPlugin({
        hot: true
      });

// #2. Подключение внутренних модулей;
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map', // карта для отладки в разработке;

    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        host: 'localhost',
        port: 7777,
        hot: true,  // чтобы сервер работал в режиме горячей замены;
        open: true, // авто-открытие в браузере;
        overlay: true,  // для удобства отображения ошибок;

        before(app, server) { // для перезагрузки html;
            htmlHotPlugin.setDevServer(server);
        }
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: '../index.html'
        }),
        htmlHotPlugin
    ]
});

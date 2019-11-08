// #1. Подключение внешних модулей;
const merge = require('webpack-merge'),
      path = require('path'),
      webpack = require('webpack'),
      common = require('./webpack.common.js');

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
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
        })
    ],
});

const merge = require('webpack-merge'),
      path = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',  // карта для отладки в продакшн;

    module: {
        // загрузчики;
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,    // выдергивает css из js;
                    'css-loader',
                    'less-loader',
                ]
            },
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/app.css'
        }),
        new HtmlWebpackPlugin( {
            files: {
                css: [ 'app.css' ],
            },
            template: path.resolve(__dirname, './src/index.html')
            }
        ),
    ],
});
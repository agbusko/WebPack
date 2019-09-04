/* global require __dirname module */    // для eslint с babel - что это глобальная переменная;
// #1. Подключение внешних модулей;
const path = require('path');    // подключаемый модуль node.js для нахождения абсолютного пути, см. ниже;
      UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      AutoPrefixer = require('autoprefixer');

// #2. Подключение внутренних модулей;
module.exports = {
    context: __dirname, // абсолютный путь, чтобы не дублировать;

    // точки входа (какой модуль собирать);
    entry: {
        './js/app.js': './scripts/app.js', // scripts
        './js/home.js': './scripts/home.js', // scripts
        './js/about.js': './scripts/about.js', // scripts
        './css/app': './styles/app.less' //styles
    },

    // точки выхода;
    output: {
        path: path.resolve(__dirname, './build/'), // скрещ. абсол. пути с относ.__dirname - где путь webpack.config.js;
        filename: '[name]',    // имена на выходе, соответ. входящим;
        // library: '[name]', // внешний доступ к модулям через переменные;
        // publicPath: 'js/'    // публичный путь, для например index.html;
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // исключение из сборки;
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    },
                ]
            },

            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',   // translates CSS into CommonJS;
                        options: { importLoaders: 1 }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                AutoPrefixer({}),
                            ],
                        },
                    },

                    'less-loader',  // compiles Less to CSS;
                ]
            },
        ],
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                 // sourceMap: true,
            }),
        ],

        runtimeChunk: {
            name: './js/common.js' // создает runtime.js, содержащий общий код main.js, about.js, home.js
        },
    },

    plugins: [
        new MiniCssExtractPlugin({}),
    ]
};

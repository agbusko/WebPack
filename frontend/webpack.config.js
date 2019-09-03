/* global require __dirname module */    // для eslint с babel - что это глобальная переменная;
// #1. Подключение внешних модулей;
const path = require('path');    // подключаемый модуль node.js для нахождения абсолютного пути, см. ниже;
      UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// #2. Подключение внутренних модулей;
module.exports = {
    context: __dirname + '/scripts', // абсолютный путь, чтобы не дублировать;

    // точки входа (какой модуль собирать);
    entry: {
        main: './main.js',
        about: './about.js',
        home: './home.js',
    },

    // точки выхода;
    output: {
        path: path.resolve(__dirname, './public/js'), // скрещ. абсол. пути с относ.__dirname - где путь webpack.config.js;
        filename: '[name].js',    // имена на выходе, соответ. входящим;
        library: '[name]', // внешний доступ к модулям через переменные;
        publicPath: 'js/'    // публичный путь, для например index.html;
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
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // sourceMap: true,
            }),
        ],

        runtimeChunk: {
            name: 'common' // создает runtime.js, содержащий общий код main.js, about.js, home.js
        },
    },

};

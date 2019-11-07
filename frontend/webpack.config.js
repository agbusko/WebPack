/* global require __dirname module */    // для eslint с babel - что это глобальная переменная;
// #1. Подключение внешних модулей;
const path = require('path'),    // подключаемый модуль node.js для нахождения абсолютного пути, см. ниже;
      webpack = require('webpack');

// #2. Подключение внутренних модулей;
module.exports = {
    context: path.resolve(__dirname, 'js'), // корень точки входа по умолчанию;

    // точки входа, какой модуль собирать;
    entry: {
        app: './app', // главный js;
    },

    // точки выхода;
    output: {
        path: path.resolve(__dirname, 'public'), // скрещивание абсол. пути с относ. (то есть полный путь до данной папки), см. выше;
        publicPath: '/',
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.less', '.hbs', '.js'] // подставляет расширение (первый less);
    },

    devServer: {
        host: 'localhost',
        port: 7777,
        hot: true,  // чтобы сервер работал в режиме горячей замены;
        open: true,
    },

    module: {
        // загрузчики;
        rules: [{
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
        }, {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',  // compiles Less to CSS;
            ]
        }, {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=[name].[ext]?[hash]',
        },
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin({
            // Options...
        })
    ],
}

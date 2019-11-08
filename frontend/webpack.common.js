/* global require __dirname module */    // для eslint с babel - что это глобальная переменная;
// #1. Подключение внешних модулей;
const path = require('path');    // подключаемый модуль node.js для нахождения абсолютного пути, см. ниже;



// #2. Подключение внутренних модулей;
module.exports = {
    context: path.resolve(__dirname, './src/js'), // корень точки входа по умолчанию;

    // точки входа, какой модуль собирать;
    entry: {
        app: './app', // главный js;
    },

    // точки выхода;
    output: {
        path: path.resolve(__dirname, 'dist'), // скрещивание абсол. пути с относ. (то есть полный путь до данной
        // папки), см. выше;
        publicPath: './',   // для вставки стилей в index.html;
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.less', '.hbs', '.js'] // подставляет расширение (первый less);
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
            loader: 'file?name=[path][name].[ext]?[hash]',
        },
        ]
    },
}

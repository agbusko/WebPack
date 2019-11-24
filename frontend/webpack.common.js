/* global require __dirname module */    // для eslint с babel - что это глобальная переменная;
// #1. Подключение внешних модулей;
const path = require('path'),    // подключаемый модуль node.js для нахождения абсолютного пути, см. ниже;
      HtmlWebpackPlugin = require('html-webpack-plugin'); // создание html по шаблону index.html;

// #2. Подключение внутренних модулей;
module.exports = {
    context: path.resolve(__dirname, './src/js'), // корень точки входа по умолчанию;

    // точки входа, какой модуль собирать;
    entry: {
        app: './app', // главный js;
    },

    // точки выхода;
    output: {
        // скрещивание абсол. пути с относ. (то есть полный путь до данной папки), см. выше;
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        // подставляет расширение (первый less);
        extensions: ['.less', '.hbs', '.js']
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
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                },
                'eslint-loader'
            ]
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            use: [
                'style-loader', // Inject CSS into the DOM;
                'css-loader',
                'less-loader'  // compiles Less to CSS;
            ]
        }, {
            test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=[path][name].[ext]?[hash]',
        }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin( {
                template: path.resolve(__dirname, './src/index.html'),
                files: {
                    css: [ 'app.css' ],
                },
                minify: {
                    useShortDoctype: true,
                    removeStyleLinkTypeAttributes: true,
                    removeScriptTypeAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true
                }
            }
        )
    ]
};

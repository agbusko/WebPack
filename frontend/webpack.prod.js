const merge = require('webpack-merge'),
      { CleanWebpackPlugin } = require('clean-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      TerserJSPlugin = require('terser-webpack-plugin'),
      OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
      common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',  // карта для отладки в продакшн;

    module: {
        // загрузчики;
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    // "вырезание" css из js;
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require ('autoprefixer')({grid: true}),
                            ]
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },

    plugins: [
        // очистка каталога сборки (dist);
        new CleanWebpackPlugin(),
        // "вырезание" css из js;
        new MiniCssExtractPlugin({
            filename: 'styles/app.css'
        })
    ],

    optimization: {
        minimizer: [
             // в помощь OptimizeCSSAssetsPlugin;
             new TerserJSPlugin({
                 sourceMap: true
             }),
             // оптимизатор (сжатие) css;
             new OptimizeCSSAssetsPlugin({
                 // чтобы карта не терялась;
                 cssProcessorOptions: {
                     map: {
                         inline: false
                     }
                 }
             }),
             // оптимизатор (сжатие) js;
             new UglifyJsPlugin({
                 sourceMap: true
             })
        ]
    }
});
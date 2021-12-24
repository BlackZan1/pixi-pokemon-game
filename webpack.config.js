const path = require('path')

// plugins
const TerserPulgin = require('terser-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname, './src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, './build')
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: {

        // }
    },
    devServer: {
        port: 3000,
        hot: true
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimize: true,
        minimizer: [
            new TerserPulgin()
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: false
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssPlugin({
            filename: '[name].[hash].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: path.resolve(__dirname, './node_modules'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                // exclude: './node_modules',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                // exclude: './node_modules',
                use: [
                    {
                        loader: MiniCssPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|gif|jpg)$/,
                // exclude: './node_modules',
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}
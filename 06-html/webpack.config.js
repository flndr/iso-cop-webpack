const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    context: resolve('src'),
    entry: {
        home:    './entries/home.js',
        prodcts: './entries/products.js',
        contact: './entries/contact.js',
    },
    output: {
        path: resolve('dist'),
        filename: './[name].js',
    },
    plugins : [
        new CleanWebpackPlugin([
            resolve('dist')
        ]),
        new CommonsChunkPlugin({
            name : 'common',
            minChunks : 2
        }),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            chunks : [ 'home', 'common' ]
        }),
        new HtmlWebpackPlugin({
            filename: 'products.html',
            chunks : [ 'products', 'common' ]
        }),
        new HtmlWebpackPlugin({
            filename: 'contact.html',
            chunks : [ 'contact', 'common' ]
        }),
    ]
};

function resolve( fileOrFolder = '' ) {
    return Path.resolve( __dirname, fileOrFolder );
}

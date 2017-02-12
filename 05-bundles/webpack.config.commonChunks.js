const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;

module.exports = {
    context: resolve('src'),
    entry: {
        main:    './entries/home.js',
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
        })
    ]
};

function resolve( fileOrFolder = '' ) {
    return Path.resolve( __dirname, fileOrFolder );
}

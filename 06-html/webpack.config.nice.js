const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
const HtmlWebpackPlugin  = require('html-webpack-plugin');

let config = {
    context: resolve('src'),
    entry: {
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

addHtmlPage('home',     './entries/home.js',     'home.html');
addHtmlPage('products', './entries/products.js', 'products.html');
addHtmlPage('contact',  './entries/contact.js',  'contact.html');


function addHtmlPage( name, entry, filename, moreChunks = [] ) {
    config.entry[ name ] = entry;
    config.plugins.push(
        new HtmlWebpackPlugin({
            title : name,
            filename: filename,
            chunks : [ name, 'common' ].concat( moreChunks )
        })
    )
};

module.exports = config;

function resolve( fileOrFolder = '' ) {
    return Path.resolve( __dirname, fileOrFolder );
}

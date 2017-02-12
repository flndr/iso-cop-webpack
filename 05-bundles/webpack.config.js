const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
        ])
    ]
};

function resolve( fileOrFolder = '' ) {
    return path.resolve( __dirname, fileOrFolder );
}

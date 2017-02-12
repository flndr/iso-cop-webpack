const Path    = require('path');
const Webpack = require('webpack');
const CommonsChunkPlugin    = Webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin        = Webpack.optimize.UglifyJsPlugin;
const OccurrenceOrderPlugin = Webpack.optimize.OccurrenceOrderPlugin;
const DefinePlugin          = Webpack.DefinePlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const NPM_RUN_SCRIPT = process.env.npm_lifecycle_event;
const NPM_RUN_BUILD  = 'build';
const NPM_RUN_DEV    = 'dev';

const DIR = {
    SRC  : resolve('src'),
    DIST : resolve('dist')
}

let config = {
    context: DIR.SRC,
    entry: {
    },
    output: {
        path: DIR.DIST,
        filename: './[name].js',
    },
    plugins : [
        new DefinePlugin({
            DEVELOPMENT : JSON.stringify( NPM_RUN_SCRIPT === NPM_RUN_DEV ),
            VERSION     : JSON.stringify( "0.0.1" ),
            FOO         : JSON.stringify( "BAAAAAAAAR" )
        }),
        new CommonsChunkPlugin({
            name : 'common',
            minChunks : 2
        })
    ]
};

addHtmlPage('home',     './entries/home.js',     'index.html');
addHtmlPage('products', './entries/products.js', 'products.html');
addHtmlPage('contact',  './entries/contact.js',  'contact.html');

switch( NPM_RUN_SCRIPT ) {

    case NPM_RUN_BUILD:

        config.plugins.unshift(
            new CleanWebpackPlugin([ DIR.DIST ], {
                exclude : [ 'robots.txt' ]
            })
        );
        config.plugins.push(...[
            new OccurrenceOrderPlugin(),
            new UglifyJsPlugin({
                sourceMap: true,
                mangle: false
            })
        ]);

        break;

    default:
        config.devServer = {
            host: "127.0.0.1",
            port: 9000,
            contentBase: DIR.DIST,
            compress: true,
            inline: true
        };

    break;
}




module.exports = config;





function resolve( fileOrFolder = '', file = '' ) {
    return Path.resolve( __dirname, fileOrFolder+'/'+file );
}

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

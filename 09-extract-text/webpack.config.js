const Path    = require('path');
const Webpack = require('webpack');
const CommonsChunkPlugin    = Webpack.optimize.CommonsChunkPlugin;
const UglifyJsPlugin        = Webpack.optimize.UglifyJsPlugin;
const OccurrenceOrderPlugin = Webpack.optimize.OccurrenceOrderPlugin;
const DefinePlugin          = Webpack.DefinePlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const ExtractCSS         = new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
});

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
    module : {
        rules : [
            {
                test: /\.scss$/,
                use: ExtractCSS.extract([
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ])
            },
            {
                test: /\.js$/,
                use: [
                  'babel-loader',
                ],
                exclude: [
                    resolve('node_modules')
                ]
            },
            {
                test: /\.css$/,
                use: ExtractCSS.extract([
                    'css-loader',
                    'postcss-loader'
                ])
            },
            {
                test: /\.html$/,
                use: ['mustache-loader']
            },
            {
                test: /\.png$/,
                use: { loader: 'url-loader', options: { limit: 100000 } },
            },
            {
                test: /\.jpg$/,
                use: [ 'file-loader' ]
            },
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}

        ]
    },
    plugins : [
        new DefinePlugin({
            DEVELOPMENT : JSON.stringify( NPM_RUN_SCRIPT === NPM_RUN_DEV ),
            VERSION     : JSON.stringify( "0.0.1" ),
            FOO         : JSON.stringify( "BAAAAAAAAR" )
        }),
        ExtractCSS,
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

config.plugins.unshift(
    new DefinePlugin(environmentVars)
);




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

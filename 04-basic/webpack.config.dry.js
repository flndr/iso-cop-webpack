const path = require('path');

module.exports = {
    context: resolve('src'),
    entry: {
        main: './main.js',
    },
    output: {
        path: resolve('dist'),
        filename: './main.js',
    }
};

function resolve( fileOrFolder = '' ) {
    return path.resolve( __dirname, fileOrFolder );
}

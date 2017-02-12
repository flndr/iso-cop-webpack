const path = require('path');
const omg  = require('cli-color').red.bold.blink;

console.log( omg('I am so fancy right now.') );

const DIR = {
    SRC  : resolve( './src' ),
    DIST : resolve( './dist' )
};

module.exports = {
    context: DIR.SRC,
    entry: {
        main: './main.js',
    },
    output: {
        path: DIR.DIST,
        filename: './main.js',
    }
};

function resolve( dir, file = '' ) {
    return path.resolve( __dirname, dir + '/' + file );
}

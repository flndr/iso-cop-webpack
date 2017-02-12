// Asynchronous Module Definition (AMD)
// RequireJS

//Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function( dep1, dep2 ) {

    //Define the module value by returning a value.
    return function () {};
});

// Or:
define(function( require ) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');

    return function() {};
});

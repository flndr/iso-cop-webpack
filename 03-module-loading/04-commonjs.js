// CommonJS

// In circle.js
var PI = Math.PI;
exports.area = function(r) {
    return PI * r * r;
};
exports.circumference = function(r) {
    return 2 * PI * r;
};

// In some file
var circle = require('./circle.js');
var area = circle.area(4);
console.log( 'The area of a circle of radius 4 is ' + area );

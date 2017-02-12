// global scope
var PI = Math.PI;           // equals window.PI = Math.PI;
function area(r) {          // equals window.area = function(r){...}
    return PI * r * r;
};
alert( area(4) );

// private scope in "iffy"
// immediately-invoked function expression - IIFE
(function(){
    var PI = Math.PI;
    function area(r) {
        return PI * r * r;
    };
    alert( area(4) );
}());

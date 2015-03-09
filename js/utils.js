'use strict';

Array.prototype.reversedCopy = function(){
    var arr = [];
    for( var i = this.length; i--; ){
        arr.push( this[i] );
    }
    return arr;
};


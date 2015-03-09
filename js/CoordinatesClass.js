'use strict';
//класс Координата
var Coordinates = function(x,y){
    this.x = x;
    this.y = y;

    this.inZone = function(size){
        return (this.x >= 0 && this.x < size && this.y >= 0 && this.y < size);
    };
};



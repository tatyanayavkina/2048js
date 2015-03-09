'use strict';
// класс Клетка
var Tile = function(position, value){
    this.position = position;
    this.value = value || 2;
    this.merged = false;

    this.setMerge = function(bool){
        this.merged = bool;
    }
};

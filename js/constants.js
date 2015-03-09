'use strict';
//константы
var ZONE_SIZE = 4;
var START_TILE_COUNT = 2;
var KEY_DOWN = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
};

var MOVE_VECTOR = {
    "LEFT" : new Coordinates(0, -1),
    "RIGHT": new Coordinates(0, 1),
    "UP": new Coordinates(-1, 0),
    "DOWN": new Coordinates(1, 0)
};

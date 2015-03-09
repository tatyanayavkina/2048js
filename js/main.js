'use strict';

document.addEventListener('DOMContentLoaded', init, false );

function init(){
    var game = new TileZone(); game.init();
    new KeyboardHandler(game.move.bind(game));
    console.log('init successfull');
}


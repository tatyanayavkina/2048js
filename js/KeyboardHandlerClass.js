'use strict';

var KeyboardHandler = function(callback){
    document.addEventListener('keydown', keydownHandler, false);

    function keydownHandler(event) {
        var key = KEY_DOWN[event.which];
        if (key){
            callback(key);
        }
    }
};



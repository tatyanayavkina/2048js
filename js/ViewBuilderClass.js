'use strict';
// класс, отвечающий за отрисовку изображения на экране
var ViewBuilder = function(){

    this.buildView = function(tiles, score){
        var html = this.buildScore(score) + '<div class="game-wrapper"><div class = "game-area">';

        for ( var i = 0, len = tiles.length; i < len; i++){
            html += this.buildViewRow( tiles[i]);
        }
        html += '</div></div>';

        return html;
    };

    this.buildViewRow = function(row){
        var html = '<div class="game-area-row">';
        for ( var j = 0, len = row.length; j < len; j++){
            if (row[j] != 0){
                html += '<div class="game-area-cell game-area-cell_filled game-area-cell_filled_' + row[j].value +'">'+
                            row[j].value +
                         '</div>';
            }
            else{
                html += '<div class="game-area-cell game-area-cell_empty"></div>';
            }

        }
        html += '</div>';

        return html;
    };

    this.buildScore = function(score){
         return '<div class="score">Score: '+ score +'</div>';
    };

    this.showGameOverInfo = function (){
        var gameover = document.getElementById('gameover');
        gameover.style.display = 'block';
    };

    this.insertView = function(tiles, score) {
        var gameWrapper = document.getElementById('game');
        gameWrapper.innerHTML = this.buildView(tiles, score);
    };
};
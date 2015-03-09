'use strict';

//класс Игровая зона
var TileZone = function(){
    this.viewBuilder = new ViewBuilder();
    //порядок обхода клеток по умолчанию
    this.gridWalkDirection = {};

    //инициализация игровой зоны
    this.init = function(){
        this.tiles = [];
        this.gridWalkDirection.x = [];
        this.gridWalkDirection.y = [];
        this.score = 0;
        for(var i = 0; i < ZONE_SIZE; i++){
            this.tiles[i] = [];
            this.gridWalkDirection.x.push(i);
            this.gridWalkDirection.y.push(i);
            for(var j = 0; j <ZONE_SIZE; j++){
                this.tiles[i][j] = 0;
            }
        }

        for(var k=0; k < START_TILE_COUNT; k++){
            this.randomlyInsertNewTile();
        }

        this.viewBuilder.insertView(this.tiles, this.score);
    };

    //поиск свободных зон
    this.findEmptyZones = function(){
        this.emptyZones = [];
        for(var i = 0; i < ZONE_SIZE; i++){
            for(var j = 0; j <ZONE_SIZE; j++){
                if (this.tiles[i][j] == 0){
                    this.emptyZones.push(new Coordinates(i,j));
                }
            }
        }
    };

    // рандомный выбор свободной зоны
    this.getRandomEmptyZone = function(){
        var emptyZonesCount = this.emptyZones.length;
        if (emptyZonesCount > 0){
            var randomIndex = Math.floor(Math.random() * emptyZonesCount);
            return this.emptyZones[randomIndex];
        }
    };

    // добавление фишки в произвольное место
    this.randomlyInsertNewTile = function() {
        this.findEmptyZones();
        var position = this.getRandomEmptyZone();
        this.tiles[position.x][position.y] = new Tile(position);
    };

    // перемещение фишек
    this.move = function(key){
        var hasMoved = false;
        var vector = MOVE_VECTOR[key];
        var newPosition, direction = this.getDirection(vector), self = this;

        direction.x.forEach(function(x){
            direction.y.forEach(function(y){
                if ( self.tiles[x][y] != 0){
                    newPosition = self.findNewTilePosition(self.tiles[x][y], vector);
                    if( newPosition.position != self.tiles[x][y].position){
                        hasMoved = true;
                        self.replace(self.tiles[x][y], newPosition);
                    }
                }
            });
        });

        //если хотя бы одна фишка была передвинута, значит нужно вставить новую фишку и сделать перерисовку
        if (hasMoved){
            this.setMergedFlagToFalse();
            this.randomlyInsertNewTile();
            this.viewBuilder.insertView(this.tiles, this.score);
            this.findEmptyZones();
            // если не осталось свободных зон
            if (this.emptyZones.length == 0){
                // проверяем, возможно ли движение
                if(!this.hasAvailableMoves()){
                    this.viewBuilder.showGameOverInfo();
                }
            }
        }
    };

    this.getDirection = function(vector){
        var realGridWalkDirection = {};
        realGridWalkDirection.x = this.gridWalkDirection.x.slice();
        realGridWalkDirection.y = this.gridWalkDirection.y.slice();

        if (vector.x > 0){
            realGridWalkDirection.x = realGridWalkDirection.x.reversedCopy();
        }
        if (vector.y > 0) {
            realGridWalkDirection.y = realGridWalkDirection.y.reversedCopy();
        }

        return realGridWalkDirection;
    };



    // установка флага merged фишки на false перед новым ходом
    this.setMergedFlagToFalse = function(){
        for(var i = 0; i < ZONE_SIZE; i++){
            for(var j = 0; j <ZONE_SIZE; j++){
                if (this.tiles[i][j] != 0){
                    this.tiles[i][j].setMerge(false);
                }
            }
        }
    };

    // поиск нового положения фишки
    this.findNewTilePosition = function(tile, vector){
        var currentPosition= tile.position, newPosition = {};

        do {
            newPosition.position = currentPosition;
            currentPosition = new Coordinates(newPosition.position.x + vector.x, newPosition.position.y + vector.y);
        }while (currentPosition.inZone(this.tiles.length) && this.isAvailableMove(currentPosition,tile.value));

        // флаг type говорит о том, что будет слияние с другой клеткой
        if ( !this.isEmpty(newPosition.position) ){
            newPosition.type = 1;
        }

        return newPosition;
    };

    //может ли клетка стать новым положением фишки
    this.isAvailableMove = function(position, value){
        var x = position.x, y = position.y;
        return this.isEmpty(position) || ( (this.tiles[x][y].value == value) && (this.tiles[x][y].merged == false)) ;
    };

    //есть ли фишка на клетке position
    this.isEmpty = function(position){
        return this.tiles[position.x][position.y] == 0;
    };

    //изменение положения фишки
    this.replace = function(tile, newPosition){
        this.tiles[tile.position.x][tile.position.y] = 0;
        tile.position = newPosition.position;
        //если происходит слияние, то удваиваем значение и ставим флаг слияния
        if(newPosition.type == 1){
            tile.value = 2*tile.value;
            tile.setMerge(true);

            this.score += tile.value;
        }
        this.tiles[newPosition.position.x][newPosition.position.y] = tile;
    };

    this.hasAvailableMoves = function(){
        var has = false;
        for(var key in MOVE_VECTOR){
            var vector = MOVE_VECTOR[key];
            var newPosition, direction = this.getDirection(vector), self = this;

            direction.x.forEach(function(x){
                direction.y.forEach(function(y){
                    if ( self.tiles[x][y] != 0){
                        newPosition = self.findNewTilePosition(self.tiles[x][y], vector);
                        if( newPosition.position != self.tiles[x][y].position){
                            has = true;
                        }
                    }
                });
            });
            if (has) {break;}
        }

        return has;
    };
};

var CELL_WIDTH = 100;
var CELL_HEIGHT = 100;
var ROWS = 5;
var COLS = 5;
var score = 0;


//These can be retrieved without hard-coding. However, I think that adds extra complexity.
var BOARD_IMAGE_WIDTH = 500; //721
var BOARD_IMAGE_HEIGHT = 500;

var GAME_WIDTH = ROWS*CELL_WIDTH;
var GAME_HEIGHT = COLS*CELL_HEIGHT;

var test_board = [[1,2,3,4,5],
                  [1,2,3,4,5],
                  [1,2,3,4,5],
                  [1,2,3,4,5],
                  [5,4,3,2,1]];

window.onload = function() {
    var board = new Board(5);

    // TODO: fix the game width
    var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'board', { preload: preload, create: create, update: update });

    var board_img_dict = {
                          '7':'board_7',
                          '1':'board_1',
                          '2':'board_2',
                          '3':'board_3',
                          '4':'board_4',
                          '5':'board_5',
                          '6':'board_6',
                          'd12': 'die_1_2',
                          'd13': 'die_1_3',
                          'd14': 'die_1_4',
                          'd15': 'die_1_5',
                          'd21': 'die_2_1',
                          'd23': 'die_2_3',
                          'd24': 'die_2_4',
                          'd26': 'die_2_6',
                          'd31': 'die_3_1',
                          'd32': 'die_3_2',
                          'd35': 'die_3_5',
                          'd36': 'die_3_6',
                          'd41': 'die_4_1',
                          'd42': 'die_4_2',
                          'd45': 'die_4_5',
                          'd46': 'die_4_6',
                          'd51': 'die_5_1',
                          'd53': 'die_5_3',
                          'd54': 'die_5_4',
                          'd56': 'die_5_6',
                          'd62': 'die_6_2',
                          'd63': 'die_6_3',
                          'd64': 'die_6_4',
                          'd65': 'die_6_5',};
    
    
    function preload () {
        game.load.image('board_7', 'Assets/board_7.png');
        game.load.image('board_1', 'Assets/board_1.png');
        game.load.image('board_2', 'Assets/board_2.png');
        game.load.image('board_3', 'Assets/board_3.png');
        game.load.image('board_4', 'Assets/board_4.png');
        game.load.image('board_5', 'Assets/board_5.png');
        game.load.image('board_6', 'Assets/board_6.png');
        game.load.image('board_free', 'Assets/board_free.png');
        game.load.image('die_1_2', 'Assets/die_1_2.png');
        game.load.image('die_1_3', 'Assets/die_1_3.png');
        game.load.image('die_1_4', 'Assets/die_1_4.png');
        game.load.image('die_1_5', 'Assets/die_1_5.png');
        game.load.image('die_2_1', 'Assets/die_2_1.png');
        game.load.image('die_2_3', 'Assets/die_2_3.png');
        game.load.image('die_2_4', 'Assets/die_2_4.png');
        game.load.image('die_2_6', 'Assets/die_2_6.png');
        game.load.image('die_3_1', 'Assets/die_3_1.png');
        game.load.image('die_3_2', 'Assets/die_3_2.png');
        game.load.image('die_3_5', 'Assets/die_3_5.png');
        game.load.image('die_3_6', 'Assets/die_3_6.png');
        game.load.image('die_4_1', 'Assets/die_4_1.png');
        game.load.image('die_4_2', 'Assets/die_4_2.png');
        game.load.image('die_4_5', 'Assets/die_4_5.png');
        game.load.image('die_4_6', 'Assets/die_4_6.png');
        game.load.image('die_5_1', 'Assets/die_5_1.png');
        game.load.image('die_5_3', 'Assets/die_5_3.png');
        game.load.image('die_5_4', 'Assets/die_5_4.png');
        game.load.image('die_5_6', 'Assets/die_5_6.png');
        game.load.image('die_6_2', 'Assets/die_6_2.png');
        game.load.image('die_6_3', 'Assets/die_6_3.png');
        game.load.image('die_6_4', 'Assets/die_6_4.png');
        game.load.image('die_6_5', 'Assets/die_6_5.png');

    }

    function create () {
        this.game.board_sprites = draw_Board(board ,board_img_dict);
        this.game.die_sprite = draw_Cell('ERR', board.getDicePosition()[1], board.getDicePosition()[0], board_img_dict);
        update_dice_visual();
        cursors = game.input.keyboard.createCursorKeys();
        cursors.left.onUp.add(function() {
            cellsChanged = board.moveWest();
            update_Board(board, board_img_dict, cellsChanged);
            update_text();
            update_nav_horiz('left');
        }, this);
        cursors.right.onUp.add(function() {
            cellsChanged = board.moveEast();
            update_Board(board, board_img_dict, cellsChanged);
            update_text();
            update_nav_horiz('right');

        }, this);
        cursors.up.onUp.add(function() {
            cellsChanged = board.moveNorth();
            update_Board(board, board_img_dict, cellsChanged);
            update_text();
            update_nav_vert('up');

        }, this);
        cursors.down.onUp.add(function() {
            cellsChanged = board.moveSouth();
            update_Board(board, board_img_dict, cellsChanged);
            update_text();
            update_nav_vert('down');

        }, this);
        update_Die();
    }

    function update() {
    }

    //Creates a sprite for the cell at (x,y) corresponding to the given value. 
    function draw_Cell(value, locX, locY, img_dict){
        var cell;
        var dicePos = board.getDicePosition();
        
        //draw a dice face if cell has a dice on it
        if (dicePos[1]==locX && dicePos[0]==locY){
            // return drawDie(board.getDice().getTopValue(), locX, locY); 
            var diceVal = 'd'+board.getDice().getTopValue();
            cell = game.add.sprite(locX*CELL_WIDTH,locY*CELL_HEIGHT, img_dict[diceVal]);
        // otherwise draw a number cell
        } else if (value != null && value > 0) {
            cell = game.add.sprite(locX*CELL_WIDTH,locY*CELL_HEIGHT, img_dict[value]);
        } else {
            cell = game.add.sprite(locX*CELL_WIDTH,locY*CELL_HEIGHT, 'board_free');
        }

        cell.scale.x = CELL_WIDTH / BOARD_IMAGE_WIDTH;
        cell.scale.y = CELL_HEIGHT / BOARD_IMAGE_HEIGHT;
        return cell;
    }
    
    // Updates two cells the cell moved to and the cell moved from.
    // Todo(gebhard): Reset zeros by new cracking mechanics
    function update_Board(board, img_dict, cellsChanged) {
//        for (ind = 0; ind < 2; ind++) {
//            cell = cellsChanged[ind];
//            draw_Cell(board.getValue(cell[0], cell[1]), cell[1], cell[0], img_dict);
//        }
        cellsChanged.forEach(function(cell, index){
            update_Cell(board.getValue(cell[0], cell[1]), cell[0], cell[1], img_dict);
        });
        update_Die();
        
    }
    //Creates the whole board given an of the values.
    //board_array: 2d array.
    function draw_Board(board, img_dict){
        size = board.getSize();
        sprites_array = [];
        for (i = 0; i < size; i++) {
            sprite_row = [];
            for (j = 0; j < size; j++) {
                sprite_row.push(draw_Cell(board.getValue(i, j), j, i, img_dict));
            }
            sprites_array.push(sprite_row);
        }
        return sprites_array;
    }
    
    //Replaces the image of a cell after the value changes.
    //Does not create a new sprite, therefore should save resources.
    function update_Cell(value, locX, locY, img_dict){
        cell = game.board_sprites[locX][locY];
        console.log(value);
        if (value != null && value > 0){
            cell.loadTexture(img_dict[value]);
        }
        else if (value === 0 || value === 7) {
            cell.loadTexture(img_dict[7]);
        }
        else {
            cell.loadTexture("board_free");
        }
        if (board.getShouldReset()){
            board.getComboChain().forEach(function(cell, index){
            cell = game.board_sprites[cell[0]][cell[1]];
            cell.loadTexture(img_dict[Math.floor((Math.random() * 6) + 1)]);
        });
        }
    }
        
    function update_Die(){
        var dicePos = board.getDicePosition();
        game.die_sprite.x = dicePos[1] * CELL_WIDTH;
        game.die_sprite.y = dicePos[0] * CELL_HEIGHT;
        var diceVal = 'd'+board.getDice().getTopValue() + board.getDice().getNorthValue();
        game.die_sprite.loadTexture(board_img_dict[diceVal]);
    }
    function update_text() {
        update_dice_visual();
        update_score();
        update_moves();
        update_combo();
    }
    function update_score() {
        document.getElementById("score").innerHTML = "Score: " + board.getScore();
    }
    function update_combo() {
        document.getElementById("combo").innerHTML = "Combo Length: " + board.getComboLength();
    }
    function update_moves() {
        document.getElementById("moves").innerHTML = "Moves Remaining: " + board.getMovesRemaining();
    }

    function update_face(id, value, northValue) {
        var die_png = "Assets/die_" + value + "_" + northValue + ".png";
        document.getElementById(id).src = die_png;
    }
    
    function update_face_class(cla, value, northValue){
        var die_png = "Assets/die_" + value + "_" + northValue + ".png";
    }
    function update_dice_visual() {
        var dice = board.getDice();
        update_face("north", dice.getNorthValue(), dice.getBottomValue());
        update_face("west", dice.getWestValue(), dice.getNorthValue());
        update_face("center", dice.getTopValue(), dice.getNorthValue());
        update_face("east", dice.getEastValue(), dice.getNorthValue());
        update_face("south", dice.getSouthValue(), dice.getTopValue());
        update_face_class('.bot', dice.getBottomValue(), dice.getSouthValue());
    }
        
        
    function update_nav_horiz(direction){
        $('.horiz').hide()
        if (direction == 'left'){
            animation1 = {right: '-100px'}
            animation2 = {right: '0px'}
        }else if (direction == 'right'){
            animation1 = {left: '-100px'}
            animation2 = {left: '0px'}
        }
        $('.horiz').animate(animation1, 0.001, function(){
                $('.horiz').show()
                $('.horiz').animate(animation2,100)
        })
        $('.horiz').css('left', '')
        $('.horiz').css('right', '')
    }
    
    function update_nav_vert(direction){
        $('.vert').hide()
        if (direction == 'up'){
            animation1 = {bottom: '-100px'}
            animation2 = {bottom: '0px'}
        }else if (direction == 'down'){
            animation1 = {top: '-100px'}
            animation2 = {top: '0px'}
        }
        $('.vert').animate(animation1, 0.001, function(){
                $('.vert').show()
                $('.vert').animate(animation2,100)
        })
        $('.vert').css('top', '')
        $('.vert').css('bottom', '')
    }
    
};

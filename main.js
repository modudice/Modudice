var CELL_WIDTH = 100;
var CELL_HEIGHT = 100;
var ROWS = 5;
var COLS = 5;
var score = 0;


//These can be retrieved without hard-coding. However, I think that adds extra complexity.
var BOARD_IMAGE_WIDTH = 690; //721
var BOARD_IMAGE_HEIGHT = 690;

var DIE_IMAGE_WIDTH = 431; //431
var DIE_IMAGE_HEIGHT = 431;

var GAME_WIDTH = ROWS*CELL_WIDTH+4;
var GAME_HEIGHT = COLS*CELL_HEIGHT+4;

var test_board = [[1,2,3,4,5],
                  [1,2,3,4,5],
                  [1,2,3,4,5],
                  [1,2,3,4,5],
                  [5,4,3,2,1]];

window.onload = function() {
    var board = new Board(5);

    // TODO: fix the game width
    var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'board', { preload: preload, create: create, update: update });

    var board_img_dict = {'1':'board_1',
                          '2':'board_2',
                          '3':'board_3',
                          '4':'board_4',
                          '5':'board_5',
                          '6':'board_6',
                          'd1': 'die_1',
                          'd2': 'die_2',
                          'd3': 'die_3',
                          'd4': 'die_4',
                          'd5': 'die_5',
                          'd6': 'die_6',};
    
    
    function preload () {
        game.load.image('board_1', 'Assets/board_1.png');
        game.load.image('board_2', 'Assets/board_2.png');
        game.load.image('board_3', 'Assets/board_3.png');
        game.load.image('board_4', 'Assets/board_4.png');
        game.load.image('board_5', 'Assets/board_5.png');
        game.load.image('board_6', 'Assets/board_6.png');
        game.load.image('board_free', 'Assets/board_free.png');
        game.load.image('die_1', 'Assets/die_1.png');
        game.load.image('die_2', 'Assets/die_2.png');
        game.load.image('die_3', 'Assets/die_3.png');
        game.load.image('die_4', 'Assets/die_4.png');
        game.load.image('die_5', 'Assets/die_5.png');
        game.load.image('die_6', 'Assets/die_6.png');
    }

    function create () {
        this.game.board_sprites = draw_Board(board ,board_img_dict);
        textGUI = game.add.text(500, 0, getTextGUI(board), { fontSize: '32px', fill: '#FF0000' });

        cursors = game.input.keyboard.createCursorKeys();
        cursors.left.onUp.add(function() {
            cellsChanged = board.moveWest();
            update_Board(board, board_img_dict, cellsChanged);
            textGUI.text = getTextGUI(board);
        }, this);
        cursors.right.onUp.add(function() {
            cellsChanged = board.moveEast();
            update_Board(board, board_img_dict, cellsChanged);
            textGUI.text = getTextGUI(board);
        }, this);
        cursors.up.onUp.add(function() {
            cellsChanged = board.moveNorth();
            update_Board(board, board_img_dict, cellsChanged);
            textGUI.text = getTextGUI(board);
        }, this);
        cursors.down.onUp.add(function() {
            cellsChanged = board.moveSouth();
            update_Board(board, board_img_dict, cellsChanged);
            textGUI.text = getTextGUI(board);
        }, this);
    }

    function update() {
    }

    // this was coded up in 5 minutes, yes i know it looks crappy
    function getTextGUI(board) {
        line0 = "    Score: " + board.getScore() + "\n";
        line1 = "    Dice:" + "\n";
        var dice = board.getDice();
        var top = dice.getTopValue();
        var north = dice.getNorthValue();
        var south = dice.getSouthValue();
        var east = dice.getEastValue();
        var west = dice.getWestValue();
        dice_text_formatted = "   " + north +"\n" + "    " + west + " " + top + " " + east + "\n       " + south;
        line2 = "    " + dice_text_formatted + "\n";
        line3 = "    Dice position:" + "\n";
        var dicePosition = board.getDicePosition();
        line4 = "    [" + dicePosition[0] + ", " + dicePosition[1] + "]" + "\n";
        line5 = "    Moves Remaining: " + board.getMovesRemaining() + "\n";
        line6 = "    Combo Length: " + board.getComboLength();
        return line0 + line1 + line2 + line3 + line4 + line5 + line6;

    }

    //draws a die face (unfinished code)
    // function drawDie(value, locX, locY){
    //     var cell
    //     var diceVal = 'd'+value;
    //     cell = game.add.sprite(locX*CELL_WIDTH,locY*CELL_HEIGHT, img_dict[diceVal]); 
    //     cell.scale.x = CELL_WIDTH / DIE_IMAGE_WIDTH;
    //     cell.scale.y = CELL_HEIGHT / DIE_IMAGE_WIDTH;
    //     return cell;
    // }
    
    //draws the navigator (unfinished code)
    // function drawNavigator(board, img_dict){
    //     var dice = board.getDice();
    //     drawDie(dice.getTopValue(), 8,2);
    //     drawDie(dice.getNorthValue(), 8,1);
    //     drawDie(dice.getSouthValue(), 8,3);
    //     drawDie(dice.getEastValue(), 7,2);
    //     drawDie(dice.getWestValue(), 9,2);
    // }

    //Creates a sprite for the cell at (x,y) corresponding to the given value. 
    function draw_Cell(value, locX, locY, img_dict){
        var cell;
        var dicePos = board.getDicePosition();
        
        //draw a dice face if cell has a dice on it
        if (dicePos[1]==locX && dicePos[0]==locY){
            // return drawDie(board.getDice().getTopValue(), locX, locY); 
            var diceVal = 'd'+board.getDice().getTopValue();
            cell = game.add.sprite(locX*CELL_WIDTH,locY*CELL_HEIGHT, img_dict[diceVal]); 
            cell.scale.x = CELL_WIDTH / DIE_IMAGE_WIDTH;
            cell.scale.y = CELL_HEIGHT / DIE_IMAGE_WIDTH;
            return cell;
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
        for (ind = 0; ind < 2; ind++) {
            cell = cellsChanged[ind];
            draw_Cell(board.getValue(cell[0], cell[1]), cell[1], cell[0], img_dict);
        }

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
        cell.loadTexture(img_dict[value]);
    }

};

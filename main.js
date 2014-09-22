var CELL_WIDTH = 100;
var CELL_HEIGHT = 100;
var ROWS = 5;
var COLS = 5;
var score = 0;


//These can be retrieved without hard-coding. However, I think that adds extra complexity.
var BOARD_IMAGE_WIDTH = 690; //721
var BOARD_IMAGE_HEIGHT = 690;

var GAME_WIDTH = ROWS*CELL_WIDTH+4;
var GAME_HEIGHT = COLS*CELL_HEIGHT+4;

var test_board = [[1,2,3,4,5],
                  [1,2,3,4,5],
                  [1,2,3,4,5],
                  [1,2,3,4,5],
                  [5,4,3,2,1]];

window.onload = function() {

    var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    
    var board_img_dict = {'1':'board_1',
                          '2':'board_2',
                          '3':'board_3',
                          '4':'board_4',
                          '5':'board_5',
                          '6':'board_6'};
    
    
    function preload () {
        game.load.image('board_1', 'Assets/board_1.png');
        game.load.image('board_2', 'Assets/board_2.png');
        game.load.image('board_3', 'Assets/board_3.png');
        game.load.image('board_4', 'Assets/board_4.png');
        game.load.image('board_5', 'Assets/board_5.png');
        game.load.image('board_6', 'Assets/board_6.png');
        game.load.image('board_free', 'Assets/board_free.png');
    }

    function create () {
        alert("hi1");
        var board = new Board(5);
        
        this.game.board_sprites = draw_Board(board ,board_img_dict);
    }

    function update() {
        // TODO: fill this in
    }
    
    
    //Creates a sprite for the cell at (x,y) corresponding to the given value. 
    function draw_Cell(value, locX, locY, img_dict){
        var cell;
        if (value != null && value > 0) {
            cell = game.add.sprite(locX*CELL_WIDTH,locY*CELL_HEIGHT, img_dict[value]);
        } else{
            cell = game.add.sprite(locX*CELL_WIDTH,locY*CELL_HEIGHT, 'board_free');
        }
        cell.scale.x = CELL_WIDTH / BOARD_IMAGE_WIDTH;
        cell.scale.y = CELL_HEIGHT / BOARD_IMAGE_HEIGHT;
        return cell;
    }
    
    //Creates the whole board given an of the values.
    //board_array: 2d array.
    function draw_Board(board, img_dict){
        size = 5;
        sprites_array = [];
        for (i = 0; i < size; i++) {
            sprite_row = [];
            for (j = 0; j < size; j++) {
                sprite_row.push(draw_Cell(board.getValue(i, j), i, j, img_dict));

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

    function update_Score(){
        score += 10;
    }

};

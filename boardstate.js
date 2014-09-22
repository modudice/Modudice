
/*
Instantiate a Board Game. Size >= 3
*/
function Board(size) {

    var TILE_RESET_TURN = 2;

    // Instantiate blank board
    var board = new Array(size);
    for (i = 0; i < size; i++) {
        board[i] = new Array(size);
    }

    // Populate board with values
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            board[i][j] = Math.floor((Math.random() * 6) + 1);
        }
    }

    // Designate free spaces (-1 in board)
    board[size / 2][size / 2] = null;
    if (size % 2 == 0) {
        board[size / 2 - 1][size / 2 - 1] = null;
    }

    this.getValue = function(i, j) {
        return board[i][j];
    }

    /*
    Add value to position i, j mod 7
    */
    this.makeMove = function(i, j, diceValue) {

        if (board[i][j] != null && board[i][j] > 0)
            (board[i][j] + diceValue) % 7;
        }
        for (x = 0; x < size; x++) {
            for (y = 0; y < size; y++) {
                var val = board[x][y];
                if (val === null) {
                    // Permanent blank square, do nothing.
                }
                else if (val <= 0) {
                    // Decrement the timer.
                    board[x][y] -= 1;
                    if (board[x][y] === -TILE_RESET_TURN) {
                        // The timer has run out, reset square.
                        board[x][y] = Math.floor((Math.random() * 6) + 1);
                    }
                }
            }
        }
        return board[i][j];
    }
}


function Dice() {
    /* 
    Standard dice orientation: Key is top value (the value that is added to the board tile)
                               Array is [north, east, south, west]
    */
    var DICE_ORIENTATIONS = {1:[5, 3, 2, 4],
                             2:[1, 3, 6, 4],
                             3:[5, 6, 1, 2],
                             4:[5, 1, 2, 6],
                             5:[6, 3, 1, 4],
                             6:[5, 4, 2, 3]};

    var top;
    var bottom;
    var north;
    var south;
    var east;
    var west;

    resetDice();

    /* Rolls the die: set 6 variables randomly, using dict */
    function resetDice() {
        top = Math.floor((Math.random() * 6) + 1);
        bottom = 7 - top;

        standardOrientation = DICE_ORIENTATIONS[top];
        orientationIndex = Math.floor(Math.random()*4);
        orientationArray = [0, 0, 0, 0]; // north, east, south, west

        for (i = 0; i < 4; i++) {
            orientationArray[i] = standardOrientation[orientationIndex];
            orientationIndex = (orientationIndex + 1) % 4;
        }

        north = orientationArray[0];
        east = orientationArray[1];
        south = orientationArray[2];
        west = orientationArray[3];
    }

    /* these four functions will update the 6 variables appropriately */
    function rollNorth() {
        temp = top;
        top = south;
        south = bottom;
        bottom = north;
        north = temp;
        return top;
    }

    function rollSouth() {
        temp = top;
        top = north;
        north = bottom;
        bottom = south;
        south = temp;
        return top;
    }

    function rollEast() {
        temp = top;
        top = west;
        west = bottom;
        bottom = east;
        east = temp;
        return top;
    }

    function rollWest() {
        temp = top;
        top = east;
        east = bottom;
        bottom = west;
        west = temp;
        return top;
    }

    function getTopValue() {
        return top;
    }

    function getBottomValue() {
        return bottom;
    }

    function getNorthValue() {
        return north;
    }

    function getSouthValue() {
        return south;
    }

    function getEastValue() {
        return east;
    }

    function getWestValue() {
        return west;
    }

}
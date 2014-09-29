
/*
Instantiate a Board Game. Size >= 3
*/
function Board (size) {

    var TILE_RESET_TURN = 3;
    var BASE_SCORE = 100;
    var BASE_MOVES = 3;

    var shouldReset = false;
    var comboChain = [];
    var score = 0;
    var movesRemaining = 20;
    var comboLength = 0;
    var dice = new Dice();
    var dicePosition = [Math.floor(size/2), Math.floor(size/2)];

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
    board[Math.floor(size/2)][Math.floor(size/2)] = null;
    if (size % 2 === 0) {
        board[Math.floor(size/2) - 1][Math.floor(size/2) - 1] = null;
    }

    this.getValue = function(i, j) {
        return board[i][j];
    };


    this.getSize = function() {
        return size;
    };

    this.moveNorth = function() {
       if(movesRemaining <= 0){
           dead();
       }
        if (comboLength === 0){
            comboChain = [];
        }
        i = dicePosition[0] - 1;
        j = dicePosition[1];
        if (isValidPosition(i,j) && movesRemaining > 0) {
            dice.rollNorth();
            dicePosition = [i,j];
            makeMove(i, j, dice.getTopValue());
            return [[i + 1, j], [i, j]];
        }
    };

    this.moveSouth = function() {
       if(movesRemaining <= 0){
           dead();
       }
        if (comboLength === 0){
            comboChain = [];
        }
        i = dicePosition[0] + 1;
        j = dicePosition[1];
        if (isValidPosition(i,j) && movesRemaining > 0) {
            dice.rollSouth();
            dicePosition = [i,j];
            makeMove(i, j, dice.getTopValue());
            return [[i - 1, j], [i, j]];
        }
    };

    this.moveEast = function() {
        if(movesRemaining <= 0){
           dead();
        }
        if (comboLength === 0){
            comboChain = [];
        }
        i = dicePosition[0];
        j = dicePosition[1] + 1;
        if (isValidPosition(i,j) && movesRemaining > 0) {
            dice.rollEast();
            dicePosition = [i,j];
            makeMove(i, j, dice.getTopValue());
            return [[i, j - 1], [i, j]];
        }
    };

    this.moveWest = function() {
        if(movesRemaining <= 0){
           dead();
        }
        if (comboLength === 0){
            comboChain = [];
        }
        i = dicePosition[0];
        j = dicePosition[1] - 1;
        if (isValidPosition(i,j) && movesRemaining > 0) {
            dice.rollWest();
            dicePosition = [i,j];
            makeMove(i, j, dice.getTopValue());
            return [[i, j + 1], [i, j]];
        }

    };
    
    dead = function() {
       $(".dead").show();
       $(".gameOverMessage").show();
    };

    this.getScore = function() {
        return score;
    };

    this.getDice = function() {
        return dice;
    };

    this.getDicePosition = function() {
        return dicePosition;
    };

    this.getComboLength = function() {
        return comboLength;
    };

    this.getMovesRemaining = function() {
        return movesRemaining;
    };

    this.getComboChain = function() {
        return comboChain;
    };
    this.resetComboChain = function() {
        comboChain = [];
        shouldReset = false;
    };
    this.getShouldReset = function() {
        return shouldReset;
    };

    this.isGameOver = function() {
        return movesRemaining === 0;
    };
    this.setCell = function(i,j,value) {
        console.log(i);
        board[i][j] = value;
    }; 

    /*
    Move die with value diceValue to position i,j.
    Should be a valid move (inside the board).
    */
    function makeMove(i, j, diceValue) {
        movesRemaining -= 1;
        var wasZero = (board[i][j] === 0);
        if (board[i][j] != null && board[i][j] > 0) {
            board[i][j] = (board[i][j] + diceValue) % 7;
        }
        if (board[i][j] === 0 && !wasZero) {
            // Increment combo length, add score and moves.
            comboLength += 1;
            shouldReset = false;
            comboChain.push([i,j]);
            score += BASE_SCORE * comboLength;
            moves_to_add = 2;
            if (comboLength >= 5) {
                moves_to_add = 8 + 2*(comboLength - 5);
            }
            else if (comboLength === 4) {
                moves_to_add = 4;
            }
            else if (comboLength === 3) {
                moves_to_add = 4;
            }
            else if (comboLength === 2) {
                moves_to_add = 2;
            }
            movesRemaining += moves_to_add;
            var comboMessage;
            if (comboLength === 1) {
              comboMessage = BASE_SCORE + " points";
            }
            else {
              comboMessage = comboLength + "x Combo! " + BASE_SCORE*((comboLength*(comboLength+1))/2) + " points";
            }
            $(".comboMessage").text(comboMessage); 
            $(".comboMessage").show();
            setTimeout(function(){ $(".comboMessage").hide();}, 1500);
        }
        else {
            shouldReset = true;
            comboLength = 0;
        }

        if (movesRemaining === 0) {
            document.getElementById("moves").innerHTML = "Moves Remaining: 0";
            dead();
        }
    }

    function isValidPosition(i, j) {
        return !(i < 0 || j < 0 || i >= size || j >= size);
    }
}


function Dice() {
    /* 
    Standard dice orientation: Key is top value (the value that is added to the board tile)
                               Array is [north, east, south, west]
    */
    var DICE_ORIENTATIONS = {1:[5, 3, 2, 4],
                             2:[1, 3, 6, 4],
                             3:[5, 6, 2, 1],
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
    this.rollNorth = function() {
        temp = top;
        top = south;
        south = bottom;
        bottom = north;
        north = temp;
    };

    this.rollSouth = function() {
        temp = top;
        top = north;
        north = bottom;
        bottom = south;
        south = temp;
    };

    this.rollEast = function() {
        temp = top;
        top = west;
        west = bottom;
        bottom = east;
        east = temp;
    };

    this.rollWest = function() {
        temp = top;
        top = east;
        east = bottom;
        bottom = west;
        west = temp;
    };

    this.getTopValue = function() {
        return top;
    };

    this.getBottomValue = function() {
        return bottom;
    };

    this.getNorthValue = function() {
        return north;
    };

    this.getSouthValue = function() {
        return south;
    };

    this.getEastValue = function() {
        return east;
    };

    this.getWestValue = function() {
        return west;
    };

}

function BoardState(size) {

    // Instantiate blank board
    var board = new Array(size);
    for (i = 0; i < size; i++) {
        board[i] = new Array(size);
    }

    // Popular board with values
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            
        }
    }

}






function Dice() {
    /* 
    Standard dice orientation: Key is front value (the value that is added to the board tile)
                               Array is [top, right, bottom, left]
    */
    var DICE_ORIENTATION_DICT = {1:[5, 3, 2, 4],
                                 2:[1, 3, 6, 4],
                                 3:[5, 6, 1, 2],
                                 4:[5, 1, 2, 6],
                                 5:[6, 3, 1, 4],
                                 6:[5, 4, 2, 3]};

    var front;
    var back;
    var top;
    var bottom;
    var left;
    var right;

    resetDice();

    /* Rolls the die: set 6 variables randomly, using dict */
    function resetDice() {
        front = Math.floor((Math.random() * 6) + 1);
        back = 7 - front;

        standardOrientation = DICE_ORIENTATION_DICT[front];
        orientationIndex = Math.floor(Math.random()*4);
        orientationArray = [0, 0, 0, 0]; // top, right, bottom, left

        for (i = 0; i < 4; i++) {
            orientationArray[i] = standardOrientation[orientationIndex];
            orientationIndex = (orientationIndex + 1) % 4;
        }

        top = orientationArray[0];
        right = orientationArray[1];
        bottom = orientationArray[2];
        left = orientationArray[3];
    }

    /* these four functions will update the 6 variables appropriately */
    function rollUp(){
        temp = front;
        front = bottom;
        bottom = back;
        back = top;
        top = temp;
    }

    function rollLeft(){
        temp = front;
        front = right;
        right = back;
        back = left;
        left = temp;
    }

    function rollRight(){
        temp = front;
        front = left;
        left = back;
        back = right;
        right = temp;
    }

    function rollDown(){
        temp = front;
        front = top;
        top = back;
        back = bottom;
        bottom = temp;
    }

    /*
    Get the value of the front side of the dice
    */
    function getFrontValue() {
        return front;
    }

    /*
    Get the values of the side of the dice (top, right, bottom, left)
    */
    function getSideValues() {
        return [top, right, bottom, left];
    }


}
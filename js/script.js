//create global variables for easy access
var __currentCell;
var __createCells;





//creates maze
function createMaze(numberOfCols, numberOfRows) {
    //easy to reference total cells for cell check later
    var __totalCells = numberOfRows * numberOfCols
    __createCells = [];
    var cellConstruct = [];
    //create the requisite array structure
    for (var i = 0; i < numberOfRows; i++) {
        __createCells[i] = [];
        cellConstruct[i] = [];
    //top left cell with all 4 walls up is __createCells[0][0][0,0,0,0]
    //construct is simply to determine if cell has been checked before(false if it has been checked)
        for (var j = 0; j < numberOfCols; j++) {
            __createCells[i][j] = [0,0,0,0];
            cellConstruct[i][j] = true;
        }
    }

    //random start point (for more variations in maze structure)
    __currentCell = [Math.floor(Math.random() * numberOfCols), Math.floor(Math.random() * numberOfRows)];
    //first cell of solution path (where we start building from)
    var solution = [__currentCell];
    //mark the cell as checked
    cellConstruct[__currentCell[0]][__currentCell[1]] = false;
    //mark how many cells have been checked
    var cellsChecked = 1;

    //run through entire maze
    while (cellsChecked < __totalCells) {
        //find all cells around the current cell
        var checkAround = [[__currentCell[0]-1, __currentCell[1], 0, 2], //find north
                            [__currentCell[0], __currentCell[1]+1, 1, 3], //find east
                            [__currentCell[0]+1, __currentCell[1], 2, 0],   //find south
                            [__currentCell[0], __currentCell[1]-1, 3, 1]];  //find west
        //create array for cells around the __currentCell
        var neighbours = [];

        //for all neighbours, if it isnt one of the outer cells, and has not been checked before, push into neighbour array
        for (var k = 0; k < checkAround.length; k++) {
            if (checkAround[k][0] > -1 && checkAround[k][0] < numberOfCols && checkAround[k][1] > -1 && checkAround[k][1] < numberOfRows && cellConstruct[checkAround[k][0]][checkAround[k][1]]) {
                neighbours.push(checkAround[k]);
            }
        }

        //If at least one cell meets the criteria above,
        if (neighbours.length) {
            // Randomly choose one
            nextCell = neighbours[Math.floor(Math.random() * neighbours.length)];
            
            // Remove the wall between the current cell and nextCell
            __createCells[__currentCell[0]][__currentCell[1]][nextCell[2]] = 1;
            __createCells[nextCell[0]][nextCell[1]][nextCell[3]] = 1;
            
            // Mark the nextCell as visited
            cellConstruct[nextCell[0]][nextCell[1]] = false;
            //add one to cellsChecked counter
            cellsChecked = cellsChecked + 1;
            //mark nextCell as new __currentCell
            __currentCell = [nextCell[0], nextCell[1]];
            //push coordinates into solution array
            solution.push(__currentCell);
        } else {
            //throw cell out of solution 
            __currentCell = solution.pop();
        }    
    }
    console.log(__createCells);
    return __createCells;

};


window.onload = function(){

    //create the maze based on variables. DO IT!
    var doIT = createMaze(15,15);
    for (var i = 0; i < doIT.length; i++) {
        $("#maze").append("<div class='rowContainer'id='row" + i  + "'>");
        for (var j = 0; j < doIT[i].length; j++) {
            var cellID = i+"-"+j;
            //add border if border values = 0
            $("#row" + i).append("<div class='cellDiv' id='" + cellID + "'></div>");
            if (doIT[i][j][0] == 0) { $("#" + cellID).css("border-top", "2px solid white"); }
            if (doIT[i][j][1] == 0) { $("#" + cellID).css("border-right", "2px solid white"); }
            if (doIT[i][j][2] == 0) { $("#" + cellID).css("border-bottom", "2px solid white"); }
            if (doIT[i][j][3] == 0) { $("#" + cellID).css("border-left", "2px solid white"); }
        };
        $("#maze").append("</div>");
    };

    //add sprite to current cell (just as a randomised start point for player)
    $("#" + __currentCell[0] + "-" + __currentCell[1]).css("background-image", "url('./img/marauderSprite.jpg");

    //moving the player around the board
    function movePlayer(direction) {
        //if up arrow was pressed,
        if (direction === "north") {
            //check if there are walls north of __currentCell
            if (__createCells[__currentCell[0]][__currentCell[1]][0] == 1) {
                $("#" + __currentCell[0] + "-" + __currentCell[1]).css("background-image", "none");
                __currentCell[0] = __currentCell[0] - 1;
            } else {
                return;
            };
            
        } else if (direction === "east") {
            //check if there are walls east of __currentCell
            if (__createCells[__currentCell[0]][__currentCell[1]][1] == 1) {
                $("#" + __currentCell[0] + "-" + __currentCell[1]).css("background-image", "none");
                __currentCell[1] = __currentCell[1] + 1;
            } else {
                return;
            };
           
        } else if (direction === "south") {
            //check if there are walls south of __currentCell
            if (__createCells[__currentCell[0]][__currentCell[1]][2] == 1) {
                $("#" + __currentCell[0] + "-" + __currentCell[1]).css("background-image", "none");
                __currentCell[0] = __currentCell[0] + 1;
            } else {
                return;
            };
        } else if (direction === "west") {
            //check if there are walls west of __currentCell
            if (__createCells[__currentCell[0]][__currentCell[1]][3] == 1) {
                $("#" + __currentCell[0] + "-" + __currentCell[1]).css("background-image", "none");
                __currentCell[1] = __currentCell[1] - 1;
            } else {
                return;
            };

        } else {
            console.log("movePlayer error dev pls fix")
        }
        //show player sprite at new __currentCell
        $("#" + __currentCell[0] + "-" + __currentCell[1]).css("background-image", "url('./img/marauderSprite.jpg");
    };


    //adding event listeners to arrow keys (might seem redundant, but allows for additional keys to be listened to in the future)
    $(window).keydown(function(event) {
        //if direction keys are pressed, prevent default action (stop it from scrolling)
        if (event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40) {
            event.preventDefault();
        }
        //if up arrow key is pressed
        if (event.which == 38) {
            movePlayer("north");
        } else if (event.which == 39) {
            movePlayer("east");
        } else if (event.which == 40) {
            movePlayer("south");
        } else if (event.which == 37) {
            movePlayer("west");
        }
    });









};


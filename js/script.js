//create global variables for easy access
var __currentCell = [];
var __createCells;
var __enemyPositions = {};
var __worldEvents = {};
var __playerName;
var __playerStatus = {
        gold: 0,
        durability: 0,
        health: 10,
        fear: 0
    };
var __endRow = 0;
var __endCol = 0;
var __maxPlayerHealth = 10;



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
        var checkAround = [[__currentCell[0] - 1, __currentCell[1], 0, 2], //find north
                            [__currentCell[0], __currentCell[1] + 1, 1, 3], //find east
                            [__currentCell[0] + 1, __currentCell[1], 2, 0],   //find south
                            [__currentCell[0], __currentCell[1] - 1, 3, 1]];  //find west
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



//start of game execution
window.onload = function(){
    //Open overlay
    function openOverlay() {
        //add event listeners to directional keys
        directionalKeys();
        $("#mainOverlay").css("height", "80%");
    };

    //closes overlay
    function closeOverlay() {
        //remove directionalkeys() when mainOverlay is not in focus
        $(window).off();
        $("#mainOverlay").css("height", "0%");
    };

    //Open sec overlay
    function openSecOverlay() {
        $("#secOverlay").css("height", "80%");
    };

    //closes sec overlay
    function closeSecOverlay() {
        $("#secOverlay").css("height", "0%");
    };

    //combination of close sec overlay and open main overlay
    function closeSecOpenMain() {
        closeSecOverlay();
        openOverlay();
    }

    //get find corresponding value of key in each event
    function findValue(event, eventNumber, key) {
        for (var searchKey in event[eventNumber]) {
            if (searchKey === key) {
                return event[eventNumber][key];
            }
        }
    };

    function buildHealth() {
    //calculate percentage of hp loss to be applied to clip function
        var percentLoss;
        if (__playerStatus["health"] > __maxPlayerHealth || __playerStatus["health"] === __maxPlayerHealth) {
            percentLoss = 0;
        } else {
            percentLoss = (__maxPlayerHealth - __playerStatus["health"]) / __maxPlayerHealth * 100;
        };
    //apply loss to healthbar clip path
        $("#healthBar").css("clip-path", "inset(" + percentLoss + "% 0 0 0)");
    };

    //creates and prints maze onto mainOverlay, as well as instructional text
    function generateMaze() {
        changeOverlayContent(mazeInstructions);
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
    };

    //change mainOverlay content
    function changeOverlayContent(content) {
        $("#overlayContent").html("");
        $("#overlayContent").html(content);
    };

    //change secOverlayContent
    function changeSecOverlayContent(content) {
        $("#secOverlayContent").html("");
        $("#secOverlayContent").html(content);
    };

    //different varieties of fight events
    //centaur fight event
    function centaurFight() {
        //declare mouse position
        var currentMouseX;
        var currentMouseY;
        //declare enemy position
        var enemyX;
        var enemyY;
        __playerStatus["health"] = __playerStatus["health"] - 1;
        buildHealth();
        //show event text
        changeSecOverlayContent(findValue(fightEvent, 0, "text"));
        //append player image to overlay
        $("<img>").attr({"src": "./img/playerImage.jpg", "id": "playerImage", "align": "left"}).appendTo($("#secOverlayContent"));
        $("#playerImage").css({"text-align": "left", "display": "inline"});
        //append enemy image to overlay
        $("<img>").attr({"src": fightEvent[0]["image"], "id": "enemyImage"}).appendTo($("#secOverlayContent"));
        $("#enemyImage").css({"display": "inline"});
        //centaur win screen
        function centaurWin() {
            changeSecOverlayContent(findValue(fightEvent, 0, "winText"))
            //create button to show next screen
            $("<button>").html("Next").attr("id", "nextButton").appendTo($("#secOverlayContent"));
            $("#nextButton").css({"display": "block", "margin": "0 auto"});
            //add event listener to button;
            $("#nextButton").click(closeSecOpenMain);
        }
        //find the element's distance from document window. in this case enemyImage
        function offset(el) {
            var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
    
        //find enemyImage
        var div = document.querySelector('#enemyImage');
        var divOffset = offset(div);
        enemyX = divOffset.left;
        enemyY = divOffset.top;

        // find current mouse position everytime it moves
        var findMousePos = function(e) {
            e = e || window.event
        
            var currentMouseX = e.pageX;
            var currentMouseY = e.pageY;
        
            // IE 8
            if (currentMouseX === undefined) {
                currentMouseX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                currentMouseY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
        
            if (currentMouseX > enemyX - 20 && currentMouseX < enemyX + 200 && currentMouseY > enemyY - 20 && currentMouseY < enemyY + 200) {
                //enemy "death"
                $("#enemyImage").css("transform", "rotate(90deg)")
                //create button to show next screen
                $("<button>").html("Next").attr("id", "nextButton").appendTo($("#secOverlayContent"));
                $("#nextButton").css({"display": "block", "margin": "0 auto"});
                //add event listener to button;
                $("#nextButton").click(centaurWin);
                $(window).unbind("mousemove", findMousePos);
            }
            
        }
        
        // attach function to the mousemove event
        $(window).mousemove(findMousePos);

    };

    //spider fight event
    function spiderFight() {
        //set number of spiders to generate
        var spiderNumber = 5;
        //show event text on main display
        changeSecOverlayContent(findValue(fightEvent, 1, "text"));
        //creating array to facilitate scoping issue
        var spiderArray = [];
        for (var i = 0; i < spiderNumber; i++) {
            //randomise where spiders pop up
            var randomLeft = Math.floor(Math.random() * 800);
            var randomTop = Math.floor(Math.random() * 300);
            $("<img>").attr({"class": "spiders", "id": "spider" + i, "src": fightEvent[1]["image"]}).appendTo($("#secOverlayContent"));
            $("#spider" + i).css({"left": (-550 + randomLeft) + "px", "top": (1 + randomTop) + "px", "width": 40 + "px", "z-index": 1000, "position": "relative", "text-align": "left"});

    
            // //add event listeners to spider images (weird style that doesnt work. kept for posterity)
            // $("#spider" + i).click(function() {
            //     console.log("#spider" + i)
            //     $("#spider" + i).css("display", "none");
            // });
        };
        //strange loop scoping behaviour(thanks Nick)
        spiderArray = document.querySelectorAll(".spiders");  
        //for each spider, on click, disappear
        spiderArray.forEach(function(e) {
            e.addEventListener("click", function(spiderimage) {
                spiderimage.target.style.opacity = 0;
                spiderNumber = spiderNumber - 1;
                if (spiderNumber === 1) {
                    spiderWin();
                }
            });
        });

        //spider win screen
        function spiderWin() {
            changeSecOverlayContent(findValue(fightEvent, 1, "winText"))
            //create button to show next screen
            $("<button>").html("Next").attr("id", "nextButton").appendTo($("#secOverlayContent"));
            $("#nextButton").css({"display": "block", "margin": "0 auto"});
            //add event listener to button;
            $("#nextButton").click(closeSecOpenMain);
        };
        

                                                                                                                                                                                                                             
    };

    //randomise fight battles (which will run each time player enters new room)
    function exeFightEvent() {
        //closes maze
        closeOverlay();
        //open sec overlay
        openSecOverlay();
        //randomise the event that will occur
        switch (Math.floor(Math.random() * Math.floor(fightEvent.length))) {
            case 0: 
            centaurFight();
            break;
            case 1:
            spiderFight();
            break;
        };



    };

    //creation of world events (which will run each time player enters new room)
    function exeWorldEvent() {
        console.log("worldEvent!");
    };



    //moving the player around the board, detect collisions. if collision with enemy/event, run event.
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

        //run event if collision detected
        //for all coordinates in enemy positions
        for (var pos in __enemyPositions) {
            //stringifies array to check if contained values are equal (player collision with enemy)
            if (JSON.stringify(__enemyPositions[pos]) === JSON.stringify(__currentCell)) {
                //remove enemy from object (remove from maze)
                delete __enemyPositions[pos];
                exeFightEvent();
            }
        };

        //for all coordinates in worldEvents
        for (var epos in __worldEvents) {
            //stringifies array to check if contained values are equal (player collision with world events)
            if (JSON.stringify(__worldEvents[epos]) === JSON.stringify(__currentCell)) {
                //remove event from object (remove from maze)
                delete __worldEvents[epos];
                exeWorldEvent();
            };
        };
    };

    //adding event listeners to arrow keys (might seem redundant, but allows for additional keys to be listened to in the future)
    function directionalKeys() {
        $(window).on("keydown",(function(event) {
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
        }));
    }

    //create positions for enemies based on number selected and show them on maze
    function createEnemies(number) {
        for (var i = 0; i < number; i++) {
            var randomX = Math.floor(Math.random() * Math.floor(__createCells.length));
            var randomY = Math.floor(Math.random() * Math.floor(__createCells[0].length));
            //throw the x-y coordinates onto __enemyPositions object
            __enemyPositions["enemy" + i] = [randomX, randomY];
            $("#" + randomX + "-" + randomY).css({"background-image": "url('./img/wolf.png", "background-repeat": "no-repeat"});
        };
    }

    //create random worldEvents which DO NOT show on the maze
    function createWorldEvents(number) {
        for (var i = 0; i < number; i++) {
            var randomX = Math.floor(Math.random() * Math.floor(__createCells.length));
            var randomY = Math.floor(Math.random() * Math.floor(__createCells[0].length));
            //throw the x-y coordinates onto __worldEvents object
            __worldEvents["worldEvent" + i] = [randomX, randomY];
        };
    }




















    
    function gameStart() {
        //create and print maze on mainOverlay
        generateMaze();
        //show welcome text
        changeSecOverlayContent(initialText);
        //add event listener to submit button: get playername and close overlay
        $("#submitPlayerName").click(function() {
            __playerName = $("#playerNameInput").val();
            closeSecOverlay();
            openOverlay();
        });
        //reset player stats
        __playerStatus["gold"] = 200;
        __playerStatus["durability"] = 10;
        __playerStatus["health"] = 10;
        __playerStatus["fear"] = 0;
        __maxPlayerHealth = 10;
        //add sprite to current cell (just as a randomised start point for player)
        $("#" + __currentCell[0] + "-" + __currentCell[1]).css("background-image", "url('./img/marauderSprite.jpg')");
        //create and print enemies on maze
        createEnemies(5);
        //create world events (not shown on maze)
        createWorldEvents(5);
        //create exit point
        __endRow = Math.floor((Math.random() * (__createCells.length - 1)));
        __endCol = Math.floor((Math.random() * (__createCells.length - 1)));
        //add sprite on exit point on variable __map
        $("#" + __endRow + "-" + __endCol).css("background-image", "url('./img/portal.jpeg')");
        

 

    };
    gameStart();










};


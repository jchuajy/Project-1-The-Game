//creating map array
var __map = [
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."]
		];

var __playerName;
var __currentPlayerCol = 0;
var __currentPlayerRow = 0;
var __playerStatus = {
		boredom: 0,
		laziness: 0,
		health: 5,
		fright: 0
	};
var __endRow;
var __endCol;

//Open overlay
function openOverlay() {
	$("#mainOverlay").css("height", "60%");
};

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeOverlay() {
    $("#mainOverlay").css("height", "0%");
};



window.onload = function() {

//build map function
	var buildMap = function() {
		//clear map
		$("#map").html("");
		//for length of map,
		for (i = 0; i < __map.length; i++) {
		//create an element <h1>
		var maph1 = $('<h1>');
		//concat the values of __map[i] and make a new line
		var mapInitial = __map[i].join("     ") + "\n";
		//add the concated string to <h1>
		$("#map").append(maph1);
		//append the <h1> to the map div
		maph1.append(mapInitial);
		};
	};

//change overlay content
	var changeOverlayContent = function(content) {
		$("#overlayContent").html("");
		$("#overlayContent").html(content);
	}

//what happens upon on gamestart/game reset
	var gameStart = function () {
		//insert welcome text
		changeOverlayContent(initialText);
		//add event listener to submit button: get playername and close overlay
		$("#submitPlayerName").click(function() {
			__playerName = $("#playerNameInput").val();
			newRoom();
		});
		//set current playerposition to 1-1
		__currentPlayerRow = 0;
		__currentPlayerCol = 0;
		//mark current player position
		__map[__currentPlayerRow][__currentPlayerCol] = "X";
		//reset player stats
		__playerStatus["boredom"] = 0;
		__playerStatus["laziness"] = 0;
		__playerStatus["health"] = 5;
		__playerStatus["fright"] = 0;
		//create exit point
		__endRow = Math.floor((Math.random() * (__map.length - 1)) + 1);
		__endCol = Math.floor((Math.random() * (__map.length - 1)) + 1);
		__map[__endRow][__endCol] = "E";
		openOverlay();
		//create map
		buildMap();	
	}

//creation of world events (which will run each time player enters new room)
	var exeWorldEvent = function() {
		//show event text on main display
		changeOverlayContent(worldEvent[Math.floor(Math.random() * worldEvent.length)]);

	};

//creation of fight battles (which will run each time player enters new room)
	var exeFightEvent = function() {
		//show event text on main display
		changeOverlayContent(fightEvent[Math.floor(Math.random() * fightEvent.length)]);
	}

//creation of move events (which will run as the last event in any room)
	var exeMoveEvent = function() {
		//show event text on main display
		changeOverlayContent(moveEvent[Math.floor(Math.random() * moveEvent.length)]);
		$("#moveNorth").click(function() {movePlayerCheck("north");});
		$("#moveSouth").click(function() {movePlayerCheck("south");});
		$("#moveEast").click(function() {movePlayerCheck("east");});
		$("#moveWest").click(function() {movePlayerCheck("west");});


	}

//check for move validity + change current player location
	var movePlayerCheck = function(direction) {
		if (direction === "north" && __currentPlayerRow === 0) {
			alert("You can't move there!");
		} else if (direction === "south" && __currentPlayerRow === (__map.length - 1)) {
			alert("You can't move there!");
		} else if (direction === "east" && __currentPlayerCol == (__map[0].length - 1)) {
			alert("You can't move there!");
		} else if (direction === "west" && __currentPlayerCol === 0) {
			alert("You can't move there!");
		} else if (direction == "north") {
			__map[__currentPlayerRow][__currentPlayerCol] = ".";
			__currentPlayerRow = __currentPlayerRow - 1;
		} else if (direction == "south") {
			__map[__currentPlayerRow][__currentPlayerCol] = ".";
			__currentPlayerRow = __currentPlayerRow + 1;
		} else if (direction == "east") {
			__map[__currentPlayerRow][__currentPlayerCol] = ".";
			__currentPlayerCol = __currentPlayerCol + 1;
		} else if (direction == "west") {
			__map[__currentPlayerRow][__currentPlayerCol] = ".";
			__currentPlayerCol = __currentPlayerCol - 1;
		} else {
			return;
		}
		__map[__currentPlayerRow][__currentPlayerCol] = "X";
		//show changes on map
		buildMap();
	}

//things to execute when moving to new room
	var newRoom = function() {
		exeMoveEvent();
	}




gameStart();

















};


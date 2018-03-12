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
		gold: 0,
		durability: 0,
		health: 10,
		fear: 0
	};
var __endRow;
var __endCol;
var __maxPlayerHealth = 10;

//Open overlay
function openOverlay() {
	$("#mainOverlay").css("height", "65%");
};

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeOverlay() {
    $("#mainOverlay").css("height", "0%");
};


window.onload = function() {

//build map function
	var buildMap = function() {
//top left left: 60px, top: 95px bottom right top 175px, left 170px
		var getPlayerLeftPX = __currentPlayerCol * 27 + 60;
		var getPlayerTopPX = __currentPlayerRow * 20 + 95;
		$('#locationMarker').css( {
			position: "absolute",
			top: getPlayerTopPX + "px",
			left: getPlayerLeftPX + "px",
			width: "30px",
			height: "30px",
			display: "inline-block",
			"background-image": "url('./img/locationMarker.png')",
			"background-repeat": "no-repeat",
			"z-index": 4
		}).appendTo("#mapFull");
		var getPlayerLeftFog = 100 - __currentPlayerCol * 20 - 10;
		var getPlayerTopFog = 100 - __currentPlayerRow * 20 - 10;
		$("#mapFog").css("clip-path", "ellipse(" + getPlayerLeftFog + "% " + getPlayerTopFog + "% at 100% 99%");
		// //clear map
		// $("#mapElement").html("");
		// //for length of map,
		// for (i = 0; i < __map.length; i++) {
		// //create an element <h1>
		// var maph1 = $('<h1>');
		// //concat the values of __map[i] and make a new line
		// var mapInitial = __map[i].join("     ") + "\n";
		// //add the concated string to <h1>
		// $("#mapElement").append(maph1);
		// //append the <h1> to the map div
		// maph1.append(mapInitial);
		// };
	};

//change overlay content
	var changeOverlayContent = function(content) {
		$("#overlayContent").html("");
		$("#overlayContent").html(content);
	}

//creation of world events (which will run each time player enters new room)
	var exeWorldEvent = function() {
		var randomise = Math.floor(Math.random() * (worldEvent.length));
		//show event text on main display
		changeOverlayContent(findValue(worldEvent, randomise, "text"));
		//change background image STRANGE url address
		$("body").css("background-image", "url(" + worldEvent[randomise]["image"] + ")");
		//create button to move to next screen
		$("<button>").html("Next").attr("id", "nextButton").appendTo($("#overlayContent"));
		//update playerStatus with values from assets.js + show coloured border
		var changeAttribute = function() {
			__playerStatus.health = __playerStatus.health + findValue(worldEvent, randomise, "health");
			__playerStatus.durability = __playerStatus.durability + findValue(worldEvent, randomise, "durability");
			__playerStatus.fear = __playerStatus.fear + findValue(worldEvent, randomise, "fear");
			//find out what border type to display
			var borderType;
			if (findValue(worldEvent, randomise, "health") > 0) {
				borderType = "./img/yellowBorder.jpg";
				} else if (findValue(worldEvent, randomise, "health") < 0) {
					borderType = "./img/redBorder.jpg";
				} else if (findValue(worldEvent, randomise, "fear") > 0) {
					borderType = "./img/blackBorder.jpg";
				} else if (findValue(worldEvent, randomise, "durability") < 0) {
					borderType = "./img/blueBorder.jpg";
				};
			//show borderflash
			$("#colourBorder").css({"visibility": "visible",
									"background-image": "url('" + borderType + "')"
								});
			//show attribute change text (text2)
			changeOverlayContent(findValue(worldEvent, randomise, "text2"));
			};
		//add event listener to button
		$("#nextButton").click(changeAttribute);
	};

//get find corresponding value of key in each event
	var findValue = function(event, eventNumber, key) {
		for (var searchKey in event[eventNumber]) {
			if (searchKey === key) {
				return event[eventNumber][key];
			}
		}
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
		} else if (__currentPlayerRow === __endRow && __currentPlayerCol === __endCol) {
			//check if player has reached the exit
			gameEnd(reachedExit);
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
		exeWorldEvent();
		// //added a random encounter to determine what type of events happen
		// var roomRoll = Math.floor(Math.random() * 5 + 1)
		// if (roomRoll === 0) {
		// 	exeMoveEvent();
		// } else if (roomRoll <= 3) {
		// 	exeFightEvent();
		// } else {
		// 	exeWorldEvent();
		// }
	}

//things to execute when game ends
	var gameEnd = function(type) {
		if (type === "reachedExit") {
			alert("You have reached the exit!");
		} else if (type === "noHealth") {
			alert("You have died!");
		} else if (type === "maxFear") {
			alert("You are too scared to continue!")
		} else {
			//included as a error catch
			alert("There was an error! Please report this bug to a dev.");
		}
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
		__playerStatus["gold"] = 200;
		__playerStatus["durability"] = 10;
		__playerStatus["health"] = 10;
		__playerStatus["fear"] = 0;
		__maxPlayerHealth = 10;
		//create exit point
		__endRow = Math.floor((Math.random() * (__map.length - 1)) + 1);
		__endCol = Math.floor((Math.random() * (__map.length - 1)) + 1);
		//mark exit on variable __map
		__map[__endRow][__endCol] = "E";
		//mark exit on minimap
		var getPlayerLeftPX = __endCol * 27 + 60
		var getPlayerTopPX = __endRow * 20 + 95
		$('<div>').css( {
			position: "absolute",
			top: getPlayerTopPX + "px",
			left: getPlayerLeftPX + "px",
			width: "30px",
			height: "30px",
			id: "locationMarker",
			display: "inline-block",
			"background-image": "url('./img/exitMarker.png')",
			"background-repeat": "no-repeat",
			"z-index": 4
		}).appendTo("#mapFull");

		openOverlay();
		//create map
		buildMap();	
	}

	var buildHealth = function() {
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










//start the game!
gameStart();















};


//creating map array
var __map = [
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."], 
			[".", ".", ".", ".", "."]
		];

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
    document.getElementById("mainOverlay").style.height = "100%";
    console.log("opened")
};

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeOverlay() {
    document.getElementById("mainOverlay").style.height = "0%";
};



window.onload = function() {

//build map function
	var buildMap = function() {
		for (i = 0; i < __map.length; i++) {
		var maph1 = $('<h1>');
		var mapInitial = __map[i].join("     ") + "\n";
		$("#map").append(maph1);
		maph1.append(mapInitial);
		};
	};




	var gameStart = function () {
		//create map
		buildMap();
		//insert welcome text
		$("#overlayContent").append('<p>' + initialText + '<p>');
		//name input box
		$("#overlayContent").append("<input type='text' name='PlayerOne'>")
		//set current playerposition to 1-1
		__currentPlayerRow = 0;
		__currentPlayerCol = 0;
		console.log(__currentPlayerRow);
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

		
	}


gameStart();

















};


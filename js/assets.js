//Establishing encounters
var worldEvent = ["Homework assignment!" + "\n" + "Do you stay and complete or hide til class is over?" + "\n" + "(Input stay or hide)",
						"Lab work!" + "\n" + "Do you stay and complete or hide til class is over?" + "\n" + "(Input stay or hide)", 
						"Lecture!" + "\n" + "Do you stay and complete or hide til class is over?" + "\n" + "(Input stay or hide)"];
var fightEvent = ["You have encountered Akira!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)", 
						"You have encountered Nick!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)", 
						"You have encountered Ray!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)"];
var moveEvent = [" <p> Which direction would you like to move? </p> <button id='moveNorth'>North</button> <br><button id='moveWest'>West</button> &emsp; <button id='moveEast'>East</button> <br> <button id='moveSouth'>South</button>"];

//Text to display on game initialise
var initialText = "<p> Welcome to Path of ... ! To begin, type in your name! <p> <input id='playerNameInput' type='text' value='Player One'> <button id='submitPlayerName' type='submit'>Submit</button>"
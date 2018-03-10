//Establishing encounters
var statusQuestion = ["Homework assignment!" + "\n" + "Do you stay and complete or hide til class is over?" + "\n" + "(Input stay or hide)",
						"Lab work!" + "\n" + "Do you stay and complete or hide til class is over?" + "\n" + "(Input stay or hide)", 
						"Lecture!" + "\n" + "Do you stay and complete or hide til class is over?" + "\n" + "(Input stay or hide)"];
var fightQuestion = ["You have encountered Akira!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)", 
						"You have encountered Nick!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)", 
						"You have encountered Ray!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)"];
var moveQuestion = ["Which direction would you like to move?" + "\n" + "(Input n, s, e or w)"];


var initialText = "<p> Welcome to Path of ... ! To begin, type in your name! <p> <input id='playerNameInput' type='text' value='Player One'> <button id='submitPlayerName' type='submit'>Submit</button>"
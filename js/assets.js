

//Text to display on game initialise
var initialText = "<p> Welcome to Escape of Exiles! </p><p>Make your way through dangerous terrain and enemies to find the escape portal. </p><p> To begin your journey, type in your name... </p> <p> <input id='playerNameInput' type='text' value='Player One'> <button id='submitPlayerName' type='submit'>Submit</button></p>"

//Establishing encounters	
var worldEvent = [	{
						name: "poisonBog",
						text: "<p>Dreary and wearisome. Cold, clammy winter still held sway in this forsaken country. The only green was the scum of livid weed on the dark greasy surfaces of the sullen waters. Dead grasses and rotting reeds loomed up in the mists like ragged shadows of long forgotten summers. </p>",
						text2: "<p>The noxious vapours arising from the bog causes you to fall ill. Lose 1 health.</p>",
						image: "./img/gasBog.jpg",
						health: -1,
						durability: 0,
						fear: 0
					},
					{
						name: "hallOfStatues",
						text: "<p> The Argonath, also known as The Gates of Argonath or The Pillars of Kings, is a monument comprising two enormous statues carved in the likenesses of Isildur and Anárion, standing upon either side of the River Anduin at the northern entrance to Nen Hithoel. It marked the northern border of Gondor, as nearby down south were previous outposts, the Amon Hen and the Amon Lhaw. </p>",
						text2: "<p> While you silently admire the great statues, a ray of light comes down from the heavens. You gain 1 health.",
						image: "./img/hallOfStatues.jpg",
						health: 1,
						durability: 0,
						fear: 0
					},
					{
						name: "ruinsOfMidgaard",
						text: "<p>Osgiliath was the capital city of Gondor. During the War of the Ring, the abandoned city gained strategic importance as a crossing point over the Anduin, both for the Men of Gondor and Orcs of Mordor. Translated, it means, 'The Citadel of the Host of Stars' </p>",
						text2: "<p> Some loose rubble falls on you. You lose 1 durability. </p>",
						image: "./img/ruinsOfMidgaard.jpg",
						health: 0,
						durability: -1,
						fear: 0
					},
					{
						name: "shoresOfExile",
						text: "<p> The coast of Valinor, the Land across the Sea, was the realm of the Valar in Aman; the place to which they migrated after being driven from Almaren by Melkor in times before the First Age. It was also known as the Undying Lands as only immortal souls were allowed to reside there, with some exceptions when it came to the bearers of the One Ring; and additionally, even Gimli, who accompanied his friend Legolas to these lands. </p>",
						text2: "<p> The cold winds and dark shadows from beneath the waters strike fear into your heart. You gain 1 fear. </p>",
						image: "./img/shoresOfExile.jpg",
						health: 0,
						durability: 0,
						fear: 1
					}
				];


var fightEvent = ["You have encountered Akira!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)", 
						"You have encountered Nick!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)", 
						"You have encountered Ray!" + "\n" + "Do you fight or run away?" + "\n" + "(Input fight or run)"];
var moveEvent = [" <p> Which direction would you like to move? </p> <button id='moveNorth'>North</button> <br><button id='moveWest'>West</button> &emsp; <button id='moveEast'>East</button> <br> <button id='moveSouth'>South</button>"];
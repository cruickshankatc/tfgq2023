//-------------------SETUP-------------------//
//Merely gets the id for the empty <section> with the id "battleground"
let battleground = document.getElementById("battleground");

//Creates an array
let squareSpaces = []; 

//BOARD CREATION
/**
 * Creates divs, gives them a class name and adds these new divs with (class names) 
 * to the battleground section
 */
for (ii = 0; ii <= 458; ii++) {
	squareSpaces[ii] = document.createElement('div'); 
	squareSpaces[ii].className = "blankSpace"; 
	battleground.appendChild(squareSpaces[ii]);	
} 

//EDGE DETECTORS
/**
 * These arrays are used to detect the edges of the board.
 * They are used in the prompts (movePrompt(), firepowerPrompt(), etc.)
 * 
 * Makes sure a character isn't given avaliable "move/firepower spaces" that wrap
 * to the other side of the board.
 */
let rightEdges = [];
for (x = 0; x < 460; x+=27) {
	rightEdges.push(x);
}

let leftEdges = [];
for (x = -1; x < 459; x+=27) {
	leftEdges.push(x);
}

//CHARACTERS OBJECT
//Object containing all of the characters along with their stats
let theCharacters = [
	{
		name: "landmine",
		faction: "autobot",
		health: 10,
		firepower: 5,
		speed: 3,
		range: 5,
	},
	{
		name: "ransack",
		faction: "ransack",
		health: 5,
		firepower: 3,
		speed: 5,
		range: 5,
	},
	{
		name: "dunerunner",
		faction: "autobot",
		health: 5,
		firepower: 3,
		speed: 5,
		range: 7,
	},
	{
		name: "prowl",
		faction: "ransack",
		health: 10,
		firepower: 2,
		speed: 3,
		range: 6,
	},
	{
		name: "brainstorm",
		faction: "autobot",
		health: 10,
		firepower: 2,
		speed: 6,
		range: 8,
	},
	{
		name: "overcast",
		faction: "ransack",
		health: 10,
		firepower: 2,
		speed: 6,
		range: 8,
	},
	{
		name: "ironhide",
		faction: "autobot",
		health: 20,
		firepower: 3,
		speed: 3,
		range: 4,
	},
	{
		name: "onslaught",
		faction: "ransack",
		health: 30,
		firepower: 4,
		speed: 2,
		range: 4,
	},
	{
		name: "overhaul",
		faction: "autobot",
		health: 10,
		firepower: 3,
		speed: 5,
		range: 0,
	},
	{
		name: "crumplezone",
		faction: "ransack",
		health: 20,
		firepower: 2,
		speed: 5,
		range: 5,
	},
]

//FACTION PROPERTIES
/**
 * There are two factions split between the ten characters. Some properties such
 * as color1 and color2 will apply to everyone in a certain faction. Rather than
 * typing it out for each character I decided to add a loop.
 */
for (let i = 0; i < theCharacters.length; i++) {
	switch (theCharacters[i].faction) {
			case "autobot":
					theCharacters[i].color1 = "red";
					theCharacters[i].color2 = "pink";
					break;
			case "ransack":
					theCharacters[i].color1 = "#8CFF12";
					theCharacters[i].color2 = "#E6E39E";
					break;
			default:
					break;
	}
}




//-------------------CHARACTER INITIAL PLACEMENT----------------//
/**
 * Variable used to change characters after actions are complete. Works by cycling through
 * theCharacters[]. In use, it will look like "theCharacters[playerCounter]"
*/
let playerCounter = 0;

/**
 * Varaibles dealing with the placement of characters on the board
 */
let battleSquares = battleground.getElementsByTagName("div"); 
let FCS = 162;
let rowLength = 1323/battleSquares[1].offsetWidth;

/**
 * Variables used in firepowerAction() to create an array of all of the enemy targets
 * I have no idea why these variables are up in this secion. I probably just put them
 * here during testing and never got back to it.
 */
let enemyTarget = [];
let enemyCounter = 0;

/**Picks squares and alters their HTML to contain IDs of specific characters for the 
 * starting spaces.
 * 
 * Normally all 'autobots' would be to the left and all 'ransacks' to the right, but
 * some of them have been moved for testing purposes, such as to easily test the 
 * firepower feature.
 * 
 * The commented out code is for the character's usual placement
 */
//AUTOBOTS
battleSquares[174].outerHTML = "<div id='" + theCharacters[0].name + "Space' class='charSpace'></div>";
battleSquares[56 /*FCS + rowLength*/].outerHTML = "<div id='" + theCharacters[2].name + "Space' class='charSpace'></div>";
battleSquares[82 /*FCS + rowLength*2*/].outerHTML = "<div id='" + theCharacters[4].name + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*3].outerHTML = "<div id='" + theCharacters[6].name + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*4].outerHTML = "<div id='" + theCharacters[8].name + "Space' class='charSpace'></div>";

//RANSACKS
battleSquares[FCS + (rowLength - 1)].outerHTML = "<div id='" + theCharacters[1].name + "Space' class='charSpace'></div>";
battleSquares[177 /*FCS + (rowLength*2 - 1)*/].outerHTML = "<div id='" + theCharacters[3].name + "Space' class='charSpace'></div>";
battleSquares[178 /*FCS + (rowLength*3 - 1)*/].outerHTML = "<div id='" + theCharacters[5].name + "Space' class='charSpace'></div>";
battleSquares[179 /*FCS + (rowLength*4 - 1)*/].outerHTML = "<div id='" + theCharacters[7].name + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*5 - 1)].outerHTML = "<div id='" + theCharacters[9].name + "Space' class='charSpace'></div>";




//-----------------------CURRENT PLAYER------------------//
//Current Spaces
function changeBgColor(obj, colorName) {
	obj.style.backgroundColor = colorName;
	} 

let displayChanges = function() {
	/**
	 * Changes the display name at the bottom to that of the current character
	 * Also alters the color to match the faction
	 */
	document.getElementById('displayName').outerHTML = "<h1 id='displayName' style='color:" + theCharacters[playerCounter].color1 + "; font-size:300%;'></h1>";
	document.getElementById('displayName').innerHTML = capFirst(theCharacters[playerCounter].name); 

	//Caps the name of the character
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	//Makes sure "eliminated" characters are skipped
	if (theCharacters[playerCounter].health === 0) {
		playerCounterUpdate();
		displayChanges();
	}
}
displayChanges();






//--------------------PROMPTS-------------------//
/**
 * These "prompt" functions create the spaces that can be clicked by the player to
 * initiate "actions"
 * Regular spaces are altered and turned into "click spaces".
 * Both functions account for collisons with 1) character icons 2) edge spaces.
 * Plan to combine these two prompts (and future prompts) into a single class as 
 * there is so much shared code.
 * */


let referenceSpace;
let referenceSpeed;

//MOVEMENT PROMPT
function movePrompt(direction) {
	//Find the space of the current Character 
	let currentCharacter = theCharacters.find(character => character.name === theCharacters[playerCounter].name);

	//Gets the "battleSquare" index of the current character
	let currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === theCharacters[playerCounter].name + 'Space');
	
	referenceSpace = 0;

	//Set the referenceSpeed to the speed of the currentCharacter
	referenceSpeed = currentCharacter.speed -1;

	//Sets the referenceSpace and ifConditions variables for the different directions
	for (y = 1; y <= currentCharacter.speed; y++) 	
	{
		let ifCondition;

		switch (direction) {
			case "up":
				referenceSpace = currentCharacterIndex - 27 * y;
				ifCondition = (referenceSpace <= -1);
				break;
			case "right":
				referenceSpace = currentCharacterIndex + y;
				ifCondition = (rightEdges.find(edge => edge == (referenceSpace)));
				break;
			case "down":
				referenceSpace = currentCharacterIndex + 27*y;
				ifCondition = (referenceSpace >= 459);
				break;
			case "left":
				referenceSpace = currentCharacterIndex - y;
				ifCondition = (leftEdges.find(edge => edge == (referenceSpace)));
				break;
			default:
				// Handle default case if necessary
				break;
		}

	//Check for edge collisions	
		if (ifCondition)
			{ 	
				break;
			}

		//Check for charSpace (other character icons) collisions		
	if (battleSquares[referenceSpace].classList.contains("charSpace")) {
	//		createBetweenSpaces(direction);
			referenceSpeed--;
			continue; 
		}

		//Alters the HTML of blankSpaces turning them into "clickSpaces"
			battleSquares[referenceSpace].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + theCharacters[playerCounter].color1 +"`)' onmouseout='changeBgColor(this, `" + theCharacters[playerCounter].color2 +"`)'' onclick='moveAction(" + (referenceSpace) + ")'' style='background-color:" + theCharacters[playerCounter].color2 + ";'></div>";
		
	//	createBetweenSpaces(direction);	
		referenceSpeed--;
	}
}

/**
 * Creates spaces between the basic "up", "right", "down" and "left" paths
 * CURRENTLY NOT WORKING
 */

/*
function createBetweenSpaces(direction) {
	let betweenSpace = 0;
	let ifCondition2 = 0;
	for (speedLoop = 0; speedLoop <= referenceSpeed; speedLoop++) {
		
		switch (direction) {
    case "up":
        betweenSpace = referenceSpace + speedLoop;
        ifCondition2 = (rightEdges.find(edge => edge == (betweenSpace)));
        break;
			case "right":
				betweenSpace = referenceSpace + 27*speedLoop;
				ifCondition2 = (betweenSpace >= 459);
				break;
			case "down":
				betweenSpace = referenceSpace - speedLoop;
				ifCondition2 = (leftEdges.find(edge => edge == (betweenSpace))); 
				break;
			case "left":
				betweenSpace = referenceSpace - 27*speedLoop;
				ifCondition2 = (betweenSpace <= -1);
				break;
			default:
				// Handle default case if necessary
				break;
		}

			if (ifCondition2)
			{ 	
					continue;
			} 
			if (battleSquares[betweenSpace].classList.contains("charSpace")) {					
					continue; 
				}
		battleSquares[betweenSpace].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + theCharacters[playerCounter].color1 +"`)' onmouseout='changeBgColor(this, `" + theCharacters[playerCounter].color2 +"`)'' onclick='moveAction(" + (betweenSpace) + ")'' style='background-color:" + theCharacters[playerCounter].color2 + ";'></div>";
	}
}
*/

function movePrompt2() {
	movePrompt("up");
	movePrompt("right");
	movePrompt("down");
	movePrompt("left");
}

//FIREPOWER PROMPT
/**
 * Most of this code is the same is the movePrompt
 */
function createFirepower(direction) {
	let currentCharacter = theCharacters.find(character => character.name === theCharacters[playerCounter].name);
	let currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === theCharacters[playerCounter].name + 'Space');
	referenceSpace = 0;

	//ReferenceSpeed is equal to the character's range rather than their speed
	referenceSpeed = currentCharacter.range -1;

	for (y = 1; y <= currentCharacter.range; y++) 	
	{
		let ifCondition;

		switch (direction) {
			case "up":
				referenceSpace = currentCharacterIndex - 27 * y;
				ifCondition = (referenceSpace <= -1);
				break;
			case "right":
				referenceSpace = currentCharacterIndex + y;
				ifCondition = (rightEdges.find(edge => edge == (referenceSpace)));
				break;
			case "down":
				referenceSpace = currentCharacterIndex + 27*y;
				ifCondition = (referenceSpace >= 459);
				break;
			case "left":
				referenceSpace = currentCharacterIndex - y;
				ifCondition = (leftEdges.find(edge => edge == (referenceSpace)));
				break;
			default:
				// Handle default case if necessary
				break;
		}
	if (ifCondition)
	{ 	
			break;
	} 
	if (battleSquares[referenceSpace].classList.contains("charSpace")) {
	//		createBetweenSpaces(direction);
			//Enemy icons within the character's "range" glow and are clickable
			let referenceSpace2 = referenceSpace;
			enemyTarget.push(battleSquares[referenceSpace]);
			enemyTarget[enemyCounter].onclick = () => firepowerAction(referenceSpace2);

			//Class is added to enemy icon which gives them glow effect
			enemyTarget[enemyCounter].classList.add("enemyTarget");
			enemyCounter++;
			referenceSpeed--;
			continue; 
		}
		
	//	createBetweenSpaces(direction);	
		referenceSpeed--;
	}
}

function firepowerPrompt() {
	createFirepower("up");
	createFirepower("right");
	createFirepower("down");
	createFirepower("left");
}



//--------------------PROMPTS-------------------//
let zzz = [];

//MOVEMENT ACTION
/**
 * When a space is clicked (from the activation during the move prompt), the
 * character's face is moved to that clicked space.
 * This function was done a while ago. I didn't get around to replacing the for
 * loops with array methods yet
 */
let moveAction = function(x) {
	for (a = 0; a <= 9; a++) {		
		zzz[a] = Array.from(battleSquares).findIndex(x => x.id === theCharacters[
		a].name + 'Space');
	} 
	let y = document.getElementsByClassName('clickSpace');
	for (let z = y.length - 1; z >= 0; --z) {
		y[z].outerHTML = "<div class='blankSpace'></div>";
	}

	document.getElementById(theCharacters[playerCounter].name + "Space").outerHTML = "<div class='blankSpace'></div>";	
	battleSquares[x].outerHTML = "<div id='" + theCharacters[playerCounter].name + "Space' class='charSpace'></div>";		

	playerCounterUpdate();
	displayChanges();
}


let enemyTargetX;
let enemyTargetY;

function firepowerAction(zz) {
	/**
	 * Turns all the highlighted "click spaces" back into regular gray spaces.
	 */
	//Create variable to store any element with the className "clickSpaces"
	let clickSpaces = Array.from(document.getElementsByClassName('clickSpace'));

	//Returns each clickSpace to a regular gray space.
	clickSpaces.forEach(clickSpace => clickSpace.outerHTML = "<div class='blankSpace'></div>");


	/**
	 * Matches the enemyTarget with the corresponding object in theCharacters[]
	 * I.e. 
	 */
	enemyTargetX = Array.from(battleSquares);
	enemyTargetY = enemyTargetX[zz];
	let enemyTarget2 = theCharacters.find((character) => character.name === enemyTargetY.id.replace("Space", ""));

	/**
	 * Reduce the enemy's health
	 */
	enemyTarget2.health-= theCharacters[playerCounter].firepower;
	console.log(theCharacters[playerCounter].firepower);
	console.log(theCharacters[playerCounter].name);

	if (enemyTarget2.health <= 0) {
		enemyTargetY.outerHTML = "<div class='blankSpace'></div>";
		enemyTarget2.health = 0;
	}

	enemyTarget.forEach(item => item.classList.remove("enemyTarget"));

	/**
	 * Simply performs the move to the next character
	 * These two actions (increasing the "k" variable and altering the displayName) would normally
	 * be performed in moveAction()
	 */
	playerCounterUpdate();

	document.getElementById('displayName').innerHTML = capFirst(theCharacters[playerCounter].name);
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	displayChanges();

	enemyTarget = [];
	enemyCounter = 0;

} 


function playerCounterUpdate() {
	if (playerCounter >= 9) {
		playerCounter = 0;
	} else {
		playerCounter++;
	}
}





/*-------------------FUTURE TASKS (IN NO PARTICULAR ORDER)----------------------*/
//firepowerPrompt() shouldn't make targets out of people of the same faction
//Add the inBetweenSpaces
//Add a meleePrompt

//CARDS
/**
 * Cards on the left and right side of the board will feature the current character 
 * (for the waiting team the next character to go will be featured).
 * Also, the health of the everyone on the team will be featured (less prominently)
 */

//FACTIONS
/**
 * In total there's going to be 3 selectable factions (consisting of 5 characters)
 * Only 2 factions play per game
 * At the beginning there is a menu and the player can select the 2 teams
 */



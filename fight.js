//-------------------SETUP-------------------//
//Merely gets the id for the empty <section> with the id "battleground"
let battleground = document.getElementById("battleground");

//Creates an array
let squareSpaces = []; 

/**
 * Creates divs, gives them a class name and adds these new divs with (class names) 
 * to the battleground section
 */
for (ii = 0; ii <= 458; ii++) {
	squareSpaces[ii] = document.createElement('div'); 
	squareSpaces[ii].className = "blankSpace"; 
	battleground.appendChild(squareSpaces[ii]);	
} 

//Object containing all of the characters along with their stats
let theCharacters = [
	{
		name: "landmine",
		health: 10,
		firepower: 2,
		speed: 3,
	},
	{
		name: "ransack",
		health: 5,
		firepower: 3,
		speed: 5,
	},
	{
		name: "dunerunner",
		health: 5,
		firepower: 3,
		speed: 5,
	},
	{
		name: "prowl",
		health: 10,
		firepower: 2,
		speed: 3,
	},
	{
		name: "brainstorm",
		health: 10,
		firepower: 2,
		speed: 6,
	},
	{
		name: "overcast",
		health: 10,
		firepower: 2,
		speed: 6,
	},
	{
		name: "ironhide",
		health: 20,
		firepower: 3,
		speed: 3,
	},
	{
		name: "onslaught",
		health: 30,
		firepower: 4,
		speed: 2,
	},
	{
		name: "overhaul",
		health: 10,
		firepower: 0,
		speed: 5,
	},
	{
		name: "crumplezone",
		health: 20,
		firepower: 2,
		speed: 5,
	},
]






//-------------------CHARACTER INITIAL PLACEMENT----------------//



let playerCounter = 0;

//Character Spaces
let battleSquares = battleground.getElementsByTagName("div"); /*Grabs all of the divs within the body. You could also say it grabs all of the squares*/
let CurrCharSpace = 0;
let FCS = 162;
let rowLength = 1323/battleSquares[1].offsetWidth;
let enemyTarget = [];
let enemyCounter = 0;

//Picks squares and alters their HTML to contain IDs of specific characters for the starting spaces
battleSquares[174].outerHTML = "<div id='" + theCharacters[0].name + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength].outerHTML = "<div id='" + theCharacters[2].name + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*2].outerHTML = "<div id='" + theCharacters[4].name + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*3].outerHTML = "<div id='" + theCharacters[6].name + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*4].outerHTML = "<div id='" + theCharacters[8].name + "Space' class='charSpace'></div>";
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

//Name Display
let teamColor;
let teamColor2;

let displayChanges = function() {
	teamColor = 'red';
	teamColor2 = 'pink';
	if (playerCounter === 0 || playerCounter === 2 || playerCounter === 4 || playerCounter === 6 || playerCounter === 8) {
		teamColor = 'red';
		teamColor2 = 'pink';
	} else if (playerCounter === 1 || playerCounter === 3 || playerCounter === 5 || playerCounter === 7 || playerCounter === 9) {
		teamColor = 'yellowGreen';
		teamColor2 = 'yellow';
		}
	document.getElementById('displayName').outerHTML = "<h1 id='displayName' style='color:" + teamColor + "; font-size:300%;'></h1>"; /*Changes the color of the title of the active character*/
	document.getElementById('displayName').innerHTML = capFirst(theCharacters[playerCounter].name); /*Writes the name of the active character*/
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	if (theCharacters[playerCounter].health === 0) {
		playerCounterUpdate();
		displayChanges();
	}
}
displayChanges();


















//--------------------MOVEMENTS-------------------//
//MOVEMENT PROMPT


//The functions that take place upon clicking the buttons at the bottom of the screen
//The move prompt activates certain spaces for movement. It alters the HTML of spaces surrounding the theCharacters[] so that they become clickable spaces which contain the moveAction() 

let rightEdges = [];
for (x = 0; x < 460; x+=27) {
	rightEdges.push(x);
}

let leftEdges = [];
for (x = -1; x < 459; x+=27) {
	leftEdges.push(x);
}


let referenceSpeed;
let referenceSpace;
function createSpaces(direction) {
	let currentCharacter = theCharacters.find(character => character.name === theCharacters[playerCounter].name);
	let currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === theCharacters[playerCounter].name + 'Space');
	referenceSpeed = currentCharacter.speed -1;

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
	if (ifCondition)
	{ 	
			
			break;
	} 
	if (battleSquares[referenceSpace].classList.contains("charSpace")) {
			referenceSpeed--;
			createBetweenSpaces(direction);
			continue; 
		}
			battleSquares[referenceSpace].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'' onclick='moveAction(" + (referenceSpace) + ")'' style='background-color:" + teamColor2 + ";'></div>";
		
		createBetweenSpaces(direction);	
		referenceSpeed--;
	}
}

function createBetweenSpaces(direction) {
	for (speedLoop = 0; speedLoop <= referenceSpeed; speedLoop++) {
		let betweenSpace;

		switch (direction) {
			case "up":
				betweenSpace = referenceSpace + speedLoop;
				break;
			case "right":
				betweenSpace = referenceSpace + 27*speedLoop;
				break;
			case "down":
				betweenSpace = referenceSpace - speedLoop;
				break;
			case "left":
				betweenSpace = referenceSpace - 27*speedLoop;
				break;
			default:
				// Handle default case if necessary
				break;
		}
//NEED A SEPERATE IF STATEMENT FOR EACH BECAUSE SOME IF'S CANCEL THE WAY THE OTHER ONES WORK
			if ((rightEdges.find(edge => edge == (betweenSpace))) || (leftEdges.find(edge => edge == (betweenSpace - 1))) || betweenSpace <= -1 || betweenSpace >= 459)
			{ 	
					break;
			} 
			if (battleSquares[betweenSpace].classList.contains("charSpace")) {
					
					continue; 
				}
		battleSquares[betweenSpace].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'' onclick='moveAction(" + (betweenSpace) + ")'' style='background-color:" + teamColor2 + ";'></div>";
	}
}

function movePrompt() {
	createSpaces("up");
	createSpaces("right");
	createSpaces("down");
	createSpaces("left");
	
}











	let zzz = [];
//MOVEMENT ACTION
let moveAction = function(x) {
	for (a = 0; a <= 9; a++) {		
		zzz[a] = Array.from(battleSquares).findIndex(x => x.id === theCharacters[
		a].name + 'Space');
	} 
	let y = document.getElementsByClassName('clickSpace');
	for (let z = y.length - 1; z >= 0; --z) {
		y[z].outerHTML = "<div class='blankSpace'></div>";
	}
/*	for (c = 0; c <=9; c++) {
		battleSquares[c].outerHTML = "<div id='" + theCharacters[c].name + "Space' class='charSpace'></div>";
	} */
	if (playerCounter < 1) {
		document.getElementById(theCharacters[0].name + "Space").outerHTML = "<div class='blankSpace'></div>";	
		battleSquares[x].outerHTML = "<div id='" + theCharacters[0].name + "Space' class='charSpace'></div>";
	} else {
		document.getElementById(theCharacters[playerCounter].name + "Space").outerHTML = "<div class='blankSpace'></div>";	
		battleSquares[x].outerHTML = "<div id='" + theCharacters[playerCounter].name + "Space' class='charSpace'></div>";		
	}
	playerCounterUpdate();

	document.getElementById('displayName').innerHTML = capFirst(theCharacters[playerCounter].name);
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	displayChanges();

}







//EDITING STARTS NOW

/*----------------FIREPOWER-----------------*/
let firepowerPrompt = function() {
	let currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === theCharacters[playerCounter].name + 'Space');
	//Up Movements
	for (a = 1; a <= 6; a++) {
	if ((currentCharacterIndex - 27*a) <= -1)
	{ 	
		break;
	} 
	if (battleSquares[currentCharacterIndex - 27*a].className == "charSpace") {

			break;
		}
		battleSquares[currentCharacterIndex - 27*a].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'' onclick='moveAction(" + (currentCharacterIndex - 27*a) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}
		
	//Right Movements
	for (b = 1; b <= 6; b++) {
		if ((rightEdges.find(edge => edge == (currentCharacterIndex + b)))) 
		{
			break;
		} 	
		if (battleSquares[currentCharacterIndex + b].className == "charSpace") {
			let bb = b;
			enemyTarget.push(battleSquares[currentCharacterIndex + b]);
			enemyTarget[enemyCounter].onclick = () => prowlDies(currentCharacterIndex + bb);
			enemyTarget[enemyCounter].classList.add("enemyTarget");
			enemyCounter++;
			continue;
		}
		battleSquares[currentCharacterIndex + b].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (currentCharacterIndex + b) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}

	//Down Movements
	for (c = 1; c <= 6; c++) {
		if ((currentCharacterIndex + 27*c) >= 459)
		{		
			break;
		} 
		if (battleSquares[currentCharacterIndex + 27*c].className == "charSpace") {
			break
		} 
		battleSquares[currentCharacterIndex + 27*c].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (currentCharacterIndex + 27*c) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}
	
	//Left Movements
	for (d = 1; d <= 6; d++) {			
		if ((leftEdges.find(edge => edge == (currentCharacterIndex - d))))
		{
			break;
		} 	
		if (battleSquares[currentCharacterIndex - d].className == "charSpace") {
			break;
		} 		
		battleSquares[currentCharacterIndex - d].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (currentCharacterIndex - d) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}	
}











let meleePrompt = function() {
	
}

let reloadPrompt = function() {
	
}

let ultimatePrompt = function() {
	
}













let rsHealth = 1;
let enemyTargetX;
let enemyTargetY;

function prowlDies(zz) {
	/**
	 * Turns all the highlighted "click spaces" back into regular gray spaces.
	 */
	//Create variable to store any element with the className "clickSpaces"
	let clickSpaces = Array.from(document.getElementsByClassName('clickSpace'));

	//Returns each clickSpace to a regular gray space.
	clickSpaces.forEach(clickSpace => clickSpace.outerHTML = "<div class='blankSpace'></div>");

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
	enemyTarget2.health-= 40;

	if (enemyTarget2.health <= 0) {
		enemyTargetY.outerHTML = "<div class='blankSpace'></div>";
		console.log("Prowl has died.");
		enemyTarget2.health = 0;
	}

	enemyTarget.forEach(item => item.classList.remove("enemyTarget"));

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





















/* CODE FOR DELETION*/
/* CODE FOR DELETION*/
/* CODE FOR DELETION*/
/* CODE FOR DELETION*/
/* CODE FOR DELETION*/
/* CODE FOR DELETION*/
/* CODE FOR DELETION*/
/* CODE FOR DELETION*/
/* CODE FOR DELETION*/



let movePrompt2 = function() {
	let currentCharacter = theCharacters.find(character => character.name === theCharacters[playerCounter].name);
	let currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === theCharacters[playerCounter].name + 'Space');

	//Up Movements
	referenceSpeed = currentCharacter.speed -1;
	for (a = 1; a <= currentCharacter.speed; a++) 	
	{
		let referenceSpace = currentCharacterIndex - 27*a;
		if ((currentCharacterIndex - 27*a) <= -1)
	{ 	
		break;
	} 
	if (battleSquares[currentCharacterIndex - 27*a].classList.contains("charSpace")) {
			referenceSpeed--;
			continue; 
		}
			battleSquares[currentCharacterIndex - 27*a].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'' onclick='moveAction(" + (currentCharacterIndex - 27*a) + ")'' style='background-color:" + teamColor2 + ";'></div>";

		for (x = 0; x <= referenceSpeed; x++) {
				if ((rightEdges.find(edge => edge == (referenceSpace + x))))
				{ 	
					continue;
				} 
				if (battleSquares[referenceSpace + x].classList.contains("charSpace")) {
						referenceSpeed--;	
						continue; 
					}
			battleSquares[referenceSpace + x].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'' onclick='moveAction(" + (referenceSpace + x) + ")'' style='background-color:" + teamColor2 + ";'></div>";
		}

		referenceSpeed--;
	}

	//Right Movements
	referenceSpeed = currentCharacter.speed -1;
	for (b = 1; b <= currentCharacter.speed; b++) 
	{
		let referenceSpace = currentCharacterIndex + b;
		if ((rightEdges.find(edge => edge == (currentCharacterIndex + b))))
	{
		break;
	} 	
		if (battleSquares[currentCharacterIndex + b].classList.contains("charSpace")) {
			referenceSpeed--;
			continue;
		}
		battleSquares[currentCharacterIndex + b].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (currentCharacterIndex + b) + ")'' style='background-color:" + teamColor2 + ";'></div>";

		for (x = 0; x <= referenceSpeed; x++) {
			if ((rightEdges.find(edge => edge == (referenceSpace + 27*x))))
			{ 	
				break;
			} 
			if (battleSquares[referenceSpace + 27*x].classList.contains("charSpace")) {
					referenceSpeed--;
					continue; 
				}
		battleSquares[referenceSpace + 27*x].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'' onclick='moveAction(" + (referenceSpace + 27*x) + ")'' style='background-color:" + teamColor2 + ";'></div>";
	}

	referenceSpeed--;
	}

	//Down Movements
	for (c = 1; c <= currentCharacter.speed; c++) {
		if ((currentCharacterIndex + 27*c) >= 459)
		{		
			break;
		} 
		if (battleSquares[currentCharacterIndex + 27*c].className == "charSpace") {
			continue;
		} 
		battleSquares[currentCharacterIndex + 27*c].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (currentCharacterIndex + 27*c) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}
	
	//Left Movements
	for (d = 1; d <= currentCharacter.speed; d++) {			
		if ((leftEdges.find(edge => edge == (currentCharacterIndex - d))))
		{
			break;
		} 	
		if (battleSquares[currentCharacterIndex - d].className == "charSpace") {
			continue;
		} 		
		battleSquares[currentCharacterIndex - d].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (currentCharacterIndex - d) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}	
}

/*
//Numbers in the characterSpace Array are assigned to the outerHTML of the character spaces
characterSpace[0] = battleSquares[FCS].outerHTML;
characterSpace[1] = battleSquares[FCS + (rowLength - 1)].outerHTML;
characterSpace[2] = battleSquares[FCS + rowLength].outerHTML;
characterSpace[3] = battleSquares[FCS + (rowLength*2 - 1)].outerHTML;
characterSpace[4] = battleSquares[FCS + rowLength*2].outerHTML;
characterSpace[5] = battleSquares[FCS + (rowLength*3 - 1)].outerHTML;
characterSpace[6] = battleSquares[FCS + rowLength*3].outerHTML;
characterSpace[7] = battleSquares[FCS + (rowLength*4 - 1)].outerHTML;
characterSpace[8] = battleSquares[FCS + rowLength*4].outerHTML
characterSpace[9] = battleSquares[FCS + (rowLength*5 - 1)].outerHTML;
*/
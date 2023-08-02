//-------------------SETUP-------------------//
//Merely gets the id for the empty <section> with the id "battleground"
var battleground = document.getElementById("battleground");

//Creates an array
var squareSpaces = []; 

//This loop creates divs, gives them a class name and adds these new divs with (class names) to the battleground section
for (ii = 0; ii <= 458; ii++) {
	squareSpaces[ii] = document.createElement('div'); 
	squareSpaces[ii].className = "blankSpace"; 
	battleground.appendChild(squareSpaces[ii]);	
} 

//Object containing all of the characters along with their stats
let theCharacters = [
	{
		name: "landmine",
		health: 1,
	},
	{
		name: "ransack",
		health: 1,
	},
	{
		name: "dunerunner",
		health: 1,
	},
	{
		name: "prowl",
		health: 1,
	},
	{
		name: "brainstorm",
		health: 1,
	},
	{
		name: "overcast",
		health: 1,
	},
	{
		name: "ironhide",
		health: 1,
	},
	{
		name: "onslaught",
		health: 1,
	},
	{
		name: "overhaul",
		health: 1,
	},
	{
		name: "crumplezone",
		health: 1,
	},
]






//-------------------CHARACTER INITIAL PLACEMENT----------------//
var currentPlayer = ["landmine", "ransack", "dunerunner", "prowl", "brainstorm", "overcast", "ironhide", "onslaught", "overhaul", "crumplezone"];

//Merely creates the array that will establish the starting space of each character
var characterSpace = [];

var k = 0;

//Character Spaces
var battleSquares = battleground.getElementsByTagName("div"); /*Grabs all of the divs within the body. You could also say it grabs all of the squares*/
var CurrCharSpace = 0;
var FCS = 162;
var rowLength = 1323/battleSquares[1].offsetWidth;
let enemyTarget;

//Picks squares and alters their HTML to contain IDs of specific characters for the starting spaces
battleSquares[174].outerHTML = "<div id='" + currentPlayer[0] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength].outerHTML = "<div id='" + currentPlayer[2] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*2].outerHTML = "<div id='" + currentPlayer[4] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*3].outerHTML = "<div id='" + currentPlayer[6] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*4].outerHTML = "<div id='" + currentPlayer[8] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength - 1)].outerHTML = "<div id='" + currentPlayer[1] + "Space' class='charSpace'></div>";
battleSquares[177 /*FCS + (rowLength*2 - 1)*/].outerHTML = "<div id='" + currentPlayer[3] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*3 - 1)].outerHTML = "<div id='" + currentPlayer[5] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*4 - 1)].outerHTML = "<div id='" + currentPlayer[7] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*5 - 1)].outerHTML = "<div id='" + currentPlayer[9] + "Space' class='charSpace'></div>";

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












//-----------------------CURRENT PLAYER------------------//
//Current Spaces
function changeBgColor(obj, colorName) {
	obj.style.backgroundColor = colorName;
	} 

//Name Display
var teamColor;
var teamColor2;

var displayChanges = function() {
	teamColor = 'red';
	teamColor2 = 'pink';
	if (k === 0 || k === 2 || k === 4 || k === 6 || k === 8) {
		teamColor = 'red';
		teamColor2 = 'pink';
	} else if (k === 1 || k === 3 || k === 5 || k === 7 || k === 9) {
		teamColor = 'yellowGreen';
		teamColor2 = 'yellow';
		}
	document.getElementById('displayName').outerHTML = "<h1 id='displayName' style='color:" + teamColor + "; font-size:300%;'></h1>"; /*Changes the color of the title of the active character*/
	document.getElementById('displayName').innerHTML = capFirst(currentPlayer[k]); /*Writes the name of the active character*/
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	if (theCharacters[k].health === 0) {
		if (k >= 9) {
			k = 0;
		} else {
			k++;
		}
		displayChanges();
	}
}
displayChanges();


















//--------------------MOVEMENTS-------------------//
//MOVEMENT PROMPT


//The functions that take place upon clicking the buttons at the bottom of the screen
//The move prompt activates certain spaces for movement. It alters the HTML of spaces surrounding the currentPlayer[] so that they become clickable spaces which contain the moveAction() 

let rightEdges = [];
for (x = 0; x < 460; x+=27) {
	rightEdges.push(x);
}

let leftEdges = [];
for (x = -1; x < 459; x+=27) {
	leftEdges.push(x);
}



var movePrompt = function() {
	var currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === currentPlayer[k] + 'Space');

	//Up Movements
	for (a = 1; a <= 6/*this will be changed to character's speed number*/; a++) {
	if ((currentCharacterIndex - 27*a) <= -1)
	{ 	
		break;
	} 
	if (battleSquares[currentCharacterIndex - 27*a].className == "charSpace") {
			break /*Breaks the move prompt highlight path if there is another character (another character face) in the way*/
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
			break;
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





	var zzz = [];
//MOVEMENT ACTION
var moveAction = function(x) {
	for (a = 0; a <= 9; a++) {		
		zzz[a] = Array.from(battleSquares).findIndex(x => x.id === currentPlayer[
		a] + 'Space');
	} 
	var y = document.getElementsByClassName('clickSpace');
	for (var z = y.length - 1; z >= 0; --z) {
		y[z].outerHTML = "<div class='blankSpace'></div>";
	}
/*	for (c = 0; c <=9; c++) {
		battleSquares[c].outerHTML = "<div id='" + currentPlayer[c] + "Space' class='charSpace'></div>";
	} */
	if (k < 1) {
		document.getElementById(currentPlayer[0] + "Space").outerHTML = "<div class='blankSpace'></div>";	
		battleSquares[x].outerHTML = "<div id='" + currentPlayer[0] + "Space' class='charSpace'></div>";
	} else {
		document.getElementById(currentPlayer[k] + "Space").outerHTML = "<div class='blankSpace'></div>";	
		battleSquares[x].outerHTML = "<div id='" + currentPlayer[k] + "Space' class='charSpace'></div>";		
	}
	if (k >= 9) {
		k = 0;
	} else {
		k++;
	}
	document.getElementById('displayName').innerHTML = capFirst(currentPlayer[k]);
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	displayChanges();

}









/*----------------FIREPOWER-----------------*/
var firepowerPrompt = function() {
	var currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === currentPlayer[k] + 'Space');
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
			enemyTarget = battleSquares[currentCharacterIndex + b];
			enemyTarget.onclick = prowlDies;
			enemyTarget.classList.add("enemyTarget");
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











var meleePrompt = function() {
	
}

var reloadPrompt = function() {
	
}

var ultimatePrompt = function() {
	
}













let rsHealth = 1;

function prowlDies() {
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
	if (k >= 9) {
		k = 0;
	} else {
		k++;
	}

	document.getElementById('displayName').innerHTML = capFirst(currentPlayer[k]);
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	/**
	 * Matches the enemyTarget with the corresponding object in theCharacters[]
	 * I.e. 
	 */
	let enemyTarget2 = theCharacters.find((character) => character.name === enemyTarget.id.replace("Space", ""));

	/**
	 * Reduce the enemy's health
	 */
	enemyTarget2.health--;

	if (enemyTarget2.health == 0) {
		enemyTarget.outerHTML = "<div class='blankSpace'></div>";
		console.log("Prowl has died.");
	}

	displayChanges();
} 
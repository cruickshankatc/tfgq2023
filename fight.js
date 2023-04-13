//SETUP
//Creating the board
var battleground = document.getElementById("battleground");
var squareSpaces = [];
for (ii = 0; ii <= 458; ii++) {
	squareSpaces[ii] = document.createElement('div');
	squareSpaces[ii].className = "blankSpace";
	battleground.appendChild(squareSpaces[ii]);	
}

//Characters
var currentPlayer = ["landmine", "ransack", "dunerunner", "prowl", "brainstorm", "overcast", "ironhide", "onslaught", "overhaul", "crumplezone"];
var characterSpace = ["landmine", "ransack", "dunerunner", "prowl", "brainstorm", "overcast", "ironhide", "onslaught", "overhaul", "crumplezone"];
var k = 0;

//Character Spaces
var battleSquares = battleground.getElementsByTagName("div");
var CurrCharSpace = 0;
var FCS = 162;
var rowLength = 27;
battleSquares[FCS].outerHTML = "<div id='" + currentPlayer[0] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength - 1)].outerHTML = "<div id='" + currentPlayer[1] + "Space'></div>";
battleSquares[FCS + rowLength].outerHTML = "<div id='" + currentPlayer[2] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*2 - 1)].outerHTML = "<div id='" + currentPlayer[3] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*2].outerHTML = "<div id='" + currentPlayer[4] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*3 - 1)].outerHTML = "<div id='" + currentPlayer[5] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*3].outerHTML = "<div id='" + currentPlayer[6] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*4 - 1)].outerHTML = "<div id='" + currentPlayer[7] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*4].outerHTML = "<div id='" + currentPlayer[8] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength*5 - 1)].outerHTML = "<div id='" + currentPlayer[9] + "Space' class='charSpace'></div>";


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

//CURRENT PLAYER
//Name Display
var teamColor;
var teamColor2;

var displayChanges = function() {
	teamColor = 'red';
	teamColor2 = 'pink';
	if (k === 0 || k === 2 || k === 4 || k === 6 || k === 8) {
		teamColor = 'red';
	} else if (k === 1 || k === 3 || k === 5 || k === 7 || k === 9) {
		teamColor = 'yellowGreen';
		}
	document.getElementById('displayName').outerHTML = "<h1 id='displayName' style='color:" + teamColor + "; font-size:300%;'></h1>";
	document.getElementById('displayName').innerHTML = capFirst(currentPlayer[k]);
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
displayChanges();

//CHARACTER OBJECT
function Character (health, strength, speed, firepower, range, clipSize) {
	this.health = health;
	this.strength = strength;
	this.speed = speed;
	this.firepower = firepower;
	this.range = range;
	this.clipSize = clipSize;
}

let overhaul = new Character (15, 5, 9, 0, 0, 0);
let overcast = new Character (15, 2, 5, 6, 5, 2);

//CHANGING SPACES
//Initial Spaces
function changeBgColor(obj, colorName) {
	obj.style.backgroundColor = colorName;
	} 


//PROMPTS
var movePrompt = function() {
	var CC = Array.from(battleSquares).findIndex(x => x.id === currentPlayer[k] + 'Space');
	//Up Movements
	for (a = 1; a <= 6/*this will be changed to character's speed number*/; a++) {
	if ((CC - a) <= -1){ 
		break;
	} if (battleSquares[CC - 27*a].className == "charSpace") {
			break
		}
		battleSquares[CC - 27*a].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'></div>"
	}
		
	//Right Movements
	for (b = 1; b <= 6; b++) {
		if ((CC + b) == 27 || 
			(CC + b) == 54 ||
			(CC + b) == 81 ||
			(CC + b) == 108 || 
			(CC + b) == 135 ||
			(CC + b) == 162 ||
			(CC + b) == 189 || 
			(CC + b) == 216 ||
			(CC + b) == 243 ||
			(CC + b) == 270 ||
			(CC + b) == 297 || 
			(CC + b) == 324 ||
			(CC + b) == 351 ||
			(CC + b) == 379 || 
			(CC + b) == 405 ||
			(CC + b) == 432 ||
			(CC + b) == 459) 
		{
			break;
		} 	
		if (battleSquares[CC + b].className == "charSpace") {
			break
		}
		battleSquares[CC + b].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (CC + b) + ")'></div>"
	}

	//Down Movements
	for (c = 1; c <= 6; c++) {
		if ((CC + 27*c) >= 433) {
			break;
		}
		if (battleSquares[CC + 27*c].className == "charSpace") {
			break
		}
		battleSquares[CC + 27*c].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'></div>"
	}
	
	//Left Movements
	for (d = 1; d <= 6; d++) {	
		if (battleSquares[CC - d].className == "charSpace") {
			break
		} 				
		if ((CC + d) <= 163) {
			break;
		}
		battleSquares[CC - d].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (CC + d) + ")'></div>"
	}	
}

var meleePrompt = function() {
	
}

var firepowerPrompt = function() {
	
}

var reloadPrompt = function() {
	
}

var ultimatePrompt = function() {
	
}


	var zzz = [];
//ACTIONS
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

	k++;
	document.getElementById('displayName').innerHTML = capFirst(currentPlayer[k]);
	function capFirst(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	
}

var playerMoves = function() {
	var CG = battleground.getElementsByTagName("div");
	for (j = 0; j <= 98; j++) {
		CG[j].outerHTML = `<div id='F` + j + `'` + `onclick='overhaulMoves("F` + j + `"` + `)' onmouseover="changeBgColor(this, '` + teamColor2 + `')" onmouseout="changeBgColor(this, 'white')"></div>`
	}
}

//Movements
var spaceDiv;
var replaceSpacez = document.getElementById('landmine');

var overhaulMoves = function(x) {
	document.getElementById(currentPlayer[k] + 'Space').outerHTML = preCharSpace[k];
	spaceDiv = document.getElementById(x);
	spaceDiv.style.backgroundColor = "white";
	preCharSpace[k] = spaceDiv.outerHTML;
	var BG = battleground.getElementsByTagName("div");
	BG[x].outerHTML = `<div id="` + currentPlayer[k] + `Space"></div>`;
		if (k < 9) {
			k++;
		} else {
			k = 0;
		}
	displayChanges();
	}


//BUTTON FUNCTIONS
overhaulButton0 = document.getElementById("overhaul");
overhaulButton = overhaulButton0.getElementsByTagName("button");
overcastButton0 = document.getElementById("overcast");
overcastButton = overcastButton0.getElementsByTagName("button");

var overhaulButtonsOn = function() {
	for (var buttonNum = 0; buttonNum < overhaulButton.length; buttonNum++) {
		overhaulButton[buttonNum].disabled = 0;
	}
	
	overhaulButton[1].disabled = true;
}

var overhaulButtonsOff = function() {
	for (var buttonNum = 0; buttonNum < overhaulButton.length; buttonNum++) {
		overhaulButton[buttonNum].disabled = 1;
	}
}

var overcastButtonsOn = function() {
	for (var buttonNum = 0; buttonNum < overcastButton.length; buttonNum++) {
		overcastButton[buttonNum].disabled = 0;
	}
}

var overcastButtonsOff = function() {
	for (var buttonNum = 0; buttonNum < overcastButton.length; buttonNum++) {
		overcastButton[buttonNum].disabled = 1;
	}
}

//CHARACTER HEALTH
	document.getElementById("overhaulHealth").innerHTML = String(overhaul.health);
	document.getElementById("overcastHealth").innerHTML = String(overcast.health);

//OVERHAUL MELEE
let meleeOverhaul = function() {
	let overcastHealth = document.getElementById("overcastHealth").innerHTML;
	let overcastHealth2 = parseInt(overcastHealth);
	overcastHealth2 = overcastHealth2 - overhaul.strength;
	let overcastHealth3
	overcastHealth3 = String(overcastHealth2);
	document.getElementById("overcastHealth").innerHTML = overcastHealth3;
	overhaulButtonsOff();
	overcastButtonsOn();
	
	if (overcastHealth3 <= "0") {
	overhaulButtonsOff();
	overcastButtonsOff();
	document.getElementById("endMessage").innerHTML = "<span>Play Again?</span><button onclick='playAgain()'>Yes</button><button>No</button>"
	}
}

//OVERCAST MELEE
let meleeOvercast = function() {
	let overhaulHealth = document.getElementById("overhaulHealth").innerHTML;
	let overhaulHealth2 = parseInt(overhaulHealth);
	let overhaulHealth3
	overhaulHealth2 = overhaulHealth2 - overcast.strength;
	overhaulHealth3 = String(overhaulHealth2);
	document.getElementById("overhaulHealth").innerHTML = overhaulHealth3;
	overhaulButtonsOn();
	overcastButtonsOff();
	
	if (overhaulHealth3 <= "0") {
	overhaulHealth3 = "0";
	document.getElementById("overhaulHealth").innerHTML = overhaulHealth3;
	overhaulButtonsOff();
	overcastButtonsOff();
	document.getElementById("endMessage").innerHTML = "<span>Play Again?</span><button onclick='playAgain()'>Yes</button><button>No</button>"
	}
}

//OVERCAST MELEE
let firepowerOvercast = function() {
	let overhaulHealth = document.getElementById("overhaulHealth").innerHTML;
	let overhaulHealth2 = parseInt(overhaulHealth);
	let overhaulHealth3
	overhaulHealth2 = overhaulHealth2 - overcast.firepower;
	overhaulHealth3 = String(overhaulHealth2);
	document.getElementById("overhaulHealth").innerHTML = overhaulHealth3;
	overhaulButtonsOn();
	overcastButtonsOff();
	
	if (overhaulHealth3 <= "0") {
	overhaulHealth3 = "0";
	document.getElementById("overhaulHealth").innerHTML = overhaulHealth3;
	overhaulButtonsOff();
	overcastButtonsOff();
	document.getElementById("endMessage").innerHTML = "<span>Play Again?</span><button onclick='playAgain()'>Yes</button><button>No</button>"
	}
}

//PLAY AGAIN
let playAgain = function() {
	document.getElementById("endMessage").innerHTML = null;
	overhaulButtonsOff();
	overcastButtonsOn();
	document.getElementById("overhaulHealth").innerHTML = String(overhaul.health);
	document.getElementById("overcastHealth").innerHTML = String(overcast.health);
}
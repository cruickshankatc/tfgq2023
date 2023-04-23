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

//Picks squares and alters their HTML to contain IDs of specific characters for the starting spaces
battleSquares[FCS].outerHTML = "<div id='" + currentPlayer[0] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength].outerHTML = "<div id='" + currentPlayer[2] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*2].outerHTML = "<div id='" + currentPlayer[4] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*3].outerHTML = "<div id='" + currentPlayer[6] + "Space' class='charSpace'></div>";
battleSquares[FCS + rowLength*4].outerHTML = "<div id='" + currentPlayer[8] + "Space' class='charSpace'></div>";
battleSquares[FCS + (rowLength - 1)].outerHTML = "<div id='" + currentPlayer[1] + "Space'></div>";
battleSquares[FCS + (rowLength*2 - 1)].outerHTML = "<div id='" + currentPlayer[3] + "Space' class='charSpace'></div>";
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
}
displayChanges();


















//--------------------PROMPTS-------------------//
//The functions that take place upon clicking the buttons at the bottom of the screen



//The move prompt activates certain spaces for movement. It alters the HTML of spaces surrounding the currentPlayer[] so that they become clickable spaces which contain the moveAction() 
var movePrompt = function() {
	var CC = Array.from(battleSquares).findIndex(x => x.id === currentPlayer[k] + 'Space');
	//Up Movements
	for (a = 1; a <= 6/*this will be changed to character's speed number*/; a++) {
	if ((CC - a) <= -1){ 
		break;
	} if (battleSquares[CC - 27*a].className == "charSpace") {
			break /*Breaks the move prompt highlight path if there is another character (another character face) in the way*/
		}
		battleSquares[CC - 27*a].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)'' onclick='moveAction(" + (CC - 27*a) + ")'' style='background-color:" + teamColor2 + ";'></div>"
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
			break;
		}
		battleSquares[CC + b].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (CC + b) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}

	//Down Movements
	for (c = 1; c <= 6; c++) {
		if ((CC + 27*c) == 432 || 
			(CC + c) == 433 ||
			(CC + c) == 434 ||
			(CC + c) == 435 || 
			(CC + c) == 436 ||
			(CC + c) == 437 ||
			(CC + c) == 438 || 
			(CC + c) == 439 ||
			(CC + c) == 440 ||
			(CC + c) == 441 ||
			(CC + c) == 442 || 
			(CC + c) == 443 ||
			(CC + c) == 444 ||
			(CC + c) == 445 || 
			(CC + c) == 446 ||
			(CC + c) == 447 ||
			(CC + c) == 448 ||
			(CC + c) == 449 ||
			(CC + c) == 450 ||
			(CC + c) == 451 ||
			(CC + c) == 452 || 
			(CC + c) == 453 ||
			(CC + c) == 454 ||
			(CC + c) == 455 || 
			(CC + c) == 456 ||
			(CC + c) == 457 ||
			(CC + c) == 458)
		{
			break;
		} 
		if (battleSquares[CC + 27*c].className == "charSpace") {
			break
		}
		battleSquares[CC + 27*c].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (CC + 27*c) + ")'' style='background-color:" + teamColor2 + ";'></div>"
	}
	
	//Left Movements
	for (d = 1; d <= 6; d++) {			
		if ((CC - d) == 26 || 
			(CC - d) == 53 ||
			(CC - d) == 80 ||
			(CC - d) == 107 || 
			(CC - d) == 134 ||
			(CC - d) == 161 ||
			(CC - d) == 188 || 
			(CC - d) == 215 ||
			(CC - d) == 242 ||
			(CC - d) == 269 ||
			(CC - d) == 296 || 
			(CC - d) == 323 ||
			(CC - d) == 350 ||
			(CC - d) == 378 || 
			(CC - d) == 404 ||
			(CC - d) == 431 ||
			(CC - d) == 458) 
		{
			break;
		} 	
		if (battleSquares[CC - d].className == "charSpace") {
			break;
		} 		
		battleSquares[CC - d].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + teamColor +"`)' onmouseout='changeBgColor(this, `" + teamColor2 +"`)' onclick='moveAction(" + (CC - d) + ")'' style='background-color:" + teamColor2 + ";'></div>"
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

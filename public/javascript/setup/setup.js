//-------------------SETUP-------------------//
//Merely gets the id for the empty <section> with the id "battleground"
let battleground = document.getElementById("battleground");
let cardCharacter;
let cardCharacter2;
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
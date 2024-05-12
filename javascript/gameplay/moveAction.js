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
	cardUpdate1();
	cardUpdate2();
}
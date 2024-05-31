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
	if (theCharacters[playerCounter].currentHealth === 0) {
		playerCounterUpdate();
		displayChanges();
	}
}


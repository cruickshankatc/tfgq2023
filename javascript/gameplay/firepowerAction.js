function firepowerAction(xz) {
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
	enemyTargetY = enemyTargetX[xz];
	let enemyTarget2 = theCharacters.find((character) => character.name === enemyTargetY.id.replace("Space", ""));

	/**
	 * Reduce the enemy's health
	 */
	enemyTarget2.currentHealth-= theCharacters[playerCounter].firepower;
	console.log(theCharacters[playerCounter].firepower);
	console.log(theCharacters[playerCounter].name);

	if (enemyTarget2.currentHealth <= 0) {
		enemyTargetY.outerHTML = "<div class='blankSpace'></div>";
		enemyTarget2.currentHealth = 0;
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
	cardUpdate1();
	cardUpdate2();

	enemyTarget = [];
	enemyCounter = 0;

} 
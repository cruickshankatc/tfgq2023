/**
 * More functions will go here. This will be used to neatly deploy
 * functions. Work in Progress.
 */
characterPlacement();

function playerCounterUpdate() {
	if (playerCounter >= 9) {
		playerCounter = 0;
	} else {
		playerCounter++;
	}
}
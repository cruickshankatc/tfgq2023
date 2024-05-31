function colorSetting() {
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
				case "decepticon":
						theCharacters[i].color1 = "purple";
						theCharacters[i].color2 = "#b06fd3";
						break;
				default:
						break;
		}
	}
}
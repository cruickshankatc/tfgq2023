//MOVEMENT PROMPT
function movePrompt(direction) {
	enemyTarget.forEach(item => item.classList.remove("enemyTarget"));
	
	//Find the space of the current Character 
	let currentCharacter = theCharacters.find(character => character.name === theCharacters[playerCounter].name);

	//Gets the "battleSquare" index of the current character
	let currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === theCharacters[playerCounter].name + 'Space');
	
	referenceSpace = 0;

	//Set the referenceSpeed to the speed of the currentCharacter
	referenceSpeed = currentCharacter.speed -1;
	//Sets the referenceSpace and ifConditions variables for the different directions
	for (y = 1; y <= currentCharacter.speed; y++) 	
	{
		let ifCondition;

		switch (direction) {
			case "up":
				referenceSpace = currentCharacterIndex - 27 * y;
				ifCondition = (referenceSpace <= -1);
				for (zz = 1; zz <= referenceSpeed; zz++) {
					if (((referenceSpace + zz) <= -1)) {
						break;
					}

					if (rightEdges.find(edge => edge == (referenceSpace + zz))) {
						console.log(betweenSpaces);
						break;
					}

					betweenSpaces.push(referenceSpace + zz);
					console.log(betweenSpaces);
				}
				break;

			case "right":
				referenceSpace = currentCharacterIndex + y;
				ifCondition = (rightEdges.find(edge => edge == (referenceSpace)));
				for (zz = 1; zz <= referenceSpeed; zz++) {
					if (rightEdges.find(edge => edge == (referenceSpace + 27*zz))) {
						console.log("jimmy")
						console.log(betweenSpaces)
						break;
					}

					if ((referenceSpace + 27*zz) >= 459) {
						break;
					}

					betweenSpaces.push(referenceSpace + 27*zz);
					console.log(betweenSpaces);
				}
				break;

			case "down":
				referenceSpace = currentCharacterIndex + 27*y;
				ifCondition = (referenceSpace >= 459);
				for (zz = 1; zz <= referenceSpeed; zz++) {
					// if ((referenceSpace + zz) >= 459) {
					// 	break;
					// }

					// if (leftEdges.find(edge => edge == (referenceSpace - 27*zz))) {
					// 	console.log(betweenSpaces)
					// 	break;
					// }

					betweenSpaces.push(referenceSpace - zz);
					console.log(betweenSpaces);
				}
				break;

			case "left":
				referenceSpace = currentCharacterIndex - y;
				ifCondition = (leftEdges.find(edge => edge == (referenceSpace)));
				for (zz = 1; zz <= referenceSpeed; zz++) {					
					// if (leftEdges.find(edge => edge == (referenceSpace - zz))) {
					// 	console.log(betweenSpaces)
					// 	break;
					// }
					
					if (((referenceSpace - 27*zz) <= -1)) {
						break;
					}
					
					betweenSpaces.push(referenceSpace - 27*zz);
					console.log(betweenSpaces);
				}
				break;

			default:
				// Handle default case if necessary
				break;
		}

	//Check for edge collisions	
		if (ifCondition)
			{ 	
				betweenSpaces.length = 0;
				break;
			}

	//Check for charSpace (other character icons) collisions		
	if (battleSquares[referenceSpace].classList.contains("charSpace")) {
		if (betweenSpaces.length > 0) {
			for (z = 0; z < referenceSpeed; z++) {
				if (rightEdges.find(edge => edge == (betweenSpaces[z]))) {
					betweenSpaces.length = 0;
					break;
				}

				if ((betweenSpaces[z] <= -1)) {
					betweenSpaces.length = 0;
					break;
				}

				if (battleSquares[betweenSpaces[z]].classList.contains("charSpace")) {
					continue;
				}

				battleSquares[betweenSpaces[z]].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + theCharacters[playerCounter].color1 +"`)' onmouseout='changeBgColor(this, `" + theCharacters[playerCounter].color2 +"`)'' onclick='moveAction(" + (betweenSpaces[z]) + ")'' style='background-color:" + theCharacters[playerCounter].color2 + ";'></div>";
			}
		}

			referenceSpeed--;
			betweenSpaces.length = 0;
			continue; 
		}

		//Alters the HTML of blankSpaces turning them into "clickSpaces"
			battleSquares[referenceSpace].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + theCharacters[playerCounter].color1 +"`)' onmouseout='changeBgColor(this, `" + theCharacters[playerCounter].color2 +"`)'' onclick='moveAction(" + (referenceSpace) + ")'' style='background-color:" + theCharacters[playerCounter].color2 + ";'></div>";


			if (betweenSpaces.length > 0) {
			for (z = 0; z < betweenSpaces.length; z++) {
				
				if (battleSquares[betweenSpaces[z]].classList.contains("charSpace")) {
					continue;
				}
				
				battleSquares[betweenSpaces[z]].outerHTML = "<div class='clickSpace' onmouseover='changeBgColor(this, `" + theCharacters[playerCounter].color1 +"`)' onmouseout='changeBgColor(this, `" + theCharacters[playerCounter].color2 +"`)'' onclick='moveAction(" + (betweenSpaces[z]) + ")'' style='background-color:" + theCharacters[playerCounter].color2 + ";'></div>";
			}
		}
		
	//	createBetweenSpaces(direction);	
		referenceSpeed--;
		betweenSpaces.length = 0;
	}
}

function movePrompt2() {
	movePrompt("up");
	movePrompt("right");
	movePrompt("down");
	movePrompt("left");
}
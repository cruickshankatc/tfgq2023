//FIREPOWER PROMPT
/**
 * Most of this code is the same is the movePrompt
 */
function createFirepower(direction) {
	let jj = document.getElementsByClassName('clickSpace');
	for (let z = jj.length - 1; z >= 0; --z) {
		jj[z].outerHTML = "<div class='blankSpace'></div>";
	}

	//Find the space of the current Character 
	let currentCharacter = theCharacters.find(character => character.name === theCharacters[playerCounter].name);

	//Gets the "battleSquare" index of the current character
	let currentCharacterIndex = Array.from(battleSquares).findIndex(x => x.id === theCharacters[playerCounter].name + 'Space');
	
	referenceSpace = 0;

	//Set the referenceSpeed to the speed of the currentCharacter
	referenceSpeed = currentCharacter.range -1;
	//Sets the referenceSpace and ifConditions variables for the different directions
	for (y = 1; y <= currentCharacter.range; y++) 	
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

    if (ifCondition)
    { 	
        break;
    } 

		if (betweenSpaces.length > 0) {
			for (z = 0; z < betweenSpaces.length; z++) {
				console.log("JIMMY!!!!!!!!!!!!!!!")
				console.log(betweenSpaces[z])

				if (rightEdges.find(edge => edge == (betweenSpaces[z]))) {
					betweenSpaces.length = 0;
					break;
				} if ((betweenSpaces[z] <= -1)) {
						betweenSpaces.length = 0;
						break;
				} if ((betweenSpaces[z] >= 459)) {
						betweenSpaces.length = 0;
						break;
				}

				
				if (battleSquares[betweenSpaces[z]].classList.contains("charSpace")) {
					let referenceSpace2 = betweenSpaces[z];
					console.log(battleSquares[betweenSpaces[z]]);
					enemyTarget.push(battleSquares[betweenSpaces[z]]);
					enemyTarget[enemyCounter].onclick = () => firepowerAction(referenceSpace2);

		
					//Class is added to enemy icon which gives them glow effect
					enemyTarget[enemyCounter].classList.add("enemyTarget");
					enemyCounter++;
					referenceSpeed--;
					continue; 

				} 
			}
		}

    if (battleSquares[referenceSpace].classList.contains("charSpace")) {

		  //createBetweenSpaces(direction);
          //Enemy icons within the character's "range" glow and are clickable
          let referenceSpace2 = referenceSpace;
					console.log(battleSquares[referenceSpace]);
          enemyTarget.push(battleSquares[referenceSpace]);
          enemyTarget[enemyCounter].onclick = () => firepowerAction(referenceSpace2);

    
          //Class is added to enemy icon which gives them glow effect
          enemyTarget[enemyCounter].classList.add("enemyTarget");
          enemyCounter++;
          referenceSpeed--;
          continue; 
        }

    /**
     * HERE'S WHERE
     * THE SEPARATE 
     * FUNCTIONS GO
     * MOVE
     * FIREPOWER
     * MELEE
     * ULTIMATE
     */

  //	createBetweenSpaces(direction);	
		referenceSpeed--;
		betweenSpaces.length = 0;
  }
}

function firepowerPrompt() {
	createFirepower("up");
	createFirepower("right");
	createFirepower("down");
	createFirepower("left");
}
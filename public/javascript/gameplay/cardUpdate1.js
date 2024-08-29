function cardUpdate1 () {
	let card1 = document.getElementById("stats1");
	if (playerCounter === 0 || playerCounter % 2 === 0) {
		cardCharacter = playerCounter;
		card1.classList.remove("waiting");
	} else {
		card1.classList.add("waiting");
	}
	
	let health1 = document.getElementById("health1");
	let ultimate1 = document.getElementById("ultimate1");
	let firepower1 = document.getElementById("firepower1");
	let speed1 = document.getElementById("speed1");
	let range1 = document.getElementById("range1");
	
	console.log(cardCharacter);
	document.getElementById("name1").innerHTML = theCharacters[cardCharacter].name;
	let cardImage = document.getElementById("card1").querySelector("img");
	cardImage.src = "images/cards/" + theCharacters[cardCharacter].name +".png";


	while (health1.firstChild) {
    health1.removeChild(health1.firstChild);
	}

	while (ultimate1.firstChild) {
    ultimate1.removeChild(ultimate1.firstChild);
	}
	
	while (firepower1.firstChild) {
    firepower1.removeChild(firepower1.firstChild);
	}

	while (speed1.firstChild) {
    speed1.removeChild(speed1.firstChild);
	}

	while (range1.firstChild) {
    range1.removeChild(range1.firstChild);
	}


	for (x = 0; x < theCharacters[cardCharacter].health; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter].currentHealth) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		health1.appendChild(square);
	}

	for (x = 0; x < theCharacters[cardCharacter].ultimate; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter].currentUltimate) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		ultimate1.appendChild(square);
	}

	for (x = 0; x < 10; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter].firepower) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		firepower1.appendChild(square);
	}

	
	for (x = 0; x < 10; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter].speed) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		speed1.appendChild(square);
	}

	for (x = 0; x < 10; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter].range) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		range1.appendChild(square);
	}
}
function cardUpdate2 () {
	let card2 = document.getElementById("stats2");
	if (playerCounter === 0) {
		cardCharacter2 = 1;
		card2.classList.add("waiting");
	} else if (playerCounter % 2 !== 0) {
		cardCharacter2 = playerCounter;
		card2.classList.remove("waiting");
	} else {
		card2.classList.add("waiting");
	}

	let health2 = document.getElementById("health2");
	let ultimate2 = document.getElementById("ultimate2");
	let firepower2 = document.getElementById("firepower2");
	let speed2 = document.getElementById("speed2");
	let range2 = document.getElementById("range2");

	document.getElementById("name2").innerHTML = theCharacters[cardCharacter2].name;
	let cardImage = document.getElementById("card2").querySelector("img");
	cardImage.src = "images/cards/" + theCharacters[cardCharacter2].name +".png";


	while (health2.firstChild) {
    health2.removeChild(health2.firstChild);
	}

	while (ultimate2.firstChild) {
    ultimate2.removeChild(ultimate2.firstChild);
	}
	
	while (firepower2.firstChild) {
    firepower2.removeChild(firepower2.firstChild);
	}

	while (speed2.firstChild) {
    speed2.removeChild(speed2.firstChild);
	}

	while (range2.firstChild) {
    range2.removeChild(range2.firstChild);
	}


	for (x = 0; x < theCharacters[cardCharacter2].health; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter2].currentHealth) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		health2.appendChild(square);
	}

	for (x = 0; x < theCharacters[cardCharacter2].ultimate; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter2].currentUltimate) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		ultimate2.appendChild(square);
	}

	for (x = 0; x < 10; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter2].firepower) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		firepower2.appendChild(square);
	}

	
	for (x = 0; x < 10; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter2].speed) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		speed2.appendChild(square);
	}

	for (x = 0; x < 10; x++) {
		let square = document.createElement("div");
		if (x < theCharacters[cardCharacter2].range) {
			square.classList.add("fullHealth");
		} else {
			square.classList.add("emptyHealth");
		}
		range2.appendChild(square);
	}
}
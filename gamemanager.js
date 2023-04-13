//OVERHAUL MELEE
let meleeOverhaul = function() {
//OVERCAST HEALTH NUMBER IS GRABBED AND TURNED FROM STRING TO NUMBER
	let overcastHealth = document.getElementById("overcastHealth").innerHTML;
	let overcastHealth2 = parseInt(overcastHealth);
	
//OVERCAST HEALTH IS REDUCED BY OVERHAUL'S MELEE STRENGTH
	overcastHealth2 = overcastHealth2 - overhaul.strength;
	let overcastHealth3

//OVERCAST NEW HEALTH IS CONVERTED INTO A STRING AND PUT IN HTML
	overcastHealth3 = String(overcastHealth2);
	document.getElementById("overcastHealth").innerHTML = overcastHealth3;

//SWITCH THE BUTTONS FOR OVERHAUL MOVE
	overhaulButtonsOff();
	overcastButtonsOn();

//CHECK FOR GAME OVER	
	if (overcastHealth3 <= "0") {
	overhaulButtonsOff();
	overcastButtonsOff();
	document.getElementById("endMessage").innerHTML = "<span>Play Again?</span><button onclick='playAgain()'>Yes</button><button>No</button>"
	}
}
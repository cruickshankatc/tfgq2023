let team1;
let team2;

function setFaction(faction) {
    theCharacters = [];
    switch (faction) {
        case "autobot":
        console.log("autobot");
        team1 = autobots;
        team2 = decepticons;
        console.log(team1);
        break;

        case "decepticon":
        console.log("decepticon");
        break;

        case "ransack":
        console.log("ransack");
        break;
    }

    let team1Num = 0;
    let team2Num = 0;

    for (x = 0; x < 10; x++) {
        if ((x === 0) || (x % 2 === 0)) {
            theCharacters[x] = team1[team1Num];
            team1Num++
        } else if (x % 2 !== 0) {
            theCharacters[x] = team2[team2Num];
            team2Num++
        }
    }

    colorSetting();
    displayChanges();
    cardUpdate1();
    cardUpdate2();
    characterPlacement();
    factionToGame();
}


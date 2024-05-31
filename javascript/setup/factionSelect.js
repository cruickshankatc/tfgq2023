let team1;
let team2;

function setFaction(faction) {
    theCharacters = [];
    setFaction2(faction);
}

function setFaction2(faction) {
    let setTeam;

    switch (faction) {
        case "autobot":
        setTeam = autobots;
        break;

        case "decepticon":
        setTeam = decepticons;
        break;

        case "ransack":
        setTeam = ransacks;
        break;
    }

    if (team1 == undefined) {
        team1 = setTeam;
    } else if (team1 != undefined) {
        team2 = setTeam;
        gameInit();
    }
}

function gameInit() {
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
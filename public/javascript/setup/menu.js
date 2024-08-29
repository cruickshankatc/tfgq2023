let titleScreen = document.getElementById("titleScreen");
let mainMenu = document.getElementById("mainMenu");
let modeSelect = document.getElementById("modeSelect");
let factionSelect = document.getElementById("factionSelect");
let gameBoard = document.getElementById("gameBoard");

function titleToMenu() {
    titleScreen.style.display = "none";
    mainMenu.style.display = "flex"
}

function menuToMode() {
    mainMenu.style.display = "none";
    modeSelect.style.display = "flex";
}

function modeToFaction() {
    modeSelect.style.display = "none";
    factionSelect.style.display = "flex";
}

function factionToGame() {
    factionSelect.style.display = "none";
    gameBoard.style.display = "flex";
}

function testMode() {
    titleScreen.style.display = "none";
    mainMenu.style.display = "none";
    modeSelect.style.display = "none";
    factionSelect.style.display = "none";
    gameBoard.style.display = "flex";
}

//testMode();
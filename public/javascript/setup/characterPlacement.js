//-------------------CHARACTER INITIAL PLACEMENT----------------//
/**
 * Variable used to change characters after actions are complete. Works by cycling through
 * theCharacters[]. In use, it will look like "theCharacters[playerCounter]"
*/
let playerCounter = 0;

/**
 * Varaibles dealing with the placement of characters on the board
 */
let battleSquares = battleground.getElementsByTagName("div"); 
let FCS = 162;
let rowLength = 1323/battleSquares[1].offsetWidth;

/**
 * Variables used in firepowerAction() to create an array of all of the enemy targets
 * I have no idea why these variables are up in this secion. I probably just put them
 * here during testing and never got back to it.
 */
let enemyTarget = [];
let enemyCounter = 0;


function characterPlacement() {
    /**Picks squares and alters their HTML to contain IDs of specific characters for the 
     * starting spaces.
     * 
     * Normally all 'autobots' would be to the left and all 'ransacks' to the right, but
     * some of them have been moved for testing purposes, such as to easily test the 
     * firepower feature.
     * 
     * The commented out code is for the character's usual placement
     */
    //AUTOBOTS
    battleSquares[374].outerHTML = "<div id='" + theCharacters[0].name + "Space' class='charSpace'></div>";
    battleSquares[356/*FCS + rowLength*/].outerHTML = "<div id='" + theCharacters[2].name + "Space' class='charSpace'></div>";
    battleSquares[292 /*FCS + rowLength*2*/].outerHTML = "<div id='" + theCharacters[4].name + "Space' class='charSpace'></div>";
    battleSquares[300].outerHTML = "<div id='" + theCharacters[6].name + "Space' class='charSpace'></div>";
    battleSquares[290].outerHTML = "<div id='" + theCharacters[8].name + "Space' class='charSpace'></div>";

    //RANSACKS
    battleSquares[266].outerHTML = "<div id='" + theCharacters[1].name + "Space' class='charSpace'></div>";
    battleSquares[377 /*FCS + (rowLength*2 - 1)*/].outerHTML = "<div id='" + theCharacters[3].name + "Space' class='charSpace'></div>";
    battleSquares[178 /*FCS + (rowLength*3 - 1)*/].outerHTML = "<div id='" + theCharacters[5].name + "Space' class='charSpace'></div>";
    battleSquares[267 + (5*27) -4 /*FCS + (rowLength*4 - 1)*/].outerHTML = "<div id='" + theCharacters[7].name + "Space' class='charSpace'></div>";
    battleSquares[450].outerHTML = "<div id='" + theCharacters[9].name + "Space' class='charSpace'></div>";
    console.log("Crumplezone");
}
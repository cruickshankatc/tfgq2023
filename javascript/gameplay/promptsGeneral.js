//--------------------PROMPTS-------------------//
/**
 * These "prompt" functions create the spaces that can be clicked by the player to
 * initiate "actions"
 * Regular spaces are altered and turned into "click spaces".
 * Both functions account for collisons with 1) character icons 2) edge spaces.
 * Plan to combine these two prompts (and future prompts) into a single class as 
 * there is so much shared code.
 * */


let referenceSpace;
let referenceSpeed;
let zzz = [];
let enemyTargetX;
let enemyTargetY;

betweenSpaces = [];


// import '../css/styles.css';
const createStore = require('./create-store.js');
const createCharStore =  require('./create-char-store');
const readline = require('readline');
const seconds =  require('./seconds.js');
var colors = require('colors');

(() => {


  const units = createCharStore();
  const badGuys = createCharStore();

// heros().createChar('wiz')(5);
// badguys().createChar('orcs')(5);
// heros().showState();
// console.log(heros().showState());


  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const responseAnimation = async (dots) => {
    await seconds(0.4);
    rl.write('.'.black.bgWhite);
    if (dots > 0) {
      return responseAnimation( dots - 1) ;
    }
  };

  const question = async () => {

    const getRand = () => Math.floor(Math.random() * 6 + 1);

    const ask = (input) => new Promise((resolve) => {
      rl.question(input.black.bgWhite, (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });

    const unit = ["wizards" , "knights" , "thieves"];
    const badGuy = ["orcs", "trolls", "goblins", "dragons", "hobgoblins", "skeletons"];
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const response = await ask('\nPick Your Unit: '.black.bgWhite);

    // good -u
    const addUnits = units().createChar(response);
    await seconds(.5);
    rl.write(`The Dice are rolling young ${response}`.black.bgWhite);
    const roll = getRand();
    await responseAnimation(roll + 3);
    rl.write(`\nYour roll is ${dice[roll - 1].red}`.black.bgWhite + ` ${roll}`.black.bgWhite);

    // add -u
    addUnits(roll);
    await seconds(.5);

    // display -u
    Object.entries(units().showState()).forEach(([unit,values]) => {
      rl.write(`\nUnits: ${unit}, Current Amount: ${values}\n`);
    });

    // bad turn
    const randomBadGuy = badGuy[getRand()];
    const addBaddies = units().createChar(randomBadGuy);
    await seconds(.5);
    rl.write(`The ${randomBadGuy} is attacking`.black.bgWhite);
    const badRoll = getRand();
    addBaddies(badRoll);
    await responseAnimation(badRoll + 3);
    rl.write(`\nTheir roll is ${dice[badRoll - 1].red}`.black.bgWhite + ` ${roll}`.black.bgWhite);

    // add -b
    badGuys(badRoll);

    // win conditionals
    if (roll > badRoll) rl.write(
      `\nThe ${response} have defeated the ${randomBadGuy}!\n`.black.bgWhite
    );

    else if (roll == badRoll) rl.write(
      `\nIts A Draw, You Save Your Arm ${response}`
    );

    else rl.write(
      `\nOh no! The ${randomBadGuy} defeated the ${response}!\n`.black.bgWhite
    );

    return question();
  };
  // start
  question();

})();







// import '../css/styles.css';
const createStore = require('./create-store.js');
const createCharStore =  require('./create-char-store');
const readline = require('readline');
const seconds =  require('./seconds.js');
var colors = require('colors');

(() => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const responseAnimation = async (dots) => {
    for (let i = 0; i < dots; i++)
    {
      await seconds(0.4);
      rl.write('.'.black.bgWhite);
    }
  };

  const question = async () => {

    const getRand = () => Math.floor(Math.random() * 6 + 1);

    const ask = (input) => new Promise((resolve) => {
      rl.question(input.black.bgWhite, (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });

    const units = ("wizards" || "knights" || "thieves");
    const badguys = ("orcs" || "trolls" || "goblins");
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    const response = await ask('Pick Your Unit: '.black.bgWhite);

    if (response === units)
    {
      await seconds(.5);
      rl.write('The Dice are rolling'.black.bgWhite);
      const roll = getRand();
      await responseAnimation(roll + 3);
      rl.write(`\nYour roll is ${dice[roll - 1].red}`.black.bgWhite + ` ${roll}`.black.bgWhite);
    }

    if (response === badguys){

    }
    if (response === 'no')
    {
      await seconds(1);
      rl.write('ok... hmm let me think about that\n.black.bgWhite)');
      await seconds(3);
      rl.write('ok lets try that again.. i don\'t believe you\n');
      await seconds(1);
      return question();
    }
    else {
      rl.close();
    }

  };

  question();

})();







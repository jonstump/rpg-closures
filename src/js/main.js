// import '../css/styles.css';
const createStore = require('./create-store.js');
const createCharStore =  require('./create-char-store');
const readline = require('readline');
const seconds =  require('./seconds.js');
var colors = require('colors');

(async () => {

  const units = createCharStore();
  const badGuys = createCharStore();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const responseAnimation = async (number, time, input = '.') => {

    await seconds(time);
    rl.write(input);

    if (number > 0)
    {
      return responseAnimation( number - 1) ;
    }

  };

  const dragon = () => `
                __.-/|\n
                \\\`o_O'\n
                  =( )=  +------- +\n
                    U|   | Welcome|\n
          /\\  /\   / |    +-------+\n
        ) /^\\) ^\\/ _)\\     |\n
        )   /^\\/   _) \\    |\n
        )   _ /  / _)  \\___|_\n
    /\\  )/\\/ ||  | )_)\\___,|))\n
    <  >      |(,,) )__)    |\n
    ||      /    \\)___)\\\n
    | \\____(      )___) )____\n
      \\______(_______;;;)__;;;)\n
    `
    .split('')
    .map(
      (char) => async () => {
        await seconds(.01);
        rl.write(
          char.red
        );
      }
    );

  const setColor = (string) => `\n${string}`;



  await (async () => {
    for (let char of dragon()) {
      await char();
    }
  })();

  seconds(.01);


  const question = async () => {

    const getRand = () => Math.floor(Math.random() * 6 + 1);

    const ask = (input) => new Promise((resolve) => {
      rl.question(input, (answer) => {
        resolve(answer.trim().toLowerCase());
      });
    });

    // const unit = ["wizards" , "knights" , "thieves"];

    const badGuy = ["orcs", "trolls", "goblins", "dragons", "hobgoblins", "skeletons"];
    const dice = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const response = await ask(setColor('\nPick Your Unit: '));

    // good -u
    const addUnits = units().createChar(response);

    await seconds(.5);
    rl.write(
      setColor(`The Dice are rolling young ${response}`)
    );


    const roll = getRand();
    await responseAnimation(roll + 3, 0.4);

    rl.write(
      setColor(`Your roll is ${dice[roll - 1].red} ${roll}`)
    );

    // add -u
    addUnits(roll);
    await seconds(.5);

    for await(let [unit,values] of Object.entries(units().showState())){
      await seconds(.5);
      rl.write(
        setColor(`\nUnits: ${unit}, Current Amount: ${values}`)
      );
    }

    // bad turn
    const randomBadGuy = badGuy[getRand() - 1];
    const addBaddies = units().createChar(randomBadGuy);
    await seconds(.5);

    rl.write(
      setColor(`The ${randomBadGuy} is attacking`)
    );

    const badRoll = getRand();
    addBaddies(badRoll);
    await responseAnimation(badRoll + 3, 0.4);

    rl.write(
      setColor(`Their roll is ${dice[badRoll - 1].red} ${badRoll}`)
    );

    // add -b
    badGuys(badRoll);

    // win conditionals
    if (roll > badRoll) rl.write(
      setColor(`The ${response} have defeated the ` + `${randomBadGuy}!\n`)
    );

    else if (roll == badRoll) rl.write(
      setColor(`Its A Draw, You Save Your Arm ${response}\n`)
    );

    else rl.write(
      setColor(`Oh no! The ${randomBadGuy} defeated the ${response}!\n`)
    );

    return question();
  };

  // start
  question();

})();







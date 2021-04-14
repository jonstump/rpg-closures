// import '../css/styles.css';
const createStore = require('./create-store.js');
const createCharStore =  require('./create-char-store');
const readline = require('readline');
const seconds =  require('./seconds.js');


(() => {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = async () => {

    const ask = (input) => new Promise((resolve) => {
      rl.question(input, (answer) => {
        resolve(answer.trim().toLowercase());
      });
    });

    const units = ("wizards" || "knights" || "thieves");
    const badguys = ("orcs" || "trolls" || "goblins");

    const response = await ask('Pick Your Unit \n');

    if (response === units)
    {
      
    }

    if (response === badguys){}
    if (response === 'no')
    {
      await seconds(1);
      rl.write('ok... hmm let me think about that\n');
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







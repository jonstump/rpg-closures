const createStore  = require('./create-store.js');
const reducer = require('./reducer.js');

const createCharStore = (initialState = {}) => {
  const store = createStore(initialState);
  return () => {
    const action = {
      createChar: (type) => (amount = 1) => store(reducer(type)(amount)),
      showState: () => store(),
    };
    return action;
  };
};
module.exports = createCharStore;
// let heros = createCharStore();
// let badguys = createCharStore();

// heros().createChar('wiz')(5);
// badguys().createChar('orcs')(5);
// heros().showState();
// console.log(heros().showState());


// const playGame = () => {

//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });

//   const question = async () => {
//     const ask = (zap) => new Promise((resolve) => {
//       rl.question(zap, (answer) => {
//         resolve(answer.trim());
//       });
//     });
//     const response = await ask('Pick Your units');
//     if (response === 'no')
//     {
//       await seconds(1);
//       rl.write('ok... hmm let me think about that\n');
//       await seconds(3);
//       rl.write('ok lets try that again.. i don\'t believe you\n');
//       await seconds(1);
//       return question();
//     }
//     else {
//       rl.close();
//     }
//   };

//   question();

// };

// playGame();

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
const Database = require('./utilities/database');
const Features = require('./features');
const Routers = require('./routes');
const Express = require('./utilities/express');
const environment = require('./environment');
const { createStore } = require('redux');
const reducers = require('./reducers');

module.exports = async (logger) => {
  const database = await Database(logger);
  const store = createStore(reducers);
  const context = {
    logger,
    repositories: {},
    services: {},
    database,
    environment,
  };

  await Features(context);

  Express(context);

  await Routers(context);

  console.log(store.getState());

  return context;
};

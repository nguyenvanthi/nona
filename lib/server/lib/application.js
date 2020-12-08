const Database = require('./utilities/database');
const Features = require('./features');
const Routers = require('./routes');
const Express = require('./utilities/express');
const environment = require('./environment');

module.exports = async (logger) => {
  const database = await Database(logger);
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

  return context;
};

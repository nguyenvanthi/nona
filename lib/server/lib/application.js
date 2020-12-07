const initDatabase = require("./utilities/database");

module.exports = async (logger) => {
  console.info(logger);
  await initDatabase();
};

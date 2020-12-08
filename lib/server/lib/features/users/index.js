const Model = require("./model");

module.exports = async ({ database }) => {
  return await Model(database);
};

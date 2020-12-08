const Repositories = require('./repositories');
const Services = require('./services');

/**
 * @param {Context} context
 */
module.exports = async (context) => {
  await Repositories(context);
  await Services(context);
};

const User = require('./users');

module.exports = async (context) => {
  await User(context);
};

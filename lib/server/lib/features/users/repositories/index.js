const UserSequelize = require('./user-sequelize');

module.exports = async (context) => {
  const user = new UserSequelize(context);

  await user.initialize();

  context.repositories.user = user;
};

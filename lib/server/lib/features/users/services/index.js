const UserService = require('./user');

module.exports = async (context) => {
  context.services.user = new UserService(context);
  context.services.userMetadata = context.repositories.userMetadata;
};

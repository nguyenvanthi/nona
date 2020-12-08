const UserSequelize = require('./user-sequelize');
const UserMetadataSequelize = require('./user-meta-sequelize');

module.exports = async (context) => {
  const user = new UserSequelize(context);
  const userMetadata = new UserMetadataSequelize(context);

  await user.initialize();
  await userMetadata.initialize();

  context.repositories.user = user;
  context.repositories.userMetadata = userMetadata;
};

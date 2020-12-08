module.exports = async (context) => {
  context.services.user = context.repositories.user;
};

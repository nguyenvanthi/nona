class User {
  constructor(context) {
    this.context = context;
  }

  async findAll(
    options = {
      userOptions: undefined,
      userMetaOptions: undefined,
    }
  ) {
    const userRepository = this.context.repositories.user;
    const userMetadataRepository = this.context.repositories.userMetadata;
    const userAttributes = ['username', 'name', 'active', 'id'];
    const userFindAllOptions = Object.assign(
      {},
      options.userOptions ?? { attributes: userAttributes }
    );
    const userMetadataOptions = Object.assign(
      {},
      options.userMetaOptions ?? {}
    );

    const users = await userRepository.findAll(userFindAllOptions);

    return await users.reduce(async (resolve, user) => {
      const users = await resolve;
      const userMetadata = await userMetadataRepository.findByUserId(
        user.id,
        userMetadataOptions
      );

      userMetadata.forEach((metadata) => {
        user[metadata.key] = metadata.value;
      });

      return [...users, user];
    }, Promise.resolve([]));
  }
}

module.exports = User;

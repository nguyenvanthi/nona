const R = require('ramda');

const defaultFindAllOptions = {
  userOptions: undefined,
  userMetaOptions: undefined,
};

class User {
  constructor(context) {
    this.context = context;
  }

  async create(user) {
    const userRepository = this.context.repositories.user;
    const userMetadataRepository = this.context.repositories.userMetadata;
    const userKeys = Object.keys(this.context.repositories.user.schema);
    const userEntity = R.pickAll(userKeys, user);
    const createdUser = await userRepository.create(userEntity);
    const meta = R.omit(userKeys, user);

    const metadata = await Promise.all(
      Object.keys(meta).map(async (key) => {
        const metadata = {
          relationId: createdUser.id,
          key,
          value: meta[key],
        };

        return await userMetadataRepository.create(metadata);
      })
    );

    createdUser.metadata = metadata;

    return createdUser;
  }

  async findAll(options = defaultFindAllOptions) {
    const userRepository = this.context.repositories.user;
    const userFindAllOptions = options?.userOptions ?? {};
    const userMetadataOptions = options.userMetaOptions ?? {};

    const users = await userRepository.findAll(userFindAllOptions);

    return await Promise.all(users.map((user) => this.mergeMetadata(user, userMetadataOptions)));
  }

  async mergeMetadata(user, options = { attributes: [] }) {
    const clonedUser = R.clone(user);
    const userMetadataRepository = this.context.repositories.userMetadata;
    const metadata = await userMetadataRepository.findByUserId(user.id);
    const isValidAttributes = (key) =>
      !options ||
      !options.attributes ||
      options.attributes.length == 0 ||
      options.attributes.includes(key);

    metadata.forEach(({ key, value }) => {
      if (!clonedUser[key] && isValidAttributes(key)) {
        clonedUser[key] = value;
      }
    });

    return clonedUser;
  }
}

module.exports = User;

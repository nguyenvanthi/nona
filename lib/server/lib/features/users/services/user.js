const R = require('ramda');
const findAll = require('../../shared/services/find-all');

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

    createdUser.metadata = await Promise.all(
      Object.keys(meta).map(async (key) => {
        const metadata = {
          relationId: createdUser.id,
          key,
          value: meta[key],
        };

        return await userMetadataRepository.create(metadata);
      })
    );

    return createdUser;
  }

  findAll() {
    const userRepository = this.context.repositories.user;
    const userMetadataRepository = this.context.repositories.userMetadata;

    const options = {
      merge: true,
      metadata: {
        repository: userMetadataRepository,
        options: {
          where: {
            active: true,
          },
        },
      },
      repository: userRepository,
      options: {},
      format: R.identity,
    };

    return findAll(options);
  }
}

module.exports = User;

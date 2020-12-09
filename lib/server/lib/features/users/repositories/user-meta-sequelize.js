const SequelizeMetadataRepository = require('../../shared/repositories/sequelize-metadata-repository');

class Repository extends SequelizeMetadataRepository {
  constructor(context) {
    const modelName = 'user_metadata';

    super(context, modelName);
  }
}

module.exports = Repository;

const Sequelize = require('sequelize');
const SequelizeRepository = require('../../shared/sequelize-repository');
const { metadataSchema } = require('../../shared/sequelize-schema');

class UserMetadata extends Sequelize.Model {}

class Repository extends SequelizeRepository {
  constructor(context) {
    super();
    this.database = context.database;
    this.model = UserMetadata.init(metadataSchema, {
      sequelize: context.database,
      modelName: 'usermeta',
    });
  }
}

module.exports = Repository;

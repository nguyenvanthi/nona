const SequelizeRepository = require('../../shared/sequelize-repository');
const { metadataSchema } = require('../../shared/sequelize-schema');

class Repository extends SequelizeRepository {
  constructor(context) {
    const modelName = 'userMetadata';

    super(context, metadataSchema, modelName);
  }

  findByUserId(userId, options = {}) {
    const whereOption = {
      where: {
        relationId: userId,
      },
    };
    const findAllOptions = Object.assign({}, whereOption, options);

    return this.findAll(findAllOptions);
  }
}

module.exports = Repository;

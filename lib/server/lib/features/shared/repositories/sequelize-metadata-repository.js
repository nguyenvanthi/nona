const R = require('ramda');
const SequelizeRepository = require('./sequelize-repository');
const { metadataSchema } = require('../schemas/sequelize-schema');

class SequelizeMetadataRepository extends SequelizeRepository {
  constructor(context, modelName, options) {
    super(context, metadataSchema, modelName, options);
  }

  findByRelationId(relationId, options = {}) {
    const whereOption = {
      where: {
        relationId,
      },
    };
    const findAllOptions = R.mergeLeft(whereOption, options);

    return this.findAll(findAllOptions);
  }
}

module.exports = SequelizeMetadataRepository;

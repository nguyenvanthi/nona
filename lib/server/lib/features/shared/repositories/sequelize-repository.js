const R = require('ramda');
const buildOptions = (options = {}) => R.mergeLeft(options, { raw: true });
const buildRepositoryName = (modelName) =>
  R.split('_', modelName).reduce(
    (result, name) => `${result}${name[0].toUpperCase()}${name.substr(1)}`,
    ''
  );

class SequelizeRepository {
  constructor(context, schema, modelName, modelOptions = {}) {
    this.name = buildRepositoryName(modelName);
    this.database = context.database;
    this.model = context.database.define(modelName, schema, modelOptions);
    this.schema = schema;
  }

  async initialize() {
    await this.model.sync({ alter: true });
  }

  async create(entity) {
    const created = await this.model.create(entity);

    return created.get({ plain: true });
  }

  findAll(options = {}) {
    return this.model.findAll(buildOptions(options));
  }

  findById(id, options = {}) {
    return this.model.findByPk(id, buildOptions(options));
  }

  findOne(options = {}) {
    return this.model.findOne(buildOptions(options));
  }
}

module.exports = SequelizeRepository;

class SequelizeRepository {
  constructor(context, schema, modelName, modelOptions = {}) {
    this.database = context.database;
    this.model = context.database.define(modelName, schema, modelOptions);
    this.schema = schema;
  }

  async initialize() {
    await this.model.sync({ alter: true });
  }

  create(entity) {
    return this.model.create(entity);
  }

  findAll(options = {}) {
    return this.model.findAll(Object.assign({}, { raw: true }, options));
  }

  findById(id, options = {}) {
    return this.model.findByPk(id, Object.assign({}, { raw: true }, options));
  }

  findOne(options = {}) {
    return this.model.findOne(Object.assign({}, { raw: true }, options));
  }
}

module.exports = SequelizeRepository;

class SequelizeRepository {
  constructor(context, schema, modelName, modelOptions = {}) {
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

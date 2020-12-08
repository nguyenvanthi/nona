const Sequelize = require('sequelize');
const SequelizeRepository = require('../../shared/sequelize-repository');

class Repository extends SequelizeRepository {
  constructor(context) {
    const modelName = 'user';
    const schema = {
      username: Sequelize.STRING,
      name: Sequelize.STRING,
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    };

    super(context, schema, modelName);
  }
}

module.exports = Repository;

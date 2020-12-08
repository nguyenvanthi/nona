const Sequelize = require('sequelize');
const SequelizeRepository = require('../../shared/sequelize-repository');

class Repository extends SequelizeRepository {
  constructor(context) {
    const modelName = 'user';
    const schema = {
      username: Sequelize.STRING,
      birthday: Sequelize.DATE,
    };

    super(context, schema, modelName);
  }
}

module.exports = Repository;

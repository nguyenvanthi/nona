const Sequelize = require('sequelize');

const metadataSchema = {
  key: Sequelize.STRING,
  value: Sequelize.TEXT({ length: 'long' }),
  relationId: Sequelize.INTEGER,
};

module.exports = { metadataSchema };

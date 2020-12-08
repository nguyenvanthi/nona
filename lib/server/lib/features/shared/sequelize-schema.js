const Sequelize = require('sequelize');

const metadataSchema = {
  key: Sequelize.STRING,
  value: Sequelize.TEXT,
  relationId: Sequelize.INTEGER,
};

module.exports = { metadataSchema };

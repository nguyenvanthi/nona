const Sequelize = require('sequelize');

const metadataSchema = {
  key: Sequelize.STRING,
  value: Sequelize.TEXT,
  relationId: Sequelize.INTEGER,
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
};

module.exports = { metadataSchema };

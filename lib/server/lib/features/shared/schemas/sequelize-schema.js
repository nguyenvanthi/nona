const Sequelize = require('sequelize');

const metadataSchema = {
  key: Sequelize.STRING,
  value: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  relationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
};

module.exports = { metadataSchema };

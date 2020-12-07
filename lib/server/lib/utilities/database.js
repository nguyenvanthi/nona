const environment = require("../environment");
const { Sequelize } = require("sequelize");

module.exports = async () => {
  const sequelize = new Sequelize(environment.database.connectionString);

  try {
    await sequelize.authenticate();
    console.info("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

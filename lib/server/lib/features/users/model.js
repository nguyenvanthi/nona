const { Model, DataTypes } = require("sequelize");

module.exports = async (sequelize) => {
  class User extends Model {}

  const model = User.init(
    {
      username: DataTypes.STRING,
      birthday: DataTypes.DATE,
      address: DataTypes.STRING,
    },
    { sequelize, modelName: "user" }
  );

  await model.sync({ alter: true });

  return model;
};

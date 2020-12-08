const Database = require("./utilities/database");
const Users = require("./features/users");

module.exports = async (logger) => {
  const database = await Database(logger);
  await Users({ database });

  const users = await database.models.user.findAll({
    attributes: ["username", "birthday", "address"],
    raw: true,
  });

  console.info(users);
};

const dotenv = require("dotenv");

dotenv.config({ path: "./configs/app.conf" });

const environmentName = process.env.NODE_ENV || "development";

dotenv.config({ path: `./configs/${environmentName}.conf` });

const environment = {
  name: environmentName,
  server: {
    port: (process.env.PORT || 3000) >> 0,
    host: process.env.HOST || "localhost",
    publicFolder: process.env.PUBLIC_FOLDER || "public",
  },
  numbersOfCluster: (process.env.NUMBERS_OF_CLUSTER || 1) >> 0,
  database: {
    connectionString: process.env.CONNECTION_STRING || "sqlite::memory:",
  },
};

module.exports = environment;

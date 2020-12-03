/*global process module*/

const constant = {
  envTypes: {
    development: "development",
    production: "production",
  },
};

const environmentName = process.env.NODE_ENV || constant.envTypes.production;

const environment = {
  name: environmentName,
  server: {
    port: (process.env.PORT || 3000) >> 0,
    host: process.env.HOST || "localhost",
    publicFolder: process.env.PUBLIC_FOLDER || "public",
  },
  numbersOfCluster: (process.env.NUMBERS_OF_CLUSTER || 1) >> 0,
};

module.exports = environment;

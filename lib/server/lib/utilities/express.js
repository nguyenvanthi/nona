const express = require('express');
const { createServer } = require('http');

function registerMiddleware({ express: application, environment }) {
  application.use(express.static(environment.server.publicFolder));

  application.use(express.json());
  application.use(express.urlencoded({ extended: true }));
}

module.exports = (context) => {
  const { host, port } = context.environment.server;

  context.express = express();
  context.server = createServer(context.express);

  function startServerCallback() {
    console.info(`Server has been started. (http://${host}:${port}/docs)`);
  }

  registerMiddleware(context);

  context.server.listen(port, host, startServerCallback);
};

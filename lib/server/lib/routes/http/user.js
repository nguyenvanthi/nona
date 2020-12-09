const express = require('express');

module.exports = (context) => {
  const router = new express.Router();

  router.get('/api/user/getAll', async (_, res) => {
    const users = await context.services.user.findAll();

    res.send(users);
  });

  router.post('/api/user', async (req, res) => {
    const user = await context.services.user.create(req.body);

    res.send(user);
  });

  context.express.use(router);
};

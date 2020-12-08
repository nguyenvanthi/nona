const express = require('express');

module.exports = (context) => {
  const router = new express.Router();
  const attributes = ['id', 'username', 'birthday'];

  router.get('/user/getAll', async (req, res) => {
    const users = await context.services.user.findAll({ attributes });

    res.send(users);
  });

  router.get('/user/:id', async (req, res) => {
    const user = await context.repositories.user.findById(req.params.id, {
      attributes,
    });

    res.send(user);
  });

  context.express.use(router);
};

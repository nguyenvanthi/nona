const express = require('express');

module.exports = (context) => {
  const router = new express.Router();

  router.get('/api/user/getAll', async (req, res) => {
    const users = await context.services.user.findAll();

    res.send(users);
  });

  context.express.use(router);
};

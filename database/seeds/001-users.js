const bcrypt = require('bcryptjs');
exports.seed = function (knex) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        {
          "username": "admin",
          "password": bcrypt.hashSync('admin', 11),
        },
        {
          "username": "bella",
          "password": bcrypt.hashSync('ciaciao', 11),
        },
      ]);
    });
};
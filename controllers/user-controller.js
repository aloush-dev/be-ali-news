const { fetchUsers } = require("../models/user-model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((data) => {;
      res.status(200).send({ users: data });
    })
    .catch(next);
};

const { fetchUsers, fetchUserByUsername } = require("../models/user-model");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((data) => {
      res.status(200).send({ users: data });
    })
    .catch(next);
};

exports.getUserByUsername = (req, res, next) => {
  fetchUserByUsername(req.params)
    .then((data) => {
      res.status(200).send({ users: data });
    })
    .catch(next);
};

const res = require("express/lib/response");
const {
  fetchUsers,
  fetchUserByUsername,
  fetchUserToPost,
} = require("../models/user-model");

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

exports.postUser = (req, res, next) => {
  fetchUserToPost(req.body)
    .then((data) => {
      res.status(201).send({ user: data });
    })
    .catch(next);
};

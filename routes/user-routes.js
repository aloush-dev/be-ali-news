const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserByUsername,
  postUser
} = require("../controllers/user-controller");

router.get("/api/users", getUsers);

router.get("/api/users/:username", getUserByUsername);

router.post("/api/users", postUser)

module.exports = router;
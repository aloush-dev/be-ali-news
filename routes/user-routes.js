const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUserByUsername,
} = require("../controllers/user-controller");

router.get("/api/users", getUsers);

router.get("/api/users/:username", getUserByUsername);

module.exports = router;
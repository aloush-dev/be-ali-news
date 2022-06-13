const express = require("express");
const router = express.Router();

const { getTopics } = require("../controllers/topic-controller");

router.get("/api/topics", getTopics);

module.exports = router;

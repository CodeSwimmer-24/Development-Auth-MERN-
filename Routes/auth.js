const express = require("express");
const { signup } = require("../Controllers/auth");
const router = express.Router();

router.get("/signup", signup);

module.exports = router;

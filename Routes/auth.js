const express = require("express");
const { signup } = require("../Controllers/auth");
const router = express.Router();

//  import Validators
const { userSignupValidator } = require("../Validators/auth");
const { runValidation } = require("../Validators");

router.post("/signup", userSignupValidator, runValidation, signup);

module.exports = router;

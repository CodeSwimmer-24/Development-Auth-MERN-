const express = require("express");
const { signup, accountActivation, signin } = require("../Controllers/auth");
const router = express.Router();

//  import Validators
const {
  userSignupValidator,
  userSigninValidator,
} = require("../Validators/auth");
const { runValidation } = require("../Validators");

router.post("/signup", userSignupValidator, runValidation, signup);

router.post("/account-activation", accountActivation);

router.post("/signin", userSigninValidator, runValidation, signin);

module.exports = router;

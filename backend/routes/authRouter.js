const router = require("express").Router();
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const authControle = require("./../controllers/authControl");
router.post("/login", loginValidation, authControle.login);
router.post("/signup", signupValidation, authControle.signup);
module.exports = router;

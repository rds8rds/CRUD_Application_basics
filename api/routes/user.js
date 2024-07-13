const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const authenticate = require("../middleware/authenticate");

router.post("/login", userController.loginController);
router.post("/signup", userController.signupController);

router.get("/", authenticate, userController.getAllUsers);

module.exports = router;

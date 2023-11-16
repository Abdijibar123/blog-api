const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.route("/login").post(userController.login);

router.route("/signup").post(userController.signup);

router.route("/change-password").put(userController.changePassword);

router.route("/change-profile/:userId").put(userController.updateUser);

router.route("/:userId").get(userController.getUser);

module.exports = router;

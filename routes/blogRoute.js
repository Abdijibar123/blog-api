const userController = require("../controller/blogController");
const express = require("express");
const router = express.Router();


router.route("/").get(userController.blogs);

module.exports = router;

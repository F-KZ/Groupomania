const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

const auth = require("../middleware/auth");
const multer = require("../middleware/multer");
const limiter = require("../middleware/limiter");

router.post("/signup", userController.signup);
router.post("/login", limiter, userController.login);

router.get("/getUser", auth, userController.getUser);
router.get("/getAllUser", auth, userController.getAllUser);
router.get("/userArticles", auth, userController.userArticles);
router.post("/userUpdate", auth, multer, userController.userUpdate);
router.delete("/userDelete", auth, userController.userDelete);

module.exports = router;

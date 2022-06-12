const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

//Routes articles
router.post("/article", auth, multer, postController.createPost);
router.get("/", auth, postController.getAllPost);
router.get("/:id", auth, postController.getOnePost);
router.delete("/:id", auth, postController.deletePost);
//Routes commentaires
router.post("/postComment", auth, postController.commentPost);
router.get("/getComment/:id", auth, postController.getComment);
router.delete("/getComment/delete/:id", auth, postController.deleteComment);

module.exports = router;

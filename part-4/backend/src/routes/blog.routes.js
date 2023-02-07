const express = require("express");

const router = express.Router();

const {
  getBlogs,
  getBlog,
  postBlog,
  putBlog,
  deleteBlog,
  deleteBlogs,
  addVote,
  removeVote,
} = require("../controllers/blog.controller");

router.route("/").get(getBlogs).post(postBlog).delete(deleteBlogs);
router.route("/:id").get(getBlog).put(putBlog).delete(deleteBlog);
router.route("/:id/addVote").post(addVote);
router.route("/:id/removeVote").post(removeVote);

module.exports = router;

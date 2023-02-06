const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

const postBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({ ...req.body });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

const putBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.author = req.body.author;
    blog.title = req.body.title;
    blog.url = req.body.url;
    blog.votes = req.body.votes ?? blog.votes;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    await blog.remove();
    res.json({ message: "Blog removed" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

const addVote = asyncHandler(async (req, res) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: req.params.id },
    { $inc: { votes: 1 } },
    { new: true }
  );
  if (updatedBlog) {
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

const removeVote = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.votes > 0) {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { votes: -1 } },
      { new: true }
    );
    if (updatedBlog) {
      res.json(updatedBlog);
    } else {
      res.status(404);
      throw new Error("Blog not found");
    }
  } else {
    res.status(400);
    throw new Error("Blog has no votes to remove");
  }
});

module.exports = {
  getBlogs,
  getBlog,
  postBlog,
  putBlog,
  deleteBlog,
  addVote,
  removeVote,
};

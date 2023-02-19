const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");
const User = require("../models/user.model");

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("userId", {
    username: 1,
    name: 1,
  });
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
  try {
    const { body } = req;

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      res.status(401);
      throw new Error("token invalid");
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ ...body, userId: user.id });
    const createdBlog = await blog.save();
    // eslint-disable-next-line no-underscore-dangle
    user.blogs = user.blogs.concat(createdBlog.id);
    await user.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400);
    }

    throw error;
  }
});

const putBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    blog.author = req.body.author || blog.author;
    blog.title = req.body.title || blog.author;
    blog.url = req.body.url || blog.url;
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

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }
  console.log(req.user);
  if (blog?.userId?.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to delete this blog");
  }

  await blog.remove();
  res.json({ message: "Blog removed" });
});

const deleteBlogs = asyncHandler(async (req, res) => {
  await Blog.deleteMany({});
  res.json({ message: "Blogs removed" });
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
  deleteBlogs,
  addVote,
  removeVote,
};

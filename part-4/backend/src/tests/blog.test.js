/* eslint-disable node/no-unpublished-require */
// const dotenv = require("dotenv").config();
const supertest = require("supertest");
const mongoose = require("mongoose");
const Blog = require("../models/blog.model");
const app = require("../app");

const api = supertest(app);

describe("Simple blog creation and deletion story", () => {
  beforeAll(async () => {
    await Blog.deleteMany({});
  });

  afterAll(async () => {
    await Blog.deleteMany({});
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog created", async () => {
    const response = await api
      .post("/api/blogs")
      .send({
        title: "Test title 1",
        author: "Test author 1",
        url: "Test url 1",
        votes: 1,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body?.title).toBe("Test title 1");
    expect(response.body?.author).toBe("Test author 1");
    expect(response.body?.url).toBe("Test url 1");
    expect(response.body?.votes).toBe(1);
  });

  test("there are one blog", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(1);
  });

  test("the blog is the same as created previously", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body?.[0]?.title).toBe("Test title 1");
    expect(response.body?.[0]?.author).toBe("Test author 1");
    expect(response.body?.[0]?.url).toBe("Test url 1");
    expect(response.body?.[0]?.votes).toBe(1);
  });

  test("blogs removed", async () => {
    const response = await api.delete("/api/blogs").expect(200);
    expect(response.body).toEqual({ message: "Blogs removed" });
  });

  test("there are no blogs after deletion", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(0);
  });
});

describe("Simple operations", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  });

  test("id property is named id", async () => {
    const response = await api
      .post("/api/blogs")
      .send({
        title: "Test title 1",
        author: "Test author 1",
        url: "Test url 1",
        votes: 1,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body?.id).toBeDefined();
  });

  test("blog without required fields is not created", async () => {
    await api
      .post("/api/blogs")
      .send({ author: "Test author 1", url: "Test url 1", votes: 1 })
      .expect(400);
    await api
      .post("/api/blogs")
      .send({ title: "Test title 1", url: "Test url 1", votes: 1 })
      .expect(400);
    await api
      .post("/api/blogs")
      .send({ title: "Test title 1", author: "Test author 1", votes: 1 })
      .expect(400);
  });

  test("blog got successfully created", async () => {
    const totalBlogsBefore = (await api.get("/api/blogs")).body.length;

    await api
      .post("/api/blogs")
      .send({
        title: "Test title 1",
        author: "Test author 1",
        url: "Test url 1",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const totalBlogsAfter = (await api.get("/api/blogs")).body.length;

    expect(totalBlogsAfter).toBe(totalBlogsBefore + 1);
  });

  test("votes property is set to 0 if not provided", async () => {
    const response = await api
      .post("/api/blogs")
      .send({
        title: "Test title 1",
        author: "Test author 1",
        url: "Test url 1",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body?.votes).toBe(0);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

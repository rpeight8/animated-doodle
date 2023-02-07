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
  }, 20000);

  afterAll(async () => {
    await Blog.deleteMany({});
  }, 20000);

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 20000);

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
  }, 20000);

  test("there are one blog", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(1);
  }, 20000);

  test("the blog is the same as created previously", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body?.[0]?.title).toBe("Test title 1");
    expect(response.body?.[0]?.author).toBe("Test author 1");
    expect(response.body?.[0]?.url).toBe("Test url 1");
    expect(response.body?.[0]?.votes).toBe(1);
  }, 20000);

  test("blogs removed", async () => {
    const response = await api.delete("/api/blogs").expect(200);
    expect(response.body).toEqual({ message: "Blogs removed" });
  }, 20000);

  test("there are no blogs after deletion", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(0);
  }, 20000);
});

describe("Simple operations", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
  }, 20000);

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
  }, 20000);

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
  }, 20000);

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
  }, 20000);

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
  }, 20000);

  test("blog got successfully deleted", async () => {
    const totalBlogsBefore = (await api.get("/api/blogs")).body.length;

    const response = await api
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

    const { id } = response.body;

    await api.delete(`/api/blogs/${id}`).expect(200);

    const totalBlogsAfterDelete = (await api.get("/api/blogs")).body.length;

    expect(totalBlogsAfterDelete).toBe(totalBlogsBefore);
  }, 20000);

  test("blog got successfully updated", async () => {
    const response = await api
      .post("/api/blogs")
      .send({
        title: "Test title 1",
        author: "Test author 1",
        url: "Test url 1",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const { id } = response.body;
    const updateResponse = await api
      .put(`/api/blogs/${id}`)
      .send({
        votes: 13,
        title: "Test title 1 updated",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(updateResponse.body?.votes).toBe(13);
    expect(updateResponse.body?.title).toBe("Test title 1 updated");

    const getResponse = await api.get(`/api/blogs/${id}`).expect(200);
    expect(getResponse.body?.votes).toBe(13);
    expect(getResponse.body?.title).toBe("Test title 1 updated");
  }, 20000);
});

afterAll(() => {
  mongoose.connection.close();
}, 20000);

/* eslint-disable node/no-unpublished-require */
// const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");

const api = supertest(app);

describe("api_test", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

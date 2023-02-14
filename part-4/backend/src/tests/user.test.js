/* eslint-disable node/no-unpublished-require */
// const dotenv = require("dotenv").config();
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

describe("User creation story", () => {
  beforeAll(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash, name: "root" });

    await user.save();
  }, 20000);

  afterAll(async () => {
    await User.deleteMany({});
  }, 20000);

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "rpe8",
      name: "RPE 8",
      password: "password1337",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  }, 20000);

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toContain("`username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 20000);
});

afterAll(() => {
  mongoose.connection.close();
}, 20000);

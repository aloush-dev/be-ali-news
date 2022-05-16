process.env.NODE_ENV = "test";
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("get api topics", () => {
  test("200 : should respond with an array of topic objects with the properties slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((data) => {
        data.body.forEach((topic) => {
          expect(topic).toHaveProperty("slug");
          expect(topic).toHaveProperty("description");
        });
      });
  });
  test("400 : should respond with bad request if given an endpoint other than topics", () => {
    return request(app)
      .get("/api/fish")
      .expect(404)
      .then((data) => {
          console.log(data)
          expect(data.text).toEqual("Endpoint Not Found")
      });
  });
});

process.env.NODE_ENV = "test";
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection");
const app = require("../app.js");
const request = require("supertest");
require("jest-sorted");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("Check Endpoint", () => {
  test("404: should return Endpoint Not Found if given any endpoint which does not exist", () => {
    return request(app)
      .get("/api/jelly")
      .expect(404)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Endpoint Not Found" });
      });
  });
});

describe("GET /api/topic", () => {
  test("200 : should respond with an array of topic objects with the properties slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((data) => {
        expect(data.body.topics).toHaveLength(3);
        data.body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: should return an article object which has the following properties, author ,title, article_id, body, topic, created_at and votes", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((data) => {
        expect(data.body.article).toEqual(
          expect.objectContaining({
            title: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            topic: expect.any(String),
            article_id: 1,
            body: expect.any(String),
          })
        );
      });
  });
  test("400: if the article_id is not a number return bad request message", () => {
    return request(app)
      .get("/api/articles/fish")
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual({ msg: "Bad Request" });
      });
  });
  test("404: if the article_id is a number but not the number matching an article return a not found message", () => {
    return request(app)
      .get("/api/articles/9999999")
      .expect(404)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Not Found" });
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200 : should accept an object with a POSITIVE number value. Update the article given in the endpoint with the amount of votes given in the article. ", () => {
    const updateVotes = { inc_votes: 10 };

    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send(updateVotes)
      .then((data) => {
        expect(data.body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 110,
        });
      });
  });
  test("200 : should accept an object with a NEGATIVE number value. Update the article given in the endpoint with the amount of votes given in the article. ", () => {
    const updateVotes = { inc_votes: -50 };

    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send(updateVotes)
      .then((data) => {
        expect(data.body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 50,
        });
      });
  });
  test("400: check that the object which is being given has the correct properties", () => {
    const updateVotes = { haha_wrong_prop: -50 };

    return request(app)
      .patch("/api/articles/1")
      .expect(400)
      .send(updateVotes)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Wrong Object Type" });
      });
  });
});

describe("GET /api/users", () => {
  test("200: should return an array of users with their usernames", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((data) => {
        expect(data.body.users).toHaveLength(4);
        data.body.users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({ username: expect.any(String) })
          );
        });
      });
  });
});

describe("GET /api/articles/:article_id Including a comment count", () => {
  test("200 : should return a requested article as on object including a comment count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((data) => {
        expect(data.body.article).toEqual(
          expect.objectContaining({ comment_count: expect.any(Number) })
        );
        expect(data.body.article.comment_count).toBe(11);
      });
  });
  test("200 : should return a requested article as on object including a comment count showing zero if no comments", () => {
    return request(app)
      .get("/api/articles/2")
      .expect(200)
      .then((data) => {
        expect(data.body.article).toEqual(
          expect.objectContaining({ comment_count: expect.any(Number) })
        );
        expect(data.body.article.comment_count).toBe(0);
      });
  });
});

describe("GET /api/articles", () => {
  test("200: should return an array of article objects sorted by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((data) => {
        expect(data.body.article).toHaveLength(12);
        expect(data.body.article).toBeSortedBy("created_at", {
          descending: true,
        });
        data.body.article.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              title: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              topic: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("GET /api/articles/article_id/comments ", () => {
  test("200: should return an array of comments objects associated with the given article ID", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((data) => {
        expect(data.body.comments).toHaveLength(11);
        data.body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
            })
          );
        });
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Should add a comment to the databse with the given information from an object", () => {
    const commentObj = { username: "lurker", body: "this article sucks!" };

    return request(app)
      .post("/api/articles/1/comments")
      .expect(201)
      .send(commentObj)
      .then((data) => {
        expect(data.body.comment).toEqual(
          expect.objectContaining({
            author: "lurker",
            body: "this article sucks!",
            comment_id: expect.any(Number),
            created_at: expect.any(String),
            votes: 0,
            article_id: 1,
          })
        );
      });
  });
  test("404: should return User Not Found if given an incorrect username", () => {
    const commentObj = { username: "TrollMaster", body: "this article sucks!" };

    return request(app)
      .post("/api/articles/1/comments")
      .expect(404)
      .send(commentObj)
      .then((data) => {
        expect(data.body).toEqual({ msg: "User Not Found" });
      });
  });
  test("400: should return Comment Must be text if given an invalid body format", () => {
    const commentObj = { username: "lurker", body: 45620 };

    return request(app)
      .post("/api/articles/1/comments")
      .expect(400)
      .send(commentObj)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Comment must be text" });
      });
  });
  test("400: if the article_id is not a number return bad request message", () => {
    return request(app)
      .post("/api/articles/fish/comments")
      .expect(400)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Bad Request" });
      });
  });
  test("404: if the article_id is a number but not the number matching an article return a not found message", () => {
    return request(app)
      .post("/api/articles/9999999/comments")
      .expect(404)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Article Not Found" });
      });
  });
  test("400: should give bad request if given an object with the incorrect properties.", () => {
    const commentObj = { familyName: "Smith", body: 45620 };

    return request(app)
      .post("/api/articles/1/comments")
      .expect(400)
      .send(commentObj)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Bad Request" });
      });
  });
});

describe.only("GET /api/articles (queries)", () => {
  test("200: should return an array of articles sorted by a created_at by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((data) => {
        expect(data.body.article).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("200: should return an array of articles sorted by a given query", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count")
      .expect(200)
      .then((data) => {
        expect(data.body.article).toBeSortedBy("comment_count", {
          descending: true,
        });
      });
  });
  test("400: If given a sort by term which doesnt exist return Invalid Sort Term", () => {
    return request(app)
      .get("/api/articles?sort_by=shoe_size")
      .expect(400)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Invalid Sort Term" });
      });
  });
  test("200: should return an array of articles sorted by a given query ordered by a given order (Ascending)", () => {
    return request(app)
      .get("/api/articles?sort_by=article_id&order=ASC")
      .expect(200)
      .then((data) => {
        expect(data.body.article).toBeSortedBy("article_id", {
          descending: false,
        });
      });
  });
  test("400: If given a order by term which doesnt exist return Invalid Sort Term", () => {
    return request(app)
      .get("/api/articles?sort_by=topic&order=highest")
      .expect(400)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Invalid Order Term" });
      });
  });
  test("200: Should return an array of articles filtered by the given topic in the query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((data) => {
        data.body.article.forEach((article) => {
          expect(article).toEqual(expect.objectContaining({ topic: "mitch" }));
        });
      });
  });
  test("404: Should return Not Found if the Topic doesn't exist", () => {
    return request(app)
      .get("/api/articles?topic=taylor_swift")
      .expect(404)
      .then((data) => {
        expect(data.body).toEqual({ msg: "Not Found" });
      });
  });
  test('404: Should return Not Found if the topic is valid but has no articles associated with it ', () => {
    return request(app).get('/api/articles?topic=paper').expect(404).then((data)=>{
      expect(data.body).toEqual({msg: "Not Found"})
    })
  });
});

const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("Invalid Enpoint", () => {
  test("404: Responds with a message when path is not found", () => {
    return request(app)
      .get("/fdsa")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found!");
      });
  });
});

describe("/api/topics", () => {
  describe("GET", () => {
    test("200: Responds with a list of all topics including slugs, descriptions, and image_url if there is any", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(Array.isArray(topics)).toBe(true);
          topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          });
        });
    });
  });
});

describe("/api/articles", () => {
  describe("GET", () => {
    test("200: Responds with a list of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(Array.isArray(articles)).toBe(true);
        });
    });
    test("200: Each article object should have properties of author, title, article id, topic, created_at, votes and article_img_url", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body: { articles } }) => {
          articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.topic).toBe("string");
            expect(typeof article.created_at).toBe("string");
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
          });
        });
    });
    test("200: Each article object should have a property of comment_count", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body: { articles } }) => {
          articles.forEach((article) => {
            expect(typeof article.comment_count).toBe("number");
          });
        });
    });
    test("200: the articles should be sorted in descending order of creation date", () => {
      return request(app)
        .get("/api/articles")
        .then(({ body: { articles } }) => {
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
  });
  describe("INVALID METHODS", () => {
    test("405: Responds with message for invalid method", () => {
      //the .post() .put() ... are replaced by [method] when method is the variable name that contains literal values of these method strings
      //when using this, each of the method in the array needs to be responded with a 405
      const invalidMethods = ["post", "put", "patch", "delete"].map(
        (method) => {
          return request(app)
            [method]("/api/articles")
            .expect(405)
            .then(({ body }) => {
              expect(body.msg).toBe("Invalid Methods!");
            });
        },
      );
      return Promise.all(invalidMethods);

      // return request(app)
      //   .post("/api/articles")
      //   .expect(405)
      //   .then(({ body }) => {
      //     expect(body.msg).toBe("Invalid Methods!");
      //   });
    });
  });
});

describe("/api/articles/:article_id", () => {
  describe("GET", () => {
    test("200: Responds with the details of article with the given a valid article id", () => {
      return request(app)
        .get("/api/articles/6")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article.article_id).toBe(6);
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.body).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
        });
    });
    test("404: Responds with a message when passed a valid but non-existent article_id", () => {
      return request(app)
        .get("/api/articles/99999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article not found!");
        });
    });
  });
});

describe("/api/articles/:article_id/comments", () => {
  describe("GET", () => {
    test("200: Responds with a list of comments that has the given article id", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          comments.forEach((comment) => {
            expect(comment.article_id).toBe(3);
            expect(typeof comment.comment_id).toBe("number");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.votes).toBe("number");
            expect(typeof comment.body).toBe("string");
            expect(typeof comment.created_at).toBe("string");
          });
        });
    });
    test("404: Responds with a message when the article doesn't exis", () => {
      return request(app)
        .get("/api/articles/300/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Comments not found");
        });
    });
    test("404: Responds with a message when there is no comments with this article", () => {
      return request(app)
        .get("/api/articles/37/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Comments not found");
        });
    });
  });
  describe("POST", () => {
    test("201: Responds with a confirmation message with added comment upon correct format of input object", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "butter_bridge", body: "fds" })
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment.comment_id).toBeNumber();
          expect(comment.article_id).toBeNumber();
          expect(comment.votes).toBeNumber();
          expect(comment.body).toBeString();
          expect(comment.author).toBeString();
          expect(comment.created_at).toBeString();
        });
    });
    test("404: Responds with an error message when the article doesn't exist", () => {});
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("200: Responds with an article when searching with an article id", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(Array.isArray(users)).toBe(true);
          users.forEach((user) => {
            expect(typeof user.username).toBe("string");
            expect(typeof user.name).toBe("string");
            expect(typeof user.avatar_url).toBe("string");
          });
        });
    });
  });
});

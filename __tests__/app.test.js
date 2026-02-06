const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());

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
            expect(article.title).toBeString();
            expect(article.topic).toBeString();
            expect(article.author).toBeString();
            expect(article.created_at).toBeString();
            expect(article.votes).toBeNumber();
            expect(article.article_id).toBeNumber();
            expect(article.article_img_url).toBeString();
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
        .then(({ body: { article } }) => {
          expect(article.article_id).toBe(6);
          expect(article.title).toBeString();
          expect(article.topic).toBeString();
          expect(article.author).toBeString();
          expect(article.body).toBeString();
          expect(article.created_at).toBeString();
          expect(article.votes).toBeNumber();
          expect(article.article_img_url).toBeString();
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
  describe("PATCH", () => {
    test("200: Responds with updated article with the given id", () => {
      return request(app)
        .patch("/api/articles/3")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body: { updatedArticle } }) => {
          expect(updatedArticle.article_id).toBe(3);
          expect(updatedArticle.title).toBeString();
          expect(updatedArticle.topic).toBeString();
          expect(updatedArticle.author).toBeString();
          expect(updatedArticle.body).toBeString();
          expect(updatedArticle.created_at).toBeString();
          expect(updatedArticle.votes).toBeNumber();
          expect(updatedArticle.article_img_url).toBeString();
        });
    });
    test("200: The updated article will have updated number of votes accoding to the the inc_votes propery in the input object", () => {
      return request(app)
        .get("/api/articles/3")
        .then(
          ({
            body: {
              article: { votes },
            },
          }) => {
            const existingVotes = votes;
            return request(app)
              .patch("/api/articles/3")
              .send({ inc_votes: 1 })
              .expect(200)
              .then(({ body: { updatedArticle } }) => {
                expect(updatedArticle.votes).toBe(existingVotes + 1);
              });
          },
        );
    });
    test("400: Responds with a 400 error message if the input object doesn't include property of inc_votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ randomeStuff: 1 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Need to includ 'inc_votes' in input");
        });
    });
    test("400: Responds with a 400 error message if the input isn't an object ", () => {
      return request(app)
        .patch("/api/articles/1")
        .send(null)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Input needs to be an object");
        });
    });
    test("404: Responds with a 404 error message if the article with given id does not exist", () => {
      return request(app)
        .patch("/api/articles/3000")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article Not Found!");
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
    test("200: The list of comments responded should be sorted by descending order", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("404: Responds with a message when the article doesn't exis", () => {
      return request(app)
        .get("/api/articles/300/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article does not exist");
        });
    });
    // test("404: Responds with a message when there is no comments with this article", () => {
    //   return request(app)
    //     .get("/api/articles/4/comments")
    //     .expect(404)
    //     .then(({ body }) => {
    //       expect(body.msg).toBe("Comments not found");
    //     });
    // });
  });
  describe("POST", () => {
    test("201: Responds with a confirmation message with added comment upon correct format of input object", () => {
      return request(app)
        .post("/api/articles/3/comments")
        .send({ username: "butter_bridge", body: "a new comment" })
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment.article_id).toBe(3);
          expect(comment.comment_id).toBeNumber();
          expect(comment.votes).toBeNumber();
          expect(comment.body).toBeString();
          expect(comment.author).toBeString();
          expect(comment.created_at).toBeString();
        });
    });
    test("404: Responds with an error message when the article doesn't exist", () => {
      return request(app)
        .post("/api/articles/300/comments")
        .send({ username: "butter_bridge", body: "a new comment" })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Article Not Found!");
        });
    });
  });
});

describe("/api/comments/:comment_id", () => {
  describe("GET", () => {});
  describe("DELETE", () => {
    test("204: Responds with 204 status code if successfully deleted comment, and the comment with the specific id should be deleted", () => {
      return request(app)
        .delete("/api/comments/1")
        .expect(204)
        .then(() => {
          db.query("SELECT comment_id FROM comments WHERE comment_id = 1");
        });
    });
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

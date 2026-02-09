# Northcoders News Back-end API

A production-grade RESTful API built as part of the Northcoders Software Development Bootcamp.
This project is a social news similar to Reddit, built with an express server and full TDD, allowing users to interact with articles, leave comments, vote on contents and react with emojis.

Live Link: https://nc-news-backend-91qy.onrender.com/api

## Endpoints

The API serves JSON data via the following endpoints:

GET: `/api/topics` Get a list of all topics

GET: `/api/articles` Get a list of all articles

GET: `/api/articles/:article_id` Get an article by its article ID

GET: `/api/articles/:article_id/comments` Get the comments of an article by its article ID

POST `/api/articles/:article_id/comments` Post a new comment

PATCH: `/api/articles/:article_id` Update an article's vote count

GET: `/api/comments/:comment_id` Get a comment by comment ID

DELETE: `/api/comments/:comment_id` Delete a comment by comment ID

GET: `/api/users` Get all users

## Local Setup

**requirements**:

Requires local installations of

- postgreSQL v16+
- Node.js v20+

**package dependencies**:

- dotenv
- express
- pg

**dev dependencies**:

- husky
- jest
- jest-extended
- jest-sorted
- nodemon
- supertest

## Connecting to a database

### Environment Variables

In order to connect to the databases, 2 `.env` files need to be created in the root directory:

- a `.env.development` with `PGDATABASE=nc_news`
- a `.env.test` with ``PGDATABASE=nc_news_test`

### Database Setup

Run `npm run setup-dbs` to initialise the local database

### Seeding the Database

Run `npm run seed` to seed data in the development database

### Starting the Server

Run `npm start` to start the server. For local development, run `npm run dev`.

### Testing

This project is developed using Test-Driven Development. To run the full test suite, run `npm test`

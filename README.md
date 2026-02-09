# NC News Back-end API

This is an express server built with full TDD, providing information about articles and comments posted in the NC News App.

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

**requirements**:
Running this app requires local installations of postgreSQL later than v16

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

In order to connect to the databases, we need to first create a `.env.development` and a `.env.test` file, and add the following value in each of them:
`PGDATABASE=<name of the database_title>`

### Database Setup

Run `npm run setup-dbs` to initialise the local database

### Seeding the Database

Run `npm run seed-dev` to seed data in the dev database
Run `npm run seed-test` to seed data in the test database

### Starting the Server

Run `npm start` to start the server. For local development, run `npm run dev`.

### Testing

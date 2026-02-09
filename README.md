# Northcoders News Back-end API

A RESTful API built as part of the Northcoders Software Development Bootcamp.

This project is a social news website similar to Reddit, built with an Express server using Test-Driven Development (TDD). Users can interact with articles, leave comments, vote on contents and react with emojis.

[The API is hosted here](https://nc-news-backend-91qy.onrender.com/api)

## Local Setup

**minimum version requirements**:

- postgreSQL v16+
- Node.js v20+

### Installing the project

Run the following scripts to clone and install the project

```
git clone https://github.com/yewen-jin/nc-news-backend.git
cd nc-news-backend
npm install
```

### Environment Variables

In order to connect to the databases, set up a `.env.development` and a `.env.test` files in the root directory, with the following format:

```
PGDATABASE=[dbname]
PGPORT=5432
PGHOST=localhost
PGUSER=[your-db-username]
PGPASSOWRD=[your-db-password]
```

### Database Setup

Run `npm run setup-dbs` to initialise the local database

### Seeding the Database

Run `npm run seed` to seed data in the development database

### Starting the Server

Run `npm start` to start the server. For local development, run `npm run dev`.

### Testing

To run the test suite, run `npm test`

## Production Deployment

This project is hosted on Render using a Supabase PostgreSQL database

### Endpoints

The API serves JSON data via the following endpoints:

GET: `/api/topics`
Get a list of all topics

GET: `/api/articles`
Get a list of all articles

GET: `/api/articles/:article_id`
Get an article by its article ID

GET: `/api/articles/:article_id/comments`
Get the comments of an article by its article ID

POST `/api/articles/:article_id/comments`
Post a new comment

PATCH: `/api/articles/:article_id`
Update an article's vote count

GET: `/api/comments/:comment_id`
Get a comment by comment ID

DELETE: `/api/comments/:comment_id`
Delete a comment by comment ID

GET: `/api/users`
Get all users

## Acknowledgements

Special thanks to the amazing tutors and fellow students at the Northcoders cohort for making this happen!

# NC News Back-end API

This is an express server built with full TDD, providing information about articles and comments posted in the NC News App.

**available endpoints**:

<a href="https://nc-news-backend-91qy.onrender.com/api/articles" target="_blank">articles</a>

<a href="https://nc-news-backend-91qy.onrender.com/api/topics" target="_blank">topics</a>

<a href="https://nc-news-backend-91qy.onrender.com/api/users" target="_blank">users</a>

<!-- [articles](https://nc-news-backend-91qy.onrender.com/api/articles) -->

<!-- [topics](https://nc-news-backend-91qy.onrender.com/api/topics) -->

<!-- [users](https://nc-news-backend-91qy.onrender.com/api/users) -->

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

### Environmental Variables

In order to connect to the databases, we need to first create a `.env.development` and a `.env.test` file, and add the following value in each of them:
`PGDATABASE=<name of the database_title>`

### Database Setup

Run `npm run setup-dbs` to initialise the local database

### Seeding the Database

Run `npm run seed-dev` to seed data in the dev database
Run `npm run seed-test` to seed data in the test database

### Starting the Server

Run `npm start` to start the server. For local development, run `npm run dev`.

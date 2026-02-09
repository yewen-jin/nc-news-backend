# NC News Back-end API

This is an express server built with full TDD, providing information about articles and comments posted in the NC News App.

**available endpoints**:
[articles](https://nc-news-backend-91qy.onrender.com/api/articles)

[topics](https://nc-news-backend-91qy.onrender.com/api/topics)

[users](https://nc-news-backend-91qy.onrender.com/api/users)

**requirements**:
Running this app requires local installations of postgreSQL

## Connecting to a database

### Environmental Variables

1. Created a `.env.development` and a `.env.test` file, and add the following value in each of them:
   PGDATABASE=<database_title>

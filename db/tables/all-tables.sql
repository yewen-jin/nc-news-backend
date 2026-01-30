You are now connected to database "nc_news" as user "yewenjin".
                         Table "public.topics"
   Column    |          Type           | Collation | Nullable | Default 
-------------+-------------------------+-----------+----------+---------
 slug        | character varying(20)   |           | not null | 
 description | character varying(300)  |           | not null | 
 img_url     | character varying(1000) |           |          | 
Indexes:
    "topics_pkey" PRIMARY KEY, btree (slug)
Referenced by:
    TABLE "articles" CONSTRAINT "fk_article_topic" FOREIGN KEY (topic) REFERENCES topics(slug)

                         Table "public.users"
   Column   |          Type           | Collation | Nullable | Default 
------------+-------------------------+-----------+----------+---------
 username   | character varying(20)   |           | not null | 
 name       | character varying(40)   |           | not null | 
 avatar_url | character varying(1000) |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (username)
Referenced by:
    TABLE "articles" CONSTRAINT "fk_article_author" FOREIGN KEY (author) REFERENCES users(username)
    TABLE "comments" CONSTRAINT "fk_comment_author" FOREIGN KEY (author) REFERENCES users(username)

                                               Table "public.articles"
     Column      |            Type             | Collation | Nullable |                   Default                    
-----------------+-----------------------------+-----------+----------+----------------------------------------------
 article_id      | integer                     |           | not null | nextval('articles_article_id_seq'::regclass)
 title           | character varying(300)      |           | not null | 
 topic           | character varying(20)       |           | not null | 
 author          | character varying(20)       |           | not null | 
 body            | text                        |           | not null | 
 created_at      | timestamp without time zone |           |          | CURRENT_TIMESTAMP
 votes           | integer                     |           |          | 0
 article_img_url | character varying(1000)     |           |          | 
Indexes:
    "articles_pkey" PRIMARY KEY, btree (article_id)
Foreign-key constraints:
    "fk_article_author" FOREIGN KEY (author) REFERENCES users(username)
    "fk_article_topic" FOREIGN KEY (topic) REFERENCES topics(slug)
Referenced by:
    TABLE "comments" CONSTRAINT "fk_article_id" FOREIGN KEY (article_id) REFERENCES articles(article_id)

                                            Table "public.comments"
   Column   |            Type             | Collation | Nullable |                   Default                    
------------+-----------------------------+-----------+----------+----------------------------------------------
 comment_id | integer                     |           | not null | nextval('comments_comment_id_seq'::regclass)
 article_id | integer                     |           | not null | 
 body       | text                        |           | not null | 
 votes      | integer                     |           |          | 0
 author     | character varying(20)       |           | not null | 
 created_at | timestamp without time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "comments_pkey" PRIMARY KEY, btree (comment_id)
Foreign-key constraints:
    "fk_article_id" FOREIGN KEY (article_id) REFERENCES articles(article_id)
    "fk_comment_author" FOREIGN KEY (author) REFERENCES users(username)


You are now connected to database "nc_news" as user "yewenjin".
               List of relations
 Schema |        Name        | Type  |  Owner   
--------+--------------------+-------+----------
 public | articles           | table | yewenjin
 public | ascii_animals      | table | yewenjin
 public | comments           | table | yewenjin
 public | emoji_article_user | table | yewenjin
 public | emojis             | table | yewenjin
 public | topics             | table | yewenjin
 public | user_topic         | table | yewenjin
 public | users              | table | yewenjin
(8 rows)

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
    TABLE "emoji_article_user" CONSTRAINT "emoji_article_user_username_fkey" FOREIGN KEY (username) REFERENCES users(username)
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
    TABLE "emoji_article_user" CONSTRAINT "emoji_article_user_article_id_fkey" FOREIGN KEY (article_id) REFERENCES articles(article_id)
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

                                            Table "public.user_topic"
    Column     |         Type          | Collation | Nullable |                      Default                      
---------------+-----------------------+-----------+----------+---------------------------------------------------
 user_topic_id | integer               |           | not null | nextval('user_topic_user_topic_id_seq'::regclass)
 username      | character varying(20) |           | not null | 
 topic         | character varying(20) |           | not null | 
Indexes:
    "user_topic_pkey" PRIMARY KEY, btree (user_topic_id)

                                        Table "public.ascii_animals"
  Column   |         Type          | Collation | Nullable |                     Default                      
-----------+-----------------------+-----------+----------+--------------------------------------------------
 animal_id | integer               |           | not null | nextval('ascii_animals_animal_id_seq'::regclass)
 animal    | character varying(20) |           | not null | 
 drawing   | text                  |           | not null | 
Indexes:
    "ascii_animals_pkey" PRIMARY KEY, btree (animal_id)

                                        Table "public.emojis"
   Column   |         Type          | Collation | Nullable |                 Default                  
------------+-----------------------+-----------+----------+------------------------------------------
 emoji_id   | integer               |           | not null | nextval('emojis_emoji_id_seq'::regclass)
 emoji      | character varying     |           | not null | 
 emoji_name | character varying     |           | not null | 
 emoji_type | character varying(20) |           |          | 
Indexes:
    "emojis_pkey" PRIMARY KEY, btree (emoji_id)
Referenced by:
    TABLE "emoji_article_user" CONSTRAINT "emoji_article_user_emoji_id_fkey" FOREIGN KEY (emoji_id) REFERENCES emojis(emoji_id)

                                                    Table "public.emoji_article_user"
        Column         |         Type          | Collation | Nullable |                              Default                              
-----------------------+-----------------------+-----------+----------+-------------------------------------------------------------------
 emoji_article_user_id | integer               |           | not null | nextval('emoji_article_user_emoji_article_user_id_seq'::regclass)
 emoji_id              | integer               |           | not null | 
 username              | character varying(20) |           | not null | 
 article_id            | integer               |           | not null | 
Indexes:
    "emoji_article_user_pkey" PRIMARY KEY, btree (emoji_article_user_id)
Foreign-key constraints:
    "emoji_article_user_article_id_fkey" FOREIGN KEY (article_id) REFERENCES articles(article_id)
    "emoji_article_user_emoji_id_fkey" FOREIGN KEY (emoji_id) REFERENCES emojis(emoji_id)
    "emoji_article_user_username_fkey" FOREIGN KEY (username) REFERENCES users(username)


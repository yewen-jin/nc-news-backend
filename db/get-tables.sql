\c nc_news;

-- \dt;

-- \d topics;
-- \d users;
-- \d articles;
-- \d comments;

-- \d user_topic;
-- \d ascii_animals;
-- \d emojis;
-- \d emoji_article_user;


-- SELECT * FROM topics;
-- SELECT * FROM users;
-- SELECT * FROM articles;
-- SELECT * FROM comments;

-- SELECT * FROM ascii_animals;
-- SELECT * FROM emojis;
-- SELECT * FROM emoji_article_user;
-- SELECT * FROM user_topic;
-- SELECT * FROM user_article_votes;

-- SELECT articles.author,  articles.article_id, COUNT(comments.comment_id) AS comment_count, articles.topic, articles.created_at, articles.votes, articles.title FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;

-- SELECT * FROM comments WHERE article_id = article_id;


-- SELECT articles.author, articles.title, articles.body, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = 1 GROUP BY articles.article_id;

SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id)::INT AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.topic = 'cats' GROUP BY articles.article_id;
-- migrate:up
INSERT INTO users(id,username,full_name,account_type) VALUES (1,'spacy','SpaCy','model');
INSERT INTO users(id,username,full_name,account_type) VALUES (2,'spanbert','SpanBERT','model');
SELECT setval('users_id_seq', 3, true);

INSERT INTO entity_categories(id,category_code,category_name) VALUES (1,'geo','Geographical Entity');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (2,'org','Organization');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (3,'per','Person');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (4,'gpe','Geopolitical Entity');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (5,'tim','Time indicator');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (6,'art','Artifact');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (7,'eve','Event');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (8,'nat','Natural Phenomenon');
SELECT setval('entity_categories_id_seq', 9, true);

-- migrate:down
DELETE FROM users;
DELETE FROM entity_categories;


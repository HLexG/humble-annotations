-- migrate:up
INSERT INTO users(id,username,full_name,account_type) VALUES (1,'spacy','SpaCy','model');
INSERT INTO users(id,username,full_name,account_type) VALUES (2,'spanbert','SpanBERT','model');
INSERT INTO users(id,username,full_name,account_type) VALUES (3,'wikidata','WikiData','model');
INSERT INTO users(id,username,full_name,account_type) VALUES (4,'allennlp','AllenNLP','model');
SELECT setval('users_id_seq', 4, true);

INSERT INTO entity_categories(id,category_code,category_name) VALUES (1,'PERSON','Person');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (2,'NORP','Nationalities or religious or political groups');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (3,'FAC','Buildings, airports, highways, bridges, etc');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (4,'ORG','Companies, agencies, institutions, etc');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (5,'GPE','Countries, cities, states');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (6,'LOC','Non-GPE locations, mountain ranges, bodies of water');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (7,'PRODUCT','Objects, vehicles, foods, etc. (Not services)');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (8,'EVENT','Named hurricanes, battles, wars, sports events, etc');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (9,'WORK_OF_ART','Titles of books, songs, etc');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (10,'LAW','Named documents made into laws');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (11,'LANGUAGE','Any named language');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (12,'DATE','Absolute or relative dates or periods');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (13,'TIME','Time in 1 day');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (14,'PERCENT','Percentage, including %');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (15,'MONEY','Monetary values, including unit');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (16,'QUANTITY','Measurements, as of weight or distance');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (17,'ORDINAL','first, second, etc');
INSERT INTO entity_categories(id,category_code,category_name) VALUES (18,'CARDINAL','Numerals that do not fall under another type');
SELECT setval('entity_categories_id_seq', 19, true);

-- migrate:down
DELETE FROM users;
DELETE FROM entity_categories;





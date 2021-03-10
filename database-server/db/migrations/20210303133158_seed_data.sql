-- migrate:up
INSERT INTO users(email,first_name,last_name) VALUES ('system@hlexg.com','System','User');
--INSERT INTO datasets (dataset_name,dataset_description,updated_at) VALUES ('Dataset 01','Dataset 02',EXTRACT(EPOCH FROM clock_timestamp()) * 1000);
INSERT INTO datasets (dataset_name,dataset_description,created_by,updated_at,updated_by)
VALUES ('Dataset 01','Dataset 01',(select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Ellen DeGeneres to host 2014 Oscars','https://storage.googleapis.com/hlexg/dataset01/ellen_degeneres_2.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Lindsay Lohan Leaves Betty Ford','https://storage.googleapis.com/hlexg/dataset01/lindsay_lohan_1.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Apple unveils new MacBook Pro','https://storage.googleapis.com/hlexg/dataset01/apple_product_1.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Lindsay Lohan checks into rehab','https://storage.googleapis.com/hlexg/dataset01/lindsay_lohan_2.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'New MacBook Air models officially unveiled','https://storage.googleapis.com/hlexg/dataset01/apple_product_2.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Indian ship thwarts piracy attempt','https://storage.googleapis.com/hlexg/dataset01/somali_pirates_2.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'T-Mobile USA Announces BlackBerry Q10 Availability','https://storage.googleapis.com/hlexg/dataset01/blackberry_product_2.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'T-Mobile Adds BlackBerry Q10 to its 4G LTE','https://storage.googleapis.com/hlexg/dataset01/blackberry_product_1.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Ellen DeGeneres To Host 86th Oscars','https://storage.googleapis.com/hlexg/dataset01/ellen_degeneres_1.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Navy foils Somali pirate attack off Gulf of Aden','https://storage.googleapis.com/hlexg/dataset01/somali_pirates_1.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Ten dead in southern Iran quake','https://storage.googleapis.com/hlexg/dataset01/iran_earthquake_1.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,document_name,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'Aftershocks jolt Irans Qeshm island','https://storage.googleapis.com/hlexg/dataset01/iran_earthquake_2.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));

-- migrate:down
DELETE FROM clusters;
DELETE FROM mentions;
DELETE FROM documents;
DELETE FROM datasets;
DELETE FROM users;


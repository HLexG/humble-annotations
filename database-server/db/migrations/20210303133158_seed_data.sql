-- migrate:up
INSERT INTO users(email,first_name,last_name) VALUES ('system@hlexg.com','System','User');
--INSERT INTO datasets (dataset_name,dataset_description,updated_at) VALUES ('Dataset 01','Dataset 02',EXTRACT(EPOCH FROM clock_timestamp()) * 1000);
INSERT INTO datasets (dataset_name,dataset_description,created_by,updated_at,updated_by)
VALUES ('Dataset 01','Dataset 01',(select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc1.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc2.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc3.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc4.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc5.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc6.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc7.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc8.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc9.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc10.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc11.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));
INSERT INTO documents (dataset_id,filepath,created_by,updated_at,updated_by)
VALUES ((select max(id) from datasets),'https://storage.googleapis.com/hlexg/dataset01/doc12.txt',
        (select max(id) from users),EXTRACT(EPOCH FROM clock_timestamp()) * 1000,(select max(id) from users));

-- migrate:down
DELETE FROM clusters;
DELETE FROM mentions;
DELETE FROM documents;
DELETE FROM datasets;
DELETE FROM users;


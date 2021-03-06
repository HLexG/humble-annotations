-- migrate:up
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT,
    first_name TEXT,
    last_name TEXT
);
CREATE TABLE datasets (
    id BIGSERIAL PRIMARY KEY,
    dataset_name TEXT NOT NULL,
    dataset_description TEXT,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    filepath TEXT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE TABLE clusters (
    db_id BIGSERIAL PRIMARY KEY,
    id BIGINT NOT NULL DEFAULT currval('clusters_db_id_seq'),
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    document_id BIGINT NOT NULL REFERENCES documents ON DELETE CASCADE,
    cluster_name TEXT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE INDEX clusters_id ON clusters (id);
CREATE INDEX clusters_document_id ON clusters (document_id);
CREATE UNIQUE INDEX clusters_document_id_and_id ON clusters (document_id, id);
CREATE TABLE mentions (
    db_id BIGSERIAL PRIMARY KEY,
    id BIGINT NOT NULL DEFAULT currval('mentions_db_id_seq'),
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    document_id BIGINT NOT NULL REFERENCES documents ON DELETE CASCADE,
    sentence_id INT NOT NULL,
    start_token_id INT NOT NULL,
    end_token_id INT NOT NULL,
    cluster_id BIGINT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL,
    FOREIGN KEY (document_id, cluster_id) REFERENCES clusters (document_id, id) ON DELETE CASCADE
);
CREATE INDEX mentions_id ON mentions (id);
CREATE INDEX mentions_document_id ON mentions (document_id);
CREATE INDEX mentions_cluster_id ON mentions (cluster_id);
CREATE UNIQUE INDEX mentions_document_id_and_id ON mentions (document_id, id);
CREATE UNIQUE INDEX mentions_document_id_and_cluster_id_and_id ON mentions (document_id, cluster_id, id);

-- migrate:down
DROP INDEX IF EXISTS mentions_document_id_and_cluster_id_and_id;
DROP INDEX IF EXISTS mentions_document_id_and_id;
DROP INDEX IF EXISTS mentions_cluster_id;
DROP INDEX IF EXISTS mentions_document_id;
DROP INDEX IF EXISTS mentions_id;
DROP TABLE IF EXISTS mentions;
DROP INDEX IF EXISTS clusters_document_id_and_id;
DROP INDEX IF EXISTS clusters_document_id;
DROP INDEX IF EXISTS clusters_id;
DROP TABLE IF EXISTS clusters;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS datasets;
DROP TABLE IF EXISTS users;

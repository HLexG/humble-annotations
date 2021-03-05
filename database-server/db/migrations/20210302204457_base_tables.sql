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
    id BIGSERIAL PRIMARY KEY,
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    document_id BIGINT NOT NULL REFERENCES documents ON DELETE CASCADE,
    cluster_name TEXT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE TABLE mentions (
    id BIGSERIAL PRIMARY KEY,
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    document_id BIGINT NOT NULL REFERENCES documents ON DELETE CASCADE,
    sentence_id INT NOT NULL,
    start_token_id INT NOT NULL,
    end_token_id INT NOT NULL,
    cluster_id BIGINT NOT NULL REFERENCES clusters ON DELETE CASCADE,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);

-- migrate:down
DROP TABLE mentions;
DROP TABLE clusters;
DROP TABLE documents;
DROP TABLE datasets;
DROP TABLE users;

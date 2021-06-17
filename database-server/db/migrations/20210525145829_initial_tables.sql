-- migrate:up
CREATE TYPE user_account_type AS ENUM (
    'user',
    'admin',
    'model'
);
CREATE TYPE acl_permission_type AS ENUM (
    'read',
    'readwrite',
    'owner'
);
CREATE TYPE annotation_type AS ENUM (
    'entity_mention',
    'entity_coreference',
    'named_entity_recognition',
    'entity_linking',
    'event_mention',
    'event_coreference'
);
CREATE TYPE annotation_status AS ENUM (
    'save',
    'commit'
);
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT,
    full_name TEXT,
    hashed_password TEXT,
    account_type user_account_type NOT NULL DEFAULT 'user',
    github_username TEXT,
    twitter_handle TEXT,
    research_interests TEXT,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    updated_at BIGINT
);
CREATE TABLE entity_categories (
    id BIGSERIAL PRIMARY KEY,
    category_code TEXT NOT NULL,
    category_name TEXT,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
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
CREATE TABLE datasets_users (
    id BIGSERIAL PRIMARY KEY,
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users ON DELETE CASCADE,
    permission_type acl_permission_type NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE UNIQUE INDEX datasets_users_project_and_user ON datasets_users (dataset_id, user_id);
CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    filepath TEXT NOT NULL,
    document_text TEXT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE TABLE tokens (
    id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL REFERENCES documents ON DELETE CASCADE,
    sentence_id INT NOT NULL,
    token_id INT NOT NULL,
    token_text TEXT NOT NULL,
    token_pos_tag TEXT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE INDEX tokens_document_id ON tokens (document_id);
CREATE UNIQUE INDEX tokens_document_sentence_token ON tokens (document_id,sentence_id, token_id);
CREATE TABLE annotations (
    id BIGSERIAL PRIMARY KEY,
    document_id BIGINT NOT NULL REFERENCES documents ON DELETE CASCADE,
    user_id BIGINT REFERENCES users ON DELETE SET NULL,
    type annotation_type NOT NULL,
    status annotation_status NOT NULL DEFAULT 'save',
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE TABLE mentions (
    id BIGSERIAL PRIMARY KEY,
    annotation_id BIGINT NOT NULL REFERENCES annotations ON DELETE CASCADE,
    sentence_id INT NOT NULL,
    start_token_id INT NOT NULL,
    end_token_id INT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
-- CREATE UNIQUE INDEX mentions_annotation_id_and_id ON mentions (annotation_id, id);
-- CREATE INDEX entity_mentions_id ON entity_mentions (id);
-- CREATE INDEX entity_mentions_document_id ON entity_mentions (document_id);
-- CREATE INDEX entity_mentions_cluster_id ON entity_mentions (cluster_id);
-- CREATE UNIQUE INDEX mentions_document_id_and_id ON entity_mentions (document_id, id);
-- CREATE UNIQUE INDEX entity_mentions_document_id_and_cluster_id_and_id ON entity_mentions (document_id, cluster_id, id);
CREATE TABLE clusters (
    id BIGSERIAL PRIMARY KEY,
    annotation_id BIGINT NOT NULL REFERENCES annotations ON DELETE CASCADE,
    cluster_name TEXT NOT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
-- CREATE UNIQUE INDEX clusters_annotation_id_and_id ON clusters (annotation_id, id);
CREATE TABLE coreferences (
    annotation_id BIGINT NOT NULL REFERENCES annotations ON DELETE CASCADE,
    cluster_id BIGINT NOT NULL REFERENCES clusters ON DELETE CASCADE,
    mention_id BIGINT NOT NULL REFERENCES mentions ON DELETE CASCADE,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE UNIQUE INDEX coreferences_annotation_cluster_mention ON coreferences (annotation_id, cluster_id, mention_id);
-- CREATE INDEX entity_coreferences_id ON entity_coreferences (id);
-- CREATE INDEX entity_coreferences_document_id ON entity_coreferences (document_id);
-- CREATE UNIQUE INDEX entity_coreferences_document_id_and_id ON entity_coreferences (document_id, id);
CREATE TABLE named_entities (
    annotation_id BIGINT NOT NULL REFERENCES annotations ON DELETE CASCADE,
    cluster_id BIGINT NOT NULL REFERENCES clusters ON DELETE CASCADE,
    entity_category_id BIGINT NOT NULL REFERENCES entity_categories ON DELETE CASCADE,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE UNIQUE INDEX named_entities_annotation_cluster_entity_category ON named_entities (annotation_id, cluster_id, entity_category_id);

CREATE TABLE wikidata (
    db_id BIGSERIAL PRIMARY KEY,
    id TEXT NOT NULL,
    alt_id TEXT DEFAULT '-1',
    dataset_id BIGINT NOT NULL REFERENCES datasets ON DELETE CASCADE,
    entity_name TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT DEFAULT NULL,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE INDEX wikidata_id ON wikidata (id);
CREATE INDEX wikidata_alt_id ON wikidata (alt_id);
CREATE INDEX wikidata_entity_name_id ON wikidata (entity_name);
CREATE UNIQUE INDEX wikidata_id_alt_id ON wikidata (id, alt_id);

CREATE TABLE entity_links (
    annotation_id BIGINT NOT NULL REFERENCES annotations ON DELETE CASCADE,
    cluster_id BIGINT NOT NULL REFERENCES clusters ON DELETE CASCADE,
    wikidata_id BIGINT NOT NULL REFERENCES wikidata ON DELETE CASCADE,
    created_at BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM clock_timestamp()) * 1000,
    created_by BIGINT REFERENCES users ON DELETE SET NULL,
    updated_at BIGINT,
    updated_by BIGINT REFERENCES users ON DELETE SET NULL
);
CREATE UNIQUE INDEX entity_links_annotation_cluster_wikidata ON entity_links (annotation_id, cluster_id, wikidata_id);

-- migrate:down
-- DROP INDEX IF EXISTS entity_mentions_document_id_and_cluster_id_and_id;
-- DROP INDEX IF EXISTS entity_mentions_document_id_and_id;
-- DROP INDEX IF EXISTS entity_mentions_cluster_id;
-- DROP INDEX IF EXISTS entity_mentions_document_id;
-- DROP INDEX IF EXISTS entity_mentions_id;
--DROP INDEX IF EXISTS entity_coreferences_document_id_and_id;
-- DROP INDEX IF EXISTS entity_coreferences_document_id;
-- DROP INDEX IF EXISTS entity_coreferences_id;
DROP INDEX IF EXISTS tokens_document_id;
DROP INDEX IF EXISTS tokens_id;
DROP INDEX IF EXISTS wikidata_id;
DROP INDEX IF EXISTS wikidata_alt_id;
DROP INDEX IF EXISTS wikidata_entity_name_id;
DROP INDEX IF EXISTS wikidata_id_alt_id;

DROP TABLE IF EXISTS entity_links;
DROP TABLE IF EXISTS named_entities;
DROP TABLE IF EXISTS wikidata;
DROP TABLE IF EXISTS coreferences;
DROP TABLE IF EXISTS clusters;
DROP TABLE IF EXISTS mentions;
DROP TABLE IF EXISTS annotations;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS datasets_users;
DROP TABLE IF EXISTS datasets;
DROP TABLE IF EXISTS entity_categories;
DROP TABLE IF EXISTS users;

DROP TYPE IF EXISTS acl_permission_type;
DROP TYPE IF EXISTS user_account_type;
DROP TYPE IF EXISTS annotation_type;
DROP TYPE IF EXISTS annotation_status;
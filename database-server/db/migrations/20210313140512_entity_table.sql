-- migrate:up

CREATE TABLE entitylink (
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
CREATE INDEX entitylink_id ON entitylink (id);
CREATE INDEX entitylink_alt_id ON entitylink (alt_id);
CREATE INDEX entitylink_entity_name_id ON entitylink (entity_name);
CREATE UNIQUE INDEX entitylink_id_alt_id ON entitylink (id, alt_id);

-- migrate:down

DROP INDEX IF EXISTS entitylink_id;
DROP INDEX IF EXISTS entitylink_alt_id;
DROP INDEX IF EXISTS entitylink_entity_name_id;
DROP INDEX IF EXISTS entitylink_id_alt_id;
DROP TABLE IF EXISTS entitylink;


